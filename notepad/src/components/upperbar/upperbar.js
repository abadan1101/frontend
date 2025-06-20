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
    const [msgUser, setMsgUser] = useState('');
    const [qtdMsg, setQtdMsg] = useState(0);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    // Verifica se o usuário tem mensagens
    useEffect(() => {
      async function verificarMensagens() {
        try {
          //const response = await api.get('/messages');
          //simulação de resposta
          const response = {
            data: [
              { id: 1, content: 'Mensagem 1' },
              { id: 2, content: 'Mensagem 2' }
            ]
          };
          if (response.data && response.data.length > 0) {
            setMsgUser(true);
            setQtdMsg(response.data.length);
          } else {
            setMsgUser(false);
          }
        } catch (error) {
          console.error('Erro ao verificar mensagens:', error);
        }
      }
      verificarMensagens();
    }, []);

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
          <div className={styles.logo} onClick={() => navigate('/register')}>{/* somente para testes */}
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
            {msgUser && <span className={styles.badge}>{qtdMsg}</span>}
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
              <li onClick={() => navigate("/settings")}>Configurações</li>
              <li>Instruções</li>
              <li onClick={sair}>Sair</li>
            </ul>
          )}
        </div>
      </nav>
    </section>
  )
};

export default Upperbar;