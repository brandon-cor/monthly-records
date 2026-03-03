"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { GradientAvatar, getStoredAvatarId } from "@/components/settings/avatar-picker";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings, LogOut } from "lucide-react";

interface NavbarProps {
  user: { name: string };
}

export function Navbar({ user }: NavbarProps) {
  const [avatarId, setAvatarId] = useState("lava-sunset");

  const syncAvatar = useCallback(() => {
    setAvatarId(getStoredAvatarId());
  }, []);

  useEffect(() => {
    syncAvatar();
    window.addEventListener("storage", syncAvatar);
    window.addEventListener("avatar-changed", syncAvatar);
    return () => {
      window.removeEventListener("storage", syncAvatar);
      window.removeEventListener("avatar-changed", syncAvatar);
    };
  }, [syncAvatar]);

  async function handleSignOut() {
    await authClient.signOut();
    window.location.href = "/";
  }

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-background px-4 md:px-6">
      <Link href="/" className="font-[family-name:var(--font-press-start)] text-[10px] sm:text-xs tracking-widest">
        <span className="text-white">MONTHLY</span> <span className="text-[#1DB954]">RECORDS</span>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0 cursor-pointer transition-all duration-150 active:scale-90 hover:scale-110 hover:shadow-lg">
            <GradientAvatar avatarId={avatarId} size={36} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="px-2 py-1.5">
            <p className="text-sm font-medium font-[family-name:var(--font-vt323)] text-base tracking-wide">{user.name}</p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/settings" className="flex items-center gap-2 font-[family-name:var(--font-vt323)] text-base tracking-wide">
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-2 font-[family-name:var(--font-vt323)] text-base tracking-wide">
            <LogOut className="h-4 w-4" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
