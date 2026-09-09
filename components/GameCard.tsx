
import React from 'react';
import { Game } from '../types';
import { Icons } from '../constants';
import GameImage from './GameImage';

interface GameCardProps {
  game: Game;
  viewMode?: 'list' | 'grid';
  onInstall: (game: Game) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, viewMode = 'list', onInstall }) => {
  if (viewMode === 'grid') {
    return (
      <div 
        onClick={() => onInstall(game)}
        className="group bg-[#131922] hover:bg-[#17202c] rounded-2xl p-4 flex flex-col h-full border border-[#1f2937] hover:border-green-500/50 transition-all cursor-pointer shadow-sm hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
      >
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-3 rounded-2xl overflow-hidden bg-[#0d121a] border border-white/10 shadow-lg">
          <GameImage
            game={game}
            alt={game.title}
            className="w-full h-full"
            imgClassName="group-hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[9px] font-bold text-green-400 bg-green-950/95 border border-green-700/60 rounded-md px-2 py-0.5 tracking-wider uppercase whitespace-nowrap shadow-md z-10">
            {game.category}
          </span>
        </div>

        <h3 className="text-white text-[15px] font-bold text-center leading-tight line-clamp-1 mt-2 mb-1 group-hover:text-green-400 transition-colors">
          {game.title}
        </h3>

        <p className="text-xs text-gray-400 text-center line-clamp-2 leading-relaxed mb-3 flex-1">
          {game.description}
        </p>

        <div className="flex items-center justify-center gap-2 mb-3 text-xs text-gray-400">
          <span>{game.size}</span>
          <span className="w-1 h-1 bg-gray-600 rounded-full" />
          <div className="flex items-center gap-0.5">
            <Icons.Star />
            <span className="font-bold text-gray-200">{game.rating}</span>
          </div>
        </div>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            onInstall(game);
          }}
          className="w-full bg-green-500 hover:bg-green-400 text-black py-2.5 rounded-xl flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-wider transition-all active:scale-95 shadow-md shadow-green-500/20"
        >
          <Icons.Download />
          INSTALL
        </button>
      </div>
    );
  }

  // Default List View (Matching screenshots)
  return (
    <div 
      onClick={() => onInstall(game)}
      className="group bg-[#131922] hover:bg-[#17202c] rounded-2xl p-3 sm:p-3.5 flex items-center gap-3 sm:gap-4 border border-[#1f2937] hover:border-green-500/50 transition-all cursor-pointer shadow-sm hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
    >
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-2xl overflow-hidden bg-[#0d121a] border border-white/10 shadow-md">
        <GameImage
          game={game}
          alt={game.title}
          className="w-full h-full"
          imgClassName="group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="flex-1 min-w-0 pr-1">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h3 className="text-white font-bold text-[15px] sm:text-base truncate group-hover:text-green-400 transition-colors">
            {game.title}
          </h3>
          <span className="text-[10px] sm:text-[11px] font-bold text-green-400 bg-green-950/60 border border-green-700/40 rounded-md px-2 py-0.5 tracking-wider uppercase shrink-0">
            {game.category}
          </span>
        </div>
        <p className="text-xs text-gray-400 line-clamp-1 sm:line-clamp-2 leading-relaxed">
          {game.description}
        </p>
      </div>

      <div className="text-gray-500 shrink-0 group-hover:text-green-400 group-hover:translate-x-1 transition-all pl-1">
        <Icons.ChevronRight />
      </div>
    </div>
  );
};

export default GameCard;
