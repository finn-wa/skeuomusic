import { RouterProvider } from "@tanstack/solid-router";
import { router } from "./router";

import "@fontsource-variable/inter";
import "./global.css";

export default function App() {
  return <RouterProvider router={router} />;
}
