import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Navbar from './Navbar.jsx'
import './index.css'
import Header from './header.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <Navbar />
    <App />
  </StrictMode>,
)
