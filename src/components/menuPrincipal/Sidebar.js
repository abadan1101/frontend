import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './Sidebar.css';
import logo1 from '../../img/logo1.png'

const Sidebar = () => {

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

  function openSubMenu(e){
    const x = e.target.parentElement.children[1];
    if(x){
      x.classList.toggle('show');
      const aLink = x.parentElement.querySelector('a:first-child');
		  aLink.classList.toggle('active');
      e.target.classList.toggle('active');
    }else{
      console.log(e.target.parentElement)
      e.target.parentElement.classList.toggle('active');
    }
    
    
  }
  
  function openActiveSB(e){
    const y = [...document.querySelectorAll('.altSub')];
    const x = [...document.querySelectorAll('.liDirectActive')];
    y.map((evt)=>{
      evt.classList.remove('altSub');
      return evt;
    })
    x.map((evt)=>{
      evt.classList.toggle('liDirectActive');
      return evt;
    })
    e.target.classList.toggle('altSub');
    if(e.target.parentElement.classList.contains('liDirect')){
      e.target.parentElement.classList.add('liDirectActive');
    }
  }
  

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>
      <div className='brand'>
        <img src={logo1} alt='Logo'/>
        <div>
            <p>Sis_Caracal</p>
            <p id='func_app'>Controle de tarefas avançado</p>
        </div>
      </div>
      <div>
        <ul className= 'side-menu'>
          <li><Link to='/' className='inicio' onClick={() => setIsOpen(!isOpen)}><i className='bx bxs-home icon'></i> Início</Link></li>
          <li className='divider' data-text='Principal'>Principal</li>
          <li>
              <p onClick={openSubMenu}><i className='bx bx-task icon' ></i> Trabalho <i className='bx bx-chevron-right icon-right' ></i></p>
              <ul className='side-dropdown'>
                <li onClick={openActiveSB}><Link to='/'>Tarefas</Link></li>
                <li><Link to='/'>Compromissos</Link></li>
                <li><Link to='/'>Anotações</Link></li>
              </ul>
          </li>
          <li>
              <p onClick={openSubMenu}><i className='bx bxs-widget icon'></i> Casa<i className='bx bx-chevron-right icon-right' ></i></p>
              <ul className='side-dropdown'>
                <li><Link to='/'>Tarefas</Link></li>
                <li><Link to='/'>Compromissos</Link></li>
                <li><Link to='/'>Anotações</Link></li>
              </ul>
          </li>
          <li className='liDirect' onClick={openActiveSB}><Link to='bloconotas' onClick={() => setIsOpen(!isOpen)}><i className='bx bxs-calendar-check icon'></i> Lembretes</Link></li>	
          <section className='divider' data-text='Diversos'>Diversos</section>
          <div><Link to='/'><i className='bx bx-table icon'></i> Planejamento</Link></div>
          <li>
              <p><i className='bx bxs-report icon'></i> Relatórios <i className='bx bx-chevron-right icon-right' ></i></p>
              <ul className='side-dropdown'>
                <li><Link to='/'>Tarefas</Link></li>
                <li><Link to='/'>Compromissos</Link></li>
                <li><Link to='/'>Anotações</Link></li>
              </ul>
          </li>
          <div><Link to='/'><i className='bx bxs-archive icon'></i> Arquivo</Link></div>
        </ul>
        <div className='ads'>
          <div className='wrapper'>
              <p className='btn-upgrade'>MANUAL DO USUÁRIO</p>
              <p>Bem vindo ao <span>Caracal Tecnologia</span><br/> Soluções para seu dia</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;