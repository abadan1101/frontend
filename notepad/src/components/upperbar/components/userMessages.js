import { useEffect, useState } from "react";
import styles from './userMessages.module.css';
import { GoArrowLeft, GoX, GoCheck } from "react-icons/go";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const UserMessages = ({ messages, open, onClose, marcarComoLida }) => {
  // Estado local para controlar mensagens lidas
  const [localMessages, setLocalMessages] = useState([]);

  //hook para mostrae todas as mensagens, mesmo as recentes
  useEffect(() => {
    setLocalMessages(messages);
  }, [messages]);

  // Impede o scroll do body quando o modal está aberto e fecha com ESC
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      const handleEsc = (e) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleEsc);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleEsc);
      };
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

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
                      {msg.date ? msg.date : ''}
                    </span>
                    {!msg.read ? (
                      <GoCheck
                        className={styles.markReadIcon}
                        title="Marcar como lida"
                        style={{ cursor: 'pointer', marginLeft: 16, fontSize: 22, color: '#888' }}
                      />
                    ) : (
                      <IoCheckmarkDoneOutline
                        className={styles.markReadIcon}
                        title="Mensagem lida"
                        style={{ marginLeft: 16, fontSize: 22, color: '#4caf50', opacity: 0.7, cursor: 'default' }}
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