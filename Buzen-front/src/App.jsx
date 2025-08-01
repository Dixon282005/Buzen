import { useState } from 'react'
import Nav from './components/Header.jsx';
import Dashboard from './components/Dashboard.jsx';


function App() {
  return (
    <>
      <div 
  className="overflow-hidden h-screen"
  style={{
    background: 'linear-gradient(to right, var(--color-deep-black), var(--color-dark-purple), var(--color-deep-black))',
    backgroundSize: '400% 100%',
    animation: 'seamlessFlow 120s linear infinite'
  }}
>
        <Nav />
        <Dashboard />


      </div>
    </>
  );
}

export default App;





