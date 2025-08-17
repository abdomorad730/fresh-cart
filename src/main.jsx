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
      
      </StrictMode>
    </CarContextProvider>
  </TokenContextProvider>  
)

// ✅ تسجيل الـ Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => console.log("Service Worker registered ✅:", reg))
      .catch((err) => console.log("Service Worker registration failed ❌:", err));
  });
}

// ✅ الاستماع لحدث beforeinstallprompt (علشان يظهر زر التثبيت)
let deferredPrompt;
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  console.log("✅ beforeinstallprompt event fired");
  // تقدر هنا تظهر زر "Install App" للمستخدم
});

// ✅ دالة لتثبيت التطبيق عند الضغط على زر
export function installApp() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install ✅");
      } else {
        console.log("User dismissed the install ❌");
      }
      deferredPrompt = null;
    });
  }
}

// ✅ Notification Permission (لازم تستدعيها بعد action من المستخدم)
export function requestNotificationPermission() {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("🔔 Notifications allowed");
    } else {
      console.log("🔕 Notifications denied");
    }
  });
}
