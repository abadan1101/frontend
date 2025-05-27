import { useState } from "react";
import { FiTrash, FiAlertCircle   } from "react-icons/fi";

import styles from './notas.module.css';

function Notes( {data, onTrash, onSaveEdit} ) {
    const [notesValue, setNotesValue] = useState(data.notes);

    // Salva a nota ao sair do campo de edição
    const handleBlur = () => {
        if (notesValue !== data.notes && notesValue !== '') {
            onSaveEdit(data._id, notesValue);
        }else{
            // Se o campo estiver vazio, não salva
            setNotesValue(data.notes);
        }
    };

    // Função para mover nota para lixeira
    const handleTrash = () => {
        onTrash(data._id);
    };

    //funções em teste----------------------------------------------
    function handleKeyUp(e) {
        e.preventDefault();
        if(e.key === 'Enter'){
        const txa = e.target;
        const locCursor = txa.selectionStart;
        var val = txa.value;
        txa.value = val.slice(0, locCursor) + "📌 " + val.slice(locCursor);
        txa.selectionEnd = locCursor + 3;
        }
    
    }
    //funções em teste----------------------------------------------

    return(
        <>
            <main className={styles.notepadInfos} key={data._id}>
                <div>
                    <strong>{data.title}</strong>
                    <div>
                        <FiTrash onClick={handleTrash}/>
                    </div>
                </div>
                <textarea
                    value={notesValue}
                    onChange={e => {
                        setNotesValue(e.target.value);
                    }}
                    onBlur={handleBlur}
                    onKeyUp={handleKeyUp}//em teste
                />
                <span>
                    <FiAlertCircle />
                </span>
            </main>
        </>
    )
}

export default Notes;