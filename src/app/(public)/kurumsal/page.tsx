import Link from "next/link";
import { Eye, Users, Building2, Star, ArrowRight } from "lucide-react";

const cards = [
  {
    href: "/kurumsal/hakkimizda",
    icon: Eye,
    title: "Hakkımızda",
    desc: "Vizyonumuz, misyonumuz ve Gen Organizasyon'un hikayesi.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    href: "/kurumsal/ekibimiz",
    icon: Users,
    title: "Ekibimiz",
    desc: "Genel Kurul, yönetim kadrosu ve kurucu üyelerimiz.",
    color: "bg-purple-50 text-purple-600",
  },
  {
    href: "/kurumsal/direktorlukler",
    icon: Building2,
    title: "Direktörlükler",
    desc: "Dört direktörlüğümüzün görev ve hedefleri.",
    color: "bg-green-50 text-green-600",
  },
  {
    href: "/kurumsal/sponsorlarimiz",
    icon: Star,
    title: "Sponsorlarımız",
    desc: "Bizi destekleyen kurumlar ve iş ortaklarımız.",
    color: "bg-amber-50 text-amber-600",
  },
];

export default function KurumsalPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-[#0e2247] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#1a3a6b] opacity-50 blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-20">
          <span className="section-label mb-4">Kurumsal</span>
          <h1 className="text-5xl font-black mt-3 tracking-tight">Gen Organizasyon</h1>
          <p className="text-white/60 text-lg mt-4 max-w-xl leading-relaxed">
            Gençlerin potansiyelini ortaya çıkaran organizasyon platformumuz hakkında her şey.
          </p>
        </div>
      </div>

      <section className="bg-[#f4f6f9] py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map(({ href, icon: Icon, title, desc, color }) => (
              <Link key={href} href={href}
                className="card-hover group bg-white border border-[#e8ecf2] rounded-2xl p-7 flex flex-col">
                <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon size={22} />
                </div>
                <h2 className="text-lg font-black text-[#0e2247] mb-2">{title}</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">{desc}</p>
                <span className="flex items-center gap-1.5 text-[#1a3a6b] text-sm font-semibold group-hover:gap-2.5 transition-all">
                  İncele <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
