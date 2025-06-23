import './App.css';
import { Outlet, useLocation } from "react-router-dom";
import Upperbar from './components/upperbar/upperbar.js';
import { useState } from "react";

function App() {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const isLoginPage = location.pathname === "/" || 
    location.pathname === "/register" ||
    location.pathname === "/settings";

  return (
    <div className="App">
      {!isLoginPage && <Upperbar searchTerm={searchTerm} onSearch={setSearchTerm} />}
      <Outlet context={{ searchTerm }} />
    </div>
  );
}

export default App;