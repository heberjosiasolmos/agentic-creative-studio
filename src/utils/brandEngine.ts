import { CreativeFormat, VideoSpec, FullBrandContext } from '../types';

export interface BrandProfile {
  name: string;
  domain: string;
  productName: string;
  industry: 'skincare' | 'apparel' | 'tech' | 'beverage' | 'automotive' | 'retail';
  clientEmail: string;
  clientContact: string;
  primaryEmoji: string;
  accentV1: string;
  accentV2: string;
  gradientV1: string;
  gradientV2: string;
  fullContext?: FullBrandContext;
}

export function brandContextToProfile(fullBrand: FullBrandContext): BrandProfile {
  const activeProd = fullBrand.products.find(p => p.activeForAds) || fullBrand.products[0];
  return {
    name: fullBrand.name,
    domain: fullBrand.domain,
    productName: activeProd ? activeProd.name : "Producto Signature",
    industry: fullBrand.industry,
    clientEmail: fullBrand.clientEmail,
    clientContact: fullBrand.clientContact,
    primaryEmoji: fullBrand.industry === 'skincare' ? '🧴' : fullBrand.industry === 'apparel' ? '👟' : '⚡',
    accentV1: fullBrand.visuals.accentColor,
    accentV2: "#f59e0b",
    gradientV1: fullBrand.visuals.gradientV1,
    gradientV2: fullBrand.visuals.gradientV2,
    fullContext: fullBrand
  };
}

// Curated high-resolution Unsplash commercial photography for real ads
const INDUSTRY_PHOTOS: Record<string, { v1: string[]; v2: string[] }> = {
  skincare: {
    v1: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1080&q=80", // Dropper on marble
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1080&h=1920&q=80", // Model radiant skin studio
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1080&h=1920&q=80", // Clean cosmetic set
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1080&h=1920&q=80", // Laboratory pipette drop
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1080&h=1350&q=80", // Product on pedestal
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&h=500&q=80", // Cosmetic jar
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1456&h=180&q=80", // Wide horizontal flatlay
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&h=1200&q=80", // Vertical water splash
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&h=628&q=80", // Luxury modern bathroom
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=1080&h=1080&q=80", // Texture bubbles
      "https://images.unsplash.com/photo-1556760544-74068565f05c?auto=format&fit=crop&w=1080&h=1080&q=80", // Clinical face fresh
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&h=1500&q=80"  // Linen flatlay
    ],
    v2: [
      "https://images.unsplash.com/photo-1608248597359-598284534720?auto=format&fit=crop&w=1080&q=80", // Warm amber aesthetic bottle
      "https://images.unsplash.com/photo-1512290900672-1f4a97491d90?auto=format&fit=crop&w=1080&h=1920&q=80", // Model smiling in golden hour sunset
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1080&h=1920&q=80", // Warm UGC application
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1080&h=1920&q=80", // Botanical warm lab
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1080&h=1350&q=80", // Warm terra-cotta aesthetic
      "https://images.unsplash.com/photo-1608248597359-598284534720?auto=format&fit=crop&w=600&h=500&q=80", // Golden glowing banner
      "https://images.unsplash.com/photo-1512290900672-1f4a97491d90?auto=format&fit=crop&w=1456&h=180&q=80", // Wide golden sunset banner
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&h=1200&q=80", // Golden radiance halfpage
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=1200&h=628&q=80", // Sunbeam luxury setting
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1080&h=1080&q=80", // Warm honey glow texture
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=1080&h=1080&q=80", // Warm glow customer proof
      "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=1000&h=1500&q=80"  // Warm sunset rays pin
    ]
  },
  apparel: {
    v1: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1080&q=80", // Red athletic sneaker
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1080&h=1920&q=80", // Fashion model vertical
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1080&h=1920&q=80", // Sneaker macro
      "https://images.unsplash.com/photo-1483721074573-586540da5703?auto=format&fit=crop&w=1080&h=1920&q=80", // Runner athlete
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1080&h=1350&q=80", // Black sneaker pedestal
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&h=500&q=80", // Clean display shoe
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1456&h=180&q=80", // Horizontal running shoes
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&h=1200&q=80", // Half page vertical
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=1200&h=628&q=80", // Sneaker landscape
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1080&h=1080&q=80", // Streetwear shoe
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1080&h=1080&q=80", // Performance gym
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&h=1500&q=80"  // Lifestyle fashion pin
    ],
    v2: [
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=1080&q=80", // Golden sunset sneaker
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1080&h=1920&q=80", // Athlete smiling sunset
      "https://images.unsplash.com/photo-1483721074573-586540da5703?auto=format&fit=crop&w=1080&h=1920&q=80", // Golden hour runner
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1080&h=1920&q=80", // High energy workout warm
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1080&h=1350&q=80", // Warm sunlight shoe
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=600&h=500&q=80", // Warm banner shoe
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=1456&h=180&q=80", // Golden hour wide
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&h=1200&q=80", // Half page warm athlete
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1200&h=628&q=80", // Warm sunset track
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1080&h=1080&q=80", // Streetwear warm
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1080&h=1080&q=80", // Workout warm
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&h=1500&q=80"  // Lifestyle warm
    ]
  },
  tech: {
    v1: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1080&q=80", // Silicon microchip tech
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1080&h=1920&q=80", // UI designer vertical
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1080&h=1920&q=80", // Cybersecurity server
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1080&h=1920&q=80", // Modern tech team
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1080&h=1350&q=80", // Matrix code screen
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&h=500&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1456&h=180&q=80",
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&h=1200&q=80",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&h=628&q=80",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1080&h=1080&q=80",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1080&h=1080&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&h=1500&q=80"
    ],
    v2: [
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1080&q=80", // Warm collaborative office
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1080&h=1920&q=80", // Happy team smiling
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1080&h=1920&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1080&h=1920&q=80",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1080&h=1350&q=80",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&h=500&q=80",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1456&h=180&q=80",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&h=1200&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&h=628&q=80",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1080&h=1080&q=80",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1080&h=1080&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&h=1500&q=80"
    ]
  }
};

