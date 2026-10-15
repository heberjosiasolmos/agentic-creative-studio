import React, { useState, useEffect } from 'react';
import { StepNumber, CreativeFormat, AgentLog } from './types';
import { MOCK_CREATIVES, MOCK_VIDEO, INITIAL_URL, STEP_PRESETS } from './data/mockCreatives';
import { Header } from './components/Header';
import { LeftPanel } from './components/LeftPanel';
import { RightPanel } from './components/RightPanel';
import { DriveModal } from './components/DriveModal';
import { EmailModal } from './components/EmailModal';
import { DetailModal } from './components/DetailModal';

export const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<StepNumber>(1);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [version, setVersion] = useState<'v1' | 'v2'>('v1');
  const [urlContext, setUrlContext] = useState<string>(INITIAL_URL);
  const [selectedCreative, setSelectedCreative] = useState<CreativeFormat | null>(null);

  const [isDriveModalOpen, setIsDriveModalOpen] = useState<boolean>(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState<boolean>(false);
  const [driveReady, setDriveReady] = useState<boolean>(false);
  const [emailReady, setEmailReady] = useState<boolean>(false);

  const [logs, setLogs] = useState<AgentLog[]>([
    {
      id: 'init-1',
      timestamp: '10:28:15',
      tool: 'Gemini 2.0 Flash',
      message: 'Agente iniciado. Conexión establecida con Vertex AI, Imagen 3, Veo y Google Workspace.',
      type: 'info'
    },
    {
      id: 'init-2',
      timestamp: '10:28:18',
      tool: 'Gemini 2.0 Flash',
      message: 'Listo para recibir URL de contexto o ejecutar los 3 pasos de la demo.',
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

      addLog('Gemini 2.0 Flash', `Extrayendo contexto de: ${urlContext}...`, 'info');

      setTimeout(() => {
        addLog('Gemini 2.0 Flash', 'Análisis semántico completado: Nicho Skincare Botánico, paleta verde/esmeralda, tono aspiracional.', 'info');
      }, 700);

      setTimeout(() => {
        addLog('Imagen 3', 'Generando 12 adaptaciones de imagen multicanal (Meta, TikTok, GDN, Pinterest, Carruseles)...', 'tool');
      }, 1400);

      setTimeout(() => {
        addLog('Google Veo', 'Sintetizando video vertical cinemático de 10s (1080x1920 @ 60fps) con audio ambiental adaptativo...', 'tool');
      }, 2100);

      setTimeout(() => {
        addLog('Gemini 2.0 Flash', '¡Generación completada con éxito! 12 formatos de imagen y 1 video de 10s listos en pantalla.', 'success');
        setIsGenerating(false);
      }, 2800);

    } else if (targetStep === 2) {
      setCurrentStep(2);
      setVersion('v2');

      addLog('Gemini 2.0 Flash', 'Procesando feedback de cliente: Paleta cálida (sunset amber), badge de urgencia "-20% OFF" y modelo sonriendo.', 'refine');

      setTimeout(() => {
        addLog('Nano Banana', 'Motor de micro-edición ultrarrápida activado: re-calibrando balance cromático y calidez en los 12 formatos...', 'tool');
      }, 800);

      setTimeout(() => {
        addLog('Imagen 3', 'Re-renderizando assets con iluminación de hora dorada y sellos de aprobación clínica...', 'tool');
      }, 1600);

      setTimeout(() => {
        addLog('Google Veo', 'Actualizando cinemática de 10s: modelo sonriendo a cámara + animación del código GLOW20...', 'tool');
      }, 2300);

      setTimeout(() => {
        addLog('Nano Banana', '¡Feedback aplicado! 12 formatos actualizados a versión v2 y video de 10s sincronizado.', 'success');
        setIsGenerating(false);
      }, 3000);

    } else if (targetStep === 3) {
      setCurrentStep(3);

      addLog('Google Drive API', 'Iniciando clasificación de activos: 4 carpetas organizadas por canal en Google Drive...', 'tool');

      setTimeout(() => {
        addLog('Google Drive API', 'Subiendo 12 archivos PNG Lossless + 1 Master MP4 4K a /Google Drive/Campaña Q4/...', 'tool');
        setDriveReady(true);
      }, 900);

      setTimeout(() => {
        addLog('Gmail Dispatcher', 'Generando borrador ejecutivo para el cliente con enlace seguro a Drive y previsualizaciones...', 'tool');
      }, 1700);

      setTimeout(() => {
        addLog('Gmail Dispatcher', '✓ Correo de confirmación y entrega despachado exitosamente a sofia.martinez@lumiere-botanics.com', 'success');
        setEmailReady(true);
        setIsGenerating(false);
        setIsDriveModalOpen(true); // Open drive directly for wow-factor
      }, 2500);
    }
  };

  const handleRunAutoDemo = () => {
    // Step 1
    handleExecutePrompt(STEP_PRESETS[1].prompt, 1);

    // Step 2 after 5s
    setTimeout(() => {
      handleExecutePrompt(STEP_PRESETS[2].prompt, 2);

      // Step 3 after another 5s
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

  return (
    <div className="flex flex-col h-screen w-screen bg-[#0f1013] text-gray-100 overflow-hidden select-none">
      
      {/* Top Application Header */}
      <Header
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

      {/* Main Single-Screen Split Layout */}
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
          creatives={MOCK_CREATIVES}
          video={MOCK_VIDEO}
          version={version}
          currentStep={currentStep}
          onInspectCreative={(c) => setSelectedCreative(c)}
          onOpenDrive={() => setIsDriveModalOpen(true)}
          onOpenEmail={() => setIsEmailModalOpen(true)}
          driveReady={driveReady}
          emailReady={emailReady}
        />
      </div>

      {/* Modals */}
      <DriveModal
        isOpen={isDriveModalOpen}
        onClose={() => setIsDriveModalOpen(false)}
      />

      <EmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        onOpenDrive={() => {
          setIsEmailModalOpen(false);
          setIsDriveModalOpen(true);
        }}
      />

      <DetailModal
        creative={selectedCreative}
        version={version}
        onClose={() => setSelectedCreative(null)}
      />

    </div>
  );
};

export default App;
