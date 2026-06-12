"use client";

import React, { useState, useEffect } from "react";
import {
  Car,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Veiculos({ userName }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ role: "", vehicles: [] });

  const fetchVehicles = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return { role: "B2C", vehicles: [] };

      const now = new Date();
      const months = [];
      for (let i = 0; i < 6; i++) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        months.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
      }

      for (const month of months) {
        try {
          const response = await fetch(`/api/calculos/b2b/usuario/${userId}?mes=${month}`);
          if (!response.ok) continue;

          const result = await response.json();
          const items = Array.isArray(result) ? result : [];
          if (items.length === 0) continue;

          const seen = new Set();
          const unique = items.filter((item) => {
            if (seen.has(item.veiculoInfo)) return false;
            seen.add(item.veiculoInfo);
            return true;
          });

          const vehicles = unique.map((item, idx) => {
            const info = (item.veiculoInfo || "").trim();
            const parts = info.split(" ");
            const lastPart = parts[parts.length - 1];
            const hasYear = /^\d{4}$/.test(lastPart);
            return {
              id: idx + 1,
              marca: parts[0] || "—",
              model: hasYear ? parts.slice(1, -1).join(" ") || parts[0] || "—" : parts.slice(1).join(" ") || info || "—",
              year: hasYear ? lastPart : "—",
              status: "Ativo",
              type: "Sedan",
            };
          });

          return {
            role: vehicles.length > 1 ? "B2B" : "B2C",
            vehicles,
          };
        } catch (_) {}
      }

      return { role: "B2C", vehicles: [] };
    } catch (err) {
      console.error("Erro ao buscar veículos:", err);
      return { role: "B2C", vehicles: [] };
    }
  };

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchVehicles().then((res) => {
      if (isMounted) {
        setData(res);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [userName]);

  useGSAP(() => {
    if (!loading) {
      gsap.from(".vehicle-item", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      });
    }
  }, [loading]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Ativo":
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case "Manutenção":
        return <AlertCircle className="w-4 h-4 text-amber-500" />;
      default:
        return <div className="w-4 h-4 rounded-full bg-gray-300"></div>;
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Ativo":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Manutenção":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-[#065f46]/20 border-t-[#065f46] rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-gray-500">
            Buscando informações do servidor...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Meus Veículos
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Acompanhe os veículos cadastrados na sua conta.
          </p>
        </div>
      </div>

      {data.role === "B2C" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.vehicles.map((v) => (
            <div
              key={v.id}
              className="vehicle-item bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:border-[#065f46]/40 transition-colors group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-[#065f46] group-hover:bg-[#065f46] group-hover:text-white transition-colors">
                  <Car className="w-6 h-6" />
                </div>
                <div
                  className={`px-3 py-1 rounded-full border text-xs font-medium flex items-center gap-1.5 ${getStatusStyle(v.status)}`}
                >
                  {getStatusIcon(v.status)}
                  {v.status}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {v.model}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>
                    Marca: <strong className="text-gray-900">{v.marca || "—"}</strong>
                  </span>
                  <span>
                    Ano: <strong className="text-gray-900">{v.year || "—"}</strong>
                  </span>
                </div>
              </div>
            </div>
          ))}

          {data.vehicles.length === 0 && (
            <div className="vehicle-item bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-6 flex flex-col items-center justify-center text-center min-h-[250px]">
              <AlertCircle className="w-8 h-8 text-gray-400 mb-4" />
              <h4 className="text-sm font-semibold text-gray-900">
                Nenhum veículo encontrado
              </h4>
              <p className="text-xs text-gray-500 mt-1 max-w-[200px]">
                Utilize a calculadora para cadastrar seu veículo.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="vehicle-item bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <Car className="w-4 h-4 text-[#065f46]" /> Frota Atual (
              {data.vehicles.length})
            </h3>
            <div className="text-xs text-gray-500 font-medium">
              Conta Corporativa (B2B)
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 text-[10px] font-semibold text-gray-400 uppercase tracking-widest bg-white">
                  <th className="py-4 px-6 font-medium">Veículo</th>
                  <th className="py-4 px-6 font-medium">Marca</th>
                  <th className="py-4 px-6 font-medium">Ano / Tipo</th>
                  <th className="py-4 px-6 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data.vehicles.map((v) => (
                  <tr
                    key={v.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                          <Car className="w-5 h-5" />
                        </div>
                        <span className="font-semibold text-gray-900 text-sm">
                          {v.model}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-block px-2.5 py-1 bg-emerald-50 border border-emerald-100 rounded-md text-xs font-semibold text-emerald-800">
                        {v.marca || "—"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      {v.year || "—"} <span className="mx-1">•</span> {v.type}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusStyle(v.status)}`}
                      >
                        {getStatusIcon(v.status)}
                        {v.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
