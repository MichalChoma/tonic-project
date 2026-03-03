"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const { username, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between border-b border-zinc-800 bg-zinc-950/80 px-6 py-3 backdrop-blur-sm">
      <span className="font-mono font-bold text-zinc-50">TypeRacer</span>

      {username && (
        <div className="flex items-center gap-4">
          <span className="text-sm text-zinc-400">Hello {username}</span>
          <button
            onClick={handleLogout}
            className="text-sm text-zinc-500 transition hover:text-zinc-50"
          >
            Sign out
          </button>
        </div>
      )}
    </nav>
  );
};
