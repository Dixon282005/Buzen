import React, { useRef, useEffect, useState } from 'react';
import { FaPlayCircle, FaPauseCircle, FaStepBackward, FaStepForward } from "react-icons/fa";

function Player({ song, isPlaying, setIsPlaying, audioRef, recommendedSongs, setCurrentSongId, progress, handleSeek }) {
  const togglePlay = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play(); // Si está en pausa, reproduce
      } else {
        audioRef.current.pause(); // Si está reproduciendo, pausa
      }
      // setIsPlaying se actualizará automáticamente gracias a los listeners
      // que agregaste en el componente padre
    }
  };
  
  const handleNext = () => {
    if (recommendedSongs.length === 0) return;
    
    const currentIndex = recommendedSongs.findIndex(s => s.id === song.id);
    const nextIndex = (currentIndex + 1) % recommendedSongs.length;
    const nextSong = recommendedSongs[nextIndex];

    setCurrentSongId(nextSong);
    audioRef.current.src = nextSong.audio;
    audioRef.current.play().catch(e => {
      console.error("Error al reproducir la siguiente canción:", e);
    });
  };

  // Lógica para ir a la canción anterior
  const handlePrevious = () => {
    if (recommendedSongs.length === 0) return;

    const currentIndex = recommendedSongs.findIndex(s => s.id === song.id);
    const previousIndex = (currentIndex - 1 + recommendedSongs.length) % recommendedSongs.length;
    const previousSong = recommendedSongs[previousIndex];

    setCurrentSongId(previousSong);
    audioRef.current.src = previousSong.audio;
    audioRef.current.play().catch(e => {
      console.error("Error al reproducir la canción anterior:", e);
    });
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[var(--color-deep-black)] dark:bg-[var(--color-dark-purple)] text-[var(--color-text-primary)] shadow-lg flex items-center justify-between px-6 py-3 z-50">
      
      {/* Info canción */}
      <div className="flex items-center gap-4 min-w-[220px]">
        <img
          src={song.image || "/path/to/album.jpg"}
          alt={song.title || "Portada"}
          className="w-14 h-14 rounded-md object-cover shadow-md"
        />
        <div className="flex flex-col overflow-hidden">
          <p className="font-semibold truncate">{song.title}</p>
          <p className="text-sm text-[var(--color-text-secondary)] truncate">{song.artist}</p>
        </div>
      </div>

      {/* Controles */}
      <div className="flex items-center gap-8">
        <button
          onClick={handlePrevious}
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
          onClick={handleNext}
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
          value={progress}
          onChange={handleSeek}
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
