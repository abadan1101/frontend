import React from 'react';
import { Link } from "react-router-dom";
import './Topbar.css';
import usuario from '../../img/usuario.png'

const Topbar = () => {

  return (
    <section id="content">
      <nav>
          <form action='#'>
              <div className='form-group'>
                  <input id="barrPesc_pesquisa" type='text' placeholder='Buscar...' />
                  <i id="barrPesc_Ipesquisa" className='bx bx-search icon' ></i>
              </div>
          </form>
          <p className='nav-link'>
              <i className='bx bxs-bell icon' ></i>
              <span className='badge'>5</span>
          </p>
          <p className='nav-link'>
              <i className='bx bxs-message-square-dots icon' ></i>
              <span className='badge'>8</span>
          </p>
          <span className='divider'></span>
          <div className='profile'>
              <img id='imgPerf' src={usuario} alt='' />
              <ul className='profile-link'>
                  <li><Link to='/'><i className='bx bxs-user-circle icon' ></i> Perfil</Link></li>
                  <li id="trf_menu_afConfiguracoes"><Link to='/'><i className='bx bxs-cog' ></i> Configurações</Link></li>		
                  <li><Link to='/'><i className='bx bxs-log-out-circle'></i> Logout</Link></li>
              </ul>
          </div>
      </nav>
    </section>
  )
};

export default Topbar;