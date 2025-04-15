import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import {  createBrowserRouter,  RouterProvider } from 'react-router-dom'

import Home from './routes/home';
import Trabalho from './routes/Trabalho';
import BlocoNotas from './routes/blocoNotas/index';
import ErrorPage from './routes/ErrorPage';

const router = createBrowserRouter([
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
