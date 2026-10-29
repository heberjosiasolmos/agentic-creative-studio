export type StepNumber = 1 | 2 | 3;
export type ActiveView = 'studio' | 'vault' | 'analytics';

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
  predictiveScoreV1?: number; // 0-100
  predictiveScoreV2?: number; // 0-100
  predictedRoasV1?: number; // e.g. 4.2
  predictedRoasV2?: number; // e.g. 5.3
  predictedCtrV1?: number; // e.g. 2.9
  predictedCtrV2?: number; // e.g. 4.1
  auditBreakdown?: {
    brandDnaScore: number; // 0-100
    hookStrength: number; // 0-100
    persuasionScore: number; // 0-100
    guardrailCompliance: boolean;
    predictedLiftPercent?: number; // e.g. 28%
  };
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
  predictiveScoreV1?: number;
  predictiveScoreV2?: number;
  predictedRoasV1?: number;
  predictedRoasV2?: number;
  predictedCtrV1?: number;
  predictedCtrV2?: number;
  auditBreakdown?: {
    brandDnaScore: number;
    hookStrength: number;
    persuasionScore: number;
    guardrailCompliance: boolean;
    predictedLiftPercent?: number;
  };
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

// ----------------------------------------------------
// FASE 2: PERFORMANCE ANALYTICS & CREATIVE INTELLIGENCE
// ----------------------------------------------------

export type CreativeStatus = 'top_performer' | 'scaling' | 'fatigued' | 'testing';

export interface CreativePerformanceItem {
  id: string;
  formatId: string;
  name: string;
  channel: 'Meta Ads' | 'Google Ads' | 'TikTok' | 'Amazon Ads';
  aspectRatio: string;
  thumbnailUrl: string;
  spend: number;
  revenue: number;
  roas: number;
  ctr: number; // porcentaje, ej. 3.42
  cpa: number; // USD
  impressions: number;
  frequency: number; // ej. 4.8
  fatigueScore: number; // 0 a 100
  status: CreativeStatus;
  winningHook: string;
  recommendedAction: string;
  suggestedPrompt: string;
}

export interface SearchTermInsight {
  id: string;
  term: string;
  channel: 'Google Search' | 'Amazon Ads' | 'TikTok Search';
  impressions: number;
  clicks: number;
  ctr: number;
  roas: number;
  conversionRate: number;
  coverageStatus: 'uncovered' | 'low_relevance' | 'covered';
  intentCategory: 'problem_solution' | 'ingredient_focus' | 'comparison' | 'urgency';
  suggestedPrompt: string;
}

export interface ChannelMetricSummary {
  channel: string;
  spend: number;
  roas: number;
  conversions: number;
  activeCreatives: number;
  fatiguedCreatives: number;
}

export interface StrategicInsight {
  id: string;
  type: 'critical' | 'opportunity' | 'scale';
  title: string;
  description: string;
  metricImpact: string;
  actionLabel: string;
  promptToExecute: string;
}

export interface BrandAnalyticsData {
  brandId: string;
  blendedRoas: number;
  totalSpend: number;
  totalRevenue: number;
  avgCpa: number;
  avgCtr: number;
  creativeHealthScore: number; // 0 - 100
  channels: ChannelMetricSummary[];
  creatives: CreativePerformanceItem[];
  searchTerms: SearchTermInsight[];
  aiStrategicInsights: StrategicInsight[];
}

// ----------------------------------------------------
// FASE 3: MOTOR DE GENERACIÓN ASISTIDA POR DATOS & CAMPAIGN STRATEGY
// ----------------------------------------------------

export interface CampaignStrategyConfig {
  id: string;
  name: string;
  brandId: string;
  targetProductId: string;
  primaryHook: string;
  targetChannels: string[];
  monthlyBudget: number;
  projectedRoasRange: string;
  projectedRevenueRange: string;
  projectedCpa: number;
  guardrailsStatus: 'passed' | 'warning';
  activeFormatCount: number;
  status: 'draft' | 'synthesized' | 'deployed';
}
