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
    e.preventDefault();
    if(e.key === 'Enter'){
      const txa = document.getElementById('txarea');
      const locCursor = txa.selectionStart;
      var val = txa.value;
      txa.value = val.slice(0, locCursor) + "○  " + val.slice(locCursor);
      txa.selectionEnd = locCursor + 3;
    }
  
  }
  function handleFocus(e) {
    setTimeout(()=>{
      e.preventDefault();
      if(document.getElementById('txarea').value === ''){
        document.getElementById('txarea').value ='○  ';
      }
    }, 200);
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
          onFocus={handleFocus}//em teste
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