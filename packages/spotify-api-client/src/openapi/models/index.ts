/* tslint:disable */
/* eslint-disable */
/**
 * @export
 * @interface AddItemsToPlaylistRequest
 */
export interface AddItemsToPlaylistRequest {
  [key: string]: any | any;
  /**
   * A JSON array of the [Spotify
   * URIs](/documentation/web-api/concepts/spotify-uris-ids) to add. For
   * example: `{"uris":
   * ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh","spotify:track:1301WleyT98MSxVHPZCA6M",
   * "spotify:episode:512ojhOuo1ktJprKbVcKyQ"]}`<br/>A maximum of 100 items can
   * be added in one request. _**Note**: if the `uris` parameter is present in
   * the query string, any URIs listed here in the body will be ignored._
   *
   * @memberof AddItemsToPlaylistRequest
   * @type {string[]}
   */
  uris?: Array<string>;
  /**
   * The position to insert the items, a zero-based index. For example, to
   * insert the items in the first position: `position=0` ; to insert the items
   * in the third position: `position=2`. If omitted, the items will be appended
   * to the playlist. Items are added in the order they appear in the uris
   * array. For example: `{"uris":
   * ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh","spotify:track:1301WleyT98MSxVHPZCA6M"],
   * "position": 3}`
   *
   * @memberof AddItemsToPlaylistRequest
   * @type {number}
   */
  position?: number;
}
/**
 * @export
 * @interface AlbumBase
 */
export interface AlbumBase {
  /**
   * The type of the album.
   *
   * @memberof AlbumBase
   * @type {string}
   */
  album_type: AlbumBaseAlbumTypeEnum;
  /**
   * The number of tracks in the album.
   *
   * @memberof AlbumBase
   * @type {number}
   */
  total_tracks: number;
  /**
   * The markets in which the album is available: [ISO 3166-1 alpha-2 country
   * codes](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). _**NOTE**: an
   * album is considered available in a market when at least 1 of its tracks is
   * available in that market._
   *
   * @memberof AlbumBase
   * @deprecated
   * @type {string[]}
   */
  available_markets: Array<string>;
  /**
   * Known external URLs for this album.
   *
   * @memberof AlbumBase
   * @type {ExternalUrlObject}
   */
  external_urls: ExternalUrlObject;
  /**
   * A link to the Web API endpoint providing full details of the album.
   *
   * @memberof AlbumBase
   * @type {string}
   */
  href: string;
  /**
   * The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the
   * album.
   *
   * @memberof AlbumBase
   * @type {string}
   */
  id: string;
  /**
   * The cover art for the album in various sizes, widest first.
   *
   * @memberof AlbumBase
   * @type {ImageObject[]}
   */
  images: Array<ImageObject>;
  /**
   * The name of the album. In case of an album takedown, the value may be an
   * empty string.
   *
   * @memberof AlbumBase
   * @type {string}
   */
  name: string;
  /**
   * The date the album was first released.
   *
   * @memberof AlbumBase
   * @type {string}
   */
  release_date: string;
  /**
   * The precision with which `release_date` value is known.
   *
   * @memberof AlbumBase
   * @type {string}
   */
  release_date_precision: AlbumBaseReleaseDatePrecisionEnum;
  /**
   * Included in the response when a content restriction is applied.
   *
   * @memberof AlbumBase
   * @type {AlbumRestrictionObject}
   */
  restrictions?: AlbumRestrictionObject;
  /**
   * The object type.
   *
   * @memberof AlbumBase
   * @type {string}
   */
  type: AlbumBaseTypeEnum;
  /**
   * The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the
   * album.
   *
   * @memberof AlbumBase
   * @type {string}
   */
  uri: string;
}

/** @export */
export const AlbumBaseAlbumTypeEnum = {
  Album: "album",
  Single: "single",
  Compilation: "compilation",
} as const;
export type AlbumBaseAlbumTypeEnum =
  (typeof AlbumBaseAlbumTypeEnum)[keyof typeof AlbumBaseAlbumTypeEnum];

/** @export */
export const AlbumBaseReleaseDatePrecisionEnum = {
  Year: "year",
  Month: "month",
  Day: "day",
} as const;
export type AlbumBaseReleaseDatePrecisionEnum =
  (typeof AlbumBaseReleaseDatePrecisionEnum)[keyof typeof AlbumBaseReleaseDatePrecisionEnum];

/** @export */
export const AlbumBaseTypeEnum = {
  Album: "album",
} as const;
export type AlbumBaseTypeEnum =
  (typeof AlbumBaseTypeEnum)[keyof typeof AlbumBaseTypeEnum];

/**
 * @export
 * @interface AlbumObject
 */
export interface AlbumObject {
  /**
   * The type of the album.
   *
   * @memberof AlbumObject
   * @type {string}
   */
  album_type: AlbumObjectAlbumTypeEnum;
  /**
   * The number of tracks in the album.
   *
   * @memberof AlbumObject
   * @type {number}
   */
  total_tracks: number;
  /**
   * The markets in which the album is available: [ISO 3166-1 alpha-2 country
   * codes](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). _**NOTE**: an
   * album is considered available in a market when at least 1 of its tracks is
   * available in that market._
   *
   * @memberof AlbumObject
   * @deprecated
   * @type {string[]}
   */
  available_markets: Array<string>;
  /**
   * Known external URLs for this album.
   *
   * @memberof AlbumObject
   * @type {ExternalUrlObject}
   */
  external_urls: ExternalUrlObject;
  /**
   * A link to the Web API endpoint providing full details of the album.
   *
   * @memberof AlbumObject
   * @type {string}
   */
  href: string;
  /**
   * The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the
   * album.
   *
   * @memberof AlbumObject
   * @type {string}
   */
  id: string;
  /**
   * The cover art for the album in various sizes, widest first.
   *
   * @memberof AlbumObject
   * @type {ImageObject[]}
   */
  images: Array<ImageObject>;
  /**
   * The name of the album. In case of an album takedown, the value may be an
   * empty string.
   *
   * @memberof AlbumObject
   * @type {string}
   */
  name: string;
  /**
   * The date the album was first released.
   *
   * @memberof AlbumObject
   * @type {string}
   */
  release_date: string;
  /**
   * The precision with which `release_date` value is known.
   *
   * @memberof AlbumObject
   * @type {string}
   */
  release_date_precision: AlbumObjectReleaseDatePrecisionEnum;
  /**
   * Included in the response when a content restriction is applied.
   *
   * @memberof AlbumObject
   * @type {AlbumRestrictionObject}
   */
  restrictions?: AlbumRestrictionObject;
  /**
   * The object type.
   *
   * @memberof AlbumObject
   * @type {string}
   */
  type: AlbumObjectTypeEnum;
  /**
   * The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the
   * album.
   *
   * @memberof AlbumObject
   * @type {string}
   */
  uri: string;
  /**
   * The artists of the album. Each artist object includes a link in `href` to
   * more detailed information about the artist.
   *
   * @memberof AlbumObject
   * @type {SimplifiedArtistObject[]}
   */
  artists: Array<SimplifiedArtistObject>;
  /**
   * The tracks of the album.
   *
   * @memberof AlbumObject
   * @type {PagingSimplifiedTrackObject}
   */
  tracks: PagingSimplifiedTrackObject;
  /**
   * The copyright statements of the album.
   *
   * @memberof AlbumObject
   * @type {CopyrightObject[]}
   */
  copyrights: Array<CopyrightObject>;
  /**
   * Known external IDs for the album.
   *
   * @memberof AlbumObject
   * @type {ExternalIdObject}
   */
  external_ids: ExternalIdObject;
  /**
   * **Deprecated** The array is always empty.
   *
   * @memberof AlbumObject
   * @deprecated
   * @type {string[]}
   */
  genres: Array<string>;
  /**
   * The label associated with the album.
   *
   * @memberof AlbumObject
   * @deprecated
   * @type {string}
   */
  label: string;
  /**
   * The popularity of the album. The value will be between 0 and 100, with 100
   * being the most popular.
   *
   * @memberof AlbumObject
   * @deprecated
   * @type {number}
   */
  popularity: number;
}

/** @export */
export const AlbumObjectAlbumTypeEnum = {
  Album: "album",
  Single: "single",
  Compilation: "compilation",
} as const;
export type AlbumObjectAlbumTypeEnum =
  (typeof AlbumObjectAlbumTypeEnum)[keyof typeof AlbumObjectAlbumTypeEnum];

/** @export */
export const AlbumObjectReleaseDatePrecisionEnum = {
  Year: "year",
  Month: "month",
  Day: "day",
} as const;
export type AlbumObjectReleaseDatePrecisionEnum =
  (typeof AlbumObjectReleaseDatePrecisionEnum)[keyof typeof AlbumObjectReleaseDatePrecisionEnum];

/** @export */
export const AlbumObjectTypeEnum = {
  Album: "album",
} as const;
export type AlbumObjectTypeEnum =
  (typeof AlbumObjectTypeEnum)[keyof typeof AlbumObjectTypeEnum];

/**
 * @export
 * @interface AlbumRestrictionObject
 */
export interface AlbumRestrictionObject {
  /**
   * The reason for the restriction. Albums may be restricted if the content is
   * not available in a given market, to the user's subscription type, or when
   * the user's account is set to not play explicit content. Additional reasons
   * may be added in the future.
   *
   * @memberof AlbumRestrictionObject
   * @type {string}
   */
  reason?: AlbumRestrictionObjectReasonEnum;
}

/** @export */
export const AlbumRestrictionObjectReasonEnum = {
  Market: "market",
  Product: "product",
  Explicit: "explicit",
} as const;
export type AlbumRestrictionObjectReasonEnum =
  (typeof AlbumRestrictionObjectReasonEnum)[keyof typeof AlbumRestrictionObjectReasonEnum];

/**
 * @export
 * @interface ArtistDiscographyAlbumObject
 */
export interface ArtistDiscographyAlbumObject {
  /**
   * The type of the album.
   *
   * @memberof ArtistDiscographyAlbumObject
   * @type {string}
   */
  album_type: ArtistDiscographyAlbumObjectAlbumTypeEnum;
  /**
   * The number of tracks in the album.
   *
   * @memberof ArtistDiscographyAlbumObject
   * @type {number}
   */
  total_tracks: number;
  /**
   * The markets in which the album is available: [ISO 3166-1 alpha-2 country
   * codes](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). _**NOTE**: an
   * album is considered available in a market when at least 1 of its tracks is
   * available in that market._
   *
   * @memberof ArtistDiscographyAlbumObject
   * @deprecated
   * @type {string[]}
   */
  available_markets: Array<string>;
  /**
   * Known external URLs for this album.
   *
   * @memberof ArtistDiscographyAlbumObject
   * @type {ExternalUrlObject}
   */
  external_urls: ExternalUrlObject;
  /**
   * A link to the Web API endpoint providing full details of the album.
   *
   * @memberof ArtistDiscographyAlbumObject
   * @type {string}
   */
  href: string;
  /**
   * The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the
   * album.
   *
   * @memberof ArtistDiscographyAlbumObject
   * @type {string}
   */
  id: string;
  /**
   * The cover art for the album in various sizes, widest first.
   *
   * @memberof ArtistDiscographyAlbumObject
   * @type {ImageObject[]}
   */
  images: Array<ImageObject>;
  /**
   * The name of the album. In case of an album takedown, the value may be an
   * empty string.
   *
   * @memberof ArtistDiscographyAlbumObject
   * @type {string}
   */
  name: string;
  /**
   * The date the album was first released.
   *
   * @memberof ArtistDiscographyAlbumObject
   * @type {string}
   */
  release_date: string;
  /**
   * The precision with which `release_date` value is known.
   *
   * @memberof ArtistDiscographyAlbumObject
   * @type {string}
   */
  release_date_precision: ArtistDiscographyAlbumObjectReleaseDatePrecisionEnum;
  /**
   * Included in the response when a content restriction is applied.
   *
   * @memberof ArtistDiscographyAlbumObject
   * @type {AlbumRestrictionObject}
   */
  restrictions?: AlbumRestrictionObject;
  /**
   * The object type.
   *
   * @memberof ArtistDiscographyAlbumObject
   * @type {string}
   */
  type: ArtistDiscographyAlbumObjectTypeEnum;
  /**
   * The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the
   * album.
   *
   * @memberof ArtistDiscographyAlbumObject
   * @type {string}
   */
  uri: string;
  /**
   * The artists of the album. Each artist object includes a link in `href` to
   * more detailed information about the artist.
   *
   * @memberof ArtistDiscographyAlbumObject
   * @type {SimplifiedArtistObject[]}
   */
  artists: Array<SimplifiedArtistObject>;
  /**
   * This field describes the relationship between the artist and the album.
   *
   * @memberof ArtistDiscographyAlbumObject
   * @deprecated
   * @type {string}
   */
  album_group: ArtistDiscographyAlbumObjectAlbumGroupEnum;
}

/** @export */
export const ArtistDiscographyAlbumObjectAlbumTypeEnum = {
  Album: "album",
  Single: "single",
  Compilation: "compilation",
} as const;
export type ArtistDiscographyAlbumObjectAlbumTypeEnum =
  (typeof ArtistDiscographyAlbumObjectAlbumTypeEnum)[keyof typeof ArtistDiscographyAlbumObjectAlbumTypeEnum];

/** @export */
export const ArtistDiscographyAlbumObjectReleaseDatePrecisionEnum = {
  Year: "year",
  Month: "month",
  Day: "day",
} as const;
export type ArtistDiscographyAlbumObjectReleaseDatePrecisionEnum =
  (typeof ArtistDiscographyAlbumObjectReleaseDatePrecisionEnum)[keyof typeof ArtistDiscographyAlbumObjectReleaseDatePrecisionEnum];

/** @export */
export const ArtistDiscographyAlbumObjectTypeEnum = {
  Album: "album",
} as const;
export type ArtistDiscographyAlbumObjectTypeEnum =
  (typeof ArtistDiscographyAlbumObjectTypeEnum)[keyof typeof ArtistDiscographyAlbumObjectTypeEnum];

/** @export */
export const ArtistDiscographyAlbumObjectAlbumGroupEnum = {
  Album: "album",
  Single: "single",
  Compilation: "compilation",
  AppearsOn: "appears_on",
} as const;
export type ArtistDiscographyAlbumObjectAlbumGroupEnum =
  (typeof ArtistDiscographyAlbumObjectAlbumGroupEnum)[keyof typeof ArtistDiscographyAlbumObjectAlbumGroupEnum];

/**
 * @export
 * @interface ArtistObject
 */
export interface ArtistObject {
  /**
   * Known external URLs for this artist.
   *
   * @memberof ArtistObject
   * @type {ExternalUrlObject}
   */
  external_urls?: ExternalUrlObject;
  /**
   * Information about the followers of the artist.
   *
   * @memberof ArtistObject
   * @deprecated
   * @type {FollowersObject}
   */
  followers?: FollowersObject;
  /**
   * A list of the genres the artist is associated with. If not yet classified,
   * the array is empty.
   *
   * @memberof ArtistObject
   * @deprecated
   * @type {string[]}
   */
  genres?: Array<string>;
  /**
   * A link to the Web API endpoint providing full details of the artist.
   *
   * @memberof ArtistObject
   * @type {string}
   */
  href?: string;
  /**
   * The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the
   * artist.
   *
   * @memberof ArtistObject
   * @type {string}
   */
  id?: string;
  /**
   * Images of the artist in various sizes, widest first.
   *
   * @memberof ArtistObject
   * @type {ImageObject[]}
   */
  images?: Array<ImageObject>;
  /**
   * The name of the artist.
   *
   * @memberof ArtistObject
   * @type {string}
   */
  name?: string;
  /**
   * The popularity of the artist. The value will be between 0 and 100, with 100
   * being the most popular. The artist's popularity is calculated from the
   * popularity of all the artist's tracks.
   *
   * @memberof ArtistObject
   * @deprecated
   * @type {number}
   */
  popularity?: number;
  /**
   * The object type.
   *
   * @memberof ArtistObject
   * @type {string}
   */
  type?: ArtistObjectTypeEnum;
  /**
   * The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the
   * artist.
   *
   * @memberof ArtistObject
   * @type {string}
   */
  uri?: string;
}

/** @export */
export const ArtistObjectTypeEnum = {
  Artist: "artist",
} as const;
export type ArtistObjectTypeEnum =
  (typeof ArtistObjectTypeEnum)[keyof typeof ArtistObjectTypeEnum];

/**
 * @export
 * @interface AudioAnalysisObject
 */
export interface AudioAnalysisObject {
  /**
   * @memberof AudioAnalysisObject
   * @type {AudioAnalysisObjectMeta}
   */
  meta?: AudioAnalysisObjectMeta;
  /**
   * @memberof AudioAnalysisObject
   * @type {AudioAnalysisObjectTrack}
   */
  track?: AudioAnalysisObjectTrack;
  /**
   * The time intervals of the bars throughout the track. A bar (or measure) is
   * a segment of time defined as a given number of beats.
   *
   * @memberof AudioAnalysisObject
   * @type {TimeIntervalObject[]}
   */
  bars?: Array<TimeIntervalObject>;
  /**
   * The time intervals of beats throughout the track. A beat is the basic time
   * unit of a piece of music; for example, each tick of a metronome. Beats are
   * typically multiples of tatums.
   *
   * @memberof AudioAnalysisObject
   * @type {TimeIntervalObject[]}
   */
  beats?: Array<TimeIntervalObject>;
  /**
   * Sections are defined by large variations in rhythm or timbre, e.g. chorus,
   * verse, bridge, guitar solo, etc. Each section contains its own descriptions
   * of tempo, key, mode, time_signature, and loudness.
   *
   * @memberof AudioAnalysisObject
   * @type {SectionObject[]}
   */
  sections?: Array<SectionObject>;
  /**
   * Each segment contains a roughly conisistent sound throughout its duration.
   *
   * @memberof AudioAnalysisObject
   * @type {SegmentObject[]}
   */
  segments?: Array<SegmentObject>;
  /**
   * A tatum represents the lowest regular pulse train that a listener
   * intuitively infers from the timing of perceived musical events (segments).
   *
   * @memberof AudioAnalysisObject
   * @type {TimeIntervalObject[]}
   */
  tatums?: Array<TimeIntervalObject>;
}
/**
 * @export
 * @interface AudioAnalysisObjectMeta
 */
export interface AudioAnalysisObjectMeta {
  /**
   * The version of the Analyzer used to analyze this track.
   *
   * @memberof AudioAnalysisObjectMeta
   * @type {string}
   */
  analyzer_version?: string;
  /**
   * The platform used to read the track's audio data.
   *
   * @memberof AudioAnalysisObjectMeta
   * @type {string}
   */
  platform?: string;
  /**
   * A detailed status code for this track. If analysis data is missing, this
   * code may explain why.
   *
   * @memberof AudioAnalysisObjectMeta
   * @type {string}
   */
  detailed_status?: string;
  /**
   * The return code of the analyzer process. 0 if successful, 1 if any errors
   * occurred.
   *
   * @memberof AudioAnalysisObjectMeta
   * @type {number}
   */
  status_code?: number;
  /**
   * The Unix timestamp (in seconds) at which this track was analyzed.
   *
   * @memberof AudioAnalysisObjectMeta
   * @type {number}
   */
  timestamp?: number;
  /**
   * The amount of time taken to analyze this track.
   *
   * @memberof AudioAnalysisObjectMeta
   * @type {number}
   */
  analysis_time?: number;
  /**
   * The method used to read the track's audio data.
   *
   * @memberof AudioAnalysisObjectMeta
   * @type {string}
   */
  input_process?: string;
}
/**
 * @export
 * @interface AudioAnalysisObjectTrack
 */
