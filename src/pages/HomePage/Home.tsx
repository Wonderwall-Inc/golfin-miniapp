import React, { useEffect } from 'react'
import './Home.css'
import Title from '../../components/TitleComponent/Title'
import { Block, Button, Page } from 'konsta/react'
import { useUserContext } from '../../contexts/UserContext'
import CoinImage from '../../assets/images/02_earn_coin.png'

const Home = () => {
  const { account, setAccount } = useUserContext()
  const currTime = Date.now()
  
  return (
    <div className='home-screen-slogan-container'>
      <Page>
        <div className='mt-[100px]'>
          <Title titlename='EARN' />
          <Block>
            {account?.referral !== undefined &&
              <div className='flex flex-row mt-[100px] justify-center space-x-6'>
                <img src={CoinImage} alt="earn-coin-image" width="60px" height="60px" />
                <div className='content-center font-semibold text-[40px] leading-[-6%] '>{account?.point.toLocaleString()}</div>
              </div>}
          </Block>

          <Block inset>
            <div className="grid grid-rows-2 gap-x-4 gap-y-10 justify-center">
              <button className='bg-gray-400 w-[200px] h-[100px]'>
              </button>
              <button className='bg-[#8DC63F] w-[200px] h-[100px]'>1</button>

            </div>
          </Block>
        </div >
      </Page >

    </div >
  )
}

export default Home