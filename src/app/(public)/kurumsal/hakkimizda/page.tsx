import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Eye, Target, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: "Gen Organizasyon'un vizyonu, misyonu ve hikayesi hakkında bilgi edinin.",
};

export const dynamic = "force-dynamic";

export default async function HakkimizdaPage() {
  const about = await prisma.about.findFirst();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-[#0e2247] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#1a3a6b] opacity-50 blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-20">
          <span className="section-label mb-4">Kurumsal</span>
          <h1 className="text-5xl font-black mt-3 tracking-tight">Hakkımızda</h1>
          <p className="text-white/60 text-lg mt-4 max-w-xl leading-relaxed">
            Gen Organizasyon'un vizyonu, misyonu ve hikayesini keşfedin.
          </p>
        </div>
      </div>

      {!about ? (
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-24 text-center text-gray-400">
          İçerik henüz eklenmedi.
        </div>
      ) : (
        <>
          {/* Vizyon & Misyon */}
          <section className="py-20 bg-[#f4f6f9]">
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-8 border border-[#e8ecf2] card-hover">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-[#4e8ac4]/15 rounded-2xl flex items-center justify-center">
                      <Eye size={22} className="text-[#4e8ac4]" />
                    </div>
                    <div>
                      <span className="section-label text-xs">Gelecek</span>
                      <h2 className="text-2xl font-black text-[#0e2247] mt-1">Vizyonumuz</h2>
                    </div>
                  </div>
                  <p className="text-gray-500 leading-relaxed whitespace-pre-line text-[15px]">{about.vision}</p>
                </div>

                <div className="bg-white rounded-2xl p-8 border border-[#e8ecf2] card-hover">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-[#1a3a6b]/10 rounded-2xl flex items-center justify-center">
                      <Target size={22} className="text-[#1a3a6b]" />
                    </div>
                    <div>
                      <span className="section-label text-xs">Amaç</span>
                      <h2 className="text-2xl font-black text-[#0e2247] mt-1">Misyonumuz</h2>
                    </div>
                  </div>
                  <p className="text-gray-500 leading-relaxed whitespace-pre-line text-[15px]">{about.mission}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Tarihçe */}
          {about.history && (
            <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 lg:px-8">
                <div className="max-w-3xl mx-auto">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-[#0e2247]/8 rounded-2xl flex items-center justify-center">
                      <Clock size={22} className="text-[#0e2247]" />
                    </div>
                    <div>
                      <span className="section-label text-xs">Geçmiş</span>
                      <h2 className="text-3xl font-black text-[#0e2247] mt-1">Tarihçemiz</h2>
                    </div>
                  </div>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-500 leading-relaxed whitespace-pre-line text-[15px]">{about.history}</p>
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