export interface AudioAnalysisObjectTrack {
  /**
   * The exact number of audio samples analyzed from this track. See also
   * `analysis_sample_rate`.
   *
   * @memberof AudioAnalysisObjectTrack
   * @type {number}
   */
  num_samples?: number;
  /**
   * Length of the track in seconds.
   *
   * @memberof AudioAnalysisObjectTrack
   * @type {number}
   */
  duration?: number;
  /**
   * This field will always contain the empty string.
   *
   * @memberof AudioAnalysisObjectTrack
   * @type {string}
   */
  sample_md5?: string;
  /**
   * An offset to the start of the region of the track that was analyzed. (As
   * the entire track is analyzed, this should always be 0.)
   *
   * @memberof AudioAnalysisObjectTrack
   * @type {number}
   */
  offset_seconds?: number;
  /**
   * The length of the region of the track was analyzed, if a subset of the
   * track was analyzed. (As the entire track is analyzed, this should always be
   * 0.)
   *
   * @memberof AudioAnalysisObjectTrack
   * @type {number}
   */
  window_seconds?: number;
  /**
   * The sample rate used to decode and analyze this track. May differ from the
   * actual sample rate of this track available on Spotify.
   *
   * @memberof AudioAnalysisObjectTrack
   * @type {number}
   */
  analysis_sample_rate?: number;
  /**
   * The number of channels used for analysis. If 1, all channels are summed
   * together to mono before analysis.
   *
   * @memberof AudioAnalysisObjectTrack
   * @type {number}
   */
  analysis_channels?: number;
  /**
   * The time, in seconds, at which the track's fade-in period ends. If the
   * track has no fade-in, this will be 0.0.
   *
   * @memberof AudioAnalysisObjectTrack
   * @type {number}
   */
  end_of_fade_in?: number;
  /**
   * The time, in seconds, at which the track's fade-out period starts. If the
   * track has no fade-out, this should match the track's length.
   *
   * @memberof AudioAnalysisObjectTrack
   * @type {number}
   */
  start_of_fade_out?: number;
  /**
   * The overall loudness of a track in decibels (dB). Loudness values are
   * averaged across the entire track and are useful for comparing relative
   * loudness of tracks. Loudness is the quality of a sound that is the primary
   * psychological correlate of physical strength (amplitude). Values typically
   * range between -60 and 0 db.
   *
   * @memberof AudioAnalysisObjectTrack
   * @type {number}
   */
  loudness?: number;
  /**
   * The overall estimated tempo of a track in beats per minute (BPM). In
   * musical terminology, tempo is the speed or pace of a given piece and
   * derives directly from the average beat duration.
   *
   * @memberof AudioAnalysisObjectTrack
   * @type {number}
   */
  tempo?: number;
  /**
   * The confidence, from 0.0 to 1.0, of the reliability of the `tempo`.
   *
   * @memberof AudioAnalysisObjectTrack
   * @type {number}
   */
  tempo_confidence?: number;
  /**
   * An estimated time signature. The time signature (meter) is a notational
   * convention to specify how many beats are in each bar (or measure). The time
   * signature ranges from 3 to 7 indicating time signatures of "3/4", to
   * "7/4".
   *
   * @memberof AudioAnalysisObjectTrack
   * @type {number}
   */
  time_signature?: number;
  /**
   * The confidence, from 0.0 to 1.0, of the reliability of the
   * `time_signature`.
   *
   * @memberof AudioAnalysisObjectTrack
   * @type {number}
   */
  time_signature_confidence?: number;
  /**
   * The key the track is in. Integers map to pitches using standard [Pitch
   * Class notation](https://en.wikipedia.org/wiki/Pitch_class). E.g. 0 = C, 1 =
   * C♯/D♭, 2 = D, and so on. If no key was detected, the value is -1.
   *
   * @memberof AudioAnalysisObjectTrack
   * @type {number}
   */
  key?: number;
  /**
   * The confidence, from 0.0 to 1.0, of the reliability of the `key`.
   *
   * @memberof AudioAnalysisObjectTrack
   * @type {number}
   */
  key_confidence?: number;
  /**
   * Mode indicates the modality (major or minor) of a track, the type of scale
   * from which its melodic content is derived. Major is represented by 1 and
   * minor is 0.
   *
   * @memberof AudioAnalysisObjectTrack
   * @type {number}
   */
  mode?: number;
  /**
   * The confidence, from 0.0 to 1.0, of the reliability of the `mode`.
   *
   * @memberof AudioAnalysisObjectTrack
   * @type {number}
   */
  mode_confidence?: number;
  /**
   * An [Echo Nest Musical Fingerprint
   * (ENMFP)](https://academiccommons.columbia.edu/doi/10.7916/D8Q248M4)
   * codestring for this track.
   *
   * @memberof AudioAnalysisObjectTrack
   * @type {string}
   */
  codestring?: string;
  /**
   * A version number for the Echo Nest Musical Fingerprint format used in the
   * codestring field.
   *
   * @memberof AudioAnalysisObjectTrack
   * @type {number}
   */
  code_version?: number;
  /**
   * An [EchoPrint](https://github.com/spotify/echoprint-codegen) codestring for
   * this track.
   *
   * @memberof AudioAnalysisObjectTrack
   * @type {string}
   */
  echoprintstring?: string;
  /**
   * A version number for the EchoPrint format used in the echoprintstring
   * field.
   *
   * @memberof AudioAnalysisObjectTrack
   * @type {number}
   */
  echoprint_version?: number;
  /**
   * A [Synchstring](https://github.com/echonest/synchdata) for this track.
   *
   * @memberof AudioAnalysisObjectTrack
   * @type {string}
   */
  synchstring?: string;
  /**
   * A version number for the Synchstring used in the synchstring field.
   *
   * @memberof AudioAnalysisObjectTrack
   * @type {number}
   */
  synch_version?: number;
  /**
   * A Rhythmstring for this track. The format of this string is similar to the
   * Synchstring.
   *
   * @memberof AudioAnalysisObjectTrack
   * @type {string}
   */
  rhythmstring?: string;
  /**
   * A version number for the Rhythmstring used in the rhythmstring field.
   *
   * @memberof AudioAnalysisObjectTrack
   * @type {number}
   */
  rhythm_version?: number;
}
/**
 * @export
 * @interface AudioFeaturesObject
 */
export interface AudioFeaturesObject {
  /**
   * A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0
   * represents high confidence the track is acoustic.
   *
   * @memberof AudioFeaturesObject
   * @type {number}
   */
  acousticness?: number;
  /**
   * A URL to access the full audio analysis of this track. An access token is
   * required to access this data.
   *
   * @memberof AudioFeaturesObject
   * @type {string}
   */
  analysis_url?: string;
  /**
   * Danceability describes how suitable a track is for dancing based on a
   * combination of musical elements including tempo, rhythm stability, beat
   * strength, and overall regularity. A value of 0.0 is least danceable and 1.0
   * is most danceable.
   *
   * @memberof AudioFeaturesObject
   * @type {number}
   */
  danceability?: number;
  /**
   * The duration of the track in milliseconds.
   *
   * @memberof AudioFeaturesObject
   * @type {number}
   */
  duration_ms?: number;
  /**
   * Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of
   * intensity and activity. Typically, energetic tracks feel fast, loud, and
   * noisy. For example, death metal has high energy, while a Bach prelude
   * scores low on the scale. Perceptual features contributing to this attribute
   * include dynamic range, perceived loudness, timbre, onset rate, and general
   * entropy.
   *
   * @memberof AudioFeaturesObject
   * @type {number}
   */
  energy?: number;
  /**
   * The Spotify ID for the track.
   *
   * @memberof AudioFeaturesObject
   * @type {string}
   */
  id?: string;
  /**
   * Predicts whether a track contains no vocals. "Ooh" and "aah" sounds are
   * treated as instrumental in this context. Rap or spoken word tracks are
   * clearly "vocal". The closer the instrumentalness value is to 1.0, the
   * greater likelihood the track contains no vocal content. Values above 0.5
   * are intended to represent instrumental tracks, but confidence is higher as
   * the value approaches 1.0.
   *
   * @memberof AudioFeaturesObject
   * @type {number}
   */
  instrumentalness?: number;
  /**
   * The key the track is in. Integers map to pitches using standard [Pitch
   * Class notation](https://en.wikipedia.org/wiki/Pitch_class). E.g. 0 = C, 1 =
   * C♯/D♭, 2 = D, and so on. If no key was detected, the value is -1.
   *
   * @memberof AudioFeaturesObject
   * @type {number}
   */
  key?: number;
  /**
   * Detects the presence of an audience in the recording. Higher liveness
   * values represent an increased probability that the track was performed
   * live. A value above 0.8 provides strong likelihood that the track is live.
   *
   * @memberof AudioFeaturesObject
   * @type {number}
   */
  liveness?: number;
  /**
   * The overall loudness of a track in decibels (dB). Loudness values are
   * averaged across the entire track and are useful for comparing relative
   * loudness of tracks. Loudness is the quality of a sound that is the primary
   * psychological correlate of physical strength (amplitude). Values typically
   * range between -60 and 0 db.
   *
   * @memberof AudioFeaturesObject
   * @type {number}
   */
  loudness?: number;
  /**
   * Mode indicates the modality (major or minor) of a track, the type of scale
   * from which its melodic content is derived. Major is represented by 1 and
   * minor is 0.
   *
   * @memberof AudioFeaturesObject
   * @type {number}
   */
  mode?: number;
  /**
   * Speechiness detects the presence of spoken words in a track. The more
   * exclusively speech-like the recording (e.g. talk show, audio book, poetry),
   * the closer to 1.0 the attribute value. Values above 0.66 describe tracks
   * that are probably made entirely of spoken words. Values between 0.33 and
   * 0.66 describe tracks that may contain both music and speech, either in
   * sections or layered, including such cases as rap music. Values below 0.33
   * most likely represent music and other non-speech-like tracks.
   *
   * @memberof AudioFeaturesObject
   * @type {number}
   */
  speechiness?: number;
  /**
   * The overall estimated tempo of a track in beats per minute (BPM). In
   * musical terminology, tempo is the speed or pace of a given piece and
   * derives directly from the average beat duration.
   *
   * @memberof AudioFeaturesObject
   * @type {number}
   */
  tempo?: number;
  /**
   * An estimated time signature. The time signature (meter) is a notational
   * convention to specify how many beats are in each bar (or measure). The time
   * signature ranges from 3 to 7 indicating time signatures of "3/4", to
   * "7/4".
   *
   * @memberof AudioFeaturesObject
   * @type {number}
   */
  time_signature?: number;
  /**
   * A link to the Web API endpoint providing full details of the track.
   *
   * @memberof AudioFeaturesObject
   * @type {string}
   */
  track_href?: string;
  /**
   * The object type.
   *
   * @memberof AudioFeaturesObject
   * @type {string}
   */
  type?: AudioFeaturesObjectTypeEnum;
  /**
   * The Spotify URI for the track.
   *
   * @memberof AudioFeaturesObject
   * @type {string}
   */
  uri?: string;
  /**
   * A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a
   * track. Tracks with high valence sound more positive (e.g. happy, cheerful,
   * euphoric), while tracks with low valence sound more negative (e.g. sad,
   * depressed, angry).
   *
   * @memberof AudioFeaturesObject
   * @type {number}
   */
  valence?: number;
}

/** @export */
export const AudioFeaturesObjectTypeEnum = {
  AudioFeatures: "audio_features",
} as const;
export type AudioFeaturesObjectTypeEnum =
  (typeof AudioFeaturesObjectTypeEnum)[keyof typeof AudioFeaturesObjectTypeEnum];

/**
 * @export
 * @interface AudiobookBase
 */
export interface AudiobookBase {
  /**
   * The author(s) for the audiobook.
   *
   * @memberof AudiobookBase
   * @type {AuthorObject[]}
   */
  authors: Array<AuthorObject>;
  /**
   * A list of the countries in which the audiobook can be played, identified by
   * their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
   * code.
   *
   * @memberof AudiobookBase
   * @deprecated
   * @type {string[]}
   */
  available_markets: Array<string>;
  /**
   * The copyright statements of the audiobook.
   *
   * @memberof AudiobookBase
   * @type {CopyrightObject[]}
   */
  copyrights: Array<CopyrightObject>;
  /**
   * A description of the audiobook. HTML tags are stripped away from this
   * field, use `html_description` field in case HTML tags are needed.
   *
   * @memberof AudiobookBase
   * @type {string}
   */
  description: string;
  /**
   * A description of the audiobook. This field may contain HTML tags.
   *
   * @memberof AudiobookBase
   * @type {string}
   */
  html_description: string;
  /**
   * The edition of the audiobook.
   *
   * @memberof AudiobookBase
   * @type {string}
   */
  edition?: string;
  /**
   * Whether or not the audiobook has explicit content (true = yes it does;
   * false = no it does not OR unknown).
   *
   * @memberof AudiobookBase
   * @type {boolean}
   */
  explicit: boolean;
  /**
   * External URLs for this audiobook.
   *
   * @memberof AudiobookBase
   * @type {ExternalUrlObject}
   */
  external_urls: ExternalUrlObject;
  /**
   * A link to the Web API endpoint providing full details of the audiobook.
   *
   * @memberof AudiobookBase
   * @type {string}
   */
  href: string;
  /**
   * The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the
   * audiobook.
   *
   * @memberof AudiobookBase
   * @type {string}
   */
  id: string;
  /**
   * The cover art for the audiobook in various sizes, widest first.
   *
   * @memberof AudiobookBase
   * @type {ImageObject[]}
   */
  images: Array<ImageObject>;
  /**
   * A list of the languages used in the audiobook, identified by their [ISO
   * 639](https://en.wikipedia.org/wiki/ISO_639) code.
   *
   * @memberof AudiobookBase
   * @type {string[]}
   */
  languages: Array<string>;
  /**
   * The media type of the audiobook.
   *
   * @memberof AudiobookBase
   * @type {string}
   */
  media_type: string;
  /**
   * The name of the audiobook.
   *
   * @memberof AudiobookBase
   * @type {string}
   */
  name: string;
  /**
   * The narrator(s) for the audiobook.
   *
   * @memberof AudiobookBase
   * @type {NarratorObject[]}
   */
  narrators: Array<NarratorObject>;
  /**
   * The publisher of the audiobook.
   *
   * @memberof AudiobookBase
   * @deprecated
   * @type {string}
   */
  publisher: string;
  /**
   * The object type.
   *
   * @memberof AudiobookBase
   * @type {string}
   */
  type: AudiobookBaseTypeEnum;
  /**
   * The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the
   * audiobook.
   *
   * @memberof AudiobookBase
   * @type {string}
   */
  uri: string;
  /**
   * The number of chapters in this audiobook.
   *
   * @memberof AudiobookBase
   * @type {number}
   */
  total_chapters: number;
}

/** @export */
export const AudiobookBaseTypeEnum = {
  Audiobook: "audiobook",
} as const;
export type AudiobookBaseTypeEnum =
  (typeof AudiobookBaseTypeEnum)[keyof typeof AudiobookBaseTypeEnum];

/**
 * @export
 * @interface AudiobookObject
 */
export interface AudiobookObject {
  /**
   * The author(s) for the audiobook.
   *
   * @memberof AudiobookObject
   * @type {AuthorObject[]}
   */
  authors: Array<AuthorObject>;
  /**
   * A list of the countries in which the audiobook can be played, identified by
   * their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
   * code.
   *
   * @memberof AudiobookObject
   * @deprecated
   * @type {string[]}
   */
  available_markets: Array<string>;
  /**
   * The copyright statements of the audiobook.
   *
   * @memberof AudiobookObject
   * @type {CopyrightObject[]}
   */
  copyrights: Array<CopyrightObject>;
  /**
   * A description of the audiobook. HTML tags are stripped away from this
   * field, use `html_description` field in case HTML tags are needed.
   *
   * @memberof AudiobookObject
   * @type {string}
   */
  description: string;
  /**
   * A description of the audiobook. This field may contain HTML tags.
   *
   * @memberof AudiobookObject
   * @type {string}
   */
  html_description: string;
  /**
   * The edition of the audiobook.
   *
   * @memberof AudiobookObject
   * @type {string}
   */
  edition?: string;
  /**
   * Whether or not the audiobook has explicit content (true = yes it does;
   * false = no it does not OR unknown).
   *
   * @memberof AudiobookObject
   * @type {boolean}
   */
  explicit: boolean;
  /**
   * External URLs for this audiobook.
   *
   * @memberof AudiobookObject
   * @type {ExternalUrlObject}
   */
  external_urls: ExternalUrlObject;
  /**
   * A link to the Web API endpoint providing full details of the audiobook.
   *
   * @memberof AudiobookObject
   * @type {string}
   */
  href: string;
  /**
   * The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the
   * audiobook.
   *
   * @memberof AudiobookObject
   * @type {string}
   */
  id: string;
  /**
   * The cover art for the audiobook in various sizes, widest first.
   *
   * @memberof AudiobookObject
   * @type {ImageObject[]}
   */
  images: Array<ImageObject>;
  /**
   * A list of the languages used in the audiobook, identified by their [ISO
   * 639](https://en.wikipedia.org/wiki/ISO_639) code.
   *
   * @memberof AudiobookObject
   * @type {string[]}
   */
  languages: Array<string>;
  /**
   * The media type of the audiobook.
   *
   * @memberof AudiobookObject
   * @type {string}
   */
  media_type: string;
  /**
   * The name of the audiobook.
   *
   * @memberof AudiobookObject
   * @type {string}
   */
  name: string;
  /**
   * The narrator(s) for the audiobook.
   *
   * @memberof AudiobookObject
   * @type {NarratorObject[]}
   */
  narrators: Array<NarratorObject>;
  /**
   * The publisher of the audiobook.
   *
   * @memberof AudiobookObject
   * @deprecated
   * @type {string}
   */
  publisher: string;
  /**
   * The object type.
   *
   * @memberof AudiobookObject
   * @type {string}
   */
  type: AudiobookObjectTypeEnum;
  /**
   * The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the
   * audiobook.
   *
   * @memberof AudiobookObject
   * @type {string}
   */
  uri: string;
  /**
   * The number of chapters in this audiobook.
   *
   * @memberof AudiobookObject
   * @type {number}
   */
  total_chapters: number;
  /**
   * The chapters of the audiobook.
   *
   * @memberof AudiobookObject
   * @type {object}
   */
  chapters: object;
}

/** @export */
export const AudiobookObjectTypeEnum = {
  Audiobook: "audiobook",
} as const;
export type AudiobookObjectTypeEnum =
  (typeof AudiobookObjectTypeEnum)[keyof typeof AudiobookObjectTypeEnum];

/**
 * @export
 * @interface AuthorObject
 */
export interface AuthorObject {
  /**
   * The name of the author.
   *
   * @memberof AuthorObject
   * @type {string}
   */
  name?: string;
}
/**
 * @export
 * @interface CategoryObject
 */
export interface CategoryObject {
  /**
   * A link to the Web API endpoint returning full details of the category.
   *
   * @memberof CategoryObject
   * @type {string}
   */
  href: string;
  /**
   * The category icon, in various sizes.
   *
   * @memberof CategoryObject
   * @type {ImageObject[]}
   */
  icons: Array<ImageObject>;
  /**
   * The [Spotify category ID](/documentation/web-api/concepts/spotify-uris-ids)
   * of the category.
   *
   * @memberof CategoryObject
   * @type {string}
   */
  id: string;
  /**
   * The name of the category.
   *
   * @memberof CategoryObject
   * @type {string}
   */
  name: string;
}
/**
 * @export
 * @interface ChangePlaylistDetailsRequest
 */
export interface ChangePlaylistDetailsRequest {
  [key: string]: any | any;
  /**
   * The new name for the playlist, for example `"My New Playlist Title"`
   *
   * @memberof ChangePlaylistDetailsRequest
   * @type {string}
   */
  name?: string;
  /**
   * The playlist's public/private status (if it should be added to the user's
   * profile or not): `true` the playlist will be public, `false` the playlist
   * will be private, `null` the playlist status is not relevant. For more about
   * public/private status, see [Working with
   * Playlists](/documentation/web-api/concepts/playlists)
   *
   * @memberof ChangePlaylistDetailsRequest
   * @type {boolean}
   */
  _public?: boolean;
  /**
   * If `true`, the playlist will become collaborative and other users will be
   * able to modify the playlist in their Spotify client. <br/> _**Note**: You
   * can only set `collaborative` to `true` on non-public playlists._
   *
   * @memberof ChangePlaylistDetailsRequest
   * @type {boolean}
   */
  collaborative?: boolean;
  /**
   * Value for playlist description as displayed in Spotify Clients and in the
   * Web API.
   *
   * @memberof ChangePlaylistDetailsRequest
   * @type {string}
   */
  description?: string;
}
/**
 * @export
 * @interface ChapterBase
 */
export interface ChapterBase {
  /**
   * A URL to a 30 second preview (MP3 format) of the chapter. `null` if not
   * available.
   *
   * @memberof ChapterBase
   * @deprecated
   * @type {string}
   */
  audio_preview_url: string | null;
  /**
   * A list of the countries in which the chapter can be played, identified by
   * their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
   * code.
   *
   * @memberof ChapterBase
   * @deprecated
   * @type {string[]}
   */
  available_markets?: Array<string>;
  /**
   * The number of the chapter
   *
   * @memberof ChapterBase
   * @type {number}
   */
  chapter_number: number;
  /**
   * A description of the chapter. HTML tags are stripped away from this field,
   * use `html_description` field in case HTML tags are needed.
   *
   * @memberof ChapterBase
   * @type {string}
   */
  description: string;
  /**
   * A description of the chapter. This field may contain HTML tags.
   *
   * @memberof ChapterBase
   * @type {string}
   */
  html_description: string;
  /**
   * The chapter length in milliseconds.
   *
   * @memberof ChapterBase
   * @type {number}
   */
  duration_ms: number;
  /**
   * Whether or not the chapter has explicit content (true = yes it does; false
   * = no it does not OR unknown).
   *
   * @memberof ChapterBase
   * @type {boolean}
   */
  explicit: boolean;
  /**
   * External URLs for this chapter.
   *
   * @memberof ChapterBase
   * @type {ExternalUrlObject}
   */
  external_urls: ExternalUrlObject;
  /**
   * A link to the Web API endpoint providing full details of the chapter.
   *
   * @memberof ChapterBase
   * @type {string}
   */
  href: string;
  /**
   * The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the
   * chapter.
   *
   * @memberof ChapterBase
   * @type {string}
   */
  id: string;
  /**
   * The cover art for the chapter in various sizes, widest first.
   *
   * @memberof ChapterBase
   * @type {ImageObject[]}
   */
  images: Array<ImageObject>;
  /**
   * True if the chapter is playable in the given market. Otherwise false.
   *
   * @memberof ChapterBase
   * @type {boolean}
   */
  is_playable: boolean;
  /**
   * A list of the languages used in the chapter, identified by their [ISO
   * 639-1](https://en.wikipedia.org/wiki/ISO_639) code.
   *
   * @memberof ChapterBase
   * @type {string[]}
   */
  languages: Array<string>;
  /**
   * The name of the chapter.
   *
   * @memberof ChapterBase
   * @type {string}
   */
  name: string;
  /**
   * The date the chapter was first released, for example `"1981-12-15"`.
   * Depending on the precision, it might be shown as `"1981"` or `"1981-12"`.
   *
   * @memberof ChapterBase
   * @type {string}
   */
  release_date: string;
  /**
   * The precision with which `release_date` value is known.
   *
   * @memberof ChapterBase
   * @type {string}
   */
  release_date_precision: ChapterBaseReleaseDatePrecisionEnum;
  /**
   * The user's most recent position in the chapter. Set if the supplied access
   * token is a user token and has the scope 'user-read-playback-position'.
   *
   * @memberof ChapterBase
   * @type {ResumePointObject}
   */
  resume_point?: ResumePointObject;
  /**
   * The object type.
   *
   * @memberof ChapterBase
   * @type {string}
   */
  type: ChapterBaseTypeEnum;
  /**
   * The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the
   * chapter.
   *
   * @memberof ChapterBase
   * @type {string}
   */
  uri: string;
  /**
   * Included in the response when a content restriction is applied.
   *
   * @memberof ChapterBase
   * @type {ChapterRestrictionObject}
   */
  restrictions?: ChapterRestrictionObject;
}

