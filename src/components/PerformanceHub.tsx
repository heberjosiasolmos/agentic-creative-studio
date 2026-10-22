import React, { useState } from 'react';
import { 
  FullBrandContext, 
  BrandAnalyticsData, 
  CreativePerformanceItem, 
  SearchTermInsight,
  StepNumber 
} from '../types';
import { 
  TrendingUp, 
  AlertTriangle, 
  Sparkles, 
  Flame, 
  Search, 
  Layers, 
  DollarSign, 
  Percent, 
  Target, 
  Eye, 
  ArrowUpRight, 
  Activity, 
  Filter, 
  CheckCircle2, 
  Clock, 
  RefreshCw,
  ExternalLink,
  Zap,
  BarChart3,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface PerformanceHubProps {
  brands: FullBrandContext[];
  activeBrandId: string;
  onSelectBrand: (brandId: string) => void;
  analyticsData: BrandAnalyticsData;
  onIterateCreative: (prompt: string, brandId: string, stepOverride?: StepNumber) => void;
}

export const PerformanceHub: React.FC<PerformanceHubProps> = ({
  brands,
  activeBrandId,
  onSelectBrand,
  analyticsData,
  onIterateCreative
}) => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'search_terms' | 'channels'>(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash.includes('tab=search')) return 'search_terms';
      if (window.location.hash.includes('tab=channels')) return 'channels';
    }
    return 'matrix';
  });
  const [channelFilter, setChannelFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [timeframe, setTimeframe] = useState<string>('14d');

  const activeBrand = brands.find(b => b.id === activeBrandId) || brands[0];

  // Filtered creatives
  const filteredCreatives = analyticsData.creatives.filter(c => {
    if (channelFilter !== 'all' && c.channel !== channelFilter) return false;
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    return true;
  });

  // Calculate quick stats
  const fatiguedCount = analyticsData.creatives.filter(c => c.status === 'fatigued').length;
  const topPerformerCount = analyticsData.creatives.filter(c => c.status === 'top_performer').length;
  const scalingCount = analyticsData.creatives.filter(c => c.status === 'scaling').length;

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0d0e12] overflow-y-auto">
      
      {/* Top Header Bar */}
      <div className="border-b border-[#282a2c] bg-[#141517]/95 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-20 backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/20">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-bold text-white tracking-tight">Performance & Creative Intelligence</h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                Live Feedback Loop
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Datos omnicanal (Google Ads, Meta, TikTok, Amazon) sincronizados con Gemini 2.0 e Imagen 3
            </p>
          </div>
        </div>

        {/* Brand Selector & Timeframe */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-[#1e1f20] px-3 py-1.5 rounded-xl border border-white/10">
            <span className="text-xs text-gray-400 font-medium">Marca:</span>
            <select
              value={activeBrandId}
              onChange={(e) => onSelectBrand(e.target.value)}
              className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer"
            >
              {brands.map((b) => (
                <option key={b.id} value={b.id} className="bg-[#1e1f20] text-white">
                  {b.name} ({b.industry})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center bg-[#1e1f20] p-1 rounded-xl border border-white/10 text-xs">
            <button
              onClick={() => setTimeframe('7d')}
              className={`px-2.5 py-1 rounded-lg transition ${timeframe === '7d' ? 'bg-white/15 text-white font-semibold' : 'text-gray-400 hover:text-white'}`}
            >
              7d
            </button>
            <button
              onClick={() => setTimeframe('14d')}
              className={`px-2.5 py-1 rounded-lg transition ${timeframe === '14d' ? 'bg-white/15 text-white font-semibold' : 'text-gray-400 hover:text-white'}`}
            >
              14d
            </button>
            <button
              onClick={() => setTimeframe('30d')}
              className={`px-2.5 py-1 rounded-lg transition ${timeframe === '30d' ? 'bg-white/15 text-white font-semibold' : 'text-gray-400 hover:text-white'}`}
            >
              30d
            </button>
          </div>

          <div className="hidden lg:flex items-center space-x-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1.5 rounded-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>BigQuery & Vertex AI Feature Store</span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6 max-w-7xl mx-auto w-full">

        {/* Global KPIs Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          <div className="p-4 rounded-2xl bg-[#16171b] border border-white/5 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-xs text-gray-400 font-medium">
              <span>Inversión Total ({timeframe})</span>
              <DollarSign className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-white font-mono">
              ${analyticsData.totalSpend.toLocaleString()} <span className="text-xs text-gray-400 font-normal">USD</span>
            </div>
            <div className="flex items-center space-x-1 text-[11px] text-emerald-400 font-medium">
              <ArrowUpRight className="w-3 h-3" />
              <span>+12.4% vs periodo anterior</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#16171b] border border-white/5 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-xs text-gray-400 font-medium">
              <span>ROAS Blended</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-emerald-400 font-mono">
              {analyticsData.blendedRoas.toFixed(2)}x
            </div>
            <div className="text-[11px] text-gray-400">
              Ingresos: <strong className="text-gray-200 font-mono">${analyticsData.totalRevenue.toLocaleString()}</strong>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#16171b] border border-white/5 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-xs text-gray-400 font-medium">
              <span>CPA Promedio</span>
              <Target className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-white font-mono">
              ${analyticsData.avgCpa.toFixed(2)} <span className="text-xs text-gray-400 font-normal">USD</span>
            </div>
            <div className="text-[11px] text-gray-400">
              CTR Promedio: <strong className="text-purple-300 font-mono">{analyticsData.avgCtr}%</strong>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#16171b] border border-white/5 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-xs text-gray-400 font-medium">
              <span>Salud Creativa</span>
              <ShieldCheck className="w-4 h-4 text-amber-400" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-amber-400 font-mono">
                {analyticsData.creativeHealthScore}/100
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 font-semibold">
                {fatiguedCount > 0 ? `${fatiguedCount} Fatigado(s)` : 'Óptimo'}
              </span>
            </div>
            <div className="text-[11px] text-gray-400 flex items-center space-x-2">
              <span>Top: <strong className="text-emerald-400">{topPerformerCount}</strong></span>
              <span>•</span>
              <span>Escalando: <strong className="text-blue-400">{scalingCount}</strong></span>
            </div>
          </div>

        </div>

        {/* Gemini AI Strategic Recommendations Banner */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/40 via-purple-950/40 to-slate-900 border border-blue-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-semibold text-blue-300">
              <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
              <span>Diagnóstico Agéntico & Acciones Recomendadas por Gemini 2.0 Flash:</span>
            </div>
            <span className="text-[10px] font-mono text-gray-400">
              Motor de Inferencia Creativa v2.4
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {analyticsData.aiStrategicInsights.map((insight) => (
              <div 
                key={insight.id} 
                className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between space-y-3 hover:border-blue-500/40 transition group"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-1.5">
                    {insight.type === 'critical' ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center space-x-1">
                        <Flame className="w-2.5 h-2.5 text-rose-400" />
                        <span>Alerta Fatiga</span>
                      </span>
                    ) : insight.type === 'opportunity' ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center space-x-1">
                        <Search className="w-2.5 h-2.5 text-blue-400" />
                        <span>Oportunidad</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center space-x-1">
                        <TrendingUp className="w-2.5 h-2.5 text-emerald-400" />
                        <span>Escalar Ganador</span>
                      </span>
                    )}
                    <h3 className="text-xs font-bold text-white group-hover:text-blue-300 transition line-clamp-1">
                      {insight.title}
                    </h3>
                  </div>

                  <p className="text-[11px] text-gray-300 leading-relaxed">
                    {insight.description}
                  </p>

                  <div className="text-[10px] font-mono text-amber-300/90 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">
                    💡 Impacto: {insight.metricImpact}
                  </div>
                </div>

                <button
                  onClick={() => onIterateCreative(
                    insight.promptToExecute, 
                    activeBrandId, 
                    insight.type === 'critical' ? 2 : 1
                  )}
                  className="w-full mt-2 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center space-x-1.5 shadow-md shadow-blue-600/30 transition"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{insight.actionLabel}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Tabs for Views */}
        <div className="flex items-center space-x-2 border-b border-white/10 pb-3">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === 'matrix'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Flame className="w-4 h-4 text-orange-400" />
            <span>Matriz de Creativos & Fatiga</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 text-white font-mono">
              {analyticsData.creatives.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('search_terms')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === 'search_terms'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Search className="w-4 h-4 text-cyan-400" />
            <span>Minería de Search Terms a Creativos</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 text-white font-mono">
              {analyticsData.searchTerms.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('channels')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === 'channels'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <span>Rendimiento por Canal Omnicanal</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 text-white font-mono">
              {analyticsData.channels.length}
            </span>
          </button>
        </div>

        {/* TAB 1: CREATIVE FATIGUE MATRIX */}
        {activeTab === 'matrix' && (
          <div className="space-y-4">
            
            {/* Filters Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#15161a] p-3 rounded-xl border border-white/5 text-xs">
              <div className="flex items-center space-x-2">
                <span className="text-gray-400 font-medium flex items-center space-x-1">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Filtrar Canal:</span>
                </span>
                <select
                  value={channelFilter}
                  onChange={(e) => setChannelFilter(e.target.value)}
                  className="bg-[#1e1f20] text-gray-200 border border-white/10 px-2.5 py-1 rounded-lg focus:outline-none"
                >
                  <option value="all">Todos los Canales</option>
                  <option value="Meta Ads">Meta Ads</option>
                  <option value="Google Ads">Google Ads</option>
                  <option value="TikTok">TikTok</option>
                  <option value="Amazon Ads">Amazon Ads</option>
                </select>

                <span className="text-gray-400 font-medium ml-2">Estado:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-[#1e1f20] text-gray-200 border border-white/10 px-2.5 py-1 rounded-lg focus:outline-none"
                >
                  <option value="all">Todos los Estados</option>
                  <option value="top_performer">Top Performer (Escalar)</option>
                  <option value="scaling">Escalando</option>
                  <option value="fatigued">Fatigados (Requieren Renovación)</option>
                  <option value="testing">En Fase de Prueba</option>
                </select>
              </div>

              <div className="flex items-center space-x-3 text-[11px] text-gray-400">
                <span className="flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Saludable (&lt;40%)</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Precaución (40-75%)</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span>Fatiga Crítica (&gt;75%)</span>
                </span>
              </div>
            </div>

            {/* Creatives Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredCreatives.map((creative) => {
                const isFatigued = creative.status === 'fatigued';
                const isTop = creative.status === 'top_performer';

                return (
                  <div
                    key={creative.id}
                    className={`rounded-2xl bg-[#16171b] border overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl ${
                      isFatigued
                        ? 'border-rose-500/40 hover:border-rose-400 ring-1 ring-rose-500/20'
                        : isTop
                        ? 'border-emerald-500/40 hover:border-emerald-400 ring-1 ring-emerald-500/20'
                        : 'border-white/10 hover:border-blue-500/40'
                    }`}
                  >
                    <div>
                      {/* Image Preview & Badges */}
                      <div className="relative aspect-[4/3] bg-black/60 overflow-hidden">
                        <img
                          src={creative.thumbnailUrl}
                          alt={creative.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                        {/* Top Badges */}
                        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-black/70 backdrop-blur-md text-white border border-white/20">
                            {creative.channel} • {creative.aspectRatio}
                          </span>

                          {isFatigued ? (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-600/90 text-white flex items-center space-x-1 shadow-md shadow-rose-600/30 animate-pulse">
                              <Flame className="w-3 h-3" />
                              <span>Fatigado ({creative.fatigueScore}%)</span>
                            </span>
                          ) : isTop ? (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-600/90 text-white flex items-center space-x-1 shadow-md shadow-emerald-600/30">
                              <TrendingUp className="w-3 h-3" />
                              <span>Top Performer</span>
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-600/80 text-white">
                              Escalando
                            </span>
                          )}
                        </div>

                        {/* Title on Image Bottom */}
                        <div className="absolute bottom-2 left-2.5 right-2.5">
                          <h4 className="text-xs font-bold text-white drop-shadow-md truncate">
                            {creative.name}
                          </h4>
                        </div>
                      </div>

                      {/* Content & Metrics */}
                      <div className="p-3.5 space-y-3">
                        {/* Metrics Grid */}
                        <div className="grid grid-cols-3 gap-2 text-center bg-black/30 p-2 rounded-xl border border-white/5">
                          <div>
                            <div className="text-[10px] text-gray-400">ROAS</div>
                            <div className={`text-xs font-mono font-bold ${creative.roas >= 4 ? 'text-emerald-400' : 'text-amber-400'}`}>
                              {creative.roas.toFixed(2)}x
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] text-gray-400">CTR</div>
                            <div className="text-xs font-mono font-bold text-white">
                              {creative.ctr}%
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] text-gray-400">CPA</div>
                            <div className="text-xs font-mono font-bold text-white">
                              ${creative.cpa.toFixed(1)}
                            </div>
                          </div>
                        </div>

                        {/* Fatigue Meter */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-[10px]">
                            <span className="text-gray-400 flex items-center space-x-1">
                              <span>Frecuencia:</span>
                              <strong className="text-gray-200 font-mono">{creative.frequency}x</strong>
                            </span>
                            <span className={`font-mono font-bold ${
                              creative.fatigueScore > 75 ? 'text-rose-400' :
                              creative.fatigueScore > 40 ? 'text-amber-400' : 'text-emerald-400'
                            }`}>
                              Fatiga: {creative.fatigueScore}%
                            </span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                creative.fatigueScore > 75 ? 'bg-rose-500' :
                                creative.fatigueScore > 40 ? 'bg-amber-400' : 'bg-emerald-400'
                              }`}
                              style={{ width: `${creative.fatigueScore}%` }}
                            />
                          </div>
                        </div>

                        {/* Hook & Recommendation */}
                        <div className="space-y-1 text-[11px]">
                          <div className="text-gray-400">
                            <span className="text-blue-400 font-medium">Hook:</span> {creative.winningHook}
                          </div>
                          <div className="text-gray-300 italic bg-white/5 p-2 rounded-lg border border-white/5">
                            ⚡ {creative.recommendedAction}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Agent Action Button */}
                    <div className="p-3 pt-0">
                      <button
                        onClick={() => onIterateCreative(
                          creative.suggestedPrompt,
                          activeBrandId,
                          isFatigued ? 2 : 1
                        )}
                        className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 shadow-md transition ${
                          isFatigued
                            ? 'bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white shadow-rose-600/30'
                            : isTop
                            ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-600/30'
                            : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30'
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>
                          {isFatigued 
                            ? '✨ Generar Variación Anti-Fatiga' 
                            : isTop 
                            ? '✨ Escalar Hook en Studio' 
                            : '✨ Iterar con Gemini'}
                        </span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* TAB 2: SEARCH TERM INTELLIGENCE */}
        {activeTab === 'search_terms' && (
          <div className="space-y-4">
            
            <div className="p-4 rounded-xl bg-[#16171b] border border-white/5 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <Search className="w-4 h-4 text-cyan-400" />
                  <span>Minería de Términos de Búsqueda de Alta Conversión</span>
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Consultas reales de usuarios en Google Search y Amazon Ads listas para transformarse en creativos hiper-específicos.
                </p>
              </div>

              <span className="text-xs font-mono px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                {analyticsData.searchTerms.length} Oportunidades Detectadas
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#16171b]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#1c1d22] text-gray-400 font-semibold border-b border-white/10">
                  <tr>
                    <th className="py-3 px-4">Término de Búsqueda (Search Query)</th>
                    <th className="py-3 px-3">Canal & Intención</th>
                    <th className="py-3 px-3 text-right">Impresiones</th>
                    <th className="py-3 px-3 text-right">CTR</th>
                    <th className="py-3 px-3 text-right">ROAS</th>
                    <th className="py-3 px-3 text-center">Estado de Cobertura</th>
                    <th className="py-3 px-4 text-right">Acción Agéntica</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {analyticsData.searchTerms.map((st) => (
                    <tr key={st.id} className="hover:bg-white/5 transition">
                      
                      {/* Query */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-white flex items-center space-x-2">
                          <span className="text-blue-400">"</span>
                          <span>{st.term}</span>
                          <span className="text-blue-400">"</span>
                        </div>
                        <div className="text-[10px] text-gray-400 mt-0.5 line-clamp-1">
                          Recomendación: {st.suggestedPrompt}
                        </div>
                      </td>

                      {/* Channel & Intent */}
                      <td className="py-3.5 px-3">
                        <div className="flex flex-col space-y-1">
                          <span className="font-mono text-gray-300 font-medium">
                            {st.channel}
                          </span>
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono w-max bg-purple-500/15 text-purple-300 border border-purple-500/25">
                            {st.intentCategory === 'ingredient_focus' ? 'Foco en Activo' :
                             st.intentCategory === 'problem_solution' ? 'Dolor / Solución' :
                             st.intentCategory === 'comparison' ? 'Comparativa' : 'Urgencia / Descuento'}
                          </span>
                        </div>
                      </td>

                      {/* Impressions */}
                      <td className="py-3.5 px-3 text-right font-mono text-gray-300">
                        {st.impressions.toLocaleString()}
                      </td>

                      {/* CTR */}
                      <td className="py-3.5 px-3 text-right font-mono text-emerald-400 font-semibold">
                        {st.ctr}%
                      </td>

                      {/* ROAS */}
                      <td className="py-3.5 px-3 text-right font-mono font-bold text-emerald-400">
                        {st.roas.toFixed(2)}x
                      </td>

                      {/* Coverage Status */}
                      <td className="py-3.5 px-3 text-center">
                        {st.coverageStatus === 'uncovered' ? (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30">
                            Sin Creativo Dedicado
                          </span>
                        ) : st.coverageStatus === 'low_relevance' ? (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                            Relevancia Media
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                            Cubierto
                          </span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => onIterateCreative(st.suggestedPrompt, activeBrandId, 1)}
                          className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-semibold flex items-center space-x-1.5 ml-auto shadow-md shadow-blue-600/30 transition"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>Crear Anuncio</span>
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* TAB 3: CHANNELS BREAKDOWN */}
        {activeTab === 'channels' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analyticsData.channels.map((chan, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-[#16171b] border border-white/5 space-y-4 hover:border-white/10 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                      {chan.channel.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{chan.channel}</h4>
                      <p className="text-[11px] text-gray-400">
                        {chan.activeCreatives} creativos activos • {chan.fatiguedCreatives} con fatiga
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-base font-bold text-emerald-400 font-mono">
                      {chan.roas.toFixed(2)}x ROAS
                    </div>
                    <div className="text-[11px] text-gray-400 font-mono">
                      ${chan.spend.toLocaleString()} invertidos
                    </div>
                  </div>
                </div>

                {/* Progress bar of ROAS */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-gray-400">
                    <span>Eficiencia de Retorno:</span>
                    <span className="font-mono text-gray-200">{chan.conversions} conversiones</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full"
                      style={{ width: `${Math.min(100, (chan.roas / 6) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-gray-400">Estado de Saturación:</span>
                  {chan.fatiguedCreatives > 0 ? (
                    <span className="text-rose-400 font-medium flex items-center space-x-1">
                      <Flame className="w-3.5 h-3.5" />
                      <span>{chan.fatiguedCreatives} anuncio(s) requieren rotación</span>
                    </span>
                  ) : (
                    <span className="text-emerald-400 font-medium flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Rendimiento Óptimo</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
};
