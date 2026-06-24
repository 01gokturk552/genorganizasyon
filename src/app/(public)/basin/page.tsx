import Link from "next/link";
import { FileText, BookOpen, ArrowRight } from "lucide-react";

const cards = [
  {
    href: "/basin/kurumsal-kimlik",
    icon: FileText,
    title: "Kurumsal Kimlik",
    desc: "Logo, renk paleti, yazı tipleri ve marka dosyaları.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    href: "/basin/yayinlarimiz",
    icon: BookOpen,
    title: "Yayınlarımız",
    desc: "Raporlar, bültenler ve basın materyalleri.",
    color: "bg-green-50 text-green-600",
  },
];

export default function BasinPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-[#0e2247] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#1a3a6b] opacity-50 blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-20">
          <span className="section-label mb-4">Basın</span>
          <h1 className="text-5xl font-black mt-3 tracking-tight">Basın Merkezi</h1>
          <p className="text-white/60 text-lg mt-4 max-w-xl leading-relaxed">
            Kurumsal kimlik dosyaları ve yayınlarımıza buradan ulaşabilirsiniz.
          </p>
        </div>
      </div>

      <section className="bg-[#f4f6f9] py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl">
            {cards.map(({ href, icon: Icon, title, desc, color }) => (
              <Link key={href} href={href}
                className="card-hover group bg-white border border-[#e8ecf2] rounded-2xl p-8 flex flex-col">
                <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon size={22} />
                </div>
                <h2 className="text-xl font-black text-[#0e2247] mb-2">{title}</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">{desc}</p>
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
