import React, { useState } from "react";

import styles from './nav.module.css';

function Nav( {openForm} ) {
    // VARIÁVEIS E CONSTANTES
    const [menuOpen, setMenuOpen] = useState(false);//abrir o menu de configurações

    // FUNÇÃO PARA ABRIR O FORM ADICIONAR NOVA NOTA
    const setNewNoteOpen = (value) => {
        openForm(value);
    }

    // HOOK PARA FECHAR O MENU DE CONFIGURAÇÕES AO CLICAR FORA
    React.useEffect(() => {
        function handleClickOutside(event) {
            if (!event.target.closest(`.${styles.configNotes}`) && !event.target.closest(`.${styles.navList}`)) {
                setMenuOpen(false);
            }
        }
        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);

    return(
        <div className={styles.nav}>
            <div>
                <button onClick={() => setNewNoteOpen(true)}>Nova Nota</button>
                <i className={`${styles.addNotes} bx  bxs-plus-circle addNotes`} onClick={() => setNewNoteOpen(true)}></i> 
                <section className={styles.radioGroup}>
                    <label className={styles.radioLabel}>
                        <input type="radio" name="priority" id="all" className={styles.radioInput} defaultChecked />
                        <span className={styles.customRadio}></span>
                        Todas
                    </label>
                    <label className={styles.radioLabel}>
                        <input type="radio" name="priority" id="priority" className={styles.radioInput} />
                        <span className={styles.customRadio}></span>
                        Prioridade
                    </label>
                    <label className={styles.radioLabel}>
                        <input type="radio" name="priority" id="completed" className={styles.radioInput} />
                        <span className={styles.customRadio}></span>
                        Normais
                    </label>
                </section>
                <i
                    className={`${styles.configNotes} bx bx-dots-vertical-rounded`}
                    onClick={() => setMenuOpen(!menuOpen)}
                ></i>
                {menuOpen && (
                    <ul className={styles.navList}>
                        <li className={styles.navItem}>
                            <i className={`${styles.icon} bx bx-trash-alt`}></i>
                            Lixeira
                        </li>
                        <li className={styles.navItem}>
                            <i className={`${styles.icon} bx bx-cog`}></i>
                            Configurações
                        </li>
                        <li className={styles.navItem}>
                            <i className={`${styles.icon} bx bx-help-circle`}></i>
                            Ajuda
                        </li>
                        <li className={styles.navItem}>
                            <i className={`${styles.icon} bx bx-info-circle`}></i>
                            Sobre
                        </li>
                    </ul>
                )}
            </div>
        </div>
    )
}

export default Nav;