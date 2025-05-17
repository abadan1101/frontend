import React from "react";
import styles from "./newNote.module.css";

const NewNote = ({ isOpen, onConfirm, onCancel, message }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p>{message}</p>
        <div className={styles.actions}>
          <button className={styles.confirm} onClick={onConfirm}>Confirmar</button>
          <button className={styles.cancel} onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default NewNote;