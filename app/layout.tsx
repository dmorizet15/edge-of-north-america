import type { Metadata, Viewport } from "next";
import { displaySerif, bodySans } from "@/lib/fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Edge of North America",
  description:
    "A journey from darkness to first light — a Newfoundland expedition, told as an experience.",
  openGraph: {
    title: "Edge of North America",
    description:
      "A journey from darkness to first light — a Newfoundland expedition.",
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
