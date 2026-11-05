import React, { useState, useEffect } from 'react';
import { FullBrandContext, BrandProduct } from '../types';
import { 
  Building2, 
  X, 
  Sparkles, 
  Check, 
  Palette, 
  ShoppingBag, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft,
  Globe,
  Mail,
  User,
  Tag
} from 'lucide-react';

interface CreateClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateClient: (newBrand: FullBrandContext) => void;
  initialDomain?: string;
}

const INDUSTRY_PRESETS = [
  { value: 'skincare', label: '🌿 Cuidado Personal & Belleza (Skincare)', defaultColor: '#0f766e', accent: '#f59e0b' },
  { value: 'apparel', label: '👟 Moda, Calzado & Deporte (Apparel)', defaultColor: '#0284c7', accent: '#38bdf8' },
  { value: 'tech', label: '⚡ Tecnología, IA & Software (Tech / SaaS)', defaultColor: '#6366f1', accent: '#06b6d4' },
  { value: 'retail', label: '🛋️ Hogar, Muebles & Decoración (Retail)', defaultColor: '#c29b38', accent: '#e5c07b' },
  { value: 'beverage', label: '🍵 Alimentos & Bebidas Funcionales (Beverage)', defaultColor: '#16a34a', accent: '#facc15' },
  { value: 'automotive', label: '🏎️ Movilidad & Automotriz (Automotive)', defaultColor: '#dc2626', accent: '#fbbf24' }
] as const;

