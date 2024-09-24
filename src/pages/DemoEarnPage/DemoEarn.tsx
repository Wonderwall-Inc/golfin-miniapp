import { useEffect, useState } from 'react'
import CoinIcon from '../../assets/images/02_earn_coin.png'
import Countdown from '../../components/Countdown'
import { useUserContext } from '../../contexts/UserContext'
import WebApp from '@twa-dev/sdk'
import { Progress } from "@/components/ui/progress"
import { usePointContext } from '@/contexts/PointContext'
import { getPoint, updatePoint } from '@/apis/PointServices'
import { dailyCheckInPointReward, friendReferralPointReward, tenFriendsReferralPointReward, weeklyCheckInPointReward } from '@/constants'
import { useActivityContext } from '@/contexts/ActivityContext'
import { getActivity, updateActivity } from '@/apis/ActivityServices'
import { useFriendContext } from '@/contexts/FriendContext'
import { isYesterday, sgTimeNow } from '@/utils'
import { format } from 'date-fns'
import { useSgTimeNowString } from '@/hooks/useSgTimeNowString'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc);
dayjs.extend(timezone);

const MINI_APP_BOT_NAME = import.meta.env.VITE_MINI_APP_BOT_NAME
const MINI_APP_NAME = import.meta.env.VITE_MINI_APP_NAME
const MINI_APP_APP = `https://t.me/${MINI_APP_BOT_NAME}/${MINI_APP_NAME}/start?startapp=${WebApp.initDataUnsafe.user?.id}`

