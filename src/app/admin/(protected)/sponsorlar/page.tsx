"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

interface Sponsor { id: string; name: string; logoUrl: string; websiteUrl: string; category: string; order: number; isActive: boolean; }
const EMPTY: Omit<Sponsor, "id"> = { name: "", logoUrl: "", websiteUrl: "", category: "genel", order: 0, isActive: true };

export default function SponsorlarPage() {
  const [items, setItems]       = useState<Sponsor[]>([]);
  const [form, setForm]         = useState<Omit<Sponsor, "id">>(EMPTY);
  const [editId, setEditId]     = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading]   = useState(false);

  const load = () => fetch("/api/admin/sponsors").then((r) => r.json()).then(setItems);
  useEffect(() => { load(); }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/admin/sponsors", { method: editId ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editId ? { ...form, id: editId } : form) });
    setLoading(false); setShowForm(false); setEditId(null); setForm(EMPTY); load();
  };

  const del = async (id: string) => {
    if (!confirm("Silmek istediğinizden emin misiniz?")) return;
    await fetch("/api/admin/sponsors", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    load();
  };

  const inp = "border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a3a6b]";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Sponsorlar</h1>
        <button onClick={() => { setShowForm(true); setEditId(null); setForm(EMPTY); }}
          className="flex items-center gap-2 bg-[#1a3a6b] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#12285a]">
          <Plus size={16} /> Sponsor Ekle
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="font-semibold text-gray-800 mb-5">{editId ? "Sponsoru Düzenle" : "Yeni Sponsor"}</h2>
          <form onSubmit={save} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Sponsor Adı" className={inp} />
              <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Kategori (altın, gümüş...)" className={inp} />
            </div>
            <ImageUpload value={form.logoUrl} onChange={(url) => setForm({ ...form, logoUrl: url })} label="Sponsor Logosu" />
            <input value={form.websiteUrl} onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })} placeholder="Web Sitesi URL (isteğe bağlı)" className={`w-full ${inp}`} />
            <div className="flex items-center gap-4">
              <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: +e.target.value })} placeholder="Sıra" className={`${inp} w-28`} />
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4" /> Aktif
              </label>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={loading} className="bg-[#1a3a6b] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#12285a] disabled:opacity-60">
                {loading ? "Kaydediliyor..." : "Kaydet"}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditId(null); }} className="border border-gray-200 px-6 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50">İptal</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {items.map((s) => (
            <div key={s.id} className="border border-gray-100 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {s.logoUrl
                  ? <img src={s.logoUrl} alt={s.name} className="h-10 w-20 object-contain rounded" />
                  : <div className="h-10 w-20 bg-gray-50 rounded flex items-center justify-center text-xs text-gray-400">{s.name}</div>
                }
                <div>
                  <p className="font-medium text-sm text-gray-800">{s.name}</p>
                  <p className="text-xs text-gray-400">{s.category}</p>
                </div>
              </div>
              <div className="flex gap-1 shrink-0">
                <button onClick={() => { setForm({ name: s.name, logoUrl: s.logoUrl, websiteUrl: s.websiteUrl, category: s.category, order: s.order, isActive: s.isActive }); setEditId(s.id); setShowForm(true); }}
                  className="p-1.5 text-gray-400 hover:text-[#1a3a6b]"><Pencil size={14} /></button>
                <button onClick={() => del(s.id)} className="p-1.5 text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
        {items.length === 0 && <p className="text-center text-gray-400 py-8">Henüz sponsor eklenmedi.</p>}
      </div>
    </div>
  );
}
