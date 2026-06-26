import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { Calendar, MapPin, Clock, Users, Trophy, Star } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Neler Yapıyoruz?",
  description: "Gen Organizasyon etkinlikleri, haberleri ve istatistikleri.",
};

export const dynamic = "force-dynamic";

const iconMap: Record<string, React.ReactNode> = {
  users:    <Users size={20} />,
  calendar: <Calendar size={20} />,
  trophy:   <Trophy size={20} />,
  star:     <Star size={20} />,
};

export default async function NelerYapiyoruzPage() {
  let events: Awaited<ReturnType<typeof prisma.event.findMany>> = [];
  let stats:  Awaited<ReturnType<typeof prisma.stat.findMany>>  = [];
  let news:   Awaited<ReturnType<typeof prisma.news.findMany>>  = [];
  try {
    [events, stats, news] = await Promise.all([
      prisma.event.findMany({ where: { isPublished: true }, orderBy: [{ category: "asc" }, { order: "asc" }] }),
      prisma.stat.findMany(),
      prisma.news.findMany({ where: { isPublished: true }, orderBy: { publishedAt: "desc" }, take: 6 }),
    ]);
  } catch (e) { console.error("[NelerYapiyoruz]", e); }

  const lise       = events.filter((e) => e.category === "lise");
  const universite = events.filter((e) => e.category === "universite");

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-[#0e2247] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#1a3a6b] opacity-50 blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-20">
          <span className="section-label mb-4">Faaliyetler</span>
          <h1 className="text-5xl font-black mt-3 tracking-tight">Neler Yapıyoruz?</h1>
          <p className="text-white/60 text-lg mt-4 max-w-xl leading-relaxed">
            Organizasyonlarımız, etkinliklerimiz ve haberlerimizle sizinle buradayız.
          </p>
        </div>
      </div>

      {/* Stats */}
      {stats.length > 0 && (
        <section className="py-14 bg-[#0e2247] border-t border-white/8">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((s) => (
                <div key={s.id} className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 hover:border-[#4e8ac4]/40 transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#4e8ac4]/15 text-[#4e8ac4] mb-3 group-hover:scale-110 transition-transform">
                    {iconMap[s.icon] ?? <Star size={20} />}
                  </div>
                  <p className="text-3xl font-black text-white mb-1">{s.value}</p>
                  <p className="text-white/50 text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Etkinlikler */}
      <section className="py-20 bg-[#f4f6f9]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="mb-12">
            <span className="section-label mb-3">Etkinlikler</span>
            <h2 className="text-4xl font-black text-[#0e2247] mt-2">Etkinliklerimiz</h2>
          </div>

          {events.length === 0 ? (
            <div className="bg-white rounded-2xl p-16 text-center text-gray-400 border border-[#e8ecf2]">Henüz etkinlik eklenmedi.</div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Lise */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-1 h-6 rounded-full bg-[#4e8ac4]" />
                  <h3 className="text-lg font-black text-[#0e2247]">Lise Etkinlikleri</h3>
                  <span className="ml-auto text-xs font-semibold text-[#1a3a6b] bg-[#1a3a6b]/8 px-2.5 py-1 rounded-full">{lise.length} etkinlik</span>
                </div>
                {lise.length === 0 ? (
                  <div className="bg-white rounded-2xl p-10 text-center text-gray-400 border border-[#e8ecf2] text-sm">Yakında etkinlik eklenecek</div>
                ) : (
                  <div className="space-y-4">
                    {lise.map((ev) => (
                      <div key={ev.id} className="card-hover group flex gap-4 bg-white border border-[#e8ecf2] rounded-2xl p-4">
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-[#f4f6f9]">
                          {ev.imageUrl
                            ? <Image src={ev.imageUrl} alt={ev.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                            : <div className="absolute inset-0 flex items-center justify-center"><Calendar size={24} className="text-gray-200" /></div>
                          }
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-black text-[#0e2247] text-sm mb-1 line-clamp-2">{ev.title}</h4>
                          <p className="text-gray-400 text-xs line-clamp-2 mb-2">{ev.description}</p>
                          <div className="flex flex-wrap gap-3">
                            {ev.date && <span className="flex items-center gap-1 text-xs text-gray-400"><Calendar size={11} />{formatDate(ev.date)}</span>}
                            {ev.location && <span className="flex items-center gap-1 text-xs text-gray-400"><MapPin size={11} />{ev.location}</span>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Üniversite */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-1 h-6 rounded-full bg-[#1a3a6b]" />
                  <h3 className="text-lg font-black text-[#0e2247]">Üniversite Etkinlikleri</h3>
                  <span className="ml-auto text-xs font-semibold text-[#1a3a6b] bg-[#1a3a6b]/8 px-2.5 py-1 rounded-full">{universite.length} etkinlik</span>
                </div>
                {universite.length === 0 ? (
                  <div className="bg-white rounded-2xl p-10 text-center text-gray-400 border border-[#e8ecf2] text-sm">Yakında etkinlik eklenecek</div>
                ) : (
                  <div className="space-y-4">
                    {universite.map((ev) => (
                      <div key={ev.id} className="card-hover group flex gap-4 bg-white border border-[#e8ecf2] rounded-2xl p-4">
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-[#f4f6f9]">
                          {ev.imageUrl
                            ? <Image src={ev.imageUrl} alt={ev.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                            : <div className="absolute inset-0 flex items-center justify-center"><Calendar size={24} className="text-gray-200" /></div>
                          }
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-black text-[#0e2247] text-sm mb-1 line-clamp-2">{ev.title}</h4>
                          <p className="text-gray-400 text-xs line-clamp-2 mb-2">{ev.description}</p>
                          <div className="flex flex-wrap gap-3">
                            {ev.date && <span className="flex items-center gap-1 text-xs text-gray-400"><Calendar size={11} />{formatDate(ev.date)}</span>}
                            {ev.location && <span className="flex items-center gap-1 text-xs text-gray-400"><MapPin size={11} />{ev.location}</span>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Haberler */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="mb-12">
            <span className="section-label mb-3">Güncel</span>
            <h2 className="text-4xl font-black text-[#0e2247] mt-2">Son Haberler</h2>
          </div>
          {news.length === 0 ? (
            <div className="bg-[#f4f6f9] rounded-2xl p-16 text-center text-gray-400">Henüz haber eklenmedi.</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((item) => (
                <article key={item.id} className="card-hover bg-white border border-[#e8ecf2] rounded-2xl overflow-hidden group flex flex-col">
                  <div className="relative h-44 bg-[#f4f6f9] overflow-hidden">
                    {item.imageUrl ? (
                      <Image src={item.imageUrl} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a6b]/5 to-[#4e8ac4]/10" />
                    )}
                    <span className="absolute top-3 left-3 bg-[#4e8ac4] text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-black text-[#0e2247] mb-2 line-clamp-2 leading-tight">{item.title}</h3>
                    <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-1">{item.summary}</p>
                    {item.publishedAt && (
                      <div className="flex items-center gap-1.5 text-gray-400 text-xs border-t border-[#f4f6f9] pt-3">
                        <Clock size={11} /> {formatDate(item.publishedAt)}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
