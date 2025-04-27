import React,  { useState, useEffect} from 'react';

import api from '../../services/api.js';

import styles from './blocoNotas.module.css';

import CadernoNotas from './components/cadernoNotas.js'; 
import Notes from './components/notas.js'


const BlocoNotas = () => {
  
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
      title: e.target[0].value,
      notes:  e.target[1].value,
      priority: false
    });

    setAllNotes([...allNotes, response.data]);
  }

  return (
    <div className={styles.ModuloBlocoNotas}>

      <CadernoNotas f_handleSubmit={handleSubmit}/>

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