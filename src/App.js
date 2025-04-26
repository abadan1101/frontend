import './App.css';

import { Outlet } from "react-router-dom"

import Sidebar from './components/sidebar/sidebar.js';
import Upperbar from './components/upperbar/upperbar.js';

function App() {
  return (
    <div className="App">
      <Upperbar />
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default App;
