# Google Cloud • Gemini Creative Agentic Studio

Proyecto interactivo de **Creatividad Publicitaria en la Era Agéntica**, inspirado en los anuncios y conceptos del **Google Cloud Summit**.

Diseñado para demos ejecutivas de alto impacto en una sola pantalla (**Single Screen Studio**), orquestando las herramientas de Google:
- **Gemini 2.0 Flash / Pro**: Multimodal grounding, crawling web, análisis semántico de marca y generación de copy persuasivo.
- **Imagen 3**: Síntesis fotorrealista de imágenes adaptativas en 12 formatos multicanal.
- **Google Veo (VideoFX)**: Renderizado de video vertical cinemático de 10 segundos a 60 FPS con audio neural.
- **Nano Banana / MediaPipe Edge**: Motor de micro-refinamiento rápido para ajustes y feedback de cliente en tiempo real sin regenerar desde cero.
- **Google Workspace Agent (Drive & Gmail APIs)**: Clasificación de archivos, sincronización a carpetas en la nube y despacho de correo formal de confirmación.

---

## 🚀 Cómo correr el proyecto

```bash
cd /Users/heberolmos/Documents/agentic-creative-studio
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 🎬 Flujo de la Demo en 3 Pasos

La interfaz cuenta con controles directos en el Header y atajos en el panel lateral:

### **Paso 1: Generación Multicanal desde Contexto Web**
- **Acción**: Ingresa una URL (ej. `https://lumiere-botanics.com/glow-serum` o usa los presets de Skincare, Sneakers o SaaS).
- **Resultado Agéntico**: 
  - Genera **12 formatos de imagen** para Meta, TikTok, YouTube Shorts, Google Display (300x250, 728x90, 300x600), Carruseles y Pinterest.
  - Genera **1 video cinemático vertical de 10 segundos** con reproductor interactivo, scrubber de escenas (0-3s, 3-7s, 7-10s) y audio.

### **Paso 2: Aplicación de Feedback del Cliente**
- **Acción**: Clic en *"2. Feedback de Cliente"* o prompt libre (ej. *"El cliente pidió paleta más cálida, 20% OFF de urgencia y modelo sonriendo a cámara"*).
- **Resultado Agéntico**:
  - Se activa **Nano Banana** para aplicar micro-ajustes cromáticos en tiempo real.
  - La interfaz transmuta visualmente a la versión **v2**: paleta dorada/sunset, badges de *-20% OFF*, nuevo CTA y modelo reenfocada.
  - Incluye switch para alternar entre **v1** y **v2** y modal de inspección con comparativa de prompts.

### **Paso 3: Clasificación, Google Drive y Correo Ejecutivo**
- **Acción**: Clic en *"3. Clasificar, Drive & Email"*.
- **Resultado Agéntico**:
  - El agente clasifica los 13 activos en 4 carpetas organizadas (`01_Social_Vertical`, `02_Display_Banners`, `03_Feeds_and_Carousels`, `04_Video_Veo_Master`).
  - Despliega el **Explorador de Google Drive** con enlaces de descarga y estado de sincronización.
  - Despacha un **Correo de Confirmación vía Gmail API** con el desglose formal de la entrega.

---

## 🌟 Funciones Destacadas para la Presentación
- **Botón "Auto Demo"**: Ejecuta los 3 pasos de forma secuencial y automática con tiempos de espera realistas para exponer sin necesidad de teclear.
- **Reasoning Stream**: Consola en vivo en el panel izquierdo que muestra los pensamientos, herramientas y micro-pasos del agente en tiempo real.
- **Inspección de Formatos**: Haz clic en cualquier formato para ver sus especificaciones técnicas, resolución exacta, prompt y canal publicitario.
