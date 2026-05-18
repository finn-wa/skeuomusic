import { spawnSync } from "node:child_process";
import { cpSync, mkdirSync, renameSync, rmSync, writeFileSync } from "node:fs";
import YAML from "yaml";

const cwd = "./openapi";

interface SchemaRef {
  $ref: string;
}

interface SchemaProperty {
  type?: string;
  enum?: string[];
  properties?: Record<string, SchemaProperty>;
  allOf?: Array<SchemaRef | SchemaProperty>;
  oneOf?: Array<SchemaRef>;
  discriminator?: {
    propertyName: string;
    mapping?: Record<string, string>;
  };
  items?: SchemaProperty;
}

interface ComponentSchema {
  type?: string;
  properties?: Record<string, SchemaProperty>;
  allOf?: Array<SchemaRef | ComponentSchema>;
}

interface OpenApiSchema {
  paths: {
    [path: string]: {
      [method: string]: Record<string, unknown>;
    };
  };
  components: {
    schemas: Record<string, ComponentSchema>;
  };
}

async function downloadOpenApiSpec() {
  console.log(
    "(1/3) Downloading latest OpenAPI spec from sonallux/spotify-web-api...",
  );
  mkdirSync(`${cwd}/spec`, { recursive: true });
  const specUrl =
    "https://raw.githubusercontent.com/sonallux/spotify-web-api/refs/heads/main/fixed-spotify-open-api.yml";
  const openApiYml = await fetch(specUrl).then((res) => res.text());

  const spec: OpenApiSchema = YAML.parse(openApiYml);
  const processedSpec = processOpenApiSpec(spec);
  writeFileSync("./openapi/spec/spotify.yml", YAML.stringify(processedSpec), {
    encoding: "utf8",
  });
  console.log("(1/3) Done.");
}

function processOpenApiSpec(spec: OpenApiSchema): OpenApiSchema {
  const withoutDeprecatedPaths: OpenApiSchema["paths"] = {};
  for (const [path, methods] of Object.entries(spec.paths)) {
    const filtered: { [method: string]: Record<string, unknown> } = {};
    for (const [method, def] of Object.entries(methods)) {
      if (!def["deprecated"]) {
        filtered[method] = def;
      }
    }
    if (Object.keys(filtered).length > 0) {
      withoutDeprecatedPaths[path] = filtered;
    }
  }

  const fixedSchemas: OpenApiSchema["components"]["schemas"] = {};
  for (const [name, schema] of Object.entries(spec.components.schemas)) {
    if (!schema.properties) {
      fixedSchemas[name] = schema;
      continue;
    }
    const fixedProps = Object.fromEntries(
      Object.entries(schema.properties).map(([propName, prop]) => [
        propName,
        withDiscriminatorMapping(spec.components.schemas, prop),
      ]),
    );
    fixedSchemas[name] = { ...schema, properties: fixedProps };
  }

  return {
    ...spec,
    paths: withoutDeprecatedPaths,
    components: { ...spec.components, schemas: fixedSchemas },
  };
}

function resolveEnumForProperty(
  schemas: Record<string, ComponentSchema>,
  schemaRef: string,
  propertyName: string,
): string[] {
  const schemaName = schemaRef.split("/").pop()!;
  const schema = schemas[schemaName];
  if (!schema) return [];

  if (schema.properties?.[propertyName]?.enum) {
    return schema.properties[propertyName].enum!;
  }

  if (schema.allOf) {
    for (const entry of schema.allOf) {
      if ("$ref" in entry) {
        const enums = resolveEnumForProperty(schemas, entry.$ref, propertyName);
        if (enums.length > 0) return enums;
      } else if (
        "properties" in entry &&
        entry.properties?.[propertyName]?.enum
      ) {
        return entry.properties[propertyName].enum!;
      }
    }
  }

  return [];
}

function buildDiscriminatorMapping(
  schemas: Record<string, ComponentSchema>,
  oneOf: Array<SchemaRef>,
  propertyName: string,
): Record<string, string> {
  const mapping: Record<string, string> = {};
  for (const ref of oneOf) {
    for (const val of resolveEnumForProperty(schemas, ref.$ref, propertyName)) {
      mapping[val] = ref.$ref;
    }
  }
  return mapping;
}

function withDiscriminatorMapping(
  schemas: Record<string, ComponentSchema>,
  prop: SchemaProperty,
): SchemaProperty {
  if (prop.oneOf && prop.discriminator && !prop.discriminator.mapping) {
    const mapping = buildDiscriminatorMapping(
      schemas,
      prop.oneOf,
      prop.discriminator.propertyName,
    );
    if (Object.keys(mapping).length > 0) {
      return {
        ...prop,
        discriminator: { ...prop.discriminator!, mapping },
      };
    }
  }

  if (
    prop.items?.oneOf &&
    prop.items.discriminator &&
    !prop.items.discriminator.mapping
  ) {
    const mapping = buildDiscriminatorMapping(
      schemas,
      prop.items.oneOf,
      prop.items.discriminator.propertyName,
    );
    if (Object.keys(mapping).length > 0) {
      return {
        ...prop,
        items: {
          ...prop.items!,
          discriminator: { ...prop.items!.discriminator!, mapping },
        },
      };
    }
  }

  return prop;
}

function generateClient() {
  console.log("(2/3) Generating OpenAPI TypeScript client...");
  rmSync(`${cwd}/client`, { recursive: true, force: true });
  mkdirSync(`${cwd}/client`);
  const oagResult = spawnSync(
    "node_modules/.bin/openapi-generator-cli",
    ["generate"],
    { stdio: "inherit" },
  );
  if (oagResult.error != null) {
    throw oagResult.error;
  }
  console.log("(2/3) Done.");
}

function saveGeneratedSourceCode() {
  console.log("(3/3) Copying generated code to ./src/openapi...");
  rmSync("./src/openapi", { recursive: true, force: true });
  // First make a copy of generated src called openapi
  cpSync(`${cwd}/client/src`, `${cwd}/client/openapi`, { recursive: true });
  // Then move the copy into ./src
  renameSync(`${cwd}/client/openapi`, "./src/openapi");
  console.log("(3/3) Done.");
}

await downloadOpenApiSpec();
generateClient();
saveGeneratedSourceCode();
