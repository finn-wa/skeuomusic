import { Title } from "@solidjs/meta";
import { setTitle } from "~/state/title";

/** Like Title, but it updates the global title signal as well. */
export function PageTitle(props: { children: string }) {
  setTitle(props.children);
  return <Title>{props.children}</Title>;
}
