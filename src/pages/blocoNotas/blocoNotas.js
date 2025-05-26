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
  
  // CONSTANTES E VARIÁVEIS--------------------------------------------------
  // Estado para armazenar todas as notas
  const [allNotes, setAllNotes] = useState([]);
  // Estado para controlar a abertura do formulário de nova nota
  const [NewNoteOpen, setNewNoteOpen] = useState(false);
  // Estado para controlar o índice da nota sendo arrastada
  const [draggedIndex, setDraggedIndex] = useState(null);
  // FIM DAS CONSTANTES E VARIÁVEIS------------------------------------------


  

  // FUNÇÕES PARA MANIPULAR AS ANOTAÇÕES-------------------------------------
  // hook para buscar todas as anotações ao carregar a página
  useEffect(() => {
    async function getAllNotes() {
      const response = await api.get('/annotations');
      setAllNotes(response.data);
    }

    getAllNotes();
  }, []);

  // função para adicionar uma nova anotação
  async function handleSubmit(title, notes) {
    const response = await api.post('/annotations', {
      title: title,
      notes:  notes,
      priority: false
    });

    setAllNotes([...allNotes, response.data]);
  }

  // função para deletar uma anotação
  async function handleDelete(id) {
    await api.delete(`/annotations/${id}`);
    setAllNotes(allNotes.filter(note => note._id !== id));
  }
  // FIM DAS FUNÇÕES PARA MANIPULAR AS ANOTAÇÕES-----------------------------



  
  // FUNÇÕES PARA DRAG AND DROP (ARRASTAR E SOLTAR NOTAS)--------------------
  // Função chamada quando o drag começa
  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  // Permite o drop
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Troca as notas de lugar ao soltar
  const handleDrop = async (index) => {
    if (draggedIndex === null || draggedIndex === index) return;
    const updatedNotes = [...allNotes];
    const [removed] = updatedNotes.splice(draggedIndex, 1);
    updatedNotes.splice(index, 0, removed);
    setAllNotes(updatedNotes);
    setDraggedIndex(null);

    // Envia a nova ordem para o backend
    const orderedIds = updatedNotes.map(note => note._id);
    await api.put('/annotations/order', { orderedIds });
  };
  // FIM DAS FUNÇÕES DE DRAG AND DROP (ARRASTAR E SOLTAR NOTAS---------------



  // FUNÇÕES DIVERSAS--------------------------------------------------------
   // função para fechar o formulário de nova nota
  const handleCancel = () => {
    setNewNoteOpen(false);
  };
  // FIM DAS FUNÇÕES DIVERSAS------------------------------------------------



  // PAGINA DO MODULO DE ANOTAÇÕES-------------------------------------------
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
  // FIM DA PAGINA DO MODULO DE ANOTAÇÕES------------------------------------
}


export default BlocoNotas;