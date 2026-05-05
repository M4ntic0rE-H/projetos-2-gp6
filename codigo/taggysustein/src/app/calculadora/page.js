"use client";
import React, { useState } from "react";
import { Calculator } from "lucide-react";

export default function Home() {
  const [tipoVeiculo, setTipoVeiculo] = useState("leve");
  const [tipoCombustivel, setTipoCombustivel] = useState("gasolina");
  const [totalPassagens, setTotalPassagens] = useState(1);

  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCalcular = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResultado(null);

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
      setResultado(data);
    } catch (err) {
      setError(
        "Falha de conexão com a API. Verifique se o servidor está ativo.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-6 text-zinc-900 font-sans selection:bg-emerald-200 selection:text-emerald-900">
      <div className="w-full max-w-[400px]">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 mb-4">
            <Calculator className="w-6 h-6 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Calculadora de Emissões
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Impacto evitado pelo uso de tag
          </p>
        </div>

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

        {resultado !== null && !error && (
          <div className="mt-8 text-center animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="inline-block p-6 w-full bg-white border border-zinc-100 shadow-sm rounded-2xl">
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">
                CO₂ Evitado
              </p>

              <div className="flex items-baseline justify-center gap-1.5 mb-5">
                <span className="text-5xl font-bold tracking-tighter text-zinc-900">
                  {(resultado.gramasCo2Evitados / 1000).toFixed(2)}
                </span>
                <span className="text-lg font-medium text-zinc-500">kg</span>
              </div>

              <div className="flex justify-around border-t border-zinc-100 pt-5">
                <div>
                  <p className="text-[10px] text-zinc-400 uppercase tracking-wider mb-1">
                    Árvores Salvas
                  </p>
                  <p className="text-lg font-semibold text-emerald-600">
                    {resultado.arvoresEquivalentes}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-400 uppercase tracking-wider mb-1">
                    Redução
                  </p>
                  <p className="text-lg font-semibold text-emerald-600">
                    {resultado.percentualReducao}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}