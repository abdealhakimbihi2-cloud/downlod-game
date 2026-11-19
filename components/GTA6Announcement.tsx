import React from 'react';
import { Game } from '../types';
import GameImage from './GameImage';

interface GTA6AnnouncementProps {
  game: Game;
  onDownload: (game: Game) => void;
}

const GTA6Announcement: React.FC<GTA6AnnouncementProps> = ({ game, onDownload }) => {
  return (
    <section
      aria-label="GTA 6 Announcement"
      className="w-full px-4 pt-4 pb-1"
    >
      <div className="relative overflow-hidden rounded-3xl bg-[#0d121a] border border-pink-500/40 shadow-[0_0_40px_rgba(236,72,153,0.18),0_12px_32px_rgba(0,0,0,0.6)]">
        {/* Subtle GTA Vice City inspired ambient backdrop */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute -top-20 -right-16 w-64 h-64 rounded-full bg-pink-600/20 blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 -left-16 w-64 h-64 rounded-full bg-purple-600/20 blur-3xl animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-[#0d121a]/85 to-amber-500/10" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pink-400/70 to-transparent" />
        </div>

        <div className="relative z-10 p-5 sm:p-7 flex flex-col sm:flex-row items-center gap-5">
          {/* GTA 6 Cover Artwork */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-2xl overflow-hidden bg-[#0b0f14] border-2 border-pink-500/50 shadow-[0_0_25px_rgba(236,72,153,0.3)]">
            <GameImage
              game={game}
              alt={game.title}
              className="w-full h-full"
              priority={true}
            />
            <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-black/75 backdrop-blur-sm border border-pink-400/50 text-[9px] font-black uppercase tracking-widest text-pink-300">
              NEW
            </span>
          </div>

          {/* Announcement Copy & CTA */}
          <div className="flex-1 text-center sm:text-left min-w-0">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-400 to-purple-300 drop-shadow-[0_2px_10px_rgba(236,72,153,0.35)] leading-tight">
              🔥 GTA 6 IS READY! 🔥
            </h1>

            <p className="mt-2 text-sm sm:text-[15px] text-gray-200 leading-relaxed font-medium">
              Get ready to experience the next generation of gaming. GTA 6 is now available!
            </p>

            <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => onDownload(game)}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-amber-500 hover:from-pink-400 hover:via-fuchsia-400 hover:to-amber-400 text-white font-black text-sm tracking-wider uppercase shadow-[0_0_24px_rgba(236,72,153,0.45)] hover:shadow-[0_0_32px_rgba(236,72,153,0.65)] border border-white/20 transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
              >
                <svg
                  className="w-4 h-4 shrink-0 group-hover:translate-y-0.5 transition-transform duration-200"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
                <span>DOWNLOAD GTA 6</span>
              </button>

              <span className="text-xs font-semibold text-gray-400 tracking-wide">
                {game.size} • Android &amp; iOS
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GTA6Announcement;
