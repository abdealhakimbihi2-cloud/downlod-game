import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  getGameImageSources, 
  isUrlFailed, 
  markUrlFailed, 
  resolveGameCoverDynamic 
} from '../src/services/gameImageService';

interface GameImageProps {
  game: {
    id?: string;
    title: string;
    imageUrl?: string;
    category?: string;
  };
  alt?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}

export const GameImage: React.FC<GameImageProps> = ({
  game,
  alt,
  className = '',
  imgClassName = '',
  priority = false
}) => {
  const sources = useMemo(() => {
    return getGameImageSources(game);
  }, [game.id, game.title, game.imageUrl]);

  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    const idx = sources.findIndex(src => !isUrlFailed(src));
    return idx >= 0 ? idx : 0;
  });

  const [dynamicUrl, setDynamicUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasAllFailed, setHasAllFailed] = useState(false);
  const isResolvingDynamic = useRef(false);

  useEffect(() => {
    // Reset state when sources or game change
    const idx = sources.findIndex(src => !isUrlFailed(src));
    if (idx >= 0) {
      setCurrentIndex(idx);
      setDynamicUrl(null);
      setHasAllFailed(false);
      setIsLoading(true);
    } else if (sources.length === 0) {
      triggerDynamicResolution();
    }
  }, [sources, game.title]);

  const triggerDynamicResolution = async () => {
    if (isResolvingDynamic.current) return;
    isResolvingDynamic.current = true;
    try {
      const cover = await resolveGameCoverDynamic(game.title);
      if (cover && !isUrlFailed(cover)) {
        setDynamicUrl(cover);
        setIsLoading(true);
        setHasAllFailed(false);
      } else {
        setHasAllFailed(true);
        setIsLoading(false);
      }
    } catch (_) {
      setHasAllFailed(true);
      setIsLoading(false);
    } finally {
      isResolvingDynamic.current = false;
    }
  };

  const handleImageError = () => {
    const activeUrl = dynamicUrl || sources[currentIndex];
    if (activeUrl) {
      markUrlFailed(activeUrl);
    }

    if (dynamicUrl) {
      // Dynamic URL also failed
      setHasAllFailed(true);
      setIsLoading(false);
      return;
    }

    // Try next available registered source
    const nextIdx = currentIndex + 1;
    if (nextIdx < sources.length) {
      setCurrentIndex(nextIdx);
      setIsLoading(true);
    } else {
      // All predefined sources exhausted, attempt automatic real-time resolution
      triggerDynamicResolution();
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const activeSrc = dynamicUrl || sources[currentIndex];

  return (
    <div className={`relative overflow-hidden bg-[#0a0f16] ${className}`}>
      {/* Loading Skeleton Shimmer */}
      {isLoading && !hasAllFailed && (
        <div className="absolute inset-0 z-0 bg-[#121924] animate-pulse">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_1.5s_infinite]" />
        </div>
      )}

      {/* Main Image */}
      {!hasAllFailed && activeSrc ? (
        <img
          src={activeSrc}
          alt={alt || game.title}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          referrerPolicy="no-referrer"
          onError={handleImageError}
          onLoad={handleImageLoad}
          className={`w-full h-full object-cover object-center transition-all duration-300 ${
            isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          } ${imgClassName}`}
        />
      ) : (
        /* Styled Brand Badge if all network sources fail completely */
        <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center bg-gradient-to-br from-[#121924] via-[#0d141e] to-[#080d15] select-none">
          <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400 font-black text-sm mb-1 shadow-inner">
            {game.title.slice(0, 2).toUpperCase()}
          </div>
          <span className="text-[10px] font-bold text-gray-300 line-clamp-1">
            {game.title}
          </span>
          {game.category && (
            <span className="text-[8px] font-semibold text-green-400 uppercase tracking-widest mt-0.5">
              {game.category}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default GameImage;
