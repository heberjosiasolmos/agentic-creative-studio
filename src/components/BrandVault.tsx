import React, { useState } from 'react';
import { FullBrandContext, BrandProduct } from '../types';
import { 
  Palette, 
  ShieldCheck, 
  ShoppingBag, 
  Cpu, 
  Sparkles, 
  Save, 
  RotateCcw, 
  ExternalLink, 
  Plus, 
  Trash2, 
  Check, 
  X, 
  Tag, 
  DollarSign, 
  Layers, 
  CheckCircle2, 
  AlertTriangle,
  Building2,
  Sliders,
  Globe
} from 'lucide-react';

interface BrandVaultProps {
  brands: FullBrandContext[];
  activeBrandId: string;
  onSelectBrand: (brandId: string) => void;
  onSaveBrand: (updatedBrand: FullBrandContext) => void;
  onRestoreDefaults: () => void;
  onUseBrandInStudio: (brand: FullBrandContext) => void;
}

export const BrandVault: React.FC<BrandVaultProps> = ({
  brands,
  activeBrandId,
  onSelectBrand,
  onSaveBrand,
  onRestoreDefaults,
  onUseBrandInStudio
}) => {
  const currentBrand = brands.find(b => b.id === activeBrandId) || brands[0];
  const [activeTab, setActiveTab] = useState<'visuals' | 'persona' | 'products' | 'directives'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get('tab');
      if (tab === 'persona' || tab === 'products' || tab === 'directives') return tab;
    }
    return 'visuals';
  });
  const [brandData, setBrandData] = useState<FullBrandContext>(currentBrand);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  
  // New item inputs
  const [newDo, setNewDo] = useState('');
  const [newDont, setNewDont] = useState('');
  const [newProhibitedWord, setNewProhibitedWord] = useState('');
  const [newTone, setNewTone] = useState('');
  
  // New product modal/state
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<BrandProduct>>({
    name: '',
    sku: '',
    asin: '',
    category: 'General',
    price: 49.99,
    marginPercent: 70,
    stockStatus: 'in_stock',
    uvp: '',
    keyBenefits: ['Calidad superior comprobada'],
    approvedClaims: ['Satisfacción garantizada'],
    activeForAds: true,
    heroImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80'
  });

  // Keep brandData in sync when switching brands
  React.useEffect(() => {
    const selected = brands.find(b => b.id === activeBrandId) || brands[0];
    setBrandData(selected);
  }, [activeBrandId, brands]);

  const handleSave = () => {
    onSaveBrand(brandData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleAddDo = () => {
    if (!newDo.trim()) return;
    setBrandData({
      ...brandData,
      guardrails: {
        ...brandData.guardrails,
        dos: [...brandData.guardrails.dos, newDo.trim()]
      }
    });
    setNewDo('');
  };

  const handleRemoveDo = (index: number) => {
    setBrandData({
      ...brandData,
      guardrails: {
        ...brandData.guardrails,
        dos: brandData.guardrails.dos.filter((_, i) => i !== index)
      }
    });
  };

  const handleAddDont = () => {
    if (!newDont.trim()) return;
    setBrandData({
      ...brandData,
      guardrails: {
        ...brandData.guardrails,
        donts: [...brandData.guardrails.donts, newDont.trim()]
      }
    });
    setNewDont('');
  };

  const handleRemoveDont = (index: number) => {
    setBrandData({
      ...brandData,
      guardrails: {
        ...brandData.guardrails,
        donts: brandData.guardrails.donts.filter((_, i) => i !== index)
      }
    });
  };

  const handleAddProhibitedWord = () => {
    if (!newProhibitedWord.trim()) return;
    setBrandData({
      ...brandData,
      guardrails: {
        ...brandData.guardrails,
        prohibitedWords: [...brandData.guardrails.prohibitedWords, newProhibitedWord.trim().toLowerCase()]
      }
    });
    setNewProhibitedWord('');
  };

  const handleRemoveProhibitedWord = (index: number) => {
    setBrandData({
      ...brandData,
      guardrails: {
        ...brandData.guardrails,
        prohibitedWords: brandData.guardrails.prohibitedWords.filter((_, i) => i !== index)
      }
    });
  };

  const handleAddTone = () => {
    if (!newTone.trim()) return;
    setBrandData({
      ...brandData,
      persona: {
        ...brandData.persona,
        toneOfVoice: [...brandData.persona.toneOfVoice, newTone.trim()]
      }
    });
    setNewTone('');
  };

  const handleRemoveTone = (index: number) => {
    setBrandData({
      ...brandData,
      persona: {
        ...brandData.persona,
        toneOfVoice: brandData.persona.toneOfVoice.filter((_, i) => i !== index)
      }
    });
  };

  const handleToggleProductAd = (productId: string) => {
    setBrandData({
      ...brandData,
      products: brandData.products.map(p => 
        p.id === productId ? { ...p, activeForAds: !p.activeForAds } : p
      )
    });
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.sku) return;
    const prod: BrandProduct = {
      id: `prod-${Date.now()}`,
      name: newProduct.name,
      sku: newProduct.sku,
      asin: newProduct.asin || 'ASIN-' + Math.floor(Math.random() * 100000),
      category: newProduct.category || 'General',
      price: Number(newProduct.price) || 29.99,
      marginPercent: Number(newProduct.marginPercent) || 70,
      stockStatus: newProduct.stockStatus as any || 'in_stock',
      uvp: newProduct.uvp || 'Producto de alta calidad con garantía oficial.',
      keyBenefits: newProduct.keyBenefits || ['Calidad comprobada'],
      approvedClaims: newProduct.approvedClaims || ['Garantía oficial'],
      activeForAds: true,
      heroImage: newProduct.heroImage || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80'
    };
    setBrandData({
      ...brandData,
      products: [...brandData.products, prod]
    });
    setShowAddProductModal(false);
    setNewProduct({
      name: '',
      sku: '',
      asin: '',
      category: 'General',
      price: 49.99,
      marginPercent: 70,
      stockStatus: 'in_stock',
      uvp: '',
      keyBenefits: ['Calidad superior comprobada'],
      approvedClaims: ['Satisfacción garantizada'],
      activeForAds: true,
      heroImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80'
    });
  };

  return (
    <div className="flex-1 h-full bg-[#0d0e11] overflow-y-auto flex flex-col">
      
      {/* Top Header & Brand Selector Bar */}
      <div className="border-b border-[#242629] bg-[#141518]/90 backdrop-blur-md px-6 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-20">
        
        {/* Brand Switcher & Identity */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-purple-600/20">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-google font-bold text-base text-white">{brandData.name}</span>
                <span className="text-[10px] font-mono uppercase bg-purple-500/10 text-purple-300 border border-purple-500/20 px-2 py-0.5 rounded-full font-semibold">
                  {brandData.industry}
                </span>
              </div>
              <p className="text-xs text-gray-400 flex items-center space-x-1.5 truncate max-w-md">
                <span>{brandData.tagline}</span>
              </p>
            </div>
          </div>

          <div className="h-6 w-[1px] bg-white/10 hidden md:block" />

          {/* Selector de Marcas */}
          <div className="flex items-center space-x-1 bg-black/40 p-1 rounded-xl border border-white/10">
            {brands.map(b => (
              <button
                key={b.id}
                onClick={() => onSelectBrand(b.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  b.id === brandData.id
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {b.name}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onUseBrandInStudio(brandData)}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/20 transition"
          >
            <Sparkles className="w-4 h-4 fill-current" />
            <span>Usar en Creative Studio</span>
          </button>

          <button
            onClick={handleSave}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/20 transition"
          >
            {saveSuccess ? <Check className="w-4 h-4 text-white" /> : <Save className="w-4 h-4" />}
            <span>{saveSuccess ? 'Guardado' : 'Guardar Cambios'}</span>
          </button>

          <button
            onClick={onRestoreDefaults}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-gray-200 transition"
            title="Restaurar Valores Predeterminados"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-[#242629] bg-[#111215] px-6">
        <div className="flex items-center space-x-6">
          <button
            onClick={() => setActiveTab('visuals')}
            className={`py-3.5 border-b-2 text-xs font-semibold flex items-center space-x-2 transition ${
              activeTab === 'visuals'
                ? 'border-purple-500 text-purple-300'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>1. Identidad Visual & Paleta</span>
          </button>

          <button
            onClick={() => setActiveTab('persona')}
            className={`py-3.5 border-b-2 text-xs font-semibold flex items-center space-x-2 transition ${
              activeTab === 'persona'
                ? 'border-purple-500 text-purple-300'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>2. Voz, Tono & Guardrails (Do's & Don'ts)</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`py-3.5 border-b-2 text-xs font-semibold flex items-center space-x-2 transition ${
              activeTab === 'products'
                ? 'border-purple-500 text-purple-300'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>3. Catálogo de Productos & ASINs ({brandData.products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('directives')}
            className={`py-3.5 border-b-2 text-xs font-semibold flex items-center space-x-2 transition ${
              activeTab === 'directives'
                ? 'border-purple-500 text-purple-300'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>4. Memoria Agéntica & Directivas</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="p-8 max-w-7xl mx-auto w-full flex-1">
        
        {/* ========================================================================= */}
        {/* TAB 1: IDENTIDAD VISUAL */}
        {/* ========================================================================= */}
        {activeTab === 'visuals' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            
            {/* General Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300">Nombre de la Marca</label>
                <input
                  type="text"
                  value={brandData.name}
                  onChange={(e) => setBrandData({ ...brandData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a1b1e] border border-[#34373c] text-xs text-white focus:outline-none focus:border-purple-500 font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300">Dominio / Sitio Web</label>
                <div className="relative">
                  <input
                    type="text"
                    value={brandData.domain}
                    onChange={(e) => setBrandData({ ...brandData, domain: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a1b1e] border border-[#34373c] text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                  />
                  <Globe className="w-3.5 h-3.5 text-gray-500 absolute right-3 top-3" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300">Industria</label>
                <select
                  value={brandData.industry}
                  onChange={(e: any) => setBrandData({ ...brandData, industry: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a1b1e] border border-[#34373c] text-xs text-white focus:outline-none focus:border-purple-500 font-medium"
                >
                  <option value="skincare">🌿 Skincare & Belleza</option>
                  <option value="apparel">👟 Ropa Deportiva / Moda</option>
                  <option value="tech">⚡ SaaS / Tecnología Enterprise</option>
                  <option value="beverage">☕ Bebidas / Alimentos</option>
                  <option value="automotive">🚗 Automotriz / Movilidad</option>
                  <option value="retail">✨ Retail General / DTC</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300">Eslogan de Marca (Tagline)</label>
              <input
                type="text"
                value={brandData.tagline}
                onChange={(e) => setBrandData({ ...brandData, tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a1b1e] border border-[#34373c] text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Color Palette Manager */}
            <div className="p-6 rounded-2xl bg-[#16171a] border border-white/5 space-y-5">
              <div>
                <h4 className="text-sm font-bold text-white font-google flex items-center space-x-2">
                  <Palette className="w-4 h-4 text-purple-400" />
                  <span>Paleta Cromática de Marca & Degradados</span>
                </h4>
                <p className="text-xs text-gray-400 mt-0.5">
                  Los modelos Imagen 3 y Nano Banana usarán estos códigos exactos para iluminaciones, fondos y botones de acción.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {/* Color Primario */}
                <div className="p-3.5 rounded-xl bg-[#1c1d21] border border-white/5 space-y-2">
                  <span className="text-xs font-semibold text-gray-300">Color Primario</span>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={brandData.visuals.primaryColor}
                      onChange={(e) => setBrandData({
                        ...brandData,
                        visuals: { ...brandData.visuals, primaryColor: e.target.value }
                      })}
                      className="w-9 h-9 rounded-lg border border-white/20 cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={brandData.visuals.primaryColor}
                      onChange={(e) => setBrandData({
                        ...brandData,
                        visuals: { ...brandData.visuals, primaryColor: e.target.value }
                      })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs font-mono text-white uppercase"
                    />
                  </div>
                </div>

                {/* Color Secundario */}
                <div className="p-3.5 rounded-xl bg-[#1c1d21] border border-white/5 space-y-2">
                  <span className="text-xs font-semibold text-gray-300">Color Secundario</span>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={brandData.visuals.secondaryColor}
                      onChange={(e) => setBrandData({
                        ...brandData,
                        visuals: { ...brandData.visuals, secondaryColor: e.target.value }
                      })}
                      className="w-9 h-9 rounded-lg border border-white/20 cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={brandData.visuals.secondaryColor}
                      onChange={(e) => setBrandData({
                        ...brandData,
                        visuals: { ...brandData.visuals, secondaryColor: e.target.value }
                      })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs font-mono text-white uppercase"
                    />
                  </div>
                </div>

                {/* Acento v1 */}
                <div className="p-3.5 rounded-xl bg-[#1c1d21] border border-white/5 space-y-2">
                  <span className="text-xs font-semibold text-gray-300">Acento CTA (v1)</span>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={brandData.visuals.accentColor}
                      onChange={(e) => setBrandData({
                        ...brandData,
                        visuals: { ...brandData.visuals, accentColor: e.target.value }
                      })}
                      className="w-9 h-9 rounded-lg border border-white/20 cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={brandData.visuals.accentColor}
                      onChange={(e) => setBrandData({
                        ...brandData,
                        visuals: { ...brandData.visuals, accentColor: e.target.value }
                      })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs font-mono text-white uppercase"
                    />
                  </div>
                </div>

                {/* Fondo UI */}
                <div className="p-3.5 rounded-xl bg-[#1c1d21] border border-white/5 space-y-2">
                  <span className="text-xs font-semibold text-gray-300">Fondo Oscuro</span>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={brandData.visuals.backgroundColor}
                      onChange={(e) => setBrandData({
                        ...brandData,
                        visuals: { ...brandData.visuals, backgroundColor: e.target.value }
                      })}
                      className="w-9 h-9 rounded-lg border border-white/20 cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={brandData.visuals.backgroundColor}
                      onChange={(e) => setBrandData({
                        ...brandData,
                        visuals: { ...brandData.visuals, backgroundColor: e.target.value }
                      })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs font-mono text-white uppercase"
                    />
                  </div>
                </div>
              </div>

              {/* Gradient Preview Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl border border-white/10 bg-gradient-to-r from-slate-900 to-black flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-white">Previsualización Gradiente v1 (Original)</span>
                    <p className="text-[11px] text-gray-400 font-mono mt-0.5">Luz de estudio fría & balance de marca</p>
                  </div>
                  <div 
                    className="w-16 h-8 rounded-lg shadow-inner border border-white/20"
                    style={{ backgroundColor: brandData.visuals.primaryColor }}
                  />
                </div>

                <div className="p-4 rounded-xl border border-amber-500/20 bg-gradient-to-r from-amber-950/60 to-stone-900 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-amber-200">Previsualización Gradiente v2 (Feedback Sunset)</span>
                    <p className="text-[11px] text-gray-400 font-mono mt-0.5">Calidez dorada + badges de descuento</p>
                  </div>
                  <div 
                    className="w-16 h-8 rounded-lg shadow-inner border border-white/20"
                    style={{ backgroundColor: brandData.visuals.accentColor }}
                  />
                </div>
              </div>

            </div>

            {/* Typography & Assets */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-[#16171a] border border-white/5 space-y-4">
                <h4 className="text-sm font-bold text-white font-google">Tipografías Autorizadas</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-300 font-medium">Tipografía de Titulares (Headlines)</label>
                    <input
                      type="text"
                      value={brandData.visuals.primaryFont}
                      onChange={(e) => setBrandData({
                        ...brandData,
                        visuals: { ...brandData.visuals, primaryFont: e.target.value }
                      })}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-[#1c1d21] border border-white/10 text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-300 font-medium">Tipografía de Cuerpo & Specs</label>
                    <input
                      type="text"
                      value={brandData.visuals.secondaryFont}
                      onChange={(e) => setBrandData({
                        ...brandData,
                        visuals: { ...brandData.visuals, secondaryFont: e.target.value }
                      })}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-[#1c1d21] border border-white/10 text-xs text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#16171a] border border-white/5 space-y-4">
                <h4 className="text-sm font-bold text-white font-google">Activos de Logotipo</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-300 font-medium">URL de Logotipo Principal (Light/Dark)</label>
                    <input
                      type="text"
                      value={brandData.visuals.logoUrl}
                      onChange={(e) => setBrandData({
                        ...brandData,
                        visuals: { ...brandData.visuals, logoUrl: e.target.value }
                      })}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-[#1c1d21] border border-white/10 text-xs text-white font-mono"
                    />
                  </div>
                  <div className="flex items-center space-x-3 pt-1">
                    <img
                      src={brandData.visuals.logoUrl}
                      alt="Logo Preview"
                      className="w-12 h-12 rounded-xl object-cover border border-white/20 bg-black/60 p-1"
                    />
                    <span className="text-[11px] text-gray-400">
                      Vista previa del logo que el agente superpone en la esquina superior derecha.
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: VOZ, TONO & GUARDRAILS (DO'S & DON'TS) */}
        {/* ========================================================================= */}
        {activeTab === 'persona' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            
            {/* Arquetipo y Tonos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="p-6 rounded-2xl bg-[#16171a] border border-white/5 space-y-3">
                <h4 className="text-sm font-bold text-white font-google flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-purple-400" />
                  <span>Arquetipo de Marca</span>
                </h4>
                <p className="text-xs text-gray-400">
                  Define la personalidad central con la que el agente redacta copies persuasivos.
                </p>
                <input
                  type="text"
                  value={brandData.persona.archetype}
                  onChange={(e) => setBrandData({
                    ...brandData,
                    persona: { ...brandData.persona, archetype: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c1d21] border border-white/10 text-xs text-white font-medium"
                />
              </div>

              <div className="p-6 rounded-2xl bg-[#16171a] border border-white/5 space-y-3">
                <h4 className="text-sm font-bold text-white font-google">Pilares del Tono de Voz</h4>
                <div className="flex flex-wrap gap-1.5">
                  {brandData.persona.toneOfVoice.map((tone, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-purple-500/15 text-purple-300 border border-purple-500/25 text-xs font-medium flex items-center space-x-1.5"
                    >
                      <span>{tone}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTone(idx)}
                        className="hover:text-red-400 transition"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <input
                    type="text"
                    value={newTone}
                    onChange={(e) => setNewTone(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddTone(); }}}
                    placeholder="Agregar nuevo tono..."
                    className="flex-1 px-3 py-1.5 rounded-lg bg-[#1c1d21] border border-white/10 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddTone}
                    className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold"
                  >
                    Agregar
                  </button>
                </div>
              </div>

            </div>

            {/* Audiencia Objetivo */}
            <div className="p-6 rounded-2xl bg-[#16171a] border border-white/5 space-y-4">
              <h4 className="text-sm font-bold text-white font-google">Perfil de Audiencia Objetivo</h4>
              
              <div className="space-y-1.5">
                <label className="text-xs text-gray-300 font-medium">Demografía & Segmento</label>
                <textarea
                  rows={2}
                  value={brandData.persona.targetAudience.demographics}
                  onChange={(e) => setBrandData({
                    ...brandData,
                    persona: {
                      ...brandData.persona,
                      targetAudience: { ...brandData.persona.targetAudience, demographics: e.target.value }
                    }
                  })}
                  className="w-full p-3 rounded-xl bg-[#1c1d21] border border-white/10 text-xs text-white leading-relaxed resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-red-300 flex items-center space-x-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Puntos de Dolor Clave (Pain Points)</span>
                  </span>
                  <ul className="space-y-1.5 text-xs text-gray-300">
                    {brandData.persona.targetAudience.painPoints.map((pp, idx) => (
                      <li key={idx} className="p-2 rounded-lg bg-black/40 border border-white/5 flex items-start space-x-2">
                        <span className="text-red-400 font-bold">•</span>
                        <span>{pp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-semibold text-emerald-300 flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Deseos & Motivaciones Centrales</span>
                  </span>
                  <ul className="space-y-1.5 text-xs text-gray-300">
                    {brandData.persona.targetAudience.desires.map((desire, idx) => (
                      <li key={idx} className="p-2 rounded-lg bg-black/40 border border-white/5 flex items-start space-x-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{desire}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* BRAND GUARDRAILS: DO'S & DON'TS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* DO's */}
              <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-emerald-300 font-google flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Reglas Obligatorias (DO's)</span>
                  </h4>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    {brandData.guardrails.dos.length} Activas
                  </span>
                </div>

                <div className="space-y-2">
                  {brandData.guardrails.dos.map((item, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-black/40 border border-emerald-500/20 flex items-center justify-between text-xs text-gray-200">
                      <span className="pr-2">{item}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveDo(idx)}
                        className="text-gray-500 hover:text-red-400 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <input
                    type="text"
                    value={newDo}
                    onChange={(e) => setNewDo(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddDo(); }}}
                    placeholder="Escribe una regla positiva obligatoria..."
                    className="flex-1 px-3 py-2 rounded-xl bg-[#1c1d21] border border-white/10 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddDo}
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
                  >
                    Agregar
                  </button>
                </div>
              </div>

              {/* DON'Ts */}
              <div className="p-6 rounded-2xl bg-red-950/20 border border-red-500/20 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-red-300 font-google flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    <span>Reglas Prohibidas (DON'Ts)</span>
                  </h4>
                  <span className="text-[10px] font-mono text-red-400 bg-red-500/10 px-2 py-0.5 rounded">
                    {brandData.guardrails.donts.length} Restricciones
                  </span>
                </div>

                <div className="space-y-2">
                  {brandData.guardrails.donts.map((item, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-black/40 border border-red-500/20 flex items-center justify-between text-xs text-gray-200">
                      <span className="pr-2">{item}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveDont(idx)}
                        className="text-gray-500 hover:text-red-400 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <input
                    type="text"
                    value={newDont}
                    onChange={(e) => setNewDont(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddDont(); }}}
                    placeholder="Escribe una restricción estricta..."
                    className="flex-1 px-3 py-2 rounded-xl bg-[#1c1d21] border border-white/10 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddDont}
                    className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold"
                  >
                    Agregar
                  </button>
                </div>
              </div>

            </div>

            {/* Prohibited Words & Disclaimers */}
            <div className="p-6 rounded-2xl bg-[#16171a] border border-white/5 space-y-4">
              <h4 className="text-sm font-bold text-white font-google">Filtro de Palabras Prohibidas (Blacklist)</h4>
              <p className="text-xs text-gray-400">
                El agente de copywriting descartará cualquier titular o copy que contenga estos términos exactos:
              </p>

              <div className="flex flex-wrap gap-2">
                {brandData.guardrails.prohibitedWords.map((word, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-red-500/15 text-red-300 border border-red-500/30 text-xs font-mono flex items-center space-x-1.5"
                  >
                    <span>🚫 {word}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveProhibitedWord(idx)}
                      className="hover:text-white transition"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex items-center space-x-2 pt-1 max-w-md">
                <input
                  type="text"
                  value={newProhibitedWord}
                  onChange={(e) => setNewProhibitedWord(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddProhibitedWord(); }}}
                  placeholder="Ej: barato, ganga, cura..."
                  className="flex-1 px-3 py-1.5 rounded-lg bg-[#1c1d21] border border-white/10 text-xs text-white font-mono"
                />
                <button
                  type="button"
                  onClick={handleAddProhibitedWord}
                  className="px-3 py-1.5 rounded-lg bg-red-700 hover:bg-red-600 text-white text-xs font-semibold"
                >
                  Bloquear
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: CATÁLOGO DE PRODUCTOS & ASINs */}
        {/* ========================================================================= */}
        {activeTab === 'products' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h4 className="text-base font-bold text-white font-google flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5 text-purple-400" />
                  <span>Catálogo de Productos para Anuncios</span>
                </h4>
                <p className="text-xs text-gray-400 mt-0.5">
                  Conexión directa con SKUs / ASINs de Retail Media. El agente solo generará creativos para productos activos y en stock.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddProductModal(true)}
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md shadow-purple-600/30 transition"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar Producto</span>
              </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {brandData.products.map((prod) => (
                <div
                  key={prod.id}
                  className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                    prod.activeForAds
                      ? 'bg-[#18191d] border-purple-500/30 shadow-lg shadow-purple-500/5'
                      : 'bg-[#141517] border-white/5 opacity-60'
                  }`}
                >
                  <div>
                    {/* Image & Badges */}
                    <div className="relative h-44 rounded-xl overflow-hidden border border-white/10 mb-3 bg-black">
                      <img
                        src={prod.heroImage}
                        alt={prod.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 flex items-center space-x-1">
                        <span className="px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono text-purple-300 border border-white/15">
                          {prod.sku}
                        </span>
                        {prod.asin && (
                          <span className="px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono text-amber-300 border border-white/15">
                            ASIN: {prod.asin}
                          </span>
                        )}
                      </div>

                      <div className="absolute top-2 right-2">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                          prod.stockStatus === 'in_stock'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                            : prod.stockStatus === 'low_stock'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                            : 'bg-red-500/20 text-red-300 border-red-500/30'
                        }`}>
                          {prod.stockStatus === 'in_stock' ? 'En Stock' : prod.stockStatus === 'low_stock' ? 'Poco Stock' : 'Agotado'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                      <span>{prod.category}</span>
                      <span className="font-mono text-emerald-400 font-bold">${prod.price.toFixed(2)} USD</span>
                    </div>

                    <h5 className="text-sm font-bold text-white font-google mb-1.5 leading-snug">
                      {prod.name}
                    </h5>

                    <p className="text-xs text-gray-300 leading-relaxed mb-3">
                      {prod.uvp}
                    </p>

                    {/* Key Benefits */}
                    <div className="space-y-1 mb-3">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Beneficios Clave:</div>
                      {prod.keyBenefits.map((b, i) => (
                        <div key={i} className="text-[11px] text-gray-300 flex items-center space-x-1.5">
                          <span className="text-purple-400">✓</span>
                          <span className="truncate">{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer toggle & margin */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="font-mono text-[11px] text-gray-400">
                      Margen: <strong className="text-white">{prod.marginPercent}%</strong>
                    </span>

                    <button
                      type="button"
                      onClick={() => handleToggleProductAd(prod.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition ${
                        prod.activeForAds
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-white/5 text-gray-400 border border-white/10 hover:text-white'
                      }`}
                    >
                      {prod.activeForAds ? <Check className="w-3.5 h-3.5" /> : null}
                      <span>{prod.activeForAds ? 'Activo en Ads' : 'Pausado'}</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: MEMORIA AGÉNTICA & DIRECTIVAS */}
        {/* ========================================================================= */}
        {activeTab === 'directives' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            <div className="p-6 rounded-2xl bg-[#16171a] border border-white/5 space-y-3">
              <div className="flex items-center space-x-2">
                <Cpu className="w-5 h-5 text-purple-400" />
                <h4 className="text-sm font-bold text-white font-google">
                  Directivas Permanentes del Agente (System Prompt de Marca)
                </h4>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Esta instrucción se inyectará automáticamente en el contexto de <strong>Gemini 2.0 Flash</strong> al formular prompts, en <strong>Imagen 3</strong> al sintetizar las 12 imágenes y en <strong>Google Veo</strong> al estructurar el video de 10 segundos.
              </p>

              <textarea
                rows={5}
                value={brandData.agentDirectives}
                onChange={(e) => setBrandData({ ...brandData, agentDirectives: e.target.value })}
                className="w-full p-4 rounded-xl bg-[#1c1d21] border border-white/10 text-xs text-white leading-relaxed font-mono"
              />
            </div>

            {/* Injected System Prompt Live Inspector */}
            <div className="p-6 rounded-2xl bg-black/50 border border-purple-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-bold text-purple-300 font-mono uppercase tracking-wider">
                    Contexto Inyectado en Vivo al Agente (RAG Preview)
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  ✓ Sincronizado con Brand Vault
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#101113] border border-white/5 font-mono text-[11px] text-gray-300 space-y-2 leading-relaxed">
                <p className="text-gray-500">// Directiva Agéntica Generada Dinámicamente para Vertex AI:</p>
                <p>
                  <strong className="text-purple-300">[BRAND_CONTEXT]</strong>: {brandData.name} ({brandData.domain}) — {brandData.tagline}
                </p>
                <p>
                  <strong className="text-purple-300">[ARCHETYPE_TONE]</strong>: {brandData.persona.archetype} | Tono: {brandData.persona.toneOfVoice.join(', ')}
                </p>
                <p>
                  <strong className="text-purple-300">[ACTIVE_PRODUCTS]</strong>: {brandData.products.filter(p => p.activeForAds).map(p => `${p.name} (ASIN: ${p.asin})`).join(' | ')}
                </p>
                <p>
                  <strong className="text-emerald-300">[MANDATORY_DOS]</strong>: {brandData.guardrails.dos.slice(0, 3).join('; ')}
                </p>
                <p>
                  <strong className="text-red-400">[STRICT_DONTS]</strong>: {brandData.guardrails.donts.slice(0, 3).join('; ')} | Palabras Prohibidas: {brandData.guardrails.prohibitedWords.join(', ')}
                </p>
                <p>
                  <strong className="text-amber-300">[PALETTE_HEX]</strong>: Primario {brandData.visuals.primaryColor}, Acento {brandData.visuals.accentColor}
                </p>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Modal para Agregar Producto */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1c1d21] border border-[#3c4043] rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h4 className="text-sm font-bold text-white font-google flex items-center space-x-2">
                <ShoppingBag className="w-4 h-4 text-purple-400" />
                <span>Registrar Nuevo Producto / ASIN</span>
              </h4>
              <button
                type="button"
                onClick={() => setShowAddProductModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="text-gray-300 font-medium">Nombre del Producto</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Suero Restaurador Noche 50ml"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-300 font-medium">SKU Interno</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: PROD-SKU-001"
                    value={newProduct.sku}
                    onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-gray-300 font-medium">ASIN / ID de Retail Media</label>
                  <input
                    type="text"
                    placeholder="Ej: B09X8Y7Z..."
                    value={newProduct.asin}
                    onChange={(e) => setNewProduct({ ...newProduct, asin: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-300 font-medium">Precio ($ USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-gray-300 font-medium">Margen (%)</label>
                  <input
                    type="number"
                    value={newProduct.marginPercent}
                    onChange={(e) => setNewProduct({ ...newProduct, marginPercent: parseInt(e.target.value) })}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-300 font-medium">Propuesta Única de Valor (UVP)</label>
                <textarea
                  rows={2}
                  required
                  placeholder="¿Por qué este producto es único y qué beneficio principal ofrece al cliente?"
                  value={newProduct.uvp}
                  onChange={(e) => setNewProduct({ ...newProduct, uvp: e.target.value })}
                  className="w-full mt-1 p-2.5 rounded-xl bg-black/40 border border-white/10 text-white resize-none"
                />
              </div>

              <div>
                <label className="text-gray-300 font-medium">URL de Imagen Hero</label>
                <input
                  type="text"
                  value={newProduct.heroImage}
                  onChange={(e) => setNewProduct({ ...newProduct, heroImage: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white font-mono text-[11px]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold shadow-md shadow-purple-600/30"
                >
                  Guardar en Catálogo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
