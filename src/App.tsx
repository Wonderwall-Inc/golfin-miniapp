import './App.css'
import Footer from './components/FooterComponent/Footer'
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/HomePage/Home'
import Links from './pages/Links'
import Ranking from './pages/RankingPage/Ranking'
import Earns from './pages/Earns'
import SplashScreen from './components/SplashScreenComponent/SplashScreen'



const App = () => {

  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const interval = setInterval(() => { setIsLoading(false) }, 1000)
    return () => clearInterval(interval)
  })

  return (
    isLoading ?
      <SplashScreen /> :
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
