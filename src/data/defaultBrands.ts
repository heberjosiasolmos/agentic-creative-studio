import { FullBrandContext } from '../types';

export const DEFAULT_BRANDS: FullBrandContext[] = [
  {
    id: "brand-lumiere",
    name: "Lumière Botanics",
    domain: "lumiere-botanics.com",
    industry: "skincare",
    tagline: "Biotecnología Botánica Nórdica para una Piel de Cristal",
    description: "Marca premium de cuidado de la piel formulada con activos botánicos orgánicos recolectados en el Círculo Polar Ártico, validados dermatológicamente.",
    clientEmail: "sofia.martinez@lumiere-botanics.com",
    clientContact: "Sofía Martínez (Head of Marketing)",
    visuals: {
      primaryColor: "#0f766e", // Deep Teal
      secondaryColor: "#115e59",
      accentColor: "#f59e0b", // Warm Amber
      backgroundColor: "#0d1117",
      gradientV1: "from-slate-900 via-teal-950/70 to-slate-950",
      gradientV2: "from-amber-950/80 via-orange-950/60 to-stone-950",
      primaryFont: "Google Sans",
      secondaryFont: "Inter",
      logoUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=200&q=80",
    },
    persona: {
      archetype: "El Alquimista Limpio (Clean Science)",
      toneOfVoice: [
        "Aspiracional y Sofisticado",
        "Científico pero Accesible",
        "Transparente y Sereno",
        "Sensorial y Premium"
      ],
      targetAudience: {
        demographics: "Mujeres y hombres de 25 a 45 años, nivel socioeconómico A/B, preocupados por el envejecimiento prematuro y la sostenibilidad.",
        painPoints: [
          "Piel opaca, deshidratada y fatigada por estrés y polución urbana",
          "Reacciones a cosméticos sintéticos con fragancias artificiales",
          "Falta de resultados medibles en productos naturales convencionales"
        ],
        desires: [
          "Efecto 'Glass Skin' luminoso inmediato sin sensación grasa",
          "Rutinas minimalistas con ingredientes certificados y resultados clínicos",
          "Sensación de spa de lujo en casa"
        ]
      }
    },
    guardrails: {
      dos: [
        "Mencionar siempre 'Eficacia Clínica Comprobada' o 'Dermatológicamente Testeado'",
        "Destacar la procedencia nórdica y botánica de los extractos",
        "Usar iluminación natural limpia (luz de mañana) o dorada (golden hour)",
        "Incluir la garantía de satisfacción de 30 días en llamados de conversión",
        "Enfatizar la textura ligera y rápida absorción"
      ],
      donts: [
        "NUNCA usar las palabras 'cura', 'remedio milagroso' o promesas médicas imposibles",
        "NO utilizar tipografías manuscritas o estilo graffiti",
        "Evitar fondos saturados de color rojo o neón que desentonen con la calma botánica",
        "NO mostrar modelos con maquillaje pesado; priorizar piel limpia y natural",
        "NO hacer comparaciones despectivas hacia otras marcas"
      ],
      mandatoryDisclaimers: [
        "Resultados basados en estudio clínico independiente de 120 participantes durante 28 días.",
        "Aprobado por dermatólogos. No comedogénico."
      ],
      prohibitedWords: [
        "milagroso",
        "cura total",
        "magia",
        "100% libre de químicos",
        "barato",
        "ganga"
      ]
    },
    products: [
      {
        id: "prod-1",
        name: "Glow Serum Bio-Activo 50ml",
        sku: "LB-GLOW-050",
        asin: "B09X8Y7Z1A",
        category: "Serums & Tratamientos",
        price: 58.00,
        marginPercent: 74,
        stockStatus: "in_stock",
        uvp: "Triple ácido hialurónico vegetal y extracto de té verde nórdico que hidrata 72h y revitaliza la barrera cutánea.",
        keyBenefits: [
          "Luminosidad visible en 7 días",
          "Hidratación multicapa profunda",
          "Absorción inmediata sin brillo graso"
        ],
        approvedClaims: [
          "94% de usuarias notaron piel más luminosa en 7 días",
          "Retiene hasta 1000x su peso en agua"
        ],
        activeForAds: true,
        heroImage: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "prod-2",
        name: "Crème Régénératrice Nuit 60g",
        sku: "LB-CR-NUIT-060",
        asin: "B09X8Y7Z2B",
        category: "Cremas Hidratantes",
        price: 64.00,
        marginPercent: 71,
        stockStatus: "in_stock",
        uvp: "Complejo de péptidos árticos y ceramidas que repara la barrera celular durante el descanso nocturno.",
        keyBenefits: [
          "Regeneración celular nocturna intensiva",
          "Reducción visible de líneas finas",
          "Piel descansada y tersa al despertar"
        ],
        approvedClaims: [
          "+48% elasticidad cutánea tras 3 semanas",
          "Fórmula nutritiva no oclusiva"
        ],
        activeForAds: true,
        heroImage: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "prod-3",
        name: "Brume Botanique Équilibrante 100ml",
        sku: "LB-BRUME-100",
        asin: "B09X8Y7Z3C",
        category: "Tónicos y Brumas",
        price: 34.00,
        marginPercent: 82,
        stockStatus: "low_stock",
        uvp: "Bruma ultrafina con agua de glaciar y flor de saúco para refrescar, calmar y fijar el cuidado diario.",
        keyBenefits: [
          "Alivio instantáneo contra la tirantez",
          "Protección antioxidante ambiental",
          "Aplicable sobre o bajo el maquillaje"
        ],
        approvedClaims: [
          "Efecto refrescante de -2°C inmediato en piel",
          "Zero alcohol, 100% botánico"
        ],
        activeForAds: false,
        heroImage: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80"
      }
    ],
    agentDirectives: "Al redactar y diseñar creativos para Lumière Botanics, mantén siempre una estética de serenidad nórdica, minimalismo escandinavo y lujo limpio. La llamada a la acción debe invitar a experimentar la ciencia botánica. Prioriza el Glow Serum como producto ancla en formatos de adquisición y la Crème Régénératrice en retargeting.",
    updatedAt: "2026-10-21T18:00:00Z"
  },
  {
    id: "brand-voltstride",
    name: "Volt Stride Athletics",
    domain: "volt-stride.io",
    industry: "apparel",
    tagline: "Energía Reactiva en Cada Zancada",
    description: "Compañía de calzado y textil técnico de alto rendimiento para corredores urbanos y atletas que buscan superar sus récords.",
    clientEmail: "campaigns@volt-stride.io",
    clientContact: "Marcos Varela (Director de Performance)",
    visuals: {
      primaryColor: "#0284c7", // Electric Sky Blue
      secondaryColor: "#0369a1",
      accentColor: "#fbbf24", // Solar Volt Amber
      backgroundColor: "#09090b",
      gradientV1: "from-zinc-950 via-slate-900 to-black",
      gradientV2: "from-stone-900 via-amber-950/80 to-zinc-950",
      primaryFont: "Google Sans",
      secondaryFont: "Inter",
      logoUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=200&q=80",
    },
    persona: {
      archetype: "El Atleta Imparable (High Performance)",
      toneOfVoice: [
        "Enérgico y Audaz",
        "Directo y Desafiante",
        "Inspirador y Motivador",
        "Técnico de Alto Rendimiento"
      ],
      targetAudience: {
        demographics: "Corredores, deportistas de resistencia y entusiastas del fitness de 18 a 40 años.",
        painPoints: [
          "Fatiga prematura en carreras de media y larga distancia",
          "Zapatillas pesadas con poca amortiguación de retorno",
          "Desgaste rápido de suelas en asfalto urbano"
        ],
        desires: [
          "Mejorar ritmos por kilómetro con menor esfuerzo percibido",
          "Sensación de propulsión y ligereza máxima",
          "Estilo vanguardista que funciona en la pista y en la ciudad"
        ]
      }
    },
    guardrails: {
      dos: [
        "Mostrar atletas en acción real (velocidad, zancada, asfalto)",
        "Enfatizar la tecnología de amortiguación 'Aero-Foam' y retorno de energía",
        "Utilizar contrastes lumínicos intensos (luces de estadio, hora dorada urbana, neón)",
        "Llamadas a la acción con urgencia deportiva ('Supera tu Límite', 'Desbloquea tu Ritmo')"
      ],
      donts: [
        "NO mostrar poses estáticas o aburridas de estudio",
        "Evitar tonos apagados o desaturados",
        "NO prometer victorias automáticas; centrarse en la preparación del atleta"
      ],
      mandatoryDisclaimers: [
        "Garantía de rendimiento de 60 días en entrenamientos.",
        "Envío prioritario express en 24h a nivel nacional."
      ],
      prohibitedWords: [
        "lento",
        "casual",
        "descanso",
        "básico",
        "promedio"
      ]
    },
    products: [
      {
        id: "prod-vs-1",
        name: "Ultra Aero Runner Pro",
        sku: "VS-AERO-PRO-01",
        asin: "B08A1B2C3D",
        category: "Zapatillas de Running",
        price: 165.00,
        marginPercent: 62,
        stockStatus: "in_stock",
        uvp: "Placa de carbono compuesta y espuma Aero-Foam de doble densidad para un 85% de retorno de energía.",
        keyBenefits: [
          "Propulsión dinámica en cada despegue",
          "Peso ultra-pluma de solo 198 gramos",
          "Tracción superior en asfalto seco y mojado"
        ],
        approvedClaims: [
          "+85% retorno de energía probado en laboratorio",
          "Diseñada para ritmos sub 4:00 min/km"
        ],
        activeForAds: true,
        heroImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "prod-vs-2",
        name: "Carbon Pace Elite Edition",
        sku: "VS-CARBON-ELITE",
        asin: "B08A1B2C3E",
        category: "Zapatillas de Competición",
        price: 210.00,
        marginPercent: 58,
        stockStatus: "in_stock",
        uvp: "Edición maratón homologada por World Athletics con drop de 8mm para distancias de 21K a 42K.",
        keyBenefits: [
          "Eficiencia biomecánica para maratón",
          "Upper de monomalla transpirable sin costuras",
          "Rigidez torsional optimizada"
        ],
        approvedClaims: [
          "Homologada para competición oficial",
          "Utilizada por atletas de podio nacional"
        ],
        activeForAds: true,
        heroImage: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80"
      }
    ],
    agentDirectives: "Para Volt Stride Athletics, los creativos deben transmitir propulsión, velocidad implacable y tecnología deportiva de vanguardia. En video Veo genera tomas en movimiento con cámara en seguimiento a ras de suelo y contrastes de sol naciente.",
    updatedAt: "2026-10-21T18:00:00Z"
  },
  {
    id: "brand-pulseai",
    name: "Pulse AI Systems",
    domain: "pulse-saas.com",
    industry: "tech",
    tagline: "Orquestación Agéntica de Datos para la Empresa Moderna",
    description: "Plataforma de inteligencia artificial empresarial que unifica data warehouses, agentes autónomos y análisis predictivo en una sola interfaz.",
    clientEmail: "growth@pulse-saas.com",
    clientContact: "Elena Rostova (Head of Growth)",
    visuals: {
      primaryColor: "#7c3aed", // Electric Violet
      secondaryColor: "#6d28d9",
      accentColor: "#f97316", // Coral Orange
      backgroundColor: "#090d16",
      gradientV1: "from-slate-950 via-indigo-950/80 to-slate-900",
      gradientV2: "from-purple-950 via-amber-950/60 to-slate-950",
      primaryFont: "Google Sans",
      secondaryFont: "JetBrains Mono",
      logoUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=200&q=80",
    },
    persona: {
      archetype: "El Visionario Tecnológico (Enterprise Pioneer)",
      toneOfVoice: [
        "Autoritativo e Innovador",
        "Preciso y Basado en ROI",
        "Elegante y Vanguardista",
        "Sin Fricciones"
      ],
      targetAudience: {
        demographics: "CTOs, VP of Engineering, Data Leaders y Directores de Operaciones en medianas y grandes empresas.",
        painPoints: [
          "Silos de datos desconectados entre AWS, Snowflake y Google Cloud",
          "Meses de desarrollo para poner en producción agentes de IA seguros",
          "Costos descontrolados de inferencia y falta de observabilidad"
        ],
        desires: [
          "Desplegar pipelines agénticos en días, no en trimestres",
          "Gobernanza de datos de nivel corporativo con SOC2 y cifrado end-to-end",
          "Reducción demostrable de costos operativos con ROI medible"
        ]
      }
    },
    guardrails: {
      dos: [
        "Hablar de ROI, eficiencia de cómputo y reducción de horas de ingeniería",
        "Mostrar interfaces oscuras con visualización de grafos, pipelines y métricas en vivo",
        "Destacar la compatibilidad universal (BigQuery, Databricks, Snowflake, S3)",
        "Llamadas a la acción orientadas a 'Solicitar Demo Ejecutiva' o 'Iniciar Prueba de 14 Días'"
      ],
      donts: [
        "NO usar términos superficiales como 'IA mágica' o 'haz clic y hazte rico'",
        "Evitar robots humanoides cliché o cerebros brillantes de stock",
        "NO hacer promesas que comprometan la seguridad de datos corporativos"
      ],
      mandatoryDisclaimers: [
        "Certificación SOC2 Tipo II y cumplimiento GDPR / HIPAA.",
        "Despliegue seguro en tu propia VPC o en cloud dedicado."
      ],
      prohibitedWords: [
        "mágico",
        "juguete",
        "gratis de por vida",
        "fácil para novatos"
      ]
    },
    products: [
      {
        id: "prod-pulse-1",
        name: "Pulse Enterprise Agent Suite",
        sku: "PULSE-ENT-001",
        asin: "SAAS-PULSE-ENT",
        category: "Enterprise AI Platform",
        price: 1200.00,
        marginPercent: 88,
        stockStatus: "in_stock",
        uvp: "Orquestador de agentes multimodales con conectores nativos a más de 40 almacenes de datos y gobernanza en tiempo real.",
        keyBenefits: [
          "Despliegue de agentes en menos de 48 horas",
          "Aislamiento estricto de datos por tenant",
          "Reducción de hasta un 60% en costos de llamadas a LLMs"
        ],
        approvedClaims: [
          "Utilizado por empresas Fortune 500 para automatización de datos",
          "99.99% SLA garantizado"
        ],
        activeForAds: true,
        heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
      }
    ],
    agentDirectives: "Para Pulse AI Systems, los creativos deben proyectar autoridad tecnológica y sofisticación corporativa. El estilo visual debe ser sobrio pero futurista (glassmorphism oscuro, tipografía monospace para métricas, acentos púrpuras y cian).",
    updatedAt: "2026-10-21T18:00:00Z"
  }
];

export const BRAND_STORAGE_KEY = 'gemini_agentic_brand_vault_v1';

export function loadStoredBrands(): FullBrandContext[] {
  try {
    const raw = localStorage.getItem(BRAND_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Error loading stored brands from localStorage:", e);
  }
  return DEFAULT_BRANDS;
}

export function saveBrandsToStorage(brands: FullBrandContext[]): void {
  try {
    localStorage.setItem(BRAND_STORAGE_KEY, JSON.stringify(brands));
  } catch (e) {
    console.error("Error saving brands to localStorage:", e);
  }
}
