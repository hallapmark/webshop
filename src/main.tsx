import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.js'
import { BrowserRouter } from 'react-router-dom'
import { CartSumContextProvider } from './context/CartSumContextProvider.js'
import { AuthContextProvider } from './context/AuthContextProvider.js'

// hyyum2rk siin typescriptiga!
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      {/* contextprovider children on see mis tema tagide vahel on, praegu siis App */}
      <CartSumContextProvider> 
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </CartSumContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
