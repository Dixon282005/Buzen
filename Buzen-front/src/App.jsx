import { useState } from 'react'
import Nav from './components/Header.jsx';


function App() {
  return (
    <>
      <div className='bg-black p-5'>
        <Nav />
        <div className="h-screen w-screen overflow-hidden grid grid-rows-[auto_1fr] bg-black">
          <div className="grid grid-cols-4 row-start-2 h-full">
            {/* Sidebar izquierdo (1/4) */}
            <div className="col-span-1 bg-gray-900 p-4 overflow-y-auto">

            </div>

            {/* Contenido derecho (3/4) */}
            <div className="col-span-3 bg-gray-800 p-4 overflow-y-auto">

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;





