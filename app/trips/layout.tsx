/**
 * Shared chrome for the trip experiences. Nova Scotia is currently the only
 * active trip and the site launches straight into it, so there is no
 * "All trips" back affordance — it would only reveal the unlinked Newfoundland
 * trip. Kept as a pass-through layout so future trips can reintroduce shared
 * navigation here without touching the individual pages.
 */
export default function TripsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
