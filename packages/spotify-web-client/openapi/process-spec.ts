import {
  isReferenceObject,
  type OpenAPIObject,
  type PathItemObject,
  type PathsObject,
  type ReferenceObject,
  type SchemaObject,
} from "openapi3-ts/oas30";
type SchemaOrRef = SchemaObject | ReferenceObject;

export function processOpenApiSpec(spec: OpenAPIObject, commitHash: string): OpenAPIObject {
  const originalSchemas = spec?.components?.schemas;
  if (originalSchemas == null) {
    throw new Error(`Schemas are missing from the downloaded spec`);
  }
  return {
    ...spec,
    info: {
      ...spec.info,
      // Overwrite the version because it is only set on release, and releases
      // trail way behind commits to the main branch.
      version: commitHash,
      description: "Spotify Web API with fixes and improvements from sonallux & finn-wa",
    },
    paths: processPaths(spec.paths),
    components: {
      ...spec.components,
      schemas: processSchemas(originalSchemas),
    },
  };
}

function mapObjectValues<T, U>(
  obj: Record<string, T>,
  mapValue: (value: T, key: string) => U,
): Record<string, U> {
  const mappedObj: Record<string, U> = {};
  for (const [key, value] of Object.entries(obj)) {
    mappedObj[key] = mapValue(value, key);
  }
  return mappedObj;
}

/**
 * Processes the Spotify OpenAPI spec to remove the many methods that were
 * removed in February 2026. These are marked as deprecated in the spec.
 *
 * @param paths The original paths
 * @returns The processed paths
 */
function processPaths(paths: PathsObject): PathsObject {
  const withoutDeprecatedPaths: PathsObject = {};
  let removedMethods = 0;
  let removedPaths = 0;
  for (const [path, methods] of Object.entries(paths)) {
    const filteredMethods: { [method: string]: PathItemObject } = {};
    for (const [method, def] of Object.entries(methods)) {
      if (!def["deprecated"]) {
        filteredMethods[method] = def;
      } else {
        removedMethods++;
      }
    }
    if (Object.keys(filteredMethods).length > 0) {
      withoutDeprecatedPaths[path] = filteredMethods;
    } else {
      removedPaths++;
    }
  }
  console.log(
    `Removed ${removedMethods} deprecated methods, including ${removedPaths} entirely deprecated paths`,
  );
  return withoutDeprecatedPaths;
}

function processSchemas(schemas: Record<string, SchemaOrRef>): Record<string, SchemaOrRef> {
  const fixedSchemas = mapObjectValues(schemas, (schema, name) =>
    processSchema(schemas, schema, name),
  );
  // Find schemas that are used in discriminator mappings and make sure the discriminator property is required
  const refsToDiscriminatorProps = new Map<string, Set<string>>();
  for (const schema of Object.values(fixedSchemas).flatMap((schema) => {
    if (isReferenceObject(schema)) {
      return [];
    }
    return [schema, ...Object.values(schema.properties ?? {})];
  })) {
    if (
      isReferenceObject(schema) ||
      schema.oneOf == null ||
      schema.discriminator?.mapping == null
    ) {
      continue;
    }
    for (const ref of Object.values(schema.discriminator.mapping)) {
      const discriminatorProps = refsToDiscriminatorProps.get(ref) ?? new Set();
      discriminatorProps.add(schema.discriminator.propertyName);
      refsToDiscriminatorProps.set(ref, discriminatorProps);
    }
  }
  for (const [ref, discriminatorProps] of refsToDiscriminatorProps.entries()) {
    console.log(`Adding required properties to ${ref}: ${[...discriminatorProps].join(", ")}`);
    const referencedSchema = resolveSchemaRef(fixedSchemas, ref);
    referencedSchema.required = getRequiredWithProperties(
      referencedSchema.required,
      ...discriminatorProps,
    );
  }
  return fixedSchemas;
}

