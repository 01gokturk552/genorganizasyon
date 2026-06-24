"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";

interface Props {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
}

export default function ImageUpload({ value, onChange, label = "Görsel", className = "" }: Props) {
  const inputRef  = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError]         = useState("");
  const [dragging, setDragging]   = useState(false);

  const upload = useCallback(async (file: File) => {
    setError("");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res  = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Yükleme başarısız.");
      onChange(data.url);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Yükleme hatası.");
    } finally {
      setUploading(false);
    }
  }, [onChange]);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) upload(file);
    e.target.value = "";
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) upload(file);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</p>

      {/* Önizleme */}
      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-[#e8ecf2] bg-[#f4f6f9]">
          <div className="relative h-40 w-full">
            <Image src={value} alt="Görsel önizleme" fill className="object-contain p-2" unoptimized />
          </div>
          <div className="absolute top-2 right-2 flex gap-1.5">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="bg-white/90 hover:bg-white text-gray-700 text-xs px-2.5 py-1.5 rounded-lg font-medium flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Upload size={12} /> Değiştir
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="bg-white/90 hover:bg-red-50 text-red-500 p-1.5 rounded-lg shadow-sm transition-colors"
              title="Görseli kaldır"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      ) : (
        /* Drop zone */
        <div
          onClick={() => !uploading && inputRef.current?.click()}
          onDragEnter={(e) => { e.preventDefault(); setDragging(true); }}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            dragging
              ? "border-[#1a3a6b] bg-[#1a3a6b]/5"
              : "border-[#e8ecf2] hover:border-[#1a3a6b]/40 hover:bg-[#f4f6f9]"
          } ${uploading ? "pointer-events-none" : ""}`}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 size={28} className="text-[#1a3a6b] animate-spin" />
              <p className="text-sm text-gray-400">Yükleniyor...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-[#1a3a6b]/8 rounded-xl flex items-center justify-center">
                <ImageIcon size={22} className="text-[#1a3a6b]/40" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1a3a6b]">Dosya Seç veya Sürükle</p>
                <p className="text-xs text-gray-400 mt-0.5">JPG, PNG, WEBP, GIF — maks. 10 MB</p>
              </div>
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="text-xs text-red-500 bg-red-50 border border-red-100 px-3 py-2 rounded-lg">{error}</p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
        onChange={onFile}
        className="hidden"
      />
    </div>
  );
}
