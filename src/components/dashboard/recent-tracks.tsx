import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import type { NormalizedPlayHistoryItem, MusicProvider } from "@/lib/music";

interface RecentTracksProps {
  items: NormalizedPlayHistoryItem[];
  provider: MusicProvider;
}

function trackHref(item: NormalizedPlayHistoryItem, provider: MusicProvider): string {
  if (item.track.url) return item.track.url;
  return `https://open.spotify.com/track/${item.track.id}`;
}

export function RecentTracks({ items, provider }: RecentTracksProps) {
  const displayItems = items.slice(0, 10);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recently Played</CardTitle>
        <p className="text-sm text-muted-foreground">
          Your last {displayItems.length} tracks
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {displayItems.map((item, index) => {
            const img = item.track.album.images[0];
            const artistNames = item.track.artists.map((a) => a.name).join(", ");
            const href = trackHref(item, provider);
            return (
              <Link
                key={`${item.track.id}-${index}`}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-lg p-2 transition-colors hover:bg-muted"
              >
                <span className="w-6 text-sm font-medium text-muted-foreground">
                  {index + 1}
                </span>
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-muted">
                  {img ? (
                    <Image
                      src={img.url}
                      alt={item.track.album.name}
                      fill
                      sizes="48px"
                    />
                  ) : null}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{item.track.name}</p>
                  <p className="truncate text-sm text-muted-foreground">
                    {artistNames}
                  </p>
                </div>
                {item.playedAt ? (
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(item.playedAt), {
                      addSuffix: true,
                    })}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </div>
        <Link
          href="/dashboard?tab=history"
          className="mt-4 block text-center text-sm font-medium text-primary hover:underline"
        >
          View all 50 tracks →
        </Link>
      </CardContent>
    </Card>
  );
}
