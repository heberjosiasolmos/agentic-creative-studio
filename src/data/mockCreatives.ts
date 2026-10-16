import { CreativeFormat, VideoSpec } from '../types';
import { parseBrandFromUrl, generateDynamicCreatives } from '../utils/brandEngine';

export const INITIAL_URL = "https://lumiere-botanics.com/glow-serum";

const initialBrand = parseBrandFromUrl(INITIAL_URL);
const initialAssets = generateDynamicCreatives(initialBrand);

export const MOCK_CREATIVES: CreativeFormat[] = initialAssets.creatives;
export const MOCK_VIDEO: VideoSpec = initialAssets.video;

export const STEP_PRESETS = {
  1: {
    prompt: "Usa el contexto de la web https://lumiere-botanics.com/glow-serum y crea 12 formatos diferentes de imagen para ads multicanal y 1 video cinemático de 10 segundos.",
    agentSummary: "Analizando web con Gemini 2.0 Flash... Extrayendo identidad de marca y paleta botánica... Orquestando Imagen 3 para 12 formatos y Google Veo para síntesis de video a 60fps."
  },
  2: {
    prompt: "El cliente solicitó cambios: paleta más cálida (tonos miel/sunset), incluir llamada de urgencia con '20% OFF PRIMERA COMPRA' (código GLOW20), y modelo sonriendo directo a cámara.",
    agentSummary: "Ejecutando Nano Banana & MediaPipe Edge Engine... Re-calibrando balance cromático a dorados cálidos... Incorporando badges de conversión '-20% OFF' y actualizando copys persuasivos en los 12 formatos y en el video Veo."
  },
  3: {
    prompt: "Excelente. Ahora organiza y clasifica los 13 ads por canal/formato, súbelos estructurados a Google Drive y envía un correo formal de confirmación y entrega al cliente.",
    agentSummary: "Activando Google Workspace Connector... Creando árbol jerárquico en Google Drive con permisos de lectura... Subiendo 12 PNGs de alta resolución + 1 MP4 4K de Veo... Despachando correo ejecutivo vía Gmail API."
  }
};
