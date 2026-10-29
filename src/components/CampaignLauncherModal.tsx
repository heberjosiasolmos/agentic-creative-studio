import React, { useState } from 'react';
import { FullBrandContext, BrandProduct } from '../types';
import { 
  Rocket, 
  X, 
  Sparkles, 
  DollarSign, 
  TrendingUp, 
  Target, 
  ShieldCheck, 
  Layers, 
  CheckCircle2, 
  FolderSync, 
  ExternalLink,
  Flame,
  ArrowRight,
  Send,
  Zap,
  Tag
} from 'lucide-react';

interface CampaignLauncherModalProps {
  isOpen: boolean;
  onClose: () => void;
  brand: FullBrandContext;
  onDeploy: (campaignName: string, selectedProduct: BrandProduct, hook: string, budget: number) => void;
}

export const CampaignLauncherModal: React.FC<CampaignLauncherModalProps> = ({
  isOpen,
  onClose,
  brand,
  onDeploy
}) => {
  const [campaignName, setCampaignName] = useState(`Campaña Q4 — Escalado de Alto Margen (${brand.name})`);
  const [selectedProductId, setSelectedProductId] = useState(brand.products[0]?.id || '');
  const [selectedHook, setSelectedHook] = useState('Evidencia Clínica 72h (+120% Hidratación) • ROAS 5.42x');
  const [monthlyBudget, setMonthlyBudget] = useState(12500);
  const [channels, setChannels] = useState({
    meta: true,
    google: true,
    tiktok: true,
    amazon: true
  });
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployedSuccess, setDeployedSuccess] = useState(false);

  if (!isOpen) return null;

  const currentProduct = brand.products.find(p => p.id === selectedProductId) || brand.products[0];

  // Calculated estimates
  const estimatedRoasMin = 4.8;
  const estimatedRoasMax = 5.6;
  const estimatedRevenueMin = Math.round(monthlyBudget * estimatedRoasMin);
  const estimatedRevenueMax = Math.round(monthlyBudget * estimatedRoasMax);
  const estimatedCpa = 16.40;

  const handleLaunch = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      setDeployedSuccess(true);
      setTimeout(() => {
        onDeploy(campaignName, currentProduct, selectedHook, monthlyBudget);
        setDeployedSuccess(false);
        onClose();
      }, 1400);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#18191c] border border-blue-500/30 rounded-2xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-blue-950/60 via-purple-950/40 to-black">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-google font-bold text-base text-white">Lanzador Autónomo de Campaña</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 font-semibold">
                  Fase 3: Data-Driven AI
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Orquestador multi-canal asistido por BigQuery, Gemini 2.0 y Brand Vault
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          
          {deployedSuccess ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-3 text-center animate-in fade-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-white">¡Campaña Desplegada Exitosamente!</h4>
              <p className="text-xs text-gray-300 max-w-md">
                12 formatos PNG Lossless y 1 Master MP4 sincronizados en Google Drive. Notificación despachada a <strong>{brand.clientEmail}</strong>.
              </p>
            </div>
          ) : (
            <>
              {/* Campaign Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-gray-300">Nombre de la Campaña</label>
                  <input
                    type="text"
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#222428] border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500 font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-gray-300 flex items-center justify-between">
                    <span>Producto Prioritario (Brand Vault)</span>
                    <span className="text-[10px] text-emerald-400 font-mono font-bold">
                      Margen: {currentProduct?.marginPercent}%
                    </span>
                  </label>
                  <select
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#222428] border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    {brand.products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} — ${p.price} USD (Margen: {p.marginPercent}%)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Data-Driven Hook Selector */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-gray-300 flex items-center justify-between">
                  <span>Hook Ganador Minado de Performance Hub</span>
                  <span className="text-[10px] text-purple-400 font-mono">Feedback Loop Activo</span>
                </label>
                <select
                  value={selectedHook}
                  onChange={(e) => setSelectedHook(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#222428] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500 cursor-pointer"
                >
                  <option value="Evidencia Clínica 72h (+120% Hidratación) • ROAS 5.42x">
                    🧪 Evidencia Clínica 72h (+120% Hidratación) • Histórico ROAS: 5.42x
                  </option>
                  <option value="Pureza Botánica Círculo Polar Nórdico • ROAS 4.85x">
                    ❄️ Pureza Botánica Círculo Polar Nórdico • Histórico ROAS: 4.85x
                  </option>
                  <option value="Oferta Urgente: -20% OFF con código GLOW20 • ROAS 5.10x">
                    ⚡ Oferta Urgente: -20% OFF con código GLOW20 • Histórico ROAS: 5.10x
                  </option>
                  <option value="Búsqueda: 'Serum ácido hialurónico botánico' • ROAS 6.40x">
                    🔍 Búsqueda: "Serum ácido hialurónico botánico vegano" • ROAS 6.40x (Oportunidad)
                  </option>
                </select>
              </div>

              {/* Multi-Channel Distribution Grid */}
              <div className="space-y-2">
                <label className="text-[11px] font-semibold text-gray-300">
                  Canales de Despliegue Publicitario
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <label className={`p-2.5 rounded-xl border flex items-center space-x-2 cursor-pointer transition ${
                    channels.meta ? 'bg-blue-600/15 border-blue-500/40 text-blue-200' : 'bg-white/5 border-white/5 text-gray-400'
                  }`}>
                    <input
                      type="checkbox"
                      checked={channels.meta}
                      onChange={(e) => setChannels({ ...channels, meta: e.target.checked })}
                      className="rounded bg-[#222428] border-white/20 text-blue-500 focus:ring-0"
                    />
                    <div>
                      <div className="font-bold text-white text-[11px]">Meta Ads</div>
                      <div className="text-[9px] text-gray-400">Reels & Feed</div>
                    </div>
                  </label>

                  <label className={`p-2.5 rounded-xl border flex items-center space-x-2 cursor-pointer transition ${
                    channels.google ? 'bg-blue-600/15 border-blue-500/40 text-blue-200' : 'bg-white/5 border-white/5 text-gray-400'
                  }`}>
                    <input
                      type="checkbox"
                      checked={channels.google}
                      onChange={(e) => setChannels({ ...channels, google: e.target.checked })}
                      className="rounded bg-[#222428] border-white/20 text-blue-500 focus:ring-0"
                    />
                    <div>
                      <div className="font-bold text-white text-[11px]">Google Ads</div>
                      <div className="text-[9px] text-gray-400">Demand Gen & GDN</div>
                    </div>
                  </label>

                  <label className={`p-2.5 rounded-xl border flex items-center space-x-2 cursor-pointer transition ${
                    channels.tiktok ? 'bg-blue-600/15 border-blue-500/40 text-blue-200' : 'bg-white/5 border-white/5 text-gray-400'
                  }`}>
                    <input
                      type="checkbox"
                      checked={channels.tiktok}
                      onChange={(e) => setChannels({ ...channels, tiktok: e.target.checked })}
                      className="rounded bg-[#222428] border-white/20 text-blue-500 focus:ring-0"
                    />
                    <div>
                      <div className="font-bold text-white text-[11px]">TikTok Spark</div>
                      <div className="text-[9px] text-gray-400">Veo Video 10s</div>
                    </div>
                  </label>

                  <label className={`p-2.5 rounded-xl border flex items-center space-x-2 cursor-pointer transition ${
                    channels.amazon ? 'bg-blue-600/15 border-blue-500/40 text-blue-200' : 'bg-white/5 border-white/5 text-gray-400'
                  }`}>
                    <input
                      type="checkbox"
                      checked={channels.amazon}
                      onChange={(e) => setChannels({ ...channels, amazon: e.target.checked })}
                      className="rounded bg-[#222428] border-white/20 text-blue-500 focus:ring-0"
                    />
                    <div>
                      <div className="font-bold text-white text-[11px]">Amazon Ads</div>
                      <div className="text-[9px] text-gray-400">Sponsored Brands</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Machine Learning Performance Projection */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/30 via-slate-900 to-black border border-emerald-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-300">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span>Proyección de Rendimiento Predictivo (Machine Learning)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-[11px] text-gray-400">Presupuesto mensual:</span>
                    <input
                      type="number"
                      value={monthlyBudget}
                      onChange={(e) => setMonthlyBudget(Number(e.target.value) || 0)}
                      className="w-24 px-2 py-0.5 rounded bg-black/50 border border-white/10 text-xs text-white font-mono text-right"
                    />
                    <span className="text-gray-400 font-mono text-xs">USD</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center bg-black/40 p-2.5 rounded-xl border border-white/5">
                  <div>
                    <div className="text-[10px] text-gray-400">ROAS Proyectado</div>
                    <div className="text-sm font-mono font-bold text-emerald-400">
                      {estimatedRoasMin}x — {estimatedRoasMax}x
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400">Ingresos Estimados</div>
                    <div className="text-sm font-mono font-bold text-white">
                      ${estimatedRevenueMin.toLocaleString()} - ${estimatedRevenueMax.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400">CPA Esperado</div>
                    <div className="text-sm font-mono font-bold text-white">
                      ${estimatedCpa.toFixed(2)} USD
                    </div>
                  </div>
                </div>
              </div>

              {/* Guardrails Verification Badge */}
              <div className="p-3 rounded-xl bg-[#202227] border border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-gray-300">
                    Auditoría de Guardrails de {brand.name}: <strong className="text-emerald-400">100% Validado</strong>
                  </span>
                </div>
                <span className="text-[10px] font-mono text-gray-400">
                  12 Formatos + 1 Video Veo Listos
                </span>
              </div>
            </>
          )}

        </div>

        {/* Modal Footer */}
        {!deployedSuccess && (
          <div className="px-6 py-4 border-t border-white/10 bg-[#141517] flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white hover:bg-white/5 transition"
            >
              Cancelar
            </button>

            <button
              onClick={handleLaunch}
              disabled={isDeploying}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-bold flex items-center space-x-2 shadow-lg shadow-blue-600/30 transition disabled:opacity-50"
            >
              {isDeploying ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-white" />
                  <span>Despachando Campaña con Vertex AI...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                  <span>⚡ Desplegar Campaña & Sincronizar Drive</span>
                </>
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
