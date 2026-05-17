import { createMiddleware } from "@tanstack/solid-start";

export const loggingMiddleware = createMiddleware({
  type: "function",
}).server(async ({ next, method, filename, functionId }) => {
  console.log(`${method} ${filename ?? functionId}`);
  return next();
});
