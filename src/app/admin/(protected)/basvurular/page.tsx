"use client";

import { useState, useEffect } from "react";
import { Trash2, Check, X, Clock, Search } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Application {
  id: string; firstName: string; lastName: string; email: string; phone: string;
  school: string; grade: string; message: string; status: string; createdAt: string;
}

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  beklemede: { label: "Beklemede", color: "bg-yellow-50 text-yellow-700", icon: <Clock size={12} /> },
  incelendi: { label: "İncelendi", color: "bg-blue-50 text-blue-700", icon: <Clock size={12} /> },
  kabul: { label: "Kabul", color: "bg-green-50 text-green-700", icon: <Check size={12} /> },
  red: { label: "Red", color: "bg-red-50 text-red-700", icon: <X size={12} /> },
};

export default function BasvurularPage() {
  const [items, setItems] = useState<Application[]>([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Application | null>(null);

  const load = () => fetch("/api/admin/applications").then((r) => r.json()).then(setItems);
  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch("/api/admin/applications", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) });
    load();
    if (selected?.id === id) setSelected((p) => p ? { ...p, status } : null);
  };

  const del = async (id: string) => {
    if (!confirm("Silmek istediğinizden emin misiniz?")) return;
    await fetch("/api/admin/applications", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    load();
    if (selected?.id === id) setSelected(null);
  };

  const filtered = items.filter((a) => {
    const matchStatus = filter === "all" || a.status === filter;
    const matchSearch = !search || `${a.firstName} ${a.lastName} ${a.email} ${a.school}`.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Başvurular</h1>
        <span className="text-sm text-gray-400">{items.length} toplam başvuru</span>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Ad, e-posta veya okul ara..." className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#1a3a6b]" />
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1a3a6b]">
          <option value="all">Tümü ({items.length})</option>
          {Object.entries(STATUS_CONFIG).map(([k, v]) => (
            <option key={k} value={k}>{v.label} ({items.filter((a) => a.status === k).length})</option>
          ))}
        </select>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="divide-y divide-gray-50">
            {filtered.map((app) => {
              const sc = STATUS_CONFIG[app.status] || STATUS_CONFIG.beklemede;
              return (
                <div key={app.id} onClick={() => setSelected(app)} className={`flex items-center justify-between px-5 py-3 cursor-pointer hover:bg-gray-50 transition-colors ${selected?.id === app.id ? "bg-blue-50" : ""}`}>
                  <div>
                    <p className="font-medium text-sm text-gray-800">{app.firstName} {app.lastName}</p>
                    <p className="text-xs text-gray-400">{app.email}{app.school ? ` · ${app.school}` : ""}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${sc.color}`}>{sc.icon} {sc.label}</span>
                    <span className="text-xs text-gray-300">{formatDate(app.createdAt)}</span>
                  </div>
                </div>
              );
            })}
          </div>
          {filtered.length === 0 && <p className="text-center text-gray-400 py-8">Başvuru bulunamadı.</p>}
        </div>

        {selected && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">{selected.firstName} {selected.lastName}</h3>
              <button onClick={() => setSelected(null)} className="text-gray-300 hover:text-gray-500"><X size={16} /></button>
            </div>
            <div className="space-y-2 text-sm mb-4">
              <div><span className="text-gray-400">E-posta:</span> <span className="text-gray-700">{selected.email}</span></div>
              {selected.phone && <div><span className="text-gray-400">Telefon:</span> <span className="text-gray-700">{selected.phone}</span></div>}
              {selected.school && <div><span className="text-gray-400">Okul:</span> <span className="text-gray-700">{selected.school}</span></div>}
              {selected.grade && <div><span className="text-gray-400">Sınıf:</span> <span className="text-gray-700">{selected.grade}</span></div>}
              {selected.message && <div><span className="text-gray-400">Mesaj:</span> <p className="text-gray-700 mt-1 bg-gray-50 p-2 rounded text-xs">{selected.message}</p></div>}
              <div><span className="text-gray-400">Tarih:</span> <span className="text-gray-700">{formatDate(selected.createdAt)}</span></div>
            </div>
            <div className="space-y-2 mb-4">
              <p className="text-xs font-medium text-gray-500">Durum Güncelle</p>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(STATUS_CONFIG).map(([k, v]) => (
                  <button key={k} onClick={() => updateStatus(selected.id, k)} className={`text-xs py-1.5 px-2 rounded-lg border font-medium transition-colors ${selected.status === k ? `${v.color} border-current` : "border-gray-200 text-gray-500 hover:border-gray-300"}`}>
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={() => del(selected.id)} className="w-full flex items-center justify-center gap-2 text-red-500 text-sm border border-red-100 hover:bg-red-50 py-2 rounded-lg transition-colors">
              <Trash2 size={14} /> Sil
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
