"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  Search,
  MapPin,
  Calendar,
  ArrowRight,
  FilterX,
  Sparkles,
  MapIcon,
} from "lucide-react";
import { formatarData } from "../utils/formatarData";

export default function DashboardPage() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/login");
    fetchEvents(token);
  }, []);

  async function fetchEvents(token) {
    try {
      const response = await fetch("http://localhost:3333/api/v1/events", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const filteredEvents = events.filter((event) => {
    return (
      (city === "" || event.city?.toLowerCase().includes(city.toLowerCase())) &&
      (state === "" || event.state?.toLowerCase().includes(state.toLowerCase()))
    );
  });

  return (
    /* WRAPPER PRINCIPAL: 
       - bg-gray-50 cria o contraste com os cards brancos
       - py-12 garante que não grude no topo/rodapé 
    */
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header com Sombra 3D Suave */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-10 rounded-[2.5rem] shadow-xl shadow-indigo-100/50 border border-white">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-2 w-8 bg-indigo-600 rounded-full" />
              <span className="text-indigo-600 font-bold text-sm uppercase tracking-widest">
                Dashboard
              </span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 flex items-center gap-3">
              Eventos{" "}
              <Sparkles className="text-amber-400 fill-amber-400" size={28} />
            </h1>
          </div>

          <Link
            href="/events/create"
            className="group flex items-center gap-3 bg-indigo-600 text-white px-8 py-4 rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95 font-bold"
          >
            <Plus size={22} strokeWidth={3} />
            <span>Criar Novo</span>
          </Link>
        </header>

        {/* Barra de Busca Estilo "Floating" */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative group">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder="Buscar por cidade..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full pl-14 pr-6 py-5 bg-white border-none rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none shadow-lg shadow-slate-200/50 text-slate-700 placeholder:text-slate-400 transition-all font-medium"
            />
          </div>

          <div className="relative group">
            <MapIcon
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder="Estado (Ex: SP)..."
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full pl-14 pr-6 py-5 bg-white border-none rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none shadow-lg shadow-slate-200/50 text-slate-700 placeholder:text-slate-400 transition-all font-medium"
            />
          </div>
        </section>

        {/* Grid de Eventos */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-64 bg-slate-200 animate-pulse rounded-[2rem]"
              />
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-24 bg-white/50 rounded-[3rem] border-2 border-dashed border-slate-200">
            <FilterX
              size={60}
              className="mx-auto text-slate-300 mb-6"
              strokeWidth={1.5}
            />
            <h3 className="text-2xl font-bold text-slate-800">
              Nada encontrado
            </h3>
            <p className="text-slate-500 max-w-xs mx-auto mt-2">
              Parece que não temos eventos registrados nesses filtros por
              enquanto.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredEvents.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.id}`}
                className="group relative bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/60 hover:shadow-2xl hover:shadow-indigo-100 hover:-translate-y-2 transition-all duration-300 overflow-hidden"
              >
                {/* Indicador Lateral de Hover */}
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-indigo-600 scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />

                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="bg-slate-100 text-slate-600 text-[11px] font-black uppercase tracking-[0.15em] px-4 py-1.5 rounded-full">
                      📍 {event.city} - {event.state}
                    </span>
                    <ArrowRight
                      size={22}
                      className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-2 transition-all"
                    />
                  </div>

                  <h2 className="text-2xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">
                    {event.title}
                  </h2>

                  <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500 font-bold border-t border-slate-50 pt-6">
                    <div className="flex items-center gap-2 bg-blue-50/50 text-blue-700 px-3 py-1.5 rounded-lg">
                      <Calendar size={18} />
                      {formatarData(event.eventDate)}
                    </div>
                    <div className="flex items-center gap-2 bg-amber-50/50 text-amber-700 px-3 py-1.5 rounded-lg">
                      <MapPin size={18} />
                      {event.location}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
