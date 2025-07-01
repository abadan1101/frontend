//IMPORTAÇÃO DAS BIBLIOTECAS---------------------------------------------------
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";



//IMPORTAÇÃO DOS COMPONENTES---------------------------------------------------
import styles from './userMessages.module.css';
import { GoArrowLeft, GoX, GoCheck } from "react-icons/go";
import { IoCheckmarkDoneOutline } from "react-icons/io5";



const UserMessages = ({ messages, open, onClose, marcarComoLida }) => {
  // Estado local para controlar mensagens, sincronizado com as props.
  const [localMessages, setLocalMessages] = useState(messages);

  // Sincroniza o estado local quando as mensagens externas mudam.
  useEffect(() => {
    setLocalMessages(messages);
  }, [messages]);

  // Gerencia efeitos colaterais do modal (scroll lock, fechar com ESC).
  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);

    // Função de limpeza
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [open, onClose]);

  //modal fechado ao iniciar
  if (!open) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-label="Mensagens">
        <div className={styles.headerMessages}>
          <GoArrowLeft className={styles.arrowClose} onClick={onClose} title="Fechar"/>
          <GoX className={styles.xClose} onClick={onClose} title="Fechar"/>
          <h2>Mensagens</h2>
        </div>
        {localMessages && localMessages.length > 0 ? (
          <ul className={styles.listMessages}>
            {localMessages.map(msg => (
              <li
                className={`${styles.userMsg} ${msg.read === false ? styles.unreadMsg : ''}`}
                key={msg._id}
                onClick={() => marcarComoLida(msg)}
              >
                <div>
                  <span>{msg.content}</span>
                  <Link to={msg.link}>{msg.nameLink}</Link>
                </div>
                  <div className={styles.msgInfoRight}>
                    <span className={styles.msgDate}>
                      {msg.dateString ? msg.dateString : ''}
                    </span>
                    {!msg.read ? (
                      <GoCheck
                        className={styles.noReadIcon}
                        title="Marcar como lida"
                      />
                    ) : (
                      <IoCheckmarkDoneOutline
                        className={styles.ReadIcon}
                        title="Mensagem lida"
                      />
                    )}
                  </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.emptyUserMsg}>Você não possui mensagens.</p>
        )}
      </div>
    </div>
  );
};

export default UserMessages;