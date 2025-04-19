import React from 'react';
import App from './App';

import { createHashRouter } from 'react-router-dom' // usar createBrowserRouter na vps

import Home from './pages/home';
import Trabalho from './pages/trabalho';
import BlocoNotas from './pages/blocoNotas';
import ErrorPage from './pages/errorPage';

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "trabalho",
        element: <Trabalho />
      },
      {
        path: "bloconotas",
        element: <BlocoNotas />
      },
    ]
  }
])

export default router;