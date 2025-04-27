import React from "react";

import styles from './notas.module.css';

function Notes( {data} ) {
    return(
        <>
            <li className={styles.notepadInfos}>
                <div>
                <strong>{data.title}</strong>
                <div>x</div>
                </div>
                <textarea defaultValue={data.notes}></textarea>
                <span>!</span>
            </li>
        </>
    )
}

export default Notes;