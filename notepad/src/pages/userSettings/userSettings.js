import React from "react";
import styles from "./userSettings.module.css";
import { useNavigate } from 'react-router-dom';

export default function UserSettings() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h2>Configurações</h2>
        <ul>
          <li className={styles.active}>Conta</li>
          <li>Segurança</li>
          <li>Notificações</li>
          <li>Preferências</li>
        </ul>
        <button
          className={styles.backButton}
          onClick={() => navigate("/notepad")}
        >
          Voltar
        </button>
      </aside>
      <main className={styles.content}>
        <h3>Conta</h3>
        <form className={styles.form}>
          <label>
            Nome:
            <input type="text" placeholder="Seu nome" />
          </label>
          <label>
            Email:
            <input type="email" placeholder="seu@email.com" />
          </label>
          <button type="submit">Salvar</button>
        </form>
      </main>
    </div>
  );
}