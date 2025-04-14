import React,  { useState, useEffect} from 'react';

import api from '../../services/api.js';

import './styles/modulo.css'
import './styles/sidebar.css';
import './styles/main.css';

import Notes from './components/nontas.js'


const BlocoNotas = () => {
  
  const [title, setTitles] = useState((''));
  const [notes, setNotes] = useState((''));
  const [allNotes, setAllNotes] = useState([]);

  useEffect(() => {
    async function getAllNotes() {
      const response = await api.get('/annotations');
      setAllNotes(response.data);
    }

    getAllNotes();
  }, []);
  
  async function handleSubmit(e) {
    e.preventDefault();
    
    const response = await api.post('/annotations', {
      title,
      notes,
      priority: false
    });

    setTitles('');
    setNotes('');

    setAllNotes([...allNotes, response.data]);
  }

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
      txa.value = val.slice(0, locCursor) + "▪️ " + val.slice(locCursor);
      txa.selectionEnd = locCursor + 3;
    }
  
  }

  function handleFocus(e) {
    setTimeout(()=>{
      e.preventDefault();
      if(document.getElementById('txarea').value === ''){
        document.getElementById('txarea').value ='▪️ ';
      }
    }, 200);
  }
  //funções em teste----------------------------------------------


  return (
    <div id="ModuloBlocoNotas">

      <aside>
        <strong>Caderno de Notas</strong>
        <form onSubmit={handleSubmit}>

          <div className="input-block">
            <label htmlFor="title">Título da Anotação</label>
            <input
              required
              value={title}
              onChange={e => setTitles(e.target.value)}
            />
          </div>

          <div className="input-block">
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

      <main>
        <ul>
          {allNotes.map(data => (
            <Notes data={data} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default BlocoNotas;