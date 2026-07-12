import type { ImageSrcSet } from "@/components/image/image";
import { useEffect, useState } from "react";
import { useSubsonicAuthState, type SubsonicAuthState } from "../context/auth";
import defaultCoverArt from "./default-cover-art.svg";

/**
 * Build an authenticated cover art URL that can be used directly as an `img`
 * src. The auth token/salt is captured once at login and reused here, so no
 * request is needed to resolve the URL.
 */
function buildSubsonicCoverArtUrl(
  { api, requestParams }: SubsonicAuthState,
  coverArtId: string,
  size?: number,
): string {
  const params = new URLSearchParams(requestParams);
  params.set("id", coverArtId);
  if (size !== undefined) {
    params.set("size", size.toString());
  }
  return `${api.baseURL()}rest/getCoverArt.view?${params}`;
}

/**
 * Returns a srcset for a thumbnail-sized cover art image from Subsonic, or null if no
 * coverArtId was provided.
 */
function useSubsonicCoverArtThumbnailSrcSet(
  coverArtId: string | null,
): ImageSrcSet | null {
  const subsonic = useSubsonicAuthState();
  if (coverArtId != null) {
    return [64, 128].map((width) => ({
      width,
      url: buildSubsonicCoverArtUrl(subsonic, coverArtId, width),
    }));
  }
  return null;
}

/**
 * Returns a srcset for a full-sized cover art image from Subsonic, or null if no
 * coverArtId was provided. We can downscale images using the Subsonic API, but we can't
 * know the full size image until it's been loaded - so the srcset consists of only the
 * full-sized image.
 */
function useSubsonicCoverArtSrcSet(coverArtId: string | null): ImageSrcSet | null {
  const subsonic = useSubsonicAuthState();
  if (coverArtId != null) {
    return [{ url: buildSubsonicCoverArtUrl(subsonic, coverArtId) }];
  }
  return null;
}

type LastFmImageUrls = {
  small?: string;
  medium?: string;
  large?: string;
};

/**
 * Fetches cover art URLs from Last FM in three sizes. Note that the server doesn't return
 * the size of these images.
 */
function useLastFmCoverArtUrls(albumId: string | null): LastFmImageUrls | null {
  const [imageUrls, setImageUrls] = useState<LastFmImageUrls | null>(null);
  const subsonic = useSubsonicAuthState();
  useEffect(() => {
    if (albumId === null) {
      setImageUrls(null);
      return;
    }
    let cancelled = false;
    subsonic.api
      .getAlbumInfo({ id: albumId })
      .then(({ albumInfo }) => {
        if (cancelled) {
          return;
        }
        setImageUrls({
          small: albumInfo.smallImageUrl,
          medium: albumInfo.mediumImageUrl,
          large: albumInfo.largeImageUrl,
        });
      })
      .catch((error) => {
        console.error("Failed to get album info", error);
      });
    return () => {
      cancelled = true;
    };
  }, [albumId, subsonic]);

  return imageUrls;
}

/**
 * Returns a srcset for a thumbnail-sized cover art image from Last FM. Note that the
 * server doesn't return the size of these images, so we can't use a proper srcset.
 */
function useLastFmCoverArtThumbnailSrcSet(albumId: string | null): ImageSrcSet | null {
  const imageUrls = useLastFmCoverArtUrls(albumId);
  if (imageUrls === null) {
    return null;
  }
  const url = imageUrls.small ?? imageUrls.medium ?? imageUrls.large;
  if (url == null) {
    return null;
  }
  return [{ url }];
}

/**
 * Returns a srcset for a full-sized cover art image from Last FM. Note that the server
 * doesn't return the size of these images, so we can't use a proper srcset.
 */
function useLastFmCoverArtSrcSet(albumId: string | null): ImageSrcSet | null {
  const imageUrls = useLastFmCoverArtUrls(albumId);
  if (imageUrls === null) {
    return null;
  }
  const url = imageUrls.large ?? imageUrls.medium ?? imageUrls.small;
  if (url == null) {
    return null;
  }
  return [{ url }];
}

export type CoverArtInfo = {
  coverArtId?: string;
  albumId: string;
};

/**
 * Returns a srcset for a thumbnail-sized cover art image. Images are retrieved from
 * Subsonic if coverArtId is provided, or Last FM if not.
 */
export function useCoverArtThumbnailSrcSet({
  coverArtId,
  albumId,
}: CoverArtInfo): ImageSrcSet {
  const subsonicImgSrcSet = useSubsonicCoverArtThumbnailSrcSet(coverArtId ?? null);
  const lastFmImgSrcSet = useLastFmCoverArtThumbnailSrcSet(
    coverArtId == null ? albumId : null,
  );
  return subsonicImgSrcSet ?? lastFmImgSrcSet ?? [{ url: defaultCoverArt }];
}

/**
 * Returns a srcset for a full-sized cover art image. Images are retrieved from
 * Subsonic if coverArtId is provided, or Last FM if not.
 */
export function useCoverArtSrcSet({ coverArtId, albumId }: CoverArtInfo): ImageSrcSet {
  const subsonicImgSrcSet = useSubsonicCoverArtSrcSet(coverArtId ?? null);
  const lastFmImgSrcSet = useLastFmCoverArtSrcSet(coverArtId == null ? albumId : null);
  return subsonicImgSrcSet ?? lastFmImgSrcSet ?? [{ url: defaultCoverArt }];
}
