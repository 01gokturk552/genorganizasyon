"use client";

import { useState, useEffect } from "react";
import { Save } from "lucide-react";

export default function HakkimizdaAdminPage() {
  const [form, setForm] = useState({ vision: "", mission: "", history: "" });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/about").then((r) => r.json()).then((d) => { if (d.vision) setForm({ vision: d.vision, mission: d.mission, history: d.history || "" }); });
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/admin/about", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Hakkımızda</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <form onSubmit={save} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Vizyonumuz</label>
            <textarea required value={form.vision} onChange={(e) => setForm({ ...form, vision: e.target.value })} rows={5} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a3a6b] resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Misyonumuz</label>
            <textarea required value={form.mission} onChange={(e) => setForm({ ...form, mission: e.target.value })} rows={5} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a3a6b] resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Tarihçemiz (isteğe bağlı)</label>
            <textarea value={form.history} onChange={(e) => setForm({ ...form, history: e.target.value })} rows={4} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a3a6b] resize-none" />
          </div>
          <button type="submit" disabled={loading} className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${saved ? "bg-green-500 text-white" : "bg-[#1a3a6b] text-white hover:bg-[#12285a]"} disabled:opacity-60`}>
            <Save size={16} /> {saved ? "Kaydedildi!" : loading ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </form>
      </div>
    </div>
  );
}