const DemoEarn = () => {
    const { account, setAccount } = useUserContext()
    const { point, setPoint, isWaitingPoint, setIsWaitingPoint } = usePointContext()
    const { activity, setActivity, isWaitingActivity, setIsWaitingActivity } = useActivityContext()
    const { friend, friendTrigger,/*  notYetClaimRewardReferral, setNotYetClaimRewardReferral */ } = useFriendContext()

    const [dailyReward, setDailyReward] = useState(true)
    const [timeLeft, setTimeLeft] = useState("")

    let [isHomeLoading, setIsHomeLoading] = useState(false)

    const [weeklyCount, setWeeklyCount] = useState(0)
    const [referralCount, setReferralCount] = useState(0)

    const [canClaim, setCanClaim] = useState(false)

    console.log(weeklyCount);
    console.dir(account);
    console.log(point);
    console.log(friend);

    useEffect(() => {
        timeLeft == '' ? setIsHomeLoading(true) : setIsHomeLoading(false)
    }, [timeLeft])

    useEffect(() => {
        const todayDay = new Date()
        const todayYY = todayDay.getFullYear()
        const todayMM = todayDay.getUTCMonth() + 1
        const preTodayMM = todayMM < 10 ? `0${todayMM}` : todayMM
        const todayDD = todayDay.getDate() + 1
        const todayYYMMDD = `${todayYY}-${preTodayMM}-${todayDD}T00:00:00`
        setTimeLeft(todayYYMMDD)
    }, [new Date()])

    useEffect(() => {
        const handleWeeklyReward = async () => {
            if (!activity?.login_streak || activity?.login_streak !== 7) return; // Early exit if not a streak of 7

            setIsWaitingPoint(true);
            setIsWaitingActivity(true);

            try {
                // Fetch existing point and update if necessary
                const existingPoint = await getPoint({ access_token: '', user_id: account?.id });
                if (existingPoint) {
                    const updatePointPayload = {
                        id: existingPoint?.point_base.point.id,
                        type: 'add', // REVIEW: add / minus point
                        access_token: '',
                        point_payload: {
                            login_amount: 15, // extra_profit_per_hour: optional
                            referral_amount: existingPoint.point_base.point.referral_amount,
                        },
                    };
                    const updatedPoint = await updatePoint(updatePointPayload);
                    if (updatedPoint && updatedPoint?.point_base.user_id) {
                        setPoint({
                            id: updatedPoint?.point_base.user_id,
                            login_amount: updatedPoint?.point_base.point.login_amount,
                            referral_amount: updatedPoint?.point_base.point.referral_amount,
                            extra_profit_per_hour: updatedPoint?.point_base.point.extra_profit_per_hour,
                            created_at: updatedPoint?.point_base.point.created_at,
                            updated_at: updatedPoint?.point_base.point.updated_at,
                            custom_logs: updatedPoint?.point_base.point.custom_logs
                        })
                    }
                }
                // Update activity data (assuming login streak reset)
                const updateActivityPayload = {
                    id: activity?.id,
                    access_token: '',
                    user_id: account?.id,
                    activity: {
                        logged_in: true, // Update logged_in state
                        login_streak: 1, // Reset login streak
                        total_logins: activity?.total_logins + 1, // Increment total logins
                        last_action_time: new Date().toISOString(),
                        last_login_time: new Date().toISOString(), // Update last login time
                    },
                };
                const updatedActivity = await updateActivity(updateActivityPayload);
                setActivity(updatedActivity?.activity);
            } catch (error) {
                console.error('Error handling weekly reward:', error);
            } finally {
                setIsWaitingPoint(false);
                setIsWaitingActivity(false);
            }
        };

        handleWeeklyReward(); // Call the function on component mount
    }, [activity?.login_streak]); // Only re-run when login_streak changes

    useEffect(() => {
        const handleReferralReward = async () => {
            console.log(friendTrigger);
            console.log("*****************");


            if (!friendTrigger || friendTrigger % 10 !== 0) return; // Early exit if not a multiple of 10 or already claimed


            setIsWaitingPoint(true);

            try {
                if (canClaim) {
                    console.log('canclaim:  ', canClaim);

                    if (import.meta.env.VITE_MINI_APP_ENV == 'test') {
                        if (point) {
                            setPoint({
                                id: point?.id,
                                login_amount: 0,
                                referral_amount: 3000,
                                extra_profit_per_hour: point.extra_profit_per_hour,
                                created_at: point?.created_at,
                                updated_at: point?.updated_at,
                                custom_logs: {
                                    action: `claim${friendTrigger / 10}`,
                                    date: new Date().toISOString()
                                }
                            })
                            console.log(point);
                        }
                    }
                    console.log('on try');

                    // Fetch existing point and update if necessary
                    const existingPoint = await getPoint({ access_token: '', user_id: account?.id });

                    if (existingPoint) {
                        const dbPointAction = existingPoint?.point_base?.point?.custom_logs?.action.split('claim')[1]
                        if (dbPointAction) {
                            if (friendTrigger / 10 != parseInt(dbPointAction)) {
                                const updatePointPayload = {
                                    id: existingPoint?.point_base.point.id,
                                    type: 'add', // REVIEW: add / minus point
                                    access_token: '',
                                    point_payload: {
                                        login_amount: existingPoint.point_base.point.login_amount, // extra_profit_per_hour: optional
                                        referral_amount: 3000, // extra_profit_per_hour: optional
                                    },
                                };
                                const updatedPoint = await updatePoint(updatePointPayload);
                                if (updatedPoint && updatedPoint?.point_base.user_id) {
                                    setPoint({
                                        id: updatedPoint?.point_base.user_id,
                                        login_amount: updatedPoint?.point_base.point.login_amount,
                                        referral_amount: updatedPoint?.point_base.point.referral_amount,
                                        extra_profit_per_hour: updatedPoint?.point_base.point.extra_profit_per_hour,
                                        created_at: updatedPoint?.point_base.point.created_at,
                                        updated_at: updatedPoint?.point_base.point.updated_at,
                                        custom_logs: {
                                            action: `claim${friendTrigger / 10}`,
                                            date: new Date().toISOString()
                                        }
                                    })
                                }
                            }
                        }
                    }
                }



                // // Update friend data (assuming marking claimed reward) // FIXME
                // const updatedFriend = friend?.sender?.map(async (s: any) => {
                //     return await updateFriend({
                //         id: s.id,
                //         access_token: '',
                //         friend_payload: {
                //             status: s.status, // Update status if necessary
                //             custom_logs: {
                //                 action: 'claim reward',
                //                 date: new Date().toISOString(),
                //             },
                //         },
                //     })
                // })


                // if (updatedFriend !== undefined) {

                //     let count = 0
                //     // FIXME:
                //     updatedFriend.forEach(s => {
                //         if (!s.custom_logs?.action) {
                //             count++
                //         }
                //     })
                //     setNotYetClaimRewardReferral(count)
                // }

                // const results = await Promise.all(promises?.map((p) => p()) ?? []);
                // Update local count for referral rewards claimed (optional)
                // setNotYetClaimRewardReferral(referralCount); // Update claimed count (optional)
            } catch (error) {
                console.error('Error handling referral reward:', error);
            } finally {
                setIsWaitingPoint(false);
            }
        };

        handleReferralReward(); // Call the function on component mount
    }, [friendTrigger])

    // useEffect(() => {
    //     const weeklyRewardHandler = async () => {
    //         setIsWaitingPoint(true)
    //         const existingPoint = await getPoint({
    //             access_token: '',
    //             user_id: account?.id,
    //         })
    //         if (existingPoint) {
    //             const updatePointPayload = {
    //                 id: existingPoint?.point_base.point.id,
    //                 type: 'add', // REVIEW: add / minus point
    //                 access_token: '',
    //                 point_payload: {
    //                     amount: 15, // extra_profit_per_hour: optional
    //                 }
    //             }
    //             const dbPoint = await updatePoint(updatePointPayload)
    //             if (dbPoint && dbPoint?.point_base.user_id) {
    //                 setPoint({
    //                     id: dbPoint?.point_base.user_id,
    //                     amount: dbPoint?.point_base.point.amount,
    //                     extra_profit_per_hour: dbPoint?.point_base.point.extra_profit_per_hour,
    //                     created_at: dbPoint?.point_base.point.created_at,
    //                     updated_at: dbPoint?.point_base.point.updated_at,
    //                     custom_logs: dbPoint?.point_base.point.custom_logs
    //                 })
    //             }
    //         }
    //         setIsWaitingActivity(true)
    //         const existingActivity = await getActivity({
    //             access_token: '',
    //             user_id: account?.id,
    //         })
    //         if (existingActivity) {
    //             const updateActivityPayload = {
    //                 id: existingActivity?.activity.id,
    //                 access_token: '',
    //                 user_id: existingActivity.user_id,
    //                 activity: {
    //                     logged_in: existingActivity.activity.logged_in,
    //                     login_streak: 0,
    //                     total_logins: existingActivity.activity.total_logins,
    //                     last_action_time: new Date().toISOString(),
    //                     last_login_time: existingActivity.activity.last_login_time,
    //                 }
    //             }
    //             const dbActivity = await updateActivity(updateActivityPayload)
    //             if (dbActivity) {
    //                 setActivity({
    //                     id: dbActivity.activity.id,
    //                     logged_in: dbActivity.activity.logged_in,
    //                     login_streak: dbActivity.activity.login_streak,
    //                     total_logins: dbActivity.activity.total_logins,
    //                     last_action_time: dbActivity.activity.last_action_time,
    //                     last_login_time: dbActivity.activity.last_login_time,
    //                     created_at: dbActivity.activity.created_at,
    //                     updated_at: dbActivity.activity.updated_at,
    //                     custom_logs: dbActivity.activity.custom_logs,
    //                 })
    //             }
    //         }
    //     }
    //     if (activity?.login_streak && activity?.login_streak == 7) {
    //         // update point + 15
    //         // clean up activity streak

    //         weeklyRewardHandler()
    //         setIsWaitingPoint(false)
    //         setIsWaitingActivity(false)
    //     }
    // }, [activity?.login_streak])

    // useEffect(() => {
    //     const referralRewardHandler = async () => {
    //         setIsWaitingPoint(true)
    //         const existingPoint = await getPoint({
    //             access_token: '',
    //             user_id: account?.id,
    //         })
    //         if (existingPoint) {
    //             const updatePointPayload = {
    //                 id: existingPoint?.point_base.point.id,
    //                 type: 'add', // REVIEW: add / minus point
    //                 access_token: '',
    //                 point_payload: {
    //                     amount: 3000, // extra_profit_per_hour: optional
    //                 }
    //             }
    //             const dbPoint = await updatePoint(updatePointPayload)
    //             if (dbPoint && dbPoint?.point_base.user_id) {
    //                 setPoint({
    //                     id: dbPoint?.point_base.user_id,
    //                     amount: dbPoint?.point_base.point.amount,
    //                     extra_profit_per_hour: dbPoint?.point_base.point.extra_profit_per_hour,
    //                     created_at: dbPoint?.point_base.point.created_at,
    //                     updated_at: dbPoint?.point_base.point.updated_at,
    //                     custom_logs: dbPoint?.point_base.point.custom_logs
    //                 })
    //             }
    //         }

    //         const dbFriend = await Promise.all(friend?.sender?.map(async (s) => {
    //             await updateFriend({
    //                 id: s.id,
    //                 access_token: '',
    //                 friend_payload: {
    //                     status: s.status,
    //                     custom_logs: {
    //                         'action': 'claim reward',
    //                         'date': new Date().toISOString()
    //                     }
    //                 }
    //             })
    //         }))
    //     }
    //     if (notYetClaimRewardReferral && notYetClaimRewardReferral % 10 == 0) {
    //         //update point + 3000
    //         referralRewardHandler()
    //         setIsWaitingPoint(false)
    //     }
    // }, [friendTrigger])

    useEffect(() => {
        const checkActionOnPoint = () => {
            if (point) {
                if (point?.custom_logs?.action) {
                    const dbPointAction = point.custom_logs?.action.split('claim')[1]
                    if (dbPointAction) {
                        if (referralCount / 10 != parseInt(dbPointAction))
                            return true
                    }
                } else {
                    return true
                }
            }
        }

        if (checkActionOnPoint() == true) {
            setCanClaim(true)
        }
    }, [])

    // window.alert(canClaim)


    return (
        <div className='w-[100%] h-[690px]'>
            <DemoEarnComponent
                timeLeft={timeLeft}
                dailyReward={dailyReward}
                setDailyReward={setDailyReward}
                MINI_APP_APP={MINI_APP_APP}
                point={point}
            />
            <DemoBonusComponent
                weeklyCount={activity?.login_streak} // using cont 7 day count
                referralCount={canClaim ? friendTrigger : 0} />
        </div>
    )
}

