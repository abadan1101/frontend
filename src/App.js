import './App.css';

import { Outlet } from "react-router-dom"

import Sidebar from './components/sidebar';
import Upperbar from './components/upperbar';

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
