import React, { useState, useMemo, useEffect } from 'react';
import { StepNumber, CreativeFormat, AgentLog, ActiveView, FullBrandContext } from './types';
import { INITIAL_URL, STEP_PRESETS } from './data/mockCreatives';
import { loadStoredBrands, saveBrandsToStorage, DEFAULT_BRANDS } from './data/defaultBrands';
import { parseBrandFromUrl, generateDynamicCreatives, brandContextToProfile } from './utils/brandEngine';
import { Header } from './components/Header';
import { LeftPanel } from './components/LeftPanel';
import { RightPanel } from './components/RightPanel';
import { BrandVault } from './components/BrandVault';
import { DriveModal } from './components/DriveModal';
import { EmailModal } from './components/EmailModal';
import { DetailModal } from './components/DetailModal';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ActiveView>(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#vault') return 'vault';
    return 'studio';
  });

  const handleViewChange = (v: ActiveView) => {
    setCurrentView(v);
    if (typeof window !== 'undefined') {
      window.location.hash = v === 'vault' ? '#vault' : '';
    }
  };
  const [currentStep, setCurrentStep] = useState<StepNumber>(1);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [version, setVersion] = useState<'v1' | 'v2'>('v1');
  const [urlContext, setUrlContext] = useState<string>(INITIAL_URL);
  const [selectedCreative, setSelectedCreative] = useState<CreativeFormat | null>(null);

  // Brand Vault state
  const [brands, setBrands] = useState<FullBrandContext[]>(() => loadStoredBrands());
  const [activeBrandId, setActiveBrandId] = useState<string>('brand-lumiere');

  const [isDriveModalOpen, setIsDriveModalOpen] = useState<boolean>(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState<boolean>(false);
  const [driveReady, setDriveReady] = useState<boolean>(false);
  const [emailReady, setEmailReady] = useState<boolean>(false);

  // Active brand from Vault
  const activeVaultBrand = useMemo(() => {
    return brands.find(b => b.id === activeBrandId) || brands[0];
  }, [brands, activeBrandId]);

  // Compute dynamic brand profile: if urlContext matches an existing brand in vault, use its full context!
  const brandProfile = useMemo(() => {
    const matchedBrand = brands.find(b => 
      urlContext.toLowerCase().includes(b.domain.toLowerCase()) || 
      urlContext.toLowerCase().includes(b.name.toLowerCase().replace(/\s+/g, ''))
    );
    if (matchedBrand) {
      return brandContextToProfile(matchedBrand);
    }
    // Fallback to domain parser
    return parseBrandFromUrl(urlContext);
  }, [urlContext, brands]);

  const { creatives, video } = useMemo(() => generateDynamicCreatives(brandProfile), [brandProfile]);

  const [logs, setLogs] = useState<AgentLog[]>([
    {
      id: 'init-1',
      timestamp: '10:28:15',
      tool: 'Gemini 2.0 Flash',
      message: 'Agente iniciado. Conexión establecida con Vertex AI, Imagen 3, Veo y Brand Vault.',
      type: 'info'
    },
    {
      id: 'init-2',
      timestamp: '10:28:18',
      tool: 'Brand Vault Engine',
      message: `Cargado perfil activo: ${activeVaultBrand.name} (${activeVaultBrand.products.length} productos en catálogo).`,
      type: 'success'
    }
  ]);

  const addLog = (tool: AgentLog['tool'], message: string, type: AgentLog['type'] = 'info') => {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    setLogs((prev) => [
      ...prev,
      {
        id: `log-${Date.now()}-${Math.random()}`,
        timestamp: timeStr,
        tool,
        message,
        type
      }
    ]);
  };

  const handleExecutePrompt = (promptText: string, stepOverride?: StepNumber) => {
    const targetStep = stepOverride || (
      promptText.toLowerCase().includes('cambio') || promptText.toLowerCase().includes('feedback') || promptText.toLowerCase().includes('20%')
        ? 2
        : promptText.toLowerCase().includes('drive') || promptText.toLowerCase().includes('correo') || promptText.toLowerCase().includes('organiza')
        ? 3
        : 1
    );

    setIsGenerating(true);

    if (targetStep === 1) {
      setCurrentStep(1);
      setVersion('v1');
      setDriveReady(false);
      setEmailReady(false);

      addLog('Gemini 2.0 Flash', `Extrayendo contexto semántico y visual de: ${urlContext}...`, 'info');

      setTimeout(() => {
        addLog(
          'Brand Vault Engine', 
          `Contexto inyectado: "${brandProfile.name}" • Producto Activo: "${brandProfile.productName}" • Industria: ${brandProfile.industry.toUpperCase()}`, 
          'info'
        );
      }, 700);

      setTimeout(() => {
        addLog('Imagen 3', `Generando 12 adaptaciones de imagen multicanal para ${brandProfile.name} respetando guardrails de marca...`, 'tool');
      }, 1400);

      setTimeout(() => {
        addLog('Google Veo', `Sintetizando video vertical cinemático de 10s (1080x1920 @ 60fps) adaptado a ${brandProfile.name}...`, 'tool');
      }, 2100);

      setTimeout(() => {
        addLog('Gemini 2.0 Flash', `¡Generación completada! 12 formatos y 1 video de 10s listos para ${brandProfile.name}.`, 'success');
        setIsGenerating(false);
      }, 2800);

    } else if (targetStep === 2) {
      setCurrentStep(2);
      setVersion('v2');

      addLog('Gemini 2.0 Flash', `Procesando feedback de cliente para ${brandProfile.name}: Paleta cálida sunset, urgencia "-20% OFF" y modelo sonriendo.`, 'refine');

      setTimeout(() => {
        addLog('Nano Banana', `Motor de micro-edición ultrarrápida activado: re-calibrando balance cromático en los 12 formatos de ${brandProfile.name}...`, 'tool');
      }, 800);

      setTimeout(() => {
        addLog('Imagen 3', `Re-renderizando assets con iluminación de hora dorada y badges promocionales...`, 'tool');
      }, 1600);

      setTimeout(() => {
        addLog('Google Veo', `Actualizando cinemática de 10s: modelo sonriendo + animación de descuento 20% OFF...`, 'tool');
      }, 2300);

      setTimeout(() => {
        addLog('Nano Banana', `¡Feedback aplicado! 12 formatos actualizados a versión v2 y video de 10s sincronizado para ${brandProfile.name}.`, 'success');
        setIsGenerating(false);
      }, 3000);

    } else if (targetStep === 3) {
      setCurrentStep(3);

      addLog('Google Drive API', `Iniciando clasificación de activos: creando /Google Drive/Clientes/${brandProfile.name}/Campaña Q4/...`, 'tool');

      setTimeout(() => {
        addLog('Google Drive API', `Subiendo 12 archivos PNG Lossless + 1 Master MP4 4K a las 4 subcarpetas organizadas...`, 'tool');
        setDriveReady(true);
      }, 900);

      setTimeout(() => {
        addLog('Gmail Dispatcher', `Generando borrador ejecutivo para ${brandProfile.clientEmail} con enlace seguro a Drive...`, 'tool');
      }, 1700);

      setTimeout(() => {
        addLog('Gmail Dispatcher', `✓ Correo de confirmación despachado exitosamente a ${brandProfile.clientEmail}`, 'success');
        setEmailReady(true);
        setIsGenerating(false);
        setIsDriveModalOpen(true);
      }, 2500);
    }
  };

  const handleRunAutoDemo = () => {
    handleExecutePrompt(STEP_PRESETS[1].prompt, 1);
    setTimeout(() => {
      handleExecutePrompt(STEP_PRESETS[2].prompt, 2);
      setTimeout(() => {
        handleExecutePrompt(STEP_PRESETS[3].prompt, 3);
      }, 5500);
    }, 5500);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setVersion('v1');
    setDriveReady(false);
    setEmailReady(false);
    setIsDriveModalOpen(false);
    setIsEmailModalOpen(false);
    setSelectedCreative(null);
    setLogs([
      {
        id: `log-reset-${Date.now()}`,
        timestamp: new Date().toTimeString().split(' ')[0],
        tool: 'Gemini 2.0 Flash',
        message: 'Estado de la demo reiniciado a fase inicial.',
        type: 'info'
      }
    ]);
  };

  const handleToggleVersion = () => {
    setVersion((v) => (v === 'v1' ? 'v2' : 'v1'));
  };

  // Brand Vault handlers
  const handleSaveBrand = (updatedBrand: FullBrandContext) => {
    const newBrands = brands.map(b => b.id === updatedBrand.id ? updatedBrand : b);
    setBrands(newBrands);
    saveBrandsToStorage(newBrands);
    addLog('Brand Vault Engine', `Configuración y guardrails actualizados para ${updatedBrand.name}.`, 'success');
  };

  const handleRestoreDefaults = () => {
    setBrands(DEFAULT_BRANDS);
    saveBrandsToStorage(DEFAULT_BRANDS);
    addLog('Brand Vault Engine', 'Se han restaurado los valores predeterminados del Brand Vault.', 'info');
  };

  const handleUseBrandInStudio = (brand: FullBrandContext) => {
    setActiveBrandId(brand.id);
    setUrlContext(`https://${brand.domain}`);
    setCurrentView('studio');
    addLog('Brand Vault Engine', `Marca "${brand.name}" cargada en el estudio. URL sincronizada a https://${brand.domain}`, 'success');
    handleExecutePrompt(
      `Usa el contexto de la web https://${brand.domain} y crea 12 formatos diferentes de imagen para ads multicanal y 1 video cinemático de 10 segundos.`,
      1
    );
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#0f1013] text-gray-100 overflow-hidden select-none">
      
      {/* Top Application Header */}
      <Header
        currentView={currentView}
        onChangeView={handleViewChange}
        activeBrandName={brandProfile.name}
        currentStep={currentStep}
        isGenerating={isGenerating}
        onSelectStep={(step) => handleExecutePrompt(STEP_PRESETS[step].prompt, step)}
        onReset={handleReset}
        onRunAutoDemo={handleRunAutoDemo}
        onOpenDrive={() => setIsDriveModalOpen(true)}
        onOpenEmail={() => setIsEmailModalOpen(true)}
        driveReady={driveReady}
        emailReady={emailReady}
        version={version}
        onToggleVersion={handleToggleVersion}
      />

      {/* Main Single-Screen Content View */}
      {currentView === 'studio' ? (
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
          {/* Left Side: Prompt Studio, Context & Reasoning Stream */}
          <LeftPanel
            currentStep={currentStep}
            isGenerating={isGenerating}
            onExecutePrompt={handleExecutePrompt}
            logs={logs}
            urlContext={urlContext}
            setUrlContext={setUrlContext}
          />

          {/* Right Side: Dynamic Canvas, Formats Grid & Video Player */}
          <RightPanel
            creatives={creatives}
            video={video}
            version={version}
            currentStep={currentStep}
            onInspectCreative={(c) => setSelectedCreative(c)}
            onOpenDrive={() => setIsDriveModalOpen(true)}
            onOpenEmail={() => setIsEmailModalOpen(true)}
            driveReady={driveReady}
            emailReady={emailReady}
            brandName={brandProfile.name}
          />
        </div>
      ) : (
        /* Brand Knowledge Vault (Context Hub) */
        <BrandVault
          brands={brands}
          activeBrandId={activeBrandId}
          onSelectBrand={(id) => {
            setActiveBrandId(id);
            const found = brands.find(b => b.id === id);
            if (found) {
              setUrlContext(`https://${found.domain}`);
            }
          }}
          onSaveBrand={handleSaveBrand}
          onRestoreDefaults={handleRestoreDefaults}
          onUseBrandInStudio={handleUseBrandInStudio}
        />
      )}

      {/* Modals with dynamic Brand info */}
      <DriveModal
        isOpen={isDriveModalOpen}
        onClose={() => setIsDriveModalOpen(false)}
        brandName={brandProfile.name}
        creatives={creatives}
        video={video}
      />

      <EmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        onOpenDrive={() => {
          setIsEmailModalOpen(false);
          setIsDriveModalOpen(true);
        }}
        brand={brandProfile}
      />

      <DetailModal
        creative={selectedCreative}
        version={version}
        onClose={() => setSelectedCreative(null)}
        brandName={brandProfile.name}
      />

    </div>
  );
};

export default App;
