import { useEffect, useState } from 'react'
import { TabbarLink } from 'konsta/react'

import { mockPointRankingData, mockReferralRankingData } from '@/constants'
import CoinImage from '../../assets/images/02_earn_coin.png'
import { getUsers } from '@/apis/UserSevices'
import { useUserContext } from '@/contexts/UserContext'
import { useFriendContext } from '@/contexts/FriendContext'
import { usePointContext } from '@/contexts/PointContext'

interface ReferralRankingItem {
    rank: number,
    name: string;
    referral: number;
}
interface PointRankingItem {
    rank: number,
    name: string;
    point: number;
}
const DemoRanking = () => {
    const { account, setIsWaitingUser } = useUserContext()
    const { setIsWaitingFriend } = useFriendContext()
    const { setIsWaitingPoint } = usePointContext()
    const [dailyReward, setDailyReward] = useState(true)
    const [activeTab, setActiveTab] = useState('tab-1');
    const [isTabbarLabels, setIsTabbarLabels] = useState(true);

    const [referralRanking, setReferrakRanking] = useState<ReferralRankingItem[]>([])
    const [pointRanking, setPointRanking] = useState<PointRankingItem[]>([])

    const [myReferralRecord, setMyReferralRecord] = useState<ReferralRankingItem>()
    const [myPointRecord, setMyPointRecord] = useState<PointRankingItem>()

    useEffect(() => {
        const handleReferralRanking = async () => {
            // setIsWaitingUser(true)
            const existingUsers = await getUsers();
            if (existingUsers && existingUsers.length > 0) {
                const referralRanking: ReferralRankingItem[] = existingUsers.map((user, index) => {
                    const senderCount = user.user_details.sender?.length || 0; // Handle potential nullish value

                    return {
                        rank: index,
                        name: user.user_details.user_base.telegram_info.username,
                        referral: senderCount,
                    };
                });
                // setIsWaitingFriend(true)
                referralRanking.sort((a, b) => b.referral - a.referral);
                console.log('referralRanking');
                console.log(referralRanking);
                referralRanking.map((r, sortIndex) => {
                    if (r.name == account?.telegram_info.username) {
                        setMyReferralRecord({
                            rank: sortIndex,
                            name: account?.telegram_info.username,
                            referral: r.referral
                        })
                    }
                    return {
                        ...r, rank: sortIndex
                    }
                })
                setReferrakRanking(referralRanking);
            } else {
                console.log('No users found for referral ranking.'); // Informative logging
            }
        }

        const handlePointRanking = async () => {
            // setIsWaitingUser(true)
            const existingUsers = await getUsers();

            if (existingUsers && existingUsers.length > 0) {
                const pointRanking: PointRankingItem[] = existingUsers.map((user, index) => {
                    // Handle potential nullish values for user.user_details.point and user.user_details.point[0]
                    const pointValue = user.user_details.point?.[0]?.amount; // Use optional chaining and nullish coalescing for safety
                    if (pointValue !== undefined) { // Check if point value is actually defined
                        return {
                            rank: index,
                            name: user.user_details.user_base.telegram_info.username,
                            point: pointValue,
                        };
                    } else {
                        // Handle users with no points (optional)
                        return {
                            rank: index,
                            name: user.user_details.user_base.telegram_info.username,
                            point: 0, // Set default value for users with no points (optional)
                        };
                    }
                });
                // setIsWaitingPoint(true)
                pointRanking.sort((a, b) => b.point - a.point);
                console.log('pointRanking');
                console.log(pointRanking);
                pointRanking.map((p, sortIndex) => {
                    if (p.name == account?.telegram_info.username) {
                        setMyPointRecord({
                            rank: sortIndex,
                            name: account?.telegram_info.username,
                            point: p.point
                        })
                    }
                    return {
                        ...p, rank: sortIndex
                    }
                })
                setPointRanking(pointRanking);
            } else {
                console.log('No users found for point ranking.'); // Informative logging
            }
        };

        if (import.meta.env.VITE_MINI_APP_ENV !== 'test') {
            handleReferralRanking()
            handlePointRanking()
            // setIsWaitingUser(false)
            // setIsWaitingFriend(false)
            // setIsWaitingPoint(false)
        } else {
            // setIsWaitingUser(true)
            setReferrakRanking(mockReferralRankingData)
            setMyReferralRecord({ name: 'dev1', rank: 111, referral: 1 })
            // setIsWaitingFriend(true)
            setPointRanking(mockPointRankingData)
            setMyPointRecord({ name: 'dev1', rank: 1, point: 100 })
            // setIsWaitingPoint(true)
            // setIsWaitingUser(false)
            // setIsWaitingFriend(false)
            // setIsWaitingPoint(false)
        }

    }, [])
    return (
        <div className='w-[100%] h-[690px]'>
            <div className='flex justify-center'>
                <div className='mx-10 mt-5 sm:mt-[5px] md:mt-[12px] lg:mt-[15px]'>
                    <div className='flex'>
                        <TabbarLink
                            active={activeTab === 'tab-1'}
                            onClick={() => setActiveTab('tab-1')}
                            label={isTabbarLabels && 'Referral'}
                            style={{}}
                            className={`${activeTab === 'tab-1' ?
                                'text-white font-[700] rounded-t-lg border-b-2 border-white' :
                                'text-white font-[700] border-b-2 border-gray-500'}`}
                        />
                        <TabbarLink
                            active={activeTab === 'tab-2'}
                            onClick={() => setActiveTab('tab-2')}
                            label={isTabbarLabels && 'Total Points'}
                            className={`${activeTab === 'tab-2' ? 'text-white font-[700] rounded-t-lg border-b-2 border-white' : 'text-white font-[700] border-b-2 border-gray-500'}`}
                        />
                    </div>

                    {activeTab === 'tab-1' && <>
                        <div className='h-[300px] w-[343px] overflow-y-scroll sm:h-[400px] md:h-[460px] pt-2'>
                            <div className={`text-white bg-[#ffffff33] flex flex-row leading-[89px] justify-between border-4 border-[#8cc73e]`}>
                                <div className='flex font-rubik font-[400] text-xl pr-10 py-1 content-start place-content-start'>
                                    <div className='text-center mx-2 font-[12px]'>{myReferralRecord !== undefined && myReferralRecord.rank > 100 ? '100+' : myReferralRecord?.rank}</div>
                                    <div className='text-center content-center justify-center font-[12px]'>{myReferralRecord !== undefined && myReferralRecord.name}</div>
                                </div>
                                <div className='flex flex-row justify-start pr-5 py-1'>
                                    <div className='text-xl pr-5 font-[12px]'>{myReferralRecord !== undefined && myReferralRecord.referral}</div>
                                    <img src={CoinImage} width='30px' height='30px' className='justify-end ml-1' />
                                </div>
                            </div>
                            <div className='sm:h-[250px] md:h-[400px] overflow-y-scroll  md:overflow-hidden'>

                                {referralRanking.map((referralRank, index) => {
                                    if (index < 10) {
                                        return <div key={referralRank.name} className={`text-white bg-[#ffffff33] flex flex-row leading-[89px] justify-between`}>
                                            <div className='flex font-rubik font-[400] text-xl pr-10 pb-1 content-start place-content-start'>
                                                <div className='pl-5 text-right font-[12px]'>{referralRank.rank}</div>
                                                <div className={`${index < 9 ? 'pl-7' : 'pl-5'} text-right font-[12px]`}>{referralRank.name}</div>
                                            </div>
                                            <div className='flex flex-row justify-start pr-5 pb-1'>
                                                <div className='text-xl pr-5 font-[12px]'>{referralRank.referral}</div>
                                                <img src={CoinImage} width='30px' height='30px' className='justify-end' />
                                            </div>
                                        </div>
                                    }

                                })}
                            </div>
                        </div>
                    </>
                    }
                    {activeTab === 'tab-2' && <>
                        <div className='h-[300px] w-[343px] overflow-y-scroll sm:h-[400px] md:h-[460px] pt-2'>
                            <div className={`text-white bg-[#ffffff33] flex flex-row leading-[89px] justify-between border-4 border-[#8cc73e]`}>
                                <div className='flex font-rubik font-[400] text-xl pr-10 py-1 content-start place-content-start'>
                                    <div className='text-center mx-2 font-[12px]'>{myPointRecord !== undefined && myPointRecord.rank > 100 ? '100+' : myPointRecord?.rank}</div> {/* FIXME */}
                                    <div className='font-[12px] text-center content-center justify-center'>{myPointRecord !== undefined && myPointRecord.name}</div>  {/* FIXME */}
                                </div>
                                <div className='flex flex-row justify-start pr-5 py-1'>
                                    <div className='text-xl pr-5 text-center content-center justify-center font-[12px]'>{myPointRecord !== undefined && myPointRecord.point}</div>  {/* FIXME */}
                                    <img src={CoinImage} width='30px' height='30px' className='justify-end' />
                                </div>
                            </div>

                            <div className='sm:h-[250px] md:h-[400px] overflow-y-scroll md:overflow-hidden'>

                                {pointRanking.map((pointRank, index) => {
                                    if (index < 10) {
                                        return <div key={pointRank.name} className={`text-white bg-[#ffffff33] flex flex-row leading-[89px] justify-between`}>
                                            <div className='flex font-rubik font-[400] text-xl pr-10 pb-1 content-start place-content-start'>
                                                <div className='pl-5 text-right font-[12px]'>{pointRank.rank}</div>
                                                <div className={`${index < 9 ? 'pl-7' : 'pl-5'} text-right font-[12px]`}>{pointRank.name}</div>
                                            </div>
                                            <div className='flex flex-row justify-start pr-5 pb-1 font-rubik font-[400] text-xl content-start place-content-start'>
                                                <div className='text-xl pr-5 font-[12px]'>{pointRank.point}</div>
                                                <img src={CoinImage} width='30px' height='30px' className='justify-end' />
                                            </div>
                                        </div>
                                    }

                                })}
                            </div>

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