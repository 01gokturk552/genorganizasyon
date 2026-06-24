import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Sponsorlarımız",
  description: "Gen Organizasyon'u destekleyen sponsor kurumlar ve iş ortaklarımız.",
};

export const dynamic = "force-dynamic";

const CATEGORY_LABELS: Record<string, string> = {
  altin: "Altın Sponsorlar",
  gumus: "Gümüş Sponsorlar",
  bronz: "Bronz Sponsorlar",
  ana: "Ana Sponsorlar",
  destekci: "Destekçiler",
};

export default async function SponsorlarimizPage() {
  const sponsors = await prisma.sponsor.findMany({
    where: { isActive: true },
    orderBy: [{ category: "asc" }, { order: "asc" }],
  });

  const grouped = sponsors.reduce<Record<string, typeof sponsors>>((acc, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s);
    return acc;
  }, {});

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-[#0e2247] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#1a3a6b] opacity-50 blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-20">
          <span className="section-label mb-4">Kurumsal</span>
          <h1 className="text-5xl font-black mt-3 tracking-tight">Sponsorlarımız</h1>
          <p className="text-white/60 text-lg mt-4 max-w-xl leading-relaxed">
            Bizi destekleyen ve başarılarımıza ortak olan değerli sponsorlarımız.
          </p>
        </div>
      </div>

      <section className="bg-[#f4f6f9] min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-20">
          {sponsors.length === 0 ? (
            <div className="text-center py-20 text-gray-400">Henüz sponsor eklenmedi.</div>
          ) : (
            <div className="space-y-14">
              {Object.entries(grouped).map(([category, items]) => (
                <div key={category}>
                  <div className="flex items-center gap-4 mb-8">
                    <span className="w-1 h-8 rounded-full bg-[#4e8ac4]" />
                    <h2 className="text-2xl font-black text-[#0e2247]">
                      {CATEGORY_LABELS[category] || `${category.charAt(0).toUpperCase()}${category.slice(1)} Sponsorlar`}
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {items.map((sponsor) => (
                      <a
                        key={sponsor.id}
                        href={sponsor.websiteUrl || "#"}
                        target={sponsor.websiteUrl ? "_blank" : "_self"}
                        rel="noopener noreferrer"
                        className="card-hover bg-white border border-[#e8ecf2] rounded-2xl p-6 flex flex-col items-center justify-center gap-3 group"
                      >
                        {sponsor.logoUrl ? (
                          <div className="relative w-full h-14">
                            <Image src={sponsor.logoUrl} alt={sponsor.name} fill className="object-contain" />
                          </div>
                        ) : (
                          <div className="h-14 flex items-center justify-center text-[#1a3a6b] font-bold text-center text-sm w-full">
                            {sponsor.name}
                          </div>
                        )}
                        {sponsor.websiteUrl && (
                          <ExternalLink size={11} className="text-gray-300 group-hover:text-[#4e8ac4] transition-colors" />
                        )}
                      </a>
                    ))}
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
