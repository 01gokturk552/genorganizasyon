"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

interface Pub { id: string; title: string; description: string; fileUrl: string; imageUrl: string; category: string; isPublished: boolean; }
const EMPTY: Omit<Pub, "id"> = { title: "", description: "", fileUrl: "", imageUrl: "", category: "genel", isPublished: true };

export default function YayinlarPage() {
  const [items, setItems]       = useState<Pub[]>([]);
  const [form, setForm]         = useState<Omit<Pub, "id">>(EMPTY);
  const [editId, setEditId]     = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading]   = useState(false);

  const load = () => fetch("/api/admin/publications").then((r) => r.json()).then(setItems);
  useEffect(() => { load(); }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/admin/publications", { method: editId ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editId ? { ...form, id: editId } : form) });
    setLoading(false); setShowForm(false); setEditId(null); setForm(EMPTY); load();
  };

  const del = async (id: string) => {
    if (!confirm("Silmek istediğinizden emin misiniz?")) return;
    await fetch("/api/admin/publications", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    load();
  };

  const inp = "border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a3a6b]";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Yayınlar</h1>
        <button onClick={() => { setShowForm(true); setEditId(null); setForm(EMPTY); }}
          className="flex items-center gap-2 bg-[#1a3a6b] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#12285a]">
          <Plus size={16} /> Yayın Ekle
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="font-semibold text-gray-800 mb-5">{editId ? "Yayını Düzenle" : "Yeni Yayın"}</h2>
          <form onSubmit={save} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Başlık" className={inp} />
              <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Kategori" className={inp} />
            </div>
            <ImageUpload value={form.imageUrl} onChange={(url) => setForm({ ...form, imageUrl: url })} label="Kapak Görseli (isteğe bağlı)" />
            <input value={form.fileUrl} onChange={(e) => setForm({ ...form, fileUrl: e.target.value })} placeholder="İndirilebilir Dosya URL (isteğe bağlı)" className={`w-full ${inp}`} />
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Açıklama" rows={2} className={`w-full ${inp} resize-none`} />
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

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((p) => (
          <div key={p.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-sm text-gray-800">{p.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{p.category}</p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => { setForm({ title: p.title, description: p.description, fileUrl: p.fileUrl, imageUrl: p.imageUrl, category: p.category, isPublished: p.isPublished }); setEditId(p.id); setShowForm(true); }}
                  className="p-1.5 text-gray-400 hover:text-[#1a3a6b]"><Pencil size={14} /></button>
                <button onClick={() => del(p.id)} className="p-1.5 text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {items.length === 0 && <p className="text-center text-gray-400 py-8">Henüz yayın eklenmedi.</p>}
    </div>
  );
}
