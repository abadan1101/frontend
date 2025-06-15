import { MdOutlineRestartAlt, MdDeleteOutline  } from "react-icons/md";

import styles from "./trash.module.css";

const Trash = ({ deletedNotes = [], onCancel, onDelete, onRestore ,clearTrash }) => {
  return (
    <div className={styles.overlay}>
      <main className={styles.modal}>
        <header>
          <span className={styles.modalClose} onClick={() => onCancel()}>X</span>
          <h2 className={styles.title}>Lixeira</h2>
          <p className={styles.subtitle}>Atenção! As notas serão excluídas definitivamente após 180 dias.</p>
        </header>
        <section className={styles.content}>
          {deletedNotes.length === 0 ? (
            <p className={styles.empty}>A lixeira está vazia!</p>
          ) : (
            <div className={styles.list}>
              {deletedNotes.map((note, idx) => (
                <div key={note.id || idx} className={styles.noteItem}>
                    <div>
                      <p className={styles.noteInfo}>{note.title}</p>
                      <span className={styles.deletedAt}>
                        Excluída em:{" "}
                        {note.date
                          ? new Date(note.date).toLocaleDateString("pt-BR", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "Data desconhecida"}
                      </span>
                    </div>
                    <div className={styles.actions}>
                      <MdOutlineRestartAlt
                        className={styles.restoreBtn}
                        title="Restaurar nota" // Adiciona tooltip
                        onClick={() => onRestore(note._id)}
                      />
                      <MdDeleteOutline
                        className={styles.deleteBtn}
                        title="Excluir definitivamente" // Adiciona tooltip
                        onClick={() => onDelete(note._id)}
                      />

                    </div>
                </div>
              ))}
            </div>
          )}
        </section>
        <button
          className={styles.button}
          onClick={() => clearTrash()}
          disabled={deletedNotes.length === 0}
        >
          Limpar Lixeira
        </button>
      </main>
    </div>
  );
};

export default Trash;