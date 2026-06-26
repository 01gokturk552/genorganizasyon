import Link from "next/link";
import { Instagram, Twitter, Linkedin, Youtube, Mail, MapPin, Phone, ArrowRight } from "lucide-react";

const links = {
  kurumsal: [
    { label: "Hakkımızda",     href: "/kurumsal/hakkimizda" },
    { label: "Ekibimiz",       href: "/kurumsal/ekibimiz" },
    { label: "Direktörlükler", href: "/kurumsal/direktorlukler" },
    { label: "Sponsorlarımız", href: "/kurumsal/sponsorlarimiz" },
  ],
  basin: [
    { label: "Kurumsal Kimlik", href: "/basin/kurumsal-kimlik" },
    { label: "Yayınlarımız",    href: "/basin/yayinlarimiz" },
    { label: "Neler Yapıyoruz?", href: "/neler-yapiyoruz" },
    { label: "Bize Ulaşın",    href: "/bize-ulasin" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#0a1e3d] text-white">
      {/* Üst şerit */}
      <div className="border-b border-white/8">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* Marka */}
            <div className="lg:col-span-1">
              <div className="mb-5">
                <span className="text-[#4e8ac4] font-black text-3xl tracking-tight">GEN</span>
                <p className="text-white/40 text-[10px] font-medium tracking-[0.04em] mt-1">Organizasyon</p>
              </div>
              <p className="text-white/55 text-sm leading-relaxed mb-6">
                Gençlerin potansiyelini ortaya çıkaran, liderlik ve organizasyon becerilerini geliştiren öncü platform.
              </p>
              <div className="flex gap-2.5">
                {[
                  { icon: <Instagram size={15} />, label: "Instagram" },
                  { icon: <Twitter size={15} />,   label: "Twitter" },
                  { icon: <Linkedin size={15} />,  label: "LinkedIn" },
                  { icon: <Youtube size={15} />,   label: "YouTube" },
                ].map(({ icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/8 hover:bg-[#4e8ac4] transition-all duration-200 hover:scale-110"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Kurumsal */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Kurumsal</h4>
              <ul className="space-y-2.5">
                {links.kurumsal.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="group flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
                      <ArrowRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sayfalar */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Hızlı Erişim</h4>
              <ul className="space-y-2.5">
                {links.basin.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="group flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
                      <ArrowRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* İletişim */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">İletişim</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-white/60">
                  <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/8 shrink-0">
                    <Mail size={13} />
                  </div>
                  info@genorganizasyon.org
                </li>
                <li className="flex items-center gap-3 text-sm text-white/60">
                  <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/8 shrink-0">
                    <Phone size={13} />
                  </div>
                  +90 (212) 000 00 00
                </li>
                <li className="flex items-start gap-3 text-sm text-white/60">
                  <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/8 shrink-0 mt-0.5">
                    <MapPin size={13} />
                  </div>
                  İstanbul, Türkiye
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Alt çizgi */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-white/30 text-xs">
          © {new Date().getFullYear()} Gen Organizasyon. Tüm hakları saklıdır.
        </p>
        <Link href="/admin" className="text-white/20 text-xs hover:text-white/50 transition-colors">
          Yönetim Paneli
        </Link>
      </div>
    </footer>
  );
}
