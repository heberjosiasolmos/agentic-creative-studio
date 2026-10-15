import React, { useState } from 'react';
import { Mail, CheckCircle2, X, Send, Copy, Check, ExternalLink, ShieldCheck } from 'lucide-react';
import { BrandProfile } from '../utils/brandEngine';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDrive: () => void;
  brand?: BrandProfile;
}

export const EmailModal: React.FC<EmailModalProps> = ({ 
  isOpen, 
  onClose, 
  onOpenDrive,
  brand = {
    name: "Lumière Botanics",
    domain: "lumiere-botanics.com",
    productName: "Glow Serum Bio-Activo",
    industry: "skincare",
    clientEmail: "marketing.lead@lumiere-botanics.com",
    clientContact: "Sofía Martínez",
    primaryEmoji: "🧴",
    accentV1: "#2dd4bf",
    accentV2: "#f59e0b",
    gradientV1: "",
    gradientV2: ""
  }
}) => {
  const [copied, setCopied] = useState(false);
  const [sentNotice, setSentNotice] = useState(false);

  if (!isOpen) return null;

  const emailSubject = `✨ [Aprobación Campaña Q4] 12 Formatos Multicanal + 1 Video Veo (10s) Listos en Drive — ${brand.name}`;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(`Asunto: ${emailSubject}\nPara: ${brand.clientEmail}\n\nEstimado ${brand.clientContact},\n\nConforme a lo solicitado, nuestro Agente Creativo de Google Cloud ha procesado y adaptado la suite completa de creativos para el lanzamiento de la Campaña Q4 para ${brand.productName}.\n\nSe han generado 12 formatos de imagen optimizados para cada canal (Meta, TikTok, Google Display, YouTube, Pinterest) y 1 video cinemático vertical de 10 segundos renderizado con Google Veo.\n\nAdicionalmente, se aplicaron todos los ajustes solicitados:\n1. Calibración a paleta cálida y dorada (Golden Hour).\n2. Integración de llamadas de urgencia con el cupón '-20% OFF'.\n3. Reencuadre y enfoque optimizado para conversión.\n\nPuedes revisar todos los archivos organizados por canal en la siguiente carpeta compartida de Google Drive:\nhttps://drive.google.com/drive/folders/18kZ-${brand.name.toUpperCase().replace(/\s+/g, '-')}-Q4-CAMPAIGN\n\nQuedamos atentos a su visto bueno final para proceder a la carga en Google Ads y Meta Ads Manager.`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResend = () => {
    setSentNotice(true);
    setTimeout(() => setSentNotice(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#1e1f20] border border-[#3c4043] rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#2d2f31] flex items-center justify-between bg-[#18191b]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-google font-bold text-base text-white">Gmail Dispatcher Agent</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold border border-emerald-500/30 flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Enviado vía Gmail API</span>
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Confirmación de entrega despachada al cliente automáticamente
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

        {/* Email Meta Bar */}
        <div className="px-6 py-3 bg-[#131314] border-b border-[#282a2c] space-y-1.5 text-xs font-mono">
          <div className="flex items-center justify-between text-gray-300">
            <div className="flex items-center space-x-2">
              <span className="text-gray-400">De:</span>
              <span className="text-blue-300">creative-agent@mindgruve-cloud.google.com</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <span className="text-gray-400">Hoy, 10:28 AM</span>
          </div>

          <div className="flex items-center space-x-2 text-gray-300">
            <span className="text-gray-400">Para:</span>
            <span className="text-white font-medium">{brand.clientEmail}</span>
            <span className="text-gray-400 font-sans text-[11px]">({brand.clientContact})</span>
          </div>

          <div className="flex items-center space-x-2 text-gray-400">
            <span>CC:</span>
            <span>heber@mindgruve.com, ads-operations@mindgruve.com</span>
          </div>

          <div className="pt-1 flex items-center space-x-2 text-white font-medium font-sans">
            <span className="text-gray-400 font-mono text-xs">Asunto:</span>
            <span className="text-sm">{emailSubject}</span>
          </div>
        </div>

        {/* Email Body Content */}
        <div className="p-6 overflow-y-auto flex-1 text-sm text-gray-300 space-y-4 leading-relaxed font-sans bg-[#1a1b1d]">
          <p>
            Estimado <strong>{brand.clientContact}</strong>,
          </p>

          <p>
            Conforme a lo acordado en nuestra sesión de hoy, nuestro <strong>Agente Creativo de Google Cloud</strong> ha concluido la generación, adaptación multicanal y clasificación de los activos para la <strong>Campaña Q4 de {brand.name} ({brand.productName})</strong>.
          </p>

          <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Resumen de la Entrega:
            </div>
            <ul className="text-xs space-y-1 text-gray-300 list-disc list-inside">
              <li><strong>12 Formatos de Imagen</strong> (Meta Feed 1:1, Stories 9:16, TikTok 9:16, Google Display 300x250, 728x90, 300x600, Carruseles y Pinterest) generados con <em>Imagen 3</em>.</li>
              <li><strong>1 Video Cinemático Vertical de 10 segundos</strong> sintetizado a 60 FPS con <em>Google Veo (VideoFX)</em>.</li>
              <li><strong>Cambios Solicitados Aplicados (v2)</strong>: Balance de color más cálido (Sunset Glow), inclusión de badges y copys de urgencia <em>"-20% OFF en primera orden"</em> y reencuadre dinámico.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-semibold text-white text-xs">Carpeta de Google Drive Lista:</div>
              <div className="text-[11px] text-emerald-300 font-mono truncate max-w-sm">
                /Campaña Q4 — {brand.name} (13 Activos Clasificados)
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenDrive();
              }}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium flex items-center space-x-1.5 shadow-md shadow-emerald-600/30 transition"
            >
              <span>Ver en Drive</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs text-gray-400">
            Agradecemos su pronta confirmación o visto bueno por este medio para proceder con la sincronización directa a las cuentas publicitarias de Google Ads y Meta Ads.
          </p>

          <div className="pt-2 border-t border-white/10 text-xs text-gray-400">
            <div className="font-semibold text-white">Equipo de Data & Creatividad Agentica</div>
            <div>Google Cloud Summit Demo Edition • Mindgruve Lab</div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-3 border-t border-[#2d2f31] bg-[#18191b] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyEmail}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-gray-300 border border-white/10 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado al Portapapeles' : 'Copiar Texto'}</span>
            </button>

            <button
              onClick={handleResend}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs transition"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{sentNotice ? '¡Correo Reenviado!' : 'Reenviar Notificación'}</span>
            </button>
          </div>

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
