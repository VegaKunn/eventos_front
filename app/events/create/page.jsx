"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  Type,
  AlignLeft,
  Calendar,
  Clock,
  MapPin,
  Image as ImageIcon,
  SendHorizontal,
} from "lucide-react";

export default function CreateEventPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:3333/api/v1/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          event_date: eventDate,
          event_time: eventTime,
          location,
          city,
          state,
          image_url: imageUrl,
        }),
      });

      if (!response.ok) throw new Error("Erro ao criar evento");

      router.push("/dashboard");
    } catch (error) {
      alert("Erro ao criar evento. Verifique os dados.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 border border-white overflow-hidden">
        {/* Header do Formulário */}
        <div className="bg-indigo-600 p-8 text-white relative">
          <Link
            href="/dashboard"
            className="absolute top-8 left-6 text-indigo-100 hover:text-white transition-colors"
          >
            <ChevronLeft size={24} />
          </Link>
          <div className="text-center">
            <h1 className="text-3xl font-black tracking-tight">Novo Evento</h1>
            <p className="text-indigo-100 mt-2 font-medium">
              Preencha os detalhes da sua experiência
            </p>
          </div>
        </div>

        <form className="p-10 space-y-6" onSubmit={handleSubmit}>
          {/* Título */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
              <Type size={16} className="text-indigo-500" /> Título do Evento
            </label>
            <input
              required
              type="text"
              placeholder="Ex: Workshop de Design"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium text-slate-700 placeholder:text-slate-400"
            />
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
              <AlignLeft size={16} className="text-indigo-500" /> Descrição
            </label>
            <textarea
              rows={3}
              placeholder="Conte mais sobre o que vai rolar..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium text-slate-700 placeholder:text-slate-400"
            />
          </div>

          {/* Data e Hora */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                <Calendar size={16} className="text-indigo-500" /> Data
              </label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium text-slate-700 shadow-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                <Clock size={16} className="text-indigo-500" /> Horário
              </label>
              <input
                type="time"
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
                className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium text-slate-700 shadow-sm"
              />
            </div>
          </div>

          {/* Localização */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
              <MapPin size={16} className="text-indigo-500" /> Local (Endereço
              ou Link)
            </label>
            <input
              type="text"
              placeholder="Rua Exemplo, 123 ou link do Zoom"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium text-slate-700 shadow-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Cidade"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium text-slate-700 shadow-sm"
            />
            <input
              type="text"
              placeholder="Estado (Ex: SP)"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium text-slate-700 shadow-sm"
            />
          </div>

          {/* Imagem */}
          <div className="space-y-4">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
              <ImageIcon size={16} className="text-indigo-500" /> Imagem de Capa
              (URL)
            </label>
            <input
              type="url"
              placeholder="https://suaimagem.com/foto.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium text-slate-700 shadow-sm"
            />

            {/* Preview da Imagem */}
            {imageUrl && (
              <div className="relative h-32 w-full rounded-2xl overflow-hidden border-2 border-dashed border-slate-200">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center text-slate-500 font-bold text-xs uppercase">
                  Preview da Capa
                </div>
              </div>
            )}
          </div>

          {/* Botão de Ação */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] shadow-xl ${
              isSubmitting
                ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200"
            }`}
          >
            {isSubmitting ? (
              "Criando..."
            ) : (
              <>
                <SendHorizontal size={22} /> Publicar Evento
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
