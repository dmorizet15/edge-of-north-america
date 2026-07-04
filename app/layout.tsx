import type { Metadata, Viewport } from "next";
import { displaySerif, bodySans } from "@/lib/fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "Trips — Two Roads North",
    template: "%s",
  },
  description:
    "A private travel portal: choose a journey. Newfoundland — the dramatic expedition to the easternmost light; or Nova Scotia — the warmer ocean road home by ferry.",
  openGraph: {
    title: "Trips — Two Roads North",
    description:
      "Choose a journey: Newfoundland, the dramatic expedition; or Nova Scotia, the warmer ocean road.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#101317",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${displaySerif.variable} ${bodySans.variable}`}
    >
      <body className="bg-nearblack font-sans text-paper antialiased">
        {children}
      </body>
    </html>
  );
}