/** @export */
export const ChapterBaseReleaseDatePrecisionEnum = {
  Year: "year",
  Month: "month",
  Day: "day",
} as const;
export type ChapterBaseReleaseDatePrecisionEnum =
  (typeof ChapterBaseReleaseDatePrecisionEnum)[keyof typeof ChapterBaseReleaseDatePrecisionEnum];

/** @export */
export const ChapterBaseTypeEnum = {
  Episode: "episode",
} as const;
export type ChapterBaseTypeEnum =
  (typeof ChapterBaseTypeEnum)[keyof typeof ChapterBaseTypeEnum];

/**
 * @export
 * @interface ChapterObject
 */
export interface ChapterObject {
  /**
   * A URL to a 30 second preview (MP3 format) of the chapter. `null` if not
   * available.
   *
   * @memberof ChapterObject
   * @deprecated
   * @type {string}
   */
  audio_preview_url: string | null;
  /**
   * A list of the countries in which the chapter can be played, identified by
   * their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
   * code.
   *
   * @memberof ChapterObject
   * @deprecated
   * @type {string[]}
   */
  available_markets?: Array<string>;
  /**
   * The number of the chapter
   *
   * @memberof ChapterObject
   * @type {number}
   */
  chapter_number: number;
  /**
   * A description of the chapter. HTML tags are stripped away from this field,
   * use `html_description` field in case HTML tags are needed.
   *
   * @memberof ChapterObject
   * @type {string}
   */
  description: string;
  /**
   * A description of the chapter. This field may contain HTML tags.
   *
   * @memberof ChapterObject
   * @type {string}
   */
  html_description: string;
  /**
   * The chapter length in milliseconds.
   *
   * @memberof ChapterObject
   * @type {number}
   */
  duration_ms: number;
  /**
   * Whether or not the chapter has explicit content (true = yes it does; false
   * = no it does not OR unknown).
   *
   * @memberof ChapterObject
   * @type {boolean}
   */
  explicit: boolean;
  /**
   * External URLs for this chapter.
   *
   * @memberof ChapterObject
   * @type {ExternalUrlObject}
   */
  external_urls: ExternalUrlObject;
  /**
   * A link to the Web API endpoint providing full details of the chapter.
   *
   * @memberof ChapterObject
   * @type {string}
   */
  href: string;
  /**
   * The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the
   * chapter.
   *
   * @memberof ChapterObject
   * @type {string}
   */
  id: string;
  /**
   * The cover art for the chapter in various sizes, widest first.
   *
   * @memberof ChapterObject
   * @type {ImageObject[]}
   */
  images: Array<ImageObject>;
  /**
   * True if the chapter is playable in the given market. Otherwise false.
   *
   * @memberof ChapterObject
   * @type {boolean}
   */
  is_playable: boolean;
  /**
   * A list of the languages used in the chapter, identified by their [ISO
   * 639-1](https://en.wikipedia.org/wiki/ISO_639) code.
   *
   * @memberof ChapterObject
   * @type {string[]}
   */
  languages: Array<string>;
  /**
   * The name of the chapter.
   *
   * @memberof ChapterObject
   * @type {string}
   */
  name: string;
  /**
   * The date the chapter was first released, for example `"1981-12-15"`.
   * Depending on the precision, it might be shown as `"1981"` or `"1981-12"`.
   *
   * @memberof ChapterObject
   * @type {string}
   */
  release_date: string;
  /**
   * The precision with which `release_date` value is known.
   *
   * @memberof ChapterObject
   * @type {string}
   */
  release_date_precision: ChapterObjectReleaseDatePrecisionEnum;
  /**
   * The user's most recent position in the chapter. Set if the supplied access
   * token is a user token and has the scope 'user-read-playback-position'.
   *
   * @memberof ChapterObject
   * @type {ResumePointObject}
   */
  resume_point?: ResumePointObject;
  /**
   * The object type.
   *
   * @memberof ChapterObject
   * @type {string}
   */
  type: ChapterObjectTypeEnum;
  /**
   * The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the
   * chapter.
   *
   * @memberof ChapterObject
   * @type {string}
   */
  uri: string;
  /**
   * Included in the response when a content restriction is applied.
   *
   * @memberof ChapterObject
   * @type {ChapterRestrictionObject}
   */
  restrictions?: ChapterRestrictionObject;
  /**
   * The audiobook for which the chapter belongs.
   *
   * @memberof ChapterObject
   * @type {SimplifiedAudiobookObject}
   */
  audiobook: SimplifiedAudiobookObject;
}

/** @export */
export const ChapterObjectReleaseDatePrecisionEnum = {
  Year: "year",
  Month: "month",
  Day: "day",
} as const;
export type ChapterObjectReleaseDatePrecisionEnum =
  (typeof ChapterObjectReleaseDatePrecisionEnum)[keyof typeof ChapterObjectReleaseDatePrecisionEnum];

/** @export */
export const ChapterObjectTypeEnum = {
  Episode: "episode",
} as const;
export type ChapterObjectTypeEnum =
  (typeof ChapterObjectTypeEnum)[keyof typeof ChapterObjectTypeEnum];

/**
 * @export
 * @interface ChapterRestrictionObject
 */
export interface ChapterRestrictionObject {
  /**
   * The reason for the restriction. Supported values:
   *
   * - `market` - The content item is not available in the given market.
   * - `product` - The content item is not available for the user's subscription
   *   type.
   * - `explicit` - The content item is explicit and the user's account is set to
   *   not play explicit content.
   * - `payment_required` - Payment is required to play the content item.
   *
   * Additional reasons may be added in the future. **Note**: If you use this
   * field, make sure that your application safely handles unknown values.
   *
   * @memberof ChapterRestrictionObject
   * @type {string}
   */
  reason?: string;
}
/**
 * @export
 * @interface ContextObject
 */
export interface ContextObject {
  /**
   * The object type, e.g. "artist", "playlist", "album", "show".
   *
   * @memberof ContextObject
   * @type {string}
   */
  type?: string;
  /**
   * A link to the Web API endpoint providing full details of the track.
   *
   * @memberof ContextObject
   * @type {string}
   */
  href?: string;
  /**
   * External URLs for this context.
   *
   * @memberof ContextObject
   * @type {ExternalUrlObject}
   */
  external_urls?: ExternalUrlObject;
  /**
   * The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the
   * context.
   *
   * @memberof ContextObject
   * @type {string}
   */
  uri?: string;
}
/**
 * @export
 * @interface CopyrightObject
 */
export interface CopyrightObject {
  /**
   * The copyright text for this content.
   *
   * @memberof CopyrightObject
   * @type {string}
   */
  text?: string;
  /**
   * The type of copyright: `C` = the copyright, `P` = the sound recording
   * (performance) copyright.
   *
   * @memberof CopyrightObject
   * @type {string}
   */
  type?: string;
}
/**
 * @export
 * @interface CreatePlaylistRequest
 */
export interface CreatePlaylistRequest {
  [key: string]: any | any;
  /**
   * The name for the new playlist, for example `"Your Coolest Playlist"`. This
   * name does not need to be unique; a user may have several playlists with the
   * same name.
   *
   * @memberof CreatePlaylistRequest
   * @type {string}
   */
  name: string;
  /**
   * Defaults to `true`. The playlist's public/private status (if it should be
   * added to the user's profile or not): `true` the playlist will be public,
   * `false` the playlist will be private. To be able to create private
   * playlists, the user must have granted the `playlist-modify-private`
   * [scope](/documentation/web-api/concepts/scopes/#list-of-scopes). For more
   * about public/private status, see [Working with
   * Playlists](/documentation/web-api/concepts/playlists)
   *
   * @memberof CreatePlaylistRequest
   * @type {boolean}
   */
  _public?: boolean;
  /**
   * Defaults to `false`. If `true` the playlist will be collaborative.
   * _**Note**: to create a collaborative playlist you must also set `public` to
   * `false`. To create collaborative playlists you must have granted
   * `playlist-modify-private` and `playlist-modify-public`
   * [scopes](/documentation/web-api/concepts/scopes/#list-of-scopes)._
   *
   * @memberof CreatePlaylistRequest
   * @type {boolean}
   */
  collaborative?: boolean;
  /**
   * Value for playlist description as displayed in Spotify Clients and in the
   * Web API.
   *
   * @memberof CreatePlaylistRequest
   * @type {string}
   */
  description?: string;
}
/**
 * @export
 * @interface CurrentlyPlayingContextObject
 */
export interface CurrentlyPlayingContextObject {
  /**
   * The device that is currently active.
   *
   * @memberof CurrentlyPlayingContextObject
   * @type {DeviceObject}
   */
  device?: DeviceObject;
  /**
   * Off, track, context
   *
   * @memberof CurrentlyPlayingContextObject
   * @type {string}
   */
  repeat_state?: string;
  /**
   * If shuffle is on or off.
   *
   * @memberof CurrentlyPlayingContextObject
   * @type {boolean}
   */
  shuffle_state?: boolean;
  /**
   * A Context Object. Can be `null`.
   *
   * @memberof CurrentlyPlayingContextObject
   * @type {ContextObject}
   */
  context?: ContextObject;
  /**
   * Unix Millisecond Timestamp when playback state was last changed (play,
   * pause, skip, scrub, new song, etc.).
   *
   * @memberof CurrentlyPlayingContextObject
   * @type {number}
   */
  timestamp?: number;
  /**
   * Progress into the currently playing track or episode. Can be `null`.
   *
   * @memberof CurrentlyPlayingContextObject
   * @type {number}
   */
  progress_ms?: number;
  /**
   * If something is currently playing, return `true`.
   *
   * @memberof CurrentlyPlayingContextObject
   * @type {boolean}
   */
  is_playing?: boolean;
  /**
   * @memberof CurrentlyPlayingContextObject
   * @type {QueueObjectCurrentlyPlaying}
   */
  item?: QueueObjectCurrentlyPlaying;
  /**
   * The object type of the currently playing item. Can be one of `track`,
   * `episode`, `ad` or `unknown`.
   *
   * @memberof CurrentlyPlayingContextObject
   * @type {string}
   */
  currently_playing_type?: string;
  /**
   * Allows to update the user interface based on which playback actions are
   * available within the current context.
   *
   * @memberof CurrentlyPlayingContextObject
   * @type {DisallowsObject}
   */
  actions?: DisallowsObject;
}
/**
 * @export
 * @interface CurrentlyPlayingObject
 */
export interface CurrentlyPlayingObject {
  /**
   * A Context Object. Can be `null`.
   *
   * @memberof CurrentlyPlayingObject
   * @type {ContextObject}
   */
  context?: ContextObject;
  /**
   * Unix Millisecond Timestamp when data was fetched
   *
   * @memberof CurrentlyPlayingObject
   * @type {number}
   */
  timestamp?: number;
  /**
   * Progress into the currently playing track or episode. Can be `null`.
   *
   * @memberof CurrentlyPlayingObject
   * @type {number}
   */
  progress_ms?: number;
  /**
   * If something is currently playing, return `true`.
   *
   * @memberof CurrentlyPlayingObject
   * @type {boolean}
   */
  is_playing?: boolean;
  /**
   * @memberof CurrentlyPlayingObject
   * @type {QueueObjectCurrentlyPlaying}
   */
  item?: QueueObjectCurrentlyPlaying;
  /**
   * The object type of the currently playing item. Can be one of `track`,
   * `episode`, `ad` or `unknown`.
   *
   * @memberof CurrentlyPlayingObject
   * @type {string}
   */
  currently_playing_type?: string;
  /**
   * Allows to update the user interface based on which playback actions are
   * available within the current context.
   *
   * @memberof CurrentlyPlayingObject
   * @type {DisallowsObject}
   */
  actions?: DisallowsObject;
}
/**
 * @export
 * @interface CursorObject
 */
export interface CursorObject {
  /**
   * The cursor to use as key to find the next page of items.
   *
   * @memberof CursorObject
   * @type {string}
   */
  after?: string;
  /**
   * The cursor to use as key to find the previous page of items.
   *
   * @memberof CursorObject
   * @type {string}
   */
  before?: string;
}
/**
 * @export
 * @interface CursorPagingObject
 */
export interface CursorPagingObject {
  /**
   * A link to the Web API endpoint returning the full result of the request.
   *
   * @memberof CursorPagingObject
   * @type {string}
   */
  href?: string;
  /**
   * The maximum number of items in the response (as set in the query or by
   * default).
   *
   * @memberof CursorPagingObject
   * @type {number}
   */
  limit?: number;
  /**
   * URL to the next page of items. ( `null` if none)
   *
   * @memberof CursorPagingObject
   * @type {string}
   */
  next?: string;
  /**
   * The cursors used to find the next set of items.
   *
   * @memberof CursorPagingObject
   * @type {CursorObject}
   */
  cursors?: CursorObject;
  /**
   * The total number of items available to return.
   *
   * @memberof CursorPagingObject
   * @type {number}
   */
  total?: number;
}
/**
 * @export
 * @interface CursorPagingPlayHistoryObject
 */
export interface CursorPagingPlayHistoryObject {
  /**
   * A link to the Web API endpoint returning the full result of the request.
   *
   * @memberof CursorPagingPlayHistoryObject
   * @type {string}
   */
  href?: string;
  /**
   * The maximum number of items in the response (as set in the query or by
   * default).
   *
   * @memberof CursorPagingPlayHistoryObject
   * @type {number}
   */
  limit?: number;
  /**
   * URL to the next page of items. ( `null` if none)
   *
   * @memberof CursorPagingPlayHistoryObject
   * @type {string}
   */
  next?: string;
  /**
   * The cursors used to find the next set of items.
   *
   * @memberof CursorPagingPlayHistoryObject
   * @type {CursorObject}
   */
  cursors?: CursorObject;
  /**
   * The total number of items available to return.
   *
   * @memberof CursorPagingPlayHistoryObject
   * @type {number}
   */
  total?: number;
  /**
   * @memberof CursorPagingPlayHistoryObject
   * @type {PlayHistoryObject[]}
   */
  items?: Array<PlayHistoryObject>;
}
/**
 * @export
 * @interface CursorPagingSimplifiedArtistObject
 */
export interface CursorPagingSimplifiedArtistObject {
  /**
   * A link to the Web API endpoint returning the full result of the request.
   *
   * @memberof CursorPagingSimplifiedArtistObject
   * @type {string}
   */
  href?: string;
  /**
   * The maximum number of items in the response (as set in the query or by
   * default).
   *
   * @memberof CursorPagingSimplifiedArtistObject
   * @type {number}
   */
  limit?: number;
  /**
   * URL to the next page of items. ( `null` if none)
   *
   * @memberof CursorPagingSimplifiedArtistObject
   * @type {string}
   */
  next?: string;
  /**
   * The cursors used to find the next set of items.
   *
   * @memberof CursorPagingSimplifiedArtistObject
   * @type {CursorObject}
   */
  cursors?: CursorObject;
  /**
   * The total number of items available to return.
   *
   * @memberof CursorPagingSimplifiedArtistObject
   * @type {number}
   */
  total?: number;
  /**
   * @memberof CursorPagingSimplifiedArtistObject
   * @type {ArtistObject[]}
   */
  items?: Array<ArtistObject>;
}
/**
 * @export
 * @interface DeviceObject
 */
export interface DeviceObject {
  /**
   * The device ID. This ID is unique and persistent to some extent. However,
   * this is not guaranteed and any cached `device_id` should periodically be
   * cleared out and refetched as necessary.
   *
   * @memberof DeviceObject
   * @type {string}
   */
  id?: string | null;
  /**
   * If this device is the currently active device.
   *
   * @memberof DeviceObject
   * @type {boolean}
   */
  is_active?: boolean;
  /**
   * If this device is currently in a private session.
   *
   * @memberof DeviceObject
   * @type {boolean}
   */
  is_private_session?: boolean;
  /**
   * Whether controlling this device is restricted. At present if this is "true"
   * then no Web API commands will be accepted by this device.
   *
   * @memberof DeviceObject
   * @type {boolean}
   */
  is_restricted?: boolean;
  /**
   * A human-readable name for the device. Some devices have a name that the
   * user can configure (e.g. "Loudest speaker") and some devices have a generic
   * name associated with the manufacturer or device model.
   *
   * @memberof DeviceObject
   * @type {string}
   */
  name?: string;
  /**
   * Device type, such as "computer", "smartphone" or "speaker".
   *
   * @memberof DeviceObject
   * @type {string}
   */
  type?: string;
  /**
   * The current volume in percent.
   *
   * @memberof DeviceObject
   * @type {number}
   */
  volume_percent?: number | null;
  /**
   * If this device can be used to set the volume.
   *
   * @memberof DeviceObject
   * @type {boolean}
   */
  supports_volume?: boolean;
}
/**
 * @export
 * @interface DisallowsObject
 */
export interface DisallowsObject {
  /**
   * Interrupting playback. Optional field.
   *
   * @memberof DisallowsObject
   * @type {boolean}
   */
  interrupting_playback?: boolean;
  /**
   * Pausing. Optional field.
   *
   * @memberof DisallowsObject
   * @type {boolean}
   */
  pausing?: boolean;
  /**
   * Resuming. Optional field.
   *
   * @memberof DisallowsObject
   * @type {boolean}
   */
  resuming?: boolean;
  /**
   * Seeking playback location. Optional field.
   *
   * @memberof DisallowsObject
   * @type {boolean}
   */
  seeking?: boolean;
  /**
   * Skipping to the next context. Optional field.
   *
   * @memberof DisallowsObject
   * @type {boolean}
   */
  skipping_next?: boolean;
  /**
   * Skipping to the previous context. Optional field.
   *
   * @memberof DisallowsObject
   * @type {boolean}
   */
  skipping_prev?: boolean;
  /**
   * Toggling repeat context flag. Optional field.
   *
   * @memberof DisallowsObject
   * @type {boolean}
   */
  toggling_repeat_context?: boolean;
  /**
   * Toggling shuffle flag. Optional field.
   *
   * @memberof DisallowsObject
   * @type {boolean}
   */
  toggling_shuffle?: boolean;
  /**
   * Toggling repeat track flag. Optional field.
   *
   * @memberof DisallowsObject
   * @type {boolean}
   */
  toggling_repeat_track?: boolean;
  /**
   * Transfering playback between devices. Optional field.
   *
   * @memberof DisallowsObject
   * @type {boolean}
   */
  transferring_playback?: boolean;
}
/**
 * @export
 * @interface EpisodeBase
 */
export interface EpisodeBase {
  /**
   * A URL to a 30 second preview (MP3 format) of the episode. `null` if not
   * available.
   *
   * @memberof EpisodeBase
   * @deprecated
   * @type {string}
   */
  audio_preview_url: string | null;
  /**
   * A description of the episode. HTML tags are stripped away from this field,
   * use `html_description` field in case HTML tags are needed.
   *
   * @memberof EpisodeBase
   * @type {string}
   */
  description: string;
  /**
   * A description of the episode. This field may contain HTML tags.
   *
   * @memberof EpisodeBase
   * @type {string}
   */
  html_description: string;
  /**
   * The episode length in milliseconds.
   *
   * @memberof EpisodeBase
   * @type {number}
   */
  duration_ms: number;
  /**
   * Whether or not the episode has explicit content (true = yes it does; false
   * = no it does not OR unknown).
   *
   * @memberof EpisodeBase
   * @type {boolean}
   */
  explicit: boolean;
  /**
   * External URLs for this episode.
   *
   * @memberof EpisodeBase
   * @type {ExternalUrlObject}
   */
  external_urls: ExternalUrlObject;
  /**
   * A link to the Web API endpoint providing full details of the episode.
   *
   * @memberof EpisodeBase
   * @type {string}
   */
  href: string;
  /**
   * The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the
   * episode.
   *
   * @memberof EpisodeBase
   * @type {string}
   */
  id: string;
  /**
   * The cover art for the episode in various sizes, widest first.
   *
   * @memberof EpisodeBase
   * @type {ImageObject[]}
   */
  images: Array<ImageObject>;
  /**
   * True if the episode is hosted outside of Spotify's CDN.
   *
   * @memberof EpisodeBase
   * @type {boolean}
   */
  is_externally_hosted: boolean;
  /**
   * True if the episode is playable in the given market. Otherwise false.
   *
   * @memberof EpisodeBase
   * @type {boolean}
   */
  is_playable: boolean;
  /**
   * The language used in the episode, identified by a [ISO
   * 639](https://en.wikipedia.org/wiki/ISO_639) code. This field is deprecated
   * and might be removed in the future. Please use the `languages` field
   * instead.
   *
   * @memberof EpisodeBase
   * @deprecated
   * @type {string}
   */
  language?: string;
  /**
   * A list of the languages used in the episode, identified by their [ISO
   * 639-1](https://en.wikipedia.org/wiki/ISO_639) code.
   *
   * @memberof EpisodeBase
   * @type {string[]}
   */
  languages: Array<string>;
  /**
   * The name of the episode.
   *
   * @memberof EpisodeBase
   * @type {string}
   */
  name: string;
  /**
   * The date the episode was first released, for example `"1981-12-15"`.
   * Depending on the precision, it might be shown as `"1981"` or `"1981-12"`.
   *
   * @memberof EpisodeBase
   * @type {string}
   */
  release_date: string;
  /**
   * The precision with which `release_date` value is known.
   *
   * @memberof EpisodeBase
   * @type {string}
   */
  release_date_precision: EpisodeBaseReleaseDatePrecisionEnum;
  /**
   * The user's most recent position in the episode. Set if the supplied access
   * token is a user token and has the scope 'user-read-playback-position'.
   *
   * @memberof EpisodeBase
   * @type {ResumePointObject}
   */
  resume_point?: ResumePointObject;
  /**
   * The object type.
   *
   * @memberof EpisodeBase
   * @type {string}
   */
  type: EpisodeBaseTypeEnum;
  /**
   * The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the
   * episode.
   *
   * @memberof EpisodeBase
   * @type {string}
   */
  uri: string;
  /**
   * Included in the response when a content restriction is applied.
   *
   * @memberof EpisodeBase
   * @type {EpisodeRestrictionObject}
   */
  restrictions?: EpisodeRestrictionObject;
}

