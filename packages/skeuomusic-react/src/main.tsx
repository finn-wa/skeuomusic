import "./global.css";

import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./auth";
import { getRouter } from "./router";
import { useAuthContext } from "./shared/context/auth";

const router = getRouter();

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
);

function App() {
  const auth = useAuthContext();
  return <RouterProvider router={router} context={{ auth }} />;
}
