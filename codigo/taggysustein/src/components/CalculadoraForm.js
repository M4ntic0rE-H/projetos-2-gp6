import { useState } from "react";

export default function CalculadoraForm({ onCalculateSuccess }) {
  const [tipoVeiculo, setTipoVeiculo] = useState("leve");
  const [tipoCombustivel, setTipoCombustivel] = useState("gasolina");
  const [totalPassagens, setTotalPassagens] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCalcular = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    onCalculateSuccess(null); // Clear previous results while loading

    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/calculo/impacto",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tipoVeiculo,
            tipoCombustivel,
            totalPassagens,
          }),
        },
      );

      if (!response.ok) throw new Error("Erro na resposta do servidor.");

      const data = await response.json();
      onCalculateSuccess(data);
    } catch (err) {
      setError(
        "Falha de conexão com a API. Verifique se o servidor está ativo.",
      );
      onCalculateSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleCalcular} className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-zinc-600">
            Tipo de Veículo
          </label>
          <select
            value={tipoVeiculo}
            onChange={(e) => setTipoVeiculo(e.target.value)}
            className="w-full bg-white border border-zinc-200 text-zinc-800 text-sm p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow cursor-pointer"
          >
            <option value="leve">Leve (Carro)</option>
            <option value="pesado">Pesado (Caminhão/Ônibus)</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-zinc-600">
            Combustível
          </label>
          <select
            value={tipoCombustivel}
            onChange={(e) => setTipoCombustivel(e.target.value)}
            className="w-full bg-white border border-zinc-200 text-zinc-800 text-sm p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow cursor-pointer"
          >
            <option value="gasolina">Gasolina</option>
            <option value="etanol">Etanol</option>
            <option value="diesel">Diesel</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-zinc-600">
            Total de Passagens
          </label>
          <input
            type="number"
            min="1"
            value={totalPassagens}
            onChange={(e) => setTotalPassagens(Number(e.target.value))}
            className="w-full bg-white border border-zinc-200 text-zinc-800 text-sm p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-sm py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-2"
        >
          {loading ? "Calculando..." : "Calcular Impacto"}
        </button>
      </form>

      {error && (
        <div className="mt-6 p-4 rounded-lg bg-red-50 text-red-600 text-sm text-center">
          {error}
        </div>
      )}
    </>
  );
}
