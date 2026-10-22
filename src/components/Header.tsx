import React from 'react';
import { StepNumber, ActiveView } from '../types';
import { 
  Sparkles, 
  Layers, 
  SlidersHorizontal, 
  FolderSync, 
  Mail, 
  RotateCcw, 
  Play, 
  CheckCircle2, 
  Building2,
  LayoutGrid,
  BarChart3
} from 'lucide-react';

interface HeaderProps {
  currentView: ActiveView;
  onChangeView: (view: ActiveView) => void;
  activeBrandName: string;
  currentStep: StepNumber;
  isGenerating: boolean;
  onSelectStep: (step: StepNumber) => void;
  onReset: () => void;
  onRunAutoDemo: () => void;
  onOpenDrive: () => void;
  onOpenEmail: () => void;
  driveReady: boolean;
  emailReady: boolean;
  version: 'v1' | 'v2';
  onToggleVersion: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onChangeView,
  activeBrandName,
  currentStep,
  isGenerating,
  onSelectStep,
  onReset,
  onRunAutoDemo,
  onOpenDrive,
  onOpenEmail,
  driveReady,
  emailReady,
  version,
  onToggleVersion
}) => {
  return (
    <header className="h-16 border-b border-[#282a2c] bg-[#131314]/95 backdrop-blur-md px-5 flex items-center justify-between shrink-0 select-none z-30">
      
      {/* Brand, Title & View Switcher */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Sparkles className="w-5 h-5 text-white animate-pulse-slow" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-google font-bold text-white text-base tracking-tight">Gemini Creative Studio</span>
              <span className="text-[10px] font-mono uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full font-semibold">
                Summit Edition
              </span>
            </div>
            <p className="text-xs text-gray-400 flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Marca: <strong className="text-gray-200">{activeBrandName}</strong></span>
            </p>
          </div>
        </div>

        <div className="h-7 w-[1px] bg-white/10 hidden md:block" />

        {/* View Switcher: Studio vs Brand Vault */}
        <div className="flex items-center bg-[#1e1f20] p-1 rounded-xl border border-white/10 shadow-inner">
          <button
            onClick={() => onChangeView('studio')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              currentView === 'studio'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Creative Studio</span>
          </button>

          <button
            onClick={() => onChangeView('vault')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              currentView === 'vault'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Brand Vault</span>
            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 ml-1">Context Hub</span>
          </button>

          <button
            onClick={() => onChangeView('analytics')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              currentView === 'analytics'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Performance Hub</span>
            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 ml-1">Live ROAS</span>
          </button>
        </div>
      </div>

      {/* 3 Interactive Demo Steps (Visible when in Studio mode) */}
      {currentView === 'studio' ? (
        <div className="flex items-center bg-[#1e1f20] p-1 rounded-xl border border-[#3c4043]/60 shadow-inner">
          <button
            onClick={() => onSelectStep(1)}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              currentStep === 1
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : currentStep > 1
                ? 'text-gray-300 hover:text-white hover:bg-white/5'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {currentStep > 1 ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <span className="w-4 h-4 rounded-full bg-white/20 text-[10px] flex items-center justify-center font-bold">1</span>
            )}
            <span>1. Generar 12 Ads + Video (10s)</span>
          </button>

          <div className="w-4 h-[1px] bg-gray-700/50 mx-1" />

          <button
            onClick={() => onSelectStep(2)}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              currentStep === 2
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                : currentStep > 2
                ? 'text-gray-300 hover:text-white hover:bg-white/5'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {currentStep > 2 ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <span className="w-4 h-4 rounded-full bg-white/20 text-[10px] flex items-center justify-center font-bold">2</span>
            )}
            <span>2. Feedback de Cliente</span>
          </button>

          <div className="w-4 h-[1px] bg-gray-700/50 mx-1" />

          <button
            onClick={() => onSelectStep(3)}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              currentStep === 3
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-white/20 text-[10px] flex items-center justify-center font-bold">3</span>
            <span>3. Clasificar, Drive & Email</span>
          </button>
        </div>
      ) : (
        <div className="hidden lg:flex items-center space-x-2 text-xs text-purple-300 bg-purple-500/10 border border-purple-500/20 px-3.5 py-1.5 rounded-xl">
          <Building2 className="w-3.5 h-3.5" />
          <span>Editando Contexto & Guardrails para <strong>{activeBrandName}</strong></span>
        </div>
      )}

      {/* Right Action buttons */}
      <div className="flex items-center space-x-2">
        {/* Toggle v1 / v2 comparison if in step 2 or 3 and in studio */}
        {currentView === 'studio' && currentStep >= 2 && (
          <button
            onClick={onToggleVersion}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs border border-white/10 text-gray-200 transition"
            title="Alternar entre versión inicial y versión con cambios del cliente"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
            <span>Versión: <strong className="text-amber-300 uppercase">{version}</strong></span>
          </button>
        )}

        {/* Drive quick view button */}
        {driveReady && currentView === 'studio' && (
          <button
            onClick={onOpenDrive}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-medium transition"
          >
            <FolderSync className="w-3.5 h-3.5" />
            <span>Google Drive</span>
          </button>
        )}

        {/* Email quick view button */}
        {emailReady && currentView === 'studio' && (
          <button
            onClick={onOpenEmail}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-500/15 hover:bg-blue-500/25 text-blue-300 border border-blue-500/30 text-xs font-medium transition"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Correo Enviado</span>
          </button>
        )}

        {/* Auto demo run button (Studio only) */}
        {currentView === 'studio' && (
          <button
            onClick={onRunAutoDemo}
            disabled={isGenerating}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-medium shadow-md shadow-blue-500/20 transition disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Auto Demo</span>
          </button>
        )}

        {/* Reset */}
        {currentView === 'studio' && (
          <button
            onClick={onReset}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-gray-200 transition"
            title="Reiniciar Demo a Estado Cero"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </div>

    </header>
  );
};
