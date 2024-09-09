import React, { useEffect, useState } from 'react'
import './Home.css'
import Title from '../../components/TitleComponent/Title'
import { Block, Button, Page } from 'konsta/react'
import { useUserContext } from '../../contexts/UserContext'
import CoinImage from '../../assets/images/02_earn_coin.png'

const Home = () => {
  const { account, setAccount } = useUserContext()
  const [dailyReward, setDailyReward] = useState(false)

  const dailyRewardHandler = () => {
    setDailyReward(true)
  }
  console.log(dailyReward);
  
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
              <button className={`bg-gray-400 w-[180px] h-[90px] ${dailyReward == true && 'cursor-not-allowed'}`} onClick={() => dailyRewardHandler()}>Daily Reward</button>
              <button className='bg-[#8DC63F] w-[180px] h-[90px]' onClick={() => console.log('hello')}>Invite a Friend</button>
            </div>
          </Block>
        </div >
      </Page >

    </div >
  )
}

export default Home