import type { ImageProps } from "@/components/image/image";
import Image from "@/components/image/image";
import styles from "./album-art.module.css";

export type AlbumArtProps = {
  name: string;
  srcSet: ImageProps["srcSet"];
  sizes?: ImageProps["sizes"];
  containerClass?: string | undefined;
  reflectionClass?: string | undefined;
};

export function AlbumArt(props: AlbumArtProps) {
  return (
    <div className={`${props.containerClass ?? ""} ${styles.container}`}>
      <Image
        srcSet={props.srcSet}
        sizes={props.sizes}
        alt={`${props.name} cover art`}
        className={styles.art}
      />
      <Image
        srcSet={props.srcSet}
        sizes={props.sizes}
        alt={`${props.name} cover art reflection`}
        className={`${props.reflectionClass ?? ""} ${styles.reflection}`}
      />
    </div>
  );
}
