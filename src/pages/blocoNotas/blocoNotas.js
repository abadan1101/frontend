import React,  { useState, useEffect} from 'react';

//IMPORTAÇÃO DA API
import api from '../../services/api.js';

//IMPORTAÇÃO DOS ESTILOS
import styles from './blocoNotas.module.css';

//IMPORTAÇÃO DOS COMPONENTES
import NewNote from "./components/newNote.js";
import Notes from './components/notas.js'


const BlocoNotas = () => {
  
  // CONSTANTES E VARIÁVEIS
  const [allNotes, setAllNotes] = useState([]);
  const [NewNoteOpen, setNewNoteOpen] = useState(false);

  // HOOK PARA BUSCAR AS ANOTAÇÕES
  useEffect(() => {
    async function getAllNotes() {
      const response = await api.get('/annotations');
      setAllNotes(response.data);
    }

    getAllNotes();
  }, []);
  
  // FUNÇÃO PARA ADICIONAR ANOTAÇÕES
  async function handleSubmit(title, notes) {
    const response = await api.post('/annotations', {
      title: title,
      notes:  notes,
      priority: false
    });

    setAllNotes([...allNotes, response.data]);
  }

  const handleCancel = () => {
    setNewNoteOpen(false);
  };
  

  // PAGINA DO MODULO DE ANOTAÇÕES
  return (
    <div className={styles.ModuloBlocoNotas}>

      {/* MENU SUPERIOR DE NOTAS */}
      <div className={styles.nav}>
        <div>
          <button onClick={() => setNewNoteOpen(true)}>Nova Nota</button>
          <section className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input type="radio" name="priority" id="all" className={styles.radioInput} defaultChecked />
              <span className={styles.customRadio}></span>
              Todas
            </label>
            <label className={styles.radioLabel}>
              <input type="radio" name="priority" id="priority" className={styles.radioInput} />
              <span className={styles.customRadio}></span>
              Prioridade
            </label>
            <label className={styles.radioLabel}>
              <input type="radio" name="priority" id="completed" className={styles.radioInput} />
              <span className={styles.customRadio}></span>
              Normais
            </label>
          </section>
        </div>
      </div>

      {/* FORM PARA INCLUIR NOTAS */}
      <div>
        <NewNote
          isOpen={NewNoteOpen}
          onConfirm={handleSubmit}
          onCancel={handleCancel}
        />
      </div>

      {/* LISTA DE NOTAS */}
      <main>
        <ul>
          {allNotes.map(data => (
            <Notes
             data={data}
             key={data._id}
            />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default BlocoNotas;