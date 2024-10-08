import WebApp from '@twa-dev/sdk'
import { lazy, Suspense, useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { initUtils, mockTelegramEnv, parseInitData, parseThemeParams } from '@telegram-apps/sdk'
import { Analytics } from "@vercel/analytics/react"

import { useFriendContext } from './contexts/FriendContext'
import { useUserContext } from './contexts/UserContext'
import { usePointContext } from './contexts/PointContext'
import { useActivityContext } from './contexts/ActivityContext'

import './App.css'

import { Toaster } from './components/ui/toaster'
import Footer from './components/FooterComponent/Footer'
import DemoTitle from './components/DemoTitleComponent/DemoTitle'
import Background from './components/BackgroundComponent/Background'
import { testInitDataRaw, testInitDataThemeParams } from './constants'

import Loader from './components/LoaderComponent/Loader'

const DemoEarn = lazy(() => import('./pages/DemoEarn'))
const DemoRanking = lazy(() => import('./pages/DemoRanking'))
const DemoLinks = lazy(() => import('./pages/DemoLinks'))
const DemoProfile = lazy(() => import('./pages/DemoProfile'))
const DemoDev = lazy(() => import('./pages/DemoDev'))

const App = () => {
  if (import.meta.env.VITE_MINI_APP_ENV == 'test') {
    const initDataRaw = new URLSearchParams(testInitDataRaw).toString();
    mockTelegramEnv({
      themeParams: parseThemeParams(testInitDataThemeParams),
      initData: parseInitData(initDataRaw),
      initDataRaw,
      version: '7.2',
      platform: 'tdesktop',
    });
  }

  const utils = initUtils()
  const location = useLocation()
  const navigate = useNavigate()

  const [isWaiting, setIsWaiting] = useState(false)

  const [waitingType, setWaitingType] = useState("")

  const { isWaitingUser } = useUserContext()
  const { isWaitingPoint } = usePointContext()
  const { isWaitingActivity } = useActivityContext()
  const { isWaitingFriend } = useFriendContext()

  const MINI_APP_BOT_NAME = import.meta.env.VITE_MINI_APP_BOT_NAME
  const MINI_APP_NAME = import.meta.env.VITE_MINI_APP_NAME

  useEffect(() => {
    setIsWaiting(isWaitingUser == true || isWaitingPoint == true || isWaitingActivity == true || isWaitingFriend == true)
    if (isWaitingUser) {
      setWaitingType("user")
    } else if (isWaitingPoint) {
      setWaitingType("point")
    } else if (isWaitingActivity) {
      setWaitingType("activity")
    } else if (isWaitingFriend) {
      setWaitingType("friend")
    }
  }, [isWaitingUser, isWaitingPoint, isWaitingFriend, isWaitingActivity])


  useEffect(() => {
    WebApp.BackButton[location.pathname === '/' ? 'hide' : 'show']()
  }, [location])

  const navigateToHome = () => {
    navigate('/');
  };

  console.log(`${waitingType}: `, isWaiting);

  import.meta.env.VITE_MINI_APP_ENV !== 'test' && WebApp.BackButton.onClick(navigateToHome)

  return (
    <div>
      {
        isWaiting == true ?
          <Loader isLoading={isWaiting} /* type='default'  */ /> :
          <>
            <Background>
              <DemoTitle titlename={`${location.pathname === '/' ? 'EARN' : location.pathname.split('/')[1].toUpperCase()}`} />
              <Suspense fallback={<Loader isLoading={true} /* type='default' */ />}>
                <Routes>
                  <Route path='/' element={<DemoEarn appLink={`https://t.me/${MINI_APP_BOT_NAME}/${MINI_APP_NAME}/start?startapp=${WebApp.initDataUnsafe.user?.id}`} />} />
                  <Route path='/ranking' element={<DemoRanking />} />
                  <Route path='/links' element={<DemoLinks utils={utils} appLink={`https://t.me/${MINI_APP_BOT_NAME}/${MINI_APP_NAME}/start?startapp=${WebApp.initDataUnsafe.user?.id}`} />} />
                  <Route path='/profile' element={<DemoProfile />} />
                  <Route path='/dev' element={<DemoDev />} />
                </Routes>
              </Suspense>
            </Background>
            <Footer />
            <Toaster /> {/* shadcn-ui */}
            <Analytics />
          </>
      }
    </div >
  )
}

export default App
