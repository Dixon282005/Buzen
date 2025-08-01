import { useState } from 'react';
import SongCard from "./SongCard";

function Dashboard() {
  const [currentSongId, setCurrentSongId] = useState(null);

  // Datos de ejemplo para probar
  const librarySongs = [
    {
      id: 'lib1',
      title: 'Save Your Tears',
      artist: 'The Weeknd',
      image: 'https://i.scdn.co/image/ab67616d00001e02c59199eeb6b5a55c8a4c4c09'
    },
    {
      id: 'lib2',
      title: 'Starboy',
      artist: 'The Weeknd, Daft Punk',
      image: 'https://i.scdn.co/image/ab67616d00001e02a9f6c04ba168640b48aa5795'
    }
  ];

  const recommendedSongs = [
    {
      id: 'rec1',
      title: 'Blinding Lights',
      artist: 'The Weeknd',
      image: 'https://i.scdn.co/image/ab67616d00001e02a935e865d7f0b1110a8ef024'
    },
    {
      id: 'rec2',
      title: 'Take My Breath',
      artist: 'The Weeknd',
      image: 'https://i.scdn.co/image/ab67616d00001e02e0b60c608586d88251b6a1e8'
    },
    {
      id: 'rec3',
      title: 'Die For You',
      artist: 'The Weeknd',
      image: 'https://i.scdn.co/image/ab67616d00001e02d5f5e99c9f0e4a8a7e4a6d4e'
    },
    {
      id: 'rec4',
      title: 'Moth To A Flame',
      artist: 'Swedish House Mafia, The Weeknd',
      image: 'https://i.scdn.co/image/ab67616d00001e02f9a4a7a0a6b0e9e0b4f4e4d4'
    }
  ];

  const handlePlay = (songId) => {
    setCurrentSongId(songId);
    console.log('Reproduciendo canción:', songId);
    // Aquí iría tu lógica de reproducción real
  };

  return (
    <div className="h-screen w-screen p-3 overflow-hidden text-white ">
      {/* --- Contenedor Principal (Flex en columnas) --- */}
      <div className="flex h-full gap-3">
        {/* --- Sidebar (1/4 del ancho) --- */}
        <div className="w-1/4 bg-[var(--color-dark-purple)] rounded-xl p-4 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Tu Biblioteca</h2>
          <div className="space-y-3">
            {librarySongs.map((song) => (
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
    </div>
  );
}

export default Dashboard;