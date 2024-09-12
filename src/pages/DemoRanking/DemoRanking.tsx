import React, { useEffect, useState } from 'react'
import CoinIcon from '../../assets/images/02_earn_coin.png'
import GolfinTitle from '../../assets/images/02_earn_logo.png'
import Countdown from '../../components/Countdown'
import { useUserContext } from '../../contexts/UserContext'
import WebApp from '@twa-dev/sdk'
import { Progress } from "@/components/ui/progress"
import UpperFlag from '../../assets/icons/UpperFlag.svg'
import LowerFlag from '../../assets/icons/LowerFlag.svg'
import { Page, TabbarLink } from 'konsta/react'

import { mockPointRankingData, mockReferralRankingData } from '@/constants'
import CoinImage from '../../assets/images/02_earn_coin.png'
import DemoTitle from '../../components/DemoTitleComponent/DemoTitle'

const DemoRanking = () => {
    const { account, setAccount } = useUserContext()
    const [dailyReward, setDailyReward] = useState(true)
    const [activeTab, setActiveTab] = useState('tab-1');
    const [isTabbarLabels, setIsTabbarLabels] = useState(true);
    return (
        <div className='w-[100%] h-[690px]'>
            <img src={GolfinTitle}
                width={150}
                height={150}
                className='mx-auto py-10 sm:py-10 md:py-15' />

            <DemoTitle titlename="RANKING" style={"absolute left-[-30px]"} />

            <div className='mt-[30px]'>
                <div className='mx-10'>

                    <div className='flex flex-row'>
                        <TabbarLink
                            active={activeTab === 'tab-1'}
                            onClick={() => setActiveTab('tab-1')}
                            label={isTabbarLabels && 'Referral'}
                            className={`${activeTab === 'tab-1' ? 'text-white font-[700] rounded-t-lg border-b-2 border-white' : 'text-white font-[700] border-b-2 border-gray-500'}`}
                        />
                        <TabbarLink
                            active={activeTab === 'tab-2'}
                            onClick={() => setActiveTab('tab-2')}
                            label={isTabbarLabels && 'Total Points'}
                            className={`${activeTab === 'tab-2' ? 'text-white font-[700] rounded-t-lg border-b-2 border-white' : 'text-white font-[700] border-b-2 border-gray-500'}`}
                        />
                    </div>

                    {activeTab === 'tab-1' && <>
                        <div className='h-[350px] pt-2 overflow-y-hidden '>
                            <div className={`text-white bg-[#ffffff33] flex flex-row leading-[89px] justify-between`}>
                                <div className='flex font-rubik font-[600] text-xl pr-10 pb-1 content-start place-content-start'>
                                    <div className='text-right mx-2'>100+</div>
                                    <div className='text-right'>Dev</div>
                                </div>
                                <div className='flex flex-row justify-start pr-5 pb-1'>
                                    <div className='text-xl pr-5'>30</div>
                                    <img src={CoinImage} width='30px' height='30px' className='justify-end' />
                                </div>
                            </div>
                            {mockReferralRankingData.map((mockReferral, index) => {
                                if (index < 10) {
                                    return <div key={mockReferral.name} className={`text-white bg-[#ffffff33] flex flex-row leading-[89px] justify-between`}>
                                        <div className='flex font-rubik font-[600] text-xl pr-10 pb-1 content-start place-content-start'>
                                            <div className='pl-5 text-right'>{mockReferral.rank}</div>
                                            <div className={`${index < 9 ? 'pl-7' : 'pl-5'} text-right`}>{mockReferral.name}</div>
                                        </div>
                                        <div className='flex flex-row justify-start pr-5 pb-1'>
                                            <div className='text-xl pr-5'>{mockReferral.referral}</div>
                                            <img src={CoinImage} width='30px' height='30px' className='justify-end' />
                                        </div>
                                    </div>
                                }

                            })}

                        </div>
                    </>
                    }
                    {activeTab === 'tab-2' && <>
                        <div className='h-[350px] pt-2 overflow-y-hidden '>
                            <div className={`text-white bg-[#ffffff33] flex flex-row leading-[89px] justify-between`}>
                                <div className='flex font-rubik font-[600] text-xl pr-10 pb-1 content-start place-content-start'>
                                    <div className='text-right mx-2'>100+</div>
                                    <div className='text-right'>Dev</div>
                                </div>
                                <div className='flex flex-row justify-start pr-5 pb-1'>
                                    <div className='text-xl pr-5'>100000</div>
                                    <img src={CoinImage} width='30px' height='30px' className='justify-end' />
                                </div>
                            </div>
                            {mockPointRankingData.map((mockPoint, index) => {
                                if (index < 10) {
                                    return <div key={mockPoint.name} className={`text-white bg-[#ffffff33] flex flex-row leading-[89px] justify-between`}>
                                        <div className='flex font-rubik font-[600] text-xl pr-10 pb-1 content-start place-content-start'>
                                            <div className='pl-5 text-right'>{mockPoint.rank}</div>
                                            <div className={`${index < 9 ? 'pl-7' : 'pl-5'} text-right`}>{mockPoint.name}</div>
                                        </div>
                                        <div className='flex flex-row justify-start pr-5 pb-1  font-rubik font-[600] text-xl content-start place-content-start'>
                                            <div className='text-xl pr-5'>{mockPoint.point}</div>
                                            <img src={CoinImage} width='30px' height='30px' className='justify-end' />
                                        </div>
                                    </div>
                                }

                            })}

                        </div>
                    </>
                    }
                </div>
            </div>


            {/* <DemoEarnComponent
                dailyReward={dailyReward}
                setDailyReward={setDailyReward}
                MINI_APP_APP={MINI_APP_APP}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isTabbarLabels={isTabbarLabels}
                account={account}
            /> */}
        </div>
    )
}


// const DemoEarnComponent = ({ dailyReward, setDailyReward, MINI_APP_APP, activeTab, setActiveTab, isTabbarLabels, account }) => {
//     return (
//         <>

//         </>
//     )
// }

export default DemoRanking