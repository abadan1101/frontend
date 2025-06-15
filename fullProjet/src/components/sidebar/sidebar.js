//IMPORTAÇÃO DAS BIBLIOTECAS---------------------------------------------------
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";



//IMPORTAÇÃO DOS COMPONENTES---------------------------------------------------
import styles from './sidebar.module.css';
import { TfiNotepad } from "react-icons/tfi";
import { MdOutlineWorkOutline, MdOutlineTaskAlt  } from "react-icons/md";
import { IoFlagSharp , IoHomeOutline ,IoSchoolOutline , IoCarOutline, IoCalendarNumberOutline, IoChevronDown } from "react-icons/io5";
import logo1 from '../../img/logo1.png';



//COMPONENTE DO MENU LATERAL---------------------------------------------------
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



  // método para abrir os submenus
  function openSubMenu(e){
    const el = e.target.closest(`.${styles.subMenu}`)
    if(el){
      el.children[1].classList.toggle(styles.show);
    }
  }


  
  // método para configurar botões do menu ao abrir paginas
  function openActiveSB(e){
    //remove configurações dos botões ativos
    const sb_Menu = [...document.getElementsByClassName("sbMenu")]
    sb_Menu.map((evt)=>{
        evt.classList.remove(styles.active);
        return evt;
    });
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

    const el = e.target.closest(`.${styles.sideDropdown}`)
    if(el){
     el.parentElement.children[0].classList.add(styles.active)
    }
    setIsOpen(!isOpen)
  }
  
  

  //html do componente
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
            <div onClick={openActiveSB}><Link className={styles.home} to='home'><IoFlagSharp  className={styles.icon}/> Início</Link></div>
            <div className={styles.divider}>Principal</div>
            <div className={styles.subMenu}>
              <p onClick={openSubMenu} className='sbMenu'><IoHomeOutline  className={styles.icon}/> Casa <IoChevronDown className={styles.iconRight}/></p>
              <ul className={styles.sideDropdown}>
                <li onClick={openActiveSB}><Link to='home'>Finanças</Link></li>
                <li onClick={openActiveSB}><Link to='home'>Manutenção</Link></li>
                <li onClick={openActiveSB}><Link to='home'>Planejamento</Link></li>
                <li onClick={openActiveSB}><Link to='home'>Documentação</Link></li>
              </ul>
            </div>
            <div className={styles.subMenu}>
              <p onClick={openSubMenu} className='sbMenu'><IoCarOutline className={styles.icon}/> Carro <IoChevronDown className={styles.iconRight}/></p>
              <ul className={styles.sideDropdown}>
                <li onClick={openActiveSB}><Link to='home'>Manutenção</Link></li>
                <li onClick={openActiveSB}><Link to='home'>Reparos</Link></li>
                <li onClick={openActiveSB}><Link to='home'>Documentação</Link></li>
              </ul>
            </div>
            <div className={styles.subMenu}>
              <p onClick={openSubMenu} className='sbMenu'><MdOutlineWorkOutline className={styles.icon}/> Trabalho <IoChevronDown className={styles.iconRight}/></p>
              <ul className={styles.sideDropdown}>
                <li onClick={openActiveSB}><Link to='home'>Tarefas</Link></li>
                <li onClick={openActiveSB}><Link to='home'>Comprimissos</Link></li>
              </ul>
            </div>
            <div className={styles.subMenu}>
              <p onClick={openSubMenu} className='sbMenu'><IoSchoolOutline  className={styles.icon}/> Estudo <IoChevronDown className={styles.iconRight}/></p>
              <ul className={styles.sideDropdown}>
                <li onClick={openActiveSB}><Link to='home'>Tarefas</Link></li>
                <li onClick={openActiveSB}><Link to='home'>Comprimissos</Link></li>
              </ul>
            </div>
            <div className={styles.divider}>Ferramentas</div>
            <div onClick={openActiveSB}><Link className={`${styles.liDirect} sbMenu`} to='home'><MdOutlineTaskAlt  className={styles.icon}/> Tarefas</Link></div>	
            <div onClick={openActiveSB}><Link className={`${styles.liDirect} sbMenu`} to='notepad'><TfiNotepad className={styles.icon}/> Bloco de Notas</Link></div>	
            <div onClick={openActiveSB}><Link className={`${styles.liDirect} sbMenu`} to='home'><IoCalendarNumberOutline  className={styles.icon}/> Calendário</Link></div>	
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