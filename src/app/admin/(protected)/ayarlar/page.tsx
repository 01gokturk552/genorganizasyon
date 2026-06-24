"use client";

import { useState, useEffect } from "react";
import { Save } from "lucide-react";

export default function AyarlarPage() {
  const [form, setForm] = useState({
    hero_title: "",
    hero_subtitle: "",
    site_title: "",
    site_description: "",
    footer_text: "",
  });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings").then((r) => r.json()).then((d) => {
      setForm({
        hero_title: d.hero_title || "",
        hero_subtitle: d.hero_subtitle || "",
        site_title: d.site_title || "",
        site_description: d.site_description || "",
        footer_text: d.footer_text || "",
      });
    });
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/admin/settings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Site Ayarları</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-2xl">
        <form onSubmit={save} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Site Başlığı</label>
            <input value={form.site_title} onChange={(e) => setForm({ ...form, site_title: e.target.value })} placeholder="Gen Organizasyon" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a3a6b]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Site Açıklaması (SEO)</label>
            <textarea value={form.site_description} onChange={(e) => setForm({ ...form, site_description: e.target.value })} rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a3a6b] resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Ana Sayfa Hero Başlığı</label>
            <input value={form.hero_title} onChange={(e) => setForm({ ...form, hero_title: e.target.value })} placeholder="Gençlerin Gücünü Organizasyona Dönüştürüyoruz" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a3a6b]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Ana Sayfa Hero Alt Başlığı</label>
            <textarea value={form.hero_subtitle} onChange={(e) => setForm({ ...form, hero_subtitle: e.target.value })} rows={3} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a3a6b] resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Footer Metni</label>
            <input value={form.footer_text} onChange={(e) => setForm({ ...form, footer_text: e.target.value })} placeholder="© 2024 Gen Organizasyon." className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a3a6b]" />
          </div>
          <button type="submit" disabled={loading} className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium ${saved ? "bg-green-500 text-white" : "bg-[#1a3a6b] text-white hover:bg-[#12285a]"} disabled:opacity-60`}>
            <Save size={16} /> {saved ? "Kaydedildi!" : loading ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </form>
      </div>
    </div>
  );
}
