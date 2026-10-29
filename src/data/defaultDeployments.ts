import { DeploymentRecord, AdsPlatformExport } from '../types';

export const DEFAULT_DEPLOYMENTS: DeploymentRecord[] = [
  {
    id: 'dep-lumiere-q4',
    campaignName: 'Campaña Q4 — Escalado Glow Serum Bio-Activo',
    brandId: 'brand-lumiere',
    brandName: 'Lumière Botanics',
    productName: 'Glow Serum Bio-Activo 50ml',
    productSku: 'LUM-GLOW-50',
    primaryHook: 'Evidencia Clínica 72h (+120% Hidratación Celular)',
    channels: ['Meta Ads', 'Google Ads', 'TikTok Spark', 'Amazon Ads'],
    budget: 14500,
    projectedRoas: '5.2x — 5.8x',
    driveFolderUrl: 'https://drive.google.com/drive/folders/lumiere-botanics-q4-glow',
    status: 'deployed',
    approvalStatus: 'approved',
    deployedAt: '2026-10-24 14:32:00',
    deployedBy: 'Sofía Martínez (Head of Marketing)'
  },
  {
    id: 'dep-volt-carbon',
    campaignName: 'Lanzamiento Carbon V1 — Conquista tu Maratón',
    brandId: 'brand-volt',
    brandName: 'Volt Stride Athletics',
    productName: 'Volt Carbon V1 Pro Running',
    productSku: 'VOLT-CRB-01',
    primaryHook: 'Propulsión de placa de carbono: -4% esfuerzo por km',
    channels: ['Meta Ads', 'Google Ads', 'TikTok Spark'],
    budget: 18000,
    projectedRoas: '4.8x — 5.4x',
    driveFolderUrl: 'https://drive.google.com/drive/folders/volt-stride-marathon-q4',
    status: 'active',
    approvalStatus: 'approved',
    deployedAt: '2026-10-18 09:15:00',
    deployedBy: 'Carlos Méndez (Growth Director)'
  },
  {
    id: 'dep-pulse-workspace',
    campaignName: 'Enterprise AI Workspace Q4 Acceleration',
    brandId: 'brand-pulse',
    brandName: 'Pulse AI Systems',
    productName: 'Pulse AI Workspace Platform',
    productSku: 'PLS-AI-ENT',
    primaryHook: 'Ahorra 20h semanales por analista con agentes orquestados',
    channels: ['Meta Ads', 'Google Ads'],
    budget: 12000,
    projectedRoas: '5.1x — 5.6x',
    driveFolderUrl: 'https://drive.google.com/drive/folders/pulse-ai-enterprise-q4',
    status: 'active',
    approvalStatus: 'approved',
    deployedAt: '2026-10-12 11:00:00',
    deployedBy: 'Elena Rostova (VP of Marketing)'
  }
];

