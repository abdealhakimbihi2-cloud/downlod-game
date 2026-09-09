
import React from 'react';
import { Icons, CATEGORIES } from '../constants';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewMode: 'list' | 'grid';
  setViewMode: (mode: 'list' | 'grid') => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  selectedCategory,
  setSelectedCategory
}) => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'gamepad':
        return <Icons.Gamepad />;
      case 'flag':
        return <Icons.Flag />;
      case 'globe':
        return <Icons.Globe />;
      case 'sword':
        return <Icons.Sword />;
      case 'steering':
        return <Icons.Steering />;
      case 'trophy':
        return <Icons.Trophy />;
      case 'box':
        return <Icons.Box />;
      default:
        return <Icons.Gamepad />;
    }
  };

  return (
    <div className="w-full px-4 pt-4 pb-2 space-y-3">
      {/* Search Bar matching screenshot */}
      <div className="relative w-full">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <Icons.Search />
        </div>
        <input
          type="text"
          placeholder="Search games..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#131922] border border-[#1f2937] hover:border-gray-600 focus:border-green-500 rounded-2xl py-3 pl-12 pr-10 text-[15px] text-white placeholder-gray-500 outline-none transition-all shadow-inner"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1"
          >
            <Icons.Close />
          </button>
        )}
      </div>

      {/* View Mode Switcher buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setViewMode('grid')}
          title="Grid view"
          className={`p-2.5 rounded-xl border transition-all flex items-center justify-center ${
            viewMode === 'grid'
              ? 'border-green-500 text-green-400 bg-green-500/10 shadow-[0_0_12px_rgba(34,197,94,0.15)]'
              : 'border-[#1f2937] text-gray-400 bg-[#131922] hover:text-white hover:border-gray-600'
          }`}
        >
          <Icons.Grid />
        </button>
        <button
          onClick={() => setViewMode('list')}
          title="List view"
          className={`p-2.5 rounded-xl border transition-all flex items-center justify-center ${
            viewMode === 'list'
              ? 'border-green-500 text-green-400 bg-green-500/10 shadow-[0_0_12px_rgba(34,197,94,0.15)]'
              : 'border-[#1f2937] text-gray-400 bg-[#131922] hover:text-white hover:border-gray-600'
          }`}
        >
          <Icons.List />
        </button>
      </div>

      {/* Category Pills (Horizontal Scrollable) */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-semibold whitespace-nowrap transition-all shrink-0 border ${
                isActive
                  ? 'border-green-500 text-green-400 bg-green-500/10 shadow-[0_0_12px_rgba(34,197,94,0.15)]'
                  : 'border-[#1f2937] text-gray-400 bg-[#131922] hover:text-white hover:border-gray-600'
              }`}
            >
              <span className={isActive ? 'text-green-400' : 'text-gray-400'}>
                {getCategoryIcon(cat.icon)}
              </span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Header;
