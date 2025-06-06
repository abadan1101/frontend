import api from '../../services/api.js';
import styles from "./home.module.css";
async function buscarUsuario() {
  try {
    // Não precisa pegar o token do localStorage, pois o cookie HttpOnly já é enviado automaticamente
    // Basta fazer a requisição normalmente
    const userId = "68430bb9639bc71b2a4a7862";
    const response = await api.get(`/user/${userId}`);
    console.log(response.data.user);
    alert(`Usuário: ${response.data.user.name}`);
  } catch (error) {
    alert("Erro ao buscar usuário.");
    console.log(error)
  }
}
const Home = () => {
    return (
        <div className={styles.home}>
          <h1>home</h1>
          <button onClick={buscarUsuario}>
            teste
          </button>
        </div>
      );
}

export default Home;