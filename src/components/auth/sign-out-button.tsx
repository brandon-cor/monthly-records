"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  async function handleSignOut() {
    await authClient.signOut();
    window.location.href = "/";
  }

  return (
    <Button variant="outline" onClick={handleSignOut}>
      Sign out
    </Button>
  );
}
