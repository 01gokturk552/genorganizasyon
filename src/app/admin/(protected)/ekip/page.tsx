"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, User } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

interface Member {
  id: string; name: string; position: string; category: string;
  bio: string; imageUrl: string; email: string; order: number; isActive: boolean;
}

const EMPTY: Omit<Member, "id"> = {
  name: "", position: "", category: "yonetim", bio: "", imageUrl: "", email: "", order: 0, isActive: true,
};

const POSITIONS = [
  "Genel Kurul Başkanı", "Genel Kurul Başkan Yardımcısı", "Genel Yönetici",
  "Genel Yönetici Yardımcısı", "Kurumsal İlişkiler Direktörü", "Operasyon Direktörü",
  "İdari ve Mali İşler Direktörü", "Eğitim ve Kampüs İlişkileri Direktörü",
  "Genel Kurul Üyesi", "Kurucu Üye",
];

export default function EkipPage() {
  const [items, setItems]       = useState<Member[]>([]);
  const [form, setForm]         = useState<Omit<Member, "id">>(EMPTY);
  const [editId, setEditId]     = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading]   = useState(false);

  const load = () => fetch("/api/admin/team").then((r) => r.json()).then(setItems);
  useEffect(() => { load(); }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/admin/team", {
      method: editId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editId ? { ...form, id: editId } : form),
    });
    setLoading(false); setShowForm(false); setEditId(null); setForm(EMPTY); load();
  };

  const del = async (id: string) => {
    if (!confirm("Silmek istediğinizden emin misiniz?")) return;
    await fetch("/api/admin/team", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    load();
  };

  const edit = (m: Member) => {
    setForm({ name: m.name, position: m.position, category: m.category, bio: m.bio, imageUrl: m.imageUrl, email: m.email, order: m.order, isActive: m.isActive });
    setEditId(m.id); setShowForm(true);
  };

  const grouped = items.reduce<Record<string, Member[]>>((acc, m) => {
    if (!acc[m.category]) acc[m.category] = [];
    acc[m.category].push(m);
    return acc;
  }, {});

  const inp = "border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a3a6b]";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Ekip Yönetimi</h1>
        <button onClick={() => { setShowForm(true); setEditId(null); setForm(EMPTY); }}
          className="flex items-center gap-2 bg-[#1a3a6b] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#12285a]">
          <Plus size={16} /> Üye Ekle
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="font-semibold text-gray-800 mb-5">{editId ? "Üyeyi Düzenle" : "Yeni Üye"}</h2>
          <form onSubmit={save} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ad Soyad" className={inp} />
              <select value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} className={inp}>
                <option value="">Pozisyon seçin</option>
                {POSITIONS.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inp}>
                <option value="yonetim">Yönetim Kurulu</option>
                <option value="genel-kurul">Genel Kurul</option>
                <option value="kurucu">Kurucu Üyeler</option>
              </select>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="E-posta (isteğe bağlı)" className={inp} />
            </div>
            <ImageUpload value={form.imageUrl} onChange={(url) => setForm({ ...form, imageUrl: url })} label="Profil Fotoğrafı (isteğe bağlı)" />
            <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} placeholder="Biyografi (isteğe bağlı)" rows={3} className={`w-full ${inp} resize-none`} />
            <div className="grid grid-cols-2 gap-4">
              <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: +e.target.value })} placeholder="Sıra" className={inp} />
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

      {Object.entries(grouped).map(([cat, members]) => (
        <div key={cat} className="mb-6 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
            <h2 className="font-semibold text-gray-700 text-sm">
              {cat === "yonetim" ? "Yönetim Kurulu" : cat === "genel-kurul" ? "Genel Kurul" : "Kurucu Üyeler"}
            </h2>
          </div>
          <div className="divide-y divide-gray-50">
            {members.map((m) => (
              <div key={m.id} className="flex items-center justify-between px-5 py-3">
                <div className="flex items-center gap-3">
                  {m.imageUrl
                    ? <img src={m.imageUrl} alt={m.name} className="w-9 h-9 rounded-full object-cover" />
                    : <div className="w-9 h-9 rounded-full bg-[#1a3a6b]/10 flex items-center justify-center"><User size={16} className="text-[#1a3a6b]" /></div>
                  }
                  <div>
                    <p className="font-medium text-sm text-gray-800">{m.name}</p>
                    <p className="text-xs text-gray-400">{m.position}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${m.isActive ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-500"}`}>
                    {m.isActive ? "Aktif" : "Pasif"}
                  </span>
                  <button onClick={() => edit(m)} className="p-1.5 text-gray-400 hover:text-[#1a3a6b]"><Pencil size={14} /></button>
                  <button onClick={() => del(m.id)} className="p-1.5 text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {items.length === 0 && <p className="text-center text-gray-400 py-8">Henüz üye eklenmedi.</p>}
    </div>
  );
}
