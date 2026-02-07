"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { api } from "@/services/api"
import { Input } from "@/components/Input"
import { Button } from "@/components/Button"

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
    <main className="h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow flex flex-col gap-4 w-80"
      >
        <h1 className="text-lg font-semibold">Criar conta</h1>

        <Input label="Nome" value={name} onChange={e => setName(e.target.value)} />
        <Input label="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
        <Input
          label="Nick no jogo"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
        />
        <Input
          label="Senha"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <Button
          type="submit"
          text={loading ? "Criando..." : "Criar usuário"}
          disabled={loading}
        />
      </form>
    </main>
  )
}