import React, { useState } from 'react';
import { CreativeFormat, VideoSpec, StepNumber } from '../types';
import { VideoPlayer } from './VideoPlayer';
import { CreativeCard } from './CreativeCard';
import { 
  Sparkles, 
  Film, 
  Layers, 
  FolderSync, 
  Mail, 
  Eye, 
  SlidersHorizontal, 
  CheckCircle2, 
  Grid,
  Filter
} from 'lucide-react';

interface RightPanelProps {
  creatives: CreativeFormat[];
  video: VideoSpec;
  version: 'v1' | 'v2';
  currentStep: StepNumber;
  onInspectCreative: (creative: CreativeFormat) => void;
  onOpenDrive: () => void;
  onOpenEmail: () => void;
  driveReady: boolean;
  emailReady: boolean;
  brandName?: string;
}

export const RightPanel: React.FC<RightPanelProps> = ({
  creatives,
  video,
  version,
  currentStep,
  onInspectCreative,
  onOpenDrive,
  onOpenEmail,
  driveReady,
  emailReady,
  brandName = "Lumière Botanics"
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredCreatives = filterCategory === 'all'
    ? creatives
    : creatives.filter(c => c.category === filterCategory);

  const showVideo = filterCategory === 'all' || filterCategory === 'video';

  return (
    <div className="flex-1 h-full bg-[#0f1013] flex flex-col overflow-y-auto">
      
      {/* Top Banner & Filter Controls */}
      <div className="sticky top-0 z-20 bg-[#131314]/95 backdrop-blur-md border-b border-[#282a2c] px-6 py-3 flex flex-wrap items-center justify-between gap-3 shadow-md">
        
        {/* Category Filter Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              filterCategory === 'all'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            Todos ({creatives.length + 1})
          </button>

          <button
            onClick={() => setFilterCategory('video')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center space-x-1.5 ${
              filterCategory === 'video'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            <Film className="w-3.5 h-3.5 text-red-400" />
            <span>Video Veo (10s)</span>
          </button>

          <button
            onClick={() => setFilterCategory('social-vertical')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              filterCategory === 'social-vertical'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            Social Vertical 9:16 (4)
          </button>

          <button
            onClick={() => setFilterCategory('feed-carousel')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              filterCategory === 'feed-carousel'
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            Feeds & Carruseles (5)
          </button>

          <button
            onClick={() => setFilterCategory('display-banners')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              filterCategory === 'display-banners'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            Google Display Banners (3)
          </button>
        </div>

        {/* Current State Info Banner */}
        <div className="flex items-center space-x-2">
          {currentStep === 1 && (
            <span className="text-xs px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20 flex items-center space-x-1 font-mono">
              <Sparkles className="w-3 h-3 text-blue-400" />
              <span>Paso 1: Generación Inicial (v1)</span>
            </span>
          )}

          {currentStep === 2 && (
            <span className="text-xs px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 flex items-center space-x-1 font-mono animate-pulse">
              <SlidersHorizontal className="w-3 h-3 text-amber-400" />
              <span>Paso 2: Feedback Aplicado (v2 • Sunset + 20% OFF)</span>
            </span>
          )}

          {currentStep === 3 && (
            <div className="flex items-center space-x-2">
              <button
                onClick={onOpenDrive}
                className="text-xs px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center space-x-1 font-mono hover:bg-emerald-500/25 transition"
              >
                <FolderSync className="w-3 h-3 text-emerald-400" />
                <span>Drive Listo</span>
              </button>

              <button
                onClick={onOpenEmail}
                className="text-xs px-2.5 py-1 rounded-md bg-sky-500/15 text-sky-300 border border-sky-500/30 flex items-center space-x-1 font-mono hover:bg-sky-500/25 transition"
              >
                <Mail className="w-3 h-3 text-sky-400" />
                <span>Correo Enviado</span>
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Main Studio Canvas Area */}
      <div className="p-6 space-y-6 max-w-7xl mx-auto w-full">
        
        {/* Step 3 Callout Card (Visible when Step 3 is completed) */}
        {currentStep === 3 && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-sky-950/60 border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl animate-in fade-in duration-300">
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300 shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-google">
                  Flujo de Entrega Completado por el Agente
                </h4>
                <p className="text-xs text-gray-300">
                  13 activos clasificados en 4 carpetas en Google Drive y correo ejecutivo despachado vía Gmail API al cliente.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={onOpenDrive}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-lg shadow-emerald-600/30 transition"
              >
                <FolderSync className="w-4 h-4" />
                <span>Explorar Drive</span>
              </button>

              <button
                onClick={onOpenEmail}
                className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-lg shadow-sky-600/30 transition"
              >
                <Mail className="w-4 h-4" />
                <span>Ver Correo</span>
              </button>
            </div>
          </div>
        )}

        {/* Section 1: Hero 10s Video (Google Veo) */}
        {showVideo && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Film className="w-4 h-4 text-red-400" />
                <h3 className="font-google font-bold text-sm text-white">
                  Entregable en Video: Google Veo Motion Ad (10 Segundos)
                </h3>
              </div>
              <span className="text-[11px] text-gray-400 font-mono">
                Formato 9:16 Vertical • 60 FPS • Duración Exacta: 10.0s
              </span>
            </div>

            <VideoPlayer video={video} version={version} />
          </div>
        )}

        {/* Section 2: Grid of the 12 Image Formats */}
        {filterCategory !== 'video' && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Layers className="w-4 h-4 text-purple-400" />
                <h3 className="font-google font-bold text-sm text-white">
                  Entregables Gráficos: 12 Formatos Multicanal
                </h3>
                <span className="text-xs text-gray-400">
                  (Renderizados con Imagen 3 & Nano Banana)
                </span>
              </div>

              <span className="text-xs font-mono text-gray-400">
                Mostrando {filteredCreatives.length} de {creatives.length} formatos
              </span>
            </div>

            {/* Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
              {filteredCreatives.map((creative) => (
                <CreativeCard
                  key={creative.id}
                  creative={creative}
                  version={version}
                  onInspect={onInspectCreative}
                  brandName={brandName}
                />
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
