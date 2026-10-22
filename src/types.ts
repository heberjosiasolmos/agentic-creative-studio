export type StepNumber = 1 | 2 | 3;
export type ActiveView = 'studio' | 'vault';

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
  imageUrlV1: string;
  imageUrlV2: string;
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
  videoSrcV1: string;
  videoSrcV2: string;
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
  tool: 'Gemini 2.0 Flash' | 'Imagen 3' | 'Google Veo' | 'Nano Banana' | 'Google Drive API' | 'Gmail Dispatcher' | 'Vertex AI' | 'Brand Vault Engine';
  message: string;
  type: 'info' | 'tool' | 'success' | 'refine';
}

// ----------------------------------------------------
// FASE 1: BRAND CONTEXT HUB (BRAND VAULT DATA MODEL)
// ----------------------------------------------------

export interface BrandProduct {
  id: string;
  name: string;
  sku: string;
  asin?: string;
  category: string;
  price: number;
  marginPercent: number;
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
  uvp: string; // Propuesta de valor única
  keyBenefits: string[];
  approvedClaims: string[];
  activeForAds: boolean;
  heroImage: string;
}

export interface BrandGuardrails {
  dos: string[];
  donts: string[];
  mandatoryDisclaimers: string[];
  prohibitedWords: string[];
}

export interface BrandPersona {
  archetype: string; // e.g. "El Sabio / Creador / Innovador"
  toneOfVoice: string[]; // e.g. ["Aspiracional", "Científico", "Elegante"]
  targetAudience: {
    demographics: string;
    painPoints: string[];
    desires: string[];
  };
}

export interface BrandVisuals {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  gradientV1: string;
  gradientV2: string;
  primaryFont: string;
  secondaryFont: string;
  logoUrl: string;
  logoDarkUrl?: string;
  faviconUrl?: string;
}

export interface FullBrandContext {
  id: string;
  name: string;
  domain: string;
  industry: 'skincare' | 'apparel' | 'tech' | 'beverage' | 'automotive' | 'retail';
  tagline: string;
  description: string;
  clientEmail: string;
  clientContact: string;
  visuals: BrandVisuals;
  persona: BrandPersona;
  guardrails: BrandGuardrails;
  products: BrandProduct[];
  agentDirectives: string; // Directivas permanentes para Gemini 2.0, Imagen 3 y Veo
  updatedAt: string;
}
