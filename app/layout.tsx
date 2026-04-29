import type { Metadata } from "next";
import { Kalam, Patrick_Hand } from "next/font/google";
import "./globals.css";

const kalam = Kalam({
  variable: "--font-kalam",
  subsets: ["latin"],
  weight: ["700"],
});

const patrickHand = Patrick_Hand({
  variable: "--font-patrick-hand",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Zehunt | Builder Reputation and Growth System",
  description:
    "Zehunt tracks builder execution over time, converts activity into measurable reputation, and unlocks hiring, collaboration, and funding opportunities.",
  keywords: [
    "Zehunt",
    "builder reputation",
    "build in public",
    "startup builders",
    "execution graph",
    "opportunity engine",
  ],
  openGraph: {
    title: "Zehunt | Builder Reputation and Growth System",
    description:
      "A builder intelligence graph where execution becomes measurable reputation and reputation unlocks real opportunities.",
    siteName: "Zehunt",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zehunt | Builder Reputation and Growth System",
    description:
      "Track builder execution, grow reputation, and unlock hiring, collaboration, and funding opportunities.",
  },
  icons: {
    icon: [
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${kalam.variable} ${patrickHand.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-foreground">{children}</body>
    </html>
  );
}
