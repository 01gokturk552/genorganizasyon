import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Newspaper, Calendar, Users, MessageSquare, ArrowRight, TrendingUp } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [newsCount, eventCount, memberCount, applicationCount, pendingApplications] = await Promise.all([
    prisma.news.count(),
    prisma.event.count(),
    prisma.teamMember.count({ where: { isActive: true } }),
    prisma.application.count(),
    prisma.application.count({ where: { status: "beklemede" } }),
  ]);

  const recentApplications = await prisma.application.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const cards = [
    { label: "Haberler",     value: newsCount,         icon: Newspaper,      href: "/admin/haberler",    bg: "bg-blue-50",   text: "text-blue-600",   border: "border-blue-100" },
    { label: "Etkinlikler",  value: eventCount,        icon: Calendar,       href: "/admin/etkinlikler", bg: "bg-green-50",  text: "text-green-600",  border: "border-green-100" },
    { label: "Ekip Üyeleri", value: memberCount,       icon: Users,          href: "/admin/ekip",        bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-100" },
    { label: "Başvurular",   value: applicationCount,  icon: MessageSquare,  href: "/admin/basvurular",  bg: "bg-amber-50",  text: "text-amber-600",  border: "border-amber-100",
      badge: pendingApplications > 0 ? pendingApplications : undefined },
  ];

  return (
    <div className="space-y-6">
      {/* Başlık */}
      <div>
        <h1 className="text-2xl font-black text-[#0e2247]">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Gen Organizasyon yönetim paneline hoşgeldiniz.</p>
      </div>

      {/* Stat Kartları */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(({ label, value, icon: Icon, href, bg, text, border, badge }) => (
          <Link key={href} href={href}
            className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 ${bg} ${border} border rounded-xl flex items-center justify-center`}>
                <Icon size={17} className={text} />
              </div>
              {badge && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                  {badge} yeni
                </span>
              )}
            </div>
            <div className="text-3xl font-black text-[#0e2247]">{value}</div>
            <div className="text-sm text-gray-400 mt-0.5 flex items-center justify-between">
              {label}
              <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 text-[#1a3a6b] transition-opacity" />
            </div>
          </Link>
        ))}
      </div>

      {/* Son Başvurular */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-center">
              <TrendingUp size={14} className="text-amber-600" />
            </div>
            <h2 className="font-black text-[#0e2247] text-sm">Son Başvurular</h2>
          </div>
          <Link href="/admin/basvurular" className="text-xs font-semibold text-[#1a3a6b] hover:text-[#4e8ac4] transition-colors flex items-center gap-1">
            Tümünü Gör <ArrowRight size={12} />
          </Link>
        </div>
        {recentApplications.length === 0 ? (
          <p className="text-center text-gray-400 py-10 text-sm">Henüz başvuru yok.</p>
        ) : (
          <div className="divide-y divide-gray-50">
            {recentApplications.map((app) => (
              <div key={app.id} className="flex items-center justify-between px-6 py-3.5 hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#0e2247]/8 rounded-xl flex items-center justify-center">
                    <span className="text-[#0e2247] font-black text-xs">{app.firstName[0]}{app.lastName[0]}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-[#0e2247]">{app.firstName} {app.lastName}</p>
                    <p className="text-xs text-gray-400">{app.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {app.school && <span className="text-xs text-gray-400 hidden sm:block">{app.school}</span>}
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                    app.status === "beklemede" ? "bg-yellow-50 text-yellow-700 border border-yellow-100" :
                    app.status === "kabul"     ? "bg-green-50 text-green-700 border border-green-100" :
                    app.status === "red"       ? "bg-red-50 text-red-700 border border-red-100" :
                    "bg-gray-50 text-gray-700 border border-gray-100"
                  }`}>
                    {app.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
