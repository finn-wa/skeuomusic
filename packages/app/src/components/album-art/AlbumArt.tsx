import Image, { type ImageProps } from "../image/Image";
import styles from "./AlbumArt.module.css";

export type AlbumArtProps = {
  name: string;
  srcset: ImageProps["srcset"];
  sizes?: ImageProps["sizes"];
  containerClass?: string | undefined;
  reflectionClass?: string | undefined;
};

export function AlbumArt(props: AlbumArtProps) {
  return (
    <div class={`${props.containerClass ?? ""} ${styles.container}`}>
      <Image
        srcset={props.srcset}
        sizes={props.sizes}
        alt={`${props.name} cover art`}
        class={styles.art}
      />
      <Image
        srcset={props.srcset}
        sizes={props.sizes}
        alt={`${props.name} cover art reflection`}
        class={`${props.reflectionClass ?? ""} ${styles.reflection}`}
      />
    </div>
  );
}
