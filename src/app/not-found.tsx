import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0e2247] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
      <div className="relative text-center max-w-lg">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-[#4e8ac4]/15 border border-[#4e8ac4]/25 rounded-2xl mb-6">
          <Search size={32} className="text-[#4e8ac4]" />
        </div>
        <h1 className="text-8xl font-black text-white/10 leading-none mb-2">404</h1>
        <h2 className="text-2xl font-black text-white mb-3">Sayfa Bulunamadı</h2>
        <p className="text-white/50 text-base mb-8 leading-relaxed">
          Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
        </p>
        <Link href="/"
          className="inline-flex items-center gap-2.5 bg-[#4e8ac4] text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-[#6099cf] transition-all hover:scale-[1.02] shadow-xl shadow-[#4e8ac4]/25">
          <ArrowLeft size={16} /> Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
}
