"use client";

import { useState } from "react";

export default function EventsPage() {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  // Dados mockados
  const events = [
    {
      id: 1,
      title: "Workshop de React",
      city: "São Paulo",
      state: "SP",
      date: "10/06/2026",
    },
    {
      id: 2,
      title: "Feira Tech",
      city: "Rio de Janeiro",
      state: "RJ",
      date: "15/07/2026",
    },
  ];

  const filteredEvents = events.filter((event) => {
    return (
      (city === "" || event.city.toLowerCase().includes(city.toLowerCase())) &&
      (state === "" || event.state.toLowerCase().includes(state.toLowerCase()))
    );
  });

  return (
    <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-xl">
      <h1 className="text-2xl font-bold mb-6">Buscar Eventos</h1>

      {/* Filtros */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Filtrar por cidade"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          placeholder="Filtrar por estado"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Lista */}
      <div className="space-y-4">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="p-4 border rounded-lg hover:shadow-md transition"
          >
            <h2 className="font-semibold text-lg">{event.title}</h2>
            <p className="text-sm text-gray-600">
              {event.date} - {event.city} / {event.state}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
