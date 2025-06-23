import { useState, useEffect, useCallback} from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { SlNote } from "react-icons/sl";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
import AlertModal from '../../components/alertModal/alertModal.js';



const BlocoNotas = () => {
  const { searchTerm } = useOutletContext();
  // CONSTANTES E VARIÁVEIS--------------------------------------------------
  // Estado para armazenar o tema
  const [theme, setTheme] = useState("light");
  // Estado para armazenar o erro
  const [error, setError] = useState(null); // Estado para armazenar o erro
  // Hook para navegação
  const navigate = useNavigate(); // Hook para navegação
  // Estado para controlar se já redirecionou
  const [hasRedirected, setHasRedirected] = useState(false);
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
  // Estado para controlar o índice da nota onde o drop está ocorrendo
  const [dragOverIndex, setDragOverIndex] = useState(null);
  // Estado para filtro
  const [filter, setFilter] = useState(() => localStorage.getItem("notepadFilter") || "all");
  // estado para impedir mover notas em caso de filto ativo
  const canDrag = filter === "all" && !searchTerm;
  // estado para controlar a abertura do modal de confirmação
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: null,
    onCancel: null,
  });
  const [alertModal, setAlertModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: null,
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
        setError(null); // Limpa o erro se sucesso
      } catch (err) {
        setError(err); // Salva o erro
        console.error('Erro ao carregar anotações:', err);
        toast.error("Erro ao carregar anotações")
      } finally {
        setLoading(false);
      }
    }

    getAllNotes();
  }, []);

  // Hook para definir o tema com base na preferência do usuário
  useEffect(() => {
    const match = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(match.matches ? "dark" : "light");
    const handler = (e) => setTheme(e.matches ? "dark" : "light");
    match.addEventListener("change", handler);
    return () => match.removeEventListener("change", handler);
  }, []);

  //MÉTODO PARA REDIRECIONAR PARA A PÁGINA DE LOGIN CASO A SESSÃO EXPIRE
  const handleRedirectLogin = useCallback(() => {
    setAlertModal({
      isOpen: true,
      title: "Sessão expirada",
      message: "Sua sessão expirou. Você será redirecionado para a página de login.",
      onConfirm: () => {
        setAlertModal({ isOpen: false });
        navigate('/');
      },
    });
  }, [navigate, setAlertModal]);

  // Hook para redirecionar para a página de login se ocorrer um erro 401
  useEffect(() => {
    if (
      error &&
      error.response?.status === 401 &&
      !hasRedirected
    ) {
      setHasRedirected(true);
      handleRedirectLogin();
    }
  }, [allNotes, error, navigate, hasRedirected, handleRedirectLogin]);

  // função para adicionar uma nova anotação
  async function handleSubmit(title, notes) {
      toast.loading("Criando anotação...");
    try {
      const response = await api.post('/annotations/create', {
        title,
        notes,
        priority: false
      });
      setError(null); // Limpa o erro se sucesso
      setAllNotes(prevNotes => [...prevNotes, response.data]);
      toast.dismiss(); // remove loading
      toast.success("Anotação criada com sucesso!");

    } catch (error) {
      console.error('Erro ao criar anotação:', error);
      setError(error); // Salva o erro
      toast.dismiss(); // remove loading
      toast.error("Erro ao criar anotação");
    } finally {
    }
  }

  // função para mover uma anotação para a lixeira
  async function handleTrash(id, toTrash = true) {
    // 1. Backup das anotações
    const previousNotes = [...allNotes];

    // 2. Atualização otimista: remove ou restaura visualmente
    setAllNotes(prev =>
      prev.filter(note => note._id !== id)
    );

    toast.loading(
      toTrash
        ? "Enviando para a lixeira..."
        : "Restaurando anotação..."
    );

    try {
      await api.post(`/annotations/trash/${id}`, { trash: toTrash });

      toast.dismiss(); // remove loading
      toast.success(
        toTrash
          ? "Anotação enviada para a lixeira com sucesso!"
          : "Anotação restaurada com sucesso!"
      );
      setError(null); // Limpa o erro se sucesso

    } catch (error) {
      setError(error); // Limpa o erro se sucesso
      console.error('Erro ao alterar status da anotação:', error);

      // Reverte
      setAllNotes(previousNotes);

      toast.dismiss();
      toast.error(
        toTrash
          ? "Erro ao mover anotação para a lixeira"
          : "Erro ao restaurar anotação"
      );
    }
  }

  // função para salvar uma anotação editada
  async function handleSaveEdit(id, updatedNotes) {
    toast.loading("Alterando anotação...");
    try {
      const response = await api.post(`/annotations/update/${id}`, {
        notes: updatedNotes
      });

      setAllNotes(prevNotes =>
        prevNotes.map(note =>
          note._id === id ? response.data : note
        )
      );
      toast.dismiss();
      toast.success("Alterações gravadas com sucesso!");
      setError(null); // Limpa o erro se sucesso
      return response.data;

    } catch (error) {
      setError(error); // Salva o erro
      console.error('Erro ao salvar edição da anotação:', error);
      toast.dismiss();
      toast.error("Erro ao salvar edição da anotação")
      return null;

    }
  }

  // função para alternar prioridade
  async function handleTogglePriority(id) {
    toast.loading("Alterando anotação...");
    // 1. Salva o estado atual da nota
    const previousNotes = [...allNotes];

    // 2. Aplica atualização otimista
    setAllNotes(prevNotes =>
      prevNotes.map(note =>
        note._id === id ? { ...note, priority: !note.priority } : note
      )
    );

    try {
      // 3. Tenta atualizar no servidor
      await api.post(`/priorities/${id}`);
      toast.dismiss();
      toast.success("Prioridade alterada com sucesso!");
      setError(null); // Limpa o erro se sucesso
    } catch (error) {
      setError(error); // Salva o erro
      console.error('Erro ao alternar prioridade:', error);
      
      // 4. Reverte caso dê problema
      setAllNotes(previousNotes);
      toast.dismiss();
      toast.error("Erro ao alternar prioridade")
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
        setError(null); // Limpa o erro se sucesso
      } catch (error) {
        setError(error); // Salva o erro
        console.error('Erro ao buscar notas excluídas:', error);
        toast.error("Erro ao buscar notas excluídas")
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
      toast.success("Anotação restaurada com sucesso!");
      setError(null); // Limpa o erro se sucesso

      return response.data;
    } catch (error) {
      setError(error); // Salva o erro
      toast.error("Erro ao restaurar anotação da lixeira");
      console.error('Erro ao restaurar anotação:', error);
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
    try {
      setConfirmModal({ isOpen: false }); // Fecha o modal de confirmação
      await api.delete(`/trash/delete/${id}`);
      setTrashNotes(prevTrash => prevTrash.filter(note => note._id !== id));
      toast.success("Anotação excluída permanentemente!");
      setError(null); // Limpa o erro se sucesso
    } catch (error) {
      setConfirmModal({ isOpen: false });
      setError(error); // Salva o erro
      console.error('Erro ao excluir anotação:', error);
      toast.error("Erro ao excluir anotação da lixeira.");
    }
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
    try {
      await api.delete('/trash/clear');
      setTrashNotes([]); // Limpa o estado local das notas da lixeira
      setConfirmModal({ isOpen: false }); // Fecha o modal de confirmação
      toast.success("Lixeira limpa com sucesso!");
      setError(null); // Limpa o erro se sucesso
    } catch (error) {
      setError(error); // Salva o erro
      console.error('Erro ao limpar a lixeira:', error);
      toast.error("Erro ao limpar a lixeira.");
      setConfirmModal({ isOpen: false });
    }
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

  const handleDrop = async (index) => {
    if (draggedIndex === null || draggedIndex === index) return;
    toast.loading("Alterando ordem...");

    const updatedNotes = [...allNotes];
    const [removed] = updatedNotes.splice(draggedIndex, 1);
    updatedNotes.splice(index, 0, removed);

    // Backup da ordem anterior
    const previousNotes = [...allNotes];

    setAllNotes(updatedNotes);
    setDraggedIndex(null);

    const orderedIds = updatedNotes.map(note => note._id);

    try {
      await api.put('/annotations/order', { orderedIds });
      toast.dismiss();
      toast.success("Ordem alterada com sucesso!");
      setError(null); // Limpa o erro se sucesso
    } catch (error) {
      setError(error); // Salva o erro
      console.error('Erro ao salvar nova ordem:', error);
      setAllNotes(previousNotes); // Restaura se falhar
      toast.dismiss();
      toast.error("Erro ao alterar a ordem")
    }
  };
  // FIM DAS FUNÇÕES DE DRAG AND DROP (ARRASTAR E SOLTAR NOTAS---------------



  // FUNÇÕES DE FILTRO-------------------------------------------------------
  function handleFilterChange(newFilter) {
    setFilter(newFilter);
  }

  const filteredNotes = allNotes.filter(note => {
    // Filtro por prioridade
    if (filter === "priority" && !note.priority) return false;
    if (filter === "completed" && note.priority) return false;

    // Filtro por busca
    if (searchTerm) {
      const termo = searchTerm.toLowerCase();
      const titulo = note.title?.toLowerCase() || '';
      const conteudo = note.notes?.toLowerCase() || '';
      return titulo.includes(termo) || conteudo.includes(termo);
    }
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
            onCancel={() => setNewNoteOpen(false)}
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
            {filteredNotes.map((data, index) => (
              <li
                key={data._id}
                draggable={canDrag}
                className={
                  `${draggedIndex === index ? styles.dragging : ""} ${dragOverIndex === index ? styles.dropTarget : ""}`
                }
                onMouseDown={e => {
                  if (
                    e.target.tagName === 'TEXTAREA' ||
                    e.target.closest('textarea')
                  ) {
                    e.currentTarget.draggable = false;
                  } else {
                    e.currentTarget.draggable = canDrag;
                  }
                }}
                onMouseUp={e => {
                  e.currentTarget.draggable = canDrag;
                }}
                onDragStart={e => {
                  if (
                    e.target.tagName === 'TEXTAREA' ||
                    e.target.closest('textarea')
                  ) {
                    e.preventDefault();
                    return;
                  }
                  if (canDrag) {
                    handleDragStart(index);
                  }
                }}
                onDragEnd={() => setDraggedIndex(null)}
                onDragOver={canDrag ? (e) => {
                  handleDragOver(e);
                  setDragOverIndex(index);
                } : undefined}
                onDragLeave={() => setDragOverIndex(null)}
                onDrop={canDrag ? () => {
                  handleDrop(index);
                  setDragOverIndex(null);
                } : undefined}
                style={{ cursor: canDrag ? 'grab' : 'default' }}
              >
                <Notes
                  data={data}
                  onSaveEdit={handleSaveEdit}
                  onTrash={handleTrash}
                  onTogglePriority={handleTogglePriority}
                  canDrag={canDrag}
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
      {/* MODAL DE ALERTA */}
      <AlertModal
        isOpen={alertModal.isOpen}
        onConfirm={alertModal.onConfirm}
        title={alertModal.title}
        message={alertModal.message}
      />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
      />
        
    </div>
  );
  // FIM DA PAGINA DO MODULO DE ANOTAÇÕES------------------------------------
}


export default BlocoNotas;