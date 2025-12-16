
import React from 'react';
import { Square, Smartphone, Monitor, LayoutTemplate, Copy, RectangleHorizontal, RectangleVertical, Info } from 'lucide-react';
import { AspectRatio, OutputConfig } from '../types';

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

  return (
    <div className="space-y-8">
      {/* Aspect Ratio Section */}
      <div>
        <label className="text-sm font-medium text-gray-300 block flex items-center gap-2">
            <LayoutTemplate className="w-4 h-4 text-cyan-400" />
            Ukuran & Rasio (Marketplace/Sosmed)
        </label>
        
        {/* Added mt-5 to push it down slightly as requested */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mt-5">
          {ratios.map((ratio) => {
            const Icon = ratio.icon;
            const isSelected = config.aspectRatio === ratio.value;
            
            return (
              <button
                key={ratio.value}
                onClick={() => onChange({ ...config, aspectRatio: ratio.value })}
                className={`relative group flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300
                  ${isSelected 
                    ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]' 
                    : 'bg-[#05050a] border-white/10 text-gray-400 hover:bg-white/5 hover:border-white/20 hover:text-gray-200'
                  }
                `}
              >
                {/* Info Icon in Top Right Corner */}
                <div className="absolute top-2 right-2 opacity-50 group-hover:opacity-100 transition-opacity">
                    <Info className={`w-3 h-3 ${isSelected ? 'text-cyan-400' : 'text-gray-600 group-hover:text-gray-400'}`} />
                </div>

                {/* Tooltip Description */}
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max max-w-[120px] bg-[#0f0f16] border border-white/10 text-[10px] text-gray-200 px-2 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pointer-events-none z-20 shadow-xl backdrop-blur-md">
                    {ratio.desc}
                    <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0f0f16] border-b border-r border-white/10 rotate-45"></div>
                </div>

                <Icon className={`w-6 h-6 mb-2 ${isSelected ? 'text-cyan-400' : 'text-gray-500 group-hover:text-gray-300'}`} />
                <span className="text-xs font-semibold tracking-wide">{ratio.label}</span>
                <span className="text-[10px] opacity-50 mt-0.5 font-mono">{ratio.value}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Image Count Section */}
      <div className="pt-2 border-t border-white/5">
        <label className="text-sm font-medium text-gray-300 mb-4 block flex items-center gap-2 mt-4">
            <Copy className="w-4 h-4 text-purple-400" />
            Jumlah Variasi Gambar
        </label>
        <div className="flex items-center gap-4">
            <div className="flex bg-[#05050a] p-1.5 rounded-xl border border-white/10 w-fit">
            {[1, 2, 3, 4].map((num) => (
                <button
                key={num}
                onClick={() => onChange({ ...config, count: num })}
                className={`w-10 h-9 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center relative
                    ${config.count === num
                    ? 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }
                `}
                >
                {num}
                {config.count === num && (
                    <span className="absolute inset-0 rounded-lg ring-1 ring-white/20"></span>
                )}
                </button>
            ))}
            </div>
            <p className="text-[10px] text-gray-500 max-w-[200px] leading-tight">
            *Semakin banyak variasi, waktu proses akan sedikit lebih lama.
            </p>
        </div>
      </div>
    </div>
  );
};
