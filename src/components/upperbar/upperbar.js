import { Link } from "react-router-dom";
import styles from './upperbar.module.css';
import usuario from '../../img/usuario.png'

const Upperbar = () => {

  return (
    <section className={styles.content}>
      <nav>
          <form action='#'>
              <div className={styles.formGroup}>
                  <input id="barrPesc_pesquisa" type='text' placeholder='Buscar...' />
                  <i id="barrPesc_Ipesquisa" className={`${styles.icon} bx bx-search`}></i>
              </div>
          </form>
          <p className={styles.navlink}>
              <i className={`${styles.icon} bx bxs-bell`}></i>
              <span className={styles.badge}>5</span>
          </p>
          <p className={styles.navlink}>
              <i className={`${styles.icon} bx bxs-message-square-dots`}></i>
              <span className={styles.badge}>8</span>
          </p>
          <span className={styles.divider}></span>
          <div className={styles.profile}>
              <img id='imgPerf' src={usuario} alt='' />
              <ul className={styles.profilelink}>
                  <li><Link to='/'><i className={`${styles.icon} bx bxs-user-circle`}></i> Perfil</Link></li>
                  <li id="trf_menu_afConfiguracoes"><Link to='/'><i className='bx bxs-cog' ></i> Configurações</Link></li>		
                  <li><Link to='/'><i className={`${styles.icon} bx bxs-log-out-circle`}></i> Logout</Link></li>
              </ul>
          </div>
      </nav>
    </section>
  )
};

export default Upperbar;