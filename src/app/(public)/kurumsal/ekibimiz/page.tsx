import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { Mail, User } from "lucide-react";

export const metadata: Metadata = {
  title: "Ekibimiz",
  description: "Gen Organizasyon yönetim kadrosu, Genel Kurul ve kurucu üyelerimizle tanışın.",
};

export const dynamic = "force-dynamic";

const CATEGORY_ORDER = ["yonetim", "genel-kurul", "kurucu"];

const CATEGORY_LABELS: Record<string, string> = {
  yonetim: "Yönetim Kurulu",
  "genel-kurul": "Genel Kurul",
  kurucu: "Kurucu Üyeler",
};

export default async function EkibimizPage() {
  let members: Awaited<ReturnType<typeof prisma.teamMember.findMany>> = [];
  try {
    members = await prisma.teamMember.findMany({
      where: { isActive: true },
      orderBy: [{ category: "asc" }, { order: "asc" }],
    });
  } catch (e) { console.error("[Ekibimiz]", e); }

  const grouped = members.reduce<Record<string, typeof members>>((acc, m) => {
    if (!acc[m.category]) acc[m.category] = [];
    acc[m.category].push(m);
    return acc;
  }, {});

  const categories = Object.keys(grouped).sort(
    (a, b) => (CATEGORY_ORDER.indexOf(a) ?? 99) - (CATEGORY_ORDER.indexOf(b) ?? 99)
  );

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-[#0e2247] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#1a3a6b] opacity-50 blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-20">
          <span className="section-label mb-4">Kurumsal</span>
          <h1 className="text-5xl font-black mt-3 tracking-tight">Ekibimiz</h1>
          <p className="text-white/60 text-lg mt-4 max-w-xl leading-relaxed">
            Gen Organizasyon'u ayakta tutan tutkulu ve yetenekli ekibimizle tanışın.
          </p>
        </div>
      </div>

      <div className="bg-[#f4f6f9] min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-20">
          {members.length === 0 ? (
            <div className="text-center py-20 text-gray-400">Henüz ekip üyesi eklenmedi.</div>
          ) : (
            <div className="space-y-16">
              {categories.map((cat) => (
                <div key={cat}>
                  <div className="flex items-center gap-4 mb-8">
                    <span className="w-1 h-8 rounded-full bg-[#4e8ac4]" />
                    <h2 className="text-2xl font-black text-[#0e2247]">
                      {CATEGORY_LABELS[cat] || cat}
                    </h2>
                    <span className="ml-2 text-xs font-semibold text-[#1a3a6b] bg-[#1a3a6b]/8 px-3 py-1 rounded-full">
                      {grouped[cat].length} üye
                    </span>
                  </div>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {grouped[cat].map((member) => (
                      <div key={member.id} className="card-hover bg-white rounded-2xl overflow-hidden border border-[#e8ecf2] group text-center">
                        <div className="relative h-52 bg-[#0e2247]/5">
                          {member.imageUrl ? (
                            <Image src={member.imageUrl} alt={member.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1a3a6b]/5 to-[#4e8ac4]/10">
                              <User size={48} className="text-[#1a3a6b]/20" />
                            </div>
                          )}
                        </div>
                        <div className="p-5">
                          <h3 className="font-black text-[#0e2247] text-sm">{member.name}</h3>
                          <p className="text-[#4e8ac4] text-xs font-semibold mt-1.5 leading-tight">{member.position}</p>
                          {member.bio && (
                            <p className="text-gray-400 text-xs mt-3 line-clamp-2 leading-relaxed">{member.bio}</p>
                          )}
                          {member.email && (
                            <a
                              href={`mailto:${member.email}`}
                              className="mt-3 inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#1a3a6b] transition-colors"
                            >
                              <Mail size={11} /> {member.email}
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
