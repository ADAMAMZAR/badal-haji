import { LoginForm } from "@/components/admin/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="font-display text-2xl font-semibold text-white">AmanahHaji</h1>
          <p className="mt-1 text-sm text-slate-400">Log masuk ke panel pentadbir</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
