"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { api } from "@/services/api"

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    const cleanPassword = password.trim()

    if (!email || !cleanPassword) {
      setError("E-mail ou senha inválidos")
      return
    }

    try {
      setLoading(true)

      await api.post("/auth/login", {
        email,
        password: cleanPassword,
      })

      router.push("/home")
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError("Credenciais inválidas")
      } else if (err.response?.data?.detail) {
        setError(err.response.data.detail)
      } else {
        setError("Erro inesperado ao realizar login")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8 space-y-6"
        >
          {/* Logo/Ícone */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4">
              <span className="text-3xl font-bold text-white">T</span>
            </div>
            <h1 className="text-2xl font-bold text-emerald-600 mb-2">
              Entrar
            </h1>
            <p className="text-sm text-gray-500">
              Acesse sua conta e gerencie sua tribo
            </p>
          </div>

          {/* Campo E-mail */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                required
              />
            </div>
          </div>

          {/* Campo Senha */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                required
              />
            </div>
          </div>

          {/* Mensagem de erro */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Botão */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold py-3 rounded-lg hover:from-emerald-600 hover:to-teal-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/30"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          {/* Link para registro */}
          <div className="text-center text-sm text-gray-600">
            Não tem uma conta?{" "}
            <Link
              href="/register"
              className="text-emerald-600 font-semibold hover:text-emerald-700 hover:underline"
            >
              Registre-se
            </Link>
          </div>
        </form>

        {/* Termos */}
        <p className="text-center text-xs text-gray-500 mt-6">
          Ao continuar, você concorda com nossos{" "}
          <a href="#" className="text-emerald-600 hover:underline">
            Termos de Serviço
          </a>{" "}
          e{" "}
          <a href="#" className="text-emerald-600 hover:underline">
            Política de Privacidade
          </a>
        </p>
      </div>
    </main>
  )
}