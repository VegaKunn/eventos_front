import Card from "../components/Card";

export default function RegisterPage() {
  return (
    <Card>
      <h1 className="text-2xl font-bold text-center mb-6">Criar Conta</h1>

      <form className="space-y-4">
        <input
          type="text"
          placeholder="Nome"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          placeholder="Senha"
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
