import Image from "@/components/image/image";
import {
  useCoverArtThumbnailSrcSet,
  type CoverArtInfo,
} from "@/shared/subsonic/cover-art";

export type AlbumCoverProps = CoverArtInfo & {
  name: string;
};

/** A thumbnail-size cover art image. */
export function AlbumCoverThumbnail({ name, ...coverArtInfo }: AlbumCoverProps) {
  const srcSet = useCoverArtThumbnailSrcSet(coverArtInfo);
  return <Image srcSet={srcSet} sizes={"58"} alt={`${name} cover art`} />;
}
