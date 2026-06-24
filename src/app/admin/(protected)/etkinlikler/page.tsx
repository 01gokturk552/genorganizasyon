"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { formatDate } from "@/lib/utils";
import ImageUpload from "@/components/admin/ImageUpload";

interface Event {
  id: string; title: string; slug: string; description: string; imageUrl: string;
  category: string; date: string | null; location: string; isPublished: boolean; order: number;
}

const EMPTY: Omit<Event, "id" | "slug"> = {
  title: "", description: "", imageUrl: "", category: "lise", date: null, location: "", isPublished: false, order: 0,
};

export default function EtkinliklerPage() {
  const [items, setItems]       = useState<Event[]>([]);
  const [form, setForm]         = useState<Omit<Event, "id" | "slug">>(EMPTY);
  const [editId, setEditId]     = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading]   = useState(false);

  const load = () => fetch("/api/admin/events").then((r) => r.json()).then(setItems);
  useEffect(() => { load(); }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/admin/events", {
      method: editId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editId ? { ...form, id: editId } : form),
    });
    setLoading(false); setShowForm(false); setEditId(null); setForm(EMPTY); load();
  };

  const del = async (id: string) => {
    if (!confirm("Silmek istediğinizden emin misiniz?")) return;
    await fetch("/api/admin/events", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    load();
  };

  const edit = (ev: Event) => {
    setForm({ title: ev.title, description: ev.description, imageUrl: ev.imageUrl, category: ev.category, date: ev.date ? ev.date.slice(0, 16) : null, location: ev.location, isPublished: ev.isPublished, order: ev.order });
    setEditId(ev.id); setShowForm(true);
  };

  const inp = "border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a3a6b]";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Etkinlikler</h1>
        <button onClick={() => { setShowForm(true); setEditId(null); setForm(EMPTY); }}
          className="flex items-center gap-2 bg-[#1a3a6b] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#12285a]">
          <Plus size={16} /> Yeni Etkinlik
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="font-semibold text-gray-800 mb-5">{editId ? "Etkinliği Düzenle" : "Yeni Etkinlik"}</h2>
          <form onSubmit={save} className="space-y-4">
            <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Etkinlik Adı" className={`w-full ${inp}`} />
            <ImageUpload value={form.imageUrl} onChange={(url) => setForm({ ...form, imageUrl: url })} label="Etkinlik Görseli (isteğe bağlı)" />
            <div className="grid grid-cols-2 gap-4">
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inp}>
                <option value="lise">Lise</option>
                <option value="universite">Üniversite</option>
              </select>
              <input type="datetime-local" value={form.date || ""} onChange={(e) => setForm({ ...form, date: e.target.value || null })} className={inp} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Konum" className={inp} />
              <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: +e.target.value })} placeholder="Sıra" className={inp} />
            </div>
            <textarea required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Açıklama" rows={3} className={`w-full ${inp} resize-none`} />
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input type="checkbox" checked={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} className="w-4 h-4" /> Yayında
            </label>
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
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Etkinlik</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500 hidden md:table-cell">Kategori</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500 hidden lg:table-cell">Tarih</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Durum</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {items.map((ev) => (
              <tr key={ev.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-800 max-w-xs truncate">{ev.title}</td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${ev.category === "lise" ? "bg-[#4e8ac4]/20 text-[#2d6a9f]" : "bg-[#1a3a6b]/10 text-[#1a3a6b]"}`}>
                    {ev.category === "lise" ? "Lise" : "Üniversite"}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-400 hidden lg:table-cell">{ev.date ? formatDate(ev.date) : "—"}</td>
                <td className="px-4 py-3">
                  {ev.isPublished
                    ? <span className="flex items-center gap-1 text-green-600 text-xs"><Eye size={12} /> Yayında</span>
                    : <span className="flex items-center gap-1 text-gray-400 text-xs"><EyeOff size={12} /> Taslak</span>}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 justify-end">
                    <button onClick={() => edit(ev)} className="p-1.5 text-gray-400 hover:text-[#1a3a6b]"><Pencil size={14} /></button>
                    <button onClick={() => del(ev.id)} className="p-1.5 text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && <p className="text-center text-gray-400 py-8">Henüz etkinlik eklenmedi.</p>}
      </div>
    </div>
  );
}
