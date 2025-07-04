import './App.css';
import { Outlet, useLocation } from "react-router-dom";
import Upperbar from './components/upperbar/upperbar.js';
import { useState, useEffect } from "react";
import { setThemeColorByTheme, applyThemeClass } from './theme.js';



function App() {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const isLoginPage = location.pathname === "/" || location.pathname === "/register" || location.pathname === "/settings";

  //CONFIGURAÇÕES DE TEMA
  useEffect(() => {
    function updateTheme() {
      setThemeColorByTheme();
      applyThemeClass();
    }
    updateTheme();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', updateTheme);

    window.addEventListener('storage', updateTheme);

    return () => {
      mediaQuery.removeEventListener('change', updateTheme);
      window.removeEventListener('storage', updateTheme);
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