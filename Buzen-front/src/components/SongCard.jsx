import { useState } from 'react';
import { Tooltip } from '@nextui-org/tooltip'; // O cualquier librería de tooltips que prefieras

const SongCard = ({ song, isCurrent, onPlay, isLoading = false, variant = "default" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  if (isLoading) {
    return (
      <div className="bg-gray-800 rounded-lg p-4 animate-pulse">
        <div className="relative aspect-square w-full bg-gray-700 rounded mb-3"></div>
        <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-700 rounded w-1/2"></div>
      </div>
    );
  }

    if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-3 p-2 rounded-lg ${isCurrent ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
        <img 
          src={song.image} 
          alt={song.title}
          className="w-12 h-12 rounded-md"
        />
        <div className="min-w-0">
          <h3 className="text-sm font-medium truncate">{song.title}</h3>
          <p className="text-xs text-gray-400 truncate">{song.artist}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-[var(--color-card-project)] rounded-lg p-4 transition-all duration-300 cursor-pointer ${
        isCurrent ? 'bg-[var(--color-accent)]' : 'hover:bg-[var(--color-accent)]'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square w-full mb-3">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-400 rounded animate-pulse"></div>
        )}
        <img
          src={song.image || '/default-song-cover.jpg'}
          alt={`Portada de ${song.title}`}
          loading="lazy"
          className={`w-full h-full object-cover rounded transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        {isHovered && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPlay(song);
            }}
            className="absolute bottom-2 right-2 bg-green-500 hover:bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center transition-transform duration-200 hover:scale-110"
            aria-label="Reproducir"
          >
            ▶
          </button>
        )}
      </div>

      <Tooltip content={song.title} placement="top" delay={300}>
        <h3 className="text-white font-medium truncate text-sm md:text-base">
          {song.title}
        </h3>
      </Tooltip>
      <Tooltip content={song.artist} placement="top" delay={300}>
        <p className="text-gray-400 truncate text-xs md:text-sm">{song.artist}</p>
      </Tooltip>
    </div>
  );
};

export default SongCard;
