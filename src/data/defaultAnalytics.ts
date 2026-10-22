import { BrandAnalyticsData } from '../types';

export const DEFAULT_ANALYTICS: Record<string, BrandAnalyticsData> = {
  'brand-lumiere': {
    brandId: 'brand-lumiere',
    blendedRoas: 4.52,
    totalSpend: 34820,
    totalRevenue: 157386,
    avgCpa: 18.40,
    avgCtr: 3.28,
    creativeHealthScore: 72,
    channels: [
      {
        channel: 'Meta Ads (Advantage+)',
        spend: 19500,
        roas: 4.85,
        conversions: 1240,
        activeCreatives: 6,
        fatiguedCreatives: 2
      },
      {
        channel: 'Google Ads (Demand Gen)',
        spend: 10200,
        roas: 4.30,
        conversions: 580,
        activeCreatives: 4,
        fatiguedCreatives: 1
      },
      {
        channel: 'TikTok Spark Ads',
        spend: 3120,
        roas: 3.65,
        conversions: 210,
        activeCreatives: 2,
        fatiguedCreatives: 0
      },
      {
        channel: 'Amazon Sponsored Brands',
        spend: 2000,
        roas: 4.95,
        conversions: 145,
        activeCreatives: 2,
        fatiguedCreatives: 0
      }
    ],
    creatives: [
      {
        id: 'lum-perf-1',
        formatId: 'ig-story-vertical',
        name: 'Glow Serum: Evidencia Clínica 72h',
        channel: 'Meta Ads',
        aspectRatio: '9:16 Vertical',
        thumbnailUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
        spend: 6420,
        revenue: 34796,
        roas: 5.42,
        ctr: 4.15,
        cpa: 15.20,
        impressions: 420000,
        frequency: 2.1,
        fatigueScore: 24,
        status: 'top_performer',
        winningHook: 'Validación dermatológica: +120% hidratación celular en 72h',
        recommendedAction: 'Escalar presupuesto +30% y derivar variaciones cuadradas para Meta Feed',
        suggestedPrompt: 'Escalar el hook ganador "Evidencia Clínica 72h" de Lumière Botanics: generar 3 nuevas composiciones con macro-fotografía de gota de serum y aval dermatológico.'
      },
      {
        id: 'lum-perf-2',
        formatId: 'fb-feed-square',
        name: 'Glow Serum: Pureza Botánica Lifestyle',
        channel: 'Meta Ads',
        aspectRatio: '1:1 Cuadrado',
        thumbnailUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
        spend: 7890,
        revenue: 21303,
        roas: 2.70,
        ctr: 1.48,
        cpa: 31.80,
        impressions: 740000,
        frequency: 5.4,
        fatigueScore: 89,
        status: 'fatigued',
        winningHook: 'Ingredientes puros del Círculo Polar Ártico',
        recommendedAction: 'FATIGA CRÍTICA: Reemplazar paleta por Golden Hour cálido, agregar sticker "-20% OFF" y modelo sonriendo.',
        suggestedPrompt: 'Re-generar creativo fatigado de Lumière Botanics: sustituir iluminación fría por cálida luz de atardecer, incluir badge "-20% OFF" y modelo sonriendo con frasco en mano.'
      },
      {
        id: 'lum-perf-3',
        formatId: 'veo-10s-reel',
        name: 'Veo Video 10s: Rutina Glass Skin',
        channel: 'TikTok',
        aspectRatio: '9:16 Cinemático',
        thumbnailUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80',
        spend: 4200,
        revenue: 19740,
        roas: 4.70,
        ctr: 3.82,
        cpa: 16.90,
        impressions: 380000,
        frequency: 2.4,
        fatigueScore: 32,
        status: 'scaling',
        winningHook: '3 gotas antes de dormir = piel luminosa al despertar',
        recommendedAction: 'Extender a Instagram Reels y YouTube Shorts con audio inmersivo',
        suggestedPrompt: 'Generar segunda escena cinematográfica con Google Veo para Lumière: plano cerrado de aplicación con gotas doradas y transición a rostro radiante.'
      },
      {
        id: 'lum-perf-4',
        formatId: 'g-demand-gen',
        name: 'Bálsamo Ártico: Comparativa Textura',
        channel: 'Google Ads',
        aspectRatio: '1.91:1 Display',
        thumbnailUrl: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80',
        spend: 5100,
        revenue: 21420,
        roas: 4.20,
        ctr: 2.75,
        cpa: 19.80,
        impressions: 310000,
        frequency: 3.2,
        fatigueScore: 48,
        status: 'testing',
        winningHook: 'Barrera de lípidos reforzada para clima extremo',
        recommendedAction: 'Combinar con landing page de estudio clínico para potenciar PMax',
        suggestedPrompt: 'Crear adaptación para Google Demand Gen destacando la fórmula nórdica y comparativa de textura ultra-ligera sin residuo graso.'
      }
    ],
    searchTerms: [
      {
        id: 'st-lum-1',
        term: 'serum acido hialuronico botanico vegano',
        channel: 'Google Search',
        impressions: 48200,
        clicks: 3240,
        ctr: 6.72,
        roas: 6.40,
        conversionRate: 5.1,
        coverageStatus: 'uncovered',
        intentCategory: 'ingredient_focus',
        suggestedPrompt: 'Crear creativo publicitario hiper-enfocado en el término de búsqueda "serum ácido hialurónico botánico vegano": destacar pureza ártica, 0% químicos y resultados en 72h.'
      },
      {
        id: 'st-lum-2',
        term: 'mejor serum luminosidad piel sensible sin perfume',
        channel: 'Google Search',
        impressions: 39100,
        clicks: 2410,
        ctr: 6.16,
        roas: 5.85,
        conversionRate: 4.6,
        coverageStatus: 'uncovered',
        intentCategory: 'problem_solution',
        suggestedPrompt: 'Diseñar anuncio para el dolor específico "piel sensible y reactiva": enfatizar fórmula calmante certificada hipoalergénica con acabado Glass Skin inmediato.'
      },
      {
        id: 'st-lum-3',
        term: 'crema antiedad bio extractos nordicos',
        channel: 'Amazon Ads',
        impressions: 21500,
        clicks: 1280,
        ctr: 5.95,
        roas: 5.10,
        conversionRate: 4.1,
        coverageStatus: 'low_relevance',
        intentCategory: 'ingredient_focus',
        suggestedPrompt: 'Adaptar creatividad para Amazon Sponsored Products: empaque nórdico prémium con sello de biotécnica limpia y entrega en 24h.'
      },
      {
        id: 'st-lum-4',
        term: 'lumiere botanics codigo descuento primera compra',
        channel: 'Google Search',
        impressions: 14200,
        clicks: 1780,
        ctr: 12.53,
        roas: 8.90,
        conversionRate: 9.8,
        coverageStatus: 'covered',
        intentCategory: 'urgency',
        suggestedPrompt: 'Optimizar banner de retargeting de alta urgencia con cupón de bienvenida "BIENVENIDA20" y garantía de devolución 30 días.'
      }
    ],
    aiStrategicInsights: [
      {
        id: 'lum-ai-1',
        type: 'critical',
        title: 'Alerta de Fatiga Crítica en Meta Ads',
        description: 'El anuncio "Pureza Botánica Lifestyle" superó una frecuencia acumulada de 5.4x en los últimos 7 días. Su CPA subió de $16.50 a $31.80.',
        metricImpact: 'Pérdida estimada de -$4,200 en margen mensual si no se rota el contenido.',
        actionLabel: 'Generar Variación Anti-Fatiga (Paso 2)',
        promptToExecute: 'Aplicar feedback anti-fatiga en Lumière Botanics: iluminar con hora dorada cálida, insertar badge destacado de "-20% OFF" y modelo mirando a cámara con sonrisa natural.'
      },
      {
        id: 'lum-ai-2',
        type: 'opportunity',
        title: 'Alta Demanda de Búsqueda Desatendida',
        description: 'La consulta "serum acido hialuronico botanico vegano" genera un ROAS excepcional de 6.4x en Google Search, pero no tiene creativos visuales específicos en Demand Gen.',
        metricImpact: 'Potencial de escalado de +$18,000 mensuales con creativos dedicados.',
        actionLabel: 'Crear Ad para Search Query',
        promptToExecute: 'Generar creatividad específica para el término "serum ácido hialurónico botánico vegano": resaltar origen 100% natural, absorción en 30s y sello dermatólogo.'
      },
      {
        id: 'lum-ai-3',
        type: 'scale',
        title: 'Hook de "Evidencia Clínica 72h" Lidera Conversión',
        description: 'Los creativos que exhiben métricas científicas cuantificables logran un +64% más de CTR y un ROAS 5.42x superior al promedio de la cuenta.',
        metricImpact: 'Estructurar nuevos formatos multicanal alrededor de este hook ganador.',
        actionLabel: 'Escalar Hook a 12 Formatos',
        promptToExecute: 'Replicar el hook de Evidencia Clínica 72h en los 12 formatos multicanal (Vertical 9:16, Cuadrado 1:1, Display 1.91:1) manteniendo coherencia visual.'
      }
    ]
  },

  'brand-volt': {
    brandId: 'brand-volt',
    blendedRoas: 4.18,
    totalSpend: 42100,
    totalRevenue: 175978,
    avgCpa: 24.30,
    avgCtr: 3.65,
    creativeHealthScore: 78,
    channels: [
      {
        channel: 'Meta Ads (Advantage+)',
        spend: 22400,
        roas: 4.45,
        conversions: 920,
        activeCreatives: 5,
        fatiguedCreatives: 1
      },
      {
        channel: 'Google Ads (Search & PMax)',
        spend: 12500,
        roas: 4.10,
        conversions: 514,
        activeCreatives: 4,
        fatiguedCreatives: 1
      },
      {
        channel: 'TikTok Spark Ads',
        spend: 5200,
        roas: 3.80,
        conversions: 215,
        activeCreatives: 3,
        fatiguedCreatives: 0
      },
      {
        channel: 'Amazon Sponsored Brands',
        spend: 2000,
        roas: 4.60,
        conversions: 82,
        activeCreatives: 2,
        fatiguedCreatives: 0
      }
    ],
    creatives: [
      {
        id: 'volt-perf-1',
        formatId: 'ig-story-vertical',
        name: 'Carbon Plate: Vence tu Mejor Marca',
        channel: 'Meta Ads',
        aspectRatio: '9:16 Vertical',
        thumbnailUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
        spend: 8900,
        revenue: 44500,
        roas: 5.00,
        ctr: 4.42,
        cpa: 21.10,
        impressions: 480000,
        frequency: 2.2,
        fatigueScore: 28,
        status: 'top_performer',
        winningHook: 'Propulsión de placa de carbono: rebaja 4% de esfuerzo por kilómetro',
        recommendedAction: 'Aumentar inversión y expandir a audiencias de maratonistas en Strava/Meta',
        suggestedPrompt: 'Escalar el anuncio ganador de Volt Stride: crear variaciones destacando la placa de fibra de carbono aeroespacial y el retorno de energía del 85%.'
      },
      {
        id: 'volt-perf-2',
        formatId: 'fb-feed-square',
        name: 'Volt Stride: Calzado Urbano Nocturno',
        channel: 'Meta Ads',
        aspectRatio: '1:1 Cuadrado',
        thumbnailUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80',
        spend: 9400,
        revenue: 23500,
        roas: 2.50,
        ctr: 1.62,
        cpa: 39.50,
        impressions: 890000,
        frequency: 5.8,
        fatigueScore: 92,
        status: 'fatigued',
        winningHook: 'Estilo deportivo para la ciudad',
        recommendedAction: 'FATIGA SEVERA: Renovar visual por atardecer energético con badge "-20% Marathon Special".',
        suggestedPrompt: 'Combatir fatiga en Volt Stride: generar anuncio con corredor en hora dorada en asfalto, badge reflectivo "-20% OFF Edición Maratón" y tipografía veloz.'
      },
      {
        id: 'volt-perf-3',
        formatId: 'veo-10s-reel',
        name: 'Veo Video 10s: Despegue en Asfalto',
        channel: 'TikTok',
        aspectRatio: '9:16 Cinemático',
        thumbnailUrl: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=600&q=80',
        spend: 4100,
        revenue: 17630,
        roas: 4.30,
        ctr: 4.10,
        cpa: 22.80,
        impressions: 340000,
        frequency: 2.0,
        fatigueScore: 22,
        status: 'scaling',
        winningHook: 'Sensación de ingravidez en cada zancada',
        recommendedAction: 'Escalar en TikTok con sonido de alta cadencia (180 BPM)',
        suggestedPrompt: 'Generar variación de video de 10s con Google Veo para Volt Stride: cámara lenta ultra HD de impacto del talón y despegue reactivo con chispas de luz.'
      }
    ],
    searchTerms: [
      {
        id: 'st-volt-1',
        term: 'zapatillas running placa de carbono livianas maraton',
        channel: 'Google Search',
        impressions: 54000,
        clicks: 3950,
        ctr: 7.31,
        roas: 6.10,
        conversionRate: 4.9,
        coverageStatus: 'uncovered',
        intentCategory: 'comparison',
        suggestedPrompt: 'Crear anuncio comparativo de alto rendimiento para "zapatillas con placa de carbono": peso 198g, espuma nitrogenada y homologación World Athletics.'
      },
      {
        id: 'st-volt-2',
        term: 'mejores tenis para correr medio maraton pronador',
        channel: 'Google Search',
        impressions: 31200,
        clicks: 1980,
        ctr: 6.35,
        roas: 5.40,
        conversionRate: 4.2,
        coverageStatus: 'low_relevance',
        intentCategory: 'problem_solution',
        suggestedPrompt: 'Diseñar anuncio técnico enfocado en estabilidad torsional, soporte dinámico de arco y amortiguación para distancias de 21k.'
      }
    ],
    aiStrategicInsights: [
      {
        id: 'volt-ai-1',
        type: 'critical',
        title: 'Fatiga Extrema en Campaña Urbana (Frecuencia 5.8x)',
        description: 'El creativo estático de calzado urbano ha llegado a saturación. El CPA se duplicó a $39.50.',
        metricImpact: 'Reemplazo urgente por variación de hora dorada con descuento del 20%.',
        actionLabel: 'Generar Variación Anti-Fatiga',
        promptToExecute: 'Re-renderizar creativos de Volt Stride con iluminación cálida sunset, corredor en plena zancada en pista urbana y badge "-20% OFF".'
      },
      {
        id: 'volt-ai-2',
        type: 'opportunity',
        title: 'Fuerte Intención en Placa de Carbono',
        description: 'Las búsquedas técnicas de maratón tienen CTR del 7.31% y ROAS 6.10x sin creativos visuales adaptados.',
        metricImpact: 'Oportunidad de captura de demanda valorada en +$24,000 en ventas mensuales.',
        actionLabel: 'Crear Ad para Search Query',
        promptToExecute: 'Generar anuncio visual de alta tecnología centrado en "Placa de Carbono Full-Length" con diagrama técnico y cronómetro digital de récord personal.'
      }
    ]
  },

  'brand-pulse': {
    brandId: 'brand-pulse',
    blendedRoas: 4.88,
    totalSpend: 28900,
    totalRevenue: 141032,
    avgCpa: 48.20,
    avgCtr: 2.95,
    creativeHealthScore: 84,
    channels: [
      {
        channel: 'LinkedIn Ads & Meta B2B',
        spend: 16500,
        roas: 5.15,
        conversions: 342,
        activeCreatives: 5,
        fatiguedCreatives: 1
      },
      {
        channel: 'Google Ads (Search B2B)',
        spend: 9800,
        roas: 4.70,
        conversions: 203,
        activeCreatives: 3,
        fatiguedCreatives: 0
      },
      {
        channel: 'YouTube Video Action',
        spend: 2600,
        roas: 4.20,
        conversions: 54,
        activeCreatives: 2,
        fatiguedCreatives: 0
      }
    ],
    creatives: [
      {
        id: 'pulse-perf-1',
        formatId: 'ig-story-vertical',
        name: 'Workspace AI: Automatiza 20h de Operaciones',
        channel: 'Meta Ads',
        aspectRatio: '9:16 Vertical',
        thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
        spend: 7200,
        revenue: 38880,
        roas: 5.40,
        ctr: 3.40,
        cpa: 42.10,
        impressions: 290000,
        frequency: 2.1,
        fatigueScore: 26,
        status: 'top_performer',
        winningHook: 'Ahorra 20 horas semanales por analista con orquestación autónoma de agentes',
        recommendedAction: 'Escalar para decisores en operaciones, finanzas y tecnología',
        suggestedPrompt: 'Crear serie de anuncios B2B para Pulse AI enfocados en ROI: "Reduce 20h operativas a la semana con agentes multi-modelo integrados con Google Cloud".'
      },
      {
        id: 'pulse-perf-2',
        formatId: 'fb-feed-square',
        name: 'Pulse AI: Dashboard Genérico',
        channel: 'Meta Ads',
        aspectRatio: '1:1 Cuadrado',
        thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
        spend: 6800,
        revenue: 19720,
        roas: 2.90,
        ctr: 1.55,
        cpa: 68.00,
        impressions: 510000,
        frequency: 5.1,
        fatigueScore: 84,
        status: 'fatigued',
        winningHook: 'La plataforma de IA para empresas modernas',
        recommendedAction: 'FATIGADO: Actualizar UI a modo oscuro elegante con oferta "-20% en plan anual"',
        suggestedPrompt: 'Actualizar creativos de Pulse AI para combatir fatiga: mostrar interfaz oscura futurista de agentes interactuando, badge "-20% Anual" y prueba gratuita de 14 días.'
      }
    ],
    searchTerms: [
      {
        id: 'st-pulse-1',
        term: 'plataforma de agentes de inteligencia artificial para empresas b2b',
        channel: 'Google Search',
        impressions: 24500,
        clicks: 1840,
        ctr: 7.51,
        roas: 6.80,
        conversionRate: 6.2,
        coverageStatus: 'uncovered',
        intentCategory: 'problem_solution',
        suggestedPrompt: 'Crear anuncio corporativo de alta conversión para "agentes de IA empresariales": enfatizar cumplimiento SOC2, despliegue en Google Cloud y prueba sin tarjeta.'
      }
    ],
    aiStrategicInsights: [
      {
        id: 'pulse-ai-1',
        type: 'critical',
        title: 'Fatiga en Creativo de Dashboard General',
        description: 'El anuncio con captura de interfaz tradicional llegó a frecuencia 5.1x. Los costos por lead subieron a $68.',
        metricImpact: 'Reemplazar por flujo visual dinámico de agentes con oferta de prueba anual.',
        actionLabel: 'Generar Variación Anti-Fatiga',
        promptToExecute: 'Generar creatividad moderna para Pulse AI con agentes autónomos en acción, badge de "-20% Descuento Anual" y botón "Comenzar Demo".'
      }
    ]
  }
};

const STORAGE_KEY = 'gemini_creative_analytics_v1';

export const loadStoredAnalytics = (): Record<string, BrandAnalyticsData> => {
  if (typeof window === 'undefined') return DEFAULT_ANALYTICS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_ANALYTICS;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_ANALYTICS, ...parsed };
  } catch (err) {
    console.error('Error loading analytics from storage:', err);
    return DEFAULT_ANALYTICS;
  }
};

export const saveAnalyticsToStorage = (analytics: Record<string, BrandAnalyticsData>) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(analytics));
  } catch (err) {
    console.error('Error saving analytics to storage:', err);
  }
};