/** Processes a schema to add discriminator mappings if they are missing. */
function processSchema(
  schemas: Record<string, SchemaOrRef>,
  schema: SchemaOrRef,
  schemaName: string,
): SchemaOrRef {
  if (isReferenceObject(schema)) {
    return schema;
  }
  const fixedSchema = { ...schema };
  if (fixedSchema.properties != null) {
    fixedSchema.properties = mapObjectValues(fixedSchema.properties, (nestedSchema, schemaName) =>
      processSchema(schemas, nestedSchema, schemaName),
    );
  }
  if (fixedSchema.items != null) {
    fixedSchema.items = processSchema(schemas, fixedSchema.items, schemaName + "/items");
  }
  if (fixedSchema.allOf != null) {
    fixedSchema.allOf = fixedSchema.allOf.map((nestedSchema, i) =>
      processSchema(schemas, nestedSchema, `${schemaName}/allOf/${i}`),
    );
  }
  if (fixedSchema.oneOf != null) {
    fixedSchema.oneOf = fixedSchema.oneOf.map((nestedSchema, i) =>
      processSchema(schemas, nestedSchema, `${schemaName}/oneOf/${i}`),
    );
    if (fixedSchema.discriminator != null) {
      if (fixedSchema.discriminator.mapping == null) {
        console.log("Adding discriminator mapping to " + schemaName);
        fixedSchema.discriminator.mapping = buildDiscriminatorMapping(
          schemas,
          fixedSchema.oneOf,
          fixedSchema.discriminator.propertyName,
        );
      }
      fixedSchema.required = getRequiredWithProperties(
        fixedSchema.required,
        fixedSchema.discriminator.propertyName,
      );
    }
  }
  return fixedSchema;
}

function buildDiscriminatorMapping(
  schemas: Record<string, SchemaOrRef>,
  oneOf: SchemaOrRef[],
  discriminatorProperty: string,
): Record<string, string> {
  const mapping: Record<string, string> = {};
  for (const ref of oneOf) {
    if (!isReferenceObject(ref)) {
      throw new Error(
        `Discriminator mapping expected a reference but found an inline schema for property ${discriminatorProperty}`,
      );
    }
    const enumValues = resolveEnumValuesForProperty(schemas, ref, discriminatorProperty);
    if (enumValues.length === 0) {
      throw new Error(
        `Failed to find enum values for property ${discriminatorProperty} in ref ${ref.$ref}`,
      );
    }
    for (const val of enumValues) {
      if (mapping[val] != null) {
        throw new Error(
          `References ${mapping[val]} and ${ref.$ref} both use discriminator value "${val}"`,
        );
      }
      mapping[val] = ref.$ref;
    }
  }
  return mapping;
}

function getRequiredWithProperties(
  required: string[] | undefined,
  ...propertyNames: string[]
): string[] {
  if (required == null) {
    return propertyNames;
  }
  const requiredSet = new Set([...required, ...propertyNames]);
  return Array.from(requiredSet);
}

/** Gets the enum values that are the discriminator property value */
function resolveEnumValuesForProperty(
  schemas: Record<string, SchemaOrRef>,
  schemaOrRef: SchemaOrRef,
  propertyName: string,
): string[] {
  const schema = resolveSchema(schemas, schemaOrRef);
  const propertySchemaOrRef = schema.properties?.[propertyName];
  if (propertySchemaOrRef != null) {
    const propertySchema = resolveSchema(schemas, propertySchemaOrRef);
    if (propertySchema.enum != null) {
      return propertySchema.enum;
    }
  }

  if (schema.allOf != null) {
    for (const entry of schema.allOf) {
      const enumValues = resolveEnumValuesForProperty(schemas, entry, propertyName);
      if (enumValues.length > 0) {
        return enumValues;
      }
    }
  }

  return [];
}

function resolveSchema(
  schemas: Record<string, SchemaOrRef>,
  schemaOrRef: SchemaOrRef,
): SchemaObject {
  if (isReferenceObject(schemaOrRef)) {
    return resolveSchemaRef(schemas, schemaOrRef.$ref);
  }
  return schemaOrRef;
}

function resolveSchemaRef(
  schemas: Record<string, SchemaOrRef>,
  schemaRef: string,
  depth = 0,
): SchemaObject {
  const lastSlashIndex = schemaRef.lastIndexOf("/");
  const schemaName = schemaRef.slice(lastSlashIndex + 1);
  const schema = schemas[schemaName];
  if (schema == null) {
    throw new Error(`Failed to find schema at with name ${schemaName} for ref ${schemaRef}`);
  }
  if (isReferenceObject(schema)) {
    if (depth >= 10) {
      throw new Error(
        `Found another chained ref (${schemaRef} to ${schema.$ref}) at 10 levels deep - possibly a circular reference?`,
      );
    }
    return resolveSchemaRef(schemas, schema.$ref, depth + 1);
  }
  return schema;
}
