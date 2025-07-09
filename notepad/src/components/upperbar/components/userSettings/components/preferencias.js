import React, { useState } from "react";
import styles from "./preferencias.module.css";
import { setThemeColorByTheme, applyThemeClass } from '../../../../../theme.js'; // ajuste o caminho se necessário

export default function Preferencias({ onClose }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'sistema');

  function handleThemeChange(event) {
    setTheme(event.target.value);
    localStorage.setItem('theme', event.target.value);
    setThemeColorByTheme(); // Atualiza imediatamente a cor do tema no navegador
    applyThemeClass(); // Atualiza imediatamente a cor do tema na pagina
  }


  return (
    <>
        <h3>Preferências</h3>

        {/* tema do aplicativo */}
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

        {/* cor do aplicativo */}
        <form className={styles.preferencesForm}>
            <div className={styles.themeGroup}>
            <span className={styles.themeLabel}>Cor do aplicativo</span>
            <div className={styles.themeOptions}>
                <label className={`${styles.themeOption} ${theme === "claro" ? styles.selected : ""}`}>
                <input
                    type="radio"
                    name="theme"
                    value="claro"
                    checked={theme === "claro"}
                    onChange={handleThemeChange}
                />
                Azul
                </label>
                <label className={`${styles.themeOption} ${theme === "escuro" ? styles.selected : ""}`}>
                <input
                    type="radio"
                    name="theme"
                    value="escuro"
                    checked={theme === "escuro"}
                    onChange={handleThemeChange}
                />
                Verde
                </label>
                <label className={`${styles.themeOption} ${theme === "sistema" ? styles.selected : ""}`}>
                <input
                    type="radio"
                    name="theme"
                    value="sistema"
                    checked={theme === "sistema"}
                    onChange={handleThemeChange}
                />
                Rosa
                </label>
            </div>
            <span className={styles.themeHint}>
                Escolha como o aplicativo será exibido para você.
            </span>
            </div>
        </form>
    </>
  );
}