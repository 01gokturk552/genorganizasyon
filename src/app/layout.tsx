import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Gen Organizasyon", template: "%s | Gen Organizasyon" },
  description: "Gençlerin potansiyelini ortaya çıkaran, liderlik ve organizasyon becerilerini geliştiren platform.",
  keywords: ["gen organizasyon", "gençlik", "etkinlik", "liderlik", "organizasyon", "lise", "üniversite"],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Gen Organizasyon",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
