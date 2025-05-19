import React from "react";

import styles from './notas.module.css';

function Notes( {data} ) {
    return(
        <>
            <li className={styles.notepadInfos} key={data._id}>
                <div>
                    <strong>{data.title}</strong>
                    <div><i className='bx  bx-trash-alt'></i></div>
                </div>
                <textarea defaultValue={data.notes}></textarea>
                <span><i className='bx  bx-info-circle'></i></span>
            </li>
        </>
    )
}

export default Notes;