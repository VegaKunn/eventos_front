"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  ChevronLeft,
  Users,
  Heart,
} from "lucide-react";
import { formatarData } from "@/app/utils/formatarData";

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
      const res = await fetch(`http://localhost:3333/api/v1/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Evento não encontrado");
      const data = await res.json();
      setEvent(data);

      const likeRes = await fetch(
        `http://localhost:3333/api/v1/events/${id}/likes`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const likeData = await likeRes.json();
      setLikesCount(likeData.total || 0);
      setLiked(likeData.userLiked || false);
    } catch (err) {
      console.error(err);
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
      setLikesCount((prev) => prev + (data.liked ? 1 : -1));
    } catch (err) {
      alert("Erro ao processar sua participação");
    }
  }

  if (loading) {
    return (
      <div className="w-full max-w-2xl animate-pulse bg-gray-100 h-[400px] md:h-[500px] rounded-2xl" />
    );
  }

  if (!event) return null;

  return (
    <div className="w-full max-w-2xl bg-white/80 backdrop-blur-md border border-gray-100 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden transition-all mx-auto">
      {/* Header com Imagem */}
      <div className="relative h-48 md:h-72 w-full">
        {event.imageUrl ? (
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Calendar className="text-white w-12 h-12 md:w-16 md:h-16 opacity-50" />
          </div>
        )}
        <div className="absolute top-4 left-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 bg-white/90 hover:bg-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold text-gray-800 shadow-lg transition-transform active:scale-95"
          >
            <ChevronLeft size={16} /> Voltar
          </Link>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-5 md:p-8">
        <div className="flex justify-between items-start mb-4 md:mb-6">
          <div className="flex-1 pr-4">
            <span className="text-indigo-600 font-bold text-[10px] md:text-xs uppercase tracking-widest bg-indigo-50 px-2 py-0.5 md:px-3 md:py-1 rounded-full">
              {event.city} • {event.state}
            </span>
            <h1 className="text-2xl md:text-4xl font-black text-gray-900 mt-2 tracking-tight leading-tight">
              {event.title}
            </h1>
          </div>

          <div className="flex flex-col items-center bg-gray-50 p-2 md:p-3 rounded-xl md:rounded-2xl border border-gray-100 min-w-[70px]">
            <span className="text-lg md:text-2xl font-bold text-gray-800">
              {likesCount}
            </span>
            <span className="text-[8px] md:text-[10px] text-gray-500 uppercase font-bold text-center">
              Confirmados
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          {/* Data */}
          <div className="flex items-center gap-3 md:gap-4 text-gray-600">
            <div className="p-2 md:p-3 bg-blue-50 rounded-lg md:rounded-xl text-blue-600">
              <Calendar size={18} className="md:w-5 md:h-5" />
            </div>
            <div>
              <p className="text-[10px] md:text-xs text-gray-400 font-medium">
                Data
              </p>
              <p className="text-sm md:text-base font-semibold">
                {formatarData(event.eventDate)}
              </p>
            </div>
          </div>

          {/* Horário */}
          <div className="flex items-center gap-3 md:gap-4 text-gray-600">
            <div className="p-2 md:p-3 bg-amber-50 rounded-lg md:rounded-xl text-amber-600">
              <Clock size={18} className="md:w-5 md:h-5" />
            </div>
            <div>
              <p className="text-[10px] md:text-xs text-gray-400 font-medium">
                Horário
              </p>
              <p className="text-sm md:text-base font-semibold">
                {event.eventTime}
              </p>
            </div>
          </div>

          {/* Localização */}
          <div className="flex items-center gap-3 md:gap-4 text-gray-600 md:col-span-2">
            <div className="p-2 md:p-3 bg-rose-50 rounded-lg md:rounded-xl text-rose-600">
              <MapPin size={18} className="md:w-5 md:h-5" />
            </div>
            <div>
              <p className="text-[10px] md:text-xs text-gray-400 font-medium">
                Localização
              </p>
              <p className="text-sm md:text-base font-semibold">
                {event.location}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-5 md:pt-6">
          <h3 className="text-base md:text-lg font-bold text-gray-800 mb-2 md:mb-3">
            Sobre o evento
          </h3>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed italic">
            "{event.description}"
          </p>
        </div>

        {/* Botão de Ação Responsivo */}
        <button
          onClick={toggleLike}
          className={`w-full mt-6 md:mt-8 py-3.5 md:py-4 rounded-xl md:rounded-2xl font-bold text-base md:text-lg flex items-center justify-center gap-2 md:gap-3 transition-all transform active:scale-[0.98] shadow-lg ${
            liked
              ? "bg-green-500 hover:bg-green-600 text-white shadow-green-200"
              : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200"
          }`}
        >
          {liked ? (
            <>
              <Heart fill="currentColor" size={20} className="md:w-[22px]" />{" "}
              Estou dentro!
            </>
          ) : (
            <>
              <Users size={20} className="md:w-[22px]" /> Garantir minha vaga
            </>
          )}
        </button>
      </div>
    </div>
  );
}