export function parseBrandFromUrl(rawUrl: string): BrandProfile {
  let cleanUrl = rawUrl.trim();
  if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
    cleanUrl = 'https://' + cleanUrl;
  }

  let hostname = 'lumiere-botanics.com';
  let pathname = '';
  try {
    const parsed = new URL(cleanUrl);
    hostname = parsed.hostname.replace(/^www\./, '');
    pathname = parsed.pathname;
  } catch {
    hostname = cleanUrl.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0] || 'lumiere-botanics.com';
  }

  const parts = hostname.split('.');
  const rawBrand = parts.length > 2 ? parts[parts.length - 2] : parts[0] || 'Brand';
  const brandName = rawBrand
    .split(/[-_]/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');

  const fullText = (hostname + ' ' + pathname).toLowerCase();

  // Industry matching
  if (fullText.match(/(skin|botanic|beauty|cosmetic|glow|serum|derma|lumiere|shampoo|crema|fragrance|lotion|chicco)/)) {
    return {
      name: brandName === "Lumiere Botanics" ? "Lumière Botanics" : brandName,
      domain: hostname,
      productName: "Glow Serum Bio-Activo",
      industry: 'skincare',
      clientEmail: `marketing@${hostname}`,
      clientContact: `Equipo de Marketing de ${brandName}`,
      primaryEmoji: "🧴",
      accentV1: "#2dd4bf",
      accentV2: "#f59e0b",
      gradientV1: "from-slate-900 via-teal-950/70 to-slate-950",
      gradientV2: "from-amber-950/80 via-orange-950/60 to-stone-950"
    };
  }

  if (fullText.match(/(nike|shoe|sneaker|stride|run|apparel|wear|sport|athletic|gym|fit|ropa|tenis|zapatos|zara|fashion|adidas)/)) {
    return {
      name: brandName,
      domain: hostname,
      productName: "Ultra Aero Runner Pro",
      industry: 'apparel',
      clientEmail: `brand-campaigns@${hostname}`,
      clientContact: `Equipo Creativo de ${brandName}`,
      primaryEmoji: "👟",
      accentV1: "#38bdf8",
      accentV2: "#fbbf24",
      gradientV1: "from-zinc-950 via-slate-900 to-black",
      gradientV2: "from-stone-900 via-amber-950/80 to-zinc-950"
    };
  }

  if (fullText.match(/(tech|saas|ai|cloud|data|pulse|soft|app|cyber|platform|dev|code|digital|crypto)/)) {
    return {
      name: brandName,
      domain: hostname,
      productName: "AI Cloud Intelligence Platform",
      industry: 'tech',
      clientEmail: `growth@${hostname}`,
      clientContact: `Lead de Crecimiento de ${brandName}`,
      primaryEmoji: "⚡",
      accentV1: "#a855f7",
      accentV2: "#f97316",
      gradientV1: "from-slate-950 via-indigo-950/80 to-slate-900",
      gradientV2: "from-purple-950 via-amber-950/60 to-slate-950"
    };
  }

  // Fallback to Skincare / Lifestyle (most visually stunning commercial ads)
  return {
    name: brandName,
    domain: hostname,
    productName: "Edición Signature 2026",
    industry: 'skincare',
    clientEmail: `contacto@${hostname}`,
    clientContact: `Dirección de Marca de ${brandName}`,
    primaryEmoji: "✨",
    accentV1: "#2dd4bf",
    accentV2: "#f59e0b",
    gradientV1: "from-slate-900 via-teal-950/70 to-slate-950",
    gradientV2: "from-amber-950/80 via-orange-950/60 to-stone-950"
  };
}

