import './App.css';

import { Outlet, useLocation } from "react-router-dom";

import Upperbar from './components/upperbar/upperbar.js';

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/" || 
    location.pathname === "/register" ||
    location.pathname === "/settings";

  return (
    <div className="App">
      {!isLoginPage && <Upperbar />}
      <Outlet />
    </div>
  );
}

export default App;