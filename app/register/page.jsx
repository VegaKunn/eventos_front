"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "../components/Card";

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3333/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert("Erro ao criar conta");
        console.log(data);
        return;
      }

      // 🔥 OPÇÃO PROFISSIONAL:
      // Já faz login automático após cadastro

      const loginResponse = await fetch(
        "http://localhost:3333/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      );

      const loginData = await loginResponse.json();
      return console.log(loginData);
      if (!loginResponse.ok) {
        alert("Conta criada, mas erro ao fazer login.");
        router.push("/login");
        return;
      }
      // ⚠️ Ajuste se o formato do token for diferente
      localStorage.setItem("token", loginData.data);

      alert("Conta criada com sucesso!");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com o servidor");
    }
  }

  return (
    <Card>
      <h1 className="text-2xl font-bold text-center mb-6">Criar Conta</h1>

      <form className="space-y-4" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nome"
          value={fullName}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

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
          Registrar
        </button>
      </form>

      <p className="text-sm text-center mt-4">
        Já tem conta?{" "}
        <a href="/login" className="text-blue-600 font-semibold">
          Entrar
        </a>
      </p>
    </Card>
  );
}
