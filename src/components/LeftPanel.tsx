import React, { useState, useEffect } from 'react';
import { StepNumber, AgentLog, FullBrandContext } from '../types';
import { STEP_PRESETS, INITIAL_URL } from '../data/mockCreatives';
import { 
  Sparkles, 
  Send, 
  Globe, 
  Cpu, 
  Layers, 
  Terminal, 
  CheckCircle2, 
  Film, 
  Zap, 
  HardDrive, 
  Mail, 
  Sliders,
  ChevronDown,
  ChevronUp,
  Package,
  Rocket,
  TrendingUp,
  Target
} from 'lucide-react';

interface LeftPanelProps {
  currentStep: StepNumber;
  isGenerating: boolean;
  onExecutePrompt: (promptText: string, stepOverride?: StepNumber) => void;
  logs: AgentLog[];
  urlContext: string;
  setUrlContext: (url: string) => void;
  activePrompt?: string;
  brandContext?: FullBrandContext;
  selectedProductId?: string;
  onSelectProduct?: (productId: string) => void;
  onOpenCampaignLauncher?: () => void;
}

export const LeftPanel: React.FC<LeftPanelProps> = ({
  currentStep,
  isGenerating,
  onExecutePrompt,
  logs,
  urlContext,
  setUrlContext,
  activePrompt,
  brandContext,
  selectedProductId,
  onSelectProduct,
  onOpenCampaignLauncher
}) => {
  const [promptInput, setPromptInput] = useState<string>(activePrompt || STEP_PRESETS[currentStep].prompt);
  const [showLogs, setShowLogs] = useState<boolean>(true);
  const [campaignGoal, setCampaignGoal] = useState<'conversions' | 'awareness' | 'retargeting'>('conversions');

  useEffect(() => {
    if (activePrompt) {
      setPromptInput(activePrompt);
    }
  }, [activePrompt]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim() || isGenerating) return;
    onExecutePrompt(promptInput);
  };

  const handleSelectQuickStep = (step: StepNumber) => {
    setPromptInput(STEP_PRESETS[step].prompt);
    onExecutePrompt(STEP_PRESETS[step].prompt, step);
  };

  return (
    <div className="w-full lg:w-[420px] xl:w-[450px] shrink-0 h-full border-r border-[#282a2c] bg-[#141517] flex flex-col justify-between overflow-y-auto">
      
      {/* Upper Section: Context & Setup */}
      <div className="p-5 space-y-4">
        
        {/* Context: Website Link */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-300 flex items-center justify-between">
            <span className="flex items-center space-x-1.5">
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>URL de Contexto (Web Grounding)</span>
            </span>
            <span className="text-[10px] text-gray-500 font-mono">Gemini 2.0 Web Crawler</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={urlContext}
              onChange={(e) => setUrlContext(e.target.value)}
              placeholder="https://tu-marca.com/producto"
              className="w-full px-3 py-2 rounded-xl bg-[#1e1f20] border border-[#3c4043] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 font-mono transition"
            />
          </div>
          <div className="flex items-center space-x-2 pt-0.5">
            <span className="text-[10px] text-gray-400">Presets rápidos:</span>
            <button
              type="button"
              onClick={() => setUrlContext('https://lumiere-botanics.com/glow-serum')}
              className="text-[10px] text-blue-400 hover:underline"
            >
              🌿 Skincare
            </button>
            <span className="text-gray-600">•</span>
            <button
              type="button"
              onClick={() => setUrlContext('https://volt-stride.io/running-shoes')}
              className="text-[10px] text-blue-400 hover:underline"
            >
              👟 Sneakers
            </button>
            <span className="text-gray-600">•</span>
            <button
              type="button"
              onClick={() => setUrlContext('https://pulse-saas.com/ai-workspace')}
              className="text-[10px] text-blue-400 hover:underline"
            >
              💼 SaaS B2B
            </button>
          </div>
        </div>

        {/* Product Catalog Link (Fase 3: Data-Driven Context) */}
        {brandContext && brandContext.products && brandContext.products.length > 0 && (
          <div className="space-y-1.5 p-3 rounded-xl bg-[#1c1d20] border border-white/10">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-gray-200 flex items-center space-x-1.5">
                <Package className="w-3.5 h-3.5 text-emerald-400" />
                <span>Producto Prioritario (Brand Vault):</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Margen: {brandContext.products.find(p => p.id === selectedProductId)?.marginPercent || brandContext.products[0]?.marginPercent}%
              </span>
            </div>

            <select
              value={selectedProductId || brandContext.products[0]?.id}
              onChange={(e) => {
                if (onSelectProduct) onSelectProduct(e.target.value);
                const p = brandContext.products.find(prod => prod.id === e.target.value);
                if (p) {
                  setPromptInput(`Usa el contexto de ${p.name} ($${p.price} USD) y genera 12 formatos y 1 video cinemático de 10s destacando: ${p.uvp}`);
                }
              }}
              className="w-full px-2.5 py-1.5 rounded-lg bg-[#27282d] border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-500 cursor-pointer font-medium"
            >
              {brandContext.products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — ${p.price} USD (Margen: {p.marginPercent}%)
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Winning Hooks Mined from Performance Hub (Fase 3) */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-semibold text-gray-300">
            <span className="flex items-center space-x-1 text-purple-300">
              <Sparkles className="w-3 h-3 text-purple-400" />
              <span>Hooks Ganadores (Mined from Campaigns):</span>
            </span>
            <span className="text-[9px] font-mono text-gray-500">Live Signals</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={() => {
                const prod = brandContext?.products.find(p => p.id === selectedProductId) || brandContext?.products[0];
                const pName = prod ? prod.name : 'producto';
                setPromptInput(`Generar campaña para ${pName} centrada en el hook ganador 'Evidencia Clínica 72h' (+120% hidratación) con aval dermatológico en los 12 formatos.`);
              }}
              className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-left text-[10px] text-emerald-300 transition truncate"
            >
              🧪 Evidencia Clínica <strong>(5.4x)</strong>
            </button>

            <button
              type="button"
              onClick={() => {
                const prod = brandContext?.products.find(p => p.id === selectedProductId) || brandContext?.products[0];
                const pName = prod ? prod.name : 'producto';
                setPromptInput(`Generar variación anti-fatiga para ${pName} con paleta cálida golden hour y badge de urgencia '-20% OFF' para reactivar CTR.`);
              }}
              className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-left text-[10px] text-amber-300 transition truncate"
            >
              ⚡ Descuento -20% <strong>(5.1x)</strong>
            </button>

            <button
              type="button"
              onClick={() => {
                const prod = brandContext?.products.find(p => p.id === selectedProductId) || brandContext?.products[0];
                const pName = prod ? prod.name : 'producto';
                setPromptInput(`Crear creativos enfocados en la intención de búsqueda 'serum ácido hialurónico botánico vegano' para ${pName} en Google y Meta.`);
              }}
              className="p-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 text-left text-[10px] text-cyan-300 transition truncate"
            >
              🔍 Search Query <strong>(6.4x)</strong>
            </button>

            <button
              type="button"
              onClick={() => {
                const prod = brandContext?.products.find(p => p.id === selectedProductId) || brandContext?.products[0];
                const pName = prod ? prod.name : 'producto';
                setPromptInput(`Generar anuncios de retargeting para ${pName} destacando fórmula pura nórdica 0% químicos y envío express.`);
              }}
              className="p-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-left text-[10px] text-purple-300 transition truncate"
            >
              ❄️ Origen Nórdico <strong>(4.8x)</strong>
            </button>
          </div>
        </div>

        {/* Autonomous Campaign Dispatcher Button (Fase 3) */}
        {onOpenCampaignLauncher && (
          <button
            type="button"
            onClick={onOpenCampaignLauncher}
            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-bold flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/30 transition group"
          >
            <Rocket className="w-4 h-4 text-white group-hover:scale-110 transition" />
            <span>🚀 Lanzar Campaña Agéntica Multi-Canal</span>
          </button>
        )}

        {/* Campaign Objective & Scope */}
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-gray-400">Objetivo de Campaña</label>
            <select
              value={campaignGoal}
              onChange={(e: any) => setCampaignGoal(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-[#1e1f20] border border-[#3c4043] text-xs text-gray-200 focus:outline-none focus:border-blue-500"
            >
              <option value="conversions">ROAS / Conversión</option>
              <option value="awareness">Brand Awareness</option>
              <option value="retargeting">Retargeting</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-medium text-gray-400">Entregables Activos</label>
            <div className="px-2.5 py-1.5 rounded-lg bg-[#1e1f20] border border-[#3c4043] text-xs text-emerald-400 font-mono truncate">
              12 Imágenes + 1 Video 10s
            </div>
          </div>
        </div>

        {/* Google AI & Agentic Stack Badge Bar */}
        <div className="p-3 rounded-xl bg-[#1a1b1d] border border-white/5 space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span className="font-semibold text-gray-300 flex items-center space-x-1.5">
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
              <span>Herramientas de Google Orquestadas:</span>
            </span>
            <span className="text-[10px] font-mono text-emerald-400">Conectadas</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20 text-[10px] font-medium flex items-center space-x-1">
              <Sparkles className="w-2.5 h-2.5 text-blue-400" />
              <span>Gemini 2.0 Flash</span>
            </span>

            <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20 text-[10px] font-medium flex items-center space-x-1">
              <Layers className="w-2.5 h-2.5 text-purple-400" />
              <span>Imagen 3</span>
            </span>

            <span className="px-2 py-0.5 rounded-md bg-red-500/10 text-red-300 border border-red-500/20 text-[10px] font-medium flex items-center space-x-1">
              <Film className="w-2.5 h-2.5 text-red-400" />
              <span>Google Veo (10s)</span>
            </span>

            <span className="px-2 py-0.5 rounded-md bg-yellow-500/10 text-yellow-300 border border-yellow-500/20 text-[10px] font-medium flex items-center space-x-1">
              <Zap className="w-2.5 h-2.5 text-yellow-400" />
              <span>Nano Banana</span>
            </span>

            <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[10px] font-medium flex items-center space-x-1">
              <HardDrive className="w-2.5 h-2.5 text-emerald-400" />
              <span>Google Drive API</span>
            </span>

            <span className="px-2 py-0.5 rounded-md bg-sky-500/10 text-sky-300 border border-sky-500/20 text-[10px] font-medium flex items-center space-x-1">
              <Mail className="w-2.5 h-2.5 text-sky-400" />
              <span>Gmail API</span>
            </span>
          </div>
        </div>

        {/* Quick Demo Steps Prompts Chips */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
            Atajos de la Demo (3 Pasos):
          </div>
          <div className="space-y-1.5">
            <button
              type="button"
              onClick={() => handleSelectQuickStep(1)}
              className={`w-full text-left p-2.5 rounded-xl border text-xs transition flex items-start space-x-2 ${
                currentStep === 1 
                  ? 'bg-blue-600/15 border-blue-500/40 text-blue-200' 
                  : 'bg-white/5 border-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-blue-500/30 text-blue-300 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
              <div>
                <strong className="block text-white">Paso 1: Generar Creativos</strong>
                <span className="text-[11px] text-gray-400">12 formatos de imagen + 1 video de 10s desde la web</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleSelectQuickStep(2)}
              className={`w-full text-left p-2.5 rounded-xl border text-xs transition flex items-start space-x-2 ${
                currentStep === 2 
                  ? 'bg-amber-600/15 border-amber-500/40 text-amber-200' 
                  : 'bg-white/5 border-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-amber-500/30 text-amber-300 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
              <div>
                <strong className="block text-white">Paso 2: Cambios de Cliente (Feedback)</strong>
                <span className="text-[11px] text-gray-400">Paleta cálida, urgencia -20% OFF y modelo a cámara</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleSelectQuickStep(3)}
              className={`w-full text-left p-2.5 rounded-xl border text-xs transition flex items-start space-x-2 ${
                currentStep === 3 
                  ? 'bg-emerald-600/15 border-emerald-500/40 text-emerald-200' 
                  : 'bg-white/5 border-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-emerald-500/30 text-emerald-300 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
              <div>
                <strong className="block text-white">Paso 3: Organizar, Drive & Email</strong>
                <span className="text-[11px] text-gray-400">Clasificar carpetas, sincronizar a Drive y enviar correo</span>
              </div>
            </button>
          </div>
        </div>

        {/* Live Prompt Input Box */}
        <form onSubmit={handleSubmit} className="space-y-2 pt-1">
          <label className="text-xs font-semibold text-gray-300 flex items-center justify-between">
            <span>Instrucción al Agente (Prompt Libre):</span>
            {isGenerating && (
              <span className="text-xs text-amber-400 flex items-center space-x-1 animate-pulse">
                <Sparkles className="w-3 h-3" />
                <span>Pensando...</span>
              </span>
            )}
          </label>
          <div className="relative">
            <textarea
              rows={3}
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              placeholder="Escribe aquí tu solicitud al agente..."
              className="w-full p-3 rounded-xl bg-[#1e1f20] border border-[#3c4043] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 leading-relaxed resize-none font-sans transition"
            />
            <button
              type="submit"
              disabled={isGenerating || !promptInput.trim()}
              className="absolute right-2.5 bottom-3 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium flex items-center space-x-1.5 shadow-md shadow-blue-600/30 transition disabled:opacity-50"
            >
              <span>Ejecutar</span>
              <Send className="w-3 h-3" />
            </button>
          </div>
        </form>

      </div>

      {/* Lower Section: Agent Reasoning Stream / Thought Trace */}
      <div className="border-t border-[#282a2c] bg-[#101113] p-4 flex flex-col justify-end">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1.5 text-xs font-mono text-gray-300">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold">Traza del Agente (Reasoning Stream)</span>
          </div>

          <button
            type="button"
            onClick={() => setShowLogs(!showLogs)}
            className="text-gray-400 hover:text-white transition"
          >
            {showLogs ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>
        </div>

        {showLogs && (
          <div className="h-44 rounded-xl bg-black/60 border border-white/5 p-3 overflow-y-auto space-y-2 font-mono text-[11px]">
            {logs.length === 0 ? (
              <p className="text-gray-500 italic">Listo para recibir instrucciones del usuario...</p>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="flex items-start space-x-2 animate-in fade-in duration-300">
                  <span className="text-gray-500 shrink-0 text-[10px]">{log.timestamp}</span>
                  <div className="space-y-0.5">
                    <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                      log.tool === 'Gemini 2.0 Flash' ? 'bg-blue-500/20 text-blue-300' :
                      log.tool === 'Imagen 3' ? 'bg-purple-500/20 text-purple-300' :
                      log.tool === 'Google Veo' ? 'bg-red-500/20 text-red-300' :
                      log.tool === 'Nano Banana' ? 'bg-yellow-500/20 text-yellow-300' :
                      log.tool === 'Google Drive API' ? 'bg-emerald-500/20 text-emerald-300' :
                      'bg-sky-500/20 text-sky-300'
                    }`}>
                      {log.tool}
                    </span>
                    <p className={`text-[11px] leading-snug ${
                      log.type === 'success' ? 'text-emerald-300' :
                      log.type === 'refine' ? 'text-amber-300' :
                      'text-gray-300'
                    }`}>
                      {log.message}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

    </div>
  );
};
