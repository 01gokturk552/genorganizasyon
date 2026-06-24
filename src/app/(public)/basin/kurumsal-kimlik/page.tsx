import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Download, Palette, Type, Layout, Image as ImageIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Kurumsal Kimlik",
  description: "Gen Organizasyon logo, renk paleti ve yazı tipi dosyalarını indirin.",
};

export const dynamic = "force-dynamic";

const CATEGORY_CONFIG: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  logo:   { label: "Logo Dosyaları",  icon: <ImageIcon size={18} />, color: "bg-blue-50 text-blue-600" },
  renk:   { label: "Renk Paleti",     icon: <Palette size={18} />,   color: "bg-purple-50 text-purple-600" },
  font:   { label: "Yazı Tipleri",    icon: <Type size={18} />,      color: "bg-green-50 text-green-600" },
  sablon: { label: "Şablonlar",       icon: <Layout size={18} />,    color: "bg-orange-50 text-orange-600" },
};

export default async function KurumsalKimlikPage() {
  const items = await prisma.pressIdentity.findMany();
  const grouped = items.reduce<Record<string, typeof items>>((acc, i) => {
    if (!acc[i.category]) acc[i.category] = [];
    acc[i.category].push(i);
    return acc;
  }, {});

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-[#0e2247] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#1a3a6b] opacity-50 blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-20">
          <span className="section-label mb-4">Basın</span>
          <h1 className="text-5xl font-black mt-3 tracking-tight">Kurumsal Kimlik</h1>
          <p className="text-white/60 text-lg mt-4 max-w-xl leading-relaxed">
            Logo, renk paleti ve yazı tipi dosyalarımızı indirin.
          </p>
        </div>
      </div>

      <section className="bg-[#f4f6f9] min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-20">
          {items.length === 0 ? (
            <div className="text-center py-20 text-gray-400">Henüz dosya eklenmedi.</div>
          ) : (
            <div className="space-y-14">
              {Object.entries(grouped).map(([cat, list]) => {
                const config = CATEGORY_CONFIG[cat];
                return (
                  <div key={cat}>
                    <div className="flex items-center gap-4 mb-8">
                      <span className="w-1 h-8 rounded-full bg-[#4e8ac4]" />
                      <h2 className="text-2xl font-black text-[#0e2247]">{config?.label || cat}</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                      {list.map((item) => (
                        <div key={item.id} className="card-hover bg-white rounded-2xl p-6 border border-[#e8ecf2]">
                          {config && (
                            <div className={`inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-lg mb-4 ${config.color}`}>
                              {config.icon} {config.label}
                            </div>
                          )}
                          <h3 className="font-black text-[#0e2247] mb-2">{item.title}</h3>
                          {item.description && (
                            <p className="text-gray-400 text-sm mb-4 leading-relaxed">{item.description}</p>
                          )}
                          {item.fileUrl && (
                            <a
                              href={item.fileUrl}
                              download
                              className="inline-flex items-center gap-2 bg-[#0e2247] text-white text-sm px-5 py-2.5 rounded-xl font-semibold hover:bg-[#1a3a6b] transition-colors"
                            >
                              <Download size={14} /> Dosyayı İndir
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
