export default function EventDetailsPage({ params }) {
  const { id } = params;

  // Simulação de dados (depois você conecta com API)
  const event = {
    id,
    title: "Workshop de React",
    description: "Evento voltado para aprendizado de React e boas práticas.",
    date: "10/06/2026",
    time: "19:00",
    location: "São Paulo",
  };

  return (
    <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl">
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>

      <div className="space-y-3 text-gray-700">
        <p>
          <span className="font-semibold">Data:</span> {event.date}
        </p>

        <p>
          <span className="font-semibold">Horário:</span> {event.time}
        </p>

        <p>
          <span className="font-semibold">Local:</span> {event.location}
        </p>

        <div>
          <span className="font-semibold">Descrição:</span>
          <p className="mt-2">{event.description}</p>
        </div>
      </div>

      <a
        href="/dashboard"
        className="inline-block mt-6 text-blue-600 font-semibold"
      >
        ← Voltar
      </a>
    </div>
  );
}
