import React from "react";

import styles from './nav.module.css';

function Nav( {openForm} ) {
    
    // FUNÇÃO PARA ABRIR O FORM ADICIONAR NOVA NOTA
    const setNewNoteOpen = (value) => {
        openForm(value);
    }

    return(
        <div className={styles.nav}>
            <div>
                <button onClick={() => setNewNoteOpen(true)}>Nova Nota</button>
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
            </div>
        </div>
    )
}

export default Nav;