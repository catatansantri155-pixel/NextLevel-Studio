
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { FileUploader } from './components/FileUploader';
import { GeneratedImage } from './components/GeneratedImage';
import { CategorySelector, CategoryId, CATEGORIES } from './components/CategorySelector';
import { OutputSettings } from './components/OutputSettings';
import { OutputConfig } from './types';
import { generateEditedImage, enhancePrompt, generateCreativeConcept } from './services/geminiService';
import { PromptLibrary } from './components/PromptLibrary'; // Import new component
import { Loader2, Sparkles, AlertCircle, Wand2, Eraser, Layers, Settings2 } from 'lucide-react';

export default function App() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('general');
  const [prompt, setPrompt] = useState('');
  const [outputConfig, setOutputConfig] = useState<OutputConfig>({ aspectRatio: '1:1', count: 1 });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  
  // State for results (multiple images)
  const [generatedImageUrls, setGeneratedImageUrls] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const [error, setError] = useState<string | null>(null);

  const handleFilesSelected = useCallback((files: File[]) => {
    setSelectedFiles(prev => [...prev, ...files]);
    setError(null);
  }, []);

  const handleRemoveFile = useCallback((index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handlePresetSelect = (preset: string, category: any) => {
    const suggestion = `Ubah gaya gambar ini menjadi ${category.label} dengan tema "${preset}". ${category.aiHint} Pastikan hasil terlihat profesional dan realistis.`;
    setPrompt(suggestion);
  };

  const handleClearResult = () => {
    setGeneratedImageUrls([]);
    setCurrentImageIndex(0);
  };

  const handleGenerateConcept = async (categoryId: CategoryId) => {
    setIsOptimizing(true);
    setError(null);
    
    const categoryDetails = CATEGORIES.find(c => c.id === categoryId);
    if (!categoryDetails) return;

    try {
        const concept = await generateCreativeConcept(categoryDetails.label, selectedFiles);
        setPrompt(concept);
    } catch (err: any) {
        console.error("Concept generation error:", err);
        setError("Gagal membuat konsep kreatif. Silakan coba lagi.");
    } finally {
        setIsOptimizing(false);
    }
  };

  const handleEnhancePrompt = async () => {
    if (selectedFiles.length === 0 && !prompt.trim()) {
      setError("Silakan unggah gambar atau masukkan ide kasar terlebih dahulu untuk menggunakan peningkatan AI.");
      return;
    }

    setIsOptimizing(true);
    setError(null);
    
    const categoryDetails = CATEGORIES.find(c => c.id === selectedCategory);
    const categoryContext = categoryDetails ? `Kategori: ${categoryDetails.label}. Saran Gaya: ${categoryDetails.aiHint}` : '';
    
    try {
        const enhanced = await enhancePrompt(prompt, selectedFiles, categoryContext);
        setPrompt(enhanced);
    } catch (err: any) {
        console.error("Prompt enhancement error:", err);
        setError("Gagal meningkatkan prompt. Silakan coba lagi.");
    } finally {
        setIsOptimizing(false);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Masukkan deskripsi tentang bagaimana Anda ingin mengedit atau menggabungkan gambar.");
      return;
    }
    
    if (selectedFiles.length === 0) {
      setError("Harap unggah setidaknya satu gambar untuk diedit.");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedImageUrls([]);
    setCurrentImageIndex(0);

    try {
      const urls = await generateEditedImage(prompt, selectedFiles, outputConfig.aspectRatio, outputConfig.count);
      if (urls && urls.length > 0) {
        setGeneratedImageUrls(urls);
      } else {
        setError("Model menghasilkan respons teks alih-alih gambar. Silakan coba sempurnakan prompt Anda.");
      }
    } catch (err: any) {
      console.error("Generation error:", err);
      setError(err.message || "Terjadi kesalahan tak terduga saat pembuatan.");
    } finally {
      setIsGenerating(false);
    }
  };

  const activeCategory = CATEGORIES.find(c => c.id === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-white relative overflow-x-hidden">
       {/* Ambient Background Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/10 blur-[120px]"></div>
      </div>

      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
          
          {/* Left Column: Inputs (Takes up 7 columns on large screens) */}
          <div className="lg:col-span-7 space-y-6 flex flex-col">
            
            {/* Card 1: Upload */}
            <div className="bg-[#0f0f16]/80 p-6 rounded-2xl shadow-2xl border border-white/5 backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-3 text-white">
                <span className="relative flex items-center justify-center w-8 h-8">
                    <span className="absolute w-full h-full bg-cyan-500/20 rounded-full blur-[2px]"></span>
                    <span className="relative bg-[#0f0f16] border border-cyan-500/50 text-cyan-400 w-full h-full rounded-full flex items-center justify-center text-sm shadow-[0_0_10px_rgba(6,182,212,0.3)]">1</span>
                </span>
                Upload Gambar Referensi
              </h2>
              <FileUploader 
                onFilesSelected={handleFilesSelected} 
                selectedFiles={selectedFiles} 
                onRemoveFile={handleRemoveFile}
              />
            </div>

            {/* Card 2: Category */}
            <div className="bg-[#0f0f16]/80 p-6 rounded-2xl shadow-2xl border border-white/5 backdrop-blur-sm relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
               
               <h2 className="text-lg font-semibold mb-4 flex items-center gap-3 text-white">
                <span className="relative flex items-center justify-center w-8 h-8">
                    <span className="absolute w-full h-full bg-indigo-500/20 rounded-full blur-[2px]"></span>
                    <span className="relative bg-[#0f0f16] border border-indigo-500/50 text-indigo-400 w-full h-full rounded-full flex items-center justify-center text-sm shadow-[0_0_10px_rgba(99,102,241,0.3)]">2</span>
                </span>
                Pilih Kategori Gaya
              </h2>
              <CategorySelector 
                selectedCategory={selectedCategory} 
                onSelect={(id) => setSelectedCategory(id)}
                onPresetSelect={handlePresetSelect}
                onGenerateConcept={handleGenerateConcept}
                isGeneratingConcept={isOptimizing}
              />
            </div>

            {/* Card 3: Configuration */}
             <div className="bg-[#0f0f16]/80 p-6 rounded-2xl shadow-2xl border border-white/5 backdrop-blur-sm relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
               
               <h2 className="text-lg font-semibold mb-4 flex items-center gap-3 text-white">
                <span className="relative flex items-center justify-center w-8 h-8">
                    <span className="absolute w-full h-full bg-pink-500/20 rounded-full blur-[2px]"></span>
                    <span className="relative bg-[#0f0f16] border border-pink-500/50 text-pink-400 w-full h-full rounded-full flex items-center justify-center text-sm shadow-[0_0_10px_rgba(236,72,153,0.3)]">3</span>
                </span>
                Konfigurasi Output
              </h2>
              <OutputSettings 
                config={outputConfig} 
                onChange={setOutputConfig} 
              />
            </div>

            {/* Card 4: Prompt */}
            <div className="bg-[#0f0f16]/80 p-6 rounded-2xl shadow-2xl border border-white/5 backdrop-blur-sm flex-grow flex flex-col relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

              <h2 className="text-lg font-semibold mb-4 flex items-center gap-3 text-white">
                 <span className="relative flex items-center justify-center w-8 h-8">
                    <span className="absolute w-full h-full bg-purple-500/20 rounded-full blur-[2px]"></span>
                    <span className="relative bg-[#0f0f16] border border-purple-500/50 text-purple-400 w-full h-full rounded-full flex items-center justify-center text-sm shadow-[0_0_10px_rgba(168,85,247,0.3)]">4</span>
                </span>
                Deskripsi Edit
              </h2>
              <div className="relative group/input flex-grow">
                  <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-focus-within/input:opacity-100 transition duration-500"></div>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={`Jelaskan detail yang Anda inginkan... \nContoh untuk ${activeCategory?.label}: "${activeCategory?.aiHint}"`}
                    className="relative w-full p-4 pb-12 pr-12 bg-[#05050a] border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all resize-none h-full min-h-[140px] text-gray-200 leading-relaxed placeholder-gray-600 shadow-inner text-sm"
                  />
                  
                  {prompt && (
                    <button
                      onClick={() => setPrompt('')}
                      className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-all border border-transparent hover:border-red-500/30 z-20 backdrop-blur-md shadow-lg"
                      title="Hapus Prompt"
                    >
                      <Eraser className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    onClick={handleEnhancePrompt}
                    disabled={isOptimizing || (selectedFiles.length === 0 && !prompt.trim())}
                    className={`absolute bottom-3 right-3 flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all backdrop-blur-sm border z-20
                        ${isOptimizing 
                           ? 'bg-white/5 border-white/10 text-gray-400 cursor-not-allowed' 
                           : 'bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-cyan-500/30 text-cyan-300 hover:text-white hover:border-cyan-500/60 hover:from-cyan-500/20 hover:to-purple-500/20 shadow-[0_0_10px_rgba(6,182,212,0.1)] hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                        }
                    `}
                    title="Gunakan AI untuk membuat prompt profesional berdasarkan gambar dan ide Anda"
                  >
                    {isOptimizing ? (
                        <>
                            <Loader2 className="w-3 h-3 animate-spin" />
                            Meningkatkan...
                        </>
                    ) : (
                        <>
                            <Wand2 className="w-3 h-3" />
                            AI Enhance
                        </>
                    )}
                  </button>
              </div>
              <div className="mt-6 flex justify-end">
                 <button
                  onClick={handleGenerate}
                  disabled={isGenerating || selectedFiles.length === 0 || !prompt.trim()}
                  className={`
                    relative overflow-hidden flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all duration-300 group/btn backdrop-blur-sm border w-full sm:w-auto justify-center
                    ${isGenerating || selectedFiles.length === 0 || !prompt.trim()
                      ? 'bg-white/5 border-white/10 text-gray-500 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border-cyan-500/30 text-cyan-300 hover:text-white hover:border-cyan-500/60 hover:from-cyan-500/20 hover:via-blue-500/20 hover:to-purple-500/20 shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] transform hover:-translate-y-0.5'
                    }
                  `}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sedang Proses...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 group-hover/btn:animate-pulse" />
                      Generate Image
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Result (Takes up 5 columns) */}
          <div className="lg:col-span-5 bg-[#0f0f16]/80 rounded-3xl border border-white/10 flex flex-col items-center justify-center min-h-[500px] lg:h-auto p-4 relative overflow-hidden shadow-2xl backdrop-blur-md lg:sticky lg:top-24">
            {/* Grid Pattern Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)] pointer-events-none"></div>

            {error && (
              <div className="absolute top-4 left-4 right-4 bg-red-500/10 border border-red-500/20 text-red-200 px-4 py-3 rounded-lg flex items-start gap-3 z-20 animate-fade-in backdrop-blur-md">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.4)]" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            {generatedImageUrls.length > 0 ? (
              <div className="w-full h-full flex flex-col">
                {/* Main Viewer */}
                <div className="flex-grow relative">
                    <GeneratedImage 
                        imageUrl={generatedImageUrls[currentImageIndex]} 
                        onClear={handleClearResult} 
                    />
                </div>
                
                {/* Thumbnail Strip (Only if > 1 image) */}
                {generatedImageUrls.length > 1 && (
                    <div className="mt-4 flex gap-2 overflow-x-auto pb-2 custom-scrollbar z-20 px-2">
                        {generatedImageUrls.map((url, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentImageIndex(idx)}
                                className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0
                                    ${currentImageIndex === idx 
                                        ? 'border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)] scale-105' 
                                        : 'border-white/10 opacity-60 hover:opacity-100'
                                    }
                                `}
                            >
                                <img src={url} alt={`Variation ${idx + 1}`} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                )}
              </div>
            ) : (
              <div className="text-center text-gray-500 flex flex-col items-center gap-6 z-10">
                {isGenerating ? (
                   <div className="flex flex-col items-center gap-4">
                     <div className="relative w-20 h-20">
                        <div className="absolute inset-0 rounded-full border-4 border-white/5"></div>
                        <div className="absolute inset-0 rounded-full border-4 border-t-cyan-500 border-r-transparent border-b-purple-500 border-l-transparent animate-spin shadow-[0_0_20px_rgba(6,182,212,0.5)]"></div>
                     </div>
                     <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-medium animate-pulse tracking-wider">
                        MEMPROSES...
                        <br/>
                        <span className="text-xs text-gray-500 font-normal mt-1">Sedang membuat {outputConfig.count} variasi...</span>
                     </p>
                   </div>
                ) : (
                  <>
                    <div className="w-24 h-24 bg-[#05050a] rounded-full flex items-center justify-center border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] relative group">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <Layers className="w-10 h-10 text-gray-600 group-hover:text-cyan-400 transition-colors duration-300" />
                    </div>
                    <div>
                        <p className="text-gray-400 font-medium">Hasil karya Anda akan muncul di sini</p>
                        <p className="text-gray-600 text-sm mt-2">Menunggu input...</p>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

        </div>
      </main>

      {/* Floating Prompt Library */}
      <PromptLibrary onSelectPrompt={setPrompt} />
      
      {/* Footer */}
      <footer className="py-6 text-center relative z-10 border-t border-white/5 bg-[#0a0a0f]/40 backdrop-blur-sm mt-auto">
        <p className="text-sm text-gray-500 font-medium">
          Created by <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-bold">Nextlevel Academy</span>
        </p>
      </footer>
    </div>
  );
}
