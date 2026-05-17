export interface WebPlaybackEntity {
  name: string;
  uri: string;
}

export interface WebPlaybackAlbum {
  name: string;
  uri: string;
  images: WebPlaybackImage[];
}

export interface WebPlaybackImage {
  height?: number | null | undefined;
  url: string;
  size?: string | null | undefined;
  width?: number | null | undefined;
}

export interface WebPlaybackContextTrack extends WebPlaybackEntity {
  artists: WebPlaybackEntity[];
  content_type: string;
  estimated_duration: number;
  group: WebPlaybackEntity;
  images: WebPlaybackImage[];
  uid: string;
}

export interface WebPlaybackContextRestrictions {
  pause: string[];
  resume: string[];
  seek: string[];
  skip_next: string[];
  skip_prev: string[];
  toggle_repeat_context: string[];
  toggle_repeat_track: string[];
  toggle_shuffle: string[];
  peek_next: string[];
  peek_prev: string[];
}

export interface WebPlaybackContextMetadata {
  enhanced_context: "false";
  context_description: string;
}

export interface WebPlaybackContext {
  metadata: WebPlaybackContextMetadata | null;
  uri: string | null;
}

export interface WebPlaybackDisallows {
  pausing?: boolean;
  peeking_next?: boolean;
  peeking_prev?: boolean;
  resuming?: boolean;
  seeking?: boolean;
  skipping_next?: boolean;
  skipping_prev?: boolean;
  toggling_repeat_context?: boolean;
  toggling_repeat_track?: boolean;
  toggling_shuffle?: boolean;
  setting_playback_speed?: boolean;
  removing_from_next_tracks?: boolean;
  removing_from_context_tracks?: boolean;
  updating_context?: boolean;
  setting_modes?: {
    context_enhancement?: {
      NONE: boolean;
      RECOMMENDATION: boolean;
    };
    media?: {
      audio: boolean;
      video: boolean;
    };
  };
  signals: { [signal: string]: boolean };
  play_as_next_in_queue?: boolean;
}

export interface WebPlaybackRestrictions {
  disallow_pausing_reasons?: string[];
  disallow_peeking_next_reasons?: string[];
  disallow_peeking_prev_reasons?: string[];
  disallow_resuming_reasons?: string[];
  disallow_seeking_reasons?: string[];
  disallow_skipping_next_reasons?: string[];
  disallow_skipping_prev_reasons?: string[];
  disallow_toggling_repeat_context_reasons?: string[];
  disallow_toggling_repeat_track_reasons?: string[];
  disallow_toggling_shuffle_reasons?: string[];
  disallow_setting_playback_speed_reasons?: string[];
  disallow_removing_from_next_tracks_reasons?: string[];
  disallow_removing_from_context_tracks_reasons?: string[];
  disallow_updating_context_reasons?: string[];
  disallow_setting_modes?: {
    context_enhancement?: {
      values: {
        NONE: { reasons: string[] };
        RECOMMENDATION: { reasons: string[] };
      };
    };
    media?: {
      values: {
        audio: { reasons: string[] };
        video: { reasons: string[] };
      };
    };
  };
  disallow_signals: { [signal: string]: { reasons: string[] } };
  disallow_play_as_next_in_queue_reasons?: string[];
}

export interface WebPlaybackState {
  context: WebPlaybackContext;
  disallows: WebPlaybackDisallows;
  duration: number;
  paused: boolean;
  position: number;
  loading: boolean;
  timestamp: number;
  /** 0: NO_REPEAT 1: ONCE_REPEAT 2: FULL_REPEAT */
  repeat_mode: 0 | 1 | 2;
  shuffle: boolean;
  shuffle_mode: 0 | 1 | 2;
  restrictions: WebPlaybackRestrictions;
  track_window: WebPlaybackTrackWindow;
  playback_id: string;
  playback_speed: number;
  playback_quality: string;
  playback_features: {
    hifi_status: string;
    playback_speed: {
      current: number;
      selected: number;
      restricted: boolean;
    };
    signal_ids: unknown[];
    modes: {
      context_enhancement: string;
      media: string;
      jam: string;
    };
  };
}

export interface WebPlaybackTrackWindow {
  current_track: WebPlaybackTrack;
  previous_tracks: WebPlaybackTrack[];
  next_tracks: WebPlaybackTrack[];
}

export interface WebPlaybackTrack {
  album: WebPlaybackAlbum;
  artists: WebPlaybackEntity[];
  duration_ms: number;
  id: string | null;
  is_playable: boolean;
  name: string;
  uid: string;
  uri: string;
  media_type: "audio" | "video";
  type: "track" | "episode" | "ad";
  content_type: "music" | string;
  track_type: "audio" | "video";
  linked_from: {
    uri: string | null;
    id: string | null;
  };
  metadata: {};
}

export interface WebPlaybackInstance {
  device_id: string;
}
