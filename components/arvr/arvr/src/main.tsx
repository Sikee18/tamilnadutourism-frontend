import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "cesium/Build/Cesium/Widgets/widgets.css"; // CRITICAL: Fixes black screen/layout
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
