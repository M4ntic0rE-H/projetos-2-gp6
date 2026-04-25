"use client";
import React, { useState } from "react";

export default function Home() {
  const [tipoVeiculo, setTipoVeiculo] = useState("leve");
  const [tipoCombustivel, setTipoCombustivel] = useState("gasolina");
  const [totalPassagens, setTotalPassagens] = useState(1);

  // Valores de emissões evitadas (em gramas) por passagem baseados no seu racional
  const calcularEmissoesEvitadas = () => {
    let evitadoPorPassagem = 0;

    if (tipoVeiculo === "leve" && tipoCombustivel === "gasolina") {
      evitadoPorPassagem = 94.46;
    } else if (tipoVeiculo === "leve" && tipoCombustivel === "etanol") {
      evitadoPorPassagem = 63.23;
    } else if (tipoVeiculo === "pesado" && tipoCombustivel === "diesel") {
      evitadoPorPassagem = 306.48;
    } else {
      // Valor padrão genérico caso escolha uma combinação não mapeada
      evitadoPorPassagem = 94.46;
    }

    // Retorna o valor total em Kg (dividindo por 1000)
    return ((evitadoPorPassagem * totalPassagens) / 1000).toFixed(2);
  };

  const resultadoKg = calcularEmissoesEvitadas();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-gray-200">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Calculadora Taggy
        </h1>

        <div className="space-y-4">
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
        </div>

        <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded text-center">
          <p className="text-sm text-green-800 mb-1">Emissões de CO₂ evitadas:</p>
          <p className="text-3xl font-bold text-green-600">{resultadoKg} kg</p>
        </div>
      </div>
    </div>
  );
}