/** @export */
export const EpisodeBaseReleaseDatePrecisionEnum = {
  Year: "year",
  Month: "month",
  Day: "day",
} as const;
export type EpisodeBaseReleaseDatePrecisionEnum =
  (typeof EpisodeBaseReleaseDatePrecisionEnum)[keyof typeof EpisodeBaseReleaseDatePrecisionEnum];

/** @export */
export const EpisodeBaseTypeEnum = {
  Episode: "episode",
} as const;
export type EpisodeBaseTypeEnum =
  (typeof EpisodeBaseTypeEnum)[keyof typeof EpisodeBaseTypeEnum];

/**
 * @export
 * @interface EpisodeObject
 */
export interface EpisodeObject {
  /**
   * A URL to a 30 second preview (MP3 format) of the episode. `null` if not
   * available.
   *
   * @memberof EpisodeObject
   * @deprecated
   * @type {string}
   */
  audio_preview_url: string | null;
  /**
   * A description of the episode. HTML tags are stripped away from this field,
   * use `html_description` field in case HTML tags are needed.
   *
   * @memberof EpisodeObject
   * @type {string}
   */
  description: string;
  /**
   * A description of the episode. This field may contain HTML tags.
   *
   * @memberof EpisodeObject
   * @type {string}
   */
  html_description: string;
  /**
   * The episode length in milliseconds.
   *
   * @memberof EpisodeObject
   * @type {number}
   */
  duration_ms: number;
  /**
   * Whether or not the episode has explicit content (true = yes it does; false
   * = no it does not OR unknown).
   *
   * @memberof EpisodeObject
   * @type {boolean}
   */
  explicit: boolean;
  /**
   * External URLs for this episode.
   *
   * @memberof EpisodeObject
   * @type {ExternalUrlObject}
   */
  external_urls: ExternalUrlObject;
  /**
   * A link to the Web API endpoint providing full details of the episode.
   *
   * @memberof EpisodeObject
   * @type {string}
   */
  href: string;
  /**
   * The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the
   * episode.
   *
   * @memberof EpisodeObject
   * @type {string}
   */
  id: string;
  /**
   * The cover art for the episode in various sizes, widest first.
   *
   * @memberof EpisodeObject
   * @type {ImageObject[]}
   */
  images: Array<ImageObject>;
  /**
   * True if the episode is hosted outside of Spotify's CDN.
   *
   * @memberof EpisodeObject
   * @type {boolean}
   */
  is_externally_hosted: boolean;
  /**
   * True if the episode is playable in the given market. Otherwise false.
   *
   * @memberof EpisodeObject
   * @type {boolean}
   */
  is_playable: boolean;
  /**
   * The language used in the episode, identified by a [ISO
   * 639](https://en.wikipedia.org/wiki/ISO_639) code. This field is deprecated
   * and might be removed in the future. Please use the `languages` field
   * instead.
   *
   * @memberof EpisodeObject
   * @deprecated
   * @type {string}
   */
  language?: string;
  /**
   * A list of the languages used in the episode, identified by their [ISO
   * 639-1](https://en.wikipedia.org/wiki/ISO_639) code.
   *
   * @memberof EpisodeObject
   * @type {string[]}
   */
  languages: Array<string>;
  /**
   * The name of the episode.
   *
   * @memberof EpisodeObject
   * @type {string}
   */
  name: string;
  /**
   * The date the episode was first released, for example `"1981-12-15"`.
   * Depending on the precision, it might be shown as `"1981"` or `"1981-12"`.
   *
   * @memberof EpisodeObject
   * @type {string}
   */
  release_date: string;
  /**
   * The precision with which `release_date` value is known.
   *
   * @memberof EpisodeObject
   * @type {string}
   */
  release_date_precision: EpisodeObjectReleaseDatePrecisionEnum;
  /**
   * The user's most recent position in the episode. Set if the supplied access
   * token is a user token and has the scope 'user-read-playback-position'.
   *
   * @memberof EpisodeObject
   * @type {ResumePointObject}
   */
  resume_point?: ResumePointObject;
  /**
   * The object type.
   *
   * @memberof EpisodeObject
   * @type {string}
   */
  type: EpisodeObjectTypeEnum;
  /**
   * The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the
   * episode.
   *
   * @memberof EpisodeObject
   * @type {string}
   */
  uri: string;
  /**
   * Included in the response when a content restriction is applied.
   *
   * @memberof EpisodeObject
   * @type {EpisodeRestrictionObject}
   */
  restrictions?: EpisodeRestrictionObject;
  /**
   * The show on which the episode belongs.
   *
   * @memberof EpisodeObject
   * @type {SimplifiedShowObject}
   */
  show: SimplifiedShowObject;
}

/** @export */
export const EpisodeObjectReleaseDatePrecisionEnum = {
  Year: "year",
  Month: "month",
  Day: "day",
} as const;
export type EpisodeObjectReleaseDatePrecisionEnum =
  (typeof EpisodeObjectReleaseDatePrecisionEnum)[keyof typeof EpisodeObjectReleaseDatePrecisionEnum];

/** @export */
export const EpisodeObjectTypeEnum = {
  Episode: "episode",
} as const;
export type EpisodeObjectTypeEnum =
  (typeof EpisodeObjectTypeEnum)[keyof typeof EpisodeObjectTypeEnum];

/**
 * @export
 * @interface EpisodeRestrictionObject
 */
export interface EpisodeRestrictionObject {
  /**
   * The reason for the restriction. Supported values:
   *
   * - `market` - The content item is not available in the given market.
   * - `product` - The content item is not available for the user's subscription
   *   type.
   * - `explicit` - The content item is explicit and the user's account is set to
   *   not play explicit content.
   *
   * Additional reasons may be added in the future. **Note**: If you use this
   * field, make sure that your application safely handles unknown values.
   *
   * @memberof EpisodeRestrictionObject
   * @type {string}
   */
  reason?: string;
}
/**
 * @export
 * @interface ErrorObject
 */
export interface ErrorObject {
  /**
   * The HTTP status code (also returned in the response header; see [Response
   * Status
   * Codes](/documentation/web-api/concepts/api-calls#response-status-codes) for
   * more information).
   *
   * @memberof ErrorObject
   * @type {number}
   */
  status: number;
  /**
   * A short description of the cause of the error.
   *
   * @memberof ErrorObject
   * @type {string}
   */
  message: string;
}
/**
 * @export
 * @interface ExplicitContentSettingsObject
 */
export interface ExplicitContentSettingsObject {
  /**
   * When `true`, indicates that explicit content should not be played.
   *
   * @memberof ExplicitContentSettingsObject
   * @type {boolean}
   */
  filter_enabled?: boolean;
  /**
   * When `true`, indicates that the explicit content setting is locked and
   * can't be changed by the user.
   *
   * @memberof ExplicitContentSettingsObject
   * @type {boolean}
   */
  filter_locked?: boolean;
}
/**
 * @export
 * @interface ExternalIdObject
 */
export interface ExternalIdObject {
  /**
   * [International Standard Recording
   * Code](http://en.wikipedia.org/wiki/International_Standard_Recording_Code)
   *
   * @memberof ExternalIdObject
   * @type {string}
   */
  isrc?: string;
  /**
   * [International Article
   * Number](http://en.wikipedia.org/wiki/International_Article_Number_%28EAN%29)
   *
   * @memberof ExternalIdObject
   * @type {string}
   */
  ean?: string;
  /**
   * [Universal Product
   * Code](http://en.wikipedia.org/wiki/Universal_Product_Code)
   *
   * @memberof ExternalIdObject
   * @type {string}
   */
  upc?: string;
}
/**
 * @export
 * @interface ExternalUrlObject
 */
export interface ExternalUrlObject {
  /**
   * The [Spotify URL](/documentation/web-api/concepts/spotify-uris-ids) for the
   * object.
   *
   * @memberof ExternalUrlObject
   * @type {string}
   */
  spotify?: string;
}
/**
 * @export
 * @interface FollowersObject
 */
export interface FollowersObject {
  /**
   * This will always be set to null, as the Web API does not support it at the
   * moment.
   *
   * @memberof FollowersObject
   * @type {string}
   */
  href?: string | null;
  /**
   * The total number of followers.
   *
   * @memberof FollowersObject
   * @type {number}
   */
  total?: number;
}
/**
 * @export
 * @interface GetAUsersAvailableDevices200Response
 */
export interface GetAUsersAvailableDevices200Response {
  /**
   * @memberof GetAUsersAvailableDevices200Response
   * @type {DeviceObject[]}
   */
  devices: Array<DeviceObject>;
}
/**
 * @export
 * @interface GetAnAlbum401Response
 */
export interface GetAnAlbum401Response {
  /**
   * @memberof GetAnAlbum401Response
   * @type {ErrorObject}
   */
  error: ErrorObject;
}
/**
 * @export
 * @interface GetFollowed200Response
 */
export interface GetFollowed200Response {
  /**
   * @memberof GetFollowed200Response
   * @type {CursorPagingSimplifiedArtistObject}
   */
  artists: CursorPagingSimplifiedArtistObject;
}
/**
 * @export
 * @interface ImageObject
 */
export interface ImageObject {
  /**
   * The source URL of the image.
   *
   * @memberof ImageObject
   * @type {string}
   */
  url: string;
  /**
   * The image height in pixels.
   *
   * @memberof ImageObject
   * @type {number}
   */
  height: number | null;
  /**
   * The image width in pixels.
   *
   * @memberof ImageObject
   * @type {number}
   */
  width: number | null;
}
/**
 * @export
 * @interface InlineObject
 */
export interface InlineObject {
  /**
   * @memberof InlineObject
   * @type {AlbumObject[]}
   */
  albums: Array<AlbumObject>;
}
/**
 * @export
 * @interface InlineObject1
 */
export interface InlineObject1 {
  /**
   * @memberof InlineObject1
   * @type {AudiobookObject[]}
   */
  audiobooks: Array<AudiobookObject>;
}
/**
 * @export
 * @interface InlineObject10
 */
export interface InlineObject10 {
  /**
   * @memberof InlineObject10
   * @type {SimplifiedShowObject[]}
   */
  shows: Array<SimplifiedShowObject>;
}
/**
 * @export
 * @interface InlineObject11
 */
export interface InlineObject11 {
  /**
   * @memberof InlineObject11
   * @type {string[]}
   */
  markets?: Array<string>;
}
/**
 * @export
 * @interface InlineObject2
 */
export interface InlineObject2 {
  /**
   * @memberof InlineObject2
   * @type {ChapterObject[]}
   */
  chapters: Array<ChapterObject>;
}
/**
 * @export
 * @interface InlineObject3
 */
export interface InlineObject3 {
  /**
   * @memberof InlineObject3
   * @type {PagingSimplifiedAlbumObject}
   */
  albums: PagingSimplifiedAlbumObject;
}
/**
 * @export
 * @interface InlineObject4
 */
export interface InlineObject4 {
  /**
   * @memberof InlineObject4
   * @type {InlineObject4Categories}
   */
  categories: InlineObject4Categories;
}
/**
 * @export
 * @interface InlineObject4Categories
 */
export interface InlineObject4Categories {
  /**
   * A link to the Web API endpoint returning the full result of the request
   *
   * @memberof InlineObject4Categories
   * @type {string}
   */
  href: string;
  /**
   * The maximum number of items in the response (as set in the query or by
   * default).
   *
   * @memberof InlineObject4Categories
   * @type {number}
   */
  limit: number;
  /**
   * URL to the next page of items. ( `null` if none)
   *
   * @memberof InlineObject4Categories
   * @type {string}
   */
  next: string | null;
  /**
   * The offset of the items returned (as set in the query or by default)
   *
   * @memberof InlineObject4Categories
   * @type {number}
   */
  offset: number;
  /**
   * URL to the previous page of items. ( `null` if none)
   *
   * @memberof InlineObject4Categories
   * @type {string}
   */
  previous: string | null;
  /**
   * The total number of items available to return.
   *
   * @memberof InlineObject4Categories
   * @type {number}
   */
  total: number;
  /**
   * @memberof InlineObject4Categories
   * @type {CategoryObject[]}
   */
  items: Array<CategoryObject>;
}
/**
 * @export
 * @interface InlineObject5
 */
export interface InlineObject5 {
  /**
   * @memberof InlineObject5
   * @type {ArtistObject[]}
   */
  artists: Array<ArtistObject>;
}
/**
 * @export
 * @interface InlineObject6
 */
export interface InlineObject6 {
  /**
   * @memberof InlineObject6
   * @type {AudioFeaturesObject[]}
   */
  audio_features: Array<AudioFeaturesObject>;
}
/**
 * @export
 * @interface InlineObject7
 */
export interface InlineObject7 {
  /**
   * @memberof InlineObject7
   * @type {EpisodeObject[]}
   */
  episodes: Array<EpisodeObject>;
}
/**
 * @export
 * @interface InlineObject8
 */
export interface InlineObject8 {
  /**
   * @memberof InlineObject8
   * @type {string[]}
   */
  genres: Array<string>;
}
/**
 * @export
 * @interface InlineObject9
 */
export interface InlineObject9 {
  /**
   * @memberof InlineObject9
   * @type {TrackObject[]}
   */
  tracks: Array<TrackObject>;
}
/**
 * @export
 * @interface LinkedTrackObject
 */
export interface LinkedTrackObject {
  /**
   * Known external URLs for this track.
   *
   * @memberof LinkedTrackObject
   * @type {ExternalUrlObject}
   */
  external_urls?: ExternalUrlObject;
  /**
   * A link to the Web API endpoint providing full details of the track.
   *
   * @memberof LinkedTrackObject
   * @type {string}
   */
  href?: string;
  /**
   * The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the
   * track.
   *
   * @memberof LinkedTrackObject
   * @type {string}
   */
  id?: string;
  /**
   * The object type: "track".
   *
   * @memberof LinkedTrackObject
   * @type {string}
   */
  type?: string;
  /**
   * The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the
   * track.
   *
   * @memberof LinkedTrackObject
   * @type {string}
   */
  uri?: string;
}
/**
 * @export
 * @interface NarratorObject
 */
export interface NarratorObject {
  /**
   * The name of the Narrator.
   *
   * @memberof NarratorObject
   * @type {string}
   */
  name?: string;
}
/**
 * @export
 * @interface PagingArtistDiscographyAlbumObject
 */
export interface PagingArtistDiscographyAlbumObject {
  /**
   * A link to the Web API endpoint returning the full result of the request
   *
   * @memberof PagingArtistDiscographyAlbumObject
   * @type {string}
   */
  href: string;
  /**
   * The maximum number of items in the response (as set in the query or by
   * default).
   *
   * @memberof PagingArtistDiscographyAlbumObject
   * @type {number}
   */
  limit: number;
  /**
   * URL to the next page of items. ( `null` if none)
   *
   * @memberof PagingArtistDiscographyAlbumObject
   * @type {string}
   */
  next: string | null;
  /**
   * The offset of the items returned (as set in the query or by default)
   *
   * @memberof PagingArtistDiscographyAlbumObject
   * @type {number}
   */
  offset: number;
  /**
   * URL to the previous page of items. ( `null` if none)
   *
   * @memberof PagingArtistDiscographyAlbumObject
   * @type {string}
   */
  previous: string | null;
  /**
   * The total number of items available to return.
   *
   * @memberof PagingArtistDiscographyAlbumObject
   * @type {number}
   */
  total: number;
  /**
   * @memberof PagingArtistDiscographyAlbumObject
   * @type {ArtistDiscographyAlbumObject[]}
   */
  items: Array<ArtistDiscographyAlbumObject>;
}
/**
 * @export
 * @interface PagingArtistObject
 */
export interface PagingArtistObject {
  /**
   * A link to the Web API endpoint returning the full result of the request
   *
   * @memberof PagingArtistObject
   * @type {string}
   */
  href: string;
  /**
   * The maximum number of items in the response (as set in the query or by
   * default).
   *
   * @memberof PagingArtistObject
   * @type {number}
   */
  limit: number;
  /**
   * URL to the next page of items. ( `null` if none)
   *
   * @memberof PagingArtistObject
   * @type {string}
   */
  next: string | null;
  /**
   * The offset of the items returned (as set in the query or by default)
   *
   * @memberof PagingArtistObject
   * @type {number}
   */
  offset: number;
  /**
   * URL to the previous page of items. ( `null` if none)
   *
   * @memberof PagingArtistObject
   * @type {string}
   */
  previous: string | null;
  /**
   * The total number of items available to return.
   *
   * @memberof PagingArtistObject
   * @type {number}
   */
  total: number;
  /**
   * @memberof PagingArtistObject
   * @type {ArtistObject[]}
   */
  items: Array<ArtistObject>;
}
/**
 * @export
 * @interface PagingFeaturedPlaylistObject
 */
export interface PagingFeaturedPlaylistObject {
  /**
   * The localized message of a playlist.
   *
   * @memberof PagingFeaturedPlaylistObject
   * @type {string}
   */
  message?: string;
  /**
   * @memberof PagingFeaturedPlaylistObject
   * @type {PagingPlaylistObject}
   */
  playlists?: PagingPlaylistObject;
}
/**
 * @export
 * @interface PagingObject
 */
export interface PagingObject {
  /**
   * A link to the Web API endpoint returning the full result of the request
   *
   * @memberof PagingObject
   * @type {string}
   */
  href: string;
  /**
   * The maximum number of items in the response (as set in the query or by
   * default).
   *
   * @memberof PagingObject
   * @type {number}
   */
  limit: number;
  /**
   * URL to the next page of items. ( `null` if none)
   *
   * @memberof PagingObject
   * @type {string}
   */
  next: string | null;
  /**
   * The offset of the items returned (as set in the query or by default)
   *
   * @memberof PagingObject
   * @type {number}
   */
  offset: number;
  /**
   * URL to the previous page of items. ( `null` if none)
   *
   * @memberof PagingObject
   * @type {string}
   */
  previous: string | null;
  /**
   * The total number of items available to return.
   *
   * @memberof PagingObject
   * @type {number}
   */
  total: number;
}
/**
 * @export
 * @interface PagingPlaylistObject
 */
export interface PagingPlaylistObject {
  /**
   * A link to the Web API endpoint returning the full result of the request
   *
   * @memberof PagingPlaylistObject
   * @type {string}
   */
  href: string;
  /**
   * The maximum number of items in the response (as set in the query or by
   * default).
   *
   * @memberof PagingPlaylistObject
   * @type {number}
   */
  limit: number;
  /**
   * URL to the next page of items. ( `null` if none)
   *
   * @memberof PagingPlaylistObject
   * @type {string}
   */
  next: string | null;
  /**
   * The offset of the items returned (as set in the query or by default)
   *
   * @memberof PagingPlaylistObject
   * @type {number}
   */
  offset: number;
  /**
   * URL to the previous page of items. ( `null` if none)
   *
   * @memberof PagingPlaylistObject
   * @type {string}
   */
  previous: string | null;
  /**
   * The total number of items available to return.
   *
   * @memberof PagingPlaylistObject
   * @type {number}
   */
  total: number;
  /**
   * @memberof PagingPlaylistObject
   * @type {SimplifiedPlaylistObject[]}
   */
  items: Array<SimplifiedPlaylistObject>;
}
/**
 * @export
 * @interface PagingPlaylistTrackObject
 */
export interface PagingPlaylistTrackObject {
  /**
   * A link to the Web API endpoint returning the full result of the request
   *
   * @memberof PagingPlaylistTrackObject
   * @type {string}
   */
  href: string;
  /**
   * The maximum number of items in the response (as set in the query or by
   * default).
   *
   * @memberof PagingPlaylistTrackObject
   * @type {number}
   */
  limit: number;
  /**
   * URL to the next page of items. ( `null` if none)
   *
   * @memberof PagingPlaylistTrackObject
   * @type {string}
   */
  next: string | null;
  /**
   * The offset of the items returned (as set in the query or by default)
   *
   * @memberof PagingPlaylistTrackObject
   * @type {number}
   */
  offset: number;
  /**
   * URL to the previous page of items. ( `null` if none)
   *
   * @memberof PagingPlaylistTrackObject
   * @type {string}
   */
  previous: string | null;
  /**
   * The total number of items available to return.
   *
   * @memberof PagingPlaylistTrackObject
   * @type {number}
   */
  total: number;
  /**
   * @memberof PagingPlaylistTrackObject
   * @type {PlaylistTrackObject[]}
   */
  items: Array<PlaylistTrackObject>;
}
/**
 * @export
 * @interface PagingSavedAlbumObject
 */
export interface PagingSavedAlbumObject {
  /**
   * A link to the Web API endpoint returning the full result of the request
   *
   * @memberof PagingSavedAlbumObject
   * @type {string}
   */
  href: string;
  /**
   * The maximum number of items in the response (as set in the query or by
   * default).
   *
   * @memberof PagingSavedAlbumObject
   * @type {number}
   */
  limit: number;
  /**
   * URL to the next page of items. ( `null` if none)
   *
   * @memberof PagingSavedAlbumObject
   * @type {string}
   */
  next: string | null;
  /**
   * The offset of the items returned (as set in the query or by default)
   *
   * @memberof PagingSavedAlbumObject
   * @type {number}
   */
  offset: number;
  /**
   * URL to the previous page of items. ( `null` if none)
   *
   * @memberof PagingSavedAlbumObject
   * @type {string}
   */
  previous: string | null;
  /**
   * The total number of items available to return.
   *
   * @memberof PagingSavedAlbumObject
   * @type {number}
   */
  total: number;
  /**
   * @memberof PagingSavedAlbumObject
   * @type {SavedAlbumObject[]}
   */
  items: Array<SavedAlbumObject>;
}
/**
 * @export
 * @interface PagingSavedAudiobookObject
 */
