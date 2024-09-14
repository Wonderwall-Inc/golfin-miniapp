import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { KonstaProvider } from 'konsta/react'
import { BrowserRouter } from 'react-router-dom'

import App from './App.tsx'
import WebApp from '@twa-dev/sdk'

import './index.css'
import { UserProvider } from './providers/UserProvider.tsx'
import { testInitDataRaw } from './constants/index.tsx'
import { mockTelegramEnv, parseInitData } from '@telegram-apps/sdk'

WebApp.ready() // tell the TG that the mini app is ready to be displayed
const initDataRaw = new URLSearchParams(testInitDataRaw).toString();
mockTelegramEnv({
  themeParams: {
    accentTextColor: '#6ab2f2',
    bgColor: '#17212b',
    buttonColor: '#5288c1',
    buttonTextColor: '#ffffff',
    destructiveTextColor: '#ec3942',
    headerBgColor: '#17212b',
    hintColor: '#708499',
    linkColor: '#6ab3f3',
    secondaryBgColor: '#232e3c',
    sectionBgColor: '#17212b',
    sectionHeaderTextColor: '#6ab3f3',
    subtitleTextColor: '#708499',
    textColor: '#f5f5f5',
  },
  initData: parseInitData(initDataRaw),
  initDataRaw,
  version: '7.2',
  platform: 'tdesktop',
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <KonstaProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </KonstaProvider>
    </BrowserRouter>
  </StrictMode>,
)
