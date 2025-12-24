
import React from 'react';
import { Square, Smartphone, Monitor, LayoutTemplate, Copy, RectangleHorizontal, RectangleVertical, Info, Sun, Moon, Palette } from 'lucide-react';
import { AspectRatio, OutputConfig, ThemeMode } from '../types';

interface OutputSettingsProps {
  config: OutputConfig;
  onChange: (newConfig: OutputConfig) => void;
}

export const OutputSettings: React.FC<OutputSettingsProps> = ({ config, onChange }) => {
  
  const ratios: { value: AspectRatio; label: string; icon: React.ElementType; desc: string }[] = [
    { value: '1:1', label: 'Square', icon: Square, desc: 'IG Feed, Profile' },
    { value: '3:4', label: 'Portrait', icon: RectangleVertical, desc: 'Social Media' },
    { value: '4:3', label: 'Standard', icon: RectangleHorizontal, desc: 'Blog, Web' },
    { value: '9:16', label: 'Story', icon: Smartphone, desc: 'TikTok, Reels' },
    { value: '16:9', label: 'Landscape', icon: Monitor, desc: 'YouTube, Banner' },
  ];

  const themes: { value: ThemeMode; label: string; icon: React.ElementType; activeClass: string; iconColor: string }[] = [
    { 
      value: 'Cerah', 
      label: 'Cerah (High-Key)', 
      icon: Sun, 
      activeClass: 'bg-yellow-500/20 border-yellow-500 text-yellow-300 shadow-[0_0_15px_rgba(234,179,8,0.3)]',
      iconColor: 'text-yellow-400'
    },
    { 
      value: 'Gelap', 
      label: 'Gelap (Low-Key)', 
      icon: Moon, 
      activeClass: 'bg-indigo-600/20 border-indigo-500 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.3)]',
      iconColor: 'text-indigo-400'
    },
    { 
      value: 'Campur', 
      label: 'Campur (AI Auto)', 
      icon: Palette, 
      activeClass: 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-pink-500 text-pink-300 shadow-[0_0_15px_rgba(236,72,153,0.3)]',
      iconColor: 'text-pink-400'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Aspect Ratio Section */}
      <div>
        <label className="text-sm font-medium text-gray-300 block flex items-center gap-2">
            <LayoutTemplate className="w-4 h-4 text-cyan-400" />
            Ukuran & Rasio (Marketplace/Sosmed)
        </label>
        
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mt-4">
          {ratios.map((ratio) => {
            const Icon = ratio.icon;
            const isSelected = config.aspectRatio === ratio.value;
            
            return (
              <button
                key={ratio.value}
                onClick={() => onChange({ ...config, aspectRatio: ratio.value })}
                className={`relative group flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-300
                  ${isSelected 
                    ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]' 
                    : 'bg-[#05050a] border-white/10 text-gray-400 hover:bg-white/5 hover:border-white/20 hover:text-gray-200'
                  }
                `}
              >
                {/* Info Icon in Top Right Corner */}
                <div className="absolute top-1.5 right-1.5 opacity-50 group-hover:opacity-100 transition-opacity">
                    <Info className={`w-3 h-3 ${isSelected ? 'text-cyan-400' : 'text-gray-600 group-hover:text-gray-400'}`} />
                </div>

                {/* Tooltip Description */}
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max max-w-[120px] bg-[#0f0f16] border border-white/10 text-[10px] text-gray-200 px-2 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pointer-events-none z-20 shadow-xl backdrop-blur-md">
                    {ratio.desc}
                    <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0f0f16] border-b border-r border-white/10 rotate-45"></div>
                </div>

                <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-cyan-400' : 'text-gray-500 group-hover:text-gray-300'}`} />
                <span className="text-[10px] sm:text-xs font-semibold tracking-wide">{ratio.label}</span>
                <span className="text-[9px] opacity-50 mt-0.5 font-mono">{ratio.value}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/5">
          {/* Image Count Section */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-3 block flex items-center gap-2">
                <Copy className="w-4 h-4 text-purple-400" />
                Jumlah Variasi Gambar
            </label>
            <div className="flex bg-[#05050a] p-1.5 rounded-xl border border-white/10 w-full justify-between sm:justify-start sm:gap-2">
                {[1, 2, 3, 4].map((num) => (
                    <button
                    key={num}
                    onClick={() => onChange({ ...config, count: num })}
                    className={`flex-1 sm:flex-none sm:w-12 h-10 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center relative
                        ${config.count === num
                        ? 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg border border-purple-400/50'
                        : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                        }
                    `}
                    >
                    {num}
                    </button>
                ))}
            </div>
            <p className="text-[10px] text-gray-500 mt-2 leading-tight">
                *Lebih banyak = durasi generate lebih lama.
            </p>
          </div>

          {/* Theme Section */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-3 block flex items-center gap-2">
                <Palette className="w-4 h-4 text-pink-400" />
                Tema Pencahayaan
            </label>
            <div className="flex bg-[#05050a] p-1.5 rounded-xl border border-white/10 w-full gap-2">
                {themes.map((theme) => {
                    const Icon = theme.icon;
                    const isSelected = config.theme === theme.value;
                    return (
                        <button
                            key={theme.value}
                            onClick={() => onChange({ ...config, theme: theme.value })}
                            className={`flex-1 h-10 rounded-lg text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 relative border
                                ${isSelected
                                ? theme.activeClass
                                : 'text-gray-400 hover:text-white hover:bg-white/5 border-transparent'
                                }
                            `}
                        >
                            <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-inherit' : theme.iconColor}`} />
                            {theme.label.split(' ')[0]} 
                        </button>
                    )
                })}
            </div>
             <p className="text-[10px] text-gray-500 mt-2 leading-tight">
                Mode: {config.theme === 'Cerah' ? 'Terang & Bersih' : config.theme === 'Gelap' ? 'Moody & Dramatis' : 'Kombinasi Kreatif'}
            </p>
          </div>
      </div>
    </div>
  );
};