export interface PagingSavedAudiobookObject {
  /**
   * A link to the Web API endpoint returning the full result of the request
   *
   * @memberof PagingSavedAudiobookObject
   * @type {string}
   */
  href: string;
  /**
   * The maximum number of items in the response (as set in the query or by
   * default).
   *
   * @memberof PagingSavedAudiobookObject
   * @type {number}
   */
  limit: number;
  /**
   * URL to the next page of items. ( `null` if none)
   *
   * @memberof PagingSavedAudiobookObject
   * @type {string}
   */
  next: string | null;
  /**
   * The offset of the items returned (as set in the query or by default)
   *
   * @memberof PagingSavedAudiobookObject
   * @type {number}
   */
  offset: number;
  /**
   * URL to the previous page of items. ( `null` if none)
   *
   * @memberof PagingSavedAudiobookObject
   * @type {string}
   */
  previous: string | null;
  /**
   * The total number of items available to return.
   *
   * @memberof PagingSavedAudiobookObject
   * @type {number}
   */
  total: number;
  /**
   * @memberof PagingSavedAudiobookObject
   * @type {SavedAudiobookObject[]}
   */
  items: Array<SavedAudiobookObject>;
}
/**
 * @export
 * @interface PagingSavedEpisodeObject
 */
export interface PagingSavedEpisodeObject {
  /**
   * A link to the Web API endpoint returning the full result of the request
   *
   * @memberof PagingSavedEpisodeObject
   * @type {string}
   */
  href: string;
  /**
   * The maximum number of items in the response (as set in the query or by
   * default).
   *
   * @memberof PagingSavedEpisodeObject
   * @type {number}
   */
  limit: number;
  /**
   * URL to the next page of items. ( `null` if none)
   *
   * @memberof PagingSavedEpisodeObject
   * @type {string}
   */
  next: string | null;
  /**
   * The offset of the items returned (as set in the query or by default)
   *
   * @memberof PagingSavedEpisodeObject
   * @type {number}
   */
  offset: number;
  /**
   * URL to the previous page of items. ( `null` if none)
   *
   * @memberof PagingSavedEpisodeObject
   * @type {string}
   */
  previous: string | null;
  /**
   * The total number of items available to return.
   *
   * @memberof PagingSavedEpisodeObject
   * @type {number}
   */
  total: number;
  /**
   * @memberof PagingSavedEpisodeObject
   * @type {SavedEpisodeObject[]}
   */
  items: Array<SavedEpisodeObject>;
}
/**
 * @export
 * @interface PagingSavedShowObject
 */
export interface PagingSavedShowObject {
  /**
   * A link to the Web API endpoint returning the full result of the request
   *
   * @memberof PagingSavedShowObject
   * @type {string}
   */
  href: string;
  /**
   * The maximum number of items in the response (as set in the query or by
   * default).
   *
   * @memberof PagingSavedShowObject
   * @type {number}
   */
  limit: number;
  /**
   * URL to the next page of items. ( `null` if none)
   *
   * @memberof PagingSavedShowObject
   * @type {string}
   */
  next: string | null;
  /**
   * The offset of the items returned (as set in the query or by default)
   *
   * @memberof PagingSavedShowObject
   * @type {number}
   */
  offset: number;
  /**
   * URL to the previous page of items. ( `null` if none)
   *
   * @memberof PagingSavedShowObject
   * @type {string}
   */
  previous: string | null;
  /**
   * The total number of items available to return.
   *
   * @memberof PagingSavedShowObject
   * @type {number}
   */
  total: number;
  /**
   * @memberof PagingSavedShowObject
   * @type {SavedShowObject[]}
   */
  items: Array<SavedShowObject>;
}
/**
 * @export
 * @interface PagingSavedTrackObject
 */
export interface PagingSavedTrackObject {
  /**
   * A link to the Web API endpoint returning the full result of the request
   *
   * @memberof PagingSavedTrackObject
   * @type {string}
   */
  href: string;
  /**
   * The maximum number of items in the response (as set in the query or by
   * default).
   *
   * @memberof PagingSavedTrackObject
   * @type {number}
   */
  limit: number;
  /**
   * URL to the next page of items. ( `null` if none)
   *
   * @memberof PagingSavedTrackObject
   * @type {string}
   */
  next: string | null;
  /**
   * The offset of the items returned (as set in the query or by default)
   *
   * @memberof PagingSavedTrackObject
   * @type {number}
   */
  offset: number;
  /**
   * URL to the previous page of items. ( `null` if none)
   *
   * @memberof PagingSavedTrackObject
   * @type {string}
   */
  previous: string | null;
  /**
   * The total number of items available to return.
   *
   * @memberof PagingSavedTrackObject
   * @type {number}
   */
  total: number;
  /**
   * @memberof PagingSavedTrackObject
   * @type {SavedTrackObject[]}
   */
  items: Array<SavedTrackObject>;
}
/**
 * @export
 * @interface PagingSimplifiedAlbumObject
 */
export interface PagingSimplifiedAlbumObject {
  /**
   * A link to the Web API endpoint returning the full result of the request
   *
   * @memberof PagingSimplifiedAlbumObject
   * @type {string}
   */
  href: string;
  /**
   * The maximum number of items in the response (as set in the query or by
   * default).
   *
   * @memberof PagingSimplifiedAlbumObject
   * @type {number}
   */
  limit: number;
  /**
   * URL to the next page of items. ( `null` if none)
   *
   * @memberof PagingSimplifiedAlbumObject
   * @type {string}
   */
  next: string | null;
  /**
   * The offset of the items returned (as set in the query or by default)
   *
   * @memberof PagingSimplifiedAlbumObject
   * @type {number}
   */
  offset: number;
  /**
   * URL to the previous page of items. ( `null` if none)
   *
   * @memberof PagingSimplifiedAlbumObject
   * @type {string}
   */
  previous: string | null;
  /**
   * The total number of items available to return.
   *
   * @memberof PagingSimplifiedAlbumObject
   * @type {number}
   */
  total: number;
  /**
   * @memberof PagingSimplifiedAlbumObject
   * @type {SimplifiedAlbumObject[]}
   */
  items: Array<SimplifiedAlbumObject>;
}
/**
 * @export
 * @interface PagingSimplifiedAudiobookObject
 */
export interface PagingSimplifiedAudiobookObject {
  /**
   * A link to the Web API endpoint returning the full result of the request
   *
   * @memberof PagingSimplifiedAudiobookObject
   * @type {string}
   */
  href: string;
  /**
   * The maximum number of items in the response (as set in the query or by
   * default).
   *
   * @memberof PagingSimplifiedAudiobookObject
   * @type {number}
   */
  limit: number;
  /**
   * URL to the next page of items. ( `null` if none)
   *
   * @memberof PagingSimplifiedAudiobookObject
   * @type {string}
   */
  next: string | null;
  /**
   * The offset of the items returned (as set in the query or by default)
   *
   * @memberof PagingSimplifiedAudiobookObject
   * @type {number}
   */
  offset: number;
  /**
   * URL to the previous page of items. ( `null` if none)
   *
   * @memberof PagingSimplifiedAudiobookObject
   * @type {string}
   */
  previous: string | null;
  /**
   * The total number of items available to return.
   *
   * @memberof PagingSimplifiedAudiobookObject
   * @type {number}
   */
  total: number;
  /**
   * @memberof PagingSimplifiedAudiobookObject
   * @type {SimplifiedAudiobookObject[]}
   */
  items: Array<SimplifiedAudiobookObject>;
}
/**
 * @export
 * @interface PagingSimplifiedChapterObject
 */
export interface PagingSimplifiedChapterObject {
  /**
   * A link to the Web API endpoint returning the full result of the request
   *
   * @memberof PagingSimplifiedChapterObject
   * @type {string}
   */
  href: string;
  /**
   * The maximum number of items in the response (as set in the query or by
   * default).
   *
   * @memberof PagingSimplifiedChapterObject
   * @type {number}
   */
  limit: number;
  /**
   * URL to the next page of items. ( `null` if none)
   *
   * @memberof PagingSimplifiedChapterObject
   * @type {string}
   */
  next: string | null;
  /**
   * The offset of the items returned (as set in the query or by default)
   *
   * @memberof PagingSimplifiedChapterObject
   * @type {number}
   */
  offset: number;
  /**
   * URL to the previous page of items. ( `null` if none)
   *
   * @memberof PagingSimplifiedChapterObject
   * @type {string}
   */
  previous: string | null;
  /**
   * The total number of items available to return.
   *
   * @memberof PagingSimplifiedChapterObject
   * @type {number}
   */
  total: number;
  /**
   * @memberof PagingSimplifiedChapterObject
   * @type {SimplifiedChapterObject[]}
   */
  items: Array<SimplifiedChapterObject>;
}
/**
 * @export
 * @interface PagingSimplifiedEpisodeObject
 */
export interface PagingSimplifiedEpisodeObject {
  /**
   * A link to the Web API endpoint returning the full result of the request
   *
   * @memberof PagingSimplifiedEpisodeObject
   * @type {string}
   */
  href: string;
  /**
   * The maximum number of items in the response (as set in the query or by
   * default).
   *
   * @memberof PagingSimplifiedEpisodeObject
   * @type {number}
   */
  limit: number;
  /**
   * URL to the next page of items. ( `null` if none)
   *
   * @memberof PagingSimplifiedEpisodeObject
   * @type {string}
   */
  next: string | null;
  /**
   * The offset of the items returned (as set in the query or by default)
   *
   * @memberof PagingSimplifiedEpisodeObject
   * @type {number}
   */
  offset: number;
  /**
   * URL to the previous page of items. ( `null` if none)
   *
   * @memberof PagingSimplifiedEpisodeObject
   * @type {string}
   */
  previous: string | null;
  /**
   * The total number of items available to return.
   *
   * @memberof PagingSimplifiedEpisodeObject
   * @type {number}
   */
  total: number;
  /**
   * @memberof PagingSimplifiedEpisodeObject
   * @type {SimplifiedEpisodeObject[]}
   */
  items: Array<SimplifiedEpisodeObject>;
}
/**
 * @export
 * @interface PagingSimplifiedShowObject
 */
export interface PagingSimplifiedShowObject {
  /**
   * A link to the Web API endpoint returning the full result of the request
   *
   * @memberof PagingSimplifiedShowObject
   * @type {string}
   */
  href: string;
  /**
   * The maximum number of items in the response (as set in the query or by
   * default).
   *
   * @memberof PagingSimplifiedShowObject
   * @type {number}
   */
  limit: number;
  /**
   * URL to the next page of items. ( `null` if none)
   *
   * @memberof PagingSimplifiedShowObject
   * @type {string}
   */
  next: string | null;
  /**
   * The offset of the items returned (as set in the query or by default)
   *
   * @memberof PagingSimplifiedShowObject
   * @type {number}
   */
  offset: number;
  /**
   * URL to the previous page of items. ( `null` if none)
   *
   * @memberof PagingSimplifiedShowObject
   * @type {string}
   */
  previous: string | null;
  /**
   * The total number of items available to return.
   *
   * @memberof PagingSimplifiedShowObject
   * @type {number}
   */
  total: number;
  /**
   * @memberof PagingSimplifiedShowObject
   * @type {SimplifiedShowObject[]}
   */
  items: Array<SimplifiedShowObject>;
}
/**
 * @export
 * @interface PagingSimplifiedTrackObject
 */
export interface PagingSimplifiedTrackObject {
  /**
   * A link to the Web API endpoint returning the full result of the request
   *
   * @memberof PagingSimplifiedTrackObject
   * @type {string}
   */
  href: string;
  /**
   * The maximum number of items in the response (as set in the query or by
   * default).
   *
   * @memberof PagingSimplifiedTrackObject
   * @type {number}
   */
  limit: number;
  /**
   * URL to the next page of items. ( `null` if none)
   *
   * @memberof PagingSimplifiedTrackObject
   * @type {string}
   */
  next: string | null;
  /**
   * The offset of the items returned (as set in the query or by default)
   *
   * @memberof PagingSimplifiedTrackObject
   * @type {number}
   */
  offset: number;
  /**
   * URL to the previous page of items. ( `null` if none)
   *
   * @memberof PagingSimplifiedTrackObject
   * @type {string}
   */
  previous: string | null;
  /**
   * The total number of items available to return.
   *
   * @memberof PagingSimplifiedTrackObject
   * @type {number}
   */
  total: number;
  /**
   * @memberof PagingSimplifiedTrackObject
   * @type {SimplifiedTrackObject[]}
   */
  items: Array<SimplifiedTrackObject>;
}
/**
 * @export
 * @interface PagingTrackObject
 */
export interface PagingTrackObject {
  /**
   * A link to the Web API endpoint returning the full result of the request
   *
   * @memberof PagingTrackObject
   * @type {string}
   */
  href: string;
  /**
   * The maximum number of items in the response (as set in the query or by
   * default).
   *
   * @memberof PagingTrackObject
   * @type {number}
   */
  limit: number;
  /**
   * URL to the next page of items. ( `null` if none)
   *
   * @memberof PagingTrackObject
   * @type {string}
   */
  next: string | null;
  /**
   * The offset of the items returned (as set in the query or by default)
   *
   * @memberof PagingTrackObject
   * @type {number}
   */
  offset: number;
  /**
   * URL to the previous page of items. ( `null` if none)
   *
   * @memberof PagingTrackObject
   * @type {string}
   */
  previous: string | null;
  /**
   * The total number of items available to return.
   *
   * @memberof PagingTrackObject
   * @type {number}
   */
  total: number;
  /**
   * @memberof PagingTrackObject
   * @type {TrackObject[]}
   */
  items: Array<TrackObject>;
}
/**
 * @export
 * @interface PlayHistoryObject
 */
export interface PlayHistoryObject {
  /**
   * The track the user listened to.
   *
   * @memberof PlayHistoryObject
   * @type {TrackObject}
   */
  track?: TrackObject;
  /**
   * The date and time the track was played.
   *
   * @memberof PlayHistoryObject
   * @type {string}
   */
  played_at?: string;
  /**
   * The context the track was played from.
   *
   * @memberof PlayHistoryObject
   * @type {ContextObject}
   */
  context?: ContextObject;
}
/**
 * @export
 * @interface PlaylistObject
 */
export interface PlaylistObject {
  /**
   * `true` if the owner allows other users to modify the playlist.
   *
   * @memberof PlaylistObject
   * @type {boolean}
   */
  collaborative?: boolean;
  /**
   * The playlist description. _Only returned for modified, verified playlists,
   * otherwise_ `null`.
   *
   * @memberof PlaylistObject
   * @type {string}
   */
  description?: string | null;
  /**
   * Known external URLs for this playlist.
   *
   * @memberof PlaylistObject
   * @type {ExternalUrlObject}
   */
  external_urls?: ExternalUrlObject;
  /**
   * A link to the Web API endpoint providing full details of the playlist.
   *
   * @memberof PlaylistObject
   * @type {string}
   */
  href?: string;
  /**
   * The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the
   * playlist.
   *
   * @memberof PlaylistObject
   * @type {string}
   */
  id?: string;
  /**
   * Images for the playlist. The array may be empty or contain up to three
   * images. The images are returned by size in descending order. See [Working
   * with Playlists](/documentation/web-api/concepts/playlists). _**Note**: If
   * returned, the source URL for the image (`url`) is temporary and will expire
   * in less than a day._
   *
   * @memberof PlaylistObject
   * @type {ImageObject[]}
   */
  images?: Array<ImageObject>;
  /**
   * The name of the playlist.
   *
   * @memberof PlaylistObject
   * @type {string}
   */
  name?: string;
  /**
   * The user who owns the playlist
   *
   * @memberof PlaylistObject
   * @type {PlaylistOwnerObject}
   */
  owner?: PlaylistOwnerObject;
  /**
   * The playlist's public/private status (if it is added to the user's
   * profile): `true` the playlist is public, `false` the playlist is private,
   * `null` the playlist status is not relevant. For more about public/private
   * status, see [Working with
   * Playlists](/documentation/web-api/concepts/playlists)
   *
   * @memberof PlaylistObject
   * @type {boolean}
   */
  _public?: boolean;
  /**
   * The version identifier for the current playlist. Can be supplied in other
   * requests to target a specific playlist version
   *
   * @memberof PlaylistObject
   * @type {string}
   */
  snapshot_id?: string;
  /**
   * The items of the playlist. _**Note**: This field is only available for
   * playlists owned by the current user or playlists the user is a collaborator
   * of._
   *
   * @memberof PlaylistObject
   * @type {PagingPlaylistTrackObject}
   */
  items?: PagingPlaylistTrackObject;
  /**
   * **Deprecated:** Use `items` instead. The tracks of the playlist.
   *
   * @memberof PlaylistObject
   * @deprecated
   * @type {PagingPlaylistTrackObject}
   */
  tracks?: PagingPlaylistTrackObject;
  /**
   * The object type: "playlist"
   *
   * @memberof PlaylistObject
   * @type {string}
   */
  type?: string;
  /**
   * The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the
   * playlist.
   *
   * @memberof PlaylistObject
   * @type {string}
   */
  uri?: string;
  /**
   * Information about the followers of the playlist.
   *
   * @memberof PlaylistObject
   * @type {FollowersObject}
   */
  followers?: FollowersObject;
}
/**
 * @export
 * @interface PlaylistOwnerObject
 */
export interface PlaylistOwnerObject {
  /**
   * Known public external URLs for this user.
   *
   * @memberof PlaylistOwnerObject
   * @type {ExternalUrlObject}
   */
  external_urls?: ExternalUrlObject;
  /**
   * A link to the Web API endpoint for this user.
   *
   * @memberof PlaylistOwnerObject
   * @type {string}
   */
  href?: string;
  /**
   * The [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids) for
   * this user.
   *
   * @memberof PlaylistOwnerObject
   * @type {string}
   */
  id?: string;
  /**
   * The object type.
   *
   * @memberof PlaylistOwnerObject
   * @type {string}
   */
  type?: PlaylistOwnerObjectTypeEnum;
  /**
   * The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for
   * this user.
   *
   * @memberof PlaylistOwnerObject
   * @type {string}
   */
  uri?: string;
  /**
   * The name displayed on the user's profile. `null` if not available.
   *
   * @memberof PlaylistOwnerObject
   * @type {string}
   */
  display_name?: string | null;
}

/** @export */
export const PlaylistOwnerObjectTypeEnum = {
  User: "user",
} as const;
export type PlaylistOwnerObjectTypeEnum =
  (typeof PlaylistOwnerObjectTypeEnum)[keyof typeof PlaylistOwnerObjectTypeEnum];

/**
 * @export
 * @interface PlaylistTrackObject
 */
export interface PlaylistTrackObject {
  /**
   * The date and time the track or episode was added. _**Note**: some very old
   * playlists may return `null` in this field._
   *
   * @memberof PlaylistTrackObject
   * @type {string}
   */
  added_at?: string;
  /**
   * The Spotify user who added the track or episode. _**Note**: some very old
   * playlists may return `null` in this field._
   *
   * @memberof PlaylistTrackObject
   * @type {PlaylistUserObject}
   */
  added_by?: PlaylistUserObject;
  /**
   * Whether this track or episode is a [local
   * file](/documentation/web-api/concepts/playlists/#local-files) or not.
   *
   * @memberof PlaylistTrackObject
   * @type {boolean}
   */
  is_local?: boolean;
  /**
   * @memberof PlaylistTrackObject
   * @type {PlaylistTrackObjectItem}
   */
  item?: PlaylistTrackObjectItem;
  /**
   * @memberof PlaylistTrackObject
   * @deprecated
   * @type {PlaylistTrackObjectTrack}
   */
  track?: PlaylistTrackObjectTrack;
}
/**
 * @type PlaylistTrackObjectItem
 * Information about the track or episode.
 * @export
 */
export type PlaylistTrackObjectItem =
  | ({ type: "episode" } & EpisodeObject)
  | ({ type: "track" } & TrackObject);
/**
 * @type PlaylistTrackObjectTrack **Deprecated:** Use `item` instead.
 *   Information about the track or episode.
 * @export
 */
export type PlaylistTrackObjectTrack =
  | ({ type: "episode" } & EpisodeObject)
  | ({ type: "track" } & TrackObject);
/**
 * @export
 * @interface PlaylistTracksRefObject
 */
export interface PlaylistTracksRefObject {
  /**
   * A link to the Web API endpoint where full details of the playlist's tracks
   * can be retrieved.
   *
   * @memberof PlaylistTracksRefObject
   * @type {string}
   */
  href?: string;
  /**
   * Number of tracks in the playlist.
   *
   * @memberof PlaylistTracksRefObject
   * @type {number}
   */
  total?: number;
}
/**
 * @export
 * @interface PlaylistUserObject
 */
export interface PlaylistUserObject {
  /**
   * Known public external URLs for this user.
   *
   * @memberof PlaylistUserObject
   * @type {ExternalUrlObject}
   */
  external_urls?: ExternalUrlObject;
  /**
   * A link to the Web API endpoint for this user.
   *
   * @memberof PlaylistUserObject
   * @type {string}
   */
  href?: string;
  /**
   * The [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids) for
   * this user.
   *
   * @memberof PlaylistUserObject
   * @type {string}
   */
  id?: string;
  /**
   * The object type.
   *
   * @memberof PlaylistUserObject
   * @type {string}
   */
  type?: PlaylistUserObjectTypeEnum;
  /**
   * The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for
   * this user.
   *
   * @memberof PlaylistUserObject
   * @type {string}
   */
  uri?: string;
}

