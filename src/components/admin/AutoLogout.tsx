"use client";

import { useEffect, useState, useCallback } from "react";
import { signOut } from "next-auth/react";
import { Clock, LogOut } from "lucide-react";

const SESSION_MS = 20 * 60 * 1000;
const WARN_THRESHOLD_S = 120;

export default function AutoLogout() {
  const [secondsLeft, setSecondsLeft] = useState(SESSION_MS / 1000);
  const [showWarning, setShowWarning] = useState(false);

  const logout = useCallback(() => {
    signOut({ callbackUrl: "/admin/login" });
  }, []);

  useEffect(() => {
    const endTime = Date.now() + SESSION_MS;

    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
      setSecondsLeft(remaining);

      if (remaining <= WARN_THRESHOLD_S) setShowWarning(true);
      if (remaining === 0) {
        clearInterval(interval);
        logout();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [logout]);

  if (!showWarning) return null;

  const mins = Math.floor(secondsLeft / 60);
  const secs = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-up">
      <div className="bg-[#0e2247] text-white rounded-2xl shadow-2xl shadow-black/30 border border-white/10 p-5 w-80">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 bg-amber-500/20 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
            <Clock size={16} className="text-amber-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm">Oturum Sona Eriyor</p>
            <p className="text-white/60 text-xs mt-1 leading-relaxed">
              <span className="text-amber-400 font-bold text-base">{mins}:{secs}</span>{" "}
              içinde otomatik çıkış yapılacak.
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-white/8 hover:bg-red-500/20 text-white/70 hover:text-red-400 text-xs font-semibold py-2.5 rounded-xl transition-all"
        >
          <LogOut size={13} /> Şimdi Çıkış Yap
        </button>
      </div>
    </div>
  );
}
