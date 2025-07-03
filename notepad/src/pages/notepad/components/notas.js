import { useState } from "react";
import { FiTrash, FiAlertCircle } from "react-icons/fi"; // Adicione FiMove
import { TbHandMove } from "react-icons/tb";


import styles from './notas.module.css';

function Notes({ data, onTrash, onSaveEdit, onTogglePriority, canDrag }) {
    const [notesValue, setNotesValue] = useState(data.notes);
    const [isEditing, setIsEditing] = useState(false);

    // Salva a nota ao sair do campo de edição
    const handleBlur = async () => {
        setIsEditing(false);
        if (notesValue !== data.notes && notesValue !== '') {
            try {
                await onSaveEdit(data._id, notesValue); // Aguarda resposta do backend
            } catch (error) {
                // Aqui você pode tratar erro, se quiser
            }
        } else {
            setNotesValue(data.notes);
        }
    };

    // Função para mover nota para lixeira
    const handleTrash = () => {
        onTrash(data._id);
    };

    // Função para alternar prioridade
    const handleTogglePriority = () => {
        onTogglePriority(data._id);
    };

    //funções em teste----------------------------------------------
    function handleKeyUp(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const txa = e.target;
            const locCursor = txa.selectionStart;
            const textBeforeCursor = notesValue.slice(0, locCursor).trim();

            // Só insere marcador se a frase anterior terminar com ":" ou ";"
            if (textBeforeCursor.endsWith(":") || textBeforeCursor.endsWith(";")) {
                const newValue =
                    notesValue.slice(0, locCursor) + "   ●  " + notesValue.slice(locCursor);
                    setNotesValue(newValue);

                // Reposiciona o cursor após o marcador
                setTimeout(() => {
                    txa.selectionStart = txa.selectionEnd = locCursor + 6;
                }, 0);
            }
        }
    }
    //funções em teste----------------------------------------------

    return (
        <>
            <main className={styles.notepadInfos} key={data._id}>
                <div>
                    <strong>{data.title}</strong>
                    <div>
                        <FiTrash onClick={handleTrash} />
                    </div>
                </div>
                <textarea
                    value={notesValue}
                    onChange={e => {
                        setNotesValue(e.target.value);
                        setIsEditing(true);
                    }}
                    onBlur={handleBlur}
                    onKeyUp={handleKeyUp}
                />
                <div className={styles.notepadInfosFooter}>
                    <span>
                        {data.priority
                            ? <FiAlertCircle
                                className={styles.priority}
                                title="Prioridade"
                                onClick={handleTogglePriority} />
                            : <FiAlertCircle
                                 onClick={handleTogglePriority}/>
                        }
                    </span>
                    {isEditing && (
                        <p className={styles.infoSave}>toque fora para salvar</p>
                    )}
                    {canDrag && (
                        <i className={styles.dragIcon}>
                            <TbHandMove title="Arrastar nota" />
                        </i>
                    )}
                </div>
            </main>
        </>
    )
}

export default Notes;