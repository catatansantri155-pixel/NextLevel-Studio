import React, { useState, useEffect, useRef } from 'react';
import { Download, Maximize2, Minimize2, Sparkles, ZoomIn, ZoomOut, RotateCcw, Trash2 } from 'lucide-react';

interface GeneratedImageProps {
  imageUrl: string;
  onClear?: () => void;
}

export const GeneratedImage: React.FC<GeneratedImageProps> = ({ imageUrl, onClear }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset zoom/pan when image changes
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [imageUrl]);

  // Listen for fullscreen changes (e.g. user pressing Esc)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error("Error toggling fullscreen:", err);
    }
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.5, 8));
  };

  const handleZoomOut = () => {
    setScale(prev => {
      const newScale = Math.max(prev - 0.5, 1);
      if (newScale === 1) setPosition({ x: 0, y: 0 });
      return newScale;
    });
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleWheel = (e: React.WheelEvent) => {
    // Simple mouse wheel zoom logic
    e.stopPropagation();
    
    const delta = -e.deltaY;
    const zoomFactor = 0.002; 
    
    setScale(prev => {
      const newScale = Math.min(Math.max(1, prev + delta * zoomFactor), 8); // Max 8x zoom
      if (newScale === 1) setPosition({ x: 0, y: 0 });
      return newScale;
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
      e.preventDefault(); // Prevent default drag behavior
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      e.preventDefault();
      setPosition({
        x: e.clientX - startPos.x,
        y: e.clientY - startPos.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center animate-fade-in relative z-10">
      <div 
        ref={containerRef}
        className={`relative w-full overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] group border border-white/10 bg-[#050505] transition-all duration-300 
            ${isFullscreen ? 'h-screen rounded-none' : 'h-[500px] lg:h-[600px] rounded-xl'}`}
      >
        
        {/* Image Container with Event Handlers */}
        <div 
            className="w-full h-full flex items-center justify-center overflow-hidden touch-none"
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ 
                cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
                overscrollBehavior: 'contain'
            }}
        >
            <img
              src={imageUrl}
              alt="Generated Result"
              draggable={false}
              className="max-w-full max-h-full object-contain transition-transform duration-100 ease-out origin-center select-none"
              style={{ 
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`
              }}
            />
        </div>
        
        {/* Controls Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-md p-3 opacity-0 group-hover:opacity-100 transition-opacity flex justify-between items-center border-t border-white/10 z-20">
          
          {/* Zoom & Reset Controls */}
          <div className="flex items-center gap-2">
             <button 
                onClick={handleZoomOut}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors disabled:opacity-50 border border-transparent hover:border-white/10"
                disabled={scale <= 1}
                title="Zoom Out"
             >
                <ZoomOut className="w-4 h-4" />
             </button>
             <span className="text-xs font-mono text-white/60 w-12 text-center tabular-nums">
                {Math.round(scale * 100)}%
             </span>
             <button 
                onClick={handleZoomIn}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors disabled:opacity-50 border border-transparent hover:border-white/10"
                disabled={scale >= 8}
                 title="Zoom In"
             >
                <ZoomIn className="w-4 h-4" />
             </button>
             <div className="w-px h-6 bg-white/10 mx-1"></div>
             <button 
                onClick={handleReset}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors border border-transparent hover:border-white/10"
                title="Reset View"
             >
                <RotateCcw className="w-4 h-4" />
             </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            {onClear && (
                <button 
                    onClick={onClear}
                    className="bg-red-500/10 hover:bg-red-500/30 text-red-400 hover:text-red-300 p-2 rounded-lg transition-all border border-red-500/20 hover:border-red-500/50"
                    title="Hapus Hasil & Mulai Ulang"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            )}
            <a 
              href={imageUrl} 
              download="generated-image.png"
              className="bg-white/10 hover:bg-cyan-500/20 text-white hover:text-cyan-400 p-2 rounded-lg transition-all border border-white/10 hover:border-cyan-500/50 hover:shadow-[0_0_10px_rgba(6,182,212,0.3)]"
              title="Download Image"
            >
              <Download className="w-5 h-5" />
            </a>
            <button 
              onClick={toggleFullscreen}
              className="bg-white/10 hover:bg-purple-500/20 text-white hover:text-purple-400 p-2 rounded-lg transition-all border border-white/10 hover:border-purple-500/50 hover:shadow-[0_0_10px_rgba(168,85,247,0.3)]"
               title={isFullscreen ? "Exit Fullscreen" : "View Fullscreen"}
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
      {!isFullscreen && (
        <p className="mt-4 text-gray-400 text-xs font-medium tracking-widest uppercase flex items-center gap-2 opacity-70">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            Generated with Gemini 2.5 Flash Image
        </p>
      )}
    </div>
  );
};