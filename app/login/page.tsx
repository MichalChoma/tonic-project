import { LoginForm } from "./components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-zinc-50">TypeRacer</h1>
          <p className="mt-2 text-sm text-zinc-500">Sign in to continue</p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
