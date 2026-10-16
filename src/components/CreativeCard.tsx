import React, { useState } from 'react';
import { CreativeFormat } from '../types';
import { Sparkles, Maximize2, Zap, Tag } from 'lucide-react';

interface CreativeCardProps {
  creative: CreativeFormat;
  version: 'v1' | 'v2';
  onInspect: (creative: CreativeFormat) => void;
  brandName?: string;
}

export const CreativeCard: React.FC<CreativeCardProps> = ({
  creative,
  version,
  onInspect,
  brandName = "Lumière Botanics"
}) => {
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);
  const headline = version === 'v2' ? creative.headlineV2 : creative.headlineV1;
  const subheadline = version === 'v2' ? creative.subheadlineV2 : creative.subheadlineV1;
  const cta = version === 'v2' ? creative.ctaV2 : creative.ctaV1;
  const badge = version === 'v2' ? creative.badgeV2 : creative.badgeV1;
  const currentImg = version === 'v2' ? creative.imageUrlV2 : creative.imageUrlV1;
  const accent = version === 'v2' ? creative.accentColorV2 : creative.accentColorV1;
  const modelUsed = version === 'v2' ? 'Nano Banana' : creative.model;

  // Aspect ratio height adjustments for layout
  const isWideBanner = creative.aspectRatio === '8:1';
  const isVertical = creative.aspectRatio === '9:16' || creative.aspectRatio === '1:2' || creative.aspectRatio === '2:3';

  return (
    <div 
      onClick={() => onInspect(creative)}
      className="group relative bg-[#1c1d1f] hover:bg-[#222427] border border-[#2d2f31] hover:border-gray-500 rounded-xl p-3 flex flex-col justify-between transition-all duration-300 shadow-lg hover:shadow-2xl cursor-pointer overflow-hidden"
    >
      {/* Top Bar info */}
      <div className="flex items-center justify-between text-xs mb-2">
        <div className="flex items-center space-x-1.5 truncate max-w-[170px]">
          <span className="font-semibold text-gray-200 truncate">
            {creative.name}
          </span>
        </div>
        <div className="flex items-center space-x-1 shrink-0">
          <span className="font-mono text-[10px] text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">
            {creative.aspectRatio}
          </span>
        </div>
      </div>

      {/* Real Visual Ad Canvas with Real Photograph */}
      <div 
        className={`relative w-full rounded-lg overflow-hidden border border-white/10 shadow-inner flex flex-col justify-between p-3.5 transition-all duration-500 bg-black ${
          isWideBanner ? 'h-[95px]' : isVertical ? 'h-[280px]' : 'h-[210px]'
        }`}
      >
        {/* Real High-Resolution Photograph */}
        <img
          src={currentImg}
          alt={headline}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 transform group-hover:scale-105 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          } ${version === 'v2' ? 'brightness-105 contrast-105 filter-amber' : ''}`}
        />

        {/* Fallback loader if image is loading */}
        {!imgLoaded && (
          <div className="absolute inset-0 bg-neutral-900 animate-pulse flex items-center justify-center">
            <span className="text-xs text-gray-500 font-mono">Renderizando Imagen 3...</span>
          </div>
        )}

        {/* Cinematic Gradient Scrim (Ensures text is crisp and readable like a real ad) */}
        <div 
          className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
            isWideBanner
              ? 'bg-gradient-to-r from-black/95 via-black/70 to-transparent'
              : 'bg-gradient-to-t from-black/95 via-black/40 to-black/60'
          }`} 
        />

        {/* Version 2 Warm Golden Lighting Glow Accent */}
        {version === 'v2' && (
          <div 
            className="absolute inset-0 bg-amber-500/15 mix-blend-color-dodge pointer-events-none transition-all duration-500" 
          />
        )}

        {/* Canvas Header / Badge & Logo */}
        <div className="relative z-10 flex items-center justify-between">
          <span 
            className={`text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full backdrop-blur-md shadow-md border border-white/20 text-white flex items-center space-x-1 ${
              version === 'v2' ? 'bg-amber-500/90 text-black border-amber-300 font-extrabold' : 'bg-black/60 text-white'
            }`}
          >
            {version === 'v2' && <Tag className="w-2.5 h-2.5 inline fill-current" />}
            <span>{badge}</span>
          </span>

          <span className="text-[9px] font-mono font-bold tracking-widest text-white/90 uppercase drop-shadow-md bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-sm">
            {brandName}
          </span>
        </div>

        {/* Wide Banner Layout */}
        {isWideBanner ? (
          <div className="relative z-10 flex items-center justify-between mt-auto">
            <div className="space-y-0.5 max-w-[70%]">
              <h4 className="text-[11px] font-bold text-white leading-tight font-google drop-shadow-md truncate">
                {headline}
              </h4>
              <p className="text-[9px] text-gray-200 drop-shadow truncate">
                {subheadline}
              </p>
            </div>
            <button 
              className="px-2.5 py-1 rounded text-[10px] font-bold shadow-lg transition-transform hover:scale-105 shrink-0 text-black"
              style={{ backgroundColor: accent }}
            >
              {cta}
            </button>
          </div>
        ) : (
          /* Standard and Vertical Ad Layout */
          <div className="relative z-10 space-y-1.5 mt-auto">
            {version === 'v2' && (
              <div className="inline-block px-1.5 py-0.5 rounded bg-amber-500/30 text-amber-300 text-[8px] font-mono border border-amber-500/40">
                ⚡ Descuento activo: GLOW20
              </div>
            )}
            <h4 className="text-xs font-bold text-white leading-snug font-google drop-shadow-md line-clamp-2">
              {headline}
            </h4>
            <p className="text-[10px] text-gray-200 leading-tight drop-shadow-sm line-clamp-2">
              {subheadline}
            </p>
            <div className="pt-1 flex items-center justify-between">
              <button 
                className="px-2.5 py-1 rounded text-[10px] font-bold shadow-lg transition-transform hover:scale-105 text-black"
                style={{ backgroundColor: accent }}
              >
                {cta}
              </button>
              <span className="text-[9px] font-mono text-white/80 drop-shadow bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-sm">
                {creative.channel}
              </span>
            </div>
          </div>
        )}

        {/* Hover Inspect hint */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
          <span className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/20 text-white text-xs font-medium backdrop-blur-md border border-white/30 shadow-xl">
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Ver Creativo Completo</span>
          </span>
        </div>

      </div>

      {/* Footer Info & Model tag */}
      <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-400">
        <span className="font-mono text-[10px]">{creative.dimensions}</span>

        <span className={`flex items-center space-x-1 px-1.5 py-0.5 rounded text-[10px] font-medium ${
          modelUsed === 'Nano Banana'
            ? 'bg-yellow-500/10 text-yellow-300 border border-yellow-500/20'
            : 'bg-purple-500/10 text-purple-300 border border-purple-500/20'
        }`}>
          {modelUsed === 'Nano Banana' ? (
            <Zap className="w-2.5 h-2.5 text-yellow-400" />
          ) : (
            <Sparkles className="w-2.5 h-2.5 text-purple-400" />
          )}
          <span>{modelUsed}</span>
        </span>
      </div>
    </div>
  );
};
