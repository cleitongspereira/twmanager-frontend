"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { api } from "@/services/api"

export default function RegisterPage() {
  const router = useRouter()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [nickname, setNickname] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    const cleanPassword = password.trim()

    if (!cleanPassword) {
      setError("Senha inválida")
      return
    }

    try {
      setLoading(true)

      await api.post("/auth/register", {
        name,
        email,
        nickname,
        password: cleanPassword,
      })

      router.push("/login")
    } catch (err: any) {
      if (err.response?.data?.detail) {
        setError(err.response.data.detail)
      } else {
        setError("Erro inesperado ao criar usuário")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-gradient-to-b from-amber-50 to-orange-50 rounded-2xl shadow-2xl p-8 space-y-6 border-2 border-amber-200"
        >
          {/* Logo/Ícone */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-600 to-orange-700 rounded-2xl mb-4 shadow-lg">
              <span className="text-3xl font-bold text-amber-50">T</span>
            </div>
            <h1 className="text-2xl font-bold text-amber-900 mb-2">
              Criar Conta
            </h1>
            <p className="text-sm text-amber-700">
              Comece a gerenciar sua tribo hoje mesmo
            </p>
          </div>

          {/* Campo Nome */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-amber-900">
              Nome
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
                className="w-full pl-10 pr-4 py-3 bg-amber-50 border-2 border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition text-amber-900 placeholder-amber-400"
                required
              />
            </div>
          </div>

          {/* Campo E-mail */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-amber-900">
              E-mail
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-amber-600"
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
                className="w-full pl-10 pr-4 py-3 bg-amber-50 border-2 border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition text-amber-900 placeholder-amber-400"
                required
              />
            </div>
          </div>

          {/* Campo Nickname */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-amber-900">
              Nick no jogo
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Seu nick"
                className="w-full pl-10 pr-4 py-3 bg-amber-50 border-2 border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition text-amber-900 placeholder-amber-400"
                required
              />
            </div>
          </div>

          {/* Campo Senha */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-amber-900">
              Senha
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-amber-600"
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
                className="w-full pl-10 pr-4 py-3 bg-amber-50 border-2 border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition text-amber-900 placeholder-amber-400"
                required
              />
            </div>
          </div>

          {/* Mensagem de erro */}
          {error && (
            <div className="bg-red-50 border-2 border-red-300 text-red-800 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Botão */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-600 to-orange-700 text-amber-50 font-semibold py-3 rounded-lg hover:from-amber-700 hover:to-orange-800 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {loading ? "Criando conta..." : "Criar Conta"}
          </button>

          {/* Link para login */}
          <div className="text-center text-sm text-amber-700">
            Já tem uma conta?{" "}
            <Link
              href="/login"
              className="text-amber-800 font-semibold hover:text-amber-900 hover:underline"
            >
              Entrar
            </Link>
          </div>
        </form>

        {/* Termos */}
        <p className="text-center text-xs text-amber-700 mt-6">
          Ao continuar, você concorda com nossos{" "}
          <a href="#" className="text-amber-800 hover:underline font-medium">
            Termos de Serviço
          </a>{" "}
          e{" "}
          <a href="#" className="text-amber-800 hover:underline font-medium">
            Política de Privacidade
          </a>
        </p>
      </div>
    </main>
  )
}