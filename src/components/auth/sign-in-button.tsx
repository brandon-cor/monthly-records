"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

interface SignInButtonProps {
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  label?: string;
}

export function SignInButton({ size = "lg", className, label = "Sign in with Spotify" }: SignInButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignIn() {
    setIsLoading(true);
    await authClient.signIn.social({
      provider: "spotify",
      callbackURL: "/dashboard",
    });
  }

  return (
    <Button
      onClick={handleSignIn}
      disabled={isLoading}
      size={size}
      className={`cursor-pointer transition-all duration-150 active:scale-95 hover:brightness-110 hover:shadow-lg ${className ?? "bg-[#1DB954] hover:bg-[#1ed760] text-white"}`}
    >
      {isLoading ? "Connecting..." : label}
    </Button>
  );
}
