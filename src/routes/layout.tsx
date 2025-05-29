import { Slot, component$ } from "@builder.io/qwik";
import { TabBar } from "~/components/tab-bar/tab-bar";

export default component$(() => {
  return (
    <div class="page">
      <div class="content">
        <Slot />
      </div>
      <TabBar />
    </div>
  );
});
