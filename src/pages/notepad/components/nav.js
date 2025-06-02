import { useState, useEffect } from "react";
import { PiNotePencilFill } from "react-icons/pi";
import { CgOptions } from "react-icons/cg";
import { FiTrash } from "react-icons/fi";
import { IoSettingsOutline, IoHelpCircleOutline, IoTrailSignOutline   } from "react-icons/io5";



import styles from './nav.module.css';

function Nav({ openForm, openTrash, onFilterChange }) {
    // VARIÁVEIS E CONSTANTES
    const [menuOpen, setMenuOpen] = useState(false); // abrir o menu de configurações
    const [filter, setFilter] = useState(() => {
        // Tenta pegar o filtro salvo no localStorage, senão usa "all"
        return localStorage.getItem("notepadFilter") || "all";
    });

    // HOOK PARA FECHAR O MENU DE CONFIGURAÇÕES AO CLICAR FORA
    useEffect(() => {
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
                <CgOptions 
                    className={styles.configNotes}
                    onClick={() => setMenuOpen(!menuOpen)}
                    title="ajustes"
                />
                {menuOpen && (
                    <ul className={styles.navList}>
                        <li className={styles.navItem} onClick={() => openTrash(true)}>
                            <FiTrash className={styles.icon}/>
                            Lixeira
                        </li>
                        <li className={styles.navItem}>
                            <IoSettingsOutline className={styles.icon}/>
                            Configurações
                        </li>
                        <li className={styles.navItem}>
                            <IoHelpCircleOutline className={styles.icon}/>
                            Ajuda
                        </li>
                        <li className={styles.navItem}>
                            <IoTrailSignOutline className={styles.icon}/>
                            Sobre
                        </li>
                    </ul>
                )}
            </div>
        </div>
    )
}

export default Nav;