export function generateAdsExports(brandName: string, productName: string, clientEmail: string): AdsPlatformExport[] {
  const bClean = brandName.replace(/\s+/g, '_');
  const pClean = productName.replace(/\s+/g, '_');

  return [
    {
      id: 'export-google-demand-gen',
      platform: 'Google Ads',
      campaignType: 'Demand Gen & Performance Max Asset Group',
      format: 'CSV',
      downloadFilename: `${bClean}_Google_Ads_Demand_Gen_Bulk.csv`,
      summary: 'Plantilla oficial de Google Ads Editor para importar 12 formatos de imagen, 1 video Veo 10s, 5 headlines y 5 descripciones.',
      directApiReady: true,
      payloadSnippet: `Action,Campaign Name,Asset Group Name,Asset Type,Asset Content,Status
Add,"DG_${bClean}_Q4","AG_${pClean}_Main","Headline","${brandName} — Eficacia Clínica",Enabled
Add,"DG_${bClean}_Q4","AG_${pClean}_Main","Headline","Piel Luminosa en 72 Horas",Enabled
Add,"DG_${bClean}_Q4","AG_${pClean}_Main","Description","Fórmula botánica ártica validada dermatológicamente. Sin químicos.",Enabled
Add,"DG_${bClean}_Q4","AG_${pClean}_Main","CallToAction","COMPRAR_AHORA",Enabled
Add,"DG_${bClean}_Q4","AG_${pClean}_Main","MarketingImage_1.91x1","gs://agentic-ads/${bClean}/display_1200x628.png",Enabled
Add,"DG_${bClean}_Q4","AG_${pClean}_Main","SquareImage_1x1","gs://agentic-ads/${bClean}/feed_1080x1080.png",Enabled
Add,"DG_${bClean}_Q4","AG_${pClean}_Main","PortraitImage_4x5","gs://agentic-ads/${bClean}/portrait_1080x1350.png",Enabled
Add,"DG_${bClean}_Q4","AG_${pClean}_Main","YouTubeVideo_9x16","gs://agentic-ads/${bClean}/veo_10s_master.mp4",Enabled`
    },
    {
      id: 'export-meta-advantage',
      platform: 'Meta Ads',
      campaignType: 'Advantage+ Shopping & Reels Multi-Format',
      format: 'JSON',
      downloadFilename: `${bClean}_Meta_Advantage_Plus_Payload.json`,
      summary: 'Payload JSON para Meta Marketing API v21.0 con AdSet automatizado, segmentación amplia y creativos dinámicos.',
      directApiReady: true,
      payloadSnippet: JSON.stringify({
        campaign: {
          name: `AdvantagePlus_${bClean}_Q4_Conversion`,
          objective: 'OUTCOME_SALES',
          special_ad_categories: [],
          status: 'ACTIVE'
        },
        adset: {
          name: `AdvantagePlus_${pClean}_Audience_Lookalike`,
          optimization_goal: 'VALUE',
          billing_event: 'IMPRESSIONS',
          bid_strategy: 'LOWEST_COST_WITH_BID_CAP',
          promoted_object: { pixel_id: '89421839021', custom_event_type: 'PURCHASE' },
          targeting: { geo_locations: { countries: ['US', 'MX', 'ES'] }, age_min: 22, age_max: 55 }
        },
        creatives: [
          {
            name: `${bClean}_Stories_Reels_9x16`,
            asset_feed_spec: {
              images: [{ hash: 'a891f7b2c', url: `https://storage.googleapis.com/agentic-ads/${bClean}/stories_9x16.png` }],
              videos: [{ video_id: 'veo_10s_master_id', title: '10s Cinematic Experience' }],
              bodies: [{ text: `${productName}: Revela tu mejor versión con biotecnología botánica.` }],
              titles: [{ text: `${brandName} — 20% OFF en primera compra` }],
              call_to_action_types: ['SHOP_NOW']
            }
          }
        ]
      }, null, 2)
    },
    {
      id: 'export-tiktok-spark',
      platform: 'TikTok Ads',
      campaignType: 'Spark Ads 9:16 Video Master',
      format: 'JSON',
      downloadFilename: `${bClean}_TikTok_Spark_Ads_Manifest.json`,
      summary: 'Configuración técnica optimizada para TikTok Ads Manager con video vertical nativo 1080x1920 @ 60fps.',
      directApiReady: true,
      payloadSnippet: JSON.stringify({
        campaign_name: `TT_${bClean}_Spark_Video_Q4`,
        campaign_type: 'CONVERSIONS',
        adgroup_name: `TT_${pClean}_High_Intent`,
        placement: ['PLACEMENT_TIKTOK'],
        video_spec: {
          asset_id: `veo-10s-${bClean.toLowerCase()}`,
          aspect_ratio: '9:16',
          resolution: '1080x1920',
          fps: 60,
          sound_track: 'Lo-Fi Chill Ambient Chime (Licensed)'
        },
        display_name: brandName,
        call_to_action: 'Order Now',
        landing_page_url: `https://${bClean.toLowerCase()}.com/offer`
      }, null, 2)
    },
    {
      id: 'export-amazon-sponsored',
      platform: 'Amazon Ads',
      campaignType: 'Sponsored Brands Video & Storefront Bulk Sheet',
      format: 'CSV',
      downloadFilename: `${bClean}_Amazon_Sponsored_Brands.csv`,
      summary: 'Hoja masiva para Amazon Advertising Console con creativos cuadrados y de video enlazados a la Storefront oficial.',
      directApiReady: true,
      payloadSnippet: `Record Type,Campaign,Campaign Daily Budget,Portfolio ID,Brand Entity ID,Video Media ID,Headline,ASIN
Campaign,"SB_${bClean}_Brand_Defense",150.00,"Default","ENTITY_98124","gs://agentic-ads/${bClean}/veo_10s_master.mp4","Descubre el secreto de ${brandName}","B08N5WRWNW"
Keyword,"SB_${bClean}_Brand_Defense",,,"serum facial botanico",exact,2.45,
Keyword,"SB_${bClean}_Brand_Defense",,,"acido hialuronico puro",phrase,1.90,`
    }
  ];
}

const STORAGE_DEPLOYMENTS_KEY = 'gemini_creative_deployments_v1';
const STORAGE_APPROVALS_KEY = 'gemini_creative_approvals_v1';

export const loadStoredDeployments = (): DeploymentRecord[] => {
  if (typeof window === 'undefined') return DEFAULT_DEPLOYMENTS;
  try {
    const raw = localStorage.getItem(STORAGE_DEPLOYMENTS_KEY);
    if (!raw) return DEFAULT_DEPLOYMENTS;
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error loading deployments:', err);
    return DEFAULT_DEPLOYMENTS;
  }
};

export const saveDeploymentsToStorage = (records: DeploymentRecord[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_DEPLOYMENTS_KEY, JSON.stringify(records));
  } catch (err) {
    console.error('Error saving deployments:', err);
  }
};
