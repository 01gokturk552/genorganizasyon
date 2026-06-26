"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Search, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Ana Sayfa", href: "/" },
  {
    label: "Kurumsal",
    href: "/kurumsal",
    children: [
      { label: "Hakkımızda",     href: "/kurumsal/hakkimizda" },
      { label: "Ekibimiz",       href: "/kurumsal/ekibimiz" },
      { label: "Direktörlükler", href: "/kurumsal/direktorlukler" },
      { label: "Sponsorlarımız", href: "/kurumsal/sponsorlarimiz" },
    ],
  },
  {
    label: "Basın",
    href: "/basin",
    children: [
      { label: "Kurumsal Kimlik", href: "/basin/kurumsal-kimlik" },
      { label: "Yayınlarımız",    href: "/basin/yayinlarimiz" },
    ],
  },
  { label: "Neler Yapıyoruz?", href: "/neler-yapiyoruz" },
  { label: "Bize Ulaşın",      href: "/bize-ulasin" },
];

export default function Navbar() {
  const [isOpen, setIsOpen]         = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled]     = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchRef  = useRef<HTMLInputElement>(null);
  const pathname   = usePathname();
  const router     = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => { setIsOpen(false); setActiveDropdown(null); }, [pathname]);

  const openDrop  = (label: string) => { if (closeTimer.current) clearTimeout(closeTimer.current); setActiveDropdown(label); };
  const closeDrop = () => { closeTimer.current = setTimeout(() => setActiveDropdown(null), 150); };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/arama?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`text-white sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#1a3a6b]/95 backdrop-blur-xl shadow-2xl shadow-black/20 border-b border-white/[0.06]"
          : "bg-[#1a3a6b] shadow-lg shadow-[#0e2247]/30"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-[68px]">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="flex flex-col leading-none">
              <span className="text-[#4e8ac4] font-black text-2xl tracking-tight">GEN</span>
              <span className="text-white/50 text-[10px] font-medium tracking-[0.18em] uppercase">Organizasyon</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => link.children && openDrop(link.label)}
                onMouseLeave={() => link.children && closeDrop()}
              >
                <Link
                  href={link.href}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.href)
                      ? "bg-white/15 text-white"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                  {link.children && (
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-200 opacity-70 ${
                        activeDropdown === link.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </Link>

                {link.children && activeDropdown === link.label && (
                  <div
                    className="absolute top-full left-0 pt-2 z-50"
                    onMouseEnter={() => openDrop(link.label)}
                    onMouseLeave={() => closeDrop()}
                  >
                    <div className="bg-white rounded-xl shadow-2xl shadow-black/15 border border-gray-100 min-w-[210px] py-1.5 overflow-hidden">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setActiveDropdown(null)}
                          className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-150 ${
                            pathname === child.href
                              ? "bg-[#1a3a6b] text-white font-medium"
                              : "text-gray-700 hover:bg-[#f4f6f9] hover:text-[#1a3a6b]"
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                            pathname === child.href ? "bg-[#4e8ac4]" : "bg-gray-300"
                          }`} />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Sağ: Arama + Başvur + Hamburger */}
          <div className="flex items-center gap-2">
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center gap-1.5">
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ara..."
                  className="bg-white/10 border border-white/25 rounded-lg px-3 py-1.5 text-sm text-white placeholder-white/50 outline-none focus:border-[#4e8ac4] focus:bg-white/15 w-44 transition-all"
                />
                <button type="submit" className="p-1.5 hover:text-[#4e8ac4] transition-colors">
                  <Search size={17} />
                </button>
                <button type="button" onClick={() => setSearchOpen(false)} className="p-1.5 hover:text-[#4e8ac4] transition-colors">
                  <X size={17} />
                </button>
              </form>
            ) : (
              <button onClick={() => setSearchOpen(true)} className="p-2 text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/10">
                <Search size={18} />
              </button>
            )}

            <button
              className="lg:hidden p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menü"
            >
              {isOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[600px]" : "max-h-0"}`}>
        <div className="bg-[#0e2247] border-t border-white/10 px-4 py-3 space-y-0.5">
          {navLinks.map((link) => (
            <div key={link.href}>
              <Link
                href={link.href}
                className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.href) ? "bg-white/10 text-white" : "text-white/70 hover:text-white hover:bg-white/8"
                }`}
              >
                {link.label}
                {link.children && <ChevronDown size={14} className="opacity-50" />}
              </Link>
              {link.children && (
                <div className="ml-4 mt-0.5 mb-1 space-y-0.5 border-l-2 border-[#4e8ac4]/30 pl-3">
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                        pathname === child.href ? "text-[#4e8ac4] font-medium" : "text-white/60 hover:text-white"
                      }`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
