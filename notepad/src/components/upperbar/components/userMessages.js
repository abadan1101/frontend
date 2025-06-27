import { useEffect } from "react";
import styles from './userMessages.module.css';
import { GoArrowLeft, GoX } from "react-icons/go";

const UserMessages = ({ messages, open, onClose }) => {
  // Impede o scroll do body quando o modal está aberto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // Limpa ao desmontar
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.hederMessages}>
          <GoArrowLeft className={styles.arrowClose} onClick={onClose} title="Fechar"/>
          <GoX className={styles.xClose} onClick={onClose} title="Fechar"/>
          <h2>Mensagens</h2>
        </div>
        {messages && messages.length > 0 ? (
          <ul className={styles.listMessages}>
            {messages.map(msg => (
              <li className={styles.userMsg} key={msg.id}>{msg.content}</li>
            ))}
          </ul>
        ) : (
          <p className={styles.empyUserMsg}>Você não possui mensagens.</p>
        )}
      </div>
    </div>
  );
};

export default UserMessages;