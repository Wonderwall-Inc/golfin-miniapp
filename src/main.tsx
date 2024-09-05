import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { KonstaProvider } from 'konsta/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import MyApp from './App.tsx'
import Home from './pages/HomePage/Home.tsx'
import Links from './pages/Links.tsx'
import Ranking from './pages/Ranking.tsx'
import Earns from './pages/Earns.tsx'

import Framework7 from "framework7/lite-bundle";
import Framework7React from "framework7-react";

import './index.css'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <KonstaProvider>
        <MyApp />
      </KonstaProvider>
    </BrowserRouter>
  </StrictMode>,
)
