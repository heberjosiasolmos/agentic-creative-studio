import React, { useState, useMemo, useEffect } from 'react';
import { StepNumber, CreativeFormat, AgentLog, ActiveView, FullBrandContext } from './types';
import { INITIAL_URL, STEP_PRESETS } from './data/mockCreatives';
import { loadStoredBrands, saveBrandsToStorage, DEFAULT_BRANDS } from './data/defaultBrands';
import { parseBrandFromUrl, generateDynamicCreatives, brandContextToProfile } from './utils/brandEngine';
import { Header } from './components/Header';
import { LeftPanel } from './components/LeftPanel';
import { RightPanel } from './components/RightPanel';
import { BrandVault } from './components/BrandVault';
import { PerformanceHub } from './components/PerformanceHub';
import { ApprovalHub } from './components/ApprovalHub';
import { CampaignLauncherModal } from './components/CampaignLauncherModal';
import { DriveModal } from './components/DriveModal';
import { EmailModal } from './components/EmailModal';
import { DetailModal } from './components/DetailModal';
import { BrandProduct, DeploymentRecord } from './types';
import { loadStoredAnalytics, saveAnalyticsToStorage, DEFAULT_ANALYTICS } from './data/defaultAnalytics';
import { loadStoredDeployments, saveDeploymentsToStorage, DEFAULT_DEPLOYMENTS } from './data/defaultDeployments';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ActiveView>(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash.startsWith('#vault')) return 'vault';
      if (window.location.hash.startsWith('#analytics')) return 'analytics';
      if (window.location.hash.startsWith('#approval') || window.location.hash.startsWith('#dispatch')) return 'dispatch';
    }
    return 'studio';
  });

  const handleViewChange = (v: ActiveView) => {
    setCurrentView(v);
    if (typeof window !== 'undefined') {
      window.location.hash = v === 'vault' ? '#vault' : v === 'analytics' ? '#analytics' : v === 'dispatch' ? '#dispatch' : '';
    }
  };
  const [currentStep, setCurrentStep] = useState<StepNumber>(1);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [version, setVersion] = useState<'v1' | 'v2'>('v1');
  const [urlContext, setUrlContext] = useState<string>(INITIAL_URL);
  const [activePrompt, setActivePrompt] = useState<string>(STEP_PRESETS[1].prompt);
  const [selectedCreative, setSelectedCreative] = useState<CreativeFormat | null>(() => {
    if (typeof window !== 'undefined' && window.location.hash.includes('detail')) {
      return generateDynamicCreatives(brandContextToProfile(DEFAULT_BRANDS[0])).creatives[0];
    }
    return null;
  });

  // Brand Vault state
  const [brands, setBrands] = useState<FullBrandContext[]>(() => loadStoredBrands());
  const [activeBrandId, setActiveBrandId] = useState<string>('brand-lumiere');

  // Analytics state (Fase 2)
  const [analytics, setAnalytics] = useState(() => loadStoredAnalytics());

  // Deployments state (Fase 4)
  const [deployments, setDeployments] = useState<DeploymentRecord[]>(() => loadStoredDeployments());

  const [isDriveModalOpen, setIsDriveModalOpen] = useState<boolean>(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState<boolean>(false);
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.location.hash.includes('campaign')) return true;
    return false;
  });
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [driveReady, setDriveReady] = useState<boolean>(false);
  const [emailReady, setEmailReady] = useState<boolean>(false);

  // Active brand from Vault
  const activeVaultBrand = useMemo(() => {
    return brands.find(b => b.id === activeBrandId) || brands[0];
  }, [brands, activeBrandId]);

  // Active analytics for current brand (Fase 2)
  const activeAnalytics = useMemo(() => {
    return analytics[activeBrandId] || DEFAULT_ANALYTICS['brand-lumiere'];
  }, [analytics, activeBrandId]);

  // Compute dynamic brand profile: if urlContext matches an existing brand in vault, use its full context!
  const brandProfile = useMemo(() => {
    const matchedBrand = brands.find(b => 
      urlContext.toLowerCase().includes(b.domain.toLowerCase()) || 
      urlContext.toLowerCase().includes(b.name.toLowerCase().replace(/\s+/g, ''))
    );
    if (matchedBrand) {
      return brandContextToProfile(matchedBrand, selectedProductId);
    }
    // Fallback to domain parser
    return parseBrandFromUrl(urlContext);
  }, [urlContext, brands, selectedProductId]);

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

  const handleIterateFromPerformance = (promptText: string, brandId: string, stepOverride?: StepNumber) => {
    if (brandId !== activeBrandId) {
      setActiveBrandId(brandId);
      const targetBrand = brands.find(b => b.id === brandId);
      if (targetBrand) {
        setUrlContext(`https://${targetBrand.domain}`);
      }
    }
    setCurrentView('studio');
    setActivePrompt(promptText);
    if (typeof window !== 'undefined') {
      window.location.hash = '';
    }
    const targetBrand = brands.find(b => b.id === brandId) || activeVaultBrand;
    addLog(
      'Vertex AI',
      `Performance Hub Signal: Conectando telemetría de rendimiento para ${targetBrand.name}. Aplicando optimización...`,
      'info'
    );
    handleExecutePrompt(
      promptText, 
      stepOverride || (promptText.toLowerCase().includes('fatiga') || promptText.toLowerCase().includes('-20%') ? 2 : 1)
    );
  };

  const handleDeployCampaign = (
    campaignName: string, 
    selectedProduct: BrandProduct, 
    hook: string, 
    budget: number
  ) => {
    setIsGenerating(true);
    setCurrentStep(3);
    setDriveReady(false);
    setEmailReady(false);

    addLog('Vertex AI', `Iniciando orquestación de campaña: "${campaignName}" ($${budget.toLocaleString()} USD / mes)...`, 'info');

    setTimeout(() => {
      addLog(
        'Brand Vault Engine', 
        `Producto enfocado: ${selectedProduct.name} (SKU: ${selectedProduct.sku}, Margen: ${selectedProduct.marginPercent}%). Hook validado: "${hook}"`, 
        'info'
      );
    }, 600);

    setTimeout(() => {
      addLog('Imagen 3', `Renderizando 12 formatos optimizados con predictive scoring para Meta, Google y Amazon Ads...`, 'tool');
    }, 1200);

    setTimeout(() => {
      addLog('Google Veo', `Sincronizando video vertical cinemático de 10s adaptado al hook de campaña...`, 'tool');
    }, 1800);

    setTimeout(() => {
      addLog('Google Drive API', `Sincronizando 12 archivos PNG Lossless + Master MP4 a /Google Drive/Campañas/${campaignName}/...`, 'tool');
      setDriveReady(true);
    }, 2400);

    setTimeout(() => {
      addLog('Gmail Dispatcher', `Notificación de campaña y enlaces seguros despachados exitosamente a ${brandProfile.clientEmail}`, 'success');
      setEmailReady(true);
      setIsGenerating(false);
      setIsDriveModalOpen(true);

      const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);
      const newRecord: DeploymentRecord = {
        id: `dep-${Date.now()}`,
        campaignName,
        brandId: activeBrandId,
        brandName: brandProfile.name,
        productName: selectedProduct.name,
        productSku: selectedProduct.sku,
        primaryHook: hook,
        channels: ['Meta Ads', 'Google Ads', 'TikTok Spark', 'Amazon Ads'],
        budget,
        projectedRoas: '4.9x — 5.6x',
        driveFolderUrl: `https://drive.google.com/drive/folders/${campaignName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        status: 'deployed',
        approvalStatus: 'approved',
        deployedAt: nowStr,
        deployedBy: `${brandProfile.clientContact}`
      };
      setDeployments(prev => {
        const updated = [newRecord, ...prev];
        saveDeploymentsToStorage(updated);
        return updated;
      });
    }, 3000);
  };

  const handleApplyClientFeedback = (feedbackPrompt: string, brandId: string) => {
    if (brandId !== activeBrandId) {
      setActiveBrandId(brandId);
      const found = brands.find(b => b.id === brandId);
      if (found) setUrlContext(`https://${found.domain}`);
    }
    setCurrentView('studio');
    setActivePrompt(feedbackPrompt);
    if (typeof window !== 'undefined') {
      window.location.hash = '';
    }
    addLog(
      'Gemini 2.0 Flash', 
      `Feedback recibido de cliente desde Portal de Aprobación: "${feedbackPrompt}". Re-calibrando entrega con Nano Banana...`, 
      'refine'
    );
    handleExecutePrompt(feedbackPrompt, 2);
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
        onOpenCampaignLauncher={() => setIsCampaignModalOpen(true)}
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
            activePrompt={activePrompt}
            brandContext={activeVaultBrand}
            selectedProductId={selectedProductId}
            onSelectProduct={setSelectedProductId}
            onOpenCampaignLauncher={() => setIsCampaignModalOpen(true)}
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
      ) : currentView === 'vault' ? (
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
      ) : currentView === 'analytics' ? (
        /* Performance Analytics & Creative Intelligence Hub (Fase 2) */
        <PerformanceHub
          brands={brands}
          activeBrandId={activeBrandId}
          onSelectBrand={(id) => {
            setActiveBrandId(id);
            const found = brands.find(b => b.id === id);
            if (found) {
              setUrlContext(`https://${found.domain}`);
            }
          }}
          analyticsData={activeAnalytics}
          onIterateCreative={handleIterateFromPerformance}
        />
      ) : (
        /* Client Approval Pipeline & Ads Dispatcher Hub (Fase 4) */
        <ApprovalHub
          brands={brands}
          activeBrandId={activeBrandId}
          onSelectBrand={(id) => {
            setActiveBrandId(id);
            const found = brands.find(b => b.id === id);
            if (found) {
              setUrlContext(`https://${found.domain}`);
            }
          }}
          creatives={creatives}
          video={video}
          deployments={deployments}
          onApplyClientFeedback={handleApplyClientFeedback}
          onOpenDrive={() => setIsDriveModalOpen(true)}
          onOpenEmail={() => setIsEmailModalOpen(true)}
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
        creative={selectedCreative || (typeof window !== 'undefined' && window.location.hash.includes('detail') ? creatives[0] : null)}
        version={version}
        onClose={() => {
          setSelectedCreative(null);
          if (typeof window !== 'undefined' && window.location.hash.includes('detail')) {
            window.location.hash = '';
          }
        }}
        brandName={brandProfile.name}
      />

      <CampaignLauncherModal
        isOpen={isCampaignModalOpen}
        onClose={() => setIsCampaignModalOpen(false)}
        brand={activeVaultBrand}
        onDeploy={handleDeployCampaign}
      />

    </div>
  );
};

export default App;
