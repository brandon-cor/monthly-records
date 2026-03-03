const PEXELS_API = "https://api.pexels.com/v1";

const COVER_SIZE = 640;

const SEASON_QUERIES: Record<string, string> = {
  january: "winter snow landscape",
  february: "winter frost nature",
  march: "spring flowers bloom",
  april: "spring cherry blossom rain",
  may: "spring wildflowers meadow",
  june: "summer sunshine golden hour",
  july: "summer ocean sunset",
  august: "summer warm golden nature",
  september: "autumn leaves warm",
  october: "fall foliage nature",
  november: "autumn moody fog nature",
  december: "winter snow cozy",
};

interface PexelsPhoto {
  src: { original?: string; large2x?: string; large?: string; medium?: string };
}

interface PexelsResponse {
  photos?: PexelsPhoto[];
}

export async function fetchSeasonalImage(
  month: string
): Promise<string | null> {
  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) return null;

  const query = SEASON_QUERIES[month.toLowerCase()] ?? "nature aesthetic";

  const url = new URL(`${PEXELS_API}/search`);
  url.searchParams.set("query", query);
  url.searchParams.set("orientation", "square");
  url.searchParams.set("per_page", "15");

  const res = await fetch(url.toString(), {
    headers: { Authorization: apiKey },
  });

  if (!res.ok) return null;

  const data = (await res.json()) as PexelsResponse;
  const photos = data.photos;
  if (!photos?.length) return null;

  const photo = photos[Math.floor(Math.random() * photos.length)];
  const originalUrl = photo.src.original ?? photo.src.large2x ?? photo.src.large ?? photo.src.medium;
  if (!originalUrl) return null;

  return fetchCroppedBase64(originalUrl);
}

async function fetchCroppedBase64(
  originalUrl: string
): Promise<string | null> {
  const url = new URL(originalUrl);
  url.searchParams.set("auto", "compress");
  url.searchParams.set("cs", "tinysrgb");
  url.searchParams.set("w", String(COVER_SIZE));
  url.searchParams.set("h", String(COVER_SIZE));
  url.searchParams.set("fit", "crop");

  const res = await fetch(url.toString());
  if (!res.ok) return null;

  let buffer = Buffer.from(await res.arrayBuffer());

  if (buffer.byteLength <= 256_000) {
    return buffer.toString("base64");
  }

  const smaller = new URL(originalUrl);
  smaller.searchParams.set("auto", "compress");
  smaller.searchParams.set("cs", "tinysrgb");
  smaller.searchParams.set("w", "300");
  smaller.searchParams.set("h", "300");
  smaller.searchParams.set("fit", "crop");
  smaller.searchParams.set("q", "80");

  const retry = await fetch(smaller.toString());
  if (!retry.ok) return null;

  buffer = Buffer.from(await retry.arrayBuffer());
  if (buffer.byteLength > 256_000) return null;

  return buffer.toString("base64");
}
