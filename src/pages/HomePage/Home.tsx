import React, { useEffect, useState } from 'react'
import './Home.css'
import Title from '../../components/TitleComponent/Title'
import { Block, Button, Page } from 'konsta/react'
import { useUserContext } from '../../contexts/UserContext'
import CoinImage from '../../assets/images/02_earn_coin.png'
import Countdown from '../../components/Countdown'
import WebApp from '@twa-dev/sdk'

const Home = () => {
  const { account, setAccount } = useUserContext()
  const [dailyReward, setDailyReward] = useState(false)
  const [timeLeft, setTimeLeft] = useState("")

  const dailyRewardHandler = () => {
    setDailyReward(true)
  }
  console.log(dailyReward);

  const calculateTimeLeft = (targetHour: number) => {
    const now = new Date();
    const target = new Date(now);
    target.setUTCHours(targetHour, 0, 0, 0);

    if (now.getUTCHours() >= targetHour) {
      target.setUTCDate(target.getUTCDate() + 1);
    }

    const diff = target.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    const paddedHours = hours.toString().padStart(2, '0');
    const paddedMinutes = minutes.toString().padStart(2, '0');


    return `${paddedHours}:${paddedMinutes}`;
  };


  useEffect(() => {
    const updateCountdowns = () => {
      setTimeLeft(calculateTimeLeft(15))
    }
    updateCountdowns()
    const interval = setInterval(updateCountdowns, 60000) // update per minute
    return () => clearInterval(interval);
  }, [])

  // const counter = () => {
  // }

  const MINI_APP_BOT_NAME = import.meta.env.VITE_MINI_APP_BOT_NAME
  const MINI_APP_NAME = import.meta.env.VITE_MINI_APP_NAME

  const MINI_APP_APP = `https://t.me/${MINI_APP_BOT_NAME}/${MINI_APP_NAME}/start?startapp=test`

  return (
    <div className='home-screen-slogan-container'>
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
              <button className='h-[100px] bg-transparent' onClick={() => dailyRewardHandler()}>
                <div className='box-border inline-block text-center w-[100%] h-[80px]'>
                  <div className={`bg-gray-400 rounded-t-sm border-[#8cc73e] h-[50%] items-center content-center px-10 ${dailyReward == true && 'cursor-not-allowed'}`}>Daily Reward</div>
                  <div className='bg-white text-gray-400 flex flex-row justify-center rounded-b-sm border-white h-[50%] content-center text-center items-center space-x-2'>
                    <Countdown targetDate={'2024-09-10T00:00:00'} />
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
  )
}

export default Home