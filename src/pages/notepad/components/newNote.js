import { useState, useEffect} from 'react';
import styles from "./newNote.module.css";

const NewNote = ({ onConfirm, onCancel }) => {

  // CONSTANTES E VARIÁVEIS
  const [title, setTitles] = useState((''));
  const [notes, setNotes] = useState((''));

  //FUNÇÃO QUE MANDA OS DADOS PARA O COMPONENTE PAI
  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(title, notes); // Chama a função passada como prop
    setTitles(''); // Limpa o título
    setNotes(''); // Limpa as anotações
    onCancel(); // Fecha o modal
  };

  //FUNÇÃO QUE FECHA O MODAL
  const handCancel = (e) => {
    setTitles(''); // Limpa o título
    setNotes(''); // Limpa as anotações
    onCancel(); // Fecha o modal
  };

  //HOOK QUE MONITORA O CAMPO DE TEXTO E HABILITA O BOTÃO DE SALVAR
  useEffect(() => {
    function enableSubmitButton() {
      let btn = document.getElementById('btn_sumit');
      if(btn){btn.style.background = '#FFD3CA';}
      if (title !== '' && notes !== '') {
        btn.style.background = '#EB8F7A';
      }
    }

    enableSubmitButton();
  }, [title, notes]);

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
      <div className={styles.modal}>
        <div className={styles.closecontainer}>
          <label className={styles.close} onClick={handCancel}>X</label>
        </div>
        <main className={styles.main}>
          
          <strong>Caderno de Notas</strong>
          
          <form onSubmit={handleSubmit}>
  
            <div className={styles.inputBlock}>
              <label htmlFor="title">Título da Anotação</label>
              
              <input
                required
                maxLength={40}
                value={title}
                onChange={e => setTitles(e.target.value)}
              />
            </div>
  
            <div className={styles.inputBlock}>
              <label htmlFor="nota">Anotações</label>
              <textarea
              id="txarea"
                onKeyUp={handleKeyUp}//em teste
                onFocus={handleFocus}//em teste
                required
                value={notes}
                onChange={e => setNotes(e.target.value)}
              />
            </div>
  
            <button id="btn_sumit" type="submit">Salvar</button>
  
          </form>
        </main>
      </div>  
    </div>
  );
};

export default NewNote;