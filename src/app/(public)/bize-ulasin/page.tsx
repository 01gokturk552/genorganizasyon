"use client";

import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Instagram, Twitter, Linkedin, Youtube, Send, CheckCircle } from "lucide-react";

export default function BizeUlasinPage() {
  const [contact, setContact] = useState<Record<string, string>>({});
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/public/contact")
      .then((r) => r.json())
      .then(setContact)
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/public/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full border border-[#e8ecf2] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#1a3a6b] focus:ring-2 focus:ring-[#1a3a6b]/10 transition-all bg-white";

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-[#0e2247] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#1a3a6b] opacity-50 blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-20">
          <span className="section-label mb-4">İletişim</span>
          <h1 className="text-5xl font-black mt-3 tracking-tight">Bize Ulaşın</h1>
          <p className="text-white/60 text-lg mt-4 max-w-xl leading-relaxed">
            Sorularınız için bizimle iletişime geçin, en kısa sürede yanıt verelim.
          </p>
        </div>
      </div>

      <section className="bg-[#f4f6f9]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-20">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Sol: İletişim Bilgileri */}
            <div className="lg:col-span-2 space-y-6">
              {/* Bilgi Kartları */}
              {contact.email && (
                <div className="bg-white rounded-2xl p-6 border border-[#e8ecf2] flex items-start gap-4">
                  <div className="w-11 h-11 bg-[#1a3a6b]/10 rounded-xl flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-[#1a3a6b]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">E-posta</p>
                    <a href={`mailto:${contact.email}`} className="text-[#0e2247] font-semibold text-sm hover:text-[#4e8ac4] transition-colors">
                      {contact.email}
                    </a>
                  </div>
                </div>
              )}
              {contact.phone && (
                <div className="bg-white rounded-2xl p-6 border border-[#e8ecf2] flex items-start gap-4">
                  <div className="w-11 h-11 bg-[#1a3a6b]/10 rounded-xl flex items-center justify-center shrink-0">
                    <Phone size={18} className="text-[#1a3a6b]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Telefon</p>
                    <a href={`tel:${contact.phone}`} className="text-[#0e2247] font-semibold text-sm hover:text-[#4e8ac4] transition-colors">
                      {contact.phone}
                    </a>
                  </div>
                </div>
              )}
              {contact.address && (
                <div className="bg-white rounded-2xl p-6 border border-[#e8ecf2] flex items-start gap-4">
                  <div className="w-11 h-11 bg-[#1a3a6b]/10 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-[#1a3a6b]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Adres</p>
                    <p className="text-[#0e2247] font-semibold text-sm">{contact.address}</p>
                  </div>
                </div>
              )}

              {/* Sosyal Medya */}
              {(contact.instagram || contact.twitter || contact.linkedin || contact.youtube) && (
                <div className="bg-white rounded-2xl p-6 border border-[#e8ecf2]">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Sosyal Medya</p>
                  <div className="flex gap-3">
                    {contact.instagram && (
                      <a href={contact.instagram} target="_blank" rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#f4f6f9] hover:bg-[#1a3a6b] hover:text-white text-[#1a3a6b] transition-all duration-200">
                        <Instagram size={16} />
                      </a>
                    )}
                    {contact.twitter && (
                      <a href={contact.twitter} target="_blank" rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#f4f6f9] hover:bg-[#1a3a6b] hover:text-white text-[#1a3a6b] transition-all duration-200">
                        <Twitter size={16} />
                      </a>
                    )}
                    {contact.linkedin && (
                      <a href={contact.linkedin} target="_blank" rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#f4f6f9] hover:bg-[#1a3a6b] hover:text-white text-[#1a3a6b] transition-all duration-200">
                        <Linkedin size={16} />
                      </a>
                    )}
                    {contact.youtube && (
                      <a href={contact.youtube} target="_blank" rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#f4f6f9] hover:bg-[#1a3a6b] hover:text-white text-[#1a3a6b] transition-all duration-200">
                        <Youtube size={16} />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Sağ: Form */}
            <div className="lg:col-span-3 bg-white rounded-2xl p-8 border border-[#e8ecf2]">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-5 border-4 border-green-100">
                    <CheckCircle size={28} className="text-green-500" />
                  </div>
                  <h3 className="text-xl font-black text-[#0e2247] mb-2">Mesajınız İletildi!</h3>
                  <p className="text-gray-400 text-sm max-w-xs">En kısa sürede size dönüş yapacağız.</p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ firstName: "", lastName: "", email: "", phone: "", message: "" }); }}
                    className="mt-6 bg-[#0e2247] text-white px-8 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1a3a6b] transition-colors"
                  >
                    Yeni Mesaj
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-black text-[#0e2247] mb-6">Mesaj Gönder</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Ad *</label>
                        <input required type="text" placeholder="Adınız" value={form.firstName}
                          onChange={(e) => setForm({ ...form, firstName: e.target.value })} className={inputCls} />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Soyad *</label>
                        <input required type="text" placeholder="Soyadınız" value={form.lastName}
                          onChange={(e) => setForm({ ...form, lastName: e.target.value })} className={inputCls} />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">E-posta *</label>
                      <input required type="email" placeholder="ornek@email.com" value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Telefon</label>
                      <input type="tel" placeholder="+90 5xx xxx xx xx" value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Mesaj *</label>
                      <textarea required rows={5} placeholder="Mesajınızı buraya yazın..." value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className={`${inputCls} resize-none`} />
                    </div>
                    <button type="submit" disabled={loading}
                      className="w-full bg-[#0e2247] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#1a3a6b] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#0e2247]/15 disabled:opacity-60">
                      <Send size={15} /> {loading ? "Gönderiliyor..." : "Mesajı Gönder"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
