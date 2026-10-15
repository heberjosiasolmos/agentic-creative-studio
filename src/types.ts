export type StepNumber = 1 | 2 | 3;

export interface CreativeFormat {
  id: string;
  name: string;
  channel: 'Instagram' | 'TikTok' | 'YouTube' | 'Google Display' | 'Facebook' | 'Pinterest' | 'LinkedIn' | 'Meta';
  aspectRatio: string;
  dimensions: string;
  category: 'social-vertical' | 'feed-carousel' | 'display-banners';
  headlineV1: string;
  headlineV2: string;
  subheadlineV1: string;
  subheadlineV2: string;
  ctaV1: string;
  ctaV2: string;
  badgeV1: string;
  badgeV2: string;
  imagePromptV1: string;
  imagePromptV2: string;
  bgGradientV1: string;
  bgGradientV2: string;
  accentColorV1: string;
  accentColorV2: string;
  productImg: string;
  model: 'Imagen 3' | 'Nano Banana';
  fileSize: string;
  drivePath: string;
}

export interface VideoSpec {
  id: string;
  name: string;
  duration: string; // "10s"
  model: 'Google Veo (VideoFX)';
  resolution: string; // "1080x1920"
  aspectRatio: string; // "9:16"
  fps: number;
  promptV1: string;
  promptV2: string;
  titleV1: string;
  titleV2: string;
  ctaV1: string;
  ctaV2: string;
  audioTrack: string;
  drivePath: string;
}

export interface AgentLog {
  id: string;
  timestamp: string;
  tool: 'Gemini 2.0 Flash' | 'Imagen 3' | 'Google Veo' | 'Nano Banana' | 'Google Drive API' | 'Gmail Dispatcher' | 'Vertex AI';
  message: string;
  type: 'info' | 'tool' | 'success' | 'refine';
}
