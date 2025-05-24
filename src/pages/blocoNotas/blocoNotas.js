import { useState, useEffect} from 'react';

//IMPORTAÇÃO DA API
import api from '../../services/api.js';

//IMPORTAÇÃO DOS ESTILOS
import styles from './blocoNotas.module.css';

//IMPORTAÇÃO DOS COMPONENTES
import Nav from './components/nav.js';
import NewNote from "./components/newNote.js";
import Notes from './components/notas.js'



const BlocoNotas = () => {
  
  // CONSTANTES E VARIÁVEIS
  const [allNotes, setAllNotes] = useState([]);
  const [NewNoteOpen, setNewNoteOpen] = useState(false);

  // Estado para controlar o índice da nota sendo arrastada
  const [draggedIndex, setDraggedIndex] = useState(null);

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

  // FUNÇÃO PARA APAGAR ANOTAÇÕES
  async function handleDelete(id) {
    await api.delete(`/annotations/${id}`);
    setAllNotes(allNotes.filter(note => note._id !== id));
  }

  // Função chamada quando o drag começa
  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  // Permite o drop
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Troca as notas de lugar ao soltar
  const handleDrop = (index) => {
    if (draggedIndex === null || draggedIndex === index) return;
    const updatedNotes = [...allNotes];
    const [removed] = updatedNotes.splice(draggedIndex, 1);
    updatedNotes.splice(index, 0, removed);
    setAllNotes(updatedNotes);
    setDraggedIndex(null);
  };

  // PAGINA DO MODULO DE ANOTAÇÕES
  return (
    <div className={styles.ModuloBlocoNotas}>

      {/* MENU SUPERIOR DE NOTAS */}
      <Nav 
        openForm={setNewNoteOpen}
      />

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
          {allNotes.map((data, index) => (
            <li
              key={data._id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(index)}
              style={{ cursor: 'grab' }}
            >
              <Notes
                data={data}
                onDelete={handleDelete}
              />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default BlocoNotas;