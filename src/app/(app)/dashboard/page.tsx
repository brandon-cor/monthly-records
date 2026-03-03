import { redirect } from "next/navigation";
import {
  getActiveMusicProvider,
  getRecentlyPlayed,
  getTopTracksNormalized,
} from "@/lib/music";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { TrackLeaderboard } from "@/components/leaderboard/track-leaderboard";
import { GeneratePlaylistButton } from "@/components/leaderboard/generate-playlist-button";

function getPreviousMonth(): { label: string; month: string; year: number } {
  const now = new Date();
  const prev = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const month = prev.toLocaleString("en-US", { month: "long" });
  return {
    label: `${month} ${prev.getFullYear()}`,
    month,
    year: prev.getFullYear(),
  };
}

export default async function DashboardPage() {
  const provider = await getActiveMusicProvider();
  if (!provider) {
    redirect("/");
  }

  const prevMonth = getPreviousMonth();

  const [items, topTracks] = await Promise.all([
    getRecentlyPlayed(provider, 50),
    getTopTracksNormalized(provider, "short_term"),
  ]);

  const uniqueTrackIds = new Set(items.map((i) => i.track.id));
  const uniqueArtistIds = new Set(
    items.flatMap((i) => i.track.artists.map((a) => a.id))
  );
  const totalListeningTimeMs = items.reduce(
    (sum, i) => sum + (i.track.durationMs ?? 0),
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-[family-name:var(--font-press-start)] text-xl tracking-wider sm:text-2xl md:text-3xl">
            {prevMonth.label.toUpperCase()}
          </h1>
          <p className="font-[family-name:var(--font-vt323)] text-lg tracking-wider text-muted-foreground sm:text-xl">
            Your top tracks from last month
          </p>
        </div>
        <GeneratePlaylistButton monthLabel={prevMonth.label} />
      </div>

      <StatsCards
        uniqueTracks={uniqueTrackIds.size}
        uniqueArtists={uniqueArtistIds.size}
        totalListeningTimeMs={totalListeningTimeMs}
      />

      <TrackLeaderboard tracks={topTracks} provider={provider} />
    </div>
  );
}
