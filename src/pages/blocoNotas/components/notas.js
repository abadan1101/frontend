import { FiTrash, FiAlertCircle   } from "react-icons/fi";

import styles from './notas.module.css';

function Notes( {data, onDelete} ) {
    return(
        <>
            <main className={styles.notepadInfos} key={data._id}>
                <div>
                    <strong>{data.title}</strong>
                    <div>
                        <FiTrash onClick={() => onDelete(data._id)}/>
                    </div>
                </div>
                <textarea defaultValue={data.notes}></textarea>
                <span>
                    <FiAlertCircle />
                </span>
            </main>
        </>
    )
}

export default Notes;