export const CreateClientModal: React.FC<CreateClientModalProps> = ({
  isOpen,
  onClose,
  onCreateClient,
  initialDomain = ''
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [name, setName] = useState('');
  const [domain, setDomain] = useState(initialDomain || '');
  const [industry, setIndustry] = useState<'skincare' | 'apparel' | 'tech' | 'retail' | 'beverage' | 'automotive'>('tech');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [clientContact, setClientContact] = useState('');
  const [clientEmail, setClientEmail] = useState('');

  // Step 2: Visuals
  const [primaryColor, setPrimaryColor] = useState('#6366f1');
  const [secondaryColor, setSecondaryColor] = useState('#4338ca');
  const [accentColor, setAccentColor] = useState('#06b6d4');
  const [logoUrl, setLogoUrl] = useState('');

  // Step 3: Product & Guardrails
  const [productName, setProductName] = useState('');
  const [productSku, setProductSku] = useState('');
  const [productPrice, setProductPrice] = useState(79.00);
  const [productMargin, setProductMargin] = useState(65);
  const [productUvp, setProductUvp] = useState('');
  const [productImage, setProductImage] = useState('');
  const [do1, setDo1] = useState('Mantener lenguaje sofisticado y métricas cuantificables');
  const [do2, setDo2] = useState('Enfatizar garantía y soporte prioritario 24/7');
  const [dont1, setDont1] = useState('Evitar términos informales o promesas sin sustento');
  const [dont2, setDont2] = useState('No usar colores fluorescentes o saturados');

  useEffect(() => {
    if (initialDomain) {
      setDomain(initialDomain);
      const cleanName = initialDomain
        .replace(/^https?:\/\//i, '')
        .replace(/^www\./i, '')
        .split('.')[0]
        .split('/')[0];
      if (cleanName && !name) {
        setName(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
      }
    }
  }, [initialDomain]);

  if (!isOpen) return null;

  const handleIndustryChange = (val: typeof industry) => {
    setIndustry(val);
    const preset = INDUSTRY_PRESETS.find(p => p.value === val);
    if (preset) {
      setPrimaryColor(preset.defaultColor);
      setAccentColor(preset.accent);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !domain.trim()) return;

    const brandId = `brand-${Date.now()}`;
    const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');

    const newBrand: FullBrandContext = {
      id: brandId,
      name: name.trim(),
      domain: cleanDomain,
      industry,
      tagline: tagline.trim() || `Innovación y calidad líder en ${industry}`,
      description: description.trim() || `${name.trim()} es una marca referente en ${industry}, comprometida con la excelencia y la satisfacción del cliente.`,
      clientContact: clientContact.trim() || 'Director de Marketing & Crecimiento',
      clientEmail: clientEmail.trim() || `marketing@${cleanDomain}`,
      visuals: {
        primaryColor,
        secondaryColor,
        accentColor,
        backgroundColor: '#0d1117',
        gradientV1: 'from-slate-900 via-indigo-950/60 to-slate-950',
        gradientV2: 'from-stone-900 via-neutral-900 to-slate-950',
        primaryFont: 'Google Sans',
        secondaryFont: 'Inter',
        logoUrl: logoUrl.trim() || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80'
      },
      persona: {
        archetype: 'El Innovador Confiable',
        toneOfVoice: ['Profesional', 'Aspiracional', 'Claro', 'Premium'],
        targetAudience: {
          demographics: 'Público objetivo calificado, hombres y mujeres de 25 a 50 años.',
          painPoints: ['Pérdida de tiempo con soluciones genéricas', 'Falta de calidad comprobable'],
          desires: ['Resultados rápidos y duraderos', 'Atención de primer nivel']
        }
      },
      guardrails: {
        dos: [do1.trim(), do2.trim()].filter(Boolean),
        donts: [dont1.trim(), dont2.trim()].filter(Boolean),
        mandatoryDisclaimers: ['Garantía de satisfacción oficial.', 'Consulte términos y condiciones en la web.'],
        prohibitedWords: ['barato', 'milagroso', 'ganga', 'gratis sin compromiso']
      },
      products: [
        {
          id: `prod-${Date.now()}`,
          name: productName.trim() || `${name.trim()} Colección Principal`,
          sku: productSku.trim() || `${name.substring(0, 3).toUpperCase()}-001`,
          asin: `ASIN-${Math.floor(100000 + Math.random() * 900000)}`,
          category: 'Destacados',
          price: Number(productPrice) || 49.99,
          marginPercent: Number(productMargin) || 70,
          stockStatus: 'in_stock',
          uvp: productUvp.trim() || 'Propuesta de valor diferenciada con ingeniería y calidad garantizada.',
          keyBenefits: ['Rendimiento superior validado', 'Materiales de máxima durabilidad', 'Soporte y garantía directa'],
          approvedClaims: ['Calidad comprobada por especialistas', 'Satisfacción 100% garantizada'],
          activeForAds: true,
          heroImage: productImage.trim() || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'
        }
      ],
      agentDirectives: `Para ${name.trim()}, mantener un tono equilibrado y diseño minimalista. Usar la paleta corporativa (${primaryColor} y ${accentColor}) en todos los formatos generados.`,
      updatedAt: new Date().toISOString()
    };

    onCreateClient(newBrand);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#18191c] border border-[#2e3136] rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#26282c] bg-[#141517] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-purple-600/20">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-google font-bold text-base text-white">Registrar Nuevo Cliente Corporativo</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Paso {step} de 3
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Incorpora una nueva marca al portfolio con guardrails, paleta y catálogo activo
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

        {/* Step Progress Indicators */}
        <div className="px-6 py-2.5 bg-[#121315] border-b border-[#242629] flex items-center justify-between text-xs">
          <div 
            onClick={() => setStep(1)}
            className={`flex items-center space-x-2 cursor-pointer transition ${step === 1 ? 'text-purple-300 font-semibold' : 'text-gray-400'}`}
          >
            <span className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-mono ${step === 1 ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-400'}`}>1</span>
            <span>Datos Empresariales</span>
          </div>

          <div className="w-8 h-[1px] bg-white/10" />

          <div 
            onClick={() => setStep(2)}
            className={`flex items-center space-x-2 cursor-pointer transition ${step === 2 ? 'text-purple-300 font-semibold' : 'text-gray-400'}`}
          >
            <span className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-mono ${step === 2 ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-400'}`}>2</span>
            <span>Identidad Visual</span>
          </div>

          <div className="w-8 h-[1px] bg-white/10" />

          <div 
            onClick={() => setStep(3)}
            className={`flex items-center space-x-2 cursor-pointer transition ${step === 3 ? 'text-purple-300 font-semibold' : 'text-gray-400'}`}
          >
            <span className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-mono ${step === 3 ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-400'}`}>3</span>
            <span>Producto & Guardrails</span>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          
          {/* STEP 1: DATOS EMPRESARIALES */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-200">
                    Nombre Comercial de la Marca *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Lumina Audio, Terra Botanics..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#121316] border border-[#34373d] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-200">
                    Dominio Web Principal *
                  </label>
                  <input
                    type="text"
                    required
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="Ej. lumina-audio.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#121316] border border-[#34373d] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-200">
                  Industria / Vertical de Negocio
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {INDUSTRY_PRESETS.map((ind) => (
                    <button
                      key={ind.value}
                      type="button"
                      onClick={() => handleIndustryChange(ind.value as any)}
                      className={`text-left p-2.5 rounded-xl border text-xs transition flex items-center justify-between ${
                        industry === ind.value
                          ? 'bg-purple-600/15 border-purple-500 text-purple-200 font-semibold'
                          : 'bg-[#121316] border-[#2c2f35] text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span>{ind.label}</span>
                      {industry === ind.value && <Check className="w-3.5 h-3.5 text-purple-400 shrink-0 ml-1" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-200">
                  Tagline / Lema de Campaña
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="Ej. El sonido acústico de mayor fidelidad para profesionales exigentes"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#121316] border border-[#34373d] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-200">
                    Contacto del Cliente (Stakeholder)
                  </label>
                  <input
                    type="text"
                    value={clientContact}
                    onChange={(e) => setClientContact(e.target.value)}
                    placeholder="Ej. Mateo Silveira (VP of Marketing)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#121316] border border-[#34373d] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-200">
                    Correo para Despacho & Aprobación
                  </label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="Ej. mateo@lumina-audio.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#121316] border border-[#34373d] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: IDENTIDAD VISUAL */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-200 space-y-1">
                <div className="font-semibold flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>Paleta Cromática de Marca (Imagen 3 & Canvas)</span>
                </div>
                <p className="text-[11px] text-gray-300">
                  Estos códigos HEX gobernarán los fondos, tipografías, acentos y stickers en los 12 formatos generados.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-200">Color Primario</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-9 h-9 rounded-lg cursor-pointer bg-transparent border-0"
                    />
                    <input
                      type="text"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-[#121316] border border-[#34373d] text-xs font-mono text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-200">Color Secundario</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="w-9 h-9 rounded-lg cursor-pointer bg-transparent border-0"
                    />
                    <input
                      type="text"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-[#121316] border border-[#34373d] text-xs font-mono text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-200">Color de Acento (CTA)</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-9 h-9 rounded-lg cursor-pointer bg-transparent border-0"
                    />
                    <input
                      type="text"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-[#121316] border border-[#34373d] text-xs font-mono text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Preview Bar */}
              <div className="p-4 rounded-xl border border-white/10 bg-[#101114] space-y-2">
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  Previsualización de Armonía Cromática:
                </span>
                <div className="h-10 rounded-lg overflow-hidden flex border border-white/10 shadow-inner">
                  <div className="flex-1 flex items-center justify-center text-[10px] font-mono text-white font-bold" style={{ backgroundColor: primaryColor }}>
                    Primario
                  </div>
                  <div className="flex-1 flex items-center justify-center text-[10px] font-mono text-white font-bold" style={{ backgroundColor: secondaryColor }}>
                    Secundario
                  </div>
                  <div className="w-28 flex items-center justify-center text-[10px] font-mono text-black font-bold" style={{ backgroundColor: accentColor }}>
                    Acento CTA
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-200">
                  URL del Logo o Isotipo (Opcional)
                </label>
                <input
                  type="text"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  placeholder="https://tu-servidor.com/logo.png"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#121316] border border-[#34373d] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>
            </div>
          )}

          {/* STEP 3: PRODUCTO & GUARDRAILS */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in duration-150">
              
              {/* Product Section */}
              <div className="p-4 rounded-xl bg-[#131417] border border-white/10 space-y-3">
                <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400">
                  <ShoppingBag className="w-4 h-4" />
                  <span>Producto Prioritario del Catálogo</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] text-gray-300">Nombre del Producto</label>
                    <input
                      type="text"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      placeholder="Ej. Audífonos Studio Pro ANC"
                      className="w-full px-3 py-2 rounded-lg bg-[#18191d] border border-[#34373d] text-xs text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-gray-300">SKU</label>
                    <input
                      type="text"
                      value={productSku}
                      onChange={(e) => setProductSku(e.target.value)}
                      placeholder="Ej. AUD-ANC-01"
                      className="w-full px-3 py-2 rounded-lg bg-[#18191d] border border-[#34373d] text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] text-gray-300">Precio de Venta ($ USD)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={productPrice}
                      onChange={(e) => setProductPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg bg-[#18191d] border border-[#34373d] text-xs text-white font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-gray-300">Margen Comercial Estimado (%)</label>
                    <input
                      type="number"
                      value={productMargin}
                      onChange={(e) => setProductMargin(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg bg-[#18191d] border border-[#34373d] text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-gray-300">Propuesta Única de Valor (UVP)</label>
                  <input
                    type="text"
                    value={productUvp}
                    onChange={(e) => setProductUvp(e.target.value)}
                    placeholder="Ej. Cancelación de ruido activa de 45dB con 40h de batería ininterrumpida"
                    className="w-full px-3 py-2 rounded-lg bg-[#18191d] border border-[#34373d] text-xs text-white"
                  />
                </div>
              </div>

              {/* Guardrails Section */}
              <div className="p-4 rounded-xl bg-[#131417] border border-white/10 space-y-3">
                <div className="flex items-center space-x-2 text-xs font-semibold text-purple-300">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Guardrails Esenciales (Directivas para Gemini 2.0 & Imagen 3)</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="text-[11px] font-semibold text-emerald-400">Do's (Requeridos):</label>
                    <input
                      type="text"
                      value={do1}
                      onChange={(e) => setDo1(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#18191d] border border-emerald-500/20 text-xs text-gray-200"
                    />
                    <input
                      type="text"
                      value={do2}
                      onChange={(e) => setDo2(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#18191d] border border-emerald-500/20 text-xs text-gray-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-semibold text-rose-400">Don'ts (Prohibidos):</label>
                    <input
                      type="text"
                      value={dont1}
                      onChange={(e) => setDont1(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#18191d] border border-rose-500/20 text-xs text-gray-200"
                    />
                    <input
                      type="text"
                      value={dont2}
                      onChange={(e) => setDont2(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#18191d] border border-rose-500/20 text-xs text-gray-200"
                    />
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Footer Navigation Buttons */}
          <div className="pt-3 border-t border-[#26282c] flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s - 1) as any)}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-gray-300 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Anterior</span>
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => {
                  if (!name.trim() || !domain.trim()) {
                    alert('Por favor completa el Nombre y Dominio de la marca');
                    return;
                  }
                  setStep((s) => (s + 1) as any);
                }}
                className="flex items-center space-x-1.5 px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md shadow-purple-600/30 transition"
              >
                <span>Siguiente</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="submit"
                className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 transition"
              >
                <Check className="w-4 h-4" />
                <span>Finalizar Onboarding & Activar Cliente</span>
              </button>
            )}
          </div>

        </form>

      </div>
    </div>
  );
};