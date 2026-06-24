"use client";

import { useState, useEffect } from "react";
import { Save } from "lucide-react";

export default function IletisimAdminPage() {
  const [form, setForm] = useState({ address: "", email: "", phone: "", mapUrl: "", instagram: "", twitter: "", linkedin: "", youtube: "" });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/contact").then((r) => r.json()).then((d) => { if (d) setForm({ address: d.address || "", email: d.email || "", phone: d.phone || "", mapUrl: d.mapUrl || "", instagram: d.instagram || "", twitter: d.twitter || "", linkedin: d.linkedin || "", youtube: d.youtube || "" }); });
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/admin/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const field = (key: keyof typeof form, label: string, type = "text") => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <input type={type} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a3a6b]" />
    </div>
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">İletişim Bilgileri</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <form onSubmit={save} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {field("email", "E-posta", "email")}
            {field("phone", "Telefon", "tel")}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Adres</label>
            <textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a3a6b] resize-none" />
          </div>
          {field("mapUrl", "Google Maps URL")}
          <h3 className="font-semibold text-gray-700 text-sm pt-2">Sosyal Medya</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {field("instagram", "Instagram URL")}
            {field("twitter", "Twitter/X URL")}
            {field("linkedin", "LinkedIn URL")}
            {field("youtube", "YouTube URL")}
          </div>
          <button type="submit" disabled={loading} className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium ${saved ? "bg-green-500 text-white" : "bg-[#1a3a6b] text-white hover:bg-[#12285a]"} disabled:opacity-60`}>
            <Save size={16} /> {saved ? "Kaydedildi!" : loading ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </form>
      </div>
    </div>
  );
}
