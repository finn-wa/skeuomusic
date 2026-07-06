import type { ImgHTMLAttributes } from "react";

export type ImageSrcSet = {
  width?: number | null;
  url: string;
}[];

type ImagePropOverrides = {
  srcSet: ImageSrcSet;
  sizes?: string[] | string;
};

export type ImageProps = ImagePropOverrides &
  Pick<
    ImgHTMLAttributes<HTMLImageElement>,
    "alt" | "width" | "height" | "className" | "style" | "id"
  >;

export default function Image(props: ImageProps) {
  return (
    <img
      srcSet={props.srcSet
        .map(({ width, url }) => (width == null ? url : `${url} ${width}w`))
        .join(", ")}
      sizes={typeof props.sizes === "string" ? props.sizes : props.sizes?.join(", ")}
      alt={props.alt}
      width={props.width}
      height={props.height}
      className={props.className}
      style={props.style}
      src={props.srcSet.at(-1)?.url}
      id={props.id}
    />
  );
}
