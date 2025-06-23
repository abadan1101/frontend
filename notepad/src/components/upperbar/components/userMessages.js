import styles from './userMessages.module.css';

const UserMessages = ({ messages, open, onClose }) => {
  if (!open) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.iconMessages}>📩 Mensagens</h2>
        <button className={styles.closeBtn} onClick={onClose} title="Fechar">×</button>
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