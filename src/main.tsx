import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PageHeadingRoot } from './lib/HeadingContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PageHeadingRoot>
      <App />
    </PageHeadingRoot>
  </StrictMode>,
)
