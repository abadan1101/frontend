import React,  { useState, useEffect} from 'react';

import styles from './cadernoNotas.module.css';


const CadernoNotas = ({f_handleSubmit}) => {
  
  const [title, setTitles] = useState((''));
  const [notes, setNotes] = useState((''));

  //FUNÇÃO QUE MANDA OS DADOS PARA O COMPONENTE PAI
  const handleSubmit = (e) => {
    e.preventDefault();
    f_handleSubmit(title, notes); // Chama a função passada como prop
    setTitles(''); // Limpa o título
    setNotes(''); // Limpa as anotações
  };

  //HOOK QUE MONITORA O CAMPO DE TEXTO E HABILITA O BOTÃO DE SALVAR
  useEffect(() => {
    async function enableSubmitButton() {
      let btn = document.getElementById('btn_sumit');
      btn.style.background = '#FFD3CA';
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
      txa.value = val.slice(0, locCursor) + "○ " + val.slice(locCursor);
      txa.selectionEnd = locCursor + 3;
    }
  
  }

  function handleFocus(e) {
    setTimeout(()=>{
      e.preventDefault();
      if(document.getElementById('txarea').value === ''){
        document.getElementById('txarea').value ='○ ';
      }
    }, 200);
  }
  //funções em teste----------------------------------------------


  return (
    <aside className={styles.aside}>
        <strong>Caderno de Notas</strong>
        <form onSubmit={handleSubmit}>

          <div className={styles.inputBlock}>
            <label htmlFor="title">Título da Anotação</label>
            <input
              required
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
      </aside>
  );
}

export default CadernoNotas;