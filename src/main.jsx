import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CartSumContextProvider } from './context/CartSumContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* contextprovider children on see mis tema tagide vahel on, praegu siis App */}
      <CartSumContextProvider> 
          <App />
      </CartSumContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
