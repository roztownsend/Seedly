import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastProvider } from "./components/toast/ToastContext";
import "./components/toast/toast.css";
import './index.css'
import App from './App.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
    <App />
    </ToastProvider>
  </StrictMode>,
)
