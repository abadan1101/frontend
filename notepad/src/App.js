import './theme.css';
import { setThemeColorByTheme, applyThemeClass, applyColorTheme } from './theme.js';
import { Outlet, useLocation } from "react-router-dom";
import Upperbar from './components/upperbar/upperbar.js';
import { useState, useEffect } from "react";



function App() {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const isLoginPage = location.pathname === "/" || location.pathname === "/register" || location.pathname === "/settings";

  //CONFIGURAÇÕES DE TEMA
  useEffect(() => {
    function updateTheme() {
      setThemeColorByTheme(); // função é também chamada no modulo userSettings para Atualizar imediatamente a cor do tema na pagina
      applyThemeClass(); // função é também chamada no modulo userSettings para Atualizar imediatamente a cor do body
      applyColorTheme(); // função é também chamada no modulo userSettings para Atualizar imediatamente a cor do tema
    }
    updateTheme();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', updateTheme);

    return () => {
      mediaQuery.removeEventListener('change', updateTheme);
    };
  }, []);

  return (
    <div className="App">
      {!isLoginPage && <Upperbar searchTerm={searchTerm} onSearch={setSearchTerm}/>}
      <Outlet context={{ searchTerm }} />
    </div>
  );
}

export default App;