import React, { useState, useEffect, useRef } from 'react';
import { VideoSpec } from '../types';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, Film, Check } from 'lucide-react';

interface VideoPlayerProps {
  video: VideoSpec;
  version: 'v1' | 'v2';
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, version }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(10);
  const [copied, setCopied] = useState<boolean>(false);

  // Switch video source when version changes, preserve play state
  const currentVideoSrc = version === 'v2' ? video.videoSrcV2 : video.videoSrcV1;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      if (isPlaying) {
        videoRef.current.play().catch(() => {
          // Autoplay policy fallback: mute and play
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play();
          }
        });
      }
    }
  }, [currentVideoSrc, version]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      if (videoRef.current.duration && !isNaN(videoRef.current.duration)) {
        setDuration(videoRef.current.duration);
      }
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const targetTime = ratio * (duration || 10);
    videoRef.current.currentTime = targetTime;
    setCurrentTime(targetTime);
  };

  const handleRestart = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    setCurrentTime(0);
    videoRef.current.play();
    setIsPlaying(true);
  };

  const currentSec = Math.floor(currentTime);
  const currentMillis = Math.floor((currentTime % 1) * 10);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(version === 'v2' ? video.promptV2 : video.promptV1);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#18191b] rounded-2xl border border-[#2d2f31] p-4 flex flex-col md:flex-row gap-5 shadow-xl relative overflow-hidden">
      {/* Background ambient glow */}
      <div 
        className={`absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-20 transition-all duration-700 ${
          version === 'v2' ? 'bg-amber-500' : 'bg-cyan-500'
        }`} 
      />

      {/* Real Video Player Container (9:16 Aspect Ratio) */}
      <div className="relative w-full md:w-[230px] h-[390px] bg-black rounded-xl overflow-hidden border border-white/10 shrink-0 shadow-2xl flex flex-col justify-between select-none group">
        
        {/* Real HTML5 Video Element */}
        <video
          ref={videoRef}
          src={currentVideoSrc}
          autoPlay
          playsInline
          loop
          muted={isMuted}
          preload="auto"
          poster={version === 'v2' 
            ? "https://images.unsplash.com/photo-1608248597359-598284534720?auto=format&fit=crop&w=600&h=1000&q=80"
            : "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&h=1000&q=80"
          }
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => handleRestart()}
          className={`w-full h-full object-cover absolute inset-0 transition-all duration-700 ${
            version === 'v2' ? 'brightness-105 saturate-125 sepia-[0.15]' : ''
          }`}
        />

        {/* Dynamic Dark Gradient Scrim for readable ad overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none" />

        {/* Video Overlay Top Badge */}
        <div className="relative z-10 p-3 flex items-center justify-between">
          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] text-gray-200 shadow-md">
            <Film className="w-3 h-3 text-red-400" />
            <span className="font-mono">Google Veo • 10s</span>
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/15 transition"
              title={isMuted ? "Activar audio" : "Silenciar"}
            >
              {isMuted ? <VolumeX className="w-3 h-3 text-gray-400" /> : <Volume2 className="w-3 h-3 text-emerald-400" />}
            </button>
            <span className="px-1.5 py-0.5 rounded bg-black/60 text-[9px] font-mono text-emerald-400 border border-emerald-500/30">
              60 FPS
            </span>
          </div>
        </div>

        {/* Center Play/Pause button on hover/pause */}
        <div 
          onClick={togglePlay}
          className={`absolute inset-0 z-10 flex items-center justify-center cursor-pointer transition-opacity ${
            isPlaying ? 'opacity-0 hover:opacity-100 bg-black/20' : 'opacity-100 bg-black/40 backdrop-blur-[2px]'
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-2xl transition transform hover:scale-110">
            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
          </div>
        </div>

        {/* Dynamic Promotional Badge for Step 2 */}
        {version === 'v2' && (
          <div className="relative z-10 mx-auto text-center pointer-events-none animate-in zoom-in-90 duration-300">
            <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-black font-extrabold text-[11px] shadow-2xl border border-yellow-300 animate-pulse">
              <span>🔥 20% OFF PRIMERA COMPRA</span>
            </div>
            <p className="text-[10px] text-white font-mono mt-1 drop-shadow-md">
              Código: <strong className="text-amber-300">GLOW20</strong>
            </p>
          </div>
        )}

        {/* Video Overlay Bottom Caption & Controls */}
        <div className="relative z-10 p-3 space-y-2">
          {/* Subtitle overlay */}
          <div className="text-center">
            <span className="inline-block px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-[10px] text-white font-medium border border-white/15 shadow-lg">
              {currentTime < 3.5 
                ? (version === 'v2' ? 'Ingredientes Puros en Hora Dorada 🌿' : 'Extracto Botánico Bio-Activo 🍃')
                : currentTime < 7
                ? (version === 'v2' ? 'Piel Luminosa • Reseñas 5 Estrellas ✨' : 'Luminosidad y Regeneración Celular')
                : (version === 'v2' ? '¡Desliza ahora y ahorra un 20%!' : 'Descubre la Fórmula Definitiva')}
            </span>
          </div>

          {/* Interactive Scrubber */}
          <div 
            onClick={handleSeek}
            className="w-full h-2 bg-white/20 hover:h-2.5 rounded-full cursor-pointer relative overflow-hidden transition-all"
            title="Haz clic para avanzar o retroceder"
          >
            <div 
              className={`h-full transition-all rounded-full ${
                version === 'v2' ? 'bg-amber-400' : 'bg-blue-400'
              }`}
              style={{ width: `${((currentTime / (duration || 10)) * 100).toFixed(1)}%` }}
            />
          </div>

          {/* Time & Play toggle */}
          <div className="flex items-center justify-between text-[10px] font-mono text-gray-300">
            <div className="flex items-center space-x-1.5">
              <button 
                onClick={togglePlay}
                className="hover:text-white transition"
              >
                {isPlaying ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
              </button>
              <button 
                onClick={handleRestart}
                className="hover:text-white transition"
              >
                <RotateCcw className="w-2.5 h-2.5" />
              </button>
              <span className="font-semibold text-white">00:0{currentSec}:{currentMillis}</span>
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
              <span className="text-xs text-gray-400 font-mono">1080x1920 (9:16) • Video Ad Vertical</span>
            </div>

            <div className="flex items-center space-x-1.5">
              <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-md ${
                version === 'v2' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
              }`}>
                {version === 'v2' ? 'Versión v2: Feedback de Cliente' : 'Versión v1: Original'}
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
              currentTime < 3.5 
                ? 'bg-blue-500/20 border-blue-500 text-blue-200 shadow-md shadow-blue-500/10' 
                : 'bg-white/5 border-white/5 text-gray-400'
            }`}>
              <div className="text-[10px] font-mono font-bold text-gray-300">00:00 - 00:03</div>
              <div className="text-[11px] truncate font-medium">Escena 1: Macro Gota</div>
            </div>

            <div className={`p-2 rounded-lg border text-left transition ${
              currentTime >= 3.5 && currentTime < 7
                ? 'bg-purple-500/20 border-purple-500 text-purple-200 shadow-md shadow-purple-500/10' 
                : 'bg-white/5 border-white/5 text-gray-400'
            }`}>
              <div className="text-[10px] font-mono font-bold text-gray-300">00:03 - 00:07</div>
              <div className="text-[11px] truncate font-medium">{version === 'v2' ? 'Escena 2: Golden Hour' : 'Escena 2: Modelo & Piel'}</div>
            </div>

            <div className={`p-2 rounded-lg border text-left transition ${
              currentTime >= 7
                ? 'bg-amber-500/20 border-amber-500 text-amber-200 shadow-md shadow-amber-500/10' 
                : 'bg-white/5 border-white/5 text-gray-400'
            }`}>
              <div className="text-[10px] font-mono font-bold text-gray-300">00:07 - 00:10</div>
              <div className="text-[11px] truncate font-medium">{version === 'v2' ? 'Escena 3: Packshot -20%' : 'Escena 3: CTA Final'}</div>
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
            <span className="text-emerald-400">MP4 1080p H.264</span>
            <span>•</span>
            <span>{version === 'v2' ? '5.1 MB' : '1.1 MB'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
