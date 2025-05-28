import styles from "./trash.module.css";

const Trash = ({ deletedNotes = [], onCancel }) => {
  return (
    <div className={styles.overlay}>
      <main className={styles.modal}>
        <header className={styles.title}>
          <h2 className={styles.title}>Lixeira</h2>
          <p className={styles.subtitle}>Aqui estão suas notas excluídas</p>
        </header>
        <section className={styles.content}>
          {deletedNotes.length === 0 ? (
            <p className={styles.empty}>Nenhuma nota excluída.</p>
          ) : (
            <ul className={styles.list}>
              {deletedNotes.map((note, idx) => (
                <li key={note.id || idx} className={styles.item}>
                  <div className={styles.noteHeader}>
                    <h3>{note.title}</h3>
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
                    <div className={styles.actions}>
                      <button
                        className={styles.restoreBtn}
                        title="Restaurar"
                        onClick={() => note.onRestore && note.onRestore(note)}
                      >
                        ♻️
                      </button>
                      <button
                        className={styles.deleteBtn}
                        title="Excluir permanentemente"
                        onClick={() => note.onDelete && note.onDelete(note)}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  <p>{note.content}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
        <button className={styles.button} onClick={() => onCancel()}>
          <span className={styles.icon}>🗑️</span>
          <span className={styles.text}>Lixeira</span>
        </button>
      </main>
    </div>
  );
};

export default Trash;