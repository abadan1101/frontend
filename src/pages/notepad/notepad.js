import { useState, useEffect} from 'react';

//IMPORTAÇÃO DA API
import api from '../../services/api.js';

//IMPORTAÇÃO DOS ESTILOS
import styles from './notepad.module.css';

//IMPORTAÇÃO DOS COMPONENTES
import Nav from './components/nav.js';
import NewNote from "./components/newNote.js";
import Notes from './components/notas.js'
import Trash from './components/trash.js';
import ModalLoad from '../../components/modalLoad/load.js';



const BlocoNotas = () => {
  
  // CONSTANTES E VARIÁVEIS--------------------------------------------------
  // Estado para controlar o carregamento inicial
  const [loading, setLoading] = useState(true);
  // Estado para buscar todas as notas
  const [allNotes, setAllNotes] = useState([]);
  // Estado para buscar notas excluídas
  const [trashNotes, setTrashNotes] = useState([]);
  // Estado para controlar a abertura do formulário de nova nota
  const [NewNoteOpen, setNewNoteOpen] = useState(false);
  // estado para controlar abertura da lixeira
  const [trashOpen, setTrashOpen] = useState(false);
  // Estado para controlar o índice da nota sendo arrastada
  const [draggedIndex, setDraggedIndex] = useState(null);
  // Estado para filtro
  const [filter, setFilter] = useState(() => localStorage.getItem("notepadFilter") || "all");
  // FIM DAS CONSTANTES E VARIÁVEIS------------------------------------------


  

  // FUNÇÕES PARA MANIPULAR AS ANOTAÇÕES-------------------------------------
  // hook para buscar todas as anotações ao carregar a página
  useEffect(() => {
    async function getAllNotes() {
      setLoading(true);
      const response = await api.get('/annotations/read');
      setAllNotes(response.data.filter(note => !note.trash));
      setLoading(false);
    }
    getAllNotes();
  }, []);

  // função para adicionar uma nova anotação
  async function handleSubmit(title, notes) {
    setLoading(true);
    const response = await api.post('/annotations/create', {
      title: title,
      notes:  notes,
      priority: false
    });
    setLoading(false);
    setAllNotes([...allNotes, response.data]);
  }

  // função para mover uma anotação para a lixeira
  async function handleTrash(id, toTrash = true) {
    await api.post(`/annotations/trash/${id}`, { trash: toTrash });
    setAllNotes(allNotes.filter(note => note._id !== id));
  }

  // função para salvar uma anotação editada
  async function handleSaveEdit(id, updatedNotes) {
    setLoading(true);
    const response = await api.post(`/annotations/update/${id}`, {
      notes: updatedNotes
    });

    setLoading(false);
    
    setAllNotes(allNotes.map(note =>
      note._id === id ? response.data : note
    ));

    // Retorne algo para indicar que terminou (pode ser o dado atualizado)
    return response.data;
  }
  // FIM DAS FUNÇÕES PARA MANIPULAR AS ANOTAÇÕES-----------------------------



  
  // FUNÇÕES PARA MANIPULAR A LIXEIRA----------------------------------------
  // hook para buscar notas excluídas ao abrir a lixeira
  useEffect(() => {
    async function getTrashNotes() {
      const response = await api.get('/trash/read');
      // Filtra para mostrar apenas notas que não estão na lixeira
      setTrashNotes(response.data.filter(note => note.trash));
    }

    getTrashNotes();
  }, [allNotes, trashOpen]); // Recarrega as notas excluídas quando allNotes ou trashOpen mudarem

  // função para restaurar uma anotação da lixeira
  async function handleRestoreNotes(id) {
    const response = await api.post(`/trash/restore/${id}`);
    // Remove da lixeira
    setTrashNotes(trashNotes.filter(note => note._id !== id));
    // Adiciona à lista principal no final
    const updatedNotes = [...allNotes, response.data];
    setAllNotes(updatedNotes);
    // Atualiza a ordem no backend
    const orderedIds = updatedNotes.map(note => note._id);
    await api.put('/annotations/order', { orderedIds });
  }

  // função para excluir uma anotação da lixeira
  async function handleDeleteNote(id) {
    await api.delete(`/trash/delete/${id}`);
    setTrashNotes(trashNotes.filter(note => note._id !== id));
  }

  // função para limpar toda a lixeira
  async function handleClearTrash() {
    await api.delete('/trash/clear');
    setTrashNotes([]); // Limpa o estado local das notas da lixeira
  }
  //FUNÇÕES PARA MANIPULAR A LIXEIRA-----------------------------------------



  
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



  // FUNÇÕES DE FILTRO-------------------------------------------------------
  function handleFilterChange(newFilter) {
    setFilter(newFilter);
  }

  const filteredNotes = allNotes.filter(note => {
    if (filter === "all") return true;
    if (filter === "priority") return note.priority === true;
    if (filter === "completed") return note.priority === false;
    return true;
  });
  // FIM DAS FUNÇÕES DE FILTRO----------------------------------------------



  // PAGINA DO MODULO DE ANOTAÇÕES-------------------------------------------
  return (
    <div className={styles.ModuloBlocoNotas}>

      {/* MODAL PARA AGUARDAR CARREGAMENTO DAS NOTAS */}
      <div>
        {loading &&(
          <ModalLoad />
        )}
      </div>

      {/* FORM PARA INCLUIR NOTAS */}
      <div>
        {NewNoteOpen &&(
          <NewNote
            isOpen={NewNoteOpen}
            onConfirm={handleSubmit}
            onCancel={setNewNoteOpen}
          />
        )}
      </div>

      {/* LISTA DE NOTAS */}
      <main>
        <ul>
          {filteredNotes
            .map((data, index) => (
            <li
              key={data._id}
              draggable={filter === "all"}
              onMouseDown={e => {
                if (
                  e.target.tagName === 'TEXTAREA' ||
                  e.target.closest('textarea')
                ) {
                  e.currentTarget.draggable = false;
                } else {
                  e.currentTarget.draggable = filter === "all";
                }
              }}
              onMouseUp={e => {
                e.currentTarget.draggable = filter === "all";
              }}
              onDragStart={e => {
                if (
                  e.target.tagName === 'TEXTAREA' ||
                  e.target.closest('textarea')
                ) {
                  e.preventDefault();
                  return;
                }
                if (filter === "all") {
                  handleDragStart(index);
                }
              }}
              onDragOver={filter === "all" ? handleDragOver : undefined}
              onDrop={filter === "all" ? () => handleDrop(index) : undefined}
              style={{ cursor: filter === "all" ? 'grab' : 'default' }}
            >
              <Notes
                data={data}
                onSaveEdit={handleSaveEdit}
                onTrash={handleTrash}
              />
            </li>
          ))}
        </ul>
      </main> 

      {/* MENU INFERIOR DE NOTAS */}
      <Nav 
        openForm={setNewNoteOpen}
        openTrash={setTrashOpen}
        onFilterChange={handleFilterChange}
      />

      {/* LIXEIRA */}
      {trashOpen && (
        <Trash
          deletedNotes={trashNotes}
          onCancel={setTrashOpen}
          onDelete={handleDeleteNote}
          onRestore={handleRestoreNotes}
          clearTrash={handleClearTrash}
        />
      )}
        
    </div>
  );
  // FIM DA PAGINA DO MODULO DE ANOTAÇÕES------------------------------------
}


export default BlocoNotas;