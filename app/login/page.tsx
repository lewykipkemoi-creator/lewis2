import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-paper text-ink flex items-center justify-center px-6">
      <div className="w-full max-w-sm border border-ink/20 p-8">
        <Link href="/" className="text-sm font-mono text-ink/45 hover:text-ink">
          ← Back home
        </Link>
        <h1 className="font-serif text-2xl font-semibold mt-6">Log in to Lewy AI</h1>
        <p className="text-ink/55 text-sm mt-2 leading-6">
          Login form coming soon.
        </p>
      </div>
    </main>
  );
}
