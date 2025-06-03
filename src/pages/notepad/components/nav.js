import { useState, useEffect } from "react";
import { PiNotePencilFill } from "react-icons/pi";
import { FaRegTrashAlt  } from "react-icons/fa";



import styles from './nav.module.css';

function Nav({ openForm, openTrash, onFilterChange }) {
    // VARIÁVEIS E CONSTANTES
    const [filter, setFilter] = useState(() => {
        // Tenta pegar o filtro salvo no localStorage, senão usa "all"
        return localStorage.getItem("notepadFilter") || "all";
    });


    // Salva o filtro no localStorage sempre que mudar
    useEffect(() => {
        localStorage.setItem("notepadFilter", filter);
    }, [filter]);

    // Função para lidar com a mudança do filtro
    function handleFilterChange(e) {
        setFilter(e.target.id);
        if (onFilterChange) {
            onFilterChange(e.target.id);
        }
    }

    return(
        <div className={styles.nav}>
            <div>
                <PiNotePencilFill className={styles.addNotes} onClick={() => openForm(true)} title="adicionar nova nota"/>
                <section className={styles.radioGroup}>
                    <label className={styles.radioLabel}>
                        <input
                            type="radio"
                            name="priority"
                            id="all"
                            className={styles.radioInput}
                            checked={filter === "all"}
                            onChange={handleFilterChange}
                        />
                        <span className={styles.customRadio}></span>
                        Todas
                    </label>
                    <label className={styles.radioLabel}>
                        <input
                            type="radio"
                            name="priority"
                            id="priority"
                            className={styles.radioInput}
                            checked={filter === "priority"}
                            onChange={handleFilterChange}
                        />
                        <span className={styles.customRadio}></span>
                        Prioridade
                    </label>
                    <label className={styles.radioLabel}>
                        <input
                            type="radio"
                            name="priority"
                            id="completed"
                            className={styles.radioInput}
                            checked={filter === "completed"}
                            onChange={handleFilterChange}
                        />
                        <span className={styles.customRadio}></span>
                        Normais
                    </label>
                </section>
                <div className={styles.trashContainer} onClick={() => openTrash(true)}>
                    <FaRegTrashAlt  
                        className={styles.trashNotes}
                        title="lixeira"
                    />
                    <span className={styles.trashLabel}>lixeira</span>
                </div>
            </div>
        </div>
    )
}

export default Nav;