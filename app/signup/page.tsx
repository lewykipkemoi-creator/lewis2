import Link from "next/link";

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-paper text-ink flex items-center justify-center px-6">
      <div className="w-full max-w-sm border border-ink/20 p-8">
        <Link href="/" className="text-sm font-mono text-ink/45 hover:text-ink">
          ← Back home
        </Link>
        <h1 className="font-serif text-2xl font-semibold mt-6">Create your Lewy AI account</h1>
        <p className="text-ink/55 text-sm mt-2 leading-6">
          Signup form coming soon.
        </p>
      </div>
    </main>
  );
}
