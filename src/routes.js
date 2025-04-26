import React from 'react';
import App from './App';

import { createHashRouter } from 'react-router-dom' // usar createBrowserRouter na vps

import Home from './components/pages/home';
import Trabalho from './components/pages/trabalho';
import BlocoNotas from './components/pages/blocoNotas';
import ErrorPage from './components/pages/errorPage';

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