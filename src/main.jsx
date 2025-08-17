import { StrictMode } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { createRoot } from 'react-dom/client'
import "./../node_modules/@fortawesome/fontawesome-free/css/all.min.css"
import './index.css'
import App from './App.jsx'
import TokenContextProvider from './Context/TokenContext.jsx'
import CarContextProvider from './Context/CartContext/CartContext.jsx';


createRoot(document.getElementById('root')).render(

<TokenContextProvider>
  <CarContextProvider>
  <StrictMode>
    <App />
  </StrictMode>,
  </CarContextProvider>
  </TokenContextProvider>  
)
