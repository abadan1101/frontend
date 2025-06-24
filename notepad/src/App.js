import './App.css';
import { Outlet, useLocation } from "react-router-dom";
import Upperbar from './components/upperbar/upperbar.js';
import { useState, useEffect } from "react";
import { setThemeColorByTheme } from './theme.js';

function App() {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const isLoginPage = location.pathname === "/" || 
    location.pathname === "/register" ||
    location.pathname === "/settings";

  useEffect(() => {
    setThemeColorByTheme();
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => setThemeColorByTheme();
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <div className="App">
      {!isLoginPage && <Upperbar searchTerm={searchTerm} onSearch={setSearchTerm} />}
      <Outlet context={{ searchTerm }} />
    </div>
  );
}

export default App;