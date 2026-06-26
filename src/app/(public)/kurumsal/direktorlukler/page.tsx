import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Direktörlükler",
  description: "Gen Organizasyon direktörlük birimleri, görev alanları ve hedefleri.",
};

export const dynamic = "force-dynamic";

export default async function DirektorluklerPage() {
  let directorates: Awaited<ReturnType<typeof prisma.directorate.findMany>> = [];
  try {
    directorates = await prisma.directorate.findMany({ orderBy: { order: "asc" } });
  } catch (e) { console.error("[Direktorlukler]", e); }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-[#0e2247] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#1a3a6b] opacity-50 blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-20">
          <span className="section-label mb-4">Kurumsal</span>
          <h1 className="text-5xl font-black mt-3 tracking-tight">Direktörlükler</h1>
          <p className="text-white/60 text-lg mt-4 max-w-xl leading-relaxed">
            Organizasyonumuzu yöneten direktörlük birimleri ve sorumluluk alanları.
          </p>
        </div>
      </div>

      <section className="bg-[#f4f6f9] min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-20">
          {directorates.length === 0 ? (
            <div className="text-center py-20 text-gray-400">Henüz direktörlük bilgisi eklenmedi.</div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {directorates.map((d, i) => (
                <div key={d.id} className="card-hover bg-white rounded-2xl overflow-hidden border border-[#e8ecf2] group">
                  {d.imageUrl && (
                    <div className="relative h-52 overflow-hidden">
                      <Image src={d.imageUrl} alt={d.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0e2247]/60 to-transparent" />
                    </div>
                  )}
                  <div className="p-7">
                    <div className="flex items-start gap-4 mb-5">
                      <div className="w-10 h-10 bg-[#4e8ac4] text-white rounded-xl flex items-center justify-center font-black text-sm shrink-0 mt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div>
                        <h2 className="text-xl font-black text-[#0e2247] leading-tight">{d.name}</h2>
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-5">{d.description}</p>
                    {d.goals && (
                      <div className="bg-[#f4f6f9] rounded-xl p-5">
                        <h3 className="font-bold text-[#1a3a6b] text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                          <CheckCircle2 size={14} className="text-[#4e8ac4]" /> Hedefler
                        </h3>
                        <p className="text-gray-500 text-sm whitespace-pre-line leading-relaxed">{d.goals}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
