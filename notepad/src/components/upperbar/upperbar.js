//IMPORTAÇÃO DOS COMPONENTES---------------------------------------------------
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './upperbar.module.css';
import UserMessages from './components/userMessages.js';
import api from '../../services/api.js';



//IMPORTAÇÃO ICONES
import { IoIosSearch } from "react-icons/io";
import { BiSolidMessageSquareDots } from "react-icons/bi";
import { LiaUserSolid } from "react-icons/lia";
import logo from '../../img/logo16.png';
import darkLogo from '../../img/logo13.png';



//BARRA SUPERIOR DE NAVEGAÇÃO--------------------------------------------------
const Upperbar = ({ searchTerm, onSearch }) => {

  //variáveis e constantes
  const [logoSrc, setLogoSrc] = useState(logo);
  const [menuAberto, setMenuAberto] = useState(false);
  const menuRef = useRef(null);
  const [msgUser, setMsgUser] = useState('');
  const [qtdMsg, setQtdMsg] = useState(0);
  const [showMessages, setShowMessages] = useState(false);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  //hook para definir logo claro ou dark
  useEffect(() => {
    function updateLogo() {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setLogoSrc(isDark ? darkLogo : logo);
    }
    updateLogo();
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateLogo);
    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', updateLogo);
    };
  }, []);

  // Verifica se o usuário tem mensagens
  useEffect(() => {
    async function verificarMensagens() {
      try {
        const response = await api.get('/messages/read'); // Chama o backend
        if (response.data && response.data.length > 0) {
          setMsgUser(true);
          // Conta apenas as mensagens não lidas
          const naoLidas = response.data.filter(msg => !msg.read).length;
          setQtdMsg(naoLidas);
          if(naoLidas < 1){setMsgUser(false);}
          setMessages(response.data);
        } else {
          setMsgUser(false);
          setMessages([]);
          setQtdMsg(0);
        }
      } catch (error) {
        console.error('Erro ao verificar mensagens:', error);
        setMsgUser(false);
        setMessages([]);
        setQtdMsg(0);
      }
    }
    verificarMensagens();
  }, []);

  //marcar como lida
  const marcarComoLida = async (msg) => {
    if(msg.read === true){return}
    const id = msg._id
    try {
      await api.post(`/messages/update/${id}`);
      setMessages(msgs => {
        const atualizadas = msgs.map(msg =>
          msg._id === id ? { ...msg, read: true } : msg
        );
        // Atualiza o contador de não lidas após atualizar o estado
        setQtdMsg(atualizadas.filter(msg => !msg.read).length);
        if(qtdMsg === 0){setMsgUser(false);}
        return atualizadas;
      });
    } catch (error) {
      console.error('Erro ao marcar mensagem como lida:', error);
    }
  };

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

  // função logout
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
          <div className={styles.logo} onClick={() => navigate('/register')}>
            <img src={logoSrc} alt="Logo" />
          </div>
          <form action='#'>
              <div className={styles.formGroup}>
                <input
                  id="barrPesc_pesquisa"
                  type="text"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={e => onSearch(e.target.value)}
                />
                <IoIosSearch className={styles.icon}/>
              </div>
          </form>
          <p className={styles.navlink} onClick={() => setShowMessages(true)}>
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
              <li onClick={sair}>Sair</li>
            </ul>
          )}
        </div>
      </nav>
      <UserMessages
        messages={messages}
        open={showMessages}
        onClose={() => setShowMessages(false)}
        marcarComoLida={marcarComoLida}
      />
    </section>
  )
};

export default Upperbar;