import styles from "./ConfirmModal.module.css";

const ConfirmModal = ({ isOpen, onConfirm, onCancel, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className={styles.actions}>
          <button className={styles.confirm} onClick={onConfirm}>Confirmar</button>
          <button className={styles.cancel} onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;