/** @export */
export const PlaylistUserObjectTypeEnum = {
  User: "user",
} as const;
export type PlaylistUserObjectTypeEnum =
  (typeof PlaylistUserObjectTypeEnum)[keyof typeof PlaylistUserObjectTypeEnum];

/**
 * @export
 * @interface PrivateUserObject
 */
export interface PrivateUserObject {
  /**
   * The country of the user, as set in the user's account profile. An [ISO
   * 3166-1 alpha-2 country
   * code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). _This field is only
   * available when the current user has granted access to the
   * [user-read-private](/documentation/web-api/concepts/scopes/#list-of-scopes)
   * scope._
   *
   * @memberof PrivateUserObject
   * @deprecated
   * @type {string}
   */
  country?: string;
  /**
   * The name displayed on the user's profile. `null` if not available.
   *
   * @memberof PrivateUserObject
   * @type {string}
   */
  display_name?: string;
  /**
   * The user's email address, as entered by the user when creating their
   * account. _**Important!** This email address is unverified; there is no
   * proof that it actually belongs to the user._ _This field is only available
   * when the current user has granted access to the
   * [user-read-email](/documentation/web-api/concepts/scopes/#list-of-scopes)
   * scope._
   *
   * @memberof PrivateUserObject
   * @deprecated
   * @type {string}
   */
  email?: string;
  /**
   * The user's explicit content settings. _This field is only available when
   * the current user has granted access to the
   * [user-read-private](/documentation/web-api/concepts/scopes/#list-of-scopes)
   * scope._
   *
   * @memberof PrivateUserObject
   * @deprecated
   * @type {ExplicitContentSettingsObject}
   */
  explicit_content?: ExplicitContentSettingsObject;
  /**
   * Known external URLs for this user.
   *
   * @memberof PrivateUserObject
   * @type {ExternalUrlObject}
   */
  external_urls?: ExternalUrlObject;
  /**
   * Information about the followers of the user.
   *
   * @memberof PrivateUserObject
   * @deprecated
   * @type {FollowersObject}
   */
  followers?: FollowersObject;
  /**
   * A link to the Web API endpoint for this user.
   *
   * @memberof PrivateUserObject
   * @type {string}
   */
  href?: string;
  /**
   * The [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids) for
   * the user.
   *
   * @memberof PrivateUserObject
   * @type {string}
   */
  id?: string;
  /**
   * The user's profile image.
   *
   * @memberof PrivateUserObject
   * @type {ImageObject[]}
   */
  images?: Array<ImageObject>;
  /**
   * The user's Spotify subscription level: "premium", "free", etc. (The
   * subscription level "open" can be considered the same as "free".) _This
   * field is only available when the current user has granted access to the
   * [user-read-private](/documentation/web-api/concepts/scopes/#list-of-scopes)
   * scope._
   *
   * @memberof PrivateUserObject
   * @deprecated
   * @type {string}
   */
  product?: string;
  /**
   * The object type: "user"
   *
   * @memberof PrivateUserObject
   * @type {string}
   */
  type?: string;
  /**
   * The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the
   * user.
   *
   * @memberof PrivateUserObject
   * @type {string}
   */
  uri?: string;
}
/**
 * @export
 * @interface PublicUserObject
 */
export interface PublicUserObject {
  /**
   * The name displayed on the user's profile. `null` if not available.
   *
   * @memberof PublicUserObject
   * @type {string}
   */
  display_name?: string | null;
  /**
   * Known public external URLs for this user.
   *
   * @memberof PublicUserObject
   * @type {ExternalUrlObject}
   */
  external_urls?: ExternalUrlObject;
  /**
   * Information about the followers of this user.
   *
   * @memberof PublicUserObject
   * @deprecated
   * @type {FollowersObject}
   */
  followers?: FollowersObject;
  /**
   * A link to the Web API endpoint for this user.
   *
   * @memberof PublicUserObject
   * @type {string}
   */
  href?: string;
  /**
   * The [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids) for
   * this user.
   *
   * @memberof PublicUserObject
   * @type {string}
   */
  id?: string;
  /**
   * The user's profile image.
   *
   * @memberof PublicUserObject
   * @type {ImageObject[]}
   */
  images?: Array<ImageObject>;
  /**
   * The object type.
   *
   * @memberof PublicUserObject
   * @type {string}
   */
  type?: PublicUserObjectTypeEnum;
  /**
   * The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for
   * this user.
   *
   * @memberof PublicUserObject
   * @type {string}
   */
  uri?: string;
}

/** @export */
export const PublicUserObjectTypeEnum = {
  User: "user",
} as const;
export type PublicUserObjectTypeEnum =
  (typeof PublicUserObjectTypeEnum)[keyof typeof PublicUserObjectTypeEnum];

/**
 * @export
 * @interface QueueObject
 */
export interface QueueObject {
  /**
   * @memberof QueueObject
   * @type {QueueObjectCurrentlyPlaying}
   */
  currently_playing?: QueueObjectCurrentlyPlaying;
  /**
   * The tracks or episodes in the queue. Can be empty.
   *
   * @memberof QueueObject
   * @type {QueueObjectQueueInner[]}
   */
  queue?: Array<QueueObjectQueueInner>;
}
/**
 * @type QueueObjectCurrentlyPlaying The currently playing track or episode. Can
 *   be `null`.
 * @export
 */
export type QueueObjectCurrentlyPlaying =
  | ({ type: "episode" } & EpisodeObject)
  | ({ type: "track" } & TrackObject);
/**
 * @type QueueObjectQueueInner
 * @export
 */
export type QueueObjectQueueInner =
  | ({ type: "episode" } & EpisodeObject)
  | ({ type: "track" } & TrackObject);
/**
 * @export
 * @interface RecommendationSeedObject
 */
export interface RecommendationSeedObject {
  /**
   * The number of tracks available after min_* and max_* filters have been
   * applied.
   *
   * @memberof RecommendationSeedObject
   * @type {number}
   */
  afterFilteringSize?: number;
  /**
   * The number of tracks available after relinking for regional availability.
   *
   * @memberof RecommendationSeedObject
   * @type {number}
   */
  afterRelinkingSize?: number;
  /**
   * A link to the full track or artist data for this seed. For tracks this will
   * be a link to a Track Object. For artists a link to an Artist Object. For
   * genre seeds, this value will be `null`.
   *
   * @memberof RecommendationSeedObject
   * @type {string}
   */
  href?: string;
  /**
   * The id used to select this seed. This will be the same as the string used
   * in the `seed_artists`, `seed_tracks` or `seed_genres` parameter.
   *
   * @memberof RecommendationSeedObject
   * @type {string}
   */
  id?: string;
  /**
   * The number of recommended tracks available for this seed.
   *
   * @memberof RecommendationSeedObject
   * @type {number}
   */
  initialPoolSize?: number;
  /**
   * The entity type of this seed. One of `artist`, `track` or `genre`.
   *
   * @memberof RecommendationSeedObject
   * @type {string}
   */
  type?: string;
}
/**
 * @export
 * @interface RecommendationsObject
 */
export interface RecommendationsObject {
  /**
   * An array of recommendation seed objects.
   *
   * @memberof RecommendationsObject
   * @type {RecommendationSeedObject[]}
   */
  seeds: Array<RecommendationSeedObject>;
  /**
   * An array of track objects ordered according to the parameters supplied.
   *
   * @memberof RecommendationsObject
   * @type {TrackObject[]}
   */
  tracks: Array<TrackObject>;
}
/**
 * @export
 * @interface RemoveItemsPlaylistRequest
 */
export interface RemoveItemsPlaylistRequest {
  /**
   * An array of objects containing [Spotify
   * URIs](/documentation/web-api/concepts/spotify-uris-ids) of the tracks or
   * episodes to remove. For example: `{ "items": [{ "uri":
   * "spotify:track:4iV5W9uYEdYUVa79Axb7Rh" },{ "uri":
   * "spotify:track:1301WleyT98MSxVHPZCA6M" }] }`. A maximum of 100 objects can
   * be sent at once.
   *
   * @memberof RemoveItemsPlaylistRequest
   * @type {RemoveItemsPlaylistRequestItemsInner[]}
   */
  items: Array<RemoveItemsPlaylistRequestItemsInner>;
  /**
   * The playlist's snapshot ID against which you want to make the changes. The
   * API will validate that the specified items exist and in the specified
   * positions and make the changes, even if more recent changes have been made
   * to the playlist.
   *
   * @memberof RemoveItemsPlaylistRequest
   * @type {string}
   */
  snapshot_id?: string;
}
/**
 * @export
 * @interface RemoveItemsPlaylistRequestItemsInner
 */
export interface RemoveItemsPlaylistRequestItemsInner {
  /**
   * Spotify URI
   *
   * @memberof RemoveItemsPlaylistRequestItemsInner
   * @type {string}
   */
  uri?: string;
}
/**
 * @export
 * @interface ReorderOrReplacePlaylistsItems200Response
 */
export interface ReorderOrReplacePlaylistsItems200Response {
  /**
   * @memberof ReorderOrReplacePlaylistsItems200Response
   * @type {string}
   */
  snapshot_id?: string;
}
/**
 * @export
 * @interface ReorderOrReplacePlaylistsItemsRequest
 */
export interface ReorderOrReplacePlaylistsItemsRequest {
  [key: string]: any | any;
  /**
   * @memberof ReorderOrReplacePlaylistsItemsRequest
   * @type {string[]}
   */
  uris?: Array<string>;
  /**
   * The position of the first item to be reordered.
   *
   * @memberof ReorderOrReplacePlaylistsItemsRequest
   * @type {number}
   */
  range_start?: number;
  /**
   * The position where the items should be inserted.<br/>To reorder the items
   * to the end of the playlist, simply set _insert_before_ to the position
   * after the last item.<br/>Examples:<br/>To reorder the first item to the
   * last position in a playlist with 10 items, set _range_start_ to 0, and
   * _insert_before_ to 10.<br/>To reorder the last item in a playlist with 10
   * items to the start of the playlist, set _range_start_ to 9, and
   * _insert_before_ to 0.
   *
   * @memberof ReorderOrReplacePlaylistsItemsRequest
   * @type {number}
   */
  insert_before?: number;
  /**
   * The amount of items to be reordered. Defaults to 1 if not set.<br/>The
   * range of items to be reordered begins from the _range_start_ position, and
   * includes the _range_length_ subsequent items.<br/>Example:<br/>To move the
   * items at index 9-10 to the start of the playlist, _range_start_ is set to
   * 9, and _range_length_ is set to 2.
   *
   * @memberof ReorderOrReplacePlaylistsItemsRequest
   * @type {number}
   */
  range_length?: number;
  /**
   * The playlist's snapshot ID against which you want to make the changes.
   *
   * @memberof ReorderOrReplacePlaylistsItemsRequest
   * @type {string}
   */
  snapshot_id?: string;
}
/**
 * @export
 * @interface ResumePointObject
 */
export interface ResumePointObject {
  /**
   * Whether or not the episode has been fully played by the user.
   *
   * @memberof ResumePointObject
   * @type {boolean}
   */
  fully_played?: boolean;
  /**
   * The user's most recent position in the episode in milliseconds.
   *
   * @memberof ResumePointObject
   * @type {number}
   */
  resume_position_ms?: number;
}
/**
 * @export
 * @interface SavedAlbumObject
 */
export interface SavedAlbumObject {
  /**
   * The date and time the album was saved Timestamps are returned in ISO 8601
   * format as Coordinated Universal Time (UTC) with a zero offset:
   * YYYY-MM-DDTHH:MM:SSZ. If the time is imprecise (for example, the date/time
   * of an album release), an additional field indicates the precision; see for
   * example, release_date in an album object.
   *
   * @memberof SavedAlbumObject
   * @type {string}
   */
  added_at?: string;
  /**
   * Information about the album.
   *
   * @memberof SavedAlbumObject
   * @type {AlbumObject}
   */
  album?: AlbumObject;
}
/**
 * @export
 * @interface SavedAudiobookObject
 */
export interface SavedAudiobookObject {
  /**
   * The date and time the audiobook was saved Timestamps are returned in ISO
   * 8601 format as Coordinated Universal Time (UTC) with a zero offset:
   * YYYY-MM-DDTHH:MM:SSZ. If the time is imprecise (for example, the date/time
   * of an album release), an additional field indicates the precision; see for
   * example, release_date in an album object.
   *
   * @memberof SavedAudiobookObject
   * @type {string}
   */
  added_at?: string;
  /**
   * Information about the audiobook.
   *
   * @memberof SavedAudiobookObject
   * @type {AudiobookObject}
   */
  audiobook?: AudiobookObject;
}
/**
 * @export
 * @interface SavedEpisodeObject
 */
export interface SavedEpisodeObject {
  /**
   * The date and time the episode was saved. Timestamps are returned in ISO
   * 8601 format as Coordinated Universal Time (UTC) with a zero offset:
   * YYYY-MM-DDTHH:MM:SSZ.
   *
   * @memberof SavedEpisodeObject
   * @type {string}
   */
  added_at?: string;
  /**
   * Information about the episode.
   *
   * @memberof SavedEpisodeObject
   * @type {EpisodeObject}
   */
  episode?: EpisodeObject;
}
/**
 * @export
 * @interface SavedShowObject
 */
export interface SavedShowObject {
  /**
   * The date and time the show was saved. Timestamps are returned in ISO 8601
   * format as Coordinated Universal Time (UTC) with a zero offset:
   * YYYY-MM-DDTHH:MM:SSZ. If the time is imprecise (for example, the date/time
   * of an album release), an additional field indicates the precision; see for
   * example, release_date in an album object.
   *
   * @memberof SavedShowObject
   * @type {string}
   */
  added_at?: string;
  /**
   * Information about the show.
   *
   * @memberof SavedShowObject
   * @type {SimplifiedShowObject}
   */
  show?: SimplifiedShowObject;
}
/**
 * @export
 * @interface SavedTrackObject
 */
export interface SavedTrackObject {
  /**
   * The date and time the track was saved. Timestamps are returned in ISO 8601
   * format as Coordinated Universal Time (UTC) with a zero offset:
   * YYYY-MM-DDTHH:MM:SSZ. If the time is imprecise (for example, the date/time
   * of an album release), an additional field indicates the precision; see for
   * example, release_date in an album object.
   *
   * @memberof SavedTrackObject
   * @type {string}
   */
  added_at?: string;
  /**
   * Information about the track.
   *
   * @memberof SavedTrackObject
   * @type {TrackObject}
   */
  track?: TrackObject;
}
/**
 * @export
 * @interface Search200Response
 */
export interface Search200Response {
  /**
   * @memberof Search200Response
   * @type {PagingTrackObject}
   */
  tracks?: PagingTrackObject;
  /**
   * @memberof Search200Response
   * @type {PagingArtistObject}
   */
  artists?: PagingArtistObject;
  /**
   * @memberof Search200Response
   * @type {PagingSimplifiedAlbumObject}
   */
  albums?: PagingSimplifiedAlbumObject;
  /**
   * @memberof Search200Response
   * @type {PagingPlaylistObject}
   */
  playlists?: PagingPlaylistObject;
  /**
   * @memberof Search200Response
   * @type {PagingSimplifiedShowObject}
   */
  shows?: PagingSimplifiedShowObject;
  /**
   * @memberof Search200Response
   * @type {PagingSimplifiedEpisodeObject}
   */
  episodes?: PagingSimplifiedEpisodeObject;
  /**
   * @memberof Search200Response
   * @type {PagingSimplifiedAudiobookObject}
   */
  audiobooks?: PagingSimplifiedAudiobookObject;
}
/**
 * @export
 * @interface SectionObject
 */
export interface SectionObject {
  /**
   * The starting point (in seconds) of the section.
   *
   * @memberof SectionObject
   * @type {number}
   */
  start?: number;
  /**
   * The duration (in seconds) of the section.
   *
   * @memberof SectionObject
   * @type {number}
   */
  duration?: number;
  /**
   * The confidence, from 0.0 to 1.0, of the reliability of the section's
   * "designation".
   *
   * @memberof SectionObject
   * @type {number}
   */
  confidence?: number;
  /**
   * The overall loudness of the section in decibels (dB). Loudness values are
   * useful for comparing relative loudness of sections within tracks.
   *
   * @memberof SectionObject
   * @type {number}
   */
  loudness?: number;
  /**
   * The overall estimated tempo of the section in beats per minute (BPM). In
   * musical terminology, tempo is the speed or pace of a given piece and
   * derives directly from the average beat duration.
   *
   * @memberof SectionObject
   * @type {number}
   */
  tempo?: number;
  /**
   * The confidence, from 0.0 to 1.0, of the reliability of the tempo. Some
   * tracks contain tempo changes or sounds which don't contain tempo (like pure
   * speech) which would correspond to a low value in this field.
   *
   * @memberof SectionObject
   * @type {number}
   */
  tempo_confidence?: number;
  /**
   * The estimated overall key of the section. The values in this field ranging
   * from 0 to 11 mapping to pitches using standard Pitch Class notation (E.g. 0
   * = C, 1 = C♯/D♭, 2 = D, and so on). If no key was detected, the value is
   * -1.
   *
   * @memberof SectionObject
   * @type {number}
   */
  key?: number;
  /**
   * The confidence, from 0.0 to 1.0, of the reliability of the key. Songs with
   * many key changes may correspond to low values in this field.
   *
   * @memberof SectionObject
   * @type {number}
   */
  key_confidence?: number;
  /**
   * Indicates the modality (major or minor) of a section, the type of scale
   * from which its melodic content is derived. This field will contain a 0 for
   * "minor", a 1 for "major", or a -1 for no result. Note that the major key
   * (e.g. C major) could more likely be confused with the minor key at 3
   * semitones lower (e.g. A minor) as both keys carry the same pitches.
   *
   * @memberof SectionObject
   * @type {number}
   */
  mode?: SectionObjectModeEnum;
  /**
   * The confidence, from 0.0 to 1.0, of the reliability of the `mode`.
   *
   * @memberof SectionObject
   * @type {number}
   */
  mode_confidence?: number;
  /**
   * An estimated time signature. The time signature (meter) is a notational
   * convention to specify how many beats are in each bar (or measure). The time
   * signature ranges from 3 to 7 indicating time signatures of "3/4", to
   * "7/4".
   *
   * @memberof SectionObject
   * @type {number}
   */
  time_signature?: number;
  /**
   * The confidence, from 0.0 to 1.0, of the reliability of the
   * `time_signature`. Sections with time signature changes may correspond to
   * low values in this field.
   *
   * @memberof SectionObject
   * @type {number}
   */
  time_signature_confidence?: number;
}

/** @export */
export const SectionObjectModeEnum = {
  NUMBER_MINUS_1: -1,
  NUMBER_0: 0,
  NUMBER_1: 1,
} as const;
export type SectionObjectModeEnum =
  (typeof SectionObjectModeEnum)[keyof typeof SectionObjectModeEnum];

/**
 * @export
 * @interface SegmentObject
 */
export interface SegmentObject {
  /**
   * The starting point (in seconds) of the segment.
   *
   * @memberof SegmentObject
   * @type {number}
   */
  start?: number;
  /**
   * The duration (in seconds) of the segment.
   *
   * @memberof SegmentObject
   * @type {number}
   */
  duration?: number;
  /**
   * The confidence, from 0.0 to 1.0, of the reliability of the segmentation.
   * Segments of the song which are difficult to logically segment (e.g: noise)
   * may correspond to low values in this field.
   *
   * @memberof SegmentObject
   * @type {number}
   */
  confidence?: number;
  /**
   * The onset loudness of the segment in decibels (dB). Combined with
   * `loudness_max` and `loudness_max_time`, these components can be used to
   * describe the "attack" of the segment.
   *
   * @memberof SegmentObject
   * @type {number}
   */
  loudness_start?: number;
  /**
   * The peak loudness of the segment in decibels (dB). Combined with
   * `loudness_start` and `loudness_max_time`, these components can be used to
   * describe the "attack" of the segment.
   *
   * @memberof SegmentObject
   * @type {number}
   */
  loudness_max?: number;
  /**
   * The segment-relative offset of the segment peak loudness in seconds.
   * Combined with `loudness_start` and `loudness_max`, these components can be
   * used to desctibe the "attack" of the segment.
   *
   * @memberof SegmentObject
   * @type {number}
   */
  loudness_max_time?: number;
  /**
   * The offset loudness of the segment in decibels (dB). This value should be
   * equivalent to the loudness_start of the following segment.
   *
   * @memberof SegmentObject
   * @type {number}
   */
  loudness_end?: number;
  /**
   * Pitch content is given by a “chroma” vector, corresponding to the 12 pitch
   * classes C, C#, D to B, with values ranging from 0 to 1 that describe the
   * relative dominance of every pitch in the chromatic scale. For example a C
   * Major chord would likely be represented by large values of C, E and G (i.e.
   * classes 0, 4, and 7).
   *
   * Vectors are normalized to 1 by their strongest dimension, therefore noisy
   * sounds are likely represented by values that are all close to 1, while pure
   * tones are described by one value at 1 (the pitch) and others near 0. As can
   * be seen below, the 12 vector indices are a combination of low-power
   * spectrum values at their respective pitch frequencies. ![pitch
   * vector](/assets/audio/Pitch_vector.png)
   *
   * @memberof SegmentObject
   * @type {number[]}
   */
  pitches?: Array<number>;
  /**
   * Timbre is the quality of a musical note or sound that distinguishes
   * different types of musical instruments, or voices. It is a complex notion
   * also referred to as sound color, texture, or tone quality, and is derived
   * from the shape of a segment’s spectro-temporal surface, independently of
   * pitch and loudness. The timbre feature is a vector that includes 12
   * unbounded values roughly centered around 0. Those values are high level
   * abstractions of the spectral surface, ordered by degree of importance.
   *
   * For completeness however, the first dimension represents the average
   * loudness of the segment; second emphasizes brightness; third is more
   * closely correlated to the flatness of a sound; fourth to sounds with a
   * stronger attack; etc. See an image below representing the 12 basis
   * functions (i.e. template segments). ![timbre basis
   * functions](/assets/audio/Timbre_basis_functions.png)
   *
   * The actual timbre of the segment is best described as a linear combination
   * of these 12 basis functions weighted by the coefficient values: timbre = c1
   * x b1 + c2 x b2 + ... + c12 x b12, where c1 to c12 represent the 12
   * coefficients and b1 to b12 the 12 basis functions as displayed below.
   * Timbre vectors are best used in comparison with each other.
   *
   * @memberof SegmentObject
   * @type {number[]}
   */
  timbre?: Array<number>;
}
/**
 * @export
 * @interface ShowBase
 */
