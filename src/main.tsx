import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/src/'
import Home from '@/src/app/page'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Home />
  </StrictMode>,
)
