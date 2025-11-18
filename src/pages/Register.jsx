import React, { useState } from "react";
import { Logo, Input, Button } from "../components";
import { signUp } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

export function Register() {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem!");
      return;
    }

    try {
      await signUp(nome, email, senha);
      navigate("/login");
    } catch (err) {
      setErro(err.message);
    }
  };

  return (
    <div className="register-wrapper">

      {/* TOPO AMARELO */}
      <div className="register-top-block">

        <div className="register-logo-circle">
          <Logo white />
        </div>

        {/* CURVA — a mesma da imagem final */}
        <svg
        className="register-curva"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        >
        <path
            fill="#111"
            d="
            M0,160
            C160,80 350,60 500,120
            C700,200 900,220 1100,140
            C1250,80 1440,120 1440,120
            L1440,320
            L0,320 Z
            "
        ></path>
        </svg>

      </div>

      {/* BLOCO PRETO */}
      <div className="register-area">

        <h1 className="register-title">Cadastrar-se</h1>
        <p className="register-subtitle">Insira os dados</p>

        <form onSubmit={handleSubmit}>

          <label className="register-label">E-mail:</label>
          <Input
            placeholder="Digite seu email..."
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="register-label">Nome:</label>
          <Input
            placeholder="Digite seu nome..."
            type="text"
            value={nome}
            required
            onChange={(e) => setNome(e.target.value)}
          />

          <label className="register-label">Senha:</label>
          <Input
            placeholder="Digite sua senha..."
            type="password"
            value={senha}
            required
            onChange={(e) => setSenha(e.target.value)}
          />

          <label className="register-label">Confirmar Senha:</label>
          <Input
            placeholder="Confirme sua senha..."
            type="password"
            value={confirmarSenha}
            required
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />

          {erro && <p className="register-erro">{erro}</p>}

          <Button type="submit" className="register-button">
            Cadastrar
          </Button>
        </form>

        <Link to="/login" className="register-login-link">
          Já possui conta? Faça Login
        </Link>

      </div>
    </div>
  );
}
