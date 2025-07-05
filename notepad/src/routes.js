import App from './App';

import { createHashRouter } from 'react-router-dom' // usar createBrowserRouter na vps

import Login from './pages/login/login.js';
import BlocoNotas from './pages/notepad/notepad.js';
import ErrorPage from './pages/errorPage';
import Register from './pages/register/register.js';

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "notepad",
        element: <BlocoNotas />
      },
    ]
  }
])

export default router;