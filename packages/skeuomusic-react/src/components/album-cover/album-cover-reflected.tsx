import Image from "@/components/image/image";
import { useCoverArtSrcSet, type CoverArtInfo } from "@/shared/subsonic/cover-art";
import styles from "./album-cover-reflected.module.css";

export type AlbumCoverReflectedProps = CoverArtInfo & {
  name: string;
  containerClass?: string | undefined;
  reflectionClass?: string | undefined;
};

/** Full-size album cover art with a reflection below it. */
export function AlbumCoverReflected({
  name,
  containerClass,
  reflectionClass,
  ...coverArtInfo
}: AlbumCoverReflectedProps) {
  const sizes = ["(max-width: 1000px) 33vw", "333px"];
  const srcSet = useCoverArtSrcSet(coverArtInfo);
  return (
    <div className={`${containerClass ?? ""} ${styles.container}`}>
      <Image
        srcSet={srcSet}
        sizes={sizes}
        alt={`${name} cover art`}
        className={styles.art}
      />
      <Image
        srcSet={srcSet}
        sizes={sizes}
        alt={`${name} cover art reflection`}
        className={`${reflectionClass ?? ""} ${styles.reflection}`}
      />
    </div>
  );
}
