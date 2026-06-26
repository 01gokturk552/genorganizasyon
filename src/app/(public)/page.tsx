import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import HeroSection from "@/components/home/HeroSection";
import EventsSection from "@/components/home/EventsSection";
import NewsSection from "@/components/home/NewsSection";
import StatsSection from "@/components/home/StatsSection";

export const metadata: Metadata = {
  title: "Gen Organizasyon — Gençlerin Gücünü Organizasyona Dönüştürüyoruz",
  description: "Lise ve üniversite öğrencilerini bir araya getirerek liderlik, organizasyon ve ekip çalışması becerilerini geliştiriyoruz.",
};

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let events: Awaited<ReturnType<typeof prisma.event.findMany>> = [];
  let news: Awaited<ReturnType<typeof prisma.news.findMany>> = [];
  let stats: Awaited<ReturnType<typeof prisma.stat.findMany>> = [];
  let settings: Awaited<ReturnType<typeof prisma.setting.findMany>> = [];

  try {
    [events, news, stats, settings] = await Promise.all([
      prisma.event.findMany({
        where: { isPublished: true },
        orderBy: { order: "asc" },
        take: 6,
      }),
      prisma.news.findMany({
        where: { isPublished: true },
        orderBy: { publishedAt: "desc" },
        take: 3,
      }),
      prisma.stat.findMany(),
      prisma.setting.findMany(),
    ]);
  } catch (err) {
    console.error("[HomePage] DB bağlantı hatası:", err);
  }

  const settingsMap = Object.fromEntries(settings.map((s) => [s.key, s.value]));

  return (
    <>
      <HeroSection settings={settingsMap} />
      <EventsSection events={events} />
      <StatsSection stats={stats} />
      <NewsSection news={news} />
    </>
  );
}
