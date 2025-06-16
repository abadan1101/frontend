import styles from "./alertModal.module.css";

const AlertModal = ({ isOpen, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className={styles.actions}>
          <button className={styles.confirm} onClick={onConfirm}>Confirmar</button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;