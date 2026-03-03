import { getSpotifyAccessToken } from "@/lib/spotify/get-token";
import { getRecentlyPlayed as getSpotifyRecentlyPlayed } from "@/lib/spotify/client";
import type {
  MusicProvider,
  NormalizedPlayHistoryItem,
  NormalizedTrack,
  NormalizedArtist,
} from "./types";
import type { PlayHistoryItem } from "@/lib/spotify/types";
import { getTopTracks, getTopArtists } from "@/lib/spotify/client";
import type { TimeRange } from "@/lib/spotify/types";

export type { MusicProvider, NormalizedTrack, NormalizedPlayHistoryItem, NormalizedArtist };

export async function getActiveMusicProvider(): Promise<MusicProvider | null> {
  const spotifyToken = await getSpotifyAccessToken();
  if (spotifyToken) return "spotify";
  return null;
}

export async function hasSpotify(): Promise<boolean> {
  return (await getSpotifyAccessToken()) !== null;
}

function normalizeSpotifyItem(item: PlayHistoryItem): NormalizedPlayHistoryItem {
  return {
    track: {
      id: item.track.id,
      name: item.track.name,
      artists: item.track.artists.map((a) => ({ id: a.id, name: a.name })),
      album: {
        id: item.track.album.id,
        name: item.track.album.name,
        images: item.track.album.images ?? [],
      },
      durationMs: item.track.duration_ms,
      playedAt: item.played_at,
      url: item.track.uri,
    },
    playedAt: item.played_at,
  };
}

export async function getRecentlyPlayed(
  provider: MusicProvider,
  limit = 50
): Promise<NormalizedPlayHistoryItem[]> {
  if (provider === "spotify") {
    const token = await getSpotifyAccessToken();
    if (!token) return [];
    const res = await getSpotifyRecentlyPlayed(token, limit);
    return (res.items ?? []).map(normalizeSpotifyItem);
  }
  return [];
}

export async function getTopTracksNormalized(
  provider: MusicProvider,
  timeRange?: TimeRange
): Promise<NormalizedTrack[]> {
  if (provider === "spotify") {
    const token = await getSpotifyAccessToken();
    if (!token) return [];
    const res = await getTopTracks(token, timeRange ?? "medium_term", 50);
    return res.items.map((t) => ({
      id: t.id,
      name: t.name,
      artists: t.artists.map((a) => ({ id: a.id, name: a.name })),
      album: {
        id: t.album.id,
        name: t.album.name,
        images: t.album.images ?? [],
      },
      durationMs: t.duration_ms,
      url: t.uri,
    }));
  }
  return [];
}

export async function getTopArtistsNormalized(
  provider: MusicProvider,
  timeRange?: TimeRange
): Promise<NormalizedArtist[]> {
  if (provider === "spotify") {
    const token = await getSpotifyAccessToken();
    if (!token) return [];
    const res = await getTopArtists(token, timeRange ?? "medium_term", 50);
    return res.items.map((a) => ({
      id: a.id,
      name: a.name,
      images: a.images,
      url: a.uri ? `https://open.spotify.com/artist/${a.id}` : undefined,
    }));
  }
  return [];
}
