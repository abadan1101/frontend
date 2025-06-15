import styles from "./load.module.css";

const ConfirmModal = () => {
  
    return (
    <div className={styles.ModuloBlocoNotas}>
        <div className={styles.modalLoading}>
            <div className={styles.loader}></div>
            <span>Carregando...</span>
        </div>
    </div>
    );
};

export default ConfirmModal;