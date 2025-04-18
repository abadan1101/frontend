import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import {  createBrowserRouter,  RouterProvider, createHashRouter } from 'react-router-dom'

import Home from './pages/Home/home';
import Trabalho from './pages/Trabalho/Trabalho';
import BlocoNotas from './pages/blocoNotas/index';
import ErrorPage from './pages/ErrorPage/ErrorPage';

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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
