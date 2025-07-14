import type { JSX } from "solid-js/jsx-runtime";

type ImagePropOverrides = {
  srcset: { width: number; url: string }[];
  sizes?: string[] | string;
};

export type ImageProps = ImagePropOverrides &
  Pick<
    JSX.ImgHTMLAttributes<HTMLImageElement>,
    "alt" | "width" | "height" | "class" | "classList" | "style" | "id"
  >;

export default function Image(props: ImageProps) {
  return (
    <img
      srcset={props.srcset
        .map(({ width, url }) => `${url} ${width}w`)
        .join(", ")}
      sizes={
        typeof props.sizes === "string" ? props.sizes : props.sizes?.join("\n")
      }
      alt={props.alt}
      width={props.width}
      height={props.height}
      class={props.class}
      classList={props.classList}
      style={props.style}
      src={props.srcset.at(-1)?.url}
      id={props.id}
    />
  );
}
