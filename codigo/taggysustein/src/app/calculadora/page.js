"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import CalculadoraForm from "@/components/CalculadoraForm";
import ResultadoCalculadora from "@/components/ResultadoCalculadora";

export default function Home() {
  const [resultado, setResultado] = useState(null);

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-6 text-zinc-900 font-sans selection:bg-emerald-200 selection:text-emerald-900">
      <div className="w-full max-w-[400px]">
        <Header />
        <CalculadoraForm onCalculateSuccess={setResultado} />
        <ResultadoCalculadora resultado={resultado} />
      </div>
    </div>
  );
}
