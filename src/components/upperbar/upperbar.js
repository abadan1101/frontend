import { IoIosSearch } from "react-icons/io";
import { FaBell } from "react-icons/fa";
import { BiSolidMessageSquareDots } from "react-icons/bi";
import styles from './upperbar.module.css';
import usuario from '../../img/usuario.png'

const Upperbar = () => {

  return (
    <section className={styles.content}>
      <nav>
          <form action='#'>
              <div className={styles.formGroup}>
                  <input id="barrPesc_pesquisa" type='text' placeholder='Buscar...' />
                  <IoIosSearch className={styles.icon}/>
              </div>
          </form>
          <p className={styles.navlink}>
            <FaBell className={styles.icon}/>
            <span className={styles.badge}>5</span>
          </p>
          <p className={styles.navlink}>
            <BiSolidMessageSquareDots className={styles.icon}/>
            <span className={styles.badge}>8</span>
          </p>
          <span className={styles.divider}></span>
          <div className={styles.profile}>
              <img id='imgPerf' src={usuario} alt='' />
          </div>
      </nav>
    </section>
  )
};

export default Upperbar;