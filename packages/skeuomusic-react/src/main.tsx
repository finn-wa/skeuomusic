import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider, useAuth } from "./auth";
import { getRouter } from "./router";

import "./global.css";

const router = getRouter();

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
);

function App() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}
