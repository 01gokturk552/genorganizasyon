"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface PressItem { id: string; title: string; description: string; fileUrl: string; category: string; }
const EMPTY: Omit<PressItem, "id"> = { title: "", description: "", fileUrl: "", category: "logo" };

export default function BasinAdminPage() {
  const [items, setItems] = useState<PressItem[]>([]);
  const [form, setForm] = useState<Omit<PressItem, "id">>(EMPTY);
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const load = () => fetch("/api/admin/press").then((r) => r.json()).then(setItems);
  useEffect(() => { load(); }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/admin/press", { method: editId ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editId ? { ...form, id: editId } : form) });
    setLoading(false); setShowForm(false); setEditId(null); setForm(EMPTY); load();
  };

  const del = async (id: string) => {
    if (!confirm("Silmek istediğinizden emin misiniz?")) return;
    await fetch("/api/admin/press", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Kurumsal Kimlik Dosyaları</h1>
        <button onClick={() => { setShowForm(true); setEditId(null); setForm(EMPTY); }} className="flex items-center gap-2 bg-[#1a3a6b] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#12285a]"><Plus size={16} /> Dosya Ekle</button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <form onSubmit={save} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Başlık" className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a3a6b]" />
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a3a6b]">
                <option value="logo">Logo</option>
                <option value="renk">Renk Paleti</option>
                <option value="font">Yazı Tipi</option>
                <option value="sablon">Şablon</option>
              </select>
            </div>
            <input value={form.fileUrl} onChange={(e) => setForm({ ...form, fileUrl: e.target.value })} placeholder="Dosya URL (download linki)" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a3a6b]" />
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Açıklama (isteğe bağlı)" rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a3a6b] resize-none" />
            <div className="flex gap-3">
              <button type="submit" disabled={loading} className="bg-[#1a3a6b] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#12285a] disabled:opacity-60">{loading ? "Kaydediliyor..." : "Kaydet"}</button>
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
              <th className="text-left px-4 py-3 font-medium text-gray-500">Kategori</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-800">{item.title}</td>
                <td className="px-4 py-3 text-gray-500 capitalize">{item.category}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => { setForm({ title: item.title, description: item.description, fileUrl: item.fileUrl, category: item.category }); setEditId(item.id); setShowForm(true); }} className="p-1.5 text-gray-400 hover:text-[#1a3a6b]"><Pencil size={14} /></button>
                    <button onClick={() => del(item.id)} className="p-1.5 text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && <p className="text-center text-gray-400 py-8">Henüz dosya eklenmedi.</p>}
      </div>
    </div>
  );
}
