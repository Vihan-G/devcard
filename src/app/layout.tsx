import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://devcard.vercel.app"),
  title: {
    default: "devcard — Your GitHub, beautifully presented",
    template: "%s · devcard",
  },
  description:
    "Generate a shareable developer card from your GitHub profile. No login. No setup. Just type and download.",
  keywords: [
    "github",
    "developer card",
    "profile card",
    "github profile",
    "readme",
    "open source",
  ],
  authors: [{ name: "Vihan Goenka", url: "https://github.com/Vihan-G" }],
  creator: "Vihan Goenka",
  openGraph: {
    type: "website",
    title: "devcard — Your GitHub, beautifully presented",
    description:
      "Generate a shareable developer card from your GitHub profile. No login. No setup. Just type and download.",
    url: "/",
    siteName: "devcard",
  },
  twitter: {
    card: "summary_large_image",
    title: "devcard — Your GitHub, beautifully presented",
    description:
      "Generate a shareable developer card from any GitHub username. Free, no login, downloads as PNG.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#010409",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#010409] text-[#e6edf3]">
        {children}
      </body>
    </html>
  );
}
