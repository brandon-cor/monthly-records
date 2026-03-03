import type {
  RecentlyPlayedResponse,
  TopTracksResponse,
  TopArtistsResponse,
  TimeRange,
  SpotifyUser,
  SpotifyPlaylist,
} from "./types";

const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

async function spotifyFetch<T>(
  endpoint: string,
  accessToken: string,
  params?: Record<string, string>
): Promise<T> {
  const url = new URL(`${SPOTIFY_API_BASE}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) =>
      url.searchParams.set(key, value)
    );
  }
  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    const errorText = await res.text();
    let spotifyMessage = errorText;
    try {
      const parsed = JSON.parse(errorText) as { error?: { message?: string } };
      spotifyMessage = parsed.error?.message ?? errorText;
    } catch {
      /* use raw text */
    }
    throw new Error(`Spotify ${endpoint}: ${res.status} - ${spotifyMessage}`);
  }
  return res.json() as Promise<T>;
}

async function spotifyFetchPost<T>(
  endpoint: string,
  accessToken: string,
  body: Record<string, unknown>
): Promise<T> {
  const res = await fetch(`${SPOTIFY_API_BASE}${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errorText = await res.text();
    let spotifyMessage = errorText;
    try {
      const parsed = JSON.parse(errorText) as { error?: { message?: string } };
      spotifyMessage = parsed.error?.message ?? errorText;
    } catch {
      /* use raw text */
    }
    throw new Error(`Spotify ${endpoint}: ${res.status} - ${spotifyMessage}`);
  }
  return res.json() as Promise<T>;
}

export async function getCurrentUser(
  accessToken: string
): Promise<SpotifyUser> {
  return spotifyFetch<SpotifyUser>("/me", accessToken);
}

export async function createPlaylist(
  accessToken: string,
  name: string,
  description?: string
): Promise<SpotifyPlaylist> {
  return spotifyFetchPost<SpotifyPlaylist>(
    "/me/playlists",
    accessToken,
    { name, description: description ?? "", public: false }
  );
}

export async function addTracksToPlaylist(
  accessToken: string,
  playlistId: string,
  uris: string[]
): Promise<{ snapshot_id: string }> {
  return spotifyFetchPost<{ snapshot_id: string }>(
    `/playlists/${playlistId}/items`,
    accessToken,
    { uris }
  );
}

export async function getRecentlyPlayed(
  accessToken: string,
  limit = 50
): Promise<RecentlyPlayedResponse> {
  return spotifyFetch<RecentlyPlayedResponse>(
    "/me/player/recently-played",
    accessToken,
    { limit: String(limit) }
  );
}

export async function getTopTracks(
  accessToken: string,
  timeRange: TimeRange = "medium_term",
  limit = 50
): Promise<TopTracksResponse> {
  return spotifyFetch<TopTracksResponse>("/me/top/tracks", accessToken, {
    time_range: timeRange,
    limit: String(limit),
  });
}

export async function getTopArtists(
  accessToken: string,
  timeRange: TimeRange = "medium_term",
  limit = 50
): Promise<TopArtistsResponse> {
  return spotifyFetch<TopArtistsResponse>("/me/top/artists", accessToken, {
    time_range: timeRange,
    limit: String(limit),
  });
}

export async function uploadPlaylistImage(
  accessToken: string,
  playlistId: string,
  base64Jpeg: string
): Promise<void> {
  const res = await fetch(
    `${SPOTIFY_API_BASE}/playlists/${playlistId}/images`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "image/jpeg",
      },
      body: base64Jpeg,
    }
  );
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(
      `Spotify /playlists/${playlistId}/images: ${res.status} - ${errorText}`
    );
  }
}