const DemoEarnComponent = ({ timeLeft, dailyReward, setDailyReward, MINI_APP_APP, point }) => {

    return (
        <>
            <div className="w-[343px] h-[85px] sm:h-[95px] md:h-[105px] bg-[#ffffff33] rounded-lg flex justify-center content-center items-center mx-auto">
                <img className="w-[53px] h-[54px]" alt="Layer" src={CoinIcon} />
                <div className="w-[200px] text-white font-semibold [font-family:'Rubik-Medium',Helvetica]text-[#ffef2b] text-[28px] tracking-[0.38px]">
                    {point && point.amount > 0 ? point.amount.toLocaleString() : 0}
                </div>
            </div>
            <div className='flex justify-center justify-items-center mx-5 sm:mx-5 md:mx-6 pt-3 sm:pt-3  space-x-5'>
                <DemoDailyRewardComponent
                    timeLeft={timeLeft}
                    dailyReward={dailyReward}
                    setDailyReward={setDailyReward}
                />
                <DemoReferralComponent MINI_APP_APP={MINI_APP_APP} />
            </div>
        </>
    )
}


const DemoDailyRewardComponent = ({ timeLeft, dailyReward, setDailyReward, }) => {
    // const sgTimeNowStr = sgTimeNow()
    // const [timeLeft, setTimeLeft] = useState(sgTimeNowStr)

    const { setPoint, setIsWaitingPoint } = usePointContext()
    const { account } = useUserContext()
    const { setActivity, activity, setIsWaitingActivity } = useActivityContext()
    const [allowed, setAllowed] = useState(true)
    const [clicked, setIsClicked] = useState(false)


    useEffect(() => {
        if (import.meta.env.VITE_MINI_APP_ENV == 'test') {
            const sgTimeNowString = sgTimeNow()
            console.log(activity?.last_login_time.split('T')[0]);
            console.log(sgTimeNowString.split('T')[0]);

            const activityCheck = activity?.last_login_time.split('T')[0] == sgTimeNowString.split('T')[0]
            console.log(activityCheck);

            if (activityCheck == true || clicked == true) {
                setAllowed(false)
            }
        } else {
            if (activity?.last_login_time!==null && activity?.last_login_time!==undefined) {
                setIsClicked(true)
                // const tar = new Date(format(activity?.last_login_time.split('T')[0], 'yyyy-MM-dd')) === new Date()
                // const todayDateWithoutTZ = `${today.getFullYear()}-${today.getUTCMonth() + 1 < 10 ? `0${today.getUTCMonth() + 1}` : today.getUTCMonth() + 1}-${today.getDate()}T${today.getHours() < 10 ? `0${today.getHours()}` : today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
                // const d = new Date();
                // const localTime = d.getTime();
                // const localOffset = d.getTimezoneOffset() * 60000;
                // const utc = localTime + localOffset;
                // const offset = +8; // UTC of USA Eastern Time Zone is -05.00
                // const singaporeTimeoffset = utc + (3600000 * offset);
                // const sgTimeNow = new Date(singaporeTimeoffset)
                // const sgTimeNowString = `${sgTimeNow.getFullYear()}-${sgTimeNow.getUTCMonth() + 1 < 10 ? `0${sgTimeNow.getMonth() + 1}` : sgTimeNow.getMonth() + 1}-${sgTimeNow.getDate()}T${sgTimeNow.getHours() < 10 ? `0${sgTimeNow.getHours()}` : sgTimeNow.getHours()}:${sgTimeNow.getMinutes()<10?`0${sgTimeNow.getMinutes()}`:sgTimeNow.getMinutes()}:${sgTimeNow.getSeconds()<10?`0${sgTimeNow.getSeconds()}`:sgTimeNow.getSeconds()}`
                const sgTimeNowString = sgTimeNow()
                console.log(sgTimeNowString);

                const activityCheck = activity?.last_login_time.split('T')[0] === sgTimeNowString.split('T')[0]
                // const activityCheck = dayjs(new Date()).isSame(activity?.last_login_time)

                console.log('activityCheck');
                console.log('db: ', activity?.last_login_time);
                console.log('today: ', sgTimeNow);
                console.log(activityCheck);

                if (activityCheck == true || clicked == true) {
                    setAllowed(false)
                }
            }
        }
    }, [activity?.last_action_time])

    const handleCheckInDailyReward = async () => {
        setIsWaitingActivity(true)
        const existingActivity = await getActivity({
            access_token: '',
            user_id: account?.id,
        })
        if (existingActivity) {
            // check if last login date was just yesterday
            const updateActivityPayload = activity?.last_login_time && isYesterday(new Date(format(activity?.last_login_time.split('T')[0], 'yyyy-MM-dd'))) ?
                {
                    id: existingActivity?.activity.id,
                    access_token: '',
                    user_id: existingActivity.user_id,
                    activity: {
                        logged_in: false,
                        login_streak: existingActivity.activity.login_streak += 1,
                        total_logins: existingActivity.activity.total_logins += 1,
                        last_action_time: /* new Date().toISOString(), */sgTimeNow(),
                        last_login_time: /* new Date().toISOString() */sgTimeNow()
                    }
                } : {
                    id: existingActivity?.activity.id,
                    access_token: '',
                    user_id: existingActivity.user_id,
                    activity: {
                        logged_in: false,
                        login_streak: 1,
                        total_logins: existingActivity.activity.total_logins += 1,
                        last_action_time: /* new Date().toISOString(), */sgTimeNow(),
                        last_login_time: /* new Date().toISOString() */sgTimeNow()
                    }
                }
            const dbActivity = await updateActivity(updateActivityPayload)
            if (dbActivity) {
                setActivity({
                    id: dbActivity.activity.id,
                    logged_in: dbActivity.activity.logged_in,
                    login_streak: dbActivity.activity.login_streak,
                    total_logins: dbActivity.activity.total_logins,
                    last_action_time: dbActivity.activity.last_action_time,
                    last_login_time: dbActivity.activity.last_login_time,
                    created_at: dbActivity.activity.created_at,
                    updated_at: dbActivity.activity.updated_at,
                    custom_logs: dbActivity.activity.custom_logs,
                })
                setIsWaitingActivity(false)
            }
        }

        setIsWaitingPoint(true)

        const existingPoint = await getPoint({
            access_token: '',
            user_id: account?.id,
        })
        if (existingPoint) {
            const updatePointPayload = {
                id: existingPoint?.point_base.point.id,
                type: 'add', // REVIEW: add / minus point
                access_token: '',
                point_payload: {
                    login_amount: 2,
                    referral_amount: existingPoint.point_base.point.referral_amount, // extra_profit_per_hour: optional
                }
            }
            const dbPoint = await updatePoint(updatePointPayload)
            if (dbPoint && dbPoint?.point_base.user_id) {
                setPoint({
                    id: dbPoint?.point_base.user_id,
                    login_amount: dbPoint?.point_base.point.login_amount,
                    referral_amount: dbPoint?.point_base.point.referral_amount,
                    extra_profit_per_hour: dbPoint?.point_base.point.extra_profit_per_hour,
                    created_at: dbPoint?.point_base.point.created_at,
                    updated_at: dbPoint?.point_base.point.updated_at,
                    custom_logs: dbPoint?.point_base.point.custom_logs
                })
                setIsWaitingPoint(false)
            }
        }

        // setDailyReward(false)
    }
    console.log('allow ', allowed);

    return (
        <div className={`h-[100px] cursor-pointer ${allowed != true && 'pointer-events-none'}`}
            aria-disabled={allowed != true}
            onClick={() => { // FIXME: add daily check in boolean field on each day on backend table 
                if (import.meta.env.VITE_MINI_APP_ENV == 'test') {
                    setIsClicked(true)
                    setIsWaitingActivity(true)
                    setActivity({
                        id: 1,
                        logged_in: false,
                        login_streak: 1,
                        total_logins: 1,
                        last_action_time: new Date().toISOString(),
                        last_login_time: new Date().toISOString(),
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString(),
                    })
                    setIsWaitingPoint(true)
                    setPoint({
                        id: 1,
                        login_amount: 2,
                        referral_amount: 0,
                        extra_profit_per_hour: 0,
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString(),
                    })
                } else {
                    setIsClicked(true)
                    handleCheckInDailyReward()
                }


            }}>
            <div className='text-center w-[100%] h-[80px]'>
                <div className={`relative w-[160px] h-14 rounded-[6px_6px_0px_0px] 
                ${allowed == true ? "[background:linear-gradient(180deg,rgb(169,231,29)_0%,rgb(94.04,196.56,89.27)_100%)]" :
                        "[background:radial-gradient(50%_50%_at_50%_50%,rgb(112.62,108.57,77.9)_0%,rgb(119,102.27,78.84)_100%)]"}`}>
                    {allowed == true ? <div className="absolute w-[77px] top-[7px] left-[40px] [font-family:'Roboto-Medium',Helvetica] font-medium text-[#ffffff] text-xl text-center tracking-[0] leading-[22px]">
                        Daily
                        <br />
                        Reward
                    </div> :
                        <div className="absolute w-[123px] top-[7px] left-[19px] [font-family:'Roboto-Medium',Helvetica] font-medium text-[#ffffff] text-xl text-center tracking-[0] leading-[22px]"
                        >
                            Daily Reward
                            <br />
                            <Countdown targetDate={timeLeft}  /* dailyReward={dailyReward} setDailyReward={setDailyReward} */ />
                        </div>
                    }

                </div>

                <div className='bg-white text-black-400 rounded-b-sm border-white h-[50%] content-center text-center items-center w-[160px]'>
                    + {`${dailyCheckInPointReward}`}
                </div>
            </div>

        </div >

    )

}

