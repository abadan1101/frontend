import { useState, useEffect } from "react";
import { RiAddCircleFill } from "react-icons/ri";
import { CgOptions } from "react-icons/cg";
import { FiTrash } from "react-icons/fi";
import { IoSettingsOutline, IoHelpCircleOutline, IoTrailSignOutline   } from "react-icons/io5";



import styles from './nav.module.css';

function Nav( {openForm} ) {
    // VARIÁVEIS E CONSTANTES
    const [menuOpen, setMenuOpen] = useState(false);//abrir o menu de configurações

    // FUNÇÃO PARA ABRIR O FORM ADICIONAR NOVA NOTA
    const setNewNoteOpen = (value) => {
        openForm(value);
    }

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

    return(
        <div className={styles.nav}>
            <div>
                <button onClick={() => setNewNoteOpen(true)}>Nova Nota</button>
                <RiAddCircleFill className={styles.addNotes}  onClick={() => setNewNoteOpen(true)}/>
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
                <CgOptions 
                    className={styles.configNotes}
                    onClick={() => setMenuOpen(!menuOpen)}
                />
                {menuOpen && (
                    <ul className={styles.navList}>
                        <li className={styles.navItem}>
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