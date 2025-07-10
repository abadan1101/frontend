import React, { useState, useEffect } from "react";
import styles from "./userSettings.module.css";
import { GoArrowLeft } from "react-icons/go";
import Preferencias from './components/preferencias.js';

export default function UserSettings({ onClose }) {
  const [activeMenu, setActiveMenu] = useState("Conta");

  // Gerencia efeitos colaterais do modal (scroll lock, fechar com ESC).
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);

    // Função de limpeza
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);


  function handleSubmit(event) {
    event.preventDefault();
    // Aqui você pode adicionar a lógica para salvar as alterações
  }



  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.headerSettings}>
          <GoArrowLeft className={styles.xClose} onClick={onClose} title="Fechar"/>
          <h2>Configurações</h2>
        </div>
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
            Tema
          </li>
        </ul>
        <button
          className={styles.backButton}
          onClick={onClose}
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
          <Preferencias />
        )}
      </main>
    </div>
  );
}