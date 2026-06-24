"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { formatDate } from "@/lib/utils";
import ImageUpload from "@/components/admin/ImageUpload";

interface NewsItem {
  id: string; title: string; slug: string; summary: string; content: string;
  imageUrl: string; category: string; isPublished: boolean; publishedAt: string | null; createdAt: string;
}

const EMPTY: Omit<NewsItem, "id" | "slug" | "createdAt"> = {
  title: "", summary: "", content: "", imageUrl: "", category: "genel", isPublished: false, publishedAt: null,
};

export default function HaberlerPage() {
  const [items, setItems]       = useState<NewsItem[]>([]);
  const [form, setForm]         = useState<Omit<NewsItem, "id" | "slug" | "createdAt">>(EMPTY);
  const [editId, setEditId]     = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading]   = useState(false);

  const load = () => fetch("/api/admin/news").then((r) => r.json()).then(setItems);
  useEffect(() => { load(); }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/admin/news", {
      method: editId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editId ? { ...form, id: editId } : form),
    });
    setLoading(false); setShowForm(false); setEditId(null); setForm(EMPTY); load();
  };

  const del = async (id: string) => {
    if (!confirm("Silmek istediğinizden emin misiniz?")) return;
    await fetch("/api/admin/news", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    load();
  };

  const edit = (item: NewsItem) => {
    setForm({ title: item.title, summary: item.summary, content: item.content, imageUrl: item.imageUrl, category: item.category, isPublished: item.isPublished, publishedAt: item.publishedAt });
    setEditId(item.id); setShowForm(true);
  };

  const inp = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a3a6b]";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Haberler</h1>
        <button onClick={() => { setShowForm(true); setEditId(null); setForm(EMPTY); }}
          className="flex items-center gap-2 bg-[#1a3a6b] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#12285a]">
          <Plus size={16} /> Yeni Haber
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="font-semibold text-gray-800 mb-5">{editId ? "Haberi Düzenle" : "Yeni Haber"}</h2>
          <form onSubmit={save} className="space-y-4">
            <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Başlık" className={inp} />
            <ImageUpload value={form.imageUrl} onChange={(url) => setForm({ ...form, imageUrl: url })} label="Kapak Görseli (isteğe bağlı)" />
            <div className="grid grid-cols-2 gap-4">
              <input required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Kategori" className={inp} />
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" checked={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} className="w-4 h-4 rounded" />
                Yayında
              </label>
            </div>
            <textarea required value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} placeholder="Özet" rows={2} className={`${inp} resize-none`} />
            <textarea required value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="İçerik" rows={6} className={`${inp} resize-none`} />
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
              <th className="text-left px-4 py-3 font-medium text-gray-500">Başlık</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500 hidden md:table-cell">Kategori</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500 hidden lg:table-cell">Tarih</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Durum</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-800 max-w-xs truncate">{item.title}</td>
                <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{item.category}</td>
                <td className="px-4 py-3 text-gray-400 hidden lg:table-cell">{formatDate(item.createdAt)}</td>
                <td className="px-4 py-3">
                  {item.isPublished
                    ? <span className="flex items-center gap-1 text-green-600 text-xs"><Eye size={12} /> Yayında</span>
                    : <span className="flex items-center gap-1 text-gray-400 text-xs"><EyeOff size={12} /> Taslak</span>}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 justify-end">
                    <button onClick={() => edit(item)} className="p-1.5 text-gray-400 hover:text-[#1a3a6b]"><Pencil size={14} /></button>
                    <button onClick={() => del(item.id)} className="p-1.5 text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && <p className="text-center text-gray-400 py-8">Henüz haber eklenmedi.</p>}
      </div>
    </div>
  );
}
