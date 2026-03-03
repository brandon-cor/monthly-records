export type MusicProvider = "spotify";

export interface NormalizedTrack {
  id: string;
  name: string;
  artists: { id: string; name: string }[];
  album: {
    id: string;
    name: string;
    images: { url: string; height: number; width: number }[];
  };
  durationMs: number;
  playedAt?: string;
  /** Deep link to the track */
  url?: string;
}

export interface NormalizedPlayHistoryItem {
  track: NormalizedTrack;
  playedAt?: string;
}

export interface NormalizedArtist {
  id: string;
  name: string;
  images?: { url: string; height: number; width: number }[];
  /** Deep link */
  url?: string;
}
