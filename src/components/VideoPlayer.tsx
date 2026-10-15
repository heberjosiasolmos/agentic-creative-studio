import React, { useState, useEffect, useRef } from 'react';
import { VideoSpec } from '../types';
import { Play, Pause, RotateCcw, Volume2, Sparkles, Film, Download, Check } from 'lucide-react';

interface VideoPlayerProps {
  video: VideoSpec;
  version: 'v1' | 'v2';
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, version }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0); // 0 to 10 seconds
  const [copied, setCopied] = useState<boolean>(false);
  const animRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());

  useEffect(() => {
    const updateProgress = (now: number) => {
      if (isPlaying) {
        const delta = (now - lastTimeRef.current) / 1000;
        setProgress((prev) => {
          const next = prev + delta;
          if (next >= 10) {
            return 0; // loop seamlessly
          }
          return next;
        });
      }
      lastTimeRef.current = now;
      animRef.current = requestAnimationFrame(updateProgress);
    };

    animRef.current = requestAnimationFrame(updateProgress);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying]);

  const currentSec = Math.floor(progress);
  const currentMillis = Math.floor((progress % 1) * 10);

  // Scene determination
  let currentScene = "Escena 1: Macro Gota & Textura Botánica";
  if (progress >= 3 && progress < 7) {
    currentScene = version === 'v2' 
      ? "Escena 2: Modelo Golden Hour (Sonrisa a Cámara)"
      : "Escena 2: Piel Luminosa & Aprobación Clínica";
  } else if (progress >= 7) {
    currentScene = version === 'v2'
      ? "Escena 3: Hero Packshot + Cupón '-20% OFF' Dinámico"
      : "Escena 3: Presentación Botella & Call to Action";
  }

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(version === 'v2' ? video.promptV2 : video.promptV1);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#18191b] rounded-2xl border border-[#2d2f31] p-4 flex flex-col md:flex-row gap-5 shadow-xl relative overflow-hidden">
      {/* Glow background accent */}
      <div 
        className={`absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-20 transition-all duration-700 ${
          version === 'v2' ? 'bg-amber-500' : 'bg-cyan-500'
        }`} 
      />

      {/* Video Screen Area (9:16 aspect ratio box) */}
      <div className="relative w-full md:w-[220px] h-[380px] bg-black rounded-xl overflow-hidden border border-white/10 shrink-0 shadow-2xl flex flex-col justify-between p-3 select-none">
        {/* Animated Background Simulation */}
        <div 
          className={`absolute inset-0 transition-colors duration-1000 ${
            version === 'v2'
              ? 'bg-gradient-to-b from-amber-950/70 via-stone-900 to-amber-950/90'
              : 'bg-gradient-to-b from-slate-950 via-teal-950/70 to-slate-900'
          }`}
        />

        {/* Dynamic Canvas Motion Art */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
          {/* Animated floating spheres / droplets */}
          <div 
            className={`w-32 h-32 rounded-full blur-xl opacity-40 animate-pulse transition-all duration-700 ${
              version === 'v2' ? 'bg-amber-400' : 'bg-emerald-400'
            }`}
            style={{
              transform: `scale(${1 + Math.sin(progress) * 0.2}) rotate(${progress * 25}deg)`
            }}
          />

          {/* Central Animated Scene Mockup */}
          {progress < 3 ? (
            <div className="relative text-center z-10 transition-all transform animate-in fade-in duration-300">
              <div className="w-16 h-16 mx-auto rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 mb-2 shadow-inner">
                <span className="text-2xl animate-bounce">💧</span>
              </div>
              <p className="text-[11px] font-mono text-white/80 uppercase tracking-widest">
                {version === 'v2' ? 'Golden Elixir 100%' : 'Pure Botanical Drops'}
              </p>
            </div>
          ) : progress < 7 ? (
            <div className="relative text-center z-10 transition-all transform animate-in fade-in duration-300">
              <div className={`w-20 h-20 mx-auto rounded-full border-2 p-1 flex items-center justify-center mb-2 shadow-2xl ${
                version === 'v2' ? 'border-amber-400/80 bg-amber-500/20' : 'border-teal-400/80 bg-teal-500/20'
              }`}>
                <span className="text-3xl">✨</span>
              </div>
              <p className="text-[11px] font-semibold text-white tracking-wide">
                {version === 'v2' ? 'Mirada Radiante Directa' : 'Efecto Cristal 72h'}
              </p>
            </div>
          ) : (
            <div className="relative text-center z-10 transition-all transform animate-in fade-in duration-300">
              <div className="w-16 h-24 mx-auto rounded-xl bg-gradient-to-b from-white/30 to-white/5 border border-white/30 flex items-center justify-center mb-2 shadow-2xl backdrop-blur-md">
                <span className="text-2xl">🧴</span>
              </div>
              {version === 'v2' ? (
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-black font-extrabold text-[10px] shadow-lg animate-pulse">
                  -20% CÓDIGO GLOW20
                </div>
              ) : (
                <div className="inline-block px-2 py-0.5 rounded-full bg-emerald-500/80 text-white font-medium text-[9px]">
                  LUMIÈRE BOTANICS
                </div>
              )}
            </div>
          )}
        </div>

        {/* Video Overlay Top Badge */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] text-gray-200">
            <Film className="w-3 h-3 text-red-400" />
            <span className="font-mono">Google Veo • 10s</span>
          </div>

          <div className="px-1.5 py-0.5 rounded bg-black/50 text-[9px] font-mono text-emerald-400 border border-emerald-500/20">
            60 FPS
          </div>
        </div>

        {/* Video Overlay Center / Floating Captions */}
        <div className="relative z-10 text-center px-1">
          <span className="inline-block px-2 py-1 rounded-md bg-black/70 backdrop-blur-sm text-[10px] text-white font-medium border border-white/10 shadow-md">
            {progress < 3 
              ? (version === 'v2' ? 'Ingredientes Nórdicos 🌿' : 'Extracto Puro de Té Verde 🍃')
              : progress < 7
              ? (version === 'v2' ? 'Aprobado por Dermatólogos ✨' : 'Luminosidad Clínica Comprobada')
              : (version === 'v2' ? '¡Desliza y ahorra 20% hoy!' : 'Descubre el Poder de la Naturaleza')}
          </span>
        </div>

        {/* Video Overlay Bottom Controls */}
        <div className="relative z-10 space-y-1.5">
          {/* Progress Scrubber */}
          <div 
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const ratio = Math.max(0, Math.min(1, clickX / rect.width));
              setProgress(ratio * 10);
            }}
            className="w-full h-1.5 bg-white/20 rounded-full cursor-pointer relative overflow-hidden"
          >
            <div 
              className={`h-full transition-all rounded-full ${
                version === 'v2' ? 'bg-amber-400' : 'bg-blue-400'
              }`}
              style={{ width: `${(progress / 10) * 100}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-gray-300">
            <div className="flex items-center space-x-1">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="hover:text-white transition"
              >
                {isPlaying ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
              </button>
              <button 
                onClick={() => setProgress(0)}
                className="hover:text-white transition"
              >
                <RotateCcw className="w-2.5 h-2.5" />
              </button>
              <span>00:0{currentSec}:{currentMillis}</span>
            </div>
            <span className="text-gray-400">/ 00:10</span>
          </div>
        </div>
      </div>

      {/* Video Details & AI Generation Metadata */}
      <div className="flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-semibold flex items-center space-x-1">
                <Film className="w-3 h-3" />
                <span>Google Veo VideoFX</span>
              </span>
              <span className="text-xs text-gray-400 font-mono">1080x1920 (9:16) • Vertical Video Ad</span>
            </div>

            <div className="flex items-center space-x-1.5">
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                version === 'v2' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
              }`}>
                {version === 'v2' ? 'Versión v2: Feedback Aplicado' : 'Versión v1: Original'}
              </span>
            </div>
          </div>

          <h3 className="font-google font-bold text-base text-white">
            {version === 'v2' ? video.titleV2 : video.titleV1}
          </h3>

          <div className="mt-2 p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span className="flex items-center space-x-1 text-gray-300">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span className="font-medium">Prompt de Síntesis Veo:</span>
              </span>
              <button
                onClick={handleCopyPrompt}
                className="text-[11px] text-gray-400 hover:text-white flex items-center space-x-1 transition"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : null}
                <span>{copied ? 'Copiado' : 'Copiar Prompt'}</span>
              </button>
            </div>
            <p className="text-xs text-gray-300 italic leading-relaxed">
              "{version === 'v2' ? video.promptV2 : video.promptV1}"
            </p>
          </div>

          {/* Timeline scene breakdown */}
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className={`p-2 rounded-lg border text-left transition ${
              progress < 3 
                ? 'bg-blue-500/10 border-blue-500/40 text-blue-200' 
                : 'bg-white/5 border-white/5 text-gray-400'
            }`}>
              <div className="text-[10px] font-mono font-bold text-gray-300">00:00 - 00:03</div>
              <div className="text-[11px] truncate font-medium">Macro Textura</div>
            </div>

            <div className={`p-2 rounded-lg border text-left transition ${
              progress >= 3 && progress < 7
                ? 'bg-purple-500/10 border-purple-500/40 text-purple-200' 
                : 'bg-white/5 border-white/5 text-gray-400'
            }`}>
              <div className="text-[10px] font-mono font-bold text-gray-300">00:03 - 00:07</div>
              <div className="text-[11px] truncate font-medium">{version === 'v2' ? 'Modelo Golden' : 'Luminosidad'}</div>
            </div>

            <div className={`p-2 rounded-lg border text-left transition ${
              progress >= 7
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-200' 
                : 'bg-white/5 border-white/5 text-gray-400'
            }`}>
              <div className="text-[10px] font-mono font-bold text-gray-300">00:07 - 00:10</div>
              <div className="text-[11px] truncate font-medium">{version === 'v2' ? 'Packshot -20%' : 'CTA Final'}</div>
            </div>
          </div>
        </div>

        {/* Audio Track & Footer Specs */}
        <div className="pt-2 border-t border-white/5 flex flex-wrap items-center justify-between text-xs text-gray-400 gap-2">
          <div className="flex items-center space-x-2">
            <Volume2 className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-[11px] text-gray-300 truncate max-w-[280px]">
              Audio: {video.audioTrack}
            </span>
          </div>

          <div className="flex items-center space-x-2 font-mono text-[11px]">
            <span className="text-emerald-400">MP4 4K H.265</span>
            <span>•</span>
            <span>14.2 MB</span>
          </div>
        </div>
      </div>
    </div>
  );
};
