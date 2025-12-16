import React, { useRef } from 'react';
import { Upload, X, Image as ImageIcon, Plus } from 'lucide-react';

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
  selectedFiles: File[];
  onRemoveFile: (index: number) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onFilesSelected, selectedFiles, onRemoveFile }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newFiles = Array.from(event.target.files);
      onFilesSelected(newFiles);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const newFiles = Array.from(event.dataTransfer.files).filter((file: File) => file.type.startsWith('image/'));
      onFilesSelected(newFiles);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        multiple
        accept="image/*"
      />
      
      {selectedFiles.length === 0 ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="relative group border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all h-64 overflow-hidden hover:border-cyan-500/50"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500" />
          
          <div className="w-16 h-16 bg-[#0f0f16] border border-white/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] relative z-10">
            <Upload className="w-8 h-8 text-gray-400 group-hover:text-cyan-400 transition-colors" />
          </div>
          <p className="text-gray-300 font-medium relative z-10 group-hover:text-white transition-colors">Click or drag images here</p>
          <p className="text-gray-600 text-sm mt-2 relative z-10 group-hover:text-gray-400 transition-colors">Supports JPG, PNG, WebP</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {selectedFiles.map((file, index) => (
            <div key={`${file.name}-${index}`} className="relative group aspect-square rounded-xl overflow-hidden border border-white/10 shadow-lg">
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview ${index}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveFile(index);
                  }}
                  className="bg-red-500/80 text-white p-2 rounded-full hover:bg-red-600 transition-all transform hover:scale-110 shadow-[0_0_10px_rgba(239,68,68,0.6)]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="aspect-square rounded-xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-gray-500 hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-white/5 transition-all group"
          >
            <Plus className="w-8 h-8 mb-2 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            <span className="text-sm font-medium">Add more</span>
          </button>
        </div>
      )}
    </div>
  );
};