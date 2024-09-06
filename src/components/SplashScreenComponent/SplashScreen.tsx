import './SplashScreen.css'
import Splash from '../../assets/images/01_splash_bg.png'
import SplashLoadingText from '../../assets/images/01_splash_loader_text.png'
import SplashGolf from '../../assets/images/01_splash_loader_ball.png'
import SplashGageLoader from '../../assets/images/01_splash_loader_gage_bg.png'
import SplashLoader from '../../assets/images/01_splash_loader_gage_bg.png'

import { useEffect, useState } from 'react'
import { boolean } from '@telegram-apps/sdk'
import { Progressbar } from 'konsta/react'

interface SplashScreenProps {
  isLoading?: boolean,
}

const SplashScreen = ({ isLoading }: SplashScreenProps) => {

  const [count, setCount] = useState(0);
  const [style, setStyle] = useState({
    width: '120px',
    height: '20px',
    background: `linear-gradient(to right, #000 0%, #000 20%), #ddd 0% 10%`,
    animation: 'l1 2s infinite linear',
    left: '50%',
    translateX: '100%',
  })

  const updateStyle = (count: number) => {
    setStyle(
      {
        width: '120px',
        height: '20px',
        background: `linear-gradient(to right, #000 0%, #000 ${count}%), #ddd 0% ${count}%`,
        animation: 'l1 2s infinite linear',
        left: '50%',
        translateX: '100%',
      }
    )
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (count < 100) {
        setCount(count + 10);
      } else {
        clearInterval(intervalId);
      }
    }, 100); // Update every 100 milliseconds (0.1 seconds)

    return () => clearInterval(intervalId);
  }, []);


  useEffect(() => {
    updateStyle(count)
    console.log(count);

  }, [count])


  return (
    <div className='relative'>
      <img src={Splash} />
      <>
        <div className='absolute bottom-[110px] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
          {/* <Progressbar progress={count} /> */}
          {/* <div style={style} /> */}
          <img src={SplashGageLoader} className='left-[50%] translate-x-[-50%] translate-y-[-50%] bottom-[120px] absolute scale-80 mt-10 pb-2' />
          <img src={SplashLoadingText} className=' w-[100px] ml-1' />
        </div>
      </>
    </div>

  )
}

export default SplashScreen