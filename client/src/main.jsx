import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import axios from 'axios'

import { NavigationContextProvider } from './context/NavigationContext.jsx'

import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";    
import './index.css'
import { UserContextProvider } from './context/UserContext.jsx'

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <NavigationContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </NavigationContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
)
