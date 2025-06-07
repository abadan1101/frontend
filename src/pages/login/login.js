import React, { useState } from "react";
import api from '../../services/api.js';
import { Link, useNavigate } from "react-router-dom"; // importe o hook
import styles from "./login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [continuarConectado, setContinuarConectado] = useState(false);
  const navigate = useNavigate(); // inicialize o hook

  // função para logar
async function handleSubmit(e) {
  e.preventDefault();
  try {
    const response = await api.post('/auth/login', {
      email: email,
      password: senha,
    });
    // Se login for bem-sucedido, redirecione para home
    if (response.status === 200) {
      navigate('/home');
    } else {
      alert(response.data.msg || "Erro ao fazer login.");
    }
  } catch (error) {
    alert(error.response?.data?.msg || "Erro ao fazer login.");
  }
}

  return (
    <div className={styles.container}>
        <div className={styles.brand}>
            <div className={styles.logoCircle}>
                <span className={styles.logoText}>P</span>
            </div>
            <span className={styles.brandName}>Projeto Caracal</span>
        </div>
        <div className={styles.loginBox}>
            <h2 className={styles.title}>Entrar</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
            <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.input}
            />
            <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                className={styles.input}
            />
            <div className={styles.checkboxContainer}>
                <input
                    type="checkbox"
                    id="continuarConectado"
                    checked={continuarConectado}
                    onChange={() => setContinuarConectado(!continuarConectado)}
                />
                <label htmlFor="continuarConectado">Continuar conectado</label>
            </div>
            <button type="submit" className={styles.button}>
                Login
            </button>
            </form>
            <Link to='home' className={styles.link}>
                Esqueceu a senha?
            </Link>
            <div className={styles.cadastroContainer}>
                <span>Não tem uma conta?</span>
                <Link to='/register' className={styles.link}>
                    Cadastre-se
                </Link>
            </div>
        </div>
    </div>
  );
}