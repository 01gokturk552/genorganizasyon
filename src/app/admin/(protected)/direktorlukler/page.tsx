"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

interface Dir { id: string; name: string; slug: string; description: string; goals: string; imageUrl: string; order: number; }
const EMPTY: Omit<Dir, "id" | "slug"> = { name: "", description: "", goals: "", imageUrl: "", order: 0 };

export default function DirektorluklerPage() {
  const [items, setItems]       = useState<Dir[]>([]);
  const [form, setForm]         = useState<Omit<Dir, "id" | "slug">>(EMPTY);
  const [editId, setEditId]     = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading]   = useState(false);

  const load = () => fetch("/api/admin/directorates").then((r) => r.json()).then(setItems);
  useEffect(() => { load(); }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/admin/directorates", { method: editId ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editId ? { ...form, id: editId } : form) });
    setLoading(false); setShowForm(false); setEditId(null); setForm(EMPTY); load();
  };

  const del = async (id: string) => {
    if (!confirm("Silmek istediğinizden emin misiniz?")) return;
    await fetch("/api/admin/directorates", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    load();
  };

  const inp = "border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a3a6b]";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Direktörlükler</h1>
        <button onClick={() => { setShowForm(true); setEditId(null); setForm(EMPTY); }}
          className="flex items-center gap-2 bg-[#1a3a6b] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#12285a]">
          <Plus size={16} /> Direktörlük Ekle
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="font-semibold text-gray-800 mb-5">{editId ? "Düzenle" : "Yeni Direktörlük"}</h2>
          <form onSubmit={save} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Direktörlük Adı" className={inp} />
              <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: +e.target.value })} placeholder="Sıra" className={inp} />
            </div>
            <ImageUpload value={form.imageUrl} onChange={(url) => setForm({ ...form, imageUrl: url })} label="Direktörlük Görseli (isteğe bağlı)" />
            <textarea required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Açıklama" rows={4} className={`w-full ${inp} resize-none`} />
            <textarea value={form.goals} onChange={(e) => setForm({ ...form, goals: e.target.value })} placeholder="Hedefler (isteğe bağlı)" rows={3} className={`w-full ${inp} resize-none`} />
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={loading} className="bg-[#1a3a6b] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#12285a] disabled:opacity-60">
                {loading ? "Kaydediliyor..." : "Kaydet"}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditId(null); }} className="border border-gray-200 px-6 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50">İptal</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {items.map((d) => (
          <div key={d.id} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-[#1a3a6b]">{d.name}</h3>
              <div className="flex gap-1">
                <button onClick={() => { setForm({ name: d.name, description: d.description, goals: d.goals, imageUrl: d.imageUrl, order: d.order }); setEditId(d.id); setShowForm(true); }}
                  className="p-1.5 text-gray-400 hover:text-[#1a3a6b]"><Pencil size={14} /></button>
                <button onClick={() => del(d.id)} className="p-1.5 text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
              </div>
            </div>
            <p className="text-sm text-gray-500 line-clamp-3">{d.description}</p>
          </div>
        ))}
      </div>
      {items.length === 0 && <p className="text-center text-gray-400 py-8">Henüz direktörlük eklenmedi.</p>}
    </div>
  );
}
