import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Search } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AramaPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = searchParams.q?.trim() || "";

  let news:   Awaited<ReturnType<typeof prisma.news.findMany>>  = [];
  let events: Awaited<ReturnType<typeof prisma.event.findMany>> = [];
  try {
    if (q) {
      [news, events] = await Promise.all([
        prisma.news.findMany({
          where: { isPublished: true, OR: [{ title: { contains: q } }, { summary: { contains: q } }] },
          take: 10,
        }),
        prisma.event.findMany({
          where: { isPublished: true, OR: [{ title: { contains: q } }, { description: { contains: q } }] },
          take: 10,
        }),
      ]);
    }
  } catch (e) { console.error("[Arama]", e); }

  const total = news.length + events.length;

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-[#1a3a6b] to-[#0e2247] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Arama</h1>
          {q && <p className="text-white/70">&ldquo;{q}&rdquo; için {total} sonuç bulundu</p>}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        {!q ? (
          <div className="text-center text-gray-400 py-16">
            <Search size={48} className="mx-auto mb-4 opacity-30" />
            <p>Arama yapmak için navbar&apos;daki arama ikonuna tıklayın.</p>
          </div>
        ) : total === 0 ? (
          <div className="text-center text-gray-400 py-16">
            <Search size={48} className="mx-auto mb-4 opacity-30" />
            <p>Sonuç bulunamadı.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {news.map((item) => (
              <div key={item.id} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-xs text-[#4e8ac4] font-semibold uppercase">Haber</span>
                <h3 className="font-bold text-[#1a3a6b] mt-1">{item.title}</h3>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">{item.summary}</p>
              </div>
            ))}
            {events.map((event) => (
              <div key={event.id} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-xs text-[#1a3a6b] font-semibold uppercase">Etkinlik — {event.category}</span>
                <h3 className="font-bold text-[#1a3a6b] mt-1">{event.title}</h3>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">{event.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