export interface ShowBase {
  /**
   * A list of the countries in which the show can be played, identified by
   * their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
   * code.
   *
   * @memberof ShowBase
   * @deprecated
   * @type {string[]}
   */
  available_markets: Array<string>;
  /**
   * The copyright statements of the show.
   *
   * @memberof ShowBase
   * @type {CopyrightObject[]}
   */
  copyrights: Array<CopyrightObject>;
  /**
   * A description of the show. HTML tags are stripped away from this field, use
   * `html_description` field in case HTML tags are needed.
   *
   * @memberof ShowBase
   * @type {string}
   */
  description: string;
  /**
   * A description of the show. This field may contain HTML tags.
   *
   * @memberof ShowBase
   * @type {string}
   */
  html_description: string;
  /**
   * Whether or not the show has explicit content (true = yes it does; false =
   * no it does not OR unknown).
   *
   * @memberof ShowBase
   * @type {boolean}
   */
  explicit: boolean;
  /**
   * External URLs for this show.
   *
   * @memberof ShowBase
   * @type {ExternalUrlObject}
   */
  external_urls: ExternalUrlObject;
  /**
   * A link to the Web API endpoint providing full details of the show.
   *
   * @memberof ShowBase
   * @type {string}
   */
  href: string;
  /**
   * The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the
   * show.
   *
   * @memberof ShowBase
   * @type {string}
   */
  id: string;
  /**
   * The cover art for the show in various sizes, widest first.
   *
   * @memberof ShowBase
   * @type {ImageObject[]}
   */
  images: Array<ImageObject>;
  /**
   * True if all of the shows episodes are hosted outside of Spotify's CDN. This
   * field might be `null` in some cases.
   *
   * @memberof ShowBase
   * @type {boolean}
   */
  is_externally_hosted: boolean;
  /**
   * A list of the languages used in the show, identified by their [ISO
   * 639](https://en.wikipedia.org/wiki/ISO_639) code.
   *
   * @memberof ShowBase
   * @type {string[]}
   */
  languages: Array<string>;
  /**
   * The media type of the show.
   *
   * @memberof ShowBase
   * @type {string}
   */
  media_type: string;
  /**
   * The name of the episode.
   *
   * @memberof ShowBase
   * @type {string}
   */
  name: string;
  /**
   * The publisher of the show.
   *
   * @memberof ShowBase
   * @deprecated
   * @type {string}
   */
  publisher: string;
  /**
   * The object type.
   *
   * @memberof ShowBase
   * @type {string}
   */
  type: ShowBaseTypeEnum;
  /**
   * The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the
   * show.
   *
   * @memberof ShowBase
   * @type {string}
   */
  uri: string;
  /**
   * The total number of episodes in the show.
   *
   * @memberof ShowBase
   * @type {number}
   */
  total_episodes: number;
}

/** @export */
export const ShowBaseTypeEnum = {
  Show: "show",
} as const;
export type ShowBaseTypeEnum =
  (typeof ShowBaseTypeEnum)[keyof typeof ShowBaseTypeEnum];

/**
 * @export
 * @interface ShowObject
 */
export interface ShowObject {
  /**
   * A list of the countries in which the show can be played, identified by
   * their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
   * code.
   *
   * @memberof ShowObject
   * @deprecated
   * @type {string[]}
   */
  available_markets: Array<string>;
  /**
   * The copyright statements of the show.
   *
   * @memberof ShowObject
   * @type {CopyrightObject[]}
   */
  copyrights: Array<CopyrightObject>;
  /**
   * A description of the show. HTML tags are stripped away from this field, use
   * `html_description` field in case HTML tags are needed.
   *
   * @memberof ShowObject
   * @type {string}
   */
  description: string;
  /**
   * A description of the show. This field may contain HTML tags.
   *
   * @memberof ShowObject
   * @type {string}
   */
  html_description: string;
  /**
   * Whether or not the show has explicit content (true = yes it does; false =
   * no it does not OR unknown).
   *
   * @memberof ShowObject
   * @type {boolean}
   */
  explicit: boolean;
  /**
   * External URLs for this show.
   *
   * @memberof ShowObject
   * @type {ExternalUrlObject}
   */
  external_urls: ExternalUrlObject;
  /**
   * A link to the Web API endpoint providing full details of the show.
   *
   * @memberof ShowObject
   * @type {string}
   */
  href: string;
  /**
   * The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the
   * show.
   *
   * @memberof ShowObject
   * @type {string}
   */
  id: string;
  /**
   * The cover art for the show in various sizes, widest first.
   *
   * @memberof ShowObject
   * @type {ImageObject[]}
   */
  images: Array<ImageObject>;
  /**
   * True if all of the shows episodes are hosted outside of Spotify's CDN. This
   * field might be `null` in some cases.
   *
   * @memberof ShowObject
   * @type {boolean}
   */
  is_externally_hosted: boolean;
  /**
   * A list of the languages used in the show, identified by their [ISO
   * 639](https://en.wikipedia.org/wiki/ISO_639) code.
   *
   * @memberof ShowObject
   * @type {string[]}
   */
  languages: Array<string>;
  /**
   * The media type of the show.
   *
   * @memberof ShowObject
   * @type {string}
   */
  media_type: string;
  /**
   * The name of the episode.
   *
   * @memberof ShowObject
   * @type {string}
   */
  name: string;
  /**
   * The publisher of the show.
   *
   * @memberof ShowObject
   * @deprecated
   * @type {string}
   */
  publisher: string;
  /**
   * The object type.
   *
   * @memberof ShowObject
   * @type {string}
   */
  type: ShowObjectTypeEnum;
  /**
   * The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the
   * show.
   *
   * @memberof ShowObject
   * @type {string}
   */
  uri: string;
  /**
   * The total number of episodes in the show.
   *
   * @memberof ShowObject
   * @type {number}
   */
  total_episodes: number;
  /**
   * The episodes of the show.
   *
   * @memberof ShowObject
   * @type {object}
   */
  episodes: object;
}

/** @export */
export const ShowObjectTypeEnum = {
  Show: "show",
} as const;
export type ShowObjectTypeEnum =
  (typeof ShowObjectTypeEnum)[keyof typeof ShowObjectTypeEnum];

/**
 * @export
 * @interface SimplifiedAlbumObject
 */
export interface SimplifiedAlbumObject {
  /**
   * The type of the album.
   *
   * @memberof SimplifiedAlbumObject
   * @type {string}
   */
  album_type: SimplifiedAlbumObjectAlbumTypeEnum;
  /**
   * The number of tracks in the album.
   *
   * @memberof SimplifiedAlbumObject
   * @type {number}
   */
  total_tracks: number;
  /**
   * The markets in which the album is available: [ISO 3166-1 alpha-2 country
   * codes](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). _**NOTE**: an
   * album is considered available in a market when at least 1 of its tracks is
   * available in that market._
   *
   * @memberof SimplifiedAlbumObject
   * @deprecated
   * @type {string[]}
   */
  available_markets: Array<string>;
  /**
   * Known external URLs for this album.
   *
   * @memberof SimplifiedAlbumObject
   * @type {ExternalUrlObject}
   */
  external_urls: ExternalUrlObject;
  /**
   * A link to the Web API endpoint providing full details of the album.
   *
   * @memberof SimplifiedAlbumObject
   * @type {string}
   */
  href: string;
  /**
   * The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the
   * album.
   *
   * @memberof SimplifiedAlbumObject
   * @type {string}
   */
  id: string;
  /**
   * The cover art for the album in various sizes, widest first.
   *
   * @memberof SimplifiedAlbumObject
   * @type {ImageObject[]}
   */
  images: Array<ImageObject>;
  /**
   * The name of the album. In case of an album takedown, the value may be an
   * empty string.
   *
   * @memberof SimplifiedAlbumObject
   * @type {string}
   */
  name: string;
  /**
   * The date the album was first released.
   *
   * @memberof SimplifiedAlbumObject
   * @type {string}
   */
  release_date: string;
  /**
   * The precision with which `release_date` value is known.
   *
   * @memberof SimplifiedAlbumObject
   * @type {string}
   */
  release_date_precision: SimplifiedAlbumObjectReleaseDatePrecisionEnum;
  /**
   * Included in the response when a content restriction is applied.
   *
   * @memberof SimplifiedAlbumObject
   * @type {AlbumRestrictionObject}
   */
  restrictions?: AlbumRestrictionObject;
  /**
   * The object type.
   *
   * @memberof SimplifiedAlbumObject
   * @type {string}
   */
  type: SimplifiedAlbumObjectTypeEnum;
  /**
   * The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the
   * album.
   *
   * @memberof SimplifiedAlbumObject
   * @type {string}
   */
  uri: string;
  /**
   * The artists of the album. Each artist object includes a link in `href` to
   * more detailed information about the artist.
   *
   * @memberof SimplifiedAlbumObject
   * @type {SimplifiedArtistObject[]}
   */
  artists: Array<SimplifiedArtistObject>;
}

/** @export */
export const SimplifiedAlbumObjectAlbumTypeEnum = {
  Album: "album",
  Single: "single",
  Compilation: "compilation",
} as const;
export type SimplifiedAlbumObjectAlbumTypeEnum =
  (typeof SimplifiedAlbumObjectAlbumTypeEnum)[keyof typeof SimplifiedAlbumObjectAlbumTypeEnum];

/** @export */
export const SimplifiedAlbumObjectReleaseDatePrecisionEnum = {
  Year: "year",
  Month: "month",
  Day: "day",
} as const;
export type SimplifiedAlbumObjectReleaseDatePrecisionEnum =
  (typeof SimplifiedAlbumObjectReleaseDatePrecisionEnum)[keyof typeof SimplifiedAlbumObjectReleaseDatePrecisionEnum];

/** @export */
export const SimplifiedAlbumObjectTypeEnum = {
  Album: "album",
} as const;
export type SimplifiedAlbumObjectTypeEnum =
  (typeof SimplifiedAlbumObjectTypeEnum)[keyof typeof SimplifiedAlbumObjectTypeEnum];

/**
 * @export
 * @interface SimplifiedArtistObject
 */
export interface SimplifiedArtistObject {
  /**
   * Known external URLs for this artist.
   *
   * @memberof SimplifiedArtistObject
   * @type {ExternalUrlObject}
   */
  external_urls?: ExternalUrlObject;
  /**
   * A link to the Web API endpoint providing full details of the artist.
   *
   * @memberof SimplifiedArtistObject
   * @type {string}
   */
  href?: string;
  /**
   * The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the
   * artist.
   *
   * @memberof SimplifiedArtistObject
   * @type {string}
   */
  id?: string;
  /**
   * The name of the artist.
   *
   * @memberof SimplifiedArtistObject
   * @type {string}
   */
  name?: string;
  /**
   * The object type.
   *
   * @memberof SimplifiedArtistObject
   * @type {string}
   */
  type?: SimplifiedArtistObjectTypeEnum;
  /**
   * The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the
   * artist.
   *
   * @memberof SimplifiedArtistObject
   * @type {string}
   */
  uri?: string;
}

/** @export */
export const SimplifiedArtistObjectTypeEnum = {
  Artist: "artist",
} as const;
export type SimplifiedArtistObjectTypeEnum =
  (typeof SimplifiedArtistObjectTypeEnum)[keyof typeof SimplifiedArtistObjectTypeEnum];

/**
 * @export
 * @interface SimplifiedAudiobookObject
 */
export interface SimplifiedAudiobookObject {
  /**
   * The author(s) for the audiobook.
   *
   * @memberof SimplifiedAudiobookObject
   * @type {AuthorObject[]}
   */
  authors: Array<AuthorObject>;
  /**
   * A list of the countries in which the audiobook can be played, identified by
   * their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
   * code.
   *
   * @memberof SimplifiedAudiobookObject
   * @deprecated
   * @type {string[]}
   */
  available_markets: Array<string>;
  /**
   * The copyright statements of the audiobook.
   *
   * @memberof SimplifiedAudiobookObject
   * @type {CopyrightObject[]}
   */
  copyrights: Array<CopyrightObject>;
  /**
   * A description of the audiobook. HTML tags are stripped away from this
   * field, use `html_description` field in case HTML tags are needed.
   *
   * @memberof SimplifiedAudiobookObject
   * @type {string}
   */
  description: string;
  /**
   * A description of the audiobook. This field may contain HTML tags.
   *
   * @memberof SimplifiedAudiobookObject
   * @type {string}
   */
  html_description: string;
  /**
   * The edition of the audiobook.
   *
   * @memberof SimplifiedAudiobookObject
   * @type {string}
   */
  edition?: string;
  /**
   * Whether or not the audiobook has explicit content (true = yes it does;
   * false = no it does not OR unknown).
   *
   * @memberof SimplifiedAudiobookObject
   * @type {boolean}
   */
  explicit: boolean;
  /**
   * External URLs for this audiobook.
   *
   * @memberof SimplifiedAudiobookObject
   * @type {ExternalUrlObject}
   */
  external_urls: ExternalUrlObject;
  /**
   * A link to the Web API endpoint providing full details of the audiobook.
   *
   * @memberof SimplifiedAudiobookObject
   * @type {string}
   */
  href: string;
  /**
   * The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the
   * audiobook.
   *
   * @memberof SimplifiedAudiobookObject
   * @type {string}
   */
  id: string;
  /**
   * The cover art for the audiobook in various sizes, widest first.
   *
   * @memberof SimplifiedAudiobookObject
   * @type {ImageObject[]}
   */
  images: Array<ImageObject>;
  /**
   * A list of the languages used in the audiobook, identified by their [ISO
   * 639](https://en.wikipedia.org/wiki/ISO_639) code.
   *
   * @memberof SimplifiedAudiobookObject
   * @type {string[]}
   */
  languages: Array<string>;
  /**
   * The media type of the audiobook.
   *
   * @memberof SimplifiedAudiobookObject
   * @type {string}
   */
  media_type: string;
  /**
   * The name of the audiobook.
   *
   * @memberof SimplifiedAudiobookObject
   * @type {string}
   */
  name: string;
  /**
   * The narrator(s) for the audiobook.
   *
   * @memberof SimplifiedAudiobookObject
   * @type {NarratorObject[]}
   */
  narrators: Array<NarratorObject>;
  /**
   * The publisher of the audiobook.
   *
   * @memberof SimplifiedAudiobookObject
   * @deprecated
   * @type {string}
   */
  publisher: string;
  /**
   * The object type.
   *
   * @memberof SimplifiedAudiobookObject
   * @type {string}
   */
  type: SimplifiedAudiobookObjectTypeEnum;
  /**
   * The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the
   * audiobook.
   *
   * @memberof SimplifiedAudiobookObject
   * @type {string}
   */
  uri: string;
  /**
   * The number of chapters in this audiobook.
   *
   * @memberof SimplifiedAudiobookObject
   * @type {number}
   */
  total_chapters: number;
}

/** @export */
export const SimplifiedAudiobookObjectTypeEnum = {
  Audiobook: "audiobook",
} as const;
export type SimplifiedAudiobookObjectTypeEnum =
  (typeof SimplifiedAudiobookObjectTypeEnum)[keyof typeof SimplifiedAudiobookObjectTypeEnum];

/**
 * @export
 * @interface SimplifiedChapterObject
 */
export interface SimplifiedChapterObject {
  /**
   * A URL to a 30 second preview (MP3 format) of the chapter. `null` if not
   * available.
   *
   * @memberof SimplifiedChapterObject
   * @deprecated
   * @type {string}
   */
  audio_preview_url: string | null;
  /**
   * A list of the countries in which the chapter can be played, identified by
   * their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
   * code.
   *
   * @memberof SimplifiedChapterObject
   * @deprecated
   * @type {string[]}
   */
  available_markets?: Array<string>;
  /**
   * The number of the chapter
   *
   * @memberof SimplifiedChapterObject
   * @type {number}
   */
  chapter_number: number;
  /**
   * A description of the chapter. HTML tags are stripped away from this field,
   * use `html_description` field in case HTML tags are needed.
   *
   * @memberof SimplifiedChapterObject
   * @type {string}
   */
  description: string;
  /**
   * A description of the chapter. This field may contain HTML tags.
   *
   * @memberof SimplifiedChapterObject
   * @type {string}
   */
  html_description: string;
  /**
   * The chapter length in milliseconds.
   *
   * @memberof SimplifiedChapterObject
   * @type {number}
   */
  duration_ms: number;
  /**
   * Whether or not the chapter has explicit content (true = yes it does; false
   * = no it does not OR unknown).
   *
   * @memberof SimplifiedChapterObject
   * @type {boolean}
   */
  explicit: boolean;
  /**
   * External URLs for this chapter.
   *
   * @memberof SimplifiedChapterObject
   * @type {ExternalUrlObject}
   */
  external_urls: ExternalUrlObject;
  /**
   * A link to the Web API endpoint providing full details of the chapter.
   *
   * @memberof SimplifiedChapterObject
   * @type {string}
   */
  href: string;
  /**
   * The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the
   * chapter.
   *
   * @memberof SimplifiedChapterObject
   * @type {string}
   */
  id: string;
  /**
   * The cover art for the chapter in various sizes, widest first.
   *
   * @memberof SimplifiedChapterObject
   * @type {ImageObject[]}
   */
  images: Array<ImageObject>;
  /**
   * True if the chapter is playable in the given market. Otherwise false.
   *
   * @memberof SimplifiedChapterObject
   * @type {boolean}
   */
  is_playable: boolean;
  /**
   * A list of the languages used in the chapter, identified by their [ISO
   * 639-1](https://en.wikipedia.org/wiki/ISO_639) code.
   *
   * @memberof SimplifiedChapterObject
   * @type {string[]}
   */
  languages: Array<string>;
  /**
   * The name of the chapter.
   *
   * @memberof SimplifiedChapterObject
   * @type {string}
   */
  name: string;
  /**
   * The date the chapter was first released, for example `"1981-12-15"`.
   * Depending on the precision, it might be shown as `"1981"` or `"1981-12"`.
   *
   * @memberof SimplifiedChapterObject
   * @type {string}
   */
  release_date: string;
  /**
   * The precision with which `release_date` value is known.
   *
   * @memberof SimplifiedChapterObject
   * @type {string}
   */
  release_date_precision: SimplifiedChapterObjectReleaseDatePrecisionEnum;
  /**
   * The user's most recent position in the chapter. Set if the supplied access
   * token is a user token and has the scope 'user-read-playback-position'.
   *
   * @memberof SimplifiedChapterObject
   * @type {ResumePointObject}
   */
  resume_point?: ResumePointObject;
  /**
   * The object type.
   *
   * @memberof SimplifiedChapterObject
   * @type {string}
   */
  type: SimplifiedChapterObjectTypeEnum;
  /**
   * The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the
   * chapter.
   *
   * @memberof SimplifiedChapterObject
   * @type {string}
   */
  uri: string;
  /**
   * Included in the response when a content restriction is applied.
   *
   * @memberof SimplifiedChapterObject
   * @type {ChapterRestrictionObject}
   */
  restrictions?: ChapterRestrictionObject;
}

/** @export */
export const SimplifiedChapterObjectReleaseDatePrecisionEnum = {
  Year: "year",
  Month: "month",
  Day: "day",
} as const;
export type SimplifiedChapterObjectReleaseDatePrecisionEnum =
  (typeof SimplifiedChapterObjectReleaseDatePrecisionEnum)[keyof typeof SimplifiedChapterObjectReleaseDatePrecisionEnum];

/** @export */
export const SimplifiedChapterObjectTypeEnum = {
  Episode: "episode",
} as const;
export type SimplifiedChapterObjectTypeEnum =
  (typeof SimplifiedChapterObjectTypeEnum)[keyof typeof SimplifiedChapterObjectTypeEnum];

/**
 * @export
 * @interface SimplifiedEpisodeObject
 */
