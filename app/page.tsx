import { redirect } from "next/navigation";

/**
 * Nova Scotia is the only active trip, so the site launches straight into it
 * rather than a trip picker. The Newfoundland experience still exists at
 * /trips/newfoundland but is intentionally unlinked. (Root sends visitors to
 * the private planning view; the family use their direct /family link.)
 */
export default function Home() {
  redirect("/trips/nova-scotia");
}
