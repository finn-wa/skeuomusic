import { Slot, component$ } from "@builder.io/qwik";
import { TabBar } from "~/components/tab-bar/tab-bar";
import "@fontsource-variable/inter";
import { Header } from "~/components/header/header";

export default component$(() => {
  return (
    <div class="page">
      <Header />
      <div class="content">
        <Slot />
      </div>
      <TabBar />
    </div>
  );
});
