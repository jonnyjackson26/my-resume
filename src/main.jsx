import React, { useState } from 'react';
import ReactDOM from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home/Home';


const router = createHashRouter([
  {
    path: "/",
    element: <Home />
  },
])

export const Context = React.createContext();

function Main() {
  return (
    <Context.Provider>
      <RouterProvider router={router} />
    </Context.Provider>
  )
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <Main />
)