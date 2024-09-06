import React from 'react'
import './App.css'
import Footer from './components/FooterComponent/Footer'
import { KonstaProvider, Page, Preloader } from 'konsta/react'
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/HomePage/Home'
import Links from './pages/Links'
import Ranking from './pages/Ranking'
import Earns from './pages/Earns'

import SplashScreen from './assets/images/Splashscreen.png'

const App = () => {

  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const interval = setInterval(() => { setIsLoading(false) }, 1500)
    return () => clearInterval(interval)
  })

  return (
    isLoading ? <img src={SplashScreen} /> :
      <div className='app-container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/links' element={<Links />} />
          <Route path='/ranking' element={<Ranking />} />
          <Route path='/earns' element={<Earns />} />
        </Routes>
        <Footer />
      </div>
  )
}

export default App
