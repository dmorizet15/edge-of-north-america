import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nova Scotia — Private",
  robots: { index: false, follow: false },
};

/**
 * Passcode entry for the private Nova Scotia planning view. A native form POST
 * (no client JS) so it works from any phone. The API route checks the passcode
 * and sets the signed cookie, then the middleware lets you through.
 */
export default async function Unlock({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const sp = await searchParams;
  const next = sp.next && sp.next.startsWith("/trips/nova-scotia") ? sp.next : "/trips/nova-scotia";
  const error = sp.error === "1";

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-nearblack px-6 py-24 text-center">
      <div className="w-full max-w-sm">
        <span className="eyebrow text-amber">Private</span>
        <h1 className="mt-5 font-serif text-[clamp(1.9rem,6vw,2.8rem)] font-normal leading-tight tracking-title text-paper">
          Nova Scotia
        </h1>
        <p className="mt-4 font-sans text-[0.98rem] font-light leading-relaxed text-paper/70">
          The planning view is passcode-protected. Looking for the trip to
          follow along?{" "}
          <Link
            href="/trips/nova-scotia/family"
            className="text-amber underline decoration-amber/40 underline-offset-2 hover:decoration-amber"
          >
            Open the family view
          </Link>
          .
        </p>

        <form
          action="/api/nova-scotia/unlock"
          method="post"
          className="mt-9 flex flex-col gap-3"
        >
          <input type="hidden" name="next" value={next} />
          <input
            type="password"
            name="passcode"
            inputMode="text"
            autoComplete="current-password"
            autoFocus
            required
            placeholder="Passcode"
            aria-label="Passcode"
            className="w-full rounded-sm border border-paper/20 bg-black/30 px-4 py-3.5 text-center font-sans text-[1.05rem] text-paper placeholder:text-paper/40 focus:border-amber focus:outline-none"
          />
          {error && (
            <p className="font-sans text-[0.88rem] font-light text-amber">
              That passcode didn&rsquo;t work. Try again.
            </p>
          )}
          <button
            type="submit"
            className="mt-1 w-full rounded-sm bg-amber px-5 py-3.5 font-sans text-[0.98rem] font-semibold tracking-wide text-nearblack transition-all duration-200 hover:brightness-110 active:scale-[0.99]"
          >
            Enter
          </button>
        </form>
      </div>
    </main>
  );
}
