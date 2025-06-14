//IMPORTAÇÃO DOS COMPONENTES---------------------------------------------------
import styles from './upperbar.module.css';
import { IoIosSearch } from "react-icons/io";
import { FaBell } from "react-icons/fa";
import { BiSolidMessageSquareDots } from "react-icons/bi";
import { LiaUserSolid } from "react-icons/lia";

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
              <LiaUserSolid className={styles.icon}/>
          </div>
      </nav>
    </section>
  )
};

export default Upperbar;