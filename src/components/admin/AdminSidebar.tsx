"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Newspaper, Users, Calendar, Building2,
  FileText, MessageSquare, Settings, BarChart3, BookOpen,
  Phone, ExternalLink, Star
} from "lucide-react";

const menu = [
  { group: "Ana",      items: [
    { label: "Dashboard",    href: "/admin",              icon: LayoutDashboard },
    { label: "Başvurular",   href: "/admin/basvurular",   icon: MessageSquare },
  ]},
  { group: "İçerik",   items: [
    { label: "Haberler",     href: "/admin/haberler",     icon: Newspaper },
    { label: "Etkinlikler",  href: "/admin/etkinlikler",  icon: Calendar },
    { label: "Yayınlar",     href: "/admin/yayinlar",     icon: BookOpen },
  ]},
  { group: "Kurumsal", items: [
    { label: "Hakkımızda",   href: "/admin/hakkimizda",   icon: ExternalLink },
    { label: "Ekip",         href: "/admin/ekip",         icon: Users },
    { label: "Direktörlükler", href: "/admin/direktorlukler", icon: Building2 },
    { label: "Sponsorlar",   href: "/admin/sponsorlar",   icon: Star },
  ]},
  { group: "Sistem",   items: [
    { label: "Basın Kimliği", href: "/admin/basin",       icon: FileText },
    { label: "İstatistikler", href: "/admin/istatistikler", icon: BarChart3 },
    { label: "İletişim",     href: "/admin/iletisim",     icon: Phone },
    { label: "Ayarlar",      href: "/admin/ayarlar",      icon: Settings },
  ]},
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 bg-[#0e2247] text-white flex flex-col shrink-0 shadow-xl">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/8">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#4e8ac4] rounded-xl flex items-center justify-center">
            <span className="text-white font-black text-sm">G</span>
          </div>
          <div>
            <span className="text-white font-black text-base leading-none">GEN</span>
            <span className="text-white/40 text-[10px] font-medium tracking-wider block uppercase mt-0.5">Yönetim Paneli</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {menu.map(({ group, items }) => (
          <div key={group} className="mb-5">
            <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.15em] px-2 mb-2">{group}</p>
            {items.map(({ label, href, icon: Icon }) => {
              const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 text-sm font-medium transition-all ${
                    active
                      ? "bg-[#4e8ac4] text-white shadow-sm"
                      : "text-white/60 hover:bg-white/8 hover:text-white"
                  }`}
                >
                  <Icon size={15} className={active ? "text-white" : ""} />
                  {label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/8">
        <Link href="/" target="_blank"
          className="flex items-center gap-2.5 text-xs text-white/40 hover:text-white transition-colors px-2 py-2 rounded-xl hover:bg-white/8">
          <ExternalLink size={13} /> Siteyi Görüntüle
        </Link>
      </div>
    </aside>
  );
}
