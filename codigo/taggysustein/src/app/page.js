"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPreview() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleLogin = () => {
    if (email.trim() && senha.trim()) {
      router.push("/calculadora");
    } else {
      alert("Preencha email e senha");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Card */}
      <div className="bg-white p-8 rounded-2xl w-80 shadow-lg text-center">
        <h2 className="mb-5 text-gray-700 text-lg font-medium">
          Acesse sua conta:
        </h2>

        {/* Email */}
        <div className="flex items-center rounded-full px-4 py-2 mb-3 bg-gray-50 border border-gray-300 focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-100">
          <input
            type="text"
            placeholder="E-mail ou CPF"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm"
          />
        </div>

        {/* Senha */}
        <div className="flex items-center rounded-full px-4 py-2 mb-3 bg-gray-50 border border-gray-300 focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-100">
          <input
            type={mostrarSenha ? "text" : "password"}
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm"
          />

          <button
            type="button"
            onClick={() => setMostrarSenha(!mostrarSenha)}
            className="ml-2"
            title={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
          >
            {mostrarSenha ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            )}
          </button>
        </div>

        {/* Botão */}
        <button
          onClick={handleLogin}
          className="w-full py-3 rounded-full text-white font-semibold mt-2 bg-green-600 hover:bg-green-800 transition"
        >
          ENTRAR
        </button>

        {/* Link */}
        <a href="#" className="block mt-4 text-sm text-green-700">
          Esqueci minha senha
        </a>

        {/* Divider */}
        <div className="h-px bg-gray-200 my-5"></div>

        {/* Footer */}
        <p className="text-sm text-gray-500">
          Não tem uma conta?{" "}
          <span className="text-green-700 font-semibold cursor-pointer">
            Cadastre-se
          </span>
        </p>
      </div>
    </div>
  );
}