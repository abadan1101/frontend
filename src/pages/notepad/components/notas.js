import { useState } from "react";
import { FiTrash, FiAlertCircle } from "react-icons/fi";
import { GiConfirmed } from "react-icons/gi";

import styles from './notas.module.css';

function Notes({ data, onTrash, onSaveEdit, onTogglePriority }) {
    const [notesValue, setNotesValue] = useState(data.notes);
    const [isEditing, setIsEditing] = useState(false);
    const [showSaved, setShowSaved] = useState(false);

    // Salva a nota ao sair do campo de edição
    const handleBlur = async () => {
        setIsEditing(false);
        if (notesValue !== data.notes && notesValue !== '') {
            try {
                await onSaveEdit(data._id, notesValue); // Aguarda resposta do backend
                setShowSaved(true);
                setTimeout(() => setShowSaved(false), 2000); // Esconde após 2s
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
        e.preventDefault();
        if (e.key === 'Enter') {
            const txa = e.target;
            const locCursor = txa.selectionStart;
            var val = txa.value;
            txa.value = val.slice(0, locCursor) + "○  " + val.slice(locCursor);
            txa.selectionEnd = locCursor + 3;
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
                        setShowSaved(false);
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
                    {isEditing && !showSaved && (
                        <p className={styles.infoSave}>toque fora da nota para salvar</p>
                    )}
                    {showSaved && (
                        <p className={styles.msgSave}>salvo com sucesso! <GiConfirmed /></p>
                    )}
                </div>
            </main>
        </>
    )
}

export default Notes;