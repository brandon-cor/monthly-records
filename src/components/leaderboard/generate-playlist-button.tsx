"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, ExternalLink } from "lucide-react";

interface GeneratePlaylistButtonProps {
  monthLabel: string;
}

export function GeneratePlaylistButton({ monthLabel }: GeneratePlaylistButtonProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [playlistUrl, setPlaylistUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleClick() {
    setStatus("loading");
    setPlaylistUrl(null);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/spotify/create-playlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ timeRange: "short_term" }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Failed to create playlist");
        return;
      }

      setPlaylistUrl(data.url);
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Failed to create playlist");
    }
  }

  if (status === "success" && playlistUrl) {
    return (
      <div className="flex flex-col items-end gap-1">
        <Button
          asChild
          size="lg"
          className="min-w-[220px] bg-[#FACC15] hover:bg-[#FDE047] text-black border-0 shadow-md font-[family-name:var(--font-press-start)] text-[9px] tracking-wider cursor-pointer transition-all duration-150 active:scale-95 hover:brightness-110 hover:shadow-lg"
        >
          <a href={playlistUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" />
            OPEN PLAYLIST
          </a>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <Button
        onClick={handleClick}
        disabled={status === "loading"}
        size="lg"
        className="min-w-[220px] bg-[#1DB954] hover:bg-[#1ed760] text-white border-0 shadow-md font-[family-name:var(--font-press-start)] text-[9px] tracking-wider cursor-pointer transition-all duration-150 active:scale-95 hover:brightness-110 hover:shadow-lg"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span className="font-[family-name:var(--font-vt323)] text-base tracking-wider">Creating…</span>
          </>
        ) : (
          "PRESS YOUR VINYL"
        )}
      </Button>
      {status === "error" && errorMessage && (
        <p className="font-[family-name:var(--font-vt323)] text-base tracking-wide text-destructive">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
