export interface SpotifyTrack {
  id: string;
  name: string;
  artists: { id: string; name: string }[];
  album: {
    id: string;
    name: string;
    images: { url: string; height: number; width: number }[];
  };
  duration_ms: number;
  uri: string;
}

export interface PlayHistoryItem {
  track: SpotifyTrack;
  played_at: string;
}

export interface RecentlyPlayedResponse {
  items: PlayHistoryItem[];
  next: string | null;
  cursors?: {
    after: string;
    before: string;
  };
}

export interface TopTracksResponse {
  items: SpotifyTrack[];
  total: number;
  limit: number;
  offset: number;
  href: string;
  next: string | null;
  previous: string | null;
}

export interface SpotifyArtist {
  id: string;
  name: string;
  images?: { url: string; height: number; width: number }[];
  genres?: string[];
  uri?: string;
}

export interface TopArtistsResponse {
  items: SpotifyArtist[];
  total: number;
  limit: number;
  offset: number;
  href: string;
  next: string | null;
  previous: string | null;
}

export type TimeRange = "short_term" | "medium_term" | "long_term";

export interface SpotifyUser {
  id: string;
  display_name?: string;
  email?: string;
  product?: string;
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  external_urls: { spotify: string };
}
