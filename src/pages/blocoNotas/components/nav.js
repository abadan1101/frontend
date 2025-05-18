
import React,  { useState } from 'react';

import styles from './nav.module.css';

import NewNote from "./newNote.js";

const Nav = () => {
  const [NewNoteOpen, setNewNoteOpen] = useState(false);

  const handleConfirm = () => {
    alert("Confirmado!");
    setNewNoteOpen(false);
  };

  const handleCancel = () => {
    setNewNoteOpen(false);
  };

  return (
    <>
      <div className={styles.nav}>
        <div>
          <button onClick={() => setNewNoteOpen(true)}>Nova Nota</button>
        </div>
      </div>
      <div>
        <NewNote
          isOpen={NewNoteOpen}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          message="Tem certeza que deseja continuar?"
        />
      </div>
    </>
  );
}

export default Nav;