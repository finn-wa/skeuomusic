import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./global.css";
import "@fontsource-variable/inter";
import { PageTitle } from "./components/page-title/PageTitle";

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <PageTitle>skeuomusic</PageTitle>
          <Suspense>{props.children}</Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
