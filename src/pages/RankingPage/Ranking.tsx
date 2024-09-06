import Title from '../../components/TitleComponent/Title'
import { useState } from 'react';
import { Page, TabbarLink, } from 'konsta/react';
import CoinImage from '../../assets/images/02_earn_coin.png'
import { mockPointRankingData, mockReferralRankingData } from '../../constants';

const Ranking = () => {
  const [activeTab, setActiveTab] = useState('tab-1');
  const [isTabbarLabels, setIsTabbarLabels] = useState(true);
  const myAccount = 'player25'
  return (
    <div className='home-screen-slogan-container'>
      <Page>
        <div className='mt-[100px]'>
          <Title titlename='RANKING' />
          <div className='pt-20 mx-10'>

            <div className='flex flex-row'>
              <TabbarLink
                active={activeTab === 'tab-1'}
                onClick={() => setActiveTab('tab-1')}
                label={isTabbarLabels && 'Referral'}
                className={`${activeTab === 'tab-1' ? 'bg-[#8DC63F] font-[800] py-3 rounded-t-lg' : 'bg-white font-[800] py-3 rounded-t-lg'}`}
              />
              <TabbarLink
                active={activeTab === 'tab-2'}
                onClick={() => setActiveTab('tab-2')}
                label={isTabbarLabels && 'Total Points'}
                className={`${activeTab === 'tab-2' ? 'bg-[#8DC63F] font-[800] py-3 rounded-t-lg' : 'bg-white font-[800] py-3 rounded-t-lg '}`}
              />
            </div>

            {activeTab === 'tab-1' && <>
              {mockReferralRankingData.map((mockReferral, index) => {
                return <div key={mockReferral.name} className={`text-[#8DC63F] bg-white flex flex-row leading-[89px] justify-between ${(mockReferral.name == myAccount && index == 0) && 'mt-[0.5px] rounded-md border-4 border-[#8DC63F]'}`}>
                  <div className='flex font-rubik font-[600] text-xl pr-10 pb-1 content-start place-content-start'>
                    <div className='pl-5 text-right '>{mockReferral.rank}</div>
                    <span>.</span>
                    <div className='pl-5 text-right '>{mockReferral.name}</div>
                  </div>
                  <div className='flex flex-row justify-start pr-10 pb-1'>
                    <div className='text-xl pr-5'>{mockReferral.referral}</div>
                    <img src={CoinImage} width={30} height={30} className='justify-end' />
                  </div>
                </div>
              })}</>
            }
            {activeTab === 'tab-2' && <>
              {mockPointRankingData.map((mockPoint, index) => {
                return <div key={mockPoint.name} className={`text-[#8DC63F] bg-white flex flex-row leading-[89px] justify-between ${mockPoint.name == myAccount && 'rounded-md border-4 border-[#8DC63F]'}`}>
                  <div className='flex font-rubik font-[600] text-xl pr-10 pb-1 content-start place-content-start'>
                    <div className='pl-5 text-right '>{mockPoint.rank}</div>
                    <span>.</span>
                    <div className='pl-5 text-right '>{mockPoint.name}</div>
                  </div>
                  <div className='flex flex-row justify-start pr-10 pb-1'>
                    <div className='text-xl pr-5'>{mockPoint.point}</div>
                    <img src={CoinImage} width={30} height={30} className='justify-end' />
                  </div>
                </div>
              })}</>}
          </div>
        </div>
      </Page>
    </div>

  )
}

export default Ranking