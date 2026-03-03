import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Users, Clock } from "lucide-react";

interface StatsCardsProps {
  uniqueTracks: number;
  uniqueArtists: number;
  totalListeningTimeMs: number;
}

function formatDuration(ms: number): string {
  const totalMinutes = Math.floor(ms / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

export function StatsCards({
  uniqueTracks,
  uniqueArtists,
  totalListeningTimeMs,
}: StatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="font-[family-name:var(--font-press-start)] text-[9px] tracking-wider">
            UNIQUE TRACKS
          </CardTitle>
          <Music className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="font-[family-name:var(--font-vt323)] text-4xl tracking-wide">
            {uniqueTracks}
          </div>
          <p className="font-[family-name:var(--font-vt323)] text-sm tracking-wide text-muted-foreground">
            In your last 50 plays
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="font-[family-name:var(--font-press-start)] text-[9px] tracking-wider">
            UNIQUE ARTISTS
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="font-[family-name:var(--font-vt323)] text-4xl tracking-wide">
            {uniqueArtists}
          </div>
          <p className="font-[family-name:var(--font-vt323)] text-sm tracking-wide text-muted-foreground">
            In your last 50 plays
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="font-[family-name:var(--font-press-start)] text-[9px] tracking-wider">
            LISTENING TIME
          </CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="font-[family-name:var(--font-vt323)] text-4xl tracking-wide">
            {formatDuration(totalListeningTimeMs)}
          </div>
          <p className="font-[family-name:var(--font-vt323)] text-sm tracking-wide text-muted-foreground">
            From last 50 tracks
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
