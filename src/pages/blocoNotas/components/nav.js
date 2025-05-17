
import React,  { useState } from 'react';

import styles from './nav.module.css';

import NewNote from "./newNote.js";

const Nav = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleConfirm = () => {
    alert("Confirmado!");
    setModalOpen(false);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className={styles.nav}>
        <div>
          <button onClick={() => setModalOpen(true)}>Nova Nota</button>
        </div>
      </div>
      <div>
        <NewNote
          isOpen={modalOpen}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          message="Tem certeza que deseja continuar?"
        />
      </div>
    </>
  );
}

export default Nav;