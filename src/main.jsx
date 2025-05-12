import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home/Home';
import Projects from './pages/Projects/Projects';
import app, { analytics, logAnalyticsEvent } from './firebaseClient';

const router = createHashRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/projects",
    element: <Projects />
  },
])

export const Context = React.createContext();

function Main() {
  useEffect(() => {
    // Log page view on initial load
    logAnalyticsEvent('page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname
    });
  }, []);

  return (
    <Context.Provider value={{ logAnalyticsEvent }}>
      <RouterProvider router={router} />
    </Context.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Main />
)