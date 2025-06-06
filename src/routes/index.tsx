import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <h1>welcome to skeuomusic</h1>
      <Link href="/login">Login</Link>
    </>
  );
});
