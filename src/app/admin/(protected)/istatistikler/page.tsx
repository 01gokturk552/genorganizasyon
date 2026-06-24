"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Save } from "lucide-react";

interface Stat { id: string; key: string; value: string; label: string; icon: string; }

const ICONS = ["users", "calendar", "trophy", "star"];

export default function IstatistiklerPage() {
  const [items, setItems] = useState<Stat[]>([]);
  const [form, setForm] = useState({ key: "", value: "", label: "", icon: "star" });
  const [loading, setLoading] = useState(false);

  const load = () => fetch("/api/admin/stats").then((r) => r.json()).then(setItems);
  useEffect(() => { load(); }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/admin/stats", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setLoading(false);
    setForm({ key: "", value: "", label: "", icon: "star" });
    load();
  };

  const del = async (id: string) => {
    if (!confirm("Silmek istediğinizden emin misiniz?")) return;
    await fetch("/api/admin/stats", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">İstatistikler</h1>
      <p className="text-sm text-gray-500 mb-6">Ana sayfada &quot;Neler Yapıyoruz?&quot; bölümünde gösterilen sayılar.</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-800 mb-4">İstatistik Ekle / Güncelle</h2>
          <form onSubmit={save} className="space-y-4">
            <input required value={form.key} onChange={(e) => setForm({ ...form, key: e.target.value })} placeholder="Anahtar (örn: team_count)" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a3a6b]" />
            <input required value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} placeholder="Değer (örn: 50+)" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a3a6b]" />
            <input required value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder="Etiket (örn: Ekip Arkadaşı)" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a3a6b]" />
            <select value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a3a6b]">
              {ICONS.map((i) => <option key={i} value={i}>{i}</option>)}
            </select>
            <button type="submit" disabled={loading} className="flex items-center gap-2 bg-[#1a3a6b] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#12285a] disabled:opacity-60">
              <Save size={16} /> {loading ? "Kaydediliyor..." : "Kaydet"}
            </button>
          </form>
        </div>

        <div className="space-y-3">
          {items.map((s) => (
            <div key={s.id} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center justify-between shadow-sm">
              <div>
                <span className="text-2xl font-bold text-[#1a3a6b]">{s.value}</span>
                <p className="text-sm text-gray-500">{s.label}</p>
                <p className="text-xs text-gray-300">{s.key}</p>
              </div>
              <button onClick={() => del(s.id)} className="p-1.5 text-gray-300 hover:text-red-500"><Trash2 size={14} /></button>
            </div>
          ))}
          {items.length === 0 && <p className="text-center text-gray-400 py-8">Henüz istatistik eklenmedi.</p>}
        </div>
      </div>
    </div>
  );
}
