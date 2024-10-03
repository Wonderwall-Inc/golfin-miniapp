import WebApp from '@twa-dev/sdk'
import { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { initUtils, mockTelegramEnv, parseInitData } from '@telegram-apps/sdk'

import { useFriendContext } from './contexts/FriendContext'
import { useUserContext } from './contexts/UserContext'
import { usePointContext } from './contexts/PointContext'
import { useActivityContext } from './contexts/ActivityContext'

import './App.css'

import { Toaster } from './components/ui/toaster'
import Footer from './components/FooterComponent/Footer'
import DemoTitle from './components/DemoTitleComponent/DemoTitle'
import Background from './components/BackgroundComponent/Background'
import { testInitDataRaw } from './constants'

import DemoEarn from './pages/DemoEarnPage/DemoEarn'
import DemoRanking from './pages/DemoRanking/DemoRanking'
import DemoLinks from './pages/DemoLinksPage/DemoLinks'
import DemoProfile from './pages/DemoProfilePage/DemoProfile'
import DemoDev from './pages/DemoDevPage/DemoDev'

import Loader from './components/LoaderComponent/Loader'

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

  const [isWaiting, setIsWaiting] = useState(false)

  const [waitingType, setWaitingType] = useState("")

  const { isWaitingUser, setIsWaitingUser, account } = useUserContext()
  const { isWaitingPoint, setIsWaitingPoint, point } = usePointContext()
  const { isWaitingActivity, setIsWaitingActivity, activity } = useActivityContext()
  const { isWaitingFriend, setIsWaitingFriend, friend } = useFriendContext()
  
  const MINI_APP_BOT_NAME = import.meta.env.VITE_MINI_APP_BOT_NAME
  const MINI_APP_NAME = import.meta.env.VITE_MINI_APP_NAME

  useEffect(() => {
    if (isWaitingUser == true || isWaitingPoint == true || isWaitingActivity == true || isWaitingFriend == true) {
      setIsWaiting(true)
    } else {
      setIsWaiting(false)
    }

    if (isWaitingUser == true) {
      setWaitingType("user")
    }
    if (isWaitingPoint == true) {
      setWaitingType("point")
    }
    if (isWaitingActivity == true) {
      setWaitingType("activity")
    }
    if (isWaitingFriend == true) {
      setWaitingType("friend")
    }
  }, [isWaitingUser, isWaitingPoint, isWaitingFriend, isWaitingActivity])


  useEffect(() => {
    location.pathname == '/' ? WebApp.BackButton.hide() : WebApp.BackButton.show()
  }, [location])

  const navigateToHome = () => {
    navigate('/');
  };

  console.log(`${waitingType}: `, isWaiting);


  import.meta.env.VITE_MINI_APP_ENV !== 'test' && WebApp.BackButton.onClick(navigateToHome)
  {/* <div>
            <div className="bg-[#00161c] justify-center w-full">
              <div className="bg-[#00161c] overflow-hidden w-[393px] h-[852px] relative">
                <ClipLoader
                  color='gray'
                  loading={isWaiting}
                  size={150}
                  className='opacity-80 absolute top-[30%] left-[30%] translate-x-[-50%] translate-y-[-50%]'
                >
                </ClipLoader>
                <img className="absolute left-[50%] w-[100%] translate-x-[-50%]" alt="Ellipse171" src={ellipseImage1} />
              </div>
            </div>
          </div> */}
  return (
    <div>
      {
        isWaiting == true ?
          <Loader isLoading={isWaiting} /> :
          <div className='app-container'>
            <Background>
              <DemoTitle titlename={`${location.pathname == '/' ? 'EARN' : location.pathname.split('/')[1].toUpperCase()}`} />
              <Routes>
                <Route path='/' element={<DemoEarn appLink={`https://t.me/${MINI_APP_BOT_NAME}/${MINI_APP_NAME}/start?startapp=${WebApp.initDataUnsafe.user?.id}`} />} />
                <Route path='/ranking' element={<DemoRanking />} />
                <Route path='/links' element={<DemoLinks utils={utils} appLink={`https://t.me/${MINI_APP_BOT_NAME}/${MINI_APP_NAME}/start`} />} />
                <Route path='/profile' element={<DemoProfile />} />
                <Route path='/dev' element={<DemoDev />} />
              </Routes>
            </Background>
            <Footer />
            <Toaster /> {/* shadcn-ui */}
          </div >
      }
    </div >
  )
}

export default App
