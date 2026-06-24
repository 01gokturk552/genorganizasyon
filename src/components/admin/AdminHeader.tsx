"use client";

import { signOut } from "next-auth/react";
import { LogOut, Bell } from "lucide-react";

interface Props {
  user?: { name?: string | null; email?: string | null };
}

export default function AdminHeader({ user }: Props) {
  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : (user?.email?.[0] ?? "A").toUpperCase();

  return (
    <header className="bg-white border-b border-gray-100 px-6 h-14 flex items-center justify-between shrink-0">
      <div />
      <div className="flex items-center gap-2">
        <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
          <Bell size={15} />
        </button>
        <div className="w-px h-5 bg-gray-100 mx-1" />
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#0e2247] rounded-xl flex items-center justify-center">
            <span className="text-[#4e8ac4] text-xs font-black">{initials}</span>
          </div>
          <span className="text-sm font-medium text-gray-700 max-w-[160px] truncate">
            {user?.name || user?.email}
          </span>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all px-2.5 py-1.5 rounded-lg"
        >
          <LogOut size={13} /> Çıkış
        </button>
      </div>
    </header>
  );
}
