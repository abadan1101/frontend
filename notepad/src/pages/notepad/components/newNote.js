import { useState } from 'react';
import styles from "./newNote.module.css";

const NewNote = ({ onConfirm, onCancel }) => {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(title, notes);
    setTitle('');
    setNotes('');
    onCancel();
  };

  //funções em teste----------------------------------------------
  function handleKeyUp(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const txa = document.getElementById('txarea');
      const locCursor = txa.selectionStart;
      const textBeforeCursor = txa.value.slice(0, locCursor).trim();

      // Só insere marcador se a frase anterior terminar com ":" ou ";"
      if (textBeforeCursor.endsWith(":") || textBeforeCursor.endsWith(";")) {
        txa.value = txa.value.slice(0, locCursor) + "   ●  " + txa.value.slice(locCursor);

          // Reposiciona o cursor após o marcador
          setTimeout(() => {
              txa.selectionStart = txa.selectionEnd = locCursor + 6;
          }, 0);
      }
    }
  }
  //funções em teste----------------------------------------------

  return (
    <div className={styles.overlay}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <button type="button" className={styles.close} onClick={onCancel} aria-label="Fechar">×</button>
        <h2 className={styles.heading}>Nova Nota</h2>
        <input
          className={styles.input}
          type="text"
          placeholder="Título"
          maxLength={40}
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <textarea
          id="txarea"
          className={styles.textarea}
          onKeyUp={handleKeyUp}//em teste
          placeholder="Digite sua anotação..."
          value={notes}
          onChange={e => setNotes(e.target.value)}
          required
          rows={4}
        />
        <button
          className={styles.button}
          type="submit"
          disabled={title.trim() === '' || notes.trim() === ''}
        >
          Salvar
        </button>
      </form>
    </div>
  );
};

export default NewNote;