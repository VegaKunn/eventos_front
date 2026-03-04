export default function CreateEventPage() {
  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
      <h1 className="text-2xl font-bold text-center mb-6">Criar Evento</h1>

      <form className="space-y-4">
        <input
          type="text"
          placeholder="Título do evento"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <textarea
          placeholder="Descrição"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Data */}
        <div>
          <label className="block text-sm font-semibold mb-1">Data</label>
          <input
            type="date"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Horário */}
        <div>
          <label className="block text-sm font-semibold mb-1">Horário</label>
          <input
            type="time"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <label className="block text-sm font-semibold mb-1">Localidade</label>
        <input
          type="text"
          placeholder="Local"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Cidade"
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="text"
            placeholder="Estado"
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">
            Link da imagem do evento
          </label>
          <input
            type="url"
            placeholder="https://exemplo.com/imagem.jpg"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
        >
          Salvar Evento
        </button>
      </form>
    </div>
  );
}
