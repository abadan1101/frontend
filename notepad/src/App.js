import './App.css';

import { Outlet, useLocation } from "react-router-dom";

import Sidebar from './components/sidebar/sidebar.js';
import Upperbar from './components/upperbar/upperbar.js';

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/" || location.pathname === "/register";

  return (
    <div className="App">
      {!isLoginPage && <Upperbar />}
      {!isLoginPage && <Sidebar />}
      <Outlet />
    </div>
  );
}

export default App;