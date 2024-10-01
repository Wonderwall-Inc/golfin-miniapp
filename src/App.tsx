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
import DemoProfile from './pages/DemoProfilePage/DemoProfile'
import { useUserContext } from './contexts/UserContext'
import { usePointContext } from './contexts/PointContext'
import { useActivityContext } from './contexts/ActivityContext'
import { useFriendContext } from './contexts/FriendContext'
import DemoDev from './pages/DemoDevPage/DemoDev'
import { Toaster } from './components/ui/toaster'

import ellipseImage1 from './assets/images/ellipse-171.png';

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

  const { isWaitingUser, setIsWaitingUser, account } = useUserContext()
  const { isWaitingPoint, setIsWaitingPoint, point } = usePointContext()
  const { isWaitingActivity, setIsWaitingActivity, activity } = useActivityContext()
  const { isWaitingFriend, setIsWaitingFriend, friend } = useFriendContext()

  useEffect(() => {
    if (isWaitingUser == true || isWaitingPoint == true || isWaitingActivity == true || isWaitingFriend == true) {
      setIsWaiting(true)
    } else {
      setIsWaiting(false)
    }
  }, [isWaitingUser, isWaitingPoint, isWaitingFriend, isWaitingActivity])


  useEffect(() => {
    location.pathname == '/' ? WebApp.BackButton.hide() : WebApp.BackButton.show()
  }, [location])

  const navigateToHome = () => {
    navigate('/');
  };

  console.log('isWaitingUser:', isWaitingUser);
  console.log('isWaitingPoint:', isWaitingPoint);
  console.log('isWaitingActivity:', isWaitingActivity);
  console.log('isWaitingFriend:', isWaitingFriend);


  import.meta.env.VITE_MINI_APP_ENV !== 'test' && WebApp.BackButton.onClick(navigateToHome)

  return (
    <div>

      {
        isWaiting == true ?
          <div>
            <div className="bg-[#00161c] justify-center w-full">
              <div className="bg-[#00161c] overflow-hidden w-[393px] h-[852px] relative">
                <ClipLoader
                  color='gray'
                  /*        loading={1 == 1} */
                  loading={isWaiting}
                  size={150}
                  className='opacity-80 absolute top-[40%] left-[30%] translate-x-[-50%] translate-y-[-50%]'
                >
                </ClipLoader>
                <img className="absolute left-[50%] w-[100%] translate-x-[-50%]" alt="Ellipse171" src={ellipseImage1} />
              </div>
            </div>
          </div>
          :
          <div className='app-container'>
            <Background>

              <DemoTitle titlename={`${location.pathname == '/' ? 'EARN' : location.pathname.split('/')[1].toUpperCase()}`} />
              <Routes>
                <Route path='/' element={<DemoEarn />} />
                <Route path='/ranking' element={<DemoRanking />} />
                <Route path='/links' element={<DemoLinks utils={utils} />} />
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
