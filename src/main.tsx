import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {Capacitor} from '@capacitor/core';
import {SplashScreen} from '@capacitor/splash-screen';
import {StatusBar} from '@capacitor/status-bar';
import App from './App.tsx';
import './index.css';
import './sw-register';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

if (Capacitor.isNativePlatform()) {
  void StatusBar.setStyle({style: 'DARK'});
  void SplashScreen.hide();
}
