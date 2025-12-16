import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'leaflet/dist/leaflet.css';
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { CartSumContextProvider } from './context/CartSumContextProvider'
import { AuthContextProvider } from './context/AuthContextProvider'
import { store } from './store/store'
import { Provider } from 'react-redux'

// hyyum2rk siin typescriptiga!
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      {/* contextprovider children on see mis tema tagide vahel on, praegu siis App */}
      <CartSumContextProvider> 
        <AuthContextProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </AuthContextProvider>
      </CartSumContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
