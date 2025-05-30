import { useState, useEffect } from 'react';
import { IoHome, IoGridOutline, IoKeypadOutline, IoServerSharp, IoSaveOutline } from "react-icons/io5";
import { TfiNotepad } from "react-icons/tfi";
import { Link } from "react-router-dom";
import styles from './sidebar.module.css';
import logo1 from '../../img/logo1.png';

const Sidebar = () => {

  // Hook para abrir e fechar o menu lateral
  const [isOpen, setIsOpen] = useState(false);
  const handleClickOutside = (event) => {
    if (isOpen && !event.target.closest('#sidebar')) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  // function para abrir os submenus
  function openSubMenu(e){
    if(e.target.classList.contains(styles.iconRight) || e.target.classList.contains(styles.icon)){
      const x = e.target.parentElement.parentElement.children[1];
      x.classList.toggle(styles.show);
      e.target.parentElement.classList.toggle(styles.active);
    }else{
      const x = e.target.parentElement.children[1];
      x.classList.toggle(styles.show);
      e.target.classList.toggle(styles.active);
    }
  }
  
  // function para configurar botões do menu ao abrir paginas
  function openActiveSB(e){
    //remove configurações dos botões ativos
    const y = [...document.getElementsByClassName(styles.altSub)];
    y.map((evt)=>{
      evt.classList.remove(styles.altSub);
      evt.classList.remove(styles.active);
      return evt;
    })

    //adiciona configurações ao botão ativo
    if(e.target.classList.contains(styles.icon)){
      e.target.parentElement.classList.add(styles.altSub);
      e.target.parentElement.classList.add(styles.active);
    }else{
      e.target.classList.add(styles.altSub);
      e.target.classList.add(styles.active);
    }
    setIsOpen(!isOpen)
  }
  

  return (
    <div id='sidebar' className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <button className={styles.toggleButton} onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>
      <div className={styles.navbar}>
        <div className={styles.brand}>
          <img src={logo1} alt='Logo'/>
          <div>
              <p>Caracal</p>
              <p className={styles.func_app}>Controle de tarefas avançado</p>
          </div>
        </div>
        <div>
          <nav className= {styles.sideMenu}>
            <div onClick={openActiveSB}><Link className={styles.home} to='/'><IoHome className={styles.icon}/> Início</Link></div>
            <div className={styles.divider}>Principal</div>
            <div className={styles.subMenu}>
              <p onClick={openSubMenu}><IoGridOutline className={styles.icon}/> Tarefas <i className={`${styles.iconRight} bx bx-chevron-right`}></i></p>
              <ul className={styles.sideDropdown}>
                <li onClick={openActiveSB}><Link to='/'>Linha 01</Link></li>
                <li onClick={openActiveSB}><Link to='/'>Linha 02</Link></li>
                <li onClick={openActiveSB}><Link to='/'>Linha 03</Link></li>
                <li onClick={openActiveSB}><Link to='/'>Definições</Link></li>
              </ul>
            </div>
            <div className={styles.subMenu}>
              <p onClick={openSubMenu}><IoKeypadOutline className={styles.icon}/> Controles <i className={`${styles.iconRight} bx bx-chevron-right`}></i></p>
              <ul className={styles.sideDropdown}>
                <li onClick={openActiveSB}><Link to='/'>Pedidos</Link></li>
                <li onClick={openActiveSB}><Link to='/'>Ferramentas</Link></li>
                <li onClick={openActiveSB}><Link to='/'>Produtos</Link></li>
                <li onClick={openActiveSB}><Link to='/'>Equipe</Link></li>
              </ul>
            </div>
            <div onClick={openActiveSB}><Link className={styles.liDirect} to='bloconotas'><TfiNotepad className={styles.icon}/> Bloco de Notas</Link></div>	
            <div className={styles.divider}>Principal</div>
            <div className={styles.subMenu}>
              <p onClick={openSubMenu}><IoServerSharp className={styles.icon}/> Planejamento <i className={`${styles.iconRight} bx bx-chevron-right`}></i></p>
              <ul className={styles.sideDropdown}>
                <li onClick={openActiveSB}><Link to='/'>Linhas</Link></li>
                <li onClick={openActiveSB}><Link to='/'>Compromissos</Link></li>
                <li onClick={openActiveSB}><Link to='/'>Logistica</Link></li>
              </ul>
            </div>
            <div className={styles.subMenu}>
              <p onClick={openSubMenu}><IoSaveOutline className={styles.icon}/> Arquivo <i className={`${styles.iconRight} bx bx-chevron-right`}></i></p>
              <ul className={styles.sideDropdown}>
                <li onClick={openActiveSB}><Link to='/'>Tarefas</Link></li>
                <li onClick={openActiveSB}><Link to='/'>Compromissos</Link></li>
                <li onClick={openActiveSB}><Link to='/'>Anotações</Link></li>
              </ul>
            </div>	
          </nav>
          <div className={styles.ads}>
            <div className={styles.wrapper}>
                <p className={styles.btnUpgrade}>MANUAL DO USUÁRIO</p>
                <p>Bem vindo ao <span>Caracal Tecnologia</span><br/> Soluções para seu dia</p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Sidebar;