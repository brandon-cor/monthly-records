import Image from "next/image";
import Link from "next/link";
import type { NormalizedTrack, MusicProvider } from "@/lib/music";

interface TrackLeaderboardProps {
  tracks: NormalizedTrack[];
  provider: MusicProvider;
}

function trackHref(track: NormalizedTrack, provider: MusicProvider): string {
  if (track.url) return track.url;
  return `https://open.spotify.com/track/${track.id}`;
}

export function TrackLeaderboard({ tracks, provider }: TrackLeaderboardProps) {
  return (
    <div className="space-y-2">
      {tracks.map((track, index) => {
        const img = track.album.images[0];
        const artistNames = track.artists.map((a) => a.name).join(", ");
        return (
          <Link
            key={track.id}
            href={trackHref(track, provider)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-muted"
          >
            <span className="w-8 text-center font-[family-name:var(--font-press-start)] text-[10px] text-muted-foreground">
              {index + 1}
            </span>
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-muted">
              {img ? (
                <Image
                  src={img.url}
                  alt={track.album.name}
                  fill
                  sizes="56px"
                />
              ) : null}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-[family-name:var(--font-vt323)] text-lg tracking-wide">
                {track.name}
              </p>
              <p className="truncate font-[family-name:var(--font-vt323)] text-base tracking-wide text-muted-foreground">
                {artistNames}
              </p>
            </div>
            <p className="hidden truncate font-[family-name:var(--font-vt323)] text-base tracking-wide text-muted-foreground sm:block">
              {track.album.name}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
