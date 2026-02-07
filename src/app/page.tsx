import Link from "next/link"

export default function Page() {
  return (
    <main className="h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow flex flex-col gap-4">
        <h1 className="text-xl font-semibold">Bem-vindo</h1>

        <Link href="/login" className="underline">
          Ir para login
        </Link>
      </div>
    </main>
  )
}