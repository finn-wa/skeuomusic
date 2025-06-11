import { MetaProvider } from "@solidjs/meta";
import { clientOnly } from "@solidjs/start";
import { Outlet, createRootRoute } from "@tanstack/solid-router";
import { Suspense } from "solid-js";
import { PageTitle } from "~/components/page-title/PageTitle";

const Devtools = clientOnly(() => import("../components/devtools/Devtools"));

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <div>404 Not Found</div>,
});

export function RootComponent() {
  return (
    <>
      {/* <MetaProvider>
        <PageTitle>skeuomusic</PageTitle>
      </MetaProvider> */}
      <Suspense>
        <Outlet />
        <Devtools />
      </Suspense>
    </>
  );
}
