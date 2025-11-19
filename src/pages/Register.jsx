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

  const [erroEmail, setErroEmail] = useState("");
  const [erroNome, setErroNome] = useState("");
  const [erroSenha, setErroSenha] = useState("");
  const [erroConfirmar, setErroConfirmar] = useState("");

  const [erroGeral, setErroGeral] = useState("");

  const navigate = useNavigate();

  const validarEmail = (valor) => {
    const emailRegex = /^[\w.-]+@(gmail\.com|bol\.com\.br)$/;

    if (!emailRegex.test(valor)) {
      setErroEmail("Email inválido. Use apenas @gmail.com ou @bol.com.br");
    } else {
      setErroEmail("");
    }
  };

  const validarSenha = (valor) => {
    const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!senhaRegex.test(valor)) {
      setErroSenha(
        "Senha fraca. Deve conter: letra maiúscula, letra minúscula, número e mínimo 8 caracteres."
      );
    } else {
      setErroSenha("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErroGeral("");

  
    if (!nome.trim()) {
      setErroNome("Nome é obrigatório.");
      return;
    } else {
      setErroNome("");
    }

    if (erroEmail || erroSenha) return;

    if (senha !== confirmarSenha) {
      setErroConfirmar("As senhas não coincidem.");
      return;
    } else {
      setErroConfirmar("");
    }

    try {
      await signUp(nome, email, senha);
      navigate("/login");
    } catch (err) {
      setErroGeral(err.message);
    }
  };

  return (
    <div className="register-wrapper">

      {/* TOPO */}
      <div className="register-top-block">
        <div className="register-logo-circle">
          <Logo white />
        </div>

        <svg className="register-curva" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#111"
            d="M0,160 C160,80 350,60 500,120 C700,200 900,220 1100,140 C1250,80 1440,120 1440,120 L1440,320 L0,320 Z"
          />
        </svg>
      </div>

      {/* FORM */}
      <div className="register-area">
        <h1 className="register-title">Cadastrar-se</h1>
        <p className="register-subtitle">Insira os dados</p>

        <form onSubmit={handleSubmit}>

          {/* EMAIL */}
          <label className="register-label">E-mail:</label>
          <Input
            placeholder="Digite seu email..."
            type="email"
            value={email}
            required
            onChange={(e) => {
              setEmail(e.target.value);
              validarEmail(e.target.value);
            }}
          />
          {erroEmail && <p className="register-erro">{erroEmail}</p>}

          {/* NOME */}
          <label className="register-label">Nome:</label>
          <Input
            placeholder="Digite seu nome..."
            type="text"
            value={nome}
            required
            onChange={(e) => {
              setNome(e.target.value);
              if (!e.target.value.trim()) setErroNome("Nome é obrigatório.");
              else setErroNome("");
            }}
          />
          {erroNome && <p className="register-erro">{erroNome}</p>}

          {/* SENHA */}
          <label className="register-label">Senha:</label>
          <Input
            placeholder="Digite sua senha..."
            type="password"
            value={senha}
            required
            onChange={(e) => {
              setSenha(e.target.value);
              validarSenha(e.target.value);
            }}
          />
          {erroSenha && <p className="register-erro">{erroSenha}</p>}

          {/* CONFIRMAR SENHA */}
          <label className="register-label">Confirmar Senha:</label>
          <Input
            placeholder="Confirme sua senha..."
            type="password"
            value={confirmarSenha}
            required
            onChange={(e) => {
              setConfirmarSenha(e.target.value);
              if (e.target.value !== senha) {
                setErroConfirmar("As senhas não coincidem.");
              } else {
                setErroConfirmar("");
              }
            }}
          />
          {erroConfirmar && <p className="register-erro">{erroConfirmar}</p>}

          {erroGeral && <p className="register-erro">{erroGeral}</p>}

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
