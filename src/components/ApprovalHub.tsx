import React, { useState } from 'react';
import { 
  FullBrandContext, 
  CreativeFormat, 
  VideoSpec, 
  DeploymentRecord, 
  ApprovalStatus,
  StepNumber 
} from '../types';
import { generateAdsExports } from '../data/defaultDeployments';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Send, 
  Download, 
  Copy, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles, 
  FolderSync, 
  Mail, 
  Flame, 
  ChevronRight, 
  MessageSquare, 
  Check, 
  FileText, 
  Layers, 
  TrendingUp, 
  Building2, 
  Filter, 
  Search,
  DollarSign,
  Share2,
  Calendar,
  UserCheck,
  Zap,
  Globe
} from 'lucide-react';

interface ApprovalHubProps {
  brands: FullBrandContext[];
  activeBrandId: string;
  onSelectBrand: (brandId: string) => void;
  creatives: CreativeFormat[];
  video: VideoSpec;
  deployments: DeploymentRecord[];
  onApplyClientFeedback: (feedbackPrompt: string, brandId: string) => void;
  onOpenDrive: () => void;
  onOpenEmail: () => void;
}

export const ApprovalHub: React.FC<ApprovalHubProps> = ({
  brands,
  activeBrandId,
  onSelectBrand,
  creatives,
  video,
  deployments,
  onApplyClientFeedback,
  onOpenDrive,
  onOpenEmail
}) => {
  const [activeTab, setActiveTab] = useState<'approval' | 'exports' | 'history'>(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash.includes('tab=exports')) return 'exports';
      if (window.location.hash.includes('tab=history')) return 'history';
    }
    return 'approval';
  });
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [apiPushingId, setApiPushingId] = useState<string | null>(null);
  const [apiSuccessId, setApiSuccessId] = useState<string | null>(null);

  const activeBrand = brands.find(b => b.id === activeBrandId) || brands[0];
  const activeProduct = activeBrand.products[0] || { name: 'Producto Principal', price: 48, sku: 'SKU-01' };

  // Approval state per asset (combines 12 formats + 1 video)
  const [assetStatuses, setAssetStatuses] = useState<Record<string, { status: ApprovalStatus; note: string }>>(() => {
    const initial: Record<string, { status: ApprovalStatus; note: string }> = {};
    creatives.forEach((c, idx) => {
      initial[c.id] = {
        status: idx === 1 ? 'needs_revision' : 'approved',
        note: idx === 1 ? 'Cliente solicitó paleta cálida y sticker -20% OFF para evitar fatiga.' : 'Aprobado según lineamientos de marca.'
      };
    });
    initial[video.id] = {
      status: 'approved',
      note: 'Ritmo dinámico y música lo-fi aprobados para TikTok y Reels.'
    };
    return initial;
  });

  const [globalSignedOff, setGlobalSignedOff] = useState<boolean>(true);

  // Deliverables combined
  const allDeliverables = [
    {
      id: video.id,
      name: video.name,
      channel: 'TikTok & Reels',
      aspectRatio: '9:16 Vertical',
      thumbnailUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80',
      isVideo: true
    },
    ...creatives.map(c => ({
      id: c.id,
      name: c.name,
      channel: c.channel,
      aspectRatio: c.aspectRatio,
      thumbnailUrl: c.imageUrlV1,
      isVideo: false
    }))
  ];

  const filteredDeliverables = allDeliverables.filter(item => {
    if (filterStatus === 'all') return true;
    return assetStatuses[item.id]?.status === filterStatus;
  });

  const approvedCount = Object.values(assetStatuses).filter(s => s.status === 'approved').length;
  const needsRevisionCount = Object.values(assetStatuses).filter(s => s.status === 'needs_revision').length;
  const pendingCount = Object.values(assetStatuses).filter(s => s.status === 'pending').length;

  const handleStatusChange = (id: string, newStatus: ApprovalStatus) => {
    setAssetStatuses(prev => ({
      ...prev,
      [id]: { ...prev[id], status: newStatus }
    }));
  };

  const handleNoteChange = (id: string, noteText: string) => {
    setAssetStatuses(prev => ({
      ...prev,
      [id]: { ...prev[id], note: noteText }
    }));
  };

  const handleApproveAll = () => {
    const updated: Record<string, { status: ApprovalStatus; note: string }> = {};
    allDeliverables.forEach(item => {
      updated[item.id] = {
        status: 'approved',
        note: 'Aprobación oficial completa para despliegue publicitario.'
      };
    });
    setAssetStatuses(updated);
    setGlobalSignedOff(true);
  };

  const adsExports = generateAdsExports(activeBrand.name, activeProduct.name, activeBrand.clientEmail);

  const handleCopyPayload = (id: string, snippet: string) => {
    navigator.clipboard.writeText(snippet);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadFile = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePushApi = (exportId: string) => {
    setApiPushingId(exportId);
    setTimeout(() => {
      setApiPushingId(null);
      setApiSuccessId(exportId);
      setTimeout(() => setApiSuccessId(null), 3000);
    }, 1800);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0d0e12] overflow-y-auto">
      
      {/* Top Header Bar */}
      <div className="border-b border-[#282a2c] bg-[#141517]/95 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-20 backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <UserCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-bold text-white tracking-tight">Portal de Aprobación & Despacho de Campañas</h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30 font-semibold">
                Fase 4: Client Sign-Off & Ads API
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Validación legal de entregables, firma de cliente y exportación masiva a Google Ads, Meta y TikTok
            </p>
          </div>
        </div>

        {/* Brand Selector & Quick Actions */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-[#1e1f20] px-3 py-1.5 rounded-xl border border-white/10">
            <span className="text-xs text-gray-400 font-medium">Cliente:</span>
            <select
              value={activeBrandId}
              onChange={(e) => onSelectBrand(e.target.value)}
              className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer"
            >
              {brands.map((b) => (
                <option key={b.id} value={b.id} className="bg-[#1e1f20] text-white">
                  {b.name} ({b.clientContact.split('(')[0].trim()})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={onOpenDrive}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition"
          >
            <FolderSync className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Google Drive</span>
          </button>

          <button
            onClick={onOpenEmail}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 text-blue-300 border border-blue-500/30 text-xs font-semibold transition"
          >
            <Mail className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Enviar Notificación</span>
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6 max-w-7xl mx-auto w-full">

        {/* Executive Sign-Off Status Banner */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-blue-950/30 to-[#141517] border border-purple-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
              globalSignedOff 
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 shadow-lg shadow-emerald-500/10' 
                : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
            }`}>
              {globalSignedOff ? <ShieldCheck className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-sm font-bold text-white">
                  {globalSignedOff ? 'Campaña Oficialmente Aprobada para Publicación' : 'Revisión de Entregables en Proceso'}
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                  {approvedCount} de {allDeliverables.length} Aprobados
                </span>
              </div>
              <p className="text-xs text-gray-300 mt-0.5">
                Revisor Responsable: <strong className="text-white">{activeBrand.clientContact}</strong> • Contacto: <span className="font-mono text-purple-300">{activeBrand.clientEmail}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleApproveAll}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center space-x-1.5 shadow-lg shadow-emerald-600/30 transition"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Aprobar Todo el Paquete ({allDeliverables.length})</span>
            </button>
          </div>
        </div>

        {/* View Segment Tabs (3 Clear Modes) */}
        <div className="flex items-center space-x-2 border-b border-white/10 pb-3">
          <button
            onClick={() => setActiveTab('approval')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === 'approval'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <UserCheck className="w-4 h-4 text-purple-300" />
            <span>Portal de Aprobación de Cliente</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 text-white font-mono">
              {approvedCount}/{allDeliverables.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('exports')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === 'exports'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Download className="w-4 h-4 text-cyan-300" />
            <span>Despacho Masivo a Ads Managers</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 text-white font-mono">
              4 Plataformas
            </span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === 'history'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Calendar className="w-4 h-4 text-emerald-300" />
            <span>Historial de Despliegues & Auditoría</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 text-white font-mono">
              {deployments.length}
            </span>
          </button>
        </div>

        {/* TAB 1: CLIENT APPROVAL WORKFLOW */}
        {activeTab === 'approval' && (
          <div className="space-y-4">
            
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#15161a] p-3 rounded-xl border border-white/5 text-xs">
              <div className="flex items-center space-x-2">
                <span className="text-gray-400 font-medium flex items-center space-x-1">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Filtrar por Estado:</span>
                </span>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-[#1e1f20] text-gray-200 border border-white/10 px-2.5 py-1 rounded-lg focus:outline-none cursor-pointer"
                >
                  <option value="all">Todos los Entregables ({allDeliverables.length})</option>
                  <option value="approved">Aprobados ({approvedCount})</option>
                  <option value="needs_revision">Requieren Cambios ({needsRevisionCount})</option>
                  <option value="pending">Pendientes de Revisión ({pendingCount})</option>
                </select>
              </div>

              <div className="flex items-center space-x-4 text-[11px]">
                <span className="flex items-center space-x-1.5 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{approvedCount} Aprobados</span>
                </span>
                <span className="flex items-center space-x-1.5 text-amber-400 font-semibold">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{needsRevisionCount} Con Observaciones</span>
                </span>
              </div>
            </div>

            {/* Deliverables Grid with Review Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDeliverables.map((item) => {
                const currentStatus = assetStatuses[item.id]?.status || 'pending';
                const currentNote = assetStatuses[item.id]?.note || '';

                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl bg-[#16171b] border overflow-hidden flex flex-col justify-between transition-all duration-300 ${
                      currentStatus === 'approved'
                        ? 'border-emerald-500/40 ring-1 ring-emerald-500/20'
                        : currentStatus === 'needs_revision'
                        ? 'border-amber-500/40 ring-1 ring-amber-500/20'
                        : 'border-white/10'
                    }`}
                  >
                    <div>
                      {/* Thumbnail Preview */}
                      <div className="relative aspect-[16/10] bg-black overflow-hidden">
                        <img
                          src={item.thumbnailUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                        {/* Top Badges */}
                        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-black/70 backdrop-blur-md text-white border border-white/20">
                            {item.channel} • {item.aspectRatio}
                          </span>

                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center space-x-1 shadow-md ${
                            currentStatus === 'approved'
                              ? 'bg-emerald-600 text-white'
                              : currentStatus === 'needs_revision'
                              ? 'bg-amber-600 text-white animate-pulse'
                              : 'bg-white/20 text-gray-200'
                          }`}>
                            {currentStatus === 'approved' ? (
                              <>
                                <Check className="w-3 h-3" />
                                <span>Aprobado</span>
                              </>
                            ) : currentStatus === 'needs_revision' ? (
                              <>
                                <AlertCircle className="w-3 h-3" />
                                <span>Cambios Solicitados</span>
                              </>
                            ) : (
                              <span>Pendiente</span>
                            )}
                          </span>
                        </div>

                        <div className="absolute bottom-2 left-2.5 right-2.5">
                          <h4 className="text-xs font-bold text-white drop-shadow truncate">
                            {item.name}
                          </h4>
                        </div>
                      </div>

                      {/* Review & Feedback Section */}
                      <div className="p-3.5 space-y-3">
                        {/* Status Radio Buttons */}
                        <div className="flex items-center space-x-1.5 bg-black/40 p-1 rounded-xl border border-white/5">
                          <button
                            type="button"
                            onClick={() => handleStatusChange(item.id, 'approved')}
                            className={`flex-1 py-1 rounded-lg text-[10px] font-bold transition flex items-center justify-center space-x-1 ${
                              currentStatus === 'approved' ? 'bg-emerald-600 text-white shadow-sm' : 'text-gray-400 hover:text-white'
                            }`}
                          >
                            <Check className="w-3 h-3" />
                            <span>Aprobar</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleStatusChange(item.id, 'needs_revision')}
                            className={`flex-1 py-1 rounded-lg text-[10px] font-bold transition flex items-center justify-center space-x-1 ${
                              currentStatus === 'needs_revision' ? 'bg-amber-600 text-white shadow-sm' : 'text-gray-400 hover:text-white'
                            }`}
                          >
                            <AlertCircle className="w-3 h-3" />
                            <span>Observación</span>
                          </button>
                        </div>

                        {/* Feedback Note Input */}
                        <div className="space-y-1">
                          <label className="text-[10px] text-gray-400 font-medium flex items-center justify-between">
                            <span className="flex items-center space-x-1">
                              <MessageSquare className="w-3 h-3 text-purple-400" />
                              <span>Nota de Feedback del Cliente:</span>
                            </span>
                          </label>
                          <textarea
                            rows={2}
                            value={currentNote}
                            onChange={(e) => handleNoteChange(item.id, e.target.value)}
                            placeholder="Añadir comentario o solicitud de cambio..."
                            className="w-full p-2 rounded-lg bg-[#202226] border border-white/10 text-[11px] text-gray-200 focus:outline-none focus:border-purple-500 leading-snug resize-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Agent Action Button if needs revision */}
                    {currentStatus === 'needs_revision' && (
                      <div className="p-3 pt-0">
                        <button
                          onClick={() => onApplyClientFeedback(
                            `Aplicar cambio solicitado por cliente en ${item.name}: "${currentNote}". Re-calibrar paleta y tipografía.`,
                            activeBrandId
                          )}
                          className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-semibold flex items-center justify-center space-x-1.5 shadow-md shadow-amber-600/30 transition"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Re-Calibrar con Agente</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* TAB 2: ADS MANAGERS BULK EXPORTS */}
        {activeTab === 'exports' && (
          <div className="space-y-4">
            
            <div className="p-4 rounded-xl bg-[#16171b] border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span>Paquetes de Campaña Listos para Carga Masiva (Bulk Uploads)</span>
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Archivos CSV y JSON con el formato oficial de Google Ads Editor, Meta Marketing API y Amazon Advertising Console.
                </p>
              </div>

              <span className="text-xs font-mono px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                4 Conectores Oficiales
              </span>
            </div>

            {/* Export Platform Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {adsExports.map((exp) => (
                <div 
                  key={exp.id}
                  className="p-5 rounded-2xl bg-[#16171b] border border-white/10 space-y-3.5 flex flex-col justify-between hover:border-blue-500/40 transition"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="px-2.5 py-1 rounded-lg font-bold text-xs bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          {exp.platform}
                        </span>
                        <span className="text-xs font-mono text-gray-400 font-semibold">
                          Formato: {exp.format}
                        </span>
                      </div>

                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 flex items-center space-x-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        <span>API v21.0 Ready</span>
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-white">{exp.campaignType}</h4>
                      <p className="text-xs text-gray-300 mt-1 leading-relaxed">{exp.summary}</p>
                    </div>

                    {/* Code Snippet Preview */}
                    <div className="rounded-xl bg-black/60 border border-white/5 p-3 overflow-x-auto">
                      <pre className="text-[10px] font-mono text-gray-300 leading-tight">
                        {exp.payloadSnippet.split('\n').slice(0, 7).join('\n')}
                        {exp.payloadSnippet.split('\n').length > 7 && '\n...'}
                      </pre>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleCopyPayload(exp.id, exp.payloadSnippet)}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium flex items-center space-x-1.5 transition"
                    >
                      {copiedId === exp.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId === exp.id ? 'Copiado' : 'Copiar'}</span>
                    </button>

                    <button
                      onClick={() => handleDownloadFile(exp.downloadFilename, exp.payloadSnippet)}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-md shadow-blue-600/30 transition"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Descargar {exp.format}</span>
                    </button>

                    <button
                      onClick={() => handlePushApi(exp.id)}
                      disabled={apiPushingId === exp.id}
                      className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-md shadow-purple-600/30 transition disabled:opacity-50"
                    >
                      {apiPushingId === exp.id ? (
                        <>
                          <Sparkles className="w-3.5 h-3.5 animate-spin text-white" />
                          <span>Pushing...</span>
                        </>
                      ) : apiSuccessId === exp.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>¡Desplegado!</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                          <span>Push Directo API</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 3: DEPLOYMENT HISTORY & AUDIT LOG */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            
            <div className="p-4 rounded-xl bg-[#16171b] border border-white/5 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  <span>Historial de Despliegues & Registro de Auditoría</span>
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Registro inmutable de campañas lanzadas, presupuestos asignados y estado de aprobación cliente.
                </p>
              </div>

              <span className="text-xs font-mono px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                {deployments.length} Registros Auditados
              </span>
            </div>

            {/* Deployments Table */}
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#16171b]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#1c1d22] text-gray-400 font-semibold border-b border-white/10">
                  <tr>
                    <th className="py-3 px-4">Campaña & Marca</th>
                    <th className="py-3 px-3">Producto / SKU</th>
                    <th className="py-3 px-3">Hook Principal</th>
                    <th className="py-3 px-3 text-right">Presupuesto</th>
                    <th className="py-3 px-3 text-right">ROAS Proyectado</th>
                    <th className="py-3 px-3 text-center">Aprobación</th>
                    <th className="py-3 px-3 text-center">Estado</th>
                    <th className="py-3 px-4 text-right">Fecha & Responsable</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {deployments.map((d) => (
                    <tr key={d.id} className="hover:bg-white/5 transition">
                      
                      {/* Campaign Name */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-white">{d.campaignName}</div>
                        <div className="text-[10px] text-gray-400 mt-0.5 flex items-center space-x-1">
                          <Building2 className="w-3 h-3 text-purple-400" />
                          <span>{d.brandName}</span>
                        </div>
                      </td>

                      {/* Product */}
                      <td className="py-3.5 px-3">
                        <div className="text-gray-200 font-medium">{d.productName}</div>
                        <div className="text-[10px] font-mono text-gray-500">{d.productSku}</div>
                      </td>

                      {/* Hook */}
                      <td className="py-3.5 px-3 max-w-xs">
                        <div className="text-gray-300 text-[11px] line-clamp-1 italic">
                          "{d.primaryHook}"
                        </div>
                        <div className="text-[9px] text-blue-400 mt-0.5 font-mono">
                          {d.channels.join(' • ')}
                        </div>
                      </td>

                      {/* Budget */}
                      <td className="py-3.5 px-3 text-right font-mono text-white font-bold">
                        ${d.budget.toLocaleString()} USD
                      </td>

                      {/* Projected ROAS */}
                      <td className="py-3.5 px-3 text-right font-mono text-emerald-400 font-bold">
                        {d.projectedRoas}
                      </td>

                      {/* Approval Status */}
                      <td className="py-3.5 px-3 text-center">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 inline-flex items-center space-x-1">
                          <Check className="w-3 h-3" />
                          <span>Aprobado</span>
                        </span>
                      </td>

                      {/* Deployment Status */}
                      <td className="py-3.5 px-3 text-center">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-500/15 text-blue-300 border border-blue-500/30">
                          {d.status === 'deployed' ? 'Publicado' : 'Activo'}
                        </span>
                      </td>

                      {/* Date & Responsible */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="text-gray-300 font-mono text-[11px]">{d.deployedAt}</div>
                        <div className="text-[10px] text-gray-500">{d.deployedBy}</div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
