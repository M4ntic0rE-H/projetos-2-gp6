"use client";
import React, { useState } from "react";

export default function Home() {
  const [tipoVeiculo, setTipoVeiculo] = useState("leve");
  const [tipoCombustivel, setTipoCombustivel] = useState("gasolina");
  const [totalPassagens, setTotalPassagens] = useState(1);
  
  const [resultadoKg, setResultadoKg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCalcular = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResultadoKg(null);

    try {
      // Importante: Substitua esta URL pela URL real onde seu backend Python (FastAPI/Flask) está rodando.
      // Geralmente é algo como http://localhost:8000/calcular ou similar.
      const response = await fetch("http://localhost:8000/calcular", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tipoVeiculo,
          tipoCombustivel,
          totalPassagens
        }),
      });

      if (!response.ok) {
        throw new Error("Erro na resposta do servidor.");
      }

      const data = await response.json();
      
      // Aqui estou assumindo que seu backend vai retornar um JSON com a chave "resultadoKg"
      // Exemplo: { "resultadoKg": "24.94" }
      setResultadoKg(data.resultadoKg);
    } catch (err) {
      setError("Falha ao conectar com o backend. Verifique se a API está rodando.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-gray-200">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Calculadora Taggy
        </h1>

        <form onSubmit={handleCalcular} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Veículo
            </label>
            <select
              value={tipoVeiculo}
              onChange={(e) => setTipoVeiculo(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
            >
              <option value="leve">Veículo Leve (Carro)</option>
              <option value="pesado">Veículo Pesado (Caminhão/Ônibus)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Combustível
            </label>
            <select
              value={tipoCombustivel}
              onChange={(e) => setTipoCombustivel(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
            >
              <option value="gasolina">Gasolina</option>
              <option value="etanol">Etanol</option>
              <option value="diesel">Diesel</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total de Passagens
            </label>
            <input
              type="number"
              min="1"
              value={totalPassagens}
              onChange={(e) => setTotalPassagens(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-70 transition-colors"
          >
            {loading ? "Calculando no servidor..." : "Calcular Impacto"}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-3 bg-red-50 text-red-700 border border-red-200 rounded text-sm text-center">
            {error}
          </div>
        )}

        {resultadoKg !== null && !error && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded text-center">
            <p className="text-sm text-green-800 mb-1">Emissões de CO₂ evitadas:</p>
            <p className="text-3xl font-bold text-green-600">{resultadoKg} kg</p>
          </div>
        )}
      </div>
    </div>
  );
}
