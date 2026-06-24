"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, Mail, AlertCircle, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (result?.error) {
      setError("E-posta veya şifre hatalı.");
    } else {
      router.push("/admin");
    }
  };

  const inputCls = "w-full pl-10 pr-4 py-3 border border-[#e8ecf2] rounded-xl text-sm outline-none focus:border-[#1a3a6b] focus:ring-2 focus:ring-[#1a3a6b]/10 transition-all bg-white";

  return (
    <div className="min-h-screen bg-[#0e2247] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Arka plan deseni */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#1a3a6b] opacity-60 blur-3xl -translate-y-1/2" />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Üst kısım */}
        <div className="bg-[#0e2247] px-8 py-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-[#4e8ac4] rounded-2xl mb-4">
            <span className="text-white font-black text-2xl">G</span>
          </div>
          <h1 className="text-white font-black text-2xl">GEN Organizasyon</h1>
          <p className="text-white/50 text-sm mt-1">Yönetim Paneli</p>
        </div>

        {/* Form */}
        <div className="px-8 py-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">E-posta</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  className={inputCls} placeholder="admin@genorganizasyon.org" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Şifre</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                  className={inputCls} placeholder="••••••••" />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2.5 text-red-600 text-sm bg-red-50 border border-red-100 px-4 py-3 rounded-xl">
                <AlertCircle size={15} /> {error}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full bg-[#0e2247] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#1a3a6b] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#0e2247]/15 disabled:opacity-60 mt-2">
              {loading ? "Giriş yapılıyor..." : (<>Giriş Yap <ArrowRight size={15} /></>)}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
