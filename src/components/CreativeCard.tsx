import React from 'react';
import { CreativeFormat } from '../types';
import { Sparkles, Maximize2, Zap, Instagram, Youtube } from 'lucide-react';

interface CreativeCardProps {
  creative: CreativeFormat;
  version: 'v1' | 'v2';
  onInspect: (creative: CreativeFormat) => void;
}

export const CreativeCard: React.FC<CreativeCardProps> = ({
  creative,
  version,
  onInspect
}) => {
  const headline = version === 'v2' ? creative.headlineV2 : creative.headlineV1;
  const subheadline = version === 'v2' ? creative.subheadlineV2 : creative.subheadlineV1;
  const cta = version === 'v2' ? creative.ctaV2 : creative.ctaV1;
  const badge = version === 'v2' ? creative.badgeV2 : creative.badgeV1;
  const gradient = version === 'v2' ? creative.bgGradientV2 : creative.bgGradientV1;
  const accent = version === 'v2' ? creative.accentColorV2 : creative.accentColorV1;
  const modelUsed = version === 'v2' && (creative.category === 'display-banners' || creative.id.includes('1') || creative.id.includes('6'))
    ? 'Nano Banana'
    : creative.model;

  return (
    <div 
      onClick={() => onInspect(creative)}
      className="group relative bg-[#1c1d1f] hover:bg-[#222427] border border-[#2d2f31] hover:border-gray-600 rounded-xl p-3 flex flex-col justify-between transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer overflow-hidden"
    >
      {/* Top Bar info */}
      <div className="flex items-center justify-between text-xs mb-2.5">
        <div className="flex items-center space-x-1.5">
          <span className="font-semibold text-gray-200 truncate max-w-[150px]">
            {creative.name}
          </span>
        </div>
        <span className="font-mono text-[10px] text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">
          {creative.aspectRatio}
        </span>
      </div>

      {/* Visual Canvas Simulation Frame */}
      <div 
        className={`relative w-full rounded-lg overflow-hidden border border-white/10 shadow-inner flex flex-col justify-between p-3.5 transition-all duration-500 bg-gradient-to-br ${gradient}`}
        style={{
          minHeight: creative.aspectRatio === '8:1' ? '85px' : creative.aspectRatio === '9:16' || creative.aspectRatio === '1:2' ? '240px' : '175px'
        }}
      >
        {/* Ambient glow in canvas */}
        <div 
          className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-30 pointer-events-none transition-all duration-700"
          style={{ backgroundColor: accent }}
        />

        {/* Canvas Header / Pill Badge */}
        <div className="relative z-10 flex items-center justify-between">
          <span 
            className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full backdrop-blur-md shadow-sm border border-white/20 text-white"
            style={{ backgroundColor: `${accent}40` }}
          >
            {badge}
          </span>

          <span className="text-[9px] font-mono text-white/70">
            LUMIÈRE
          </span>
        </div>

        {/* Center Graphic / Icon / Art */}
        <div className="relative z-10 my-auto text-center py-2 flex items-center justify-center">
          {creative.productImg === 'dropper' && (
            <div className="relative">
              <div className="w-12 h-16 rounded-lg bg-white/15 backdrop-blur-md border border-white/30 mx-auto flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform">
                <span className="text-xl">🧴</span>
              </div>
              <div className="text-[10px] text-white/90 font-medium mt-1">Glow Serum 50ml</div>
            </div>
          )}

          {creative.productImg === 'face-glow' && (
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400/30 to-rose-400/30 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform">
              <span className="text-2xl">✨</span>
            </div>
          )}

          {creative.productImg === 'lab' && (
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 backdrop-blur-md border border-white/30 mx-auto flex items-center justify-center shadow-lg">
                <span className="text-2xl">🧪</span>
              </div>
              <span className="text-[9px] text-emerald-300 font-mono">Clinical 99.8%</span>
            </div>
          )}

          {creative.productImg === 'ugc' && (
            <div className="px-2 py-1 rounded bg-black/60 backdrop-blur-sm border border-white/10 text-center">
              <span className="text-base">📱 ⭐⭐⭐⭐⭐</span>
              <p className="text-[9px] text-white/80 font-mono mt-0.5">Viral Review</p>
            </div>
          )}

          {creative.productImg === 'banner-wide' && (
            <div className="flex items-center space-x-3 w-full justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-lg">🧴</span>
                <span className="text-[11px] font-bold text-white tracking-wide">{headline}</span>
              </div>
              <button 
                className="px-2.5 py-1 rounded-md text-[10px] font-bold shadow-md shrink-0 text-black"
                style={{ backgroundColor: accent }}
              >
                {cta}
              </button>
            </div>
          )}

          {!['dropper', 'face-glow', 'lab', 'ugc', 'banner-wide'].includes(creative.productImg) && (
            <div className="w-12 h-14 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
              <span className="text-xl">🌿</span>
            </div>
          )}
        </div>

        {/* Canvas Bottom / Headlines and CTA (if not wide banner) */}
        {creative.aspectRatio !== '8:1' && (
          <div className="relative z-10 space-y-1 mt-auto">
            <h4 className="text-xs font-bold text-white leading-snug line-clamp-2 drop-shadow-sm font-google">
              {headline}
            </h4>
            <p className="text-[10px] text-gray-200/80 line-clamp-1">
              {subheadline}
            </p>
            <div className="pt-1.5 flex items-center justify-between">
              <button 
                className="px-2.5 py-1 rounded-md text-[10px] font-bold shadow-md transition-all text-black hover:opacity-95"
                style={{ backgroundColor: accent }}
              >
                {cta}
              </button>
              <span className="text-[9px] font-mono text-white/60">
                {creative.channel}
              </span>
            </div>
          </div>
        )}

        {/* Hover overlay hint */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/20 text-white text-xs font-medium backdrop-blur-md border border-white/30 shadow-lg">
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Inspeccionar Formato</span>
          </span>
        </div>
      </div>

      {/* Footer Info & Model tag */}
      <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-400">
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
