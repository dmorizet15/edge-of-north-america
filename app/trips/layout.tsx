import TripNav from "@/components/trip/TripNav";

/**
 * Shared chrome for every trip experience — just the quiet "All trips" back
 * affordance, layered above each trip's own full-bleed composition. Adding it
 * here (rather than inside any trip page) keeps the individual experiences
 * untouched and gives future trips the same navigation for free.
 */
export default function TripsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TripNav />
      {children}
    </>
  );
}
