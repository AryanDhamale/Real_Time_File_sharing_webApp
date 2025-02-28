import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { FireBaseProvider } from './context/Context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FireBaseProvider>
    <App />
    </FireBaseProvider>
  </StrictMode>,
)
