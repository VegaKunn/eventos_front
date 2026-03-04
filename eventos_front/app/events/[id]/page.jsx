"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function EventDetailsPage() {
  const router = useRouter();
  const params = useParams(); // ✅ forma correta no Next 15
  const id = params.id;

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    if (id) {
      fetchEvent(token);
    }
  }, [id]);

  async function fetchEvent(token) {
    try {
      const response = await fetch(
        `http://localhost:3333/api/v1/events/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Evento não encontrado");
      }

      const data = await response.json();
      setEvent(data);
    } catch (error) {
      console.error(error);
      alert("Evento não encontrado");
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl">
        <p>Carregando evento...</p>
      </div>
    );
  }

  if (!event) return null;

  return (
    <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl">
      {event.image_url && (
        <img
          src={event.image_url}
          alt={event.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}

      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>

      <div className="space-y-3 text-gray-700">
        <p>
          <span className="font-semibold">Data:</span> {event.event_date}
        </p>

        <p>
          <span className="font-semibold">Horário:</span> {event.event_time}
        </p>

        <p>
          <span className="font-semibold">Local:</span> {event.location} -{" "}
          {event.city} / {event.state}
        </p>

        <div>
          <span className="font-semibold">Descrição:</span>
          <p className="mt-2">{event.description}</p>
        </div>
      </div>

      <Link
        href="/dashboard"
        className="inline-block mt-6 text-blue-600 font-semibold"
      >
        ← Voltar
      </Link>
    </div>
  );
}
