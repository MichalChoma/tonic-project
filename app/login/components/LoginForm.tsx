"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { mockLogin } from "@/lib/auth";

export function LoginForm() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isPending, error } = useMutation({
    mutationFn: mockLogin,
    onSuccess: (data) => {
      login(data.token, data.username);
      router.push("/");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutate({ username, password });
      }}
      className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-8"
    >
      <div className="space-y-1">
        <label htmlFor="username" className="text-xs font-medium uppercase tracking-widest text-zinc-400">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="demo"
          required
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-zinc-50 placeholder-zinc-600 outline-none transition focus:border-zinc-500"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="password" className="text-xs font-medium uppercase tracking-widest text-zinc-400">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-zinc-50 placeholder-zinc-600 outline-none transition focus:border-zinc-500"
        />
      </div>

      {error && (
        <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-400">
          {error.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-zinc-50 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