const DemoReferralComponent = ({ MINI_APP_APP }) => {
    return (

        <div className={`h-[100px] cursor-pointer`}
            onClick={() => {
                WebApp.openTelegramLink(`https://t.me/share/url?url=${MINI_APP_APP}`)
            }}>
            <div className='text-center w-[100%] h-[80px]'>
                <div className="relative w-[160px] h-14 rounded-[6px_6px_0px_0px] [background:linear-gradient(180deg,rgb(169,231,29)_0%,rgb(94.04,196.56,89.27)_100%)]">
                    <div className="absolute w-[77px] top-[7px] left-[46px] [font-family:'Roboto-Medium',Helvetica] font-medium text-[#ffffff] text-xl text-center tracking-[0] leading-[22px]">
                        Invite
                        <br />
                        a Friend
                    </div>
                </div>
                <div className='bg-white text-black-400 rounded-b-sm border-white h-[50%] content-center text-center items-center w-[160px]'>
                    + {`${friendReferralPointReward}`}
                </div>
            </div>

        </div>

    )
}


const DemoBonusComponent = ({ weeklyCount, referralCount }) => {
    return (
        <div className='relative'>

            <div className='grid grid-rows-1 justify-items-center'>
                <div className="[font-family:'Rubik-Regular',Helvetica]
                font-normal
                mx-auto
                text-white
                text-start
                text-[28px]
                tracking-[-0.38px]
                leading-[34px]
                whitespace-nowrap
                content-start
                pr-[285px]
                pb-2 
                text-xl">Bonus</div>
                <div className="w-[342px] h-14 bg-[rgba(255,255,255,1.0)] rounded-md overflow-hidden [background:radial-gradient(50%_50%_at_50%_50%,rgb(112.62,108.57,77.9)_0%,rgb(119,102.27,78.84)_100%)] relative mb-5">
                    <Progress className="[&>*]:[background:radial-gradient(50%_50%_at_50%_50%,rgb(255,225.25,0)_0%,rgb(255,148.75,0)_100%)]
                    h-14
                    rounded-[6px_0px_0px_0px]"
                        value={weeklyCount / 7 * 100}
                        max={7} />
                    <div className="relative w-[342px] h-14">
                        <div className="absolute h-14 top-0 left-0 rounded-[6px_0px_0px_0px] [background:radial-gradient(50%_50%_at_50%_50%,rgb(255,225.25,0)_0%,rgb(255,148.75,0)_100%)]" />
                        <div className="absolute w-[295px] top-[18px] left-[23px] [font-family:'Roboto-Black',Helvetica] font-normal text-[#ffffff] text-base text-center tracking-[0] leading-[normal]">
                            <div className="absolute w-[98px] h-14 top-0 left-0 " />
                        </div>

                    </div>
                    <p className="absolute w-[295px] top-[18px] left-[23px] [font-family:'Roboto-Black',Helvetica] font-normal text-[#ffffff] text-base text-center tracking-[0] leading-[normal]">
                        <span className="font-black">+ {`${weeklyCheckInPointReward}`} </span>
                        <span className="[font-family:'Roboto-Medium',Helvetica] font-medium">
                            points for login every day for a week
                        </span>
                    </p>
                </div>
                <DemoFriendReferralComponent referralCount={referralCount} />
            </div>
        </div >

    )
}

