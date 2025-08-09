import { useState } from "react";
import { FaPlayCircle, FaPauseCircle, FaStepBackward, FaStepForward } from "react-icons/fa";

function Player() {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[var(--color-deep-black)] dark:bg-[var(--color-dark-purple)] text-[var(--color-text-primary)] shadow-lg flex items-center justify-between px-6 py-3 z-50">
      
      {/* Info canción */}
      <div className="flex items-center gap-4 min-w-[220px]">
        <img
          src="/path/to/album.jpg"
          alt="Portada"
          className="w-14 h-14 rounded-md object-cover shadow-md"
        />
        <div className="flex flex-col overflow-hidden">
          <p className="font-semibold truncate">Nombre de la canción que puede ser muy largo</p>
          <p className="text-sm text-[var(--color-text-secondary)] truncate">Artista</p>
        </div>
      </div>

      {/* Controles */}
      <div className="flex items-center gap-8">
        <button
          aria-label="Anterior"
          className="text-[var(--color-accent)] hover:text-[#c23be7] transition-colors"
        >
          <FaStepBackward size={28} />
        </button>

        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Pausa" : "Reproducir"}
          className="text-[var(--color-accent)] hover:text-[#c23be7] transition-colors"
        >
          {isPlaying ? <FaPauseCircle size={38} /> : <FaPlayCircle size={38} />}
        </button>

        <button
          aria-label="Siguiente"
          className="text-[var(--color-accent)] hover:text-[#c23be7] transition-colors"
        >
          <FaStepForward size={28} />
        </button>
      </div>

      {/* Barra de progreso */}
      <div className="flex-1 flex items-center justify-center min-w-[300px] max-w-[600px] ml-8">
        <input
          type="range"
          min="0"
          max="100"
          className="w-full h-1 rounded-lg cursor-pointer"
          style={{
            accentColor: 'var(--color-accent)'
          }}
        />
      </div>

    </div>
  );
}

export default Player;
