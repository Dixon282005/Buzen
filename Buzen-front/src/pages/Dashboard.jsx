import React, { useState, useEffect, useRef } from 'react';
import SongCard from "../components/SongCard.jsx";
import Player from '../components/Player.jsx';

function Dashboard() {
  const [recommendedSongs, setRecommendedSongs] = useState([]);
  const [currentSongId, setCurrentSongId] = useState(null);
  const JAMENDO_CLIENT_ID = import.meta.env.VITE_JAMENDO_CLIENT_ID; 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // Estado para el progreso
const audioObjectRef = useRef(null);
const audioRef = useRef(null);

  useEffect(() => {
    // URL de la API de Jamendo para obtener las canciones más populares
    const url = `https://api.jamendo.com/v3.0/tracks/?client_id=${JAMENDO_CLIENT_ID}&limit=10&order=popularity_week&audioformat=mp31`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.headers.status === 'success') {
          // Mapeamos los datos de la API para que coincidan con nuestro formato
          const formattedSongs = data.results.map(track => ({
            id: track.id,
            title: track.name,
            artist: track.artist_name,
            image: track.image,
            audio: track.audio 
          }));
          setRecommendedSongs(formattedSongs);
          setLoading(false);
        } else {
          setError(data.headers.error_message);
          setLoading(false);
        }
      })
      .catch(e => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

const handleLoadedMetadata = () => {
  // Aseguramos que la duración total de la canción se actualice
  setProgress(0); // Reiniciamos el progreso
};

const handleTimeUpdate = () => {
  if (audioRef.current) {
    // Calculamos el porcentaje de progreso
    const newProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(newProgress);
  }
};

const handleSeek = (event) => {
  if (audioRef.current) {
    const newTime = (event.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress(event.target.value); 
  }
};

const handlePlay = (songId, song) => {
  // 1. Si no hay un objeto de audio, lo creamos
  if (!audioRef.current) {
    audioRef.current = new Audio();
    
    audioRef.current.onplay = () => setIsPlaying(true);
    audioRef.current.onpause = () => setIsPlaying(false);
    audioRef.current.onended = () => setIsPlaying(false);
    audioRef.current.ontimeupdate = handleTimeUpdate;
	audioRef.current.onloadedmetadata = handleLoadedMetadata;
  }

  // 2. Si la canción que queremos reproducir es la misma que ya está sonando...
  if (songId === currentSongId) {
    
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  } else {
    // 3. Si es una canción nueva, cambiamos la fuente y la reproducimos
    setCurrentSongId(songId);
    audioRef.current.src = songId.audio;
    audioRef.current.load();
    audioRef.current.play().catch(e => {
        if (e.name !== 'AbortError') {
            console.error('Error de reproducción:', e);
        }
    });
  }
};

  return (
    <div className="h-screen w-screen p-3 overflow-hidden text-white ">
      {/* --- Contenedor Principal (Flex en columnas) --- */}
      <div className="flex h-full gap-3">
        {/* --- Sidebar (1/4 del ancho) --- */}
        <div className="w-1/4 bg-[var(--color-dark-purple)] rounded-xl p-4 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Tu Biblioteca</h2>
          <div className="space-y-3">
            {recommendedSongs.map((song) => (
              <SongCard
                key={`lib-${song.id}`}
                song={song}
                isCurrent={song.id === currentSongId}
                onPlay={handlePlay}
                variant="compact" // Versión más pequeña para el sidebar
              />
            ))}
          </div>
        </div>

        {/* --- Contenido Principal (3/4 del ancho) --- */}
        <div className="w-3/4 bg-[var(--color-dark-purple)] rounded-xl p-4 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6">Recomendados para ti</h2>
          
          {/* Grid de canciones recomendadas */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {recommendedSongs.map((song) => (
              <SongCard
                key={`rec-${song.id}`}
                song={song}
                isCurrent={song.id === currentSongId}
                onPlay={handlePlay}
                variant="default" // Versión normal para el contenido principal
              />
            ))}
          </div>
        </div>
      </div>
            {currentSongId && <Player 
            song={currentSongId} 
            isPlaying={isPlaying} 
            setIsPlaying={setIsPlaying}
            audioRef={audioRef}
            recommendedSongs={recommendedSongs}
			setCurrentSongId={setCurrentSongId}
			progress={progress}
			handleSeek={handleSeek}
            />}
      
    </div>
  );
}

export default Dashboard;
