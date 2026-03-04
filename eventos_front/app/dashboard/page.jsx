"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const [events, setEvents] = useState([]);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetchEvents(token);
  }, []);

  async function fetchEvents(token) {
    try {
      const response = await fetch("http://localhost:3333/api/v1/events", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar eventos");
      }

      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar eventos");
    }
  }

  const filteredEvents = events.filter((event) => {
    return (
      (city === "" || event.city?.toLowerCase().includes(city.toLowerCase())) &&
      (state === "" || event.state?.toLowerCase().includes(state.toLowerCase()))
    );
  });

  return (
    <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Eventos</h1>

        <Link
          href="/events/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Novo Evento
        </Link>
      </div>

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

      {/* Lista de eventos */}
      <div className="space-y-4">
        {filteredEvents.length === 0 && (
          <p className="text-gray-500">Nenhum evento encontrado.</p>
        )}

        {filteredEvents.map((event) => (
          <Link
            key={event.id}
            href={`/events/${event.id}`}
            className="block p-4 border rounded-lg hover:shadow-md transition"
          >
            <h2 className="font-semibold text-lg">{event.title}</h2>
            <p className="text-sm text-gray-600">
              {event.event_date} - {event.event_time} - {event.city} /{" "}
              {event.state}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
