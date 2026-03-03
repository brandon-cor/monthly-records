import Image from "next/image";
import Link from "next/link";
import type { NormalizedArtist, MusicProvider } from "@/lib/music";

interface ArtistLeaderboardProps {
  artists: NormalizedArtist[];
  provider: MusicProvider;
}

function artistHref(artist: NormalizedArtist, provider: MusicProvider): string {
  if (artist.url) return artist.url;
  return `https://open.spotify.com/artist/${artist.id}`;
}

export function ArtistLeaderboard({ artists, provider }: ArtistLeaderboardProps) {
  return (
    <div className="space-y-2">
      {artists.map((artist, index) => {
        const img = artist.images?.[0];
        return (
          <Link
            key={artist.id}
            href={artistHref(artist, provider)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-muted"
          >
            <span className="w-8 text-center font-bold text-muted-foreground">
              {index + 1}
            </span>
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-muted">
              {img ? (
                <Image
                  src={img.url}
                  alt={artist.name}
                  fill
                  sizes="56px"
                />
              ) : null}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{artist.name}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
