import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.next();
  }

  const host = request.headers.get("host") ?? "";
  const url = request.nextUrl.clone();

  if (host.startsWith("localhost:")) {
    url.host = `127.0.0.1:${host.split(":")[1] ?? "3000"}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