export function generateDynamicCreatives(brand: BrandProfile): { creatives: CreativeFormat[]; video: VideoSpec } {
  const b = brand.name;
  const p = brand.productName;
  const photos = INDUSTRY_PHOTOS[brand.industry] || INDUSTRY_PHOTOS.skincare;

  const creatives: CreativeFormat[] = [
    {
      id: "fmt-1",
      name: "Instagram Feed Square",
      channel: "Instagram",
      aspectRatio: "1:1",
      dimensions: "1080 x 1080 px",
      category: "feed-carousel",
      headlineV1: `${p} — El Nuevo Estándar`,
      headlineV2: `${p} • 20% OFF Exclusivo`,
      subheadlineV1: `Diseñado por ${b} para máxima calidad y resultados visibles.`,
      subheadlineV2: `Usa código GLOW20 con 20% de descuento y envío gratis hoy.`,
      ctaV1: "Comprar Ahora",
      ctaV2: "Aprovechar -20% OFF",
      badgeV1: "Best Seller",
      badgeV2: "⭐ 20% OFF HOY",
      imagePromptV1: `${p} by ${b} centered on sleek minimalist marble pedestal, soft clean morning studio light, photorealistic commercial product shot, 8k resolution`,
      imagePromptV2: `${p} by ${b} in warm golden-hour sunset lighting, surrounded by botanical flowers, warmer amber tones, cinematic lighting, 20% discount tag, photorealistic`,
      bgGradientV1: brand.gradientV1,
      bgGradientV2: brand.gradientV2,
      accentColorV1: brand.accentV1,
      accentColorV2: brand.accentV2,
      productImg: "dropper",
      imageUrlV1: photos.v1[0],
      imageUrlV2: photos.v2[0],
      model: "Imagen 3",
      fileSize: "1.9 MB",
      drivePath: `03_Feeds_and_Carousels/01_${b.replace(/\s+/g, '_')}_Square_1080x1080.png`
    },
    {
      id: "fmt-2",
      name: "Instagram Stories & Reels",
      channel: "Instagram",
      aspectRatio: "9:16",
      dimensions: "1080 x 1920 px",
      category: "social-vertical",
      headlineV1: `El Secreto de una Piel Radiante`,
      headlineV2: `Tu Rutina Viral • 20% OFF`,
      subheadlineV1: `Fórmula ligera de absorción rápida por ${b}.`,
      subheadlineV2: `Resultados clínicos comprobados. Desliza y reclama 20% OFF.`,
      ctaV1: "Desliza para Probar",
      ctaV2: "Desliza y Ahorra 20%",
      badgeV1: "Viral en Reels",
      badgeV2: "🔥 Edición Limitada",
      imagePromptV1: `Vertical 9:16 full-body close up of model touching radiant cheek next to ${p}, soft studio cool daylight`,
      imagePromptV2: `Vertical 9:16 dynamic frame with warm sunset golden hour glow, model smiling directly at camera with ${p}, warm tones, vibrant`,
      bgGradientV1: brand.gradientV1,
      bgGradientV2: brand.gradientV2,
      accentColorV1: brand.accentV1,
      accentColorV2: brand.accentV2,
      productImg: "face-glow",
      imageUrlV1: photos.v1[1],
      imageUrlV2: photos.v2[1],
      model: "Imagen 3",
      fileSize: "2.5 MB",
      drivePath: `01_Social_Vertical/02_${b.replace(/\s+/g, '_')}_Stories_1080x1920.png`
    },
    {
      id: "fmt-3",
      name: "TikTok Spark Ad",
      channel: "TikTok",
      aspectRatio: "9:16",
      dimensions: "1080 x 1920 px",
      category: "social-vertical",
      headlineV1: `3 Razones para Cambiar a ${b}`,
      headlineV2: `¿Piel Seca? Aplica Esto • -20%`,
      subheadlineV1: `100% bio-activo sin químicos pesados.`,
      subheadlineV2: `+20,000 reseñas de 5 estrellas. Prueba sin riesgo.`,
      ctaV1: "Ver Reseñas",
      ctaV2: "Comprar con Cupón",
      badgeV1: "Trend #SkinTok",
      badgeV2: "⚡ Cupón Activo",
      imagePromptV1: `UGC native style aesthetic unboxing of ${b} ${p}, natural bedroom light`,
      imagePromptV2: `High energy UGC shot of ${p} with warm ambient sunset glow and promo overlay`,
      bgGradientV1: brand.gradientV1,
      bgGradientV2: brand.gradientV2,
      accentColorV1: brand.accentV1,
      accentColorV2: brand.accentV2,
      productImg: "ugc",
      imageUrlV1: photos.v1[2],
      imageUrlV2: photos.v2[2],
      model: "Imagen 3",
      fileSize: "2.2 MB",
      drivePath: `01_Social_Vertical/03_${b.replace(/\s+/g, '_')}_TikTok_1080x1920.png`
    },
    {
      id: "fmt-4",
      name: "YouTube Shorts Sponsor",
      channel: "YouTube",
      aspectRatio: "9:16",
      dimensions: "1080 x 1920 px",
      category: "social-vertical",
      headlineV1: `Dermatólogos Explican`,
      headlineV2: `Eficacia Clínica • 20% OFF`,
      subheadlineV1: `¿Por qué ${p} supera a los activos sintéticos?`,
      subheadlineV2: `Descubre la ciencia bio-activa patentada de ${b}.`,
      ctaV1: "Ver Demostración",
      ctaV2: "Comprar con 20% OFF",
      badgeV1: "Ciencia Botánica",
      badgeV2: "🌿 Testeado Clínicamente",
      imagePromptV1: `Precision laboratory pipette dropping golden liquid onto glass surface, studio clean lighting`,
      imagePromptV2: `Warm cinematic sunlight striking pipette with vibrant active botanicals and amber elixir`,
      bgGradientV1: brand.gradientV1,
      bgGradientV2: brand.gradientV2,
      accentColorV1: brand.accentV1,
      accentColorV2: brand.accentV2,
      productImg: "lab",
      imageUrlV1: photos.v1[3],
      imageUrlV2: photos.v2[3],
      model: "Imagen 3",
      fileSize: "2.4 MB",
      drivePath: `01_Social_Vertical/04_${b.replace(/\s+/g, '_')}_YT_Shorts_1080x1920.png`
    },
    {
      id: "fmt-5",
      name: "Facebook Portrait Feed",
      channel: "Facebook",
      aspectRatio: "4:5",
      dimensions: "1080 x 1350 px",
      category: "feed-carousel",
      headlineV1: `Transforma tu Rutina Diaria`,
      headlineV2: `Renovación Celular • -20% OFF`,
      subheadlineV1: `Ideal para todo tipo de piel. Fórmula probada.`,
      subheadlineV2: `Garantía de satisfacción de 30 días o te devolvemos tu dinero.`,
      ctaV1: "Conocer Más",
      ctaV2: "Ordenar con Descuento",
      badgeV1: "Recomendado",
      badgeV2: "✨ Garantía 30 Días",
      imagePromptV1: `Product packaging centered on earthy textured pedestal with soft shadows`,
      imagePromptV2: `Warm terra-cotta tones, sunny backlight, lush greenery around amber bottle`,
      bgGradientV1: brand.gradientV1,
      bgGradientV2: brand.gradientV2,
      accentColorV1: brand.accentV1,
      accentColorV2: brand.accentV2,
      productImg: "pedestal",
      imageUrlV1: photos.v1[4],
      imageUrlV2: photos.v2[4],
      model: "Imagen 3",
      fileSize: "1.8 MB",
      drivePath: `03_Feeds_and_Carousels/05_${b.replace(/\s+/g, '_')}_FB_Portrait_1080x1350.png`
    },
    {
      id: "fmt-6",
      name: "Google Display Medium Rectangle",
      channel: "Google Display",
      aspectRatio: "6:5",
      dimensions: "300 x 250 px",
      category: "display-banners",
      headlineV1: `${b} — ${p}`,
      headlineV2: `${b} • 20% OFF Lanzamiento`,
      subheadlineV1: `Hidratación profunda 72 horas.`,
      subheadlineV2: `Código GLOW20 disponible hoy.`,
      ctaV1: "Comprar",
      ctaV2: "-20% Aquí",
      badgeV1: "Google Top Pick",
      badgeV2: "🎁 Envío Gratis",
      imagePromptV1: `Clean 300x250 Google Display banner ad layout with high contrast product`,
      imagePromptV2: `Warm golden accent 300x250 banner with high contrast CTA badge`,
      bgGradientV1: brand.gradientV1,
      bgGradientV2: brand.gradientV2,
      accentColorV1: brand.accentV1,
      accentColorV2: brand.accentV2,
      productImg: "banner-rect",
      imageUrlV1: photos.v1[5],
      imageUrlV2: photos.v2[5],
      model: "Nano Banana",
      fileSize: "190 KB",
      drivePath: `02_Display_Banners/06_${b.replace(/\s+/g, '_')}_GDN_Medium_300x250.png`
    },
    {
      id: "fmt-7",
      name: "Google Display Leaderboard",
      channel: "Google Display",
      aspectRatio: "8:1",
      dimensions: "728 x 90 px",
      category: "display-banners",
      headlineV1: `${b.toUpperCase()} — REVELA TU MEJOR VERSIÓN`,
      headlineV2: `${b.toUpperCase()}: 20% OFF EN TU PRIMERA COMPRA HOY`,
      subheadlineV1: `Fórmula 100% activa libre de sulfatos.`,
      subheadlineV2: `Aplica cupón GLOW20 al finalizar tu compra.`,
      ctaV1: "Descubrir",
      ctaV2: "Obtener 20%",
      badgeV1: "Nuevo",
      badgeV2: "Cupón Activo",
      imagePromptV1: `Horizontal 728x90 web leaderboard banner for ${b}`,
      imagePromptV2: `Horizontal golden gradient banner for ${b} with animated coupon pill`,
      bgGradientV1: brand.gradientV1,
      bgGradientV2: brand.gradientV2,
      accentColorV1: brand.accentV1,
      accentColorV2: brand.accentV2,
      productImg: "banner-wide",
      imageUrlV1: photos.v1[6],
      imageUrlV2: photos.v2[6],
      model: "Nano Banana",
      fileSize: "130 KB",
      drivePath: `02_Display_Banners/07_${b.replace(/\s+/g, '_')}_GDN_Leaderboard_728x90.png`
    },
    {
      id: "fmt-8",
      name: "Google Display Half Page",
      channel: "Google Display",
      aspectRatio: "1:2",
      dimensions: "300 x 600 px",
      category: "display-banners",
      headlineV1: `Nutrición Celular Profunda`,
      headlineV2: `Glow Inmediato • -20% OFF`,
      subheadlineV1: `Tres tipos de ácido hialurónico activo.`,
      subheadlineV2: `Dermatológicamente probado. Reclama tu descuento.`,
      ctaV1: "Ver Fórmula",
      ctaV2: "Canjear Código",
      badgeV1: "Alta Eficacia",
      badgeV2: "⭐ 4.9 / 5.0",
      imagePromptV1: `Vertical half page 300x600 banner layout featuring ${p} by ${b}`,
      imagePromptV2: `Warm golden vertical banner for ${b} with warm lighting and high contrast badge`,
      bgGradientV1: brand.gradientV1,
      bgGradientV2: brand.gradientV2,
      accentColorV1: brand.accentV1,
      accentColorV2: brand.accentV2,
      productImg: "half-page",
      imageUrlV1: photos.v1[7],
      imageUrlV2: photos.v2[7],
      model: "Imagen 3",
      fileSize: "340 KB",
      drivePath: `02_Display_Banners/08_${b.replace(/\s+/g, '_')}_GDN_HalfPage_300x600.png`
    },
    {
      id: "fmt-9",
      name: "Meta & LinkedIn Landscape Ad",
      channel: "Meta",
      aspectRatio: "1.91:1",
      dimensions: "1200 x 628 px",
      category: "feed-carousel",
      headlineV1: `El Nuevo Estándar en Belleza Limpia`,
      headlineV2: `Lanzamiento Oficial • 20% OFF`,
      subheadlineV1: `Biotecnología sostenible con resultados medibles por ${b}.`,
      subheadlineV2: `Reconocido por expertos de la industria. Envío gratis.`,
      ctaV1: "Más Información",
      ctaV2: "Comprar Ahora",
      badgeV1: "Sostenible",
      badgeV2: "🌱 Eco-Certificado",
      imagePromptV1: `Wide landscape editorial product shot of ${p} by ${b} in luxury modern setting`,
      imagePromptV2: `Warm golden hour landscape setting showcasing ${p} by ${b} with sunset rays`,
      bgGradientV1: brand.gradientV1,
      bgGradientV2: brand.gradientV2,
      accentColorV1: brand.accentV1,
      accentColorV2: brand.accentV2,
      productImg: "landscape",
      imageUrlV1: photos.v1[8],
      imageUrlV2: photos.v2[8],
      model: "Imagen 3",
      fileSize: "2.1 MB",
      drivePath: `03_Feeds_and_Carousels/09_${b.replace(/\s+/g, '_')}_Landscape_1200x628.png`
    },
    {
      id: "fmt-10",
      name: "Carousel Card 1 — Beneficio Hero",
      channel: "Instagram",
      aspectRatio: "1:1",
      dimensions: "1080 x 1080 px",
      category: "feed-carousel",
      headlineV1: `01. Hidratación en Capas`,
      headlineV2: `01. Piel de Seda • -20%`,
      subheadlineV1: `Retiene hasta 1000 veces su peso en agua.`,
      subheadlineV2: `Fórmula de absorción sin residuo graso. Cupón GLOW20.`,
      ctaV1: "Siguiente >",
      ctaV2: "Desliza >",
      badgeV1: "Paso 1 de 2",
      badgeV2: "Paso 1 de 2 • Ahorro",
      imagePromptV1: `Close-up macro texture of transparent golden serum with micro-bubbles`,
      imagePromptV2: `Ultra high res macro texture with radiant golden honey light refraction`,
      bgGradientV1: brand.gradientV1,
      bgGradientV2: brand.gradientV2,
      accentColorV1: brand.accentV1,
      accentColorV2: brand.accentV2,
      productImg: "texture",
      imageUrlV1: photos.v1[9],
      imageUrlV2: photos.v2[9],
      model: "Imagen 3",
      fileSize: "1.7 MB",
      drivePath: `03_Feeds_and_Carousels/10_${b.replace(/\s+/g, '_')}_Card1_1080x1080.png`
    },
    {
      id: "fmt-11",
      name: "Carousel Card 2 — Evidencia Clínica",
      channel: "Instagram",
      aspectRatio: "1:1",
      dimensions: "1080 x 1080 px",
      category: "feed-carousel",
      headlineV1: `02. 94% Mayor Luminosidad`,
      headlineV2: `02. Resultados Garantizados`,
      subheadlineV1: `Estudio clínico independiente en 120 participantes.`,
      subheadlineV2: `Prueba por 30 días o reembolso total. -20% primera orden.`,
      ctaV1: "Comenzar Reto",
      ctaV2: "Comprar Pack",
      badgeV1: "Paso 2 de 2",
      badgeV2: "Paso 2 de 2 • 20% OFF",
      imagePromptV1: `Clean product clinical fresh skin aesthetic with proof stats`,
      imagePromptV2: `Warm glowing proof card with customer satisfaction metrics for ${b}`,
      bgGradientV1: brand.gradientV1,
      bgGradientV2: brand.gradientV2,
      accentColorV1: brand.accentV1,
      accentColorV2: brand.accentV2,
      productImg: "stats",
      imageUrlV1: photos.v1[10],
      imageUrlV2: photos.v2[10],
      model: "Imagen 3",
      fileSize: "1.6 MB",
      drivePath: `03_Feeds_and_Carousels/11_${b.replace(/\s+/g, '_')}_Card2_1080x1080.png`
    },
    {
      id: "fmt-12",
      name: "Pinterest Promoted Pin",
      channel: "Pinterest",
      aspectRatio: "2:3",
      dimensions: "1000 x 1500 px",
      category: "social-vertical",
      headlineV1: `Guía de Rutina Diaria 2026`,
      headlineV2: `Rutina Glow Up • 20% OFF`,
      subheadlineV1: `El paso imprescindible para preparar tu piel por ${b}.`,
      subheadlineV2: `Añade a tu tablero y guarda el cupón GLOW20.`,
      ctaV1: "Guardar Pin",
      ctaV2: "Guardar & Comprar",
      badgeV1: "Inspo Diario",
      badgeV2: "📌 Pin Guardado + Cupón",
      imagePromptV1: `Aesthetic lifestyle flatlay with linen, wooden brush and glowing serum bottle`,
      imagePromptV2: `Warm aesthetic flatlay with warm sunshine streaming through window, amber tones`,
      bgGradientV1: brand.gradientV1,
      bgGradientV2: brand.gradientV2,
      accentColorV1: brand.accentV1,
      accentColorV2: brand.accentV2,
      productImg: "flatlay",
      imageUrlV1: photos.v1[11],
      imageUrlV2: photos.v2[11],
      model: "Imagen 3",
      fileSize: "2.3 MB",
      drivePath: `01_Social_Vertical/12_${b.replace(/\s+/g, '_')}_Pinterest_1000x1500.png`
    }
  ];

  const video: VideoSpec = {
    id: `video-veo-${brand.name.toLowerCase().replace(/\s+/g, '-')}`,
    name: `Veo Cinematic Motion Ad — ${b} (10 seg)`,
    duration: "10s",
    model: "Google Veo (VideoFX)",
    resolution: "1080 x 1920 px",
    aspectRatio: "9:16",
    fps: 60,
    videoSrcV1: "/videos/veo-10s.mp4",
    videoSrcV2: "/videos/veo-10s-v2.mp4",
    promptV1: `Cinematic 10s shot: Macro drop falling in slow motion onto ${p} by ${b}, camera rotates around glass revealing radiant skin model, studio lighting, smooth 60fps.`,
    promptV2: `Cinematic 10s shot (Refined for ${b}): Warm golden hour lighting, model smiles directly at camera, glowing skin texture, dynamic zoom into bottle with warm amber flares, ending on '-20% OFF' animated badge.`,
    titleV1: `${b.toUpperCase()} — 10s Brand Experience`,
    titleV2: `${b.toUpperCase()} — Glow Experience (20% OFF)`,
    ctaV1: `Descubre el Poder de ${b}`,
    ctaV2: `Reclama tu 20% OFF en ${b}`,
    audioTrack: `Ambient Chill Lo-Fi Acoustic + Subtle Water Ripple & Chime (AI Generated for ${b})`,
    drivePath: `04_Video_Veo_Master/${b.replace(/\s+/g, '_')}_Veo_10s_Master_4K.mp4`
  };

  return { creatives, video };
}
