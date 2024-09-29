import { HelmetProvider } from 'react-helmet-async';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Navbar from './Navbar.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
<HelmetProvider>
    <Navbar />
    <App />
</HelmetProvider>
  </StrictMode>,
)
