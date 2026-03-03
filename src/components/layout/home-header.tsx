"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings } from "lucide-react";

interface HomeHeaderProps {
  isSignedIn?: boolean;
  userName?: string;
}

export function HomeHeader({ isSignedIn = false, userName }: HomeHeaderProps) {
  async function handleSignOut() {
    await authClient.signOut();
    window.location.href = "/";
  }

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 md:px-6">
        <Link href="/" className="font-semibold">
          Monthly Records
        </Link>
        {isSignedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                {userName ?? "Account"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut}>
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex gap-2">
            <Button asChild size="sm" className="bg-[#1DB954] hover:bg-[#1ed760] text-white">
              <Link href="/api/auth/signin">Sign in with Spotify</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
