import React, { useState } from "react";
import { Logo, Input, Button } from "../components";
import { signIn } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Login.css";

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = await signIn(email, senha);
      login(token);
      navigate("/map");
    } catch (err) {
      setErro(err.message);
    }
  };

  return (
    <div className="login-wrapper">

      {/* TOPO AMARELO */}
      <div className="login-top-block">

        <div className="login-logo-circle">
          <Logo white />
        </div>

        {/* CURVA */}
        <svg
          className="login-curva"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#111"
            d="
              M0,160
              C180,240 360,280 520,260
              C700,240 880,170 1080,220
              C1250,250 1440,200 1440,200
              L1440,320
              L0,320 Z
            "
          ></path>
        </svg>
      </div>

      {/* BLOCO PRETO */}
      <div className="login-area">

        <h1 className="login-title">Fazer Login</h1>
        <p className="login-subtitle">Bem-Vindo de volta</p>

        <form onSubmit={handleSubmit}>

          <label className="login-label">E-mail:</label>
          <Input
            placeholder="Digite seu email..."
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="login-label">Senha:</label>
          <Input
            placeholder="Digite sua senha..."
            type="password"
            value={senha}
            required
            onChange={(e) => setSenha(e.target.value)}
          />

          {erro && <p className="login-erro">{erro}</p>}

          <Button type="submit" className="botao-acessar">
            Acessar
          </Button>
        </form>

        <Link to="/register" className="login-cadastro">
          Faça seu Cadastro
        </Link>

      </div>
    </div>
  );
}
