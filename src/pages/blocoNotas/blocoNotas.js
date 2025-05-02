import React,  { useState, useEffect} from 'react';

//IMPORTAÇÃO DA API
import api from '../../services/api.js';

//IMPORTAÇÃO DOS ESTILOS
import styles from './blocoNotas.module.css';

//IMPORTAÇÃO DOS COMPONENTES
// import CadernoNotas from './components/cadernoNotas.js'; 
import Notes from './components/notas.js'


const BlocoNotas = () => {
  
  // CONSTANTES E VARIÁVEIS
  const [allNotes, setAllNotes] = useState([]);

  // HOOK PARA BUSCAR AS ANOTAÇÕES
  useEffect(() => {
    async function getAllNotes() {
      const response = await api.get('/annotations');
      setAllNotes(response.data);
    }

    getAllNotes();
  }, []);
  
  // FUNÇÃO PARA ADICIONAR ANOTAÇÕES
  // async function handleSubmit(title, notes) {
  //   const response = await api.post('/annotations', {
  //     title: title,
  //     notes:  notes,
  //     priority: false
  //   });

  //   setAllNotes([...allNotes, response.data]);
  // }

  // PAGINA DO MODULO DE ANOTAÇÕES
  return (
    <div className={styles.ModuloBlocoNotas}>

      {/* <CadernoNotas f_handleSubmit={handleSubmit}/> */}

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