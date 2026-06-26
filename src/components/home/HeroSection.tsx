"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Send, X, ArrowDown } from "lucide-react";

interface Props { settings: Record<string, string> }

function ApplicationModal({ onClose }: { onClose: () => void }) {
  const [form, setForm]       = useState({ firstName:"", lastName:"", email:"", phone:"", school:"", grade:"", message:"" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const f = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [key]: e.target.value }),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/public/applications", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(form) });
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto animate-fade-up">
        <div className="sticky top-0 bg-white flex items-center justify-between px-6 py-4 border-b border-gray-100 z-10">
          <div>
            <h2 className="text-lg font-bold text-[#1a3a6b]">Başvuru Formu</h2>
            <p className="text-xs text-gray-400 mt-0.5">Gen ailesine katılmak için formu doldurun</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400">
            <X size={18} />
          </button>
        </div>
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-green-100">
                <svg className="w-7 h-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#1a3a6b] mb-1">Başvurunuz Alındı!</h3>
              <p className="text-gray-400 text-sm mb-6">En kısa sürede sizinle iletişime geçeceğiz.</p>
              <button onClick={onClose} className="bg-[#1a3a6b] text-white px-8 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#12285a] transition-colors">Tamam</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-xs font-semibold text-gray-500 mb-1.5 block">Ad *</span>
                  <input required type="text" placeholder="Adınız" {...f("firstName")} className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-[#1a3a6b] focus:ring-3 focus:ring-[#1a3a6b]/8 transition-all" />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold text-gray-500 mb-1.5 block">Soyad *</span>
                  <input required type="text" placeholder="Soyadınız" {...f("lastName")} className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-[#1a3a6b] focus:ring-3 focus:ring-[#1a3a6b]/8 transition-all" />
                </label>
              </div>
              <label className="block">
                <span className="text-xs font-semibold text-gray-500 mb-1.5 block">E-posta *</span>
                <input required type="email" placeholder="ornek@email.com" {...f("email")} className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-[#1a3a6b] focus:ring-3 focus:ring-[#1a3a6b]/8 transition-all" />
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-gray-500 mb-1.5 block">Telefon</span>
                <input type="tel" placeholder="+90 5xx xxx xx xx" {...f("phone")} className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-[#1a3a6b] focus:ring-3 focus:ring-[#1a3a6b]/8 transition-all" />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-xs font-semibold text-gray-500 mb-1.5 block">Okul</span>
                  <input type="text" placeholder="Okul adı" {...f("school")} className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-[#1a3a6b] focus:ring-3 focus:ring-[#1a3a6b]/8 transition-all" />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold text-gray-500 mb-1.5 block">Sınıf / Bölüm</span>
                  <input type="text" placeholder="12-A / İşletme" {...f("grade")} className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-[#1a3a6b] focus:ring-3 focus:ring-[#1a3a6b]/8 transition-all" />
                </label>
              </div>
              <label className="block">
                <span className="text-xs font-semibold text-gray-500 mb-1.5 block">Neden katılmak istiyorsunuz?</span>
                <textarea rows={3} placeholder="Kendinizden kısaca bahsedin..." {...f("message")} className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-[#1a3a6b] focus:ring-3 focus:ring-[#1a3a6b]/8 transition-all resize-none" />
              </label>
              <button type="submit" disabled={loading}
                className="w-full bg-[#1a3a6b] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#12285a] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60 shadow-lg shadow-[#1a3a6b]/20">
                <Send size={15} /> {loading ? "Gönderiliyor..." : "Başvuruyu Gönder"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function HeroSection({ settings }: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  const titleLines = (settings.hero_title || "Gençlerin Gücünü\nOrganizasyona Dönüştürüyoruz").split("\n");

  return (
    <>
      <section className="relative bg-[#0e2247] text-white overflow-hidden min-h-[92vh] flex flex-col">
        {/* Arka plan katmanları */}
        <div className="absolute inset-0 pointer-events-none select-none">
          {/* Mesh gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0e2247] via-[#0e2247] to-[#091a38]" />
          {/* Animasyonlu blob'lar */}
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-[#1a3a6b] opacity-70 blur-[90px]" style={{ animation: "blobFloat 14s ease-in-out infinite" }} />
          <div className="absolute bottom-[-15%] left-[-8%] w-[500px] h-[500px] rounded-full bg-[#4e8ac4] opacity-[0.12] blur-[80px]" style={{ animation: "blobFloat 18s ease-in-out infinite reverse" }} />
          <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] rounded-full bg-[#2a4f8f] opacity-30 blur-[60px]" style={{ animation: "blobFloat 10s ease-in-out infinite 2s" }} />
          {/* Nokta grid */}
          <div className="absolute inset-0 dot-grid" />
          {/* Radyal vurgu */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(78,138,196,0.12),transparent)]" />
          {/* Alt geçiş */}
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#0a1628]/60 to-transparent" />
        </div>

        <div className="relative flex-1 flex items-center">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 w-full py-24">
            <div className="max-w-3xl">
              {/* Etiket */}
              <div className="inline-flex items-center gap-2 bg-[#4e8ac4]/15 border border-[#4e8ac4]/25 text-[#4e8ac4] text-xs font-bold tracking-[0.08em] px-4 py-2 rounded-full mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4e8ac4] animate-pulse" />
                GEN — Gençlerin Erişim Noktası
              </div>

              {/* Başlık */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.08] mb-6" style={{ letterSpacing: "-0.035em" }}>
                {titleLines[0]}
                {titleLines[1] && (
                  <>
                    <br />
                    <span className="text-gradient">{titleLines[1]}</span>
                  </>
                )}
              </h1>

              {/* Alt yazı */}
              <p className="text-lg sm:text-xl text-white/60 mb-10 leading-relaxed max-w-xl">
                {settings.hero_subtitle || "Lise ve üniversite öğrencilerini bir araya getirerek liderlik, organizasyon ve ekip çalışması becerilerini geliştiriyoruz."}
              </p>

              {/* Butonlar */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setModalOpen(true)}
                  className="group inline-flex items-center gap-2.5 bg-[#4e8ac4] text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-[#6099cf] transition-all hover:scale-[1.03] shadow-xl shadow-[#4e8ac4]/25"
                >
                  Başvur
                  <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
                <Link
                  href="/kurumsal/hakkimizda"
                  className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium transition-colors"
                >
                  Hakkımızda
                  <ArrowDown size={15} className="rotate-[-90deg]" />
                </Link>
              </div>

              {/* İstatistikler */}
              <div className="flex flex-wrap gap-6 mt-14 pt-8 border-t border-white/[0.08]">
                {[
                  { n: "50+",   l: "Ekip Arkadaşı" },
                  { n: "30+",   l: "Organizasyon" },
                  { n: "5000+", l: "Katılımcı" },
                  { n: "4+",    l: "Yıllık Deneyim" },
                ].map(({ n, l }) => (
                  <div key={l} className="glass rounded-xl px-5 py-3.5 min-w-[96px] text-center">
                    <p className="text-2xl font-black text-[#93bde0] leading-none tracking-tight">{n}</p>
                    <p className="text-white/50 text-xs mt-1.5 font-medium">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="relative flex justify-center pb-8 animate-bounce">
          <ArrowDown size={20} className="text-white/25" />
        </div>
      </section>

      {modalOpen && <ApplicationModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
