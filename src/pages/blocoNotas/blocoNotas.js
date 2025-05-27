import { useState, useEffect} from 'react';

//IMPORTAÇÃO DA API
import api from '../../services/api.js';

//IMPORTAÇÃO DOS ESTILOS
import styles from './blocoNotas.module.css';

//IMPORTAÇÃO DOS COMPONENTES
import Nav from './components/nav.js';
import NewNote from "./components/newNote.js";
import Notes from './components/notas.js'
import Trash from './components/trash.js';



const BlocoNotas = () => {
  
  // CONSTANTES E VARIÁVEIS--------------------------------------------------
  // Estado para armazenar todas as notas
  const [allNotes, setAllNotes] = useState([]);
  // Estado para controlar a abertura do formulário de nova nota
  const [NewNoteOpen, setNewNoteOpen] = useState(false);
  // estado para controlar abertura da lixeira
  const [trashOpen, setTrashOpen] = useState(false);
  // Estado para controlar o índice da nota sendo arrastada
  const [draggedIndex, setDraggedIndex] = useState(null);
  // FIM DAS CONSTANTES E VARIÁVEIS------------------------------------------


  

  // FUNÇÕES PARA MANIPULAR AS ANOTAÇÕES-------------------------------------
  // hook para buscar todas as anotações ao carregar a página
  useEffect(() => {
    async function getAllNotes() {
      const response = await api.get('/annotations');
      // Filtra para mostrar apenas notas que não estão na lixeira
      setAllNotes(response.data.filter(note => !note.trash));
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

  // função para mover uma anotação para a lixeira
  async function handleTrash(id) {
    await api.post(`/trash/${id}`);
    setAllNotes(allNotes.filter(note => note._id !== id));
  }

  // função para salvar uma anotação editada
  async function handleSaveEdit(id, updatedNotes) {
    const response = await api.post(`/contents/${id}`, {
      notes: updatedNotes
    });

    setAllNotes(allNotes.map(note =>
      note._id === id ? response.data : note
    ));
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
    await api.put('/contents/order', { orderedIds });
  };
  // FIM DAS FUNÇÕES DE DRAG AND DROP (ARRASTAR E SOLTAR NOTAS---------------



  // FUNÇÕES DIVERSAS--------------------------------------------------------
   // função para fechar o formulário de nova nota
  const handleCancelNewNote = () => {
    setNewNoteOpen(false);
  };
  // FIM DAS FUNÇÕES DIVERSAS------------------------------------------------



  // PAGINA DO MODULO DE ANOTAÇÕES-------------------------------------------
  return (
    <div className={styles.ModuloBlocoNotas}>

      {/* MENU SUPERIOR DE NOTAS */}
      <Nav 
        openForm={setNewNoteOpen}
        openTrash={setTrashOpen}
      />

      {/* FORM PARA INCLUIR NOTAS */}
      <div>
        {NewNoteOpen &&(
          <NewNote
            isOpen={NewNoteOpen}
            onConfirm={handleSubmit}
            onCancel={handleCancelNewNote}
          />
        )}
        
      </div>

      {/* LISTA DE NOTAS */}
      <main>
        <ul>
          {allNotes.map((data, index) => (
            <li
              key={data._id}
              // Só permite draggable se o mouse NÃO estiver sobre o textarea
              draggable={true}
              onMouseDown={e => {
                // Se o mouse está sobre o textarea, desativa o draggable do li
                if (
                  e.target.tagName === 'TEXTAREA' ||
                  e.target.closest('textarea')
                ) {
                  e.currentTarget.draggable = false;
                } else {
                  e.currentTarget.draggable = true;
                }
              }}
              onMouseUp={e => {
                // Sempre reativa o draggable após o mouse sair
                e.currentTarget.draggable = true;
              }}
              onDragStart={e => {
                // Impede arrastar se o evento começou dentro de um textarea
                if (
                  e.target.tagName === 'TEXTAREA' ||
                  e.target.closest('textarea')
                ) {
                  e.preventDefault();
                  return;
                }
                handleDragStart(index);
              }}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(index)}
              style={{ cursor: 'grab' }}
            >
              <Notes
                data={data}
                onSaveEdit={handleSaveEdit}
                onTrash={handleTrash} // Usando a mesma função de delete para lixeira
              />
            </li>
          ))}
        </ul>
      </main> 

      {/* LIXEIRA */}
      {trashOpen && (
        <Trash />
      )}
        
    </div>
  );
  // FIM DA PAGINA DO MODULO DE ANOTAÇÕES------------------------------------
}


export default BlocoNotas;