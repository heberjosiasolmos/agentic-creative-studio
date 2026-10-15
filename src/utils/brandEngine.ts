import { CreativeFormat, VideoSpec } from '../types';

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
}

export function parseBrandFromUrl(rawUrl: string): BrandProfile {
  let cleanUrl = rawUrl.trim();
  if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
    cleanUrl = 'https://' + cleanUrl;
  }

  let hostname = 'brand.com';
  let pathname = '';
  try {
    const parsed = new URL(cleanUrl);
    hostname = parsed.hostname.replace(/^www\./, '');
    pathname = parsed.pathname;
  } catch {
    hostname = cleanUrl.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0] || 'brand.com';
  }

  // Extract root brand name from hostname
  const parts = hostname.split('.');
  const rawBrand = parts.length > 2 ? parts[parts.length - 2] : parts[0] || 'Brand';
  const brandName = rawBrand
    .split(/[-_]/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');

  const fullText = (hostname + ' ' + pathname).toLowerCase();

  // Detect industry
  if (fullText.match(/(skin|botanic|beauty|cosmetic|glow|serum|derma|lumiere|shampoo|crema|fragrance|lotion)/)) {
    return {
      name: brandName || "Lumière Botanics",
      domain: hostname,
      productName: "Glow Serum Bio-Activo",
      industry: 'skincare',
      clientEmail: `marketing@${hostname}`,
      clientContact: `Equipo de Marketing de ${brandName}`,
      primaryEmoji: "🧴",
      accentV1: "#2dd4bf", // Teal/Emerald
      accentV2: "#f59e0b", // Warm Amber
      gradientV1: "from-slate-900 via-teal-950/70 to-slate-950",
      gradientV2: "from-amber-950/80 via-orange-950/60 to-stone-950"
    };
  }

  if (fullText.match(/(nike|shoe|sneaker|stride|run|apparel|wear|sport|athletic|gym|fit|ropa|tenis|zapatos|zara|fashion)/)) {
    return {
      name: brandName,
      domain: hostname,
      productName: "Ultra Aero Runner Pro",
      industry: 'apparel',
      clientEmail: `brand-campaigns@${hostname}`,
      clientContact: `Equipo Creativo de ${brandName}`,
      primaryEmoji: "👟",
      accentV1: "#38bdf8", // Electric Blue
      accentV2: "#fbbf24", // Solar Gold
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
      accentV1: "#a855f7", // Violet
      accentV2: "#f97316", // Coral Orange
      gradientV1: "from-slate-950 via-indigo-950/80 to-slate-900",
      gradientV2: "from-purple-950 via-amber-950/60 to-slate-950"
    };
  }

  if (fullText.match(/(coffee|cafe|brew|drink|tea|beer|wine|burger|food|snack|tasty|bebida|sabor|starbucks)/)) {
    return {
      name: brandName,
      domain: hostname,
      productName: "Cold Brew Reserva Especial",
      industry: 'beverage',
      clientEmail: `campaigns@${hostname}`,
      clientContact: `Brand Manager de ${brandName}`,
      primaryEmoji: "☕",
      accentV1: "#10b981", // Fresh Green
      accentV2: "#d97706", // Caramel Gold
      gradientV1: "from-stone-900 via-emerald-950/70 to-black",
      gradientV2: "from-amber-950 via-yellow-950/70 to-stone-950"
    };
  }

  if (fullText.match(/(car|auto|tesla|motor|drive|vehicle|mobility|ev)/)) {
    return {
      name: brandName,
      domain: hostname,
      productName: "Electric Performance Series",
      industry: 'automotive',
      clientEmail: `marketing@${hostname}`,
      clientContact: `Dirección de Marketing de ${brandName}`,
      primaryEmoji: "🚗",
      accentV1: "#06b6d4", // Cyan
      accentV2: "#ef4444", // Racing Red
      gradientV1: "from-neutral-950 via-slate-900 to-black",
      gradientV2: "from-stone-950 via-red-950/50 to-neutral-950"
    };
  }

  // Default E-commerce / Modern Brand
  return {
    name: brandName,
    domain: hostname,
    productName: "Edición Signature 2026",
    industry: 'retail',
    clientEmail: `contacto@${hostname}`,
    clientContact: `Equipo de Marketing de ${brandName}`,
    primaryEmoji: "✨",
    accentV1: "#818cf8", // Indigo
    accentV2: "#f59e0b", // Sunset Amber
    gradientV1: "from-slate-950 via-slate-900 to-black",
    gradientV2: "from-amber-950/70 via-stone-900 to-slate-950"
  };
}

