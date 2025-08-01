

function Dashboard() {

 return (
  <div className="h-screen w-screen p-3 overflow-hidden text-white">
    {/* --- Contenedor Principal (Flex en columnas) --- */}
    <div className="flex h-full gap-3"> {/* Espaciado entre sidebar y contenido */}
      
      {/* --- Sidebar (1/4 del ancho) --- */}
      <div className="w-1/4 bg-gray-900 rounded-xl p-4 overflow-y-auto">
        {/* Contenido del sidebar (playlists, biblioteca) */}
        <h2 className="text-xl font-bold mb-4">Tu Biblioteca</h2>
        <div className="space-y-3"> {/* Espaciado entre elementos internos */}
    
        </div>
      </div>

      {/* --- Contenido Principal (3/4 del ancho) --- */}
      <div className="w-3/4 bg-gray-800 rounded-xl p-4 overflow-y-auto">
        {/* Sección de recomendaciones */}
        <h2 className="text-2xl font-bold mb-6">Recomendados para ti</h2>
        
        {/* Grid de álbumes (dentro del contenedor flex) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
     
          {/* ... */}
        </div>
      </div>
    </div>
  </div>
);
}


export default Dashboard;