import styles from "./ConfirmModal.module.css";

const ConfirmModal = ({ isOpen, onConfirm, onCancel, title, message }) => {
  if (!isOpen) return null;
  

// USAR NO COMPONENTE QUE QUISER ABRIR O MODAL
// import ConfirmModal from "./ConfirmModal";

// const [modalOpen, setModalOpen] = useState(false);

//   const handleConfirm = () => {
//     alert("Confirmado!");
//     setModalOpen(false);
//   };

//   const handleCancel = () => {
//     setModalOpen(false);
//   };

  // <div>
  //     <button onClick={() => setModalOpen(true)}>Abrir Modal</button>
  //     <ConfirmModal
  //       isOpen={modalOpen}
  //       onConfirm={handleConfirm}
  //       onCancel={handleCancel}
  //       message="Tem certeza que deseja continuar?"
  //     />
  //   </div>


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