import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Meus Eventos</h1>

        <Link
          href="/events/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Novo Evento
        </Link>
      </div>

      <div className="space-y-4">
        <Link
          href="/events/1"
          className="block p-4 border rounded-lg hover:shadow-md transition"
        >
          <h2 className="font-semibold text-lg">Workshop de React</h2>
          <p className="text-sm text-gray-600">
            10/06/2026 - 19:00 - São Paulo / SP
          </p>
        </Link>

        <Link
          href="/events/2"
          className="block p-4 border rounded-lg hover:shadow-md transition"
        >
          <h2 className="font-semibold text-lg">Feira de Tecnologia</h2>
          <p className="text-sm text-gray-600">15/07/2026 - 14:30 - Online</p>
        </Link>
      </div>
    </div>
  );
}
