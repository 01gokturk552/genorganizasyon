import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "GEN — Gençlerin Erişim Noktası", template: "%s | GEN" },
  description: "GEN (Gençlerin Erişim Noktası) — Gençlerin potansiyelini ortaya çıkaran, liderlik ve organizasyon becerilerini geliştiren platform.",
  keywords: ["gen", "gençlerin erişim noktası", "gençlik", "etkinlik", "liderlik", "organizasyon", "lise", "üniversite"],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Gen Organizasyon",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${inter.variable} ${jakarta.variable}`}>
      <body>{children}</body>
    </html>
  );
}
