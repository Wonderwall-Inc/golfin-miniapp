import Title from '../../components/TitleComponent/Title'
import { useEffect, useState } from 'react';
import { Page, TabbarLink, } from 'konsta/react';
import CoinImage from '../../assets/images/02_earn_coin.png'
import { mockPointRankingData, mockReferralRankingData } from '../../constants';
import { useUserContext } from '../../contexts/UserContext';

const Ranking = () => {
  const [activeTab, setActiveTab] = useState('tab-1');
  const [isTabbarLabels, setIsTabbarLabels] = useState(true);
  const { account, setAccount } = useUserContext()

  return (
    <div className='home-screen-slogan-container'>
      <Page>
        <div className='mt-[100px]'>
          <Title titlename='RANKING' />
          <div className='pt-15 mx-10'>

            <div className='flex flex-row'>
              <TabbarLink
                active={activeTab === 'tab-1'}
                onClick={() => setActiveTab('tab-1')}
                label={isTabbarLabels && 'Referral'}
                className={`${activeTab === 'tab-1' ? 'bg-[#8DC63F] font-[800] py-1 rounded-t-lg' : 'bg-white font-[800] py-1 rounded-t-lg'}`}
              />
              <TabbarLink
                active={activeTab === 'tab-2'}
                onClick={() => setActiveTab('tab-2')}
                label={isTabbarLabels && 'Total Points'}
                className={`${activeTab === 'tab-2' ? 'bg-[#8DC63F] font-[800] py-1 rounded-t-lg' : 'bg-white font-[800] py-1 rounded-t-lg '}`}
              />
            </div>

            {activeTab === 'tab-1' && <>
              <div className='h-[260px] overflow-y-scroll'>
                {mockReferralRankingData.map((mockReferral, index) => {
                  if (index < 10) {
                    return <div key={mockReferral.name} className={`text-[#8DC63F] bg-white flex flex-row leading-[89px] justify-between`}>
                      <div className='flex font-rubik font-[600] text-xl pr-10 pb-1 content-start place-content-start'>
                        <div className='pl-5 text-right'>{mockReferral.rank}</div>
                        <span>.</span>
                        <div className={`${index < 9 ? 'pl-7' : 'pl-5'} text-right`}>{mockReferral.name}</div>
                      </div>
                      <div className='flex flex-row justify-start pr-5 pb-1'>
                        <div className='text-xl pr-5'>{mockReferral.referral}</div>
                        <img src={CoinImage} width='30px' height='30px' className='justify-end' />
                      </div>
                    </div>
                  }

                })}

                {mockReferralRankingData.map((mockReferral, index) => {
                  if (mockReferral.name == account?.name) {
                    return <div key={mockReferral.name} className={`text-[#8DC63F] bg-white flex flex-row justify-between  rounded-md border-[#8DC63F] border-4`}>
                      <div className='flex font-rubik font-[600] text-xl content-start place-content-start'>
                        <div className='pl-5 text-right'>{mockReferral.rank}</div>
                        <span>.</span>
                        <div className={`${index < 9 ? 'pl-7' : 'pl-5'} text-right`}>{mockReferral.name}</div>
                      </div>
                      <div className='flex flex-row justify-start pr-5 pb-1'>
                        <div className='text-xl pr-4'>{mockReferral.referral}</div>
                        <img src={CoinImage} width='30px' height='30px' className='justify-end' />
                      </div>
                    </div>
                  }

                }).filter(mockReferral => mockReferral !== undefined)}
              </div>
            </>
            }
             {activeTab === 'tab-2' && <>
              <div className='h-[260px] overflow-y-scroll'>
                {mockPointRankingData.map((mockPoint, index) => {
                  if (index < 10) {
                    return <div key={mockPoint.name} className={`text-[#8DC63F] bg-white flex flex-row leading-[89px] justify-between`}>
                      <div className='flex font-rubik font-[600] text-xl pr-10 pb-1 content-start place-content-start'>
                        <div className='pl-5 text-right'>{mockPoint.rank}</div>
                        <span>.</span>
                        <div className={`${index < 9 ? 'pl-7' : 'pl-5'} text-right`}>{mockPoint.name}</div>
                      </div>
                      <div className='flex flex-row justify-start pr-5 pb-1  font-rubik font-[600] text-xl content-start place-content-start'>
                        <div className='text-xl pr-5'>{mockPoint.point}</div>
                        <img src={CoinImage} width='30px' height='30px' className='justify-end' />
                      </div>
                    </div>
                  }

                })}

                {mockPointRankingData.map((mockPoint, index) => {
                  if (mockPoint.name == account?.name) {                    
                    return <div key={mockPoint.name} className={`text-[#8DC63F] bg-white flex flex-row justify-between  rounded-md border-[#8DC63F] border-4`}>
                      <div className='flex font-rubik font-[600] text-xl content-start place-content-start'>
                        <div className='pl-5 text-right'>{mockPoint.rank}</div>
                        <span>.</span>
                        <div className={`${index < 9 ? 'pl-7' : 'pl-5'} text-right`}>{mockPoint.name}</div>
                      </div>
                      <div className='flex flex-row justify-start pr-5 pb-1'>
                        <div className='text-xl pr-4'>{mockPoint.point}</div>
                        <img src={CoinImage} width='30px' height='30px' className='justify-end' />
                      </div>
                    </div>
                  }

                }).filter(mockReferral => mockReferral !== undefined)}
              </div>
            </>
            }
          </div>
        </div>
      </Page >
    </div >

  )
}

export default Ranking