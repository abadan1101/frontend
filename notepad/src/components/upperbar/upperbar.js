// IMPORTAÇÃO DOS COMPONENTES ---------------------------------------------------
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './upperbar.module.css';
import UserMessages from './components/userMessages.js';
import UserSettings from './components/userSettings.js';
import { ReactComponent as Logo } from '../../img/logo.svg';
import api from '../../services/api.js';



// IMPORTAÇÃO ICONES
import { IoIosSearch } from "react-icons/io";
import { BiMessageSquareDots } from "react-icons/bi";
import { LiaUserSolid } from "react-icons/lia";



// FUNÇÕES UTILITÁRIAS ----------------------------------------------------------
const contarNaoLidas = (mensagens) => mensagens.filter(msg => !msg.read).length;



// COMPONENTE -------------------------------------------------------------------
const Upperbar = ({ searchTerm, onSearch}) => {
  const [menuAberto, setMenuAberto] = useState(false);
  const menuRef = useRef(null);
  const [qtdMsg, setQtdMsg] = useState(0);
  const [showMessages, setShowMessages] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  // Verifica mensagens do usuário
  const verificarMensagens = async () => {
    try {
      const response = await api.get('/messages/read');
      if (Array.isArray(response.data)) {
        const naoLidas = contarNaoLidas(response.data);
        setMessages(response.data);
        setQtdMsg(naoLidas);
      } else {
        setMessages([]);
        setQtdMsg(0);
      }
    } catch (error) {
      console.error('Erro ao verificar mensagens:', error);
      setMessages([]);
      setQtdMsg(0);
    }
  };

  // Chamada inicial e atualização periódica
  useEffect(() => {
    verificarMensagens();
    const interval = setInterval(verificarMensagens, 60000); // a cada 60s
    return () => clearInterval(interval);
  }, []);

  // Marcar mensagem como lida
  const marcarComoLida = async (msg) => {
    if (msg.read) return;
    const id = msg._id;
    try {
      await api.post(`/messages/update/${id}`);
      setMessages(prevMsgs => {
        const atualizadas = prevMsgs.map(m =>
          m._id === id ? { ...m, read: true } : m
        );
        setQtdMsg(contarNaoLidas(atualizadas));
        return atualizadas;
      });
    } catch (error) {
      console.error('Erro ao marcar mensagem como lida:', error);
    }
  };

  // Fecha menu ao clicar fora
  useEffect(() => {
    function handleClickFora(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAberto(false);
      }
    }
    document.addEventListener('mousedown', handleClickFora);
    return () => document.removeEventListener('mousedown', handleClickFora);
  }, []);

  // Logout
  const sair = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
    navigate('/');
  };

  return (
    <section className={styles.content}>
      <nav>

        {/* logo */}
        <div className={styles.logo}>
          <Logo className={styles.logoSvg} />
        </div>

        {/* barra de pesquisa */}
        <form action="#">
          <div className={styles.formGroup}>
            <input
              id="barrPesc_pesquisa"
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={e => onSearch(e.target.value)}
            />
            <IoIosSearch className={styles.icon} />
          </div>
        </form>

        {/* botão de mensagens */}
        <p className={styles.navlink} onClick={() => setShowMessages(true)}>
          <BiMessageSquareDots className={styles.icon} title='mensagens'/>
          {qtdMsg > 0 && <span className={styles.badge}>{qtdMsg}</span>}
        </p>

        {/* modal de mensagens */}
        <UserMessages
          messages={messages}
          open={showMessages}
          onClose={() => setShowMessages(false)}
          marcarComoLida={marcarComoLida}
        />

        {/* separador */}
        <span className={styles.divider}></span>

        {/* menu de configurações */}
        <div className={styles.profile} ref={menuRef}>
          <LiaUserSolid
            className={styles.icon}
            onClick={() => setMenuAberto(!menuAberto)}
            style={{ cursor: 'pointer' }}
            aria-haspopup="true"
            aria-expanded={menuAberto}
            title='configurações'
          />
          {menuAberto && (
            <ul className={styles.dropdownMenu}>
              <li onClick={() => setShowSettings(true)}>Configurações</li>
              <li>Instruções</li>
              <li onClick={sair}>Sair</li>
            </ul>
          )}
        </div>

        {/* configurações de usuário */}
        {showSettings && (
          <UserSettings
            onClose={() => setShowSettings(false)}
          />)
        }

      </nav>


    </section>
  );
};

export default Upperbar;