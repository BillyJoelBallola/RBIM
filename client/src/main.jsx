import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

import { NavigationContextProvider } from './context/NavigationContext.jsx'

import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";    
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NavigationContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </NavigationContextProvider>
  </React.StrictMode>,
)
