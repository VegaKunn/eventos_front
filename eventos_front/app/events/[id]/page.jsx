"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function EventDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/login");
    if (id) fetchEvent(token);
  }, [id]);

  async function fetchEvent(token) {
    try {
      // Pega os dados do evento
      const res = await fetch(`http://localhost:3333/api/v1/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Evento não encontrado");
      const data = await res.json();
      setEvent(data);

      // Pega likes do evento e se o usuário já curtiu
      const likeRes = await fetch(
        `http://localhost:3333/api/v1/events/${id}/likes`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      const likeData = await likeRes.json();

      // espera que o backend retorne algo tipo: { total: 5, userLiked: true }
      setLikesCount(likeData.total || 0);
      setLiked(likeData.userLiked || false);
    } catch (err) {
      console.error(err);
      alert("Erro ao carregar evento");
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  }

  async function toggleLike() {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/login");

    try {
      const res = await fetch(
        `http://localhost:3333/api/v1/events/${id}/like`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await res.json();
      setLiked(data.liked);

      // Ajusta contador dinamicamente
      setLikesCount((prev) => prev + (data.liked ? 1 : -1));
    } catch (err) {
      console.error(err);
      alert("Erro ao dar like");
    }
  }

  if (loading) return <p>Carregando...</p>;
  if (!event) return null;
  console.log(event);
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
          <span className="font-semibold">Data:</span> {event.eventDate}
        </p>
        <p>
          <span className="font-semibold">Horário:</span> {event.eventTime}
        </p>
        <p>
          <span className="font-semibold">Local:</span> {event.location} -{" "}
          {event.city} / {event.state}
        </p>
        <div>
          <span className="font-semibold">Descrição:</span>
          <p className="mt-2">{event.description}</p>
        </div>
        <p className="font-semibold mt-2">Participando: {likesCount}</p>
      </div>

      <div className="flex gap-4 mt-6">
        <Link href="/dashboard" className="text-blue-600 font-semibold">
          ← Voltar
        </Link>

        <button
          onClick={toggleLike}
          className={`px-4 py-2 rounded-lg text-white transition ${
            liked
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-500 hover:bg-gray-600"
          }`}
        >
          {liked ? "Participando" : "Vou Participar"}
        </button>
      </div>
    </div>
  );
}
