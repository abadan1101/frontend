//IMPORTAÇÃO DAS BIBLIOTECAS---------------------------------------------------
import { useState } from "react";



//IMPORTAÇÃO DOS COMPONENTES---------------------------------------------------
import styles from "./preferencias.module.css";
import { setThemeColorByTheme, applyThemeClass, applyColorTheme } from '../../../../../theme.js';



//COMPONENTE-------------------------------------------------------------------
export default function Preferencias() {
    //variáveis e estados
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'sistema');
    const [colorTheme, setColorTheme] = useState(() => localStorage.getItem('colorTheme') || 'azul');

    //função para modificar tema
    function handleThemeChange(event) {
        setTheme(event.target.value);
        localStorage.setItem('theme', event.target.value);
        setThemeColorByTheme(); // Atualiza imediatamente o tema no navegador - // chamada também em App.js
        applyThemeClass(); // Atualiza imediatamente o tema na pagina - // chamada também em App.js
    }

    //função para modificar cor do tema
    function handleColorThemeChange(event) {
        setColorTheme(event.target.value);
        localStorage.setItem('colorTheme', event.target.value);

        applyColorTheme(); // Atualiza imediatamente a cor do tema - // chamada também em App.js
    }

    //html do componente
    return (
    <>
        <h3>Preferências</h3>
        
        <span className={styles.themeLabel}>Exemplo de tema do aplicativo</span>
        <div className={styles.exemploTema}>
            <div className={styles.exemploHeader}>
                <span className={styles.exemploPonto}></span>
                <span className={styles.exemploPonto}></span>
                <span className={styles.exemploPonto}></span>
            </div>
            <div className={styles.exemploCorpo}>
                <div className={styles.exemploLinha}></div>
                <div className={styles.exemploLinha}></div>
                <div className={styles.exemploBotao}></div>
            </div>
        </div>

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
                <label className={`${styles.themeOption} ${colorTheme === "azul" ? styles.selected : ""}`}>
                <input
                    type="radio"
                    name="colorTheme"
                    value="azul"
                    checked={colorTheme === "azul"}
                    onChange={handleColorThemeChange}
                />
                Azul
                </label>
                <label className={`${styles.themeOption} ${colorTheme === "verde" ? styles.selected : ""}`}>
                <input
                    type="radio"
                    name="colorTheme"
                    value="verde"
                    checked={colorTheme === "verde"}
                    onChange={handleColorThemeChange}
                />
                Verde
                </label>
                <label className={`${styles.themeOption} ${colorTheme === "rosa" ? styles.selected : ""}`}>
                <input
                    type="radio"
                    name="colorTheme"
                    value="rosa"
                    checked={colorTheme === "rosa"}
                    onChange={handleColorThemeChange}
                />
                Rosa
                </label>
            </div>
            <span className={styles.themeHint}>
                Escolha a cor principal do tema do aplicativo.
            </span>
            </div>
        </form>
    </>
    );
}