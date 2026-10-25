
import './index.css'
import App from './App.tsx'
import ReactDOM from 'react-dom/client'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import CartPovider from './components/context/CartContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename='/ecommerce-store'>
      <CartPovider>
        <App />
      </CartPovider>
    </BrowserRouter>
  </React.StrictMode>,
)
