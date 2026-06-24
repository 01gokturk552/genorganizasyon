"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0e2247] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
      <div className="relative text-center max-w-lg">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500/15 border border-red-500/25 rounded-2xl mb-6">
          <AlertTriangle size={32} className="text-red-400" />
        </div>
        <h1 className="text-2xl font-black text-white mb-3">Bir Hata Oluştu</h1>
        <p className="text-white/50 text-base mb-8 leading-relaxed">
          Beklenmedik bir hata meydana geldi. Lütfen sayfayı yenileyin veya ana sayfaya dönün.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button onClick={reset}
            className="inline-flex items-center gap-2.5 bg-[#4e8ac4] text-white px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-[#6099cf] transition-all shadow-xl shadow-[#4e8ac4]/25">
            <RefreshCw size={15} /> Tekrar Dene
          </button>
          <Link href="/"
            className="inline-flex items-center gap-2.5 bg-white/10 text-white px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-white/15 transition-all">
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
}
