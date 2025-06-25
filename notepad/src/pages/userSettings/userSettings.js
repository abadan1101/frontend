import React, { useState } from "react";
import styles from "./userSettings.module.css";
import { useNavigate } from 'react-router-dom';
import { setThemeColorByTheme, applyThemeClass } from '../../theme.js'; // ajuste o caminho se necessário

export default function UserSettings() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("Conta");
  const [theme, setTheme] = useState("sistema");

  function handleSubmit(event) {
    event.preventDefault();
    // Aqui você pode adicionar a lógica para salvar as alterações
  }

  function handleThemeChange(event) {
    setTheme(event.target.value);
    localStorage.setItem('theme', event.target.value);
    setThemeColorByTheme(); // Atualiza imediatamente a cor do tema no navegador
    applyThemeClass(); // Atualiza imediatamente a cor do tema na pagina
  }

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h2>Configurações</h2>
        <ul>
          <li
            className={activeMenu === "Conta" ? styles.active : ""}
            onClick={() => setActiveMenu("Conta")}
          >
            Conta
          </li>
          <li
            className={activeMenu === "Segurança" ? styles.active : ""}
            onClick={() => setActiveMenu("Segurança")}
          >
            Segurança
          </li>
          <li
            className={activeMenu === "Notificações" ? styles.active : ""}
            onClick={() => setActiveMenu("Notificações")}
          >
            Notificações
          </li>
          <li
            className={activeMenu === "Preferências" ? styles.active : ""}
            onClick={() => setActiveMenu("Preferências")}
          >
            Preferências
          </li>
        </ul>
        <button
          className={styles.backButton}
          onClick={() => navigate("/notepad")}
        >
          Voltar
        </button>
      </aside>
      <main className={styles.content}>
        {activeMenu === "Conta" && (
          <>
            <h3>Conta</h3>
            <form className={styles.preferencesForm} onSubmit={handleSubmit}>
              <div className={styles.themeGroup}>
                <label className={styles.themeLabel}>
                  Nome:
                  <input type="text" placeholder="Seu nome" className={styles.input} />
                </label>
                <label className={styles.themeLabel}>
                  Email:
                  <input type="email" placeholder="seu@email.com" className={styles.input} />
                </label>
                <button type="submit" className={styles.saveButton}>Salvar</button>
              </div>
            </form>
          </>
        )}
        {activeMenu === "Preferências" && (
          <>
            <h3>Preferências</h3>
            <form className={styles.preferencesForm}>
              <div className={styles.themeGroup}>
                <span className={styles.themeLabel}>Tema do aplicativo</span>
                <div className={styles.themeOptions}>
                  <label className={`${styles.themeOption} ${theme === "claro" ? styles.selected : ""}`}>
                    <input
                      type="radio"
                      name="theme"
                      value="claro"
                      checked={theme === "claro"}
                      onChange={handleThemeChange}
                    />
                    Claro
                  </label>
                  <label className={`${styles.themeOption} ${theme === "escuro" ? styles.selected : ""}`}>
                    <input
                      type="radio"
                      name="theme"
                      value="escuro"
                      checked={theme === "escuro"}
                      onChange={handleThemeChange}
                    />
                    Escuro
                  </label>
                  <label className={`${styles.themeOption} ${theme === "sistema" ? styles.selected : ""}`}>
                    <input
                      type="radio"
                      name="theme"
                      value="sistema"
                      checked={theme === "sistema"}
                      onChange={handleThemeChange}
                    />
                    Sistema
                  </label>
                </div>
                <span className={styles.themeHint}>
                  Escolha como o aplicativo será exibido para você.
                </span>
              </div>
            </form>
          </>
        )}
        {/* Você pode adicionar conteúdos para Segurança e Notificações aqui */}
      </main>
    </div>
  );
}