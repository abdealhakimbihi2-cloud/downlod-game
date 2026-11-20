
import React, { useEffect } from 'react';
import { Game } from '../types';
import { Icons } from '../constants';
import GameImage from './GameImage';

interface PlatformModalProps {
  game: Game;
  onClose: () => void;
  onSelect: (platform: 'android' | 'ios') => void;
}

const ADSTERRA_SCRIPT_SRC =
  'https://pl31259014.profitableratecpmnetwork.com/f6928743e53f7d1404630e9ceca531c2/invoke.js';
const ADSTERRA_CONTAINER_ID = 'container-f6928743e53f7d1404630e9ceca531c2';

const PlatformModal: React.FC<PlatformModalProps> = ({ game, onClose, onSelect }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  useEffect(() => {
    const container = document.getElementById(ADSTERRA_CONTAINER_ID);
    if (!container) return;

    // Remove any stale script instance before injecting so reopening for any game cleanly populates the container
    const existingScript = document.querySelector(`script[src="${ADSTERRA_SCRIPT_SRC}"]`);
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = ADSTERRA_SCRIPT_SRC;
    container.parentNode?.insertBefore(script, container);

    return () => {
      script.remove();
    };
  }, [game.id]);

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative bg-[#131922] text-white w-full max-w-[420px] max-h-[90vh] overflow-y-auto no-scrollbar rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#1f2937] animate-in zoom-in-95 duration-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"
        >
          <Icons.Close />
        </button>

        <div className="flex flex-col items-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 mb-4 relative rounded-2xl overflow-hidden bg-[#0d121a] border border-white/10 shadow-xl">
            <GameImage 
              game={game} 
              alt={game.title}
              className="w-full h-full"
              priority={true}
            />
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[9px] font-bold text-green-400 bg-green-950/95 border border-green-700/60 rounded px-1.5 py-0.5 uppercase tracking-wider whitespace-nowrap shadow-md z-10">
              {game.category}
            </span>
          </div>
          
          <h2 className="text-xl sm:text-2xl font-bold text-center mt-2 mb-1 tracking-tight text-white">
            {game.title}
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm text-center mb-6 px-4 leading-relaxed">
            Choose your device platform to start the download
          </p>

          <div className="w-full space-y-3">
            <button
              onClick={() => onSelect('android')}
              className="w-full flex items-center justify-between bg-[#192230] hover:bg-[#1f2b3d] border border-[#26354a] hover:border-green-500/50 p-4 rounded-2xl transition-all group active:scale-[0.98]"
            >
              <div className="flex items-center gap-3.5">
                <div className="bg-green-500/10 text-green-400 p-3 rounded-xl border border-green-500/20 group-hover:bg-green-500/20 transition-colors">
                  <Icons.Android />
                </div>
                <div className="text-left">
                  <div className="font-bold text-[15px] text-white">Android</div>
                  <div className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">APK + OBB Mod Package</div>
                </div>
              </div>
              <div className="w-5 h-5 rounded-full border border-gray-600 group-hover:border-green-400 group-hover:bg-green-500/20 flex items-center justify-center transition-colors">
                <div className="w-2 h-2 rounded-full bg-green-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>

            <button
              onClick={() => onSelect('ios')}
              className="w-full flex items-center justify-between bg-[#192230] hover:bg-[#1f2b3d] border border-[#26354a] hover:border-green-500/50 p-4 rounded-2xl transition-all group active:scale-[0.98]"
            >
              <div className="flex items-center gap-3.5">
                <div className="bg-green-500/10 text-green-400 p-3 rounded-xl border border-green-500/20 group-hover:bg-green-500/20 transition-colors">
                  <Icons.Apple />
                </div>
                <div className="text-left">
                  <div className="font-bold text-[15px] text-white">iOS Device</div>
                  <div className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">IPA Install Profile</div>
                </div>
              </div>
              <div className="w-5 h-5 rounded-full border border-gray-600 group-hover:border-green-400 group-hover:bg-green-500/20 flex items-center justify-center transition-colors">
                <div className="w-2 h-2 rounded-full bg-green-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          </div>

          {/* Relocated Adsterra Native Banner directly below iOS Device option */}
          <div className="w-full mt-5 pt-4 border-t border-[#1f2937]">
            <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider text-center mb-2.5">
              Advertisement
            </div>
            <div className="w-full rounded-2xl bg-[#0d121a] border border-[#1f2937] p-2.5 flex justify-center items-center min-h-[90px] overflow-hidden">
              <div id={ADSTERRA_CONTAINER_ID} className="w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformModal;
