import React, { useState } from 'react';
import { MOCK_CREATIVES, MOCK_VIDEO } from '../data/mockCreatives';
import { 
  FolderSync, 
  Folder, 
  FileImage, 
  Film, 
  ExternalLink, 
  Copy, 
  Check, 
  X, 
  CheckCircle2, 
  HardDrive,
  Download
} from 'lucide-react';

interface DriveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DriveModal: React.FC<DriveModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<string>('all');

  if (!isOpen) return null;

  const folders = [
    { id: 'all', name: 'Todos los Activos (13)', count: 13 },
    { id: '01_Social_Vertical', name: '📁 01_Social_Vertical (4)', count: 4 },
    { id: '02_Display_Banners', name: '📁 02_Display_Banners (3)', count: 3 },
    { id: '03_Feeds_and_Carousels', name: '📁 03_Feeds_and_Carousels (5)', count: 5 },
    { id: '04_Video_Veo_Master', name: '📁 04_Video_Veo_Master (1)', count: 1 },
  ];

  const filteredCreatives = selectedFolder === 'all' 
    ? MOCK_CREATIVES 
    : MOCK_CREATIVES.filter(c => c.drivePath.startsWith(selectedFolder));

  const showVideo = selectedFolder === 'all' || selectedFolder === '04_Video_Veo_Master';

  const driveUrl = "https://drive.google.com/drive/folders/18kZ-LUMIERE-BOTANICS-Q4-CAMPAIGN";

  const handleCopy = () => {
    navigator.clipboard.writeText(driveUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#1e1f20] border border-[#3c4043] rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#2d2f31] flex items-center justify-between bg-[#18191b]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <FolderSync className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-google font-bold text-base text-white">Google Drive Workspace Agent</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold border border-emerald-500/30 flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Sincronizado (13 Activos)</span>
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Carpeta: <code className="text-gray-300 font-mono">/Google Drive/Clientes/Lumière Botanics/Campaña Q4/</code>
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

        {/* Drive URL bar */}
        <div className="px-6 py-3 bg-[#131314] border-b border-[#282a2c] flex items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-xs text-gray-300 font-mono flex-1 truncate">
            <HardDrive className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="truncate">{driveUrl}</span>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1 px-3 py-1 rounded-md bg-white/5 hover:bg-white/10 text-xs text-gray-200 border border-white/10 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado' : 'Copiar Enlace'}</span>
            </button>

            <a
              href="#open"
              onClick={(e) => { e.preventDefault(); alert("Enlace compartido de Google Drive generado con permisos de visualización para el cliente."); }}
              className="flex items-center space-x-1 px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-500 text-xs text-white font-medium transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Abrir Drive</span>
            </a>
          </div>
        </div>

        {/* Content Explorer */}
        <div className="p-6 overflow-y-auto flex-1 flex flex-col md:flex-row gap-6">
          {/* Folders navigation */}
          <div className="w-full md:w-60 shrink-0 space-y-1">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Estructura de Carpetas</h4>
            {folders.map(f => (
              <button
                key={f.id}
                onClick={() => setSelectedFolder(f.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition ${
                  selectedFolder === f.id
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2 truncate">
                  <Folder className="w-4 h-4 shrink-0" />
                  <span className="truncate">{f.name}</span>
                </div>
              </button>
            ))}

            <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/5 space-y-1 text-xs text-gray-400">
              <div className="font-semibold text-gray-200">Resumen de Clasificación</div>
              <p>• 12 Imágenes PNG High-Res</p>
              <p>• 1 Video Veo 10s MP4 4K</p>
              <p>• Peso total: 36.2 MB</p>
            </div>
          </div>

          {/* Files List */}
          <div className="flex-1 space-y-2">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Archivos en la Carpeta ({filteredCreatives.length + (showVideo ? 1 : 0)})
            </h4>

            {/* Video entry if matched */}
            {showVideo && (
              <div className="p-3 rounded-xl bg-[#282a2c]/60 border border-purple-500/20 flex items-center justify-between hover:bg-[#282a2c] transition">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center">
                    <Film className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white flex items-center space-x-2">
                      <span>Veo_10s_Vertical_Master_4K.mp4</span>
                      <span className="px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 text-[9px] font-mono">Google Veo</span>
                    </div>
                    <p className="text-[10px] text-gray-400 font-mono">1080x1920 • 60 FPS • 14.2 MB • H.265</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-[10px] text-emerald-400 flex items-center space-x-1 font-mono">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Listo</span>
                  </span>
                </div>
              </div>
            )}

            {/* Images list */}
            {filteredCreatives.map(c => (
              <div 
                key={c.id}
                className="p-3 rounded-xl bg-[#282a2c]/60 border border-[#3c4043]/50 flex items-center justify-between hover:bg-[#282a2c] transition"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <FileImage className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">
                      {c.drivePath.split('/')[1]}
                    </div>
                    <p className="text-[10px] text-gray-400 font-mono">
                      {c.name} • {c.dimensions} • {c.fileSize} • {c.model}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-[10px] text-emerald-400 flex items-center space-x-1 font-mono">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Listo</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-[#2d2f31] bg-[#18191b] flex items-center justify-between text-xs text-gray-400">
          <span>Permisos: Cualquiera con el enlace puede ver y descargar</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-medium transition"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
