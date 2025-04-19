import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './styles.css';
import logo1 from '../../img/logo1.png'

const Sidebar = () => {

  // Hook para abrir e fechar o menu lateral
  const [isOpen, setIsOpen] = useState(false);
  const handleClickOutside = (event) => {
    if (isOpen && !event.target.closest('.sidebar')) {
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
    if(e.target.classList.contains('icon-right') || e.target.classList.contains('icon')){
      const x = e.target.parentElement.parentElement.children[1];
      x.classList.toggle('show');
      e.target.parentElement.classList.toggle('active');
    }else{
      const x = e.target.parentElement.children[1];
      x.classList.toggle('show');
      e.target.classList.toggle('active');
    }
      
    
  }
  
  // function para configurar botões do menu ao abrir paginas
  function openActiveSB(e){
    //remove configurações dos botões ativos
    const y = [...document.querySelectorAll('.altSub')];
    y.map((evt)=>{
      evt.classList.remove('altSub');
      evt.classList.remove('active');
      return evt;
    })

    //adiciona configurações ao botão ativo
    if(e.target.classList.contains('icon')){
      e.target.parentElement.classList.add('altSub');
      e.target.parentElement.classList.add('active');
    }else{
      e.target.classList.add('altSub');
      e.target.classList.add('active');
    }
  }
  

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="toggleButton" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>
      <div className='navbar'>
        <div className='brand'>
          <img src={logo1} alt='Logo'/>
          <div>
              <p>Sis_Caracal</p>
              <p className='func_app'>Controle de tarefas avançado</p>
          </div>
        </div>
        <div>
          <nav className= 'sideMenu'>
            <div onClick={openActiveSB}><Link className='home' to='/'><i className='bx bxs-home icon'></i> Início</Link></div>
            <div className='divider'>Principal</div>
            <div className='subMenu'>
              <p onClick={openSubMenu}><i className='bx bx-task icon'></i> Trabalho <i className='bx bx-chevron-right icon-right' ></i></p>
              <ul className='sideDropdown'>
                <li onClick={openActiveSB}><Link to='/'>Tarefas</Link></li>
                <li onClick={openActiveSB}><Link to='/'>Compromissos</Link></li>
                <li onClick={openActiveSB}><Link to='/'>Anotações</Link></li>
              </ul>
            </div>
            <div className='subMenu'>
              <p onClick={openSubMenu}><i className='bx bx-task icon'></i> Trabalho <i className='bx bx-chevron-right icon-right' ></i></p>
              <ul className='sideDropdown'>
                <li onClick={openActiveSB}><Link to='/'>Tarefas</Link></li>
                <li onClick={openActiveSB}><Link to='/'>Compromissos</Link></li>
                <li onClick={openActiveSB}><Link to='/'>Anotações</Link></li>
              </ul>
            </div>
            <div onClick={openActiveSB}><Link className='liDirect' to='bloconotas'><i class='bx bx-edit icon'></i> Bloco de Notas</Link></div>	
            <div className='divider'>Principal</div>
            <div onClick={openActiveSB}><Link className='liDirect' to='bloconotas'><i className='bx bxs-calendar-check icon'></i> Lembretes</Link></div>	
            <div className='subMenu'>
              <p onClick={openSubMenu}><i className='bx bx-task icon'></i> Trabalho <i className='bx bx-chevron-right icon-right' ></i></p>
              <ul className='sideDropdown'>
                <li onClick={openActiveSB}><Link to='/'>Tarefas</Link></li>
                <li onClick={openActiveSB}><Link to='/'>Compromissos</Link></li>
                <li onClick={openActiveSB}><Link to='/'>Anotações</Link></li>
              </ul>
            </div>
            <div onClick={openActiveSB}><Link className='liDirect' to='bloconotas'><i className='bx bxs-calendar-check icon'></i> Lembretes</Link></div>	
          </nav>
          <div className='ads'>
            <div className='wrapper'>
                <p className='btnUpgrade'>MANUAL DO USUÁRIO</p>
                <p>Bem vindo ao <span>Caracal Tecnologia</span><br/> Soluções para seu dia</p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Sidebar;