import { useState, useEffect} from 'react';
import { SlNote } from "react-icons/sl";

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
import ConfirmModal from '../../components/modalConfirm/ConfirmModal.js';



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
  // estado para controlar a abertura do modal de confirmação
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: null,
    onCancel: null,
  });
  // FIM DAS CONSTANTES E VARIÁVEIS------------------------------------------


  

  // FUNÇÕES PARA MANIPULAR AS ANOTAÇÕES-------------------------------------
  // hook para buscar todas as anotações ao carregar a página
  useEffect(() => {
    async function getAllNotes() {
      setLoading(true);
      try {
        const response = await api.get('/annotations/read');
        setAllNotes(response.data);
      } catch (error) {
        console.error('Erro ao carregar anotações:', error);
        alert("Erro ao carregar anotações")
      } finally {
        setLoading(false);
      }
    }

    getAllNotes();
  }, []);

  // função para adicionar uma nova anotação
  async function handleSubmit(title, notes) {
    setLoading(true);
    try {
      const response = await api.post('/annotations/create', {
        title,
        notes,
        priority: false
      });
      setAllNotes(prevNotes => [...prevNotes, response.data]);
    } catch (error) {
      console.error('Erro ao criar anotação:', error);
      alert("Erro ao criar anotação")
    } finally {
      setLoading(false);
    }
  }

  // função para mover uma anotação para a lixeira
  async function handleTrash(id, toTrash = true) {
    try {
      await api.post(`/annotations/trash/${id}`, { trash: toTrash });
      setAllNotes(prevNotes => prevNotes.filter(note => note._id !== id));
    } catch (error) {
      console.error('Erro ao mover anotação para a lixeira:', error);
       alert("Erro ao mover anotação para a lixeira")
    }
  }

  // função para salvar uma anotação editada
  async function handleSaveEdit(id, updatedNotes) {
    setLoading(true);
    try {
      const response = await api.post(`/annotations/update/${id}`, {
        notes: updatedNotes
      });

      setAllNotes(prevNotes =>
        prevNotes.map(note =>
          note._id === id ? response.data : note
        )
      );

      return response.data;

    } catch (error) {
      console.error('Erro ao salvar edição da anotação:', error);
      alert("Erro ao salvar edição da anotação")
      return null;

    } finally {
      setLoading(false);
    }
  }

  // função para alternar prioridade
  async function handleTogglePriority(id) {
    setLoading(true);
    try {
      const response = await api.post(`/priorities/${id}`);
      setAllNotes(prevNotes =>
        prevNotes.map(note =>
          note._id === id ? response.data : note
        )
      );
    } catch (error) {
      console.error('Erro ao alternar prioridade da anotação:', error);
      alert("Erro ao alternar prioridade")
    } finally {
      setLoading(false);
    }
  }
  // FIM DAS FUNÇÕES PARA MANIPULAR AS ANOTAÇÕES-----------------------------



  
  // FUNÇÕES PARA MANIPULAR A LIXEIRA----------------------------------------
  // hook para buscar notas excluídas ao abrir a lixeira
  useEffect(() => {
    if (!trashOpen) return;
    async function getTrashNotes() {
      try {
        setLoading(true);
        const response = await api.get('/trash/read');
        setTrashNotes(response.data.filter(note => note.trash));
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar notas excluídas:', error);
        alert("Erro ao buscar notas excluídas")
        setLoading(false);
      }
    }

    getTrashNotes();
  }, [trashOpen]);

  // função para restaurar uma anotação da lixeira
  async function handleRestoreNotes(id) {
    try {
      const response = await api.post(`/trash/restore/${id}`);

      setTrashNotes(prevTrash =>
        prevTrash.filter(note => note._id !== id)
      );

      const updatedNotes = [...allNotes, response.data];
      setAllNotes(updatedNotes);

      const orderedIds = updatedNotes.map(note => note._id);
      await api.put('/annotations/order', { orderedIds });

      return response.data;
    } catch (error) {
      console.error('Erro ao restaurar anotação:', error);
      alert("Erro ao restaurar anotação da lixeira")
      return null;
    }
  }

  // função para confirmar a exclusão de uma anotação da lixeira
  function handleConfirmDelete(id) {
    setConfirmModal({
      isOpen: true,
      title: "Excluir",
      message: "Tem certeza que deseja excluir esta nota permanentemente?",
      onConfirm: () => handleDeleteNote(id),
      onCancel: () => setConfirmModal({ isOpen: false }),
    });
  }

  // função para excluir uma anotação da lixeira
  async function handleDeleteNote(id) {
    await api.delete(`/trash/delete/${id}`);
    setTrashNotes(trashNotes.filter(note => note._id !== id));
    setConfirmModal({ isOpen: false }); // Fecha o modal de confirmação
  }

  // função para confirmar a limpeza da lixeira
  function handleConfirmClearTrash(id) {
    setConfirmModal({
      isOpen: true,
      title: "Limpar Lixeira",
      message: "Tem certeza que deseja limpar a lixeira permanentemente?",
      onConfirm: () => handleClearTrash(id),
      onCancel: () => setConfirmModal({ isOpen: false }),
    });
  }

  // função para limpar toda a lixeira
  async function handleClearTrash() {
    await api.delete('/trash/clear');
    setTrashNotes([]); // Limpa o estado local das notas da lixeira
    setConfirmModal({ isOpen: false }); // Fecha o modal de confirmação
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
    setLoading(true);
    const orderedIds = updatedNotes.map(note => note._id);
    await api.put('/annotations/order', { orderedIds });
    setLoading(false);
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
        {filteredNotes.length === 0 ? (
          <p className={styles.empty}>
            <SlNote className={styles.emptyIcon} />
            Nenhuma nota encontrada.
          </p>
        ) : (
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
                  onTogglePriority={handleTogglePriority}
                  filter={filter}
                />
              </li>
            ))}
          </ul>
        )}
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
          onDelete={handleConfirmDelete}
          onRestore={handleRestoreNotes}
          clearTrash={handleConfirmClearTrash}
        />
      )}

      {/* MODAL DE CONFIRMAÇÃO */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onConfirm={confirmModal.onConfirm}
        onCancel={confirmModal.onCancel}
        title={confirmModal.title}
        message={confirmModal.message}
      />
        
    </div>
  );
  // FIM DA PAGINA DO MODULO DE ANOTAÇÕES------------------------------------
}


export default BlocoNotas;