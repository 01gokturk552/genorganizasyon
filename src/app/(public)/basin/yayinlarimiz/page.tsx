import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { Download, FileText } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Yayınlarımız",
  description: "Gen Organizasyon raporları, bültenleri ve basın materyalleri.",
};

export const dynamic = "force-dynamic";

export default async function YayinlarimizPage() {
  let publications: Awaited<ReturnType<typeof prisma.publication.findMany>> = [];
  try {
    publications = await prisma.publication.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (e) { console.error("[Yayinlarimiz]", e); }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-[#0e2247] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#1a3a6b] opacity-50 blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-20">
          <span className="section-label mb-4">Basın</span>
          <h1 className="text-5xl font-black mt-3 tracking-tight">Yayınlarımız</h1>
          <p className="text-white/60 text-lg mt-4 max-w-xl leading-relaxed">
            Raporlar, bültenler ve diğer yayınlarımızı inceleyin ve indirin.
          </p>
        </div>
      </div>

      <section className="bg-[#f4f6f9] min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-20">
          {publications.length === 0 ? (
            <div className="text-center py-20 text-gray-400">Henüz yayın eklenmedi.</div>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {publications.map((pub) => (
                <div key={pub.id} className="card-hover bg-white rounded-2xl overflow-hidden border border-[#e8ecf2] group flex flex-col">
                  <div className="relative h-48 bg-[#0e2247]/5 overflow-hidden">
                    {pub.imageUrl ? (
                      <Image src={pub.imageUrl} alt={pub.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1a3a6b]/5 to-[#4e8ac4]/10">
                        <FileText size={48} className="text-[#1a3a6b]/20" />
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-xs text-[#4e8ac4] font-bold uppercase tracking-wider">{pub.category}</span>
                    <h3 className="font-black text-[#0e2247] mt-2 mb-2 leading-tight">{pub.title}</h3>
                    {pub.description && (
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed flex-1">{pub.description}</p>
                    )}
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#f4f6f9]">
                      <span className="text-xs text-gray-400">{formatDate(pub.createdAt)}</span>
                      {pub.fileUrl && (
                        <a
                          href={pub.fileUrl}
                          download
                          className="inline-flex items-center gap-1.5 text-[#1a3a6b] text-sm font-semibold hover:text-[#4e8ac4] transition-colors"
                        >
                          <Download size={14} /> İndir
                        </a>
                      )}
                    </div>
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
