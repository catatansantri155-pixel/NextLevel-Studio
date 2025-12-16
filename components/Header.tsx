import React from 'react';
import { TrendingUp } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50 supports-[backdrop-filter]:bg-[#0a0a0f]/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-black p-2 rounded-lg ring-1 ring-white/10">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
          <div>
            <h1 className="font-bold text-xl text-white tracking-tight flex items-center gap-2">
              Nextlevel <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Studio</span>
            </h1>
            <p className="text-xs text-gray-400 font-medium tracking-wide">Bantu ubah fotomu menjadi lebih profesional</p>
          </div>
        </div>
      </div>
    </header>
  );
};