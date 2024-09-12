import './App.css'
import Footer from './components/FooterComponent/Footer'
import { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Home from './pages/HomePage/Home'
import Links from './pages/Links'
import Ranking from './pages/RankingPage/Ranking'
import Earns from './pages/Earns'
import { initUtils, mockTelegramEnv, parseInitData } from '@telegram-apps/sdk'
import WebApp from '@twa-dev/sdk'
import { ClipLoader } from 'react-spinners'

import DemoRanking from './pages/DemoRanking/DemoRanking'
import DemoLinks from './pages/DemoLinksPage/DemoLinks'
import { testInitDataRaw } from './constants'
import Background from './components/BackgroundComponent/Background'
import DemoEarn from './pages/DemoEarnPage/DemoEarn'

const App = () => {

  useEffect(() => {
    if (process.env.env == 'test') {
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
    }
  }, [process.env.env])

  const utils = initUtils()
  const location = useLocation()

  const navigate = useNavigate()
  let [isLoading, setIsLoading] = useState(false)
  const [mockData, setMockData] = useState('')

  const setHelloHandler = () => {
    setMockData('hello')
  }

  useEffect(() => {

    if (mockData == '') {
      console.log('hello');

      setIsLoading(true)
      setHelloHandler()
      setIsLoading(false)
    }
  }, [mockData])

  useEffect(() => {
    if (location.pathname == '/') {
      WebApp.BackButton.hide()
    } else {
      WebApp.BackButton.show()
    }
  }, [location])

  const navigateToHome = () => {
    navigate('/');
  };


  process.env.env !== 'test' && WebApp.BackButton.onClick(navigateToHome)

  return (
    <>
      {
        isLoading ?
          <div className='bg-gray-500 opacity-20 w-[390px] h-[700px]'>
            <ClipLoader
              loading={isLoading}
              size={200}
              className='absolute top-[30%] left-[25%]' />
          </div> :

          <div className='app-container'>
            <Background>
              <Routes>
                <Route path='/' element={<DemoEarn />} />
                <Route path='/anking' element={<DemoRanking />} />
                <Route path='/links' element={<DemoLinks />} />
                {/* <Route path='/' element={<Home />} />
              <Route path='/links' element={<Links utils={utils} />} />
              <Route path='/ranking' element={<Ranking />} />
              <Route path='/earns' element={<Earns />} /> */}
              </Routes>
            </Background>
            <Footer />

          </div >

      }

    </>
  )
}

export default App
