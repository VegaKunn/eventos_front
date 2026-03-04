"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "../components/Card";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3333/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const { data } = await response.json();

      if (!response.ok) {
        alert("Email ou senha inválidos");
        return;
      }

      // ⚠️ IMPORTANTE
      // Veja no console como seu token está vindo
      console.log("LOGIN RESPONSE:", data);

      // Normalmente no Adonis 6 vem assim:
      // { type: 'bearer', token: 'xxxxx' }

      localStorage.setItem("token", data.token);

      alert("Login realizado com sucesso!");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com o servidor");
    }
  }

  return (
    <Card>
      <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

      <form className="space-y-4" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
        >
          Entrar
        </button>
      </form>

      <p className="text-sm text-center mt-4">
        Não tem conta?{" "}
        <a href="/register" className="text-blue-600 font-semibold">
          Criar conta
        </a>
      </p>
    </Card>
  );
}
