import React, { useState, useEffect } from 'react';
import { Game } from '../types';
import { GAMES_DATA } from '../constants';
import GameImage from './GameImage';

interface NotificationData {
  id: number;
  userName: string;
  game: Game;
  platform: 'Android' | 'iOS';
  timeAgo: string;
}

const USERNAMES = [
  'James',
  'Oliver',
  'William',
  'Daniel',
  'Michael',
  'Emily',
  'Sophia',
  'Jessica',
  'Emma',
  'David',
  'Ethan',
  'Lucas',
  'Noah',
  'Charlotte',
  'Liam',
  'Alexander',
  'Benjamin',
  'Mia',
  'Harper',
  'Evelyn'
];

const PLATFORMS: ('Android' | 'iOS')[] = ['Android', 'iOS'];
const TIME_AGOS = ['just now', 'a few seconds ago', '1m ago'];

export const LiveDownloadNotifications: React.FC = () => {
  const [notification, setNotification] = useState<NotificationData | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!GAMES_DATA || GAMES_DATA.length === 0) return;

    let hideTimeout: NodeJS.Timeout;
    let nextTimeout: NodeJS.Timeout;

    const scheduleNext = () => {
      // Show next notification after 5 to 8 seconds
      const delay = Math.floor(Math.random() * 3000) + 5000; // 5000ms - 8000ms
      nextTimeout = setTimeout(() => {
        triggerNotification();
      }, delay);
    };

    const triggerNotification = () => {
      // Pick random username
      const randomUser = USERNAMES[Math.floor(Math.random() * USERNAMES.length)];
      // Pick random game from existing GAMES_DATA
      const randomGame = GAMES_DATA[Math.floor(Math.random() * GAMES_DATA.length)];
      // Pick platform
      const randomPlatform = PLATFORMS[Math.floor(Math.random() * PLATFORMS.length)];
      const randomTime = TIME_AGOS[Math.floor(Math.random() * TIME_AGOS.length)];

      setNotification({
        id: Date.now(),
        userName: randomUser,
        game: randomGame,
        platform: randomPlatform,
        timeAgo: randomTime,
      });
      setIsVisible(true);

      // Disappear after exactly 4 seconds
      hideTimeout = setTimeout(() => {
        setIsVisible(false);
        // After fade out, trigger the next one
        scheduleNext();
      }, 4000);
    };

    // Initial trigger after 3.5 seconds
    const initialTimer = setTimeout(() => {
      triggerNotification();
    }, 3500);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(hideTimeout);
      clearTimeout(nextTimeout);
    };
  }, []);

  if (!notification) return null;

  return (
    <div
      aria-live="polite"
      className={`fixed bottom-5 left-4 z-50 pointer-events-none transition-all duration-500 ease-out transform ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
      }`}
    >
      <div className="pointer-events-auto max-w-[340px] sm:max-w-[380px] bg-[#131922]/95 backdrop-blur-md text-white p-3 rounded-2xl border border-[#222e3f] shadow-[0_10px_35px_rgba(0,0,0,0.65),0_0_15px_rgba(34,197,94,0.12)] flex items-center gap-3">
        {/* Game Cover */}
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-xl overflow-hidden bg-[#0d121a] border border-white/10 shadow-md">
          <GameImage
            game={notification.game}
            alt={notification.game.title}
            className="w-full h-full"
            priority={true}
          />
          {/* Subtle live indicator pulse */}
          <span className="absolute top-1 right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
        </div>

        {/* Notification Text Content */}
        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-0.5">
            <span className="font-semibold text-white truncate max-w-[110px]">
              {notification.userName}
            </span>
            <span>just downloaded</span>
            <span className="text-[10px] bg-green-950/80 text-green-400 border border-green-700/50 rounded px-1.5 py-0.2 shrink-0 font-bold uppercase">
              {notification.platform}
            </span>
          </div>

          <div className="font-bold text-sm text-green-400 truncate leading-snug">
            {notification.game.title}
          </div>

          <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-500">
            <span className="flex items-center gap-1 text-gray-400">
              <svg
                className="w-3 h-3 text-green-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
              Downloaded
            </span>
            <span className="w-1 h-1 bg-gray-600 rounded-full" />
            <span className="text-gray-400">{notification.timeAgo}</span>
          </div>
        </div>

        {/* Verified Download badge / icon */}
        <div className="shrink-0 w-8 h-8 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 flex items-center justify-center">
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" x2="12" y1="15" y2="3" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default LiveDownloadNotifications;
