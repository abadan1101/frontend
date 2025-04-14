import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css'
import logo1 from '../../img/logo1.png'
import usuario from '../../img/usuario.png'



const Navbar = () => {

    function openMenu(){
        const menuStat = document.getElementById("sidebar")
        const pnlModal = document.getElementById('pnlModalMenu')
        menuStat.classList.toggle("menuRecolhido")
        pnlModal.classList.toggle("pnlModalClose")
    }

    function closeMenu(){
        const menuStat = document.getElementById("sidebar")
        const pnlModal = document.getElementById('pnlModalMenu')
        menuStat.classList.toggle("menuRecolhido")
        pnlModal.classList.toggle("pnlModalClose")
    }


    return (
        <>
            {/* ---------------------MENU LATERAL------------------ */}

            <section className="menuRecolhido" id='sidebar'>
                <div className='brand'>
                    <img src={logo1} alt='Logo'/>
                        <div>
                        <p id='nome_app'>GAM_Caracal</p>
                        <p id='func_app'>Controle de tarefas avançado</p>
                    </div>
                </div>
                <ul className='side-menu'>
                    <li className="noSB" onClick={closeMenu}><Link to='/' className='inicio' id='home'><i className='bx bxs-home icon'></i> Início</Link><ul className='side-dropdown'></ul></li>
                    <li className='divider' data-text='Principal'>Principal</li>
                    <li id="sbTarefas">
                        <p className='mSus'><i className='bx bx-task icon mSus' ></i> Trabalho <i className='bx bx-chevron-right icon-right mSus' ></i></p>
                        <ul className='side-dropdown'>
                            {/* <li><a href='#' altSB id='linha1'>Linha 1</a></li>
                            <li><a href='#' altSB id='linha2'>Linha 2</a></li>
                            <li><a href='#' altSB id='linha3'>Linha 3</a></li>
                            <li><a href='#' altSB id='cfgTarf'>Definições</a></li> */}
                        </ul>
                    </li>
                    <li id="sbControles">
                        <p className='mSus'><i className='bx bxs-widget icon mSus' ></i> Controles<i className='bx bx-chevron-right icon-right mSus' ></i></p>
                        <ul className='side-dropdown'>
                                {/* <li><a href='#' altSB>Equipe</a></li>
                                <li><a href='#' altSB>Ferramentas</a></li>
                                <li><a href='#' altSB>Produtos</a></li>
                                <li><a href='#' altSB>Cartões</a></li> */}
                        </ul>
                    </li>
                    <li className="noSB" onClick={closeMenu}><Link to='bloconotas'><i className='bx bxs-calendar-check icon'></i> Lembretes</Link><ul className='side-dropdown'></ul></li>	
                    <li className='divider' data-text='Diversos'>Diversos</li>
                    <li className="noSB"><p><i className='bx bx-table icon'></i> Planejamento</p><ul className='side-dropdown'></ul></li>
                    <li id="sbRelatorios">
                        <p className='mSus'><i className='bx bxs-report icon mSus'></i> Relatórios <i className='bx bx-chevron-right icon-right mSus' ></i></p>
                        <ul className='side-dropdown'>
                            {/* <li><a href='#' altSB>Recebimento</a></li>
                            <li><a href='#' altSB>Entrega</a></li>
                            <li><a href='#' altSB>Eventuais</a></li> */}
                        </ul>
                    </li>
                    <li className="noSB"><p><i className='bx bxs-archive icon'></i> Arquivo</p><ul className='side-dropdown'></ul></li>
                </ul>
                <div className='ads'>
                    <div className='wrapper'>
                        <p className='btn-upgrade'>MANUAL DO USUÁRIO</p>
                        <p>Bem vindo ao <span>PROJETO UH-15.</span><br/> Manutenção de 3º escalão</p>
                    </div>
                </div>
            </section>

            {/* ---------------------MENU SUPERIOR------------------ */}

            <section id="content">
                <nav>
                    <i className='bx bxl-flutter toggle-sidebar' id='iconRM' onClick={openMenu}></i>
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
                            <li><a href='#'><i className='bx bxs-user-circle icon' ></i> Perfil</a></li>
                            <li id="trf_menu_afConfiguracoes"><a href='#'><i className='bx bxs-cog' ></i> Configurações</a></li>
                            <li className="tipAcs">
                                <input type="file" id="trf_menu_afRest" accept=".xlsx, .ODS, .XLS" />
                                <a href="#"><i className='bx bx-revision'></i>Restaurar</a>
                            </li>			
                            <li><a href='#'><i className='bx bxs-log-out-circle'></i> Logout</a></li>
                        </ul>
                    </div>
                </nav>
            </section>
            <div id='pnlModalMenu' className="pnlModalClose" onClick={closeMenu}></div>
        </>
      );
}

export default Navbar;