const DemoFriendReferralComponent = ({ referralCount }) => {
    return (
        <div className="w-[342px] h-14 bg-[rgba(255,255,255,1.0)] rounded-md overflow-hidden [background:radial-gradient(50%_50%_at_50%_50%,rgb(112.62,108.57,77.9)_0%,rgb(119,102.27,78.84)_100%)] relative mb-5">
            <Progress className="[&>*]:[background:radial-gradient(50%_50%_at_50%_50%,rgb(255,225.25,0)_0%,rgb(255,148.75,0)_100%)]
            h-14
            rounded-[6px_0px_0px_0px] 
            "
                value={referralCount / 10 * 100}
                max={10} />
            <div className="relative w-[342px] h-14">
                <div className="absolute h-14 top-0 left-0 rounded-[6px_0px_0px_0px] [background:radial-gradient(50%_50%_at_50%_50%,rgb(255,225.25,0)_0%,rgb(255,148.75,0)_100%)]" />
                <div className="absolute w-[295px] top-[18px] left-[23px] [font-family:'Roboto-Black',Helvetica] font-normal text-[#ffffff] text-base text-center tracking-[0] leading-[normal]">
                    <div className="absolute w-[98px] h-14 top-0 left-0 " />
                </div>
            </div>
            <p className="absolute w-[269px] top-[18px] left-9 [font-family:'Roboto-Black',Helvetica] font-normal text-[#ffffff] text-base text-center tracking-[0] leading-[normal]">
                <span className="font-black">+ {`${tenFriendsReferralPointReward}`} </span>
                <span className="[font-family:'Roboto-Medium',Helvetica] font-medium">
                    points for every 10 people
                </span>
            </p>

        </div >
    )

}
export default DemoEarn