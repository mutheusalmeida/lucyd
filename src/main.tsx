import '@/styles/index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app.tsx'

ReactDOM.createRoot(document.querySelector('[data-js="root"]')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