export interface SimplifiedEpisodeObject {
  /**
   * A URL to a 30 second preview (MP3 format) of the episode. `null` if not
   * available.
   *
   * @memberof SimplifiedEpisodeObject
   * @deprecated
   * @type {string}
   */
  audio_preview_url: string | null;
  /**
   * A description of the episode. HTML tags are stripped away from this field,
   * use `html_description` field in case HTML tags are needed.
   *
   * @memberof SimplifiedEpisodeObject
   * @type {string}
   */
  description: string;
  /**
   * A description of the episode. This field may contain HTML tags.
   *
   * @memberof SimplifiedEpisodeObject
   * @type {string}
   */
  html_description: string;
  /**
   * The episode length in milliseconds.
   *
   * @memberof SimplifiedEpisodeObject
   * @type {number}
   */
  duration_ms: number;
  /**
   * Whether or not the episode has explicit content (true = yes it does; false
   * = no it does not OR unknown).
   *
   * @memberof SimplifiedEpisodeObject
   * @type {boolean}
   */
  explicit: boolean;
  /**
   * External URLs for this episode.
   *
   * @memberof SimplifiedEpisodeObject
   * @type {ExternalUrlObject}
   */
  external_urls: ExternalUrlObject;
  /**
   * A link to the Web API endpoint providing full details of the episode.
   *
   * @memberof SimplifiedEpisodeObject
   * @type {string}
   */
  href: string;
  /**
   * The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the
   * episode.
   *
   * @memberof SimplifiedEpisodeObject
   * @type {string}
   */
  id: string;
  /**
   * The cover art for the episode in various sizes, widest first.
   *
   * @memberof SimplifiedEpisodeObject
   * @type {ImageObject[]}
   */
  images: Array<ImageObject>;
  /**
   * True if the episode is hosted outside of Spotify's CDN.
   *
   * @memberof SimplifiedEpisodeObject
   * @type {boolean}
   */
  is_externally_hosted: boolean;
  /**
   * True if the episode is playable in the given market. Otherwise false.
   *
   * @memberof SimplifiedEpisodeObject
   * @type {boolean}
   */
  is_playable: boolean;
  /**
   * The language used in the episode, identified by a [ISO
   * 639](https://en.wikipedia.org/wiki/ISO_639) code. This field is deprecated
   * and might be removed in the future. Please use the `languages` field
   * instead.
   *
   * @memberof SimplifiedEpisodeObject
   * @deprecated
   * @type {string}
   */
  language?: string;
  /**
   * A list of the languages used in the episode, identified by their [ISO
   * 639-1](https://en.wikipedia.org/wiki/ISO_639) code.
   *
   * @memberof SimplifiedEpisodeObject
   * @type {string[]}
   */
  languages: Array<string>;
  /**
   * The name of the episode.
   *
   * @memberof SimplifiedEpisodeObject
   * @type {string}
   */
  name: string;
  /**
   * The date the episode was first released, for example `"1981-12-15"`.
   * Depending on the precision, it might be shown as `"1981"` or `"1981-12"`.
   *
   * @memberof SimplifiedEpisodeObject
   * @type {string}
   */
  release_date: string;
  /**
   * The precision with which `release_date` value is known.
   *
   * @memberof SimplifiedEpisodeObject
   * @type {string}
   */
  release_date_precision: SimplifiedEpisodeObjectReleaseDatePrecisionEnum;
  /**
   * The user's most recent position in the episode. Set if the supplied access
   * token is a user token and has the scope 'user-read-playback-position'.
   *
   * @memberof SimplifiedEpisodeObject
   * @type {ResumePointObject}
   */
  resume_point?: ResumePointObject;
  /**
   * The object type.
   *
   * @memberof SimplifiedEpisodeObject
   * @type {string}
   */
  type: SimplifiedEpisodeObjectTypeEnum;
  /**
   * The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the
   * episode.
   *
   * @memberof SimplifiedEpisodeObject
   * @type {string}
   */
  uri: string;
  /**
   * Included in the response when a content restriction is applied.
   *
   * @memberof SimplifiedEpisodeObject
   * @type {EpisodeRestrictionObject}
   */
  restrictions?: EpisodeRestrictionObject;
}

/** @export */
export const SimplifiedEpisodeObjectReleaseDatePrecisionEnum = {
  Year: "year",
  Month: "month",
  Day: "day",
} as const;
export type SimplifiedEpisodeObjectReleaseDatePrecisionEnum =
  (typeof SimplifiedEpisodeObjectReleaseDatePrecisionEnum)[keyof typeof SimplifiedEpisodeObjectReleaseDatePrecisionEnum];

/** @export */
export const SimplifiedEpisodeObjectTypeEnum = {
  Episode: "episode",
} as const;
export type SimplifiedEpisodeObjectTypeEnum =
  (typeof SimplifiedEpisodeObjectTypeEnum)[keyof typeof SimplifiedEpisodeObjectTypeEnum];

/**
 * @export
 * @interface SimplifiedPlaylistObject
 */
export interface SimplifiedPlaylistObject {
  /**
   * `true` if the owner allows other users to modify the playlist.
   *
   * @memberof SimplifiedPlaylistObject
   * @type {boolean}
   */
  collaborative?: boolean;
  /**
   * The playlist description. _Only returned for modified, verified playlists,
   * otherwise_ `null`.
   *
   * @memberof SimplifiedPlaylistObject
   * @type {string}
   */
  description?: string;
  /**
   * Known external URLs for this playlist.
   *
   * @memberof SimplifiedPlaylistObject
   * @type {ExternalUrlObject}
   */
  external_urls?: ExternalUrlObject;
  /**
   * A link to the Web API endpoint providing full details of the playlist.
   *
   * @memberof SimplifiedPlaylistObject
   * @type {string}
   */
  href?: string;
  /**
   * The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the
   * playlist.
   *
   * @memberof SimplifiedPlaylistObject
   * @type {string}
   */
  id?: string;
  /**
   * Images for the playlist. The array may be empty or contain up to three
   * images. The images are returned by size in descending order. See [Working
   * with Playlists](/documentation/web-api/concepts/playlists). _**Note**: If
   * returned, the source URL for the image (`url`) is temporary and will expire
   * in less than a day._
   *
   * @memberof SimplifiedPlaylistObject
   * @type {ImageObject[]}
   */
  images?: Array<ImageObject>;
  /**
   * The name of the playlist.
   *
   * @memberof SimplifiedPlaylistObject
   * @type {string}
   */
  name?: string;
  /**
   * The user who owns the playlist
   *
   * @memberof SimplifiedPlaylistObject
   * @type {PlaylistOwnerObject}
   */
  owner?: PlaylistOwnerObject;
  /**
   * The playlist's public/private status (if it is added to the user's
   * profile): `true` the playlist is public, `false` the playlist is private,
   * `null` the playlist status is not relevant. For more about public/private
   * status, see [Working with
   * Playlists](/documentation/web-api/concepts/playlists)
   *
   * @memberof SimplifiedPlaylistObject
   * @type {boolean}
   */
  _public?: boolean;
  /**
   * The version identifier for the current playlist. Can be supplied in other
   * requests to target a specific playlist version
   *
   * @memberof SimplifiedPlaylistObject
   * @type {string}
   */
  snapshot_id?: string;
  /**
   * A collection containing a link ( `href` ) to the Web API endpoint where
   * full details of the playlist's items can be retrieved, along with the
   * `total` number of items in the playlist. Note, a track object may be
   * `null`. This can happen if a track is no longer available.
   *
   * @memberof SimplifiedPlaylistObject
   * @type {PlaylistTracksRefObject}
   */
  items?: PlaylistTracksRefObject;
  /**
   * **Deprecated:** Use `items` instead. A collection containing a link (
   * `href` ) to the Web API endpoint where full details of the playlist's
   * tracks can be retrieved, along with the `total` number of tracks in the
   * playlist. Note, a track object may be `null`. This can happen if a track is
   * no longer available.
   *
   * @memberof SimplifiedPlaylistObject
   * @deprecated
   * @type {PlaylistTracksRefObject}
   */
  tracks?: PlaylistTracksRefObject;
  /**
   * The object type: "playlist"
   *
   * @memberof SimplifiedPlaylistObject
   * @type {string}
   */
  type?: string;
  /**
   * The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the
   * playlist.
   *
   * @memberof SimplifiedPlaylistObject
   * @type {string}
   */
  uri?: string;
}
/**
 * @export
 * @interface SimplifiedShowObject
 */
export interface SimplifiedShowObject {
  /**
   * A list of the countries in which the show can be played, identified by
   * their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
   * code.
   *
   * @memberof SimplifiedShowObject
   * @deprecated
   * @type {string[]}
   */
  available_markets: Array<string>;
  /**
   * The copyright statements of the show.
   *
   * @memberof SimplifiedShowObject
   * @type {CopyrightObject[]}
   */
  copyrights: Array<CopyrightObject>;
  /**
   * A description of the show. HTML tags are stripped away from this field, use
   * `html_description` field in case HTML tags are needed.
   *
   * @memberof SimplifiedShowObject
   * @type {string}
   */
  description: string;
  /**
   * A description of the show. This field may contain HTML tags.
   *
   * @memberof SimplifiedShowObject
   * @type {string}
   */
  html_description: string;
  /**
   * Whether or not the show has explicit content (true = yes it does; false =
   * no it does not OR unknown).
   *
   * @memberof SimplifiedShowObject
   * @type {boolean}
   */
  explicit: boolean;
  /**
   * External URLs for this show.
   *
   * @memberof SimplifiedShowObject
   * @type {ExternalUrlObject}
   */
  external_urls: ExternalUrlObject;
  /**
   * A link to the Web API endpoint providing full details of the show.
   *
   * @memberof SimplifiedShowObject
   * @type {string}
   */
  href: string;
  /**
   * The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the
   * show.
   *
   * @memberof SimplifiedShowObject
   * @type {string}
   */
  id: string;
  /**
   * The cover art for the show in various sizes, widest first.
   *
   * @memberof SimplifiedShowObject
   * @type {ImageObject[]}
   */
  images: Array<ImageObject>;
  /**
   * True if all of the shows episodes are hosted outside of Spotify's CDN. This
   * field might be `null` in some cases.
   *
   * @memberof SimplifiedShowObject
   * @type {boolean}
   */
  is_externally_hosted: boolean;
  /**
   * A list of the languages used in the show, identified by their [ISO
   * 639](https://en.wikipedia.org/wiki/ISO_639) code.
   *
   * @memberof SimplifiedShowObject
   * @type {string[]}
   */
  languages: Array<string>;
  /**
   * The media type of the show.
   *
   * @memberof SimplifiedShowObject
   * @type {string}
   */
  media_type: string;
  /**
   * The name of the episode.
   *
   * @memberof SimplifiedShowObject
   * @type {string}
   */
  name: string;
  /**
   * The publisher of the show.
   *
   * @memberof SimplifiedShowObject
   * @deprecated
   * @type {string}
   */
  publisher: string;
  /**
   * The object type.
   *
   * @memberof SimplifiedShowObject
   * @type {string}
   */
  type: SimplifiedShowObjectTypeEnum;
  /**
   * The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the
   * show.
   *
   * @memberof SimplifiedShowObject
   * @type {string}
   */
  uri: string;
  /**
   * The total number of episodes in the show.
   *
   * @memberof SimplifiedShowObject
   * @type {number}
   */
  total_episodes: number;
}

/** @export */
export const SimplifiedShowObjectTypeEnum = {
  Show: "show",
} as const;
export type SimplifiedShowObjectTypeEnum =
  (typeof SimplifiedShowObjectTypeEnum)[keyof typeof SimplifiedShowObjectTypeEnum];

/**
 * @export
 * @interface SimplifiedTrackObject
 */
export interface SimplifiedTrackObject {
  /**
   * The artists who performed the track. Each artist object includes a link in
   * `href` to more detailed information about the artist.
   *
   * @memberof SimplifiedTrackObject
   * @type {SimplifiedArtistObject[]}
   */
  artists?: Array<SimplifiedArtistObject>;
  /**
   * A list of the countries in which the track can be played, identified by
   * their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
   * code.
   *
   * @memberof SimplifiedTrackObject
   * @deprecated
   * @type {string[]}
   */
  available_markets?: Array<string>;
  /**
   * The disc number (usually `1` unless the album consists of more than one
   * disc).
   *
   * @memberof SimplifiedTrackObject
   * @type {number}
   */
  disc_number?: number;
  /**
   * The track length in milliseconds.
   *
   * @memberof SimplifiedTrackObject
   * @type {number}
   */
  duration_ms?: number;
  /**
   * Whether or not the track has explicit lyrics ( `true` = yes it does;
   * `false` = no it does not OR unknown).
   *
   * @memberof SimplifiedTrackObject
   * @type {boolean}
   */
  explicit?: boolean;
  /**
   * External URLs for this track.
   *
   * @memberof SimplifiedTrackObject
   * @type {ExternalUrlObject}
   */
  external_urls?: ExternalUrlObject;
  /**
   * A link to the Web API endpoint providing full details of the track.
   *
   * @memberof SimplifiedTrackObject
   * @type {string}
   */
  href?: string;
  /**
   * The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the
   * track.
   *
   * @memberof SimplifiedTrackObject
   * @type {string}
   */
  id?: string;
  /**
   * Part of the response when [Track
   * Relinking](/documentation/web-api/concepts/track-relinking/) is applied. If
   * `true`, the track is playable in the given market. Otherwise `false`.
   *
   * @memberof SimplifiedTrackObject
   * @type {boolean}
   */
  is_playable?: boolean;
  /**
   * Part of the response when [Track
   * Relinking](/documentation/web-api/concepts/track-relinking/) is applied and
   * is only part of the response if the track linking, in fact, exists. The
   * requested track has been replaced with a different track. The track in the
   * `linked_from` object contains information about the originally requested
   * track.
   *
   * @memberof SimplifiedTrackObject
   * @deprecated
   * @type {LinkedTrackObject}
   */
  linked_from?: LinkedTrackObject;
  /**
   * Included in the response when a content restriction is applied.
   *
   * @memberof SimplifiedTrackObject
   * @type {TrackRestrictionObject}
   */
  restrictions?: TrackRestrictionObject;
  /**
   * The name of the track.
   *
   * @memberof SimplifiedTrackObject
   * @type {string}
   */
  name?: string;
  /**
   * A URL to a 30 second preview (MP3 format) of the track.
   *
   * @memberof SimplifiedTrackObject
   * @deprecated
   * @type {string}
   */
  preview_url?: string | null;
  /**
   * The number of the track. If an album has several discs, the track number is
   * the number on the specified disc.
   *
   * @memberof SimplifiedTrackObject
   * @type {number}
   */
  track_number?: number;
  /**
   * The object type: "track".
   *
   * @memberof SimplifiedTrackObject
   * @type {string}
   */
  type?: string;
  /**
   * The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the
   * track.
   *
   * @memberof SimplifiedTrackObject
   * @type {string}
   */
  uri?: string;
  /**
   * Whether or not the track is from a local file.
   *
   * @memberof SimplifiedTrackObject
   * @type {boolean}
   */
  is_local?: boolean;
}
/**
 * @export
 * @interface StartAUsersPlaybackRequest
 */
export interface StartAUsersPlaybackRequest {
  [key: string]: any | any;
  /**
   * Optional. Spotify URI of the context to play. Valid contexts are albums,
   * artists & playlists.
   * `{context_uri:"spotify:album:1Je1IMUlBXcx1Fz0WE7oPT"}`
   *
   * @memberof StartAUsersPlaybackRequest
   * @type {string}
   */
  context_uri?: string;
  /**
   * Optional. A JSON array of the Spotify track URIs to play. For example:
   * `{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh",
   * "spotify:track:1301WleyT98MSxVHPZCA6M"]}`
   *
   * @memberof StartAUsersPlaybackRequest
   * @type {string[]}
   */
  uris?: Array<string>;
  /**
   * Optional. Indicates from where in the context playback should start. Only
   * available when context_uri corresponds to an album or playlist object
   * "position" is zero based and can’t be negative. Example: `"offset":
   * {"position": 5}` "uri" is a string representing the uri of the item to
   * start at. Example: `"offset": {"uri":
   * "spotify:track:1301WleyT98MSxVHPZCA6M"}`
   *
   * @memberof StartAUsersPlaybackRequest
   * @type {{ [key: string]: any }}
   */
  offset?: { [key: string]: any };
  /**
   * Indicates from what position to start playback. Must be a positive number.
   * Passing in a position that is greater than the length of the track will
   * cause the player to start playing the next song.
   *
   * @memberof StartAUsersPlaybackRequest
   * @type {number}
   */
  position_ms?: number;
}
/**
 * @export
 * @interface TimeIntervalObject
 */
export interface TimeIntervalObject {
  /**
   * The starting point (in seconds) of the time interval.
   *
   * @memberof TimeIntervalObject
   * @type {number}
   */
  start?: number;
  /**
   * The duration (in seconds) of the time interval.
   *
   * @memberof TimeIntervalObject
   * @type {number}
   */
  duration?: number;
  /**
   * The confidence, from 0.0 to 1.0, of the reliability of the interval.
   *
   * @memberof TimeIntervalObject
   * @type {number}
   */
  confidence?: number;
}
/**
 * @export
 * @interface TrackObject
 */
export interface TrackObject {
  /**
   * The album on which the track appears. The album object includes a link in
   * `href` to full information about the album.
   *
   * @memberof TrackObject
   * @type {SimplifiedAlbumObject}
   */
  album?: SimplifiedAlbumObject;
  /**
   * The artists who performed the track. Each artist object includes a link in
   * `href` to more detailed information about the artist.
   *
   * @memberof TrackObject
   * @type {SimplifiedArtistObject[]}
   */
  artists?: Array<SimplifiedArtistObject>;
  /**
   * A list of the countries in which the track can be played, identified by
   * their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
   * code.
   *
   * @memberof TrackObject
   * @deprecated
   * @type {string[]}
   */
  available_markets?: Array<string>;
  /**
   * The disc number (usually `1` unless the album consists of more than one
   * disc).
   *
   * @memberof TrackObject
   * @type {number}
   */
  disc_number?: number;
  /**
   * The track length in milliseconds.
   *
   * @memberof TrackObject
   * @type {number}
   */
  duration_ms?: number;
  /**
   * Whether or not the track has explicit lyrics ( `true` = yes it does;
   * `false` = no it does not OR unknown).
   *
   * @memberof TrackObject
   * @type {boolean}
   */
  explicit?: boolean;
  /**
   * Known external IDs for the track.
   *
   * @memberof TrackObject
   * @type {ExternalIdObject}
   */
  external_ids?: ExternalIdObject;
  /**
   * Known external URLs for this track.
   *
   * @memberof TrackObject
   * @type {ExternalUrlObject}
   */
  external_urls?: ExternalUrlObject;
  /**
   * A link to the Web API endpoint providing full details of the track.
   *
   * @memberof TrackObject
   * @type {string}
   */
  href?: string;
  /**
   * The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the
   * track.
   *
   * @memberof TrackObject
   * @type {string}
   */
  id?: string;
  /**
   * Part of the response when [Track
   * Relinking](/documentation/web-api/concepts/track-relinking) is applied. If
   * `true`, the track is playable in the given market. Otherwise `false`.
   *
   * @memberof TrackObject
   * @type {boolean}
   */
  is_playable?: boolean;
  /**
   * Part of the response when [Track
   * Relinking](/documentation/web-api/concepts/track-relinking) is applied, and
   * the requested track has been replaced with different track. The track in
   * the `linked_from` object contains information about the originally
   * requested track.
   *
   * @memberof TrackObject
   * @deprecated
   * @type {LinkedTrackObject}
   */
  linked_from?: LinkedTrackObject;
  /**
   * Included in the response when a content restriction is applied.
   *
   * @memberof TrackObject
   * @type {TrackRestrictionObject}
   */
  restrictions?: TrackRestrictionObject;
  /**
   * The name of the track.
   *
   * @memberof TrackObject
   * @type {string}
   */
  name?: string;
  /**
   * The popularity of the track. The value will be between 0 and 100, with 100
   * being the most popular.<br/>The popularity of a track is a value between 0
   * and 100, with 100 being the most popular. The popularity is calculated by
   * algorithm and is based, in the most part, on the total number of plays the
   * track has had and how recent those plays are.<br/>Generally speaking, songs
   * that are being played a lot now will have a higher popularity than songs
   * that were played a lot in the past. Duplicate tracks (e.g. the same track
   * from a single and an album) are rated independently. Artist and album
   * popularity is derived mathematically from track popularity. _**Note**: the
   * popularity value may lag actual popularity by a few days: the value is not
   * updated in real time._
   *
   * @memberof TrackObject
   * @deprecated
   * @type {number}
   */
  popularity?: number;
  /**
   * A link to a 30 second preview (MP3 format) of the track. Can be `null`
   *
   * @memberof TrackObject
   * @deprecated
   * @type {string}
   */
  preview_url?: string | null;
  /**
   * The number of the track. If an album has several discs, the track number is
   * the number on the specified disc.
   *
   * @memberof TrackObject
   * @type {number}
   */
  track_number?: number;
  /**
   * The object type: "track".
   *
   * @memberof TrackObject
   * @type {string}
   */
  type?: TrackObjectTypeEnum;
  /**
   * The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the
   * track.
   *
   * @memberof TrackObject
   * @type {string}
   */
  uri?: string;
  /**
   * Whether or not the track is from a local file.
   *
   * @memberof TrackObject
   * @type {boolean}
   */
  is_local?: boolean;
}

/** @export */
export const TrackObjectTypeEnum = {
  Track: "track",
} as const;
export type TrackObjectTypeEnum =
  (typeof TrackObjectTypeEnum)[keyof typeof TrackObjectTypeEnum];

/**
 * @export
 * @interface TrackRestrictionObject
 */
export interface TrackRestrictionObject {
  /**
   * The reason for the restriction. Supported values:
   *
   * - `market` - The content item is not available in the given market.
   * - `product` - The content item is not available for the user's subscription
   *   type.
   * - `explicit` - The content item is explicit and the user's account is set to
   *   not play explicit content.
   *
   * Additional reasons may be added in the future. **Note**: If you use this
   * field, make sure that your application safely handles unknown values.
   *
   * @memberof TrackRestrictionObject
   * @type {string}
   */
  reason?: string;
}
/**
 * @export
 * @interface TransferAUsersPlaybackRequest
 */
export interface TransferAUsersPlaybackRequest {
  [key: string]: any | any;
  /**
   * A JSON array containing the ID of the device on which playback should be
   * started/transferred.<br/>For
   * example:`{device_ids:["74ASZWbe4lXaubB36ztrGX"]}`<br/>_**Note**: Although
   * an array is accepted, only a single device_id is currently supported.
   * Supplying more than one will return `400 Bad Request`_
   *
   * @memberof TransferAUsersPlaybackRequest
   * @type {string[]}
   */
  device_ids: Array<string>;
  /**
   * **true**: ensure playback happens on new device.<br/>**false** or not
   * provided: keep the current playback state.
   *
   * @memberof TransferAUsersPlaybackRequest
   * @type {boolean}
   */
  play?: boolean;
}
