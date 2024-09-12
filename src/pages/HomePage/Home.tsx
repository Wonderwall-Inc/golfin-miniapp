import React, { CSSProperties, useEffect, useState } from 'react'
import './Home.css'
import Title from '../../components/titleComponent/title'
import { Block, Button, Page } from 'konsta/react'
import { useUserContext } from '../../contexts/UserContext'
import CoinImage from '../../assets/images/02_earn_coin.png'
import Countdown from '../../components/Countdown'
import WebApp from '@twa-dev/sdk'
import { ClipLoader } from 'react-spinners'

const Home = () => {
  const MINI_APP_BOT_NAME = import.meta.env.VITE_MINI_APP_BOT_NAME
  const MINI_APP_NAME = import.meta.env.VITE_MINI_APP_NAME

  const MINI_APP_APP = `https://t.me/${MINI_APP_BOT_NAME}/${MINI_APP_NAME}/start?startapp=test`

  const { account, setAccount } = useUserContext()
  const [dailyReward, setDailyReward] = useState(false)
  const [timeLeft, setTimeLeft] = useState("")
  let [isHomeLoading, setIsHomeLoading] = useState(false)
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    if (timeLeft == '') {
      setIsHomeLoading(true)
    } else {
      setIsHomeLoading(false)
    }
  }, [timeLeft])

  useEffect(() => {
    const todayDay = new Date()
    const todayYY = todayDay.getFullYear()
    const todayMM = todayDay.getUTCMonth() + 1
    const preTodayMM = todayMM < 10 ? `0${todayMM}` : todayMM
    const todayDD = todayDay.getDate() + 1
    const todayYYMMDD = `${todayYY}-${preTodayMM}-${todayDD}T00:00:00`
    setTimeLeft(todayYYMMDD)
  }, [new Date()])


  const dailyRewardHandler = () => {
    setDailyReward(true)
  }

  return (
    <>

      {isHomeLoading ? <ClipLoader size='200px' /> : <div className='home-screen-slogan-container'>
        <Page>
          <div className='mt-[100px]'>
            <Title titlename='EARN' />
            <Block>
              {account?.referral !== undefined &&
                <div className='flex flex-row mt-[50px] justify-center space-x-6'>
                  <img src={CoinImage} alt="earn-coin-image" width="30px" height="30px" />
                  <div className='content-center font-semibold text-[30px] leading-[-6%] '>{account?.point.toLocaleString()}</div>
                </div>}
            </Block>

            <Block inset>
              <div className="grid grid-rows-2 gap-y-6 justify-center">
                <button className={`h-[100px] bg-transparent ${dailyReward == true && 'cursor-not-allowed'}`} onClick={() => dailyRewardHandler()}>
                  <div className='box-border inline-block text-center w-[100%] h-[80px]'>
                    <div className={`bg-gray-400 rounded-t-sm border-[#8cc73e] h-[50%] items-center content-center px-10`}>Daily Reward</div>
                    <div className='bg-white text-gray-400 flex flex-row justify-center rounded-b-sm border-white h-[50%] content-center text-center items-center space-x-2'>
                      <Countdown targetDate={timeLeft} />
                    </div>
                  </div>

                </button>
                <button className='h-[100px] bg-transparent' onClick={() => {
                  WebApp.openTelegramLink(`https://t.me/share/url?url=${MINI_APP_APP}`)
                }}>
                  <div className='box-border inline-block text-center w-[100%] h-[80px]'>
                    <div className='bg-[#8cc73e] rounded-t-sm border-[#8cc73e] h-[50%] items-center  px-10 content-center'>Invite a Friend</div>
                    <div className='bg-white text-[#8cc73e] flex flex-row justify-center rounded-b-sm border-white h-[50%] content-center text-center items-center space-x-2'>
                      <div className='text-[18px]'>+ 500</div>
                      <img src={CoinImage} width='30px' height='30px' />
                    </div>
                  </div>
                </button>
              </div>
            </Block>
          </div >

        </Page >
      </div >
      }
    </>
  )
}

export default Home