import { use, type Context } from "react";

export function useRequiredContext<T>(context: Context<T | undefined>): T {
  const contextValue = use(context);
  if (contextValue === undefined) {
    throw new Error(context.name + " was used outside a provider");
  }
  return contextValue;
}
