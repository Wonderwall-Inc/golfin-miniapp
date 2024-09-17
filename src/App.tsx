import './App.css'
import Footer from './components/FooterComponent/Footer'
import { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { initUtils, mockTelegramEnv, parseInitData } from '@telegram-apps/sdk'
import WebApp from '@twa-dev/sdk'
import { ClipLoader } from 'react-spinners'

import DemoRanking from './pages/DemoRanking/DemoRanking'
import DemoLinks from './pages/DemoLinksPage/DemoLinks'
import { testInitDataRaw } from './constants'
import Background from './components/BackgroundComponent/Background'
import DemoEarn from './pages/DemoEarnPage/DemoEarn'
import DemoTitle from './components/DemoTitleComponent/DemoTitle'
import DemoUser from './pages/DemoUserPage/DemoUser'
import { useUserContext } from './contexts/UserContext'

const App = () => {
  if (import.meta.env.VITE_MINI_APP_ENV == 'test') {
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

  const utils = initUtils()
  const location = useLocation()

  const navigate = useNavigate()
  const { isWaitingUser, setIsWaitingUser, account } = useUserContext()

  useEffect(() => {
    location.pathname == '/' ? WebApp.BackButton.hide() : WebApp.BackButton.show()
  }, [location])

  const navigateToHome = () => {
    navigate('/');
  };

  console.log(WebApp.initDataUnsafe.user);

  import.meta.env.VITE_MINI_APP_ENV !== 'test' && WebApp.BackButton.onClick(navigateToHome)

  return (
    <>
      {
        true ?
          <div className='bg-gray-400 opacity-30 w-[390px] h-[700px]'>
            <ClipLoader
              loading={isWaitingUser}
              size={200}
              className='absolute top-[30%] left-[25%]' />
          </div> :
          <div className='app-container'>
            <Background>
              <DemoTitle titlename={`${location.pathname == '/' ? 'EARN' : location.pathname.split('/')[1].toUpperCase()}`} />
              <Routes>
                <Route path='/' element={<DemoEarn />} />
                <Route path='/ranking' element={<DemoRanking />} />
                <Route path='/links' element={<DemoLinks utils={utils} />} />
                <Route path='/user' element={<DemoUser />} />
              </Routes>
            </Background>
            <Footer />

          </div >

      }

    </>
  )
}

export default App
