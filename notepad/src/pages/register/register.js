import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from '../../services/api.js';
import styles from "./register.module.css";

export default function Cadastro() {
    const [name, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");


    // função para criar um novo usuário
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await api.post('/auth/register', {
                name: name,
                email: email,
                password: senha,
                confirmpassword: senha
            });
            alert("Cadastro enviado!");
        } catch (error) {
            if (error.response && error.response.status === 422) {
                alert("usuário já cadastrado. Verifique as informações e tente novamente.");
            } else if (error.response && error.response.data && error.response.data.message) {
             alert("Erro: " + error.response.data.message);
            } else {
                alert("Erro ao cadastrar. Tente novamente.");
            }
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
            <div className={styles.cadastroBox}>
                <h2 className={styles.title}>Cadastro</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input
                        type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setNome(e.target.value)}
                        required
                        className={styles.input}
                    />
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
                    <button type="submit" className={styles.button}>
                        Cadastrar
                    </button>
                </form>
                <div className={styles.loginContainer}>
                    <span>Já tem uma conta?</span>
                    <Link to="/" className={styles.link}>
                        Entrar
                    </Link>
                </div>
            </div>
        </div>
    );
}