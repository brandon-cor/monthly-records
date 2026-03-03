"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow, format } from "date-fns";
import { Download } from "lucide-react";
import type { NormalizedPlayHistoryItem, MusicProvider } from "@/lib/music";

interface HistoryListProps {
  items: NormalizedPlayHistoryItem[];
  provider: MusicProvider;
}

function trackHref(item: NormalizedPlayHistoryItem, provider: MusicProvider): string {
  if (item.track.url) return item.track.url;
  return `https://open.spotify.com/track/${item.track.id}`;
}

function exportToCsv(items: NormalizedPlayHistoryItem[], provider: MusicProvider) {
  const headers = ["Track", "Artist", "Album", "Played At"];
  const rows = items.map((item) => [
    `"${item.track.name.replace(/"/g, '""')}"`,
    `"${item.track.artists.map((a) => a.name).join(", ").replace(/"/g, '""')}"`,
    `"${item.track.album.name.replace(/"/g, '""')}"`,
    item.playedAt ? format(new Date(item.playedAt), "yyyy-MM-dd HH:mm:ss") : "",
  ]);
  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${provider}-history-${format(new Date(), "yyyy-MM-dd")}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function HistoryList({ items, provider }: HistoryListProps) {
  const [search, setSearch] = useState("");

  const filteredItems = useMemo(() => {
    if (!search.trim()) return items;
    const q = search.toLowerCase().trim();
    return items.filter(
      (item) =>
        item.track.name.toLowerCase().includes(q) ||
        item.track.artists.some((a) => a.name.toLowerCase().includes(q)) ||
        item.track.album.name.toLowerCase().includes(q)
    );
  }, [items, search]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Input
          placeholder="Search tracks, artists, or albums..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => exportToCsv(filteredItems, provider)}
          className="w-fit"
        >
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>
      <div className="space-y-2">
        {filteredItems.length === 0 ? (
          <p className="py-8 text-center text-muted-foreground">
            {search ? "No tracks match your search." : "No recent tracks."}
          </p>
        ) : (
          filteredItems.map((item, idx) => {
            const img = item.track.album.images[0];
            const artistNames = item.track.artists.map((a) => a.name).join(", ");
            return (
              <Link
                key={`${item.track.id}-${idx}`}
                href={trackHref(item, provider)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-muted"
              >
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
                    {artistNames} · {item.track.album.name}
                  </p>
                </div>
                {item.playedAt ? (
                  <span className="shrink-0 text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(item.playedAt), {
                      addSuffix: true,
                    })}
                  </span>
                ) : null}
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
