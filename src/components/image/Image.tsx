import type { JSX } from "solid-js/jsx-runtime";

type ImagePropOverrides = {
  srcset: { width: number; url: string }[];
  sizes?: string[] | string;
};

export type ImageProps = ImagePropOverrides &
  Pick<
    JSX.ImgHTMLAttributes<HTMLImageElement>,
    "alt" | "width" | "height" | "class" | "classList" | "style"
  >;

export default function Image({ srcset, sizes, alt, ...props }: ImageProps) {
  return (
    <img
      {...props}
      alt={alt}
      src={srcset.at(-1)?.url}
      srcset={srcset.map(({ width, url }) => `${url} ${width}w`).join(", ")}
      sizes={typeof sizes === "string" ? sizes : sizes?.join("\n")}
    />
  );
}