export function generateDynamicCreatives(brand: BrandProfile): { creatives: CreativeFormat[]; video: VideoSpec } {
  const b = brand.name;
  const p = brand.productName;

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
      subheadlineV1: `Diseñado por ${b} para máxima calidad y rendimiento superior.`,
      subheadlineV2: `Aprovecha código de bienvenida Q4 con 20% de descuento y envío prioritario.`,
      ctaV1: "Comprar Ahora",
      ctaV2: "Reclamar -20% OFF",
      badgeV1: "Top Ventas",
      badgeV2: "⭐ 20% OFF HOY",
      imagePromptV1: `${p} by ${b} centered on sleek minimalist marble pedestal, soft clean lighting, high-end commercial shot`,
      imagePromptV2: `${p} by ${b} in warm golden-hour sunset lighting, rich textures, vibrant details, 20% discount badge visual element`,
      bgGradientV1: brand.gradientV1,
      bgGradientV2: brand.gradientV2,
      accentColorV1: brand.accentV1,
      accentColorV2: brand.accentV2,
      productImg: "dropper",
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
      headlineV1: `Descubre ${p}`,
      headlineV2: `Tu Nuevo Favorito de ${b} (-20%)`,
      subheadlineV1: `La experiencia definitiva que transformará tu rutina diaria.`,
      subheadlineV2: `Únete a más de 20,000 clientes satisfechos. Stock limitado disponible.`,
      ctaV1: "Desliza para Ver",
      ctaV2: "Desliza y Ahorra 20%",
      badgeV1: "Tendencia",
      badgeV2: "🔥 Edición Limitada",
      imagePromptV1: `Vertical dynamic composition of ${p} by ${b}, atmospheric lighting, modern editorial aesthetic`,
      imagePromptV2: `Vertical frame with warm golden light, model smiling directly at camera with ${p}, warm tones, vibrant`,
      bgGradientV1: brand.gradientV1,
      bgGradientV2: brand.gradientV2,
      accentColorV1: brand.accentV1,
      accentColorV2: brand.accentV2,
      productImg: "face-glow",
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
      headlineV1: `3 Razones para Elegir ${b}`,
      headlineV2: `¿Por qué todos hablan de ${b}? • -20%`,
      subheadlineV1: `Calidad comprobada y testeada por expertos de la industria.`,
      subheadlineV2: `Garantía de satisfacción de 30 días. Prueba sin riesgo hoy mismo.`,
      ctaV1: "Ver Reseñas",
      ctaV2: "Comprar con Cupón",
      badgeV1: "Viral #TokTrends",
      badgeV2: "⚡ Cupón Activo",
      imagePromptV1: `UGC native style unboxing of ${b} ${p}, authentic natural setting`,
      imagePromptV2: `High energy UGC shot of ${p} with warm ambient glow and prominent promo pill overlay`,
      bgGradientV1: brand.gradientV1,
      bgGradientV2: brand.gradientV2,
      accentColorV1: brand.accentV1,
      accentColorV2: brand.accentV2,
      productImg: "ugc",
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
      headlineV1: `La Ciencia Detrás de ${b}`,
      headlineV2: `Innovación ${b} • 20% OFF`,
      subheadlineV1: `Tecnología de última generación diseñada para maximizar resultados.`,
      subheadlineV2: `Descubre por qué los especialistas eligen la gama ${b}.`,
      ctaV1: "Ver Demostración",
      ctaV2: "Comprar Ahora",
      badgeV1: "Innovación 2026",
      badgeV2: "🌿 Testeado y Certificado",
      imagePromptV1: `Precision macro detail of ${p} components, laboratory precision aesthetic`,
      imagePromptV2: `Warm cinematic sunlight striking ${p} by ${b}, glowing particles and golden hour atmosphere`,
      bgGradientV1: brand.gradientV1,
      bgGradientV2: brand.gradientV2,
      accentColorV1: brand.accentV1,
      accentColorV2: brand.accentV2,
      productImg: "lab",
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
      headlineV1: `Eleva tu Estándar con ${b}`,
      headlineV2: `Oportunidad Especial • 20% OFF`,
      subheadlineV1: `Materiales premium seleccionados para durar y destacar.`,
      subheadlineV2: `Envío gratis a todo el país en compras de lanzamiento este mes.`,
      ctaV1: "Conocer Más",
      ctaV2: "Ordenar con Descuento",
      badgeV1: "Recomendado",
      badgeV2: "✨ Garantía Oficial",
      imagePromptV1: `Hero packaging and product presentation of ${p} by ${b} on modern architectural surface`,
      imagePromptV2: `Warm sunset backlight on ${p}, lush natural environment, golden tones`,
      bgGradientV1: brand.gradientV1,
      bgGradientV2: brand.gradientV2,
      accentColorV1: brand.accentV1,
      accentColorV2: brand.accentV2,
      productImg: "pedestal",
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
      subheadlineV1: `Máximo rendimiento comprobado.`,
      subheadlineV2: `Código exclusivo disponible hoy.`,
      ctaV1: "Ver Más",
      ctaV2: "-20% Aquí",
      badgeV1: "Top Pick",
      badgeV2: "🎁 Envío Gratis",
      imagePromptV1: `Clean 300x250 Google Display banner ad for ${b}`,
      imagePromptV2: `Warm golden accent 300x250 banner with high contrast CTA for ${b}`,
      bgGradientV1: brand.gradientV1,
      bgGradientV2: brand.gradientV2,
      accentColorV1: brand.accentV1,
      accentColorV2: brand.accentV2,
      productImg: "banner-rect",
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
      headlineV1: `${b.toUpperCase()} — EXPERIMENTA ${p.toUpperCase()}`,
      headlineV2: `${b.toUpperCase()}: 20% OFF EN TU PRIMERA COMPRA HOY`,
      subheadlineV1: `Garantía oficial y entrega exprés en 24 horas.`,
      subheadlineV2: `Usa cupón en checkout y ahorra 20% inmediato.`,
      ctaV1: "Descubrir",
      ctaV2: "Obtener 20%",
      badgeV1: "Oficial",
      badgeV2: "Cupón Activo",
      imagePromptV1: `Horizontal 728x90 web leaderboard banner for ${b}`,
      imagePromptV2: `Horizontal golden gradient banner for ${b} with animated coupon pill`,
      bgGradientV1: brand.gradientV1,
      bgGradientV2: brand.gradientV2,
      accentColorV1: brand.accentV1,
      accentColorV2: brand.accentV2,
      productImg: "banner-wide",
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
      headlineV1: `Calidad Incomparable con ${b}`,
      headlineV2: `Oferta Especial ${b} (-20%)`,
      subheadlineV1: `La elección inteligente para quienes exigen lo mejor.`,
      subheadlineV2: `Más de 15,000 clientes satisfechos. Pide tu orden hoy.`,
      ctaV1: "Explorar Gama",
      ctaV2: "Comprar con 20%",
      badgeV1: "Destacado",
      badgeV2: "⭐ 4.9 / 5.0",
      imagePromptV1: `Vertical half page 300x600 banner layout featuring ${p} by ${b}`,
      imagePromptV2: `Warm golden vertical banner for ${b} with warm lighting and high contrast badge`,
      bgGradientV1: brand.gradientV1,
      bgGradientV2: brand.gradientV2,
      accentColorV1: brand.accentV1,
      accentColorV2: brand.accentV2,
      productImg: "half-page",
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
      headlineV1: `Lanzamiento Oficial: ${p}`,
      headlineV2: `Campaña Q4 ${b} • Descuento de Lanzamiento`,
      subheadlineV1: `Conoce las innovaciones y beneficios que diferencian a ${b}.`,
      subheadlineV2: `Ordena directo del fabricante y recibe soporte prioritario.`,
      ctaV1: "Más Información",
      ctaV2: "Comprar Ahora",
      badgeV1: "Lanzamiento",
      badgeV2: "🌱 Calidad Garantizada",
      imagePromptV1: `Wide landscape editorial product shot of ${p} by ${b}`,
      imagePromptV2: `Warm golden hour landscape setting showcasing ${p} by ${b}`,
      bgGradientV1: brand.gradientV1,
      bgGradientV2: brand.gradientV2,
      accentColorV1: brand.accentV1,
      accentColorV2: brand.accentV2,
      productImg: "landscape",
      model: "Imagen 3",
      fileSize: "2.1 MB",
      drivePath: `03_Feeds_and_Carousels/09_${b.replace(/\s+/g, '_')}_Landscape_1200x628.png`
    },
    {
      id: "fmt-10",
      name: "Carousel Card 1 — Beneficio Clave",
      channel: "Instagram",
      aspectRatio: "1:1",
      dimensions: "1080 x 1080 px",
      category: "feed-carousel",
      headlineV1: `01. Eficacia Comprobada`,
      headlineV2: `01. Resultados Reales • -20%`,
      subheadlineV1: `Tecnología optimizada para rendimiento y durabilidad.`,
      subheadlineV2: `Comienza tu experiencia hoy con descuento exclusivo.`,
      ctaV1: "Siguiente >",
      ctaV2: "Desliza >",
      badgeV1: "Paso 1 de 2",
      badgeV2: "Paso 1 de 2 • Ahorro",
      imagePromptV1: `Macro detail of ${p} features and textures, high clarity`,
      imagePromptV2: `Golden hour macro shot of ${p} with warm light flare`,
      bgGradientV1: brand.gradientV1,
      bgGradientV2: brand.gradientV2,
      accentColorV1: brand.accentV1,
      accentColorV2: brand.accentV2,
      productImg: "texture",
      model: "Imagen 3",
      fileSize: "1.7 MB",
      drivePath: `03_Feeds_and_Carousels/10_${b.replace(/\s+/g, '_')}_Card1_1080x1080.png`
    },
    {
      id: "fmt-11",
      name: "Carousel Card 2 — Satisfacción Total",
      channel: "Instagram",
      aspectRatio: "1:1",
      dimensions: "1080 x 1080 px",
      category: "feed-carousel",
      headlineV1: `02. 98% Satisfacción`,
      headlineV2: `02. Satisfacción o Reembolso`,
      subheadlineV1: `Validado por miles de clientes en todo el mundo.`,
      subheadlineV2: `Prueba durante 30 días sin ningún compromiso.`,
      ctaV1: "Comenzar",
      ctaV2: "Comprar Pack",
      badgeV1: "Paso 2 de 2",
      badgeV2: "Paso 2 de 2 • 20% OFF",
      imagePromptV1: `Clean product infographic card with proof metrics for ${b}`,
      imagePromptV2: `Warm glowing proof card with customer satisfaction metrics for ${b}`,
      bgGradientV1: brand.gradientV1,
      bgGradientV2: brand.gradientV2,
      accentColorV1: brand.accentV1,
      accentColorV2: brand.accentV2,
      productImg: "stats",
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
      headlineV1: `Inspiración & Estilo: ${b}`,
      headlineV2: `Colección ${b} • 20% OFF`,
      subheadlineV1: `El complemento perfecto para tu estilo de vida moderno.`,
      subheadlineV2: `Guarda este pin y desbloquea el cupón especial de bienvenida.`,
      ctaV1: "Guardar Pin",
      ctaV2: "Guardar & Comprar",
      badgeV1: "Inspo Diario",
      badgeV2: "📌 Pin Guardado + Cupón",
      imagePromptV1: `Aesthetic lifestyle flatlay featuring ${p} by ${b}`,
      imagePromptV2: `Warm sunlight streaming into modern setting with ${p} by ${b}`,
      bgGradientV1: brand.gradientV1,
      bgGradientV2: brand.gradientV2,
      accentColorV1: brand.accentV1,
      accentColorV2: brand.accentV2,
      productImg: "flatlay",
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
    promptV1: `Cinematic 10s shot for ${b}: Macro detail of ${p} in motion, camera rotates smoothly revealing product in modern lighting, high clarity 60fps.`,
    promptV2: `Cinematic 10s shot (Refined for ${b}): Warm golden-hour sunset lighting, model smiling directly at camera with ${p}, warm ambient flares, ending on '-20% OFF' animated discount badge.`,
    titleV1: `${b.toUpperCase()} — 10s Brand Experience`,
    titleV2: `${b.toUpperCase()} — Experience (20% OFF)`,
    ctaV1: `Descubre el Poder de ${b}`,
    ctaV2: `Reclama tu 20% OFF en ${b}`,
    audioTrack: `Ambient Modern Acoustic & Subtle Dynamic Beat (AI Generated for ${b})`,
    drivePath: `04_Video_Veo_Master/${b.replace(/\s+/g, '_')}_Veo_10s_Master_4K.mp4`
  };

  return { creatives, video };
}
