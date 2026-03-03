import Link from "next/link";
import { SignInButton } from "@/components/auth/sign-in-button";
import { VinylRecord } from "@/components/landing/vinyl-record";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Button } from "@/components/ui/button";

export default async function MarketingPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0a] text-white">
      {/* Record store background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.12]"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1587731556938-38755b4803a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW55bCUyMHJlY29yZCUyMHN0b3JlJTIwc2hlbHZlcyUyMHJldHJvfGVufDF8fHx8MTc3MjUxNjgzN3ww&ixlib=rb-4.1.0&q=80&w=1080')" }}
      />

      {/* Record crate grid — faint album squares */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(255,255,255,0.08) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.08) 75%, transparent 75%)",
          backgroundSize: "120px 120px",
        }}
      />

      {/* Pixel grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "4px 4px",
        }}
      />

      {/* Scanlines */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
        }}
      />

      {/* Noise grain */}
      <div className="pointer-events-none absolute inset-0 z-10 opacity-[0.15] mix-blend-overlay bg-noise" />

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.7)_100%)]" />

      {/* Header */}
      <header className="relative z-20 flex items-center justify-between px-6 py-5 sm:px-10">
        <Link href="/" className="font-[family-name:var(--font-press-start)] text-[10px] sm:text-xs tracking-widest">
          <span className="text-white">MONTHLY</span> <span className="text-[#1DB954]">RECORDS</span>
        </Link>
        <nav className="flex items-center gap-6">
          <a href="#how-it-works" className="font-[family-name:var(--font-press-start)] text-[8px] sm:text-[9px] tracking-wider text-white/50 hover:text-white/80 transition-colors uppercase">
            About
          </a>
          {session?.user ? (
            <Link
              href="/dashboard"
              className="font-[family-name:var(--font-press-start)] text-[8px] sm:text-[9px] tracking-wider text-[#1DB954] hover:text-[#1ed760] transition-colors uppercase"
            >
              Dashboard
            </Link>
          ) : (
            <SignInButton
              size="sm"
              label="SIGN UP"
              className="font-[family-name:var(--font-press-start)] text-[8px] sm:text-[9px] tracking-wider bg-[#1DB954] hover:bg-[#1ed760] text-black px-4 py-2 uppercase"
            />
          )}
        </nav>
      </header>

      {/* Hero */}
      <main className="relative z-20 flex flex-col items-center justify-center px-6 pt-8 pb-20 sm:pt-16 sm:pb-28">
        {/* Badge */}
        <div className="mb-6 border border-[#FACC15]/30 bg-[#FACC15]/5 px-4 py-1.5">
          <span className="font-[family-name:var(--font-press-start)] text-[8px] tracking-[0.2em] text-[#FACC15]">
            . EARLY ACCESS .
          </span>
        </div>

        {/* Title */}
        <h1 className="mb-4 text-center font-[family-name:var(--font-press-start)] text-3xl leading-tight tracking-wide sm:text-4xl md:text-5xl lg:text-6xl">
          <span className="text-white">MONTHLY</span>
          <br />
          <span className="text-[#1DB954]">RECORDS</span>
        </h1>

        {/* Subtitle */}
        <p className="mb-14 max-w-md text-center font-[family-name:var(--font-vt323)] text-lg tracking-wider text-white/60 sm:text-xl md:text-2xl">
          Your Spotify listening history, pressed
          <br />
          into a custom record every month.
        </p>

        {/* Vinyl */}
        <VinylRecord />

        {/* CTA */}
        <div className="mt-24 flex flex-col items-center gap-4 sm:flex-row">
          {session?.user ? (
            <Button asChild size="lg" className="bg-[#1DB954] hover:bg-[#1ed760] text-black font-[family-name:var(--font-press-start)] text-[10px] tracking-wider px-8 py-6">
              <Link href="/dashboard">ENTER THE STORE</Link>
            </Button>
          ) : (
            <Button asChild size="lg" className="bg-[#FACC15] hover:bg-[#FDE047] text-black font-[family-name:var(--font-press-start)] text-[10px] tracking-wider px-8 py-6">
              <a href="mailto:15brandon51@gmail.com?subject=Monthly%20Records%20%E2%80%94%20Waitlist%20Request&body=Hey%20Brandon%2C%0A%0AI%E2%80%99d%20love%20to%20try%20out%20Monthly%20Records!%20Could%20you%20add%20me%20to%20the%20whitelist%3F%0A%0AHere%20are%20my%20details%3A%0A%0AFull%20name%3A%20%0ASpotify%20email%3A%20%0A%0AThanks!">
                JOIN THE WAITLIST
              </a>
            </Button>
          )}
        </div>
      </main>

      {/* Scrolling ticker */}
      <div className="relative z-20 overflow-hidden border-y border-[#1DB954]/20 bg-[#1DB954]/5 py-2.5">
        <div className="animate-ticker flex whitespace-nowrap">
          {Array.from({ length: 3 }, (_, i) => (
            <span key={i} className="mx-8 font-[family-name:var(--font-press-start)] text-[9px] tracking-[0.15em] text-[#1DB954]/70 sm:text-[10px]">
              NOW SPINNING! YOUR MONTHLY MIX // ; SPOTIFY LISTENING HISTORY // . PRESSED INTO VINYL FORMAT // ; ONE MONTH. ONE RECORD. // . YOUR MUSIC. YOUR STORY. //
            </span>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <section id="how-it-works" className="relative z-20 bg-black/40 px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-4 text-center font-[family-name:var(--font-press-start)] text-base tracking-[0.2em] text-white sm:text-lg">
            HOW IT WORKS
          </h2>
          <p className="mb-14 text-center font-[family-name:var(--font-vt323)] text-lg tracking-wider text-white/40 sm:text-xl">
            Three steps to your monthly record.
          </p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {/* Card 1 */}
            <div className="group relative border border-[#1DB954]/20 bg-[#0a0f0a] p-8 transition-all hover:border-[#1DB954]/40 hover:bg-[#0a120a]">
              {/* Corner dots */}
              <div className="absolute left-1.5 top-1.5 h-1.5 w-1.5 bg-[#1DB954]/50" />
              <div className="absolute right-1.5 top-1.5 h-1.5 w-1.5 bg-[#1DB954]/50" />
              <div className="absolute bottom-1.5 left-1.5 h-1.5 w-1.5 bg-[#1DB954]/50" />
              <div className="absolute bottom-1.5 right-1.5 h-1.5 w-1.5 bg-[#1DB954]/50" />

              <div className="mb-5 text-2xl">♪</div>
              <div className="mb-2 font-[family-name:var(--font-press-start)] text-[8px] tracking-[0.15em] text-[#1DB954]/60">
                STEP 01
              </div>
              <h3 className="mb-4 font-[family-name:var(--font-press-start)] text-[11px] leading-relaxed tracking-wider text-white/90">
                CONNECT SPOTIFY
              </h3>
              <p className="font-[family-name:var(--font-vt323)] text-base leading-relaxed tracking-wider text-white/40 sm:text-lg">
                Link your Spotify account so we can access your listening history from the past month.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group relative border border-[#1DB954]/20 bg-[#0a0f0a] p-8 transition-all hover:border-[#1DB954]/40 hover:bg-[#0a120a]">
              <div className="absolute left-1.5 top-1.5 h-1.5 w-1.5 bg-[#1DB954]/50" />
              <div className="absolute right-1.5 top-1.5 h-1.5 w-1.5 bg-[#1DB954]/50" />
              <div className="absolute bottom-1.5 left-1.5 h-1.5 w-1.5 bg-[#1DB954]/50" />
              <div className="absolute bottom-1.5 right-1.5 h-1.5 w-1.5 bg-[#1DB954]/50" />

              <div className="mb-5 text-2xl">◉</div>
              <div className="mb-2 font-[family-name:var(--font-press-start)] text-[8px] tracking-[0.15em] text-[#1DB954]/60">
                STEP 02
              </div>
              <h3 className="mb-4 font-[family-name:var(--font-press-start)] text-[11px] leading-relaxed tracking-wider text-white/90">
                WE PRESS YOUR RECORD
              </h3>
              <p className="font-[family-name:var(--font-vt323)] text-base leading-relaxed tracking-wider text-white/40 sm:text-lg">
                Based on your top 50 most listened to tracks from the past 4 weeks, we press your history into a custom record.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group relative border border-[#1DB954]/20 bg-[#0a0f0a] p-8 transition-all hover:border-[#1DB954]/40 hover:bg-[#0a120a]">
              <div className="absolute left-1.5 top-1.5 h-1.5 w-1.5 bg-[#1DB954]/50" />
              <div className="absolute right-1.5 top-1.5 h-1.5 w-1.5 bg-[#1DB954]/50" />
              <div className="absolute bottom-1.5 left-1.5 h-1.5 w-1.5 bg-[#1DB954]/50" />
              <div className="absolute bottom-1.5 right-1.5 h-1.5 w-1.5 bg-[#1DB954]/50" />

              <div className="mb-5 text-2xl">►</div>
              <div className="mb-2 font-[family-name:var(--font-press-start)] text-[8px] tracking-[0.15em] text-[#1DB954]/60">
                STEP 03
              </div>
              <h3 className="mb-4 font-[family-name:var(--font-press-start)] text-[11px] leading-relaxed tracking-wider text-white/90">
                PLAY YOUR VINYL
              </h3>
              <p className="font-[family-name:var(--font-vt323)] text-base leading-relaxed tracking-wider text-white/40 sm:text-lg">
                Click on the link which redirects you to your curated playlist pressed just for you, and repeat the process every month.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 border-t border-white/5 bg-black/40 px-6 py-8 sm:px-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-3">
          <span className="font-[family-name:var(--font-press-start)] text-[7px] tracking-wider text-white/20">
            &copy; {new Date().getFullYear()} MONTHLY RECORDS. ALL RIGHTS RESERVED.
          </span>
          <span className="font-[family-name:var(--font-press-start)] text-[7px] tracking-[0.2em] text-white/10">
            YOUR MUSIC. YOUR STORY. YOUR RECORD.
          </span>
        </div>
      </footer>
    </div>
  );
}
