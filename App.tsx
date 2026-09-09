
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Header from './components/Header';
import GameCard from './components/GameCard';
import PlatformModal from './components/PlatformModal';
import ProgressModal from './components/ProgressModal';
import { GAMES_DATA, Icons } from './constants';
import { Game } from './types';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Modal states
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [activeModal, setActiveModal] = useState<'none' | 'platform' | 'progress'>('none');
  const [selectedPlatform, setSelectedPlatform] = useState<'android' | 'ios' | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 250);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const scriptSrc = 'https://pl31259014.profitableratecpmnetwork.com/f6928743e53f7d1404630e9ceca531c2/invoke.js';
    const container = document.getElementById('container-f6928743e53f7d1404630e9ceca531c2');

    if (container && !document.querySelector(`script[src="${scriptSrc}"]`)) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = scriptSrc;
      container.parentNode?.insertBefore(script, container);
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredGames = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    // 1. De-duplicate list by title (normalized) and stable id
    const seen = new Set<string>();
    const uniqueGames = GAMES_DATA.filter(g => {
      const normalizedTitle = g.title.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (seen.has(normalizedTitle) || seen.has(g.id)) return false;
      seen.add(normalizedTitle);
      seen.add(g.id);
      return true;
    });

    // 2. Filter by category
    const categoryFiltered = selectedCategory === 'all'
      ? uniqueGames
      : uniqueGames.filter(g => g.category.toUpperCase() === selectedCategory.toUpperCase());

    // 3. Filter by search query
    if (!query) return categoryFiltered;

    return categoryFiltered.filter(game =>
      game.title.toLowerCase().includes(query) ||
      game.description.toLowerCase().includes(query) ||
      game.category.toLowerCase().includes(query)
    );
  }, [searchQuery, selectedCategory]);

  const handleInstallClick = useCallback((game: Game) => {
    setSelectedGame(game);
    setActiveModal('platform');
  }, []);

  const handlePlatformSelect = (platform: 'android' | 'ios') => {
    setSelectedPlatform(platform);
    setActiveModal('progress');
  };

  const handleDownloadContinue = (gameId: string, platform: 'android' | 'ios') => {
    console.log(`Download continued for game: ${gameId} on platform: ${platform}`);
    setActiveModal('none');
    setSelectedGame(null);
    setSelectedPlatform(null);
  };

  const handleCloseModals = () => {
    setActiveModal('none');
    setSelectedGame(null);
    setSelectedPlatform(null);
  };

  return (
    <div className="min-h-screen bg-[#0b0f14] text-white flex flex-col antialiased">
      {/* Container constrained to mobile/desktop app view matching screenshot */}
      <div className="w-full max-w-2xl mx-auto flex flex-col flex-1 pb-16">
        {/* Top Navigation: Search, View Mode Toggle, Category Tabs */}
        <Header 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery}
          viewMode={viewMode}
          setViewMode={setViewMode}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* Games Content Area */}
        <main className="px-4 pt-2 flex-1">
          {filteredGames.length > 0 ? (
            viewMode === 'list' ? (
              <div className="space-y-3">
                {filteredGames.map(game => (
                  <GameCard 
                    key={game.id} 
                    game={game} 
                    viewMode="list"
                    onInstall={handleInstallClick} 
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                {filteredGames.map(game => (
                  <GameCard 
                    key={game.id} 
                    game={game} 
                    viewMode="grid"
                    onInstall={handleInstallClick} 
                  />
                ))}
              </div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
              <div className="bg-[#131922] p-6 rounded-full mb-4 border border-[#1f2937]">
                <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-base font-medium text-gray-400">No games found for "{searchQuery}"</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-3 text-green-400 font-semibold hover:underline text-sm"
              >
                Reset filters
              </button>
            </div>
          )}

          {/* Advertisement / إعلان bar matching screenshot */}
          <div className="mt-8 pt-4 border-t border-[#1b2431]">
            <div className="flex items-center justify-between text-xs text-gray-500 uppercase tracking-wider px-1 mb-3">
              <span>ADVERTISEMENT</span>
              <span>إعلان</span>
            </div>
            {/* Adsterra Native Banner */}
            <div className="w-full flex justify-center items-center min-h-[90px] overflow-hidden">
              <div id="container-f6928743e53f7d1404630e9ceca531c2" className="w-full"></div>
            </div>
          </div>
        </main>

        {/* Floating Scroll To Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            title="Scroll to top"
            className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[#131922] border border-[#2b394d] text-green-400 hover:bg-[#1b2432] hover:border-green-500 shadow-2xl flex items-center justify-center transition-all active:scale-95 animate-in fade-in zoom-in-75 duration-200"
          >
            <Icons.ArrowUp />
          </button>
        )}
      </div>

      {/* Modal Flow */}
      {selectedGame && activeModal === 'platform' && (
        <PlatformModal 
          game={selectedGame} 
          onClose={handleCloseModals} 
          onSelect={handlePlatformSelect} 
        />
      )}

      {selectedGame && activeModal === 'progress' && selectedPlatform && (
        <ProgressModal 
          game={selectedGame} 
          platform={selectedPlatform} 
          onClose={handleCloseModals} 
          onContinue={handleDownloadContinue}
        />
      )}
    </div>
  );
};

export default App;
