import { useCallback, useEffect, useState } from 'react'
import { TabbarLink } from 'konsta/react'
import { mockPointRankingData, mockReferralRankingData } from '@/constants'
import CoinImage from '../../assets/images/02_earn_coin.png'
import { getUser, getUserFriendRanking, getUsers } from '@/apis/UserSevices'
import { useUserContext } from '@/contexts/UserContext'
import { useFriendContext } from '@/contexts/FriendContext'
import { getPointRanking, getPointRankingList } from '@/apis/PointServices'
import { ClipLoader } from 'react-spinners'
import ellipseImage1 from '../../assets/images/ellipse-171.png'
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
    const { account } = useUserContext()
    const { setIsWaitingFriend } = useFriendContext()
    const { setIsWaitingPoint } = usePointContext()
    const [activeTab, setActiveTab] = useState('tab-1');

    const [referralRanking, setReferrakRanking] = useState<ReferralRankingItem[]>([])
    const [pointRanking, setPointRanking] = useState<any[]>([])

    const [myReferralRecord, setMyReferralRecord] = useState<ReferralRankingItem>()
    const [myPointRecord, setMyPointRecord] = useState<PointRankingItem>()
    /*     const [isLoadingRanking, setIsLoadingRanking] = useState<boolean>(false)
     */
    const [isLoadingReferral, setIsLoadingReferral] = useState<boolean>(false);
    const [isLoadingPoint, setIsLoadingPoint] = useState<boolean>(false);
    // FIXME
    // const myReferralRankingFromServer = await getReferralRanking({
    //     access_token: '',
    //     user_id: account?.id
    // })
    // console.log('my referral ranking from server: ', myReferralRankingFromServer);
    // if (myReferralRankingFromServer && account?.telegram_info.username) {
    //     setMyReferralRecord({
    //         rank: myReferralRankingFromServer.rank,
    //         name: account?.telegram_info.username,
    //         referral: myReferralRankingFromServer?.referral_count
    //     })
    // }



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
                    /*                     const existingUsers = await getUsers(0, 100); // FIXME */
                    /*  console.log(existingUsers); */

                    if (userFriendRanking && userFriendRanking.top_10.length > 0) {
                        const referralRanking: ReferralRankingItem[] = userFriendRanking.top_10.map((ranking, /* index */) => {
                            /*     const senderCount = user.user_details.sender?.length || 0; */ // Handle potential nullish value
                            return {
                                rank: ranking.rank,
                                name: ranking.username == "" ? ranking.telegram_id : ranking.username,
                                referral: ranking.sender_count,
                            };
                        })
                        /*                             .sort((a, b) => b.referral - a.referral)
                                                    .map((item, index) => ({ ...item, rank: index + 1 })); */

                        /*                         const myReferralRecord = referralRanking.find(r => r.name == account?.telegram_info.username || r.name == account?.telegram_info.telegram_id)
                         
                        */
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
            if (import.meta.env.VITE_MINI_APP_ENV == 'test') {
                setPointRanking(mockPointRankingData)
                setMyPointRecord({ name: 'nextInnovationDev25', rank: 1000, point: 250 })
            } else {
                const myPointRankingFromServer = await getPointRanking({
                    access_token: '',
                    user_id: account?.id
                })
                console.log('my ranking from server: ', myPointRankingFromServer);
                const existingUsers = await getPointRankingList(); // get the ranking list from server for all users and return the rank position and the total points
                const pointRanking = existingUsers && await Promise.all(existingUsers.map(async (user) => {
                    const dbUser = await getUser({
                        access_token: '',
                        id: user.user_id.toString()
                    })
                    // Handle potential nullish values for user.user_details.point and user.user_details.point[0]
                    return {
                        rank: user.rank,
                        name: dbUser?.user_details.user_base.telegram_info.username == "" ? dbUser?.user_details.user_base.telegram_info.telegram_id : dbUser?.user_details.user_base.telegram_info.username,
                        point: user?.total_points,
                    }
                }))

                if (myPointRankingFromServer && pointRanking && account?.id) {
                    setMyPointRecord({
                        rank: myPointRankingFromServer.rank,
                        point: myPointRankingFromServer.total_points,
                        name: account?.telegram_info?.username || account?.telegram_info?.telegram_id || '',
                    });
                    setPointRanking(pointRanking);
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


    console.log('myReferralRecord');
    console.log(myReferralRecord);

    console.log('referranRanking');
    console.log(referralRanking);


    console.log('myPointRecord');
    console.log(myPointRecord);

    console.log('pointRanking');
    console.log(pointRanking);

    /*  useEffect(() => { */
    /*      setIsWaitingFriend(isLoadingRanking); */
    /*      setIsWaitingPoint(isLoadingRanking); */
    /*  }, [isLoadingRanking, setIsWaitingFriend, setIsWaitingPoint]) */


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
                    <div>
                        <div className="bg-[#00161c] justify-center w-full">
                            <div className="bg-[#00161c] overflow-hidden w-[393px] h-[690px] relative">
                                <ClipLoader
                                    color='gray'
                                    loading={isLoadingReferral || isLoadingPoint}
                                    size={150}
                                    className='opacity-80 absolute top-[12%] left-[30%] translate-x-[-50%] translate-y-[-50%]'
                                >
                                </ClipLoader>
                                <img className="absolute left-[50%] w-[100%] translate-x-[-50%]" alt="Ellipse171" src={ellipseImage1} />
                            </div>
                        </div>
                    </div> :
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
                                {activeTab === 'tab-1' && <>
                                    <div className='h-[300px] w-[343px] overflow-y-scroll sm:h-[400px] md:h-[460px] pt-3'>
                                        <div className={`text-white bg-[#ffffff33] flex items-center justify-between border-4 rounded-md border-[#8ADD5D] p-1`}>
                                            <div className='flex items-center font-rubik font-[400] text-xl'>
                                                <div className='text-center mx-4 text-[17px]'>{myReferralRecord !== undefined && myReferralRecord.rank > 100 ? '100+' : (myReferralRecord?.rank !== undefined && myReferralRecord.rank)}</div>
                                                <div className='text-center text-[17px]'>{myReferralRecord !== undefined && rankingNameDisplayer(myReferralRecord.name)}</div>
                                            </div>
                                            <div className='flex items-center'>
                                                <img src={CoinImage} width='20' height='20' className='mr-2' alt="Coin" />
                                                <div className='text-xl text-[17px]'>{myReferralRecord !== undefined && myReferralRecord.referral}</div>
                                            </div>
                                        </div>

                                        <div className='sm:h-[250px] md:h-[400px] overflow-y-scroll md:overflow-hidden bg-[#ffffff33]'>
                                            {referralRanking.map((referralRank, index) => {
                                                if (index < 10) {
                                                    return (
                                                        <div key={referralRank.name} className='text-white flex items-center justify-between p-1 pr-10'>
                                                            <div className='flex items-center space-x-3 flex-1'>
                                                                <div className='w-6 text-right text-[17px]'>{index + 1}</div>
                                                                <div className='text-[17px] truncate'>{rankingNameDisplayer(referralRank.name)}</div>
                                                            </div>
                                                            <div className='flex items-center space-x-2 flex-shrink-0'>
                                                                <img src={CoinImage} width='20' height='20' alt="Coin" />
                                                                <div className='text-[17px] w-12 text-left'>{referralRank.referral}</div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            })}
                                        </div>
                                    </div>
                                </>}

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

export default DemoRanking