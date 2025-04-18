import './App.css';

import { Outlet } from "react-router-dom"

import Sidebar from './components/menuPrincipal/Sidebar.js';
import Topbar from './components/barraSuperior/Topbar.js';

function App() {
  return (
    <div className="App">
      <Topbar />
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default App;
