import { TabbarLink } from 'konsta/react'
import { useCallback, useEffect, useState } from 'react'

import { useUserContext } from '@/contexts/UserContext'
import { usePointContext } from '@/contexts/PointContext'
import { useFriendContext } from '@/contexts/FriendContext'

import { getUserFriendRanking } from '@/apis/UserSevices'
import { getPointRankingList } from '@/apis/PointServices'

import Loader from '@/components/LoaderComponent/Loader'
import CoinImage from '../../assets/images/02_earn_coin_new.png'

import { mockPointRankingData, mockReferralRankingData } from '@/constants'
import { PointRankingItemType, RankingTabPropsType, ReferralRankingItemType } from '@/type'


const DemoRanking = () => {
    const { account } = useUserContext()
    const { setIsWaitingFriend } = useFriendContext()
    const { setIsWaitingPoint } = usePointContext()
    const [activeTab, setActiveTab] = useState('tab-1');

    const [referralRanking, setReferrakRanking] = useState<ReferralRankingItemType[]>([])
    const [pointRanking, setPointRanking] = useState<PointRankingItemType[]>([])

    const [myReferralRecord, setMyReferralRecord] = useState<ReferralRankingItemType>()
    const [myPointRecord, setMyPointRecord] = useState<PointRankingItemType>()
    const [isLoadingReferral, setIsLoadingReferral] = useState<boolean>(false);
    const [isLoadingPoint, setIsLoadingPoint] = useState<boolean>(false);

    const handleReferralRanking = useCallback(async () => {
        try {
            setIsLoadingReferral(true);
            if (import.meta.env.VITE_MINI_APP_ENV === 'test') {
                setReferrakRanking(mockReferralRankingData)
                setMyReferralRecord({ name: 'nextInnovationDev25', rank: 1, referral: 5999999999 })
            } else {
                if (account?.id) {
                    const userFriendRanking = await getUserFriendRanking(account?.id)
                    console.log(userFriendRanking);
                    if (userFriendRanking && userFriendRanking.top_10.length > 0) {
                        const referralRanking: ReferralRankingItemType[] = userFriendRanking.top_10.map((ranking) => {
                            return {
                                rank: ranking.rank,
                                name: ranking.username == "" ? ranking.telegram_id : ranking.username,
                                referral: ranking.sender_count,
                            };
                        })
                        const myReferralRecord = userFriendRanking.sender_info
                        if (myReferralRecord) {
                            setMyReferralRecord({
                                rank: myReferralRecord.rank,
                                name: myReferralRecord.username == "" ? myReferralRecord.telegram_id : myReferralRecord.username,
                                referral: myReferralRecord.sender_count,
                            })
                        }
                        setReferrakRanking(referralRanking);
                    }
                }
            }

        } catch (error) {
            console.error('Error handling referral reward:', error);

        } finally {
            console.log('finally set false isLoadingRanking on referral ranking');
            setIsLoadingReferral(false);
        }

    }, [setIsWaitingFriend, setReferrakRanking, setMyReferralRecord, account])



    const handlePointRanking = useCallback(async () => {
        try {
            setIsLoadingPoint(true);
            if (import.meta.env.VITE_MINI_APP_ENV === 'test') {
                setPointRanking(mockPointRankingData as PointRankingItemType[]);
                setMyPointRecord({ name: 'nextInnovationDev25', rank: 1000, point: 250 });
            } else {
                if (account?.id) {
                    /*           const myPointRankingFromServer = await getPointRanking({ user_id: account?.id }); */
                    /*        console.log('my ranking from server: ', myPointRankingFromServer); */
                    const userPointRanking = await getPointRankingList(account?.id); // get the ranking list from server for all users and return the rank position and the total points
                    console.log(userPointRanking);

                    if (userPointRanking && userPointRanking.top_10.length > 0) {
                        const pointRanking: PointRankingItemType[] = userPointRanking.top_10.map((ranking) => {
                            return {
                                rank: ranking.rank,
                                name: ranking.username == "" ? ranking.telegram_id : ranking.username,
                                point: ranking.total_points
                            }
                        })
                        const myPointRanking = userPointRanking.user_info
                        if (myPointRanking) {
                            setMyPointRecord({
                                rank: myPointRanking.rank,
                                name: myPointRanking.username == "" ? myPointRanking.telegram_id : myPointRanking.username,
                                point: myPointRanking.total_points,
                            });
                        }
                        setPointRanking(pointRanking);
                    }
                }
            }
        } catch (error) {
            console.error('Error handling referral reward:', error);
        } finally {
            console.log('finally set false isLoadingRanking on point ranking');
            setIsLoadingPoint(false);
        }
    }, [setIsWaitingPoint, setMyPointRecord, setPointRanking, account])



    useEffect(() => {
        handleReferralRanking()
    }, [handleReferralRanking])

    useEffect(() => {
        handlePointRanking()
    }, [handlePointRanking])

    const rankingNameDisplayer = (name: string) => {
        if (name.length > 10) {
            return name.substring(0, 7) + '...' + name.substring(name.length - 3)
        }
        return name
    }

    return (
        <div>
            {
                isLoadingReferral == true || isLoadingPoint == true ?
                    <Loader isLoading={isLoadingReferral || isLoadingPoint} wrapperHeight='690px' wrapperWidth='393px' type='ranking' /> :
                    <div className='w-[100%] h-[690px]'>
                        <div className='flex justify-center'>
                            <div className='mx-10 mt-5 sm:mt-[5px] md:mt-[12px] lg:mt-[15px]'>
                                <div className='flex'>
                                    <TabbarLink
                                        active={activeTab === 'tab-1'}
                                        onClick={() => setActiveTab('tab-1')}
                                        label='Referral'
                                        style={{}}
                                        className={`${activeTab === 'tab-1' ?
                                            'text-[rgba(255,255,255,0.4)] font-[700] rounxded-t-lg border-b-2 border-white' :
                                            'text-[rgba(255,255,255,0.4)] border-b-2 border-gray-500'}`} />
                                    <TabbarLink
                                        active={activeTab === 'tab-2'}
                                        onClick={() => setActiveTab('tab-2')}
                                        label='Total Points'
                                        className={`${activeTab === 'tab-2' ?
                                            'text-[rgba(255,255,255,0.4)] font-[700] rounded-t-lg border-b-2 border-white' :
                                            'text-[rgba(255,255,255,0.4)] font-[700] border-b-2 border-gray-500'}`} />
                                </div>
                                {activeTab === 'tab-1' &&
                                    <RankingTab type='referral' myRecord={myReferralRecord} ranking={referralRanking} />
                                }

                                {activeTab === 'tab-2' && <>
                                    <div className='h-[300px] w-[343px] overflow-y-scroll sm:h-[400px] md:h-[460px] pt-3'>
                                        <div className={`text-white bg-[#ffffff33] flex items-center justify-between border-4 rounded-md border-[#8ADD5D] p-1`}>
                                            <div className='flex items-center font-rubik font-[400] text-xl'>
                                                <div className='text-center mx-4 text-[17px]'>{myPointRecord !== undefined && myPointRecord.rank > 100 ? '100+' : (myPointRecord?.rank !== undefined && myPointRecord.rank)}</div>
                                                <div className='text-center text-[17px]'>{myPointRecord !== undefined && rankingNameDisplayer(myPointRecord.name)}</div>
                                            </div>
                                            <div className='flex items-center'>
                                                <img src={CoinImage} width='20' height='20' className='mr-2' alt="Coin" />
                                                <div className='text-xl text-[17px]'>{myPointRecord !== undefined && myPointRecord.point}</div>
                                            </div>
                                        </div>

                                        <div className='sm:h-[250px] md:h-[400px] overflow-y-scroll md:overflow-hidden bg-[#ffffff33]'>
                                            {pointRanking.map((pointRank, index) => {
                                                if (index < 10) {
                                                    return (
                                                        <div key={pointRank.name} className='text-white flex items-center justify-between p-1 pr-10'>
                                                            <div className='flex items-center space-x-3 flex-1'>
                                                                <div className='w-6 text-right text-[17px]'>{index + 1}</div>
                                                                <div className='text-[17px] truncate'>{rankingNameDisplayer(pointRank.name)}</div>
                                                            </div>
                                                            <div className='flex items-center space-x-2 flex-shrink-0'>
                                                                <img src={CoinImage} width='20' height='20' alt="Coin" />
                                                                <div className='text-[17px] w-12 text-left'>{pointRank.point}</div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            })}
                                        </div>
                                    </div>
                                </>}
                            </div>
                        </div>
                    </div>

            }</div>

    )
}

const RankingTab = ({ type, myRecord, ranking }: RankingTabPropsType) => {
    const rankingNameDisplayer = (name: string) => {
        if (name.length > 10) {
            return name.substring(0, 7) + '...' + name.substring(name.length - 3)
        }
        return name
    }
    return (
        <div className='h-[300px] w-[343px] overflow-y-scroll sm:h-[400px] md:h-[460px] pt-3'>
            <div className={`text-white bg-[#ffffff33] flex items-center justify-between border-4 rounded-md border-[#8ADD5D] p-1`}>
                <div className='flex items-center font-rubik font-[400] text-xl'>
                    <div className='text-center mx-4 text-[17px]'>{myRecord !== undefined && myRecord.rank > 100 ? '100+' : (myRecord?.rank !== undefined && myRecord.rank)}</div>
                    <div className='text-center text-[17px]'>{myRecord !== undefined && rankingNameDisplayer(myRecord.name)}</div>
                </div>
                <div className='flex items-center'>
                    <img src={CoinImage} width='20' height='20' className='mr-2' alt="Coin" />
                    <div className='text-xl text-[17px]'>{myRecord !== undefined && (type === 'referral' ? (myRecord as ReferralRankingItemType).referral : (myRecord as PointRankingItemType).point)}</div>
                </div>
            </div>

            <div className='sm:h-[250px] md:h-[400px] overflow-y-scroll md:overflow-hidden bg-[#ffffff33]'>
                {ranking.map((rank, index) => {
                    if (index < 10) {
                        return (
                            <div key={rank.name} className='text-white flex items-center justify-between p-1 pr-10'>
                                <div className='flex items-center space-x-3 flex-1'>
                                    <div className='w-6 text-right text-[17px]'>{index + 1}</div>
                                    <div className='text-[17px] truncate'>{rankingNameDisplayer(rank.name)}</div>
                                </div>
                                <div className='flex items-center space-x-2 flex-shrink-0'>
                                    <img src={CoinImage} width='20' height='20' alt="Coin" />
                                    <div className='text-[17px] w-12 text-left'>{type === 'referral' ? (rank as ReferralRankingItemType).referral : (rank as PointRankingItemType).point}</div>
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    )
}

export default DemoRanking