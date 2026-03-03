import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "./db";
import * as schema from "./db/schema";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: [
    process.env.BETTER_AUTH_URL,
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://172.20.10.3:3000",
  ].filter((x): x is string => Boolean(x)),
  database: drizzleAdapter(db, { provider: "pg", schema }),
  socialProviders: {
    spotify: {
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      scope: [
        "user-read-recently-played",
        "user-top-read",
        "user-read-currently-playing",
        "user-read-email",
        "user-read-private",
        "playlist-modify-public",
        "playlist-modify-private",
        "ugc-image-upload",
      ],
    },
  },
  plugins: [nextCookies()],
});
