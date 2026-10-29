import React, { useState } from 'react';
import { CreativeFormat } from '../types';
import { 
  X, 
  Sparkles, 
  SlidersHorizontal, 
  Check, 
  Copy, 
  Tag, 
  ShieldCheck, 
  TrendingUp, 
  Target, 
  CheckCircle2, 
  Flame 
} from 'lucide-react';

interface DetailModalProps {
  creative: CreativeFormat | null;
  version: 'v1' | 'v2';
  onClose: () => void;
  brandName?: string;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  creative,
  version: initialVersion,
  onClose,
  brandName = "Lumière Botanics"
}) => {
  const [modalVersion, setModalVersion] = useState<'v1' | 'v2'>(initialVersion);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  if (!creative) return null;

  const currentHeadline = modalVersion === 'v2' ? creative.headlineV2 : creative.headlineV1;
  const currentSubheadline = modalVersion === 'v2' ? creative.subheadlineV2 : creative.subheadlineV1;
  const currentCta = modalVersion === 'v2' ? creative.ctaV2 : creative.ctaV1;
  const currentBadge = modalVersion === 'v2' ? creative.badgeV2 : creative.badgeV1;
  const currentPrompt = modalVersion === 'v2' ? creative.imagePromptV2 : creative.imagePromptV1;
  const currentAccent = modalVersion === 'v2' ? creative.accentColorV2 : creative.accentColorV1;
  const currentImg = modalVersion === 'v2' ? creative.imageUrlV2 : creative.imageUrlV1;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(currentPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#1e1f20] border border-[#3c4043] rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#2d2f31] flex items-center justify-between bg-[#18191b]">
          <div className="flex items-center space-x-3">
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-google font-bold text-base text-white">{creative.name}</h3>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-mono border border-blue-500/30">
                  {creative.aspectRatio}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono border border-purple-500/30">
                  {creative.channel}
                </span>
              </div>
              <p className="text-xs text-gray-400 font-mono">
                {creative.dimensions} • Archivo: {creative.drivePath.split('/')[1]}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Version switcher */}
            <div className="flex items-center bg-black/50 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setModalVersion('v1')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  modalVersion === 'v1'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                v1 Original
              </button>
              <button
                onClick={() => setModalVersion('v2')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center space-x-1 ${
                  modalVersion === 'v2'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Tag className="w-3 h-3 fill-current" />
                <span>v2 Con Feedback</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body content */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          
          {/* Real Visual Preview Frame */}
          <div className="flex flex-col items-center justify-center bg-black/60 p-4 rounded-2xl border border-white/10 relative overflow-hidden">
            <div 
              className="relative w-full max-w-[320px] rounded-xl overflow-hidden border border-white/20 shadow-2xl flex flex-col justify-between p-4 bg-black"
              style={{ minHeight: '380px' }}
            >
              {/* Real Photography Image */}
              <img
                src={currentImg}
                alt={currentHeadline}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/60 pointer-events-none" />

              {/* Version 2 Warm Glow */}
              {modalVersion === 'v2' && (
                <div className="absolute inset-0 bg-amber-500/15 mix-blend-color-dodge pointer-events-none" />
              )}

              {/* Top Badge & Brand Name */}
              <div className="relative z-10 flex items-center justify-between">
                <span 
                  className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full shadow-lg border border-white/20 flex items-center space-x-1 ${
                    modalVersion === 'v2' ? 'bg-amber-500 text-black border-amber-300 font-extrabold' : 'bg-black/70 text-white'
                  }`}
                >
                  {modalVersion === 'v2' && <Tag className="w-3 h-3 inline fill-current" />}
                  <span>{currentBadge}</span>
                </span>
                <span className="text-[10px] text-white font-mono tracking-widest uppercase bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">
                  {brandName}
                </span>
              </div>

              {/* Copy & CTA */}
              <div className="relative z-10 space-y-2 mt-auto">
                {modalVersion === 'v2' && (
                  <div className="inline-block px-2 py-0.5 rounded bg-amber-500/30 text-amber-300 text-[9px] font-mono border border-amber-500/40">
                    ⚡ Oferta Activa: -20% OFF con código GLOW20
                  </div>
                )}
                <h4 className="text-base font-bold text-white leading-tight font-google drop-shadow-md">
                  {currentHeadline}
                </h4>
                <p className="text-xs text-gray-200 leading-snug drop-shadow">
                  {currentSubheadline}
                </p>
                <button 
                  className="w-full py-2.5 rounded-lg text-xs font-bold text-black shadow-lg transition-transform hover:scale-[1.02]"
                  style={{ backgroundColor: currentAccent }}
                >
                  {currentCta}
                </button>
              </div>
            </div>

            <div className="mt-3 text-xs text-gray-400 font-mono text-center">
              Renderizado: <strong className="text-gray-200">{modalVersion === 'v2' ? 'Imagen 3 + Nano Banana Refinement' : 'Imagen 3 Commercial Synthetic'}</strong>
            </div>
          </div>

          {/* Specs & Generation Details */}
          <div className="space-y-4 text-xs">
            {/* Predictive Creative Scoring & AI Audit (Fase 3) */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-teal-950/30 to-[#141517] border border-emerald-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Auditoría de Guardrails & Predictive Score (Fase 3)</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  Score: {modalVersion === 'v2' ? (creative.predictiveScoreV2 || 96) : (creative.predictiveScoreV1 || 89)}/100
                </span>
              </div>

              {/* 3 Metric Pills */}
              <div className="grid grid-cols-3 gap-2 bg-black/40 p-2.5 rounded-xl border border-white/5 text-center">
                <div>
                  <div className="text-[10px] text-gray-400">ROAS Estimado</div>
                  <div className="text-xs font-mono font-bold text-emerald-400 flex items-center justify-center space-x-0.5">
                    <span>{modalVersion === 'v2' ? (creative.predictedRoasV2 || 5.2) : (creative.predictedRoasV1 || 4.2)}x</span>
                    {modalVersion === 'v2' && <span className="text-[9px] text-amber-400 ml-1">+{creative.auditBreakdown?.predictedLiftPercent || 26}%</span>}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-400">CTR Proyectado</div>
                  <div className="text-xs font-mono font-bold text-white">
                    {modalVersion === 'v2' ? (creative.predictedCtrV2 || 4.1) : (creative.predictedCtrV1 || 2.9)}%
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-400">Guardrails QA</div>
                  <div className="text-xs font-mono font-bold text-emerald-400 flex items-center justify-center space-x-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>100% OK</span>
                  </div>
                </div>
              </div>

              {/* Guardrails compliance checklist */}
              <div className="space-y-1 text-[11px] text-gray-300">
                <div className="flex items-center space-x-1.5">
                  <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>Paleta cromática oficial y contraste tipográfico verificado por Gemini Vision.</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>Claims aprobados activos; sin términos prohibidos detectados.</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>Zona segura (Safe Zone) y jerarquía visual optimizadas para {creative.channel}.</span>
                </div>
              </div>
            </div>

            {/* Prompt Card */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-gray-300">
                <span className="flex items-center space-x-1 font-semibold text-purple-300">
                  <Sparkles className="w-4 h-4" />
                  <span>Prompt de Generación ({modalVersion.toUpperCase()}):</span>
                </span>
                <button
                  onClick={handleCopyPrompt}
                  className="flex items-center space-x-1 text-gray-400 hover:text-white transition"
                >
                  {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPrompt ? 'Copiado' : 'Copiar'}</span>
                </button>
              </div>
              <p className="text-gray-300 italic leading-relaxed bg-[#141517] p-3 rounded-lg border border-white/5 font-mono text-[11px]">
                "{currentPrompt}"
              </p>
            </div>

            {/* Changes Applied in v2 */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2">
              <div className="font-semibold text-amber-300 flex items-center space-x-1.5">
                <SlidersHorizontal className="w-4 h-4" />
                <span>Ajustes Aplicados con Nano Banana (Paso 2):</span>
              </div>
              <ul className="space-y-1.5 text-gray-300 text-[11px] list-disc list-inside">
                <li><strong className="text-white">Fotografía real adaptada:</strong> Cambio a iluminación en hora dorada (Sunset Warm Light) y modelo sonriendo directo a cámara.</li>
                <li><strong className="text-white">Llamada de urgencia:</strong> Inclusión del badge y cupón <em>GLOW20 (-20% OFF)</em> para maximizar CTR.</li>
                <li><strong className="text-white">Composición:</strong> Micro-retoque de balance tonal y saturación en milisegundos sin regenerar desde cero.</li>
              </ul>
            </div>

            {/* Technical Specs Table */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-2">
              <div className="font-semibold text-gray-200">Especificaciones Técnicas del Anuncio</div>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-300">
                <div>Plataforma: <strong className="text-white">{creative.channel}</strong></div>
                <div>Relación de Aspecto: <strong className="text-white">{creative.aspectRatio}</strong></div>
                <div>Resolución: <strong className="text-white">{creative.dimensions}</strong></div>
                <div>Peso Optimizado: <strong className="text-white">{creative.fileSize}</strong></div>
                <div>Modelo AI: <strong className="text-white">{creative.model}</strong></div>
                <div>Formato: <strong className="text-white">PNG Lossless 24-bit RGB</strong></div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#2d2f31] bg-[#18191b] flex items-center justify-between">
          <span className="text-xs text-gray-400 font-mono">
            Ruta Drive: {creative.drivePath}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
