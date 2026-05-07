"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setErro("");

    if (!email.trim() || !senha.trim()) {
      setErro("Preencha email e senha");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/usuario/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, senha }),
        },
      );

      if (response.ok) {
        router.push("/calculadora");
      } else {
        setErro("E-mail ou senha inválidos.");
      }
    } catch (err) {
      setErro("Erro de conexão com o servidor. O backend está rodando?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl w-80 shadow-lg text-center">
      <h2 className="mb-5 text-gray-700 text-lg font-medium">
        Acesse sua conta:
      </h2>

      <AuthInput
        type="text"
        placeholder="E-mail ou CPF"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <AuthInput
        type={mostrarSenha ? "text" : "password"}
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        showPasswordToggle={true}
        onTogglePassword={() => setMostrarSenha(!mostrarSenha)}
        mostrarSenha={mostrarSenha}
      />

      {erro && <p className="text-red-500 text-sm mt-2 font-medium">{erro}</p>}

      <AuthButton onClick={handleLogin}>
        {loading ? "ENTRANDO..." : "ENTRAR"}
      </AuthButton>

      <a href="#" className="block mt-4 text-sm text-green-700 hover:underline">
        Esqueci minha senha
      </a>

      <div className="h-px bg-gray-200 my-5"></div>

      <p className="text-sm text-gray-500">
        Não tem uma conta?{" "}
        <span className="text-green-700 font-semibold cursor-pointer hover:underline">
          Cadastre-se
        </span>
      </p>
    </div>
  );
}
