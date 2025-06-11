//IMPORTAÇÃO DAS BIBLIOTECAS---------------------------------------------------
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";



//IMPORTAÇÃO DOS MÓDULOS-------------------------------------------------------
import api from '../../services/api.js';
import styles from "./login.module.css";



export default function Login() {
  //variáveis
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [continuarConectado, setContinuarConectado] = useState(false);
  const [loading, setLoading] = useState(true);
  const [autenticado, setAutenticado] = useState(false);
  const navigate = useNavigate();



  //hook para validar o login automático em caso de token válido
  useEffect(() => {
    async function checkAuth() {
      try {
        await api.get('/auth/validate');
        setAutenticado(true);
        navigate('/home');
      } catch {
        setAutenticado(false);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [navigate]);

  //método para efetuar login
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await api.post('/auth/login', {
        email: email,
        password: senha,
        continuarConectado: continuarConectado
      });
      if (response.status === 200) {
        navigate('/home');
      } else {
        setLoading(false);
        alert(response.data.msg || "Erro ao fazer login.");
      }
    } catch (error) {
      setLoading(false);
      alert(error.response?.data?.msg || "Erro ao fazer login.");
    }
  }

  //modal de carregamento
  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.loader}>
          <div className={styles.spinner}></div>
          <span className={styles.loaderText}>Carregando...</span>
        </div>
      </div>
    );
  }

  //redirecionar em caso específico
  if (autenticado) {
    return null; // Ou um redirect, se preferir
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
            <Link className={styles.link}>
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