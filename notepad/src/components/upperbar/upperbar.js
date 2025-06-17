//IMPORTAÇÃO DOS COMPONENTES---------------------------------------------------
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './upperbar.module.css';
import { IoIosSearch } from "react-icons/io";
import { BiSolidMessageSquareDots } from "react-icons/bi";
import { LiaUserSolid } from "react-icons/lia";
import logo from '../../img/logo3.png';
import api from '../../services/api.js';

const Upperbar = () => {

    const [menuAberto, setMenuAberto] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    // Fecha o menu ao clicar fora
    useEffect(() => {
      function handleClickFora(event) {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setMenuAberto(false);
        }
      }
      document.addEventListener('mousedown', handleClickFora);
      return () => document.removeEventListener('mousedown', handleClickFora);
    }, []);

  async function sair() {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
    navigate('/');
  }

  return (
    <section className={styles.content}>
      <nav>
          <div className={styles.logo}>
              <img src={logo} alt="Logo" />
              <span className={styles.logoText}>tS notes</span>
          </div>
          <form action='#'>
              <div className={styles.formGroup}>
                  <input id="barrPesc_pesquisa" type='text' placeholder='Buscar...' />
                  <IoIosSearch className={styles.icon}/>
              </div>
          </form>
          <p className={styles.navlink}>
            <BiSolidMessageSquareDots className={styles.icon}/>
            <span className={styles.badge}>8</span>
          </p>
          <span className={styles.divider}></span>
        <div className={styles.profile} ref={menuRef}>
          <LiaUserSolid
            className={styles.icon}
            onClick={() => setMenuAberto(!menuAberto)}
            style={{ cursor: 'pointer' }}
            aria-haspopup="true"
            aria-expanded={menuAberto}
          />
          {menuAberto && (
            <ul className={styles.dropdownMenu}>
              <li>Configurações</li>
              <li>Perfil</li>
              <li onClick={sair}>Sair</li>
            </ul>
          )}
        </div>
      </nav>
    </section>
  )
};

export default Upperbar;