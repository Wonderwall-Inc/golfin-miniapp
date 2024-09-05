import React from 'react'
import './Home.css'
import Title from '../../components/TitleComponent/Title'
import { Block, Page } from 'konsta/react'

const Home = () => {
  return (
    <Page>
      <Block>

        <Title titlename='Earn' />

        <div className='w-[393px] h-[250px] text-black py-[32px] px-[16px] gap-[48px] mt-[30px]'>
          <div className='rounded-full border-2 border-black w-[149px] h-[149px] m-auto py-[10px] content-center'>

            <div className='text-center items-center content-center'>
              <div className='font-bold text-[34px] leading-[41px] text-center content-center item-center tracking-[0.4px]'>1</div>
              <div className='font-[600] text-[22px] leading-[28px] text-center content-center item-center tracking-[-0.26px]'>points</div>
            </div>
          </div>
        </div>

        <div className='w-[329px] flex mx-auto content-center items-center justify-evenly gap-[15px] text-black'>
          <button className='bg-[#46FF68] rounded-lg w-[152px] h-[105px]'>
            <div className='h-[48px] font-[600] text-[18px] leading-[24px] tracking-[0.4px] items-center content-center'>Daily Reward</div>
            <div className='font-[600] text-[22px] leading-[28px] tracking-[-0.26px] text-center content-center'>+500</div>
          </button>
          <button className='bg-[#46FF68] rounded-lg w-[152px] h-[105px]'>
            <div className='h-[48px] font-[600] text-[18px] leading-[24px] tracking-[0.4px] items-center content-center'>Invite a Friend</div>
            <div className='font-[600] text-[22px] leading-[28px] tracking-[-0.26px] text-center content-center'>+500</div>
          </button>
        </div>
      </Block>
    </Page>


  )
}

export default Home