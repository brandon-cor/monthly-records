import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function getSpotifyAccessToken(): Promise<string | null> {
  const reqHeaders = await headers();
  const session = await auth.api.getSession({
    headers: reqHeaders,
  });

  if (!session?.user?.id) {
    return null;
  }

  const betterAuthResult = await auth.api.getAccessToken({
    body: { providerId: "spotify", userId: session.user.id },
    headers: reqHeaders,
  });

  return betterAuthResult.accessToken ?? null;
}
