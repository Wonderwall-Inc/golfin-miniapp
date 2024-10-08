import WebApp from '@twa-dev/sdk'
/* import { format } from 'date-fns' */
import { lazy, memo, useEffect, useState } from 'react'

import { useUserContext } from '../../contexts/UserContext'
import { usePointContext } from '@/contexts/PointContext'
import { useActivityContext } from '@/contexts/ActivityContext'
import { useFriendContext } from '@/contexts/FriendContext'

import CoinIcon from '../../assets/images/02_earn_coin_new.png'

import { Progress } from "@/components/ui/progress"
const Countdown = lazy(() => import('../../components/Countdown'))
import { updatePoint } from '@/apis/PointServices'
import { dailyCheckInActivity } from '@/apis/ActivityServices'
import { batchUpdateRewardClaimedBySenderId, getFriend } from '@/apis/FriendServices'

import { /* isYesterday, */ sgTimeNowByDayJs } from '@/utils'

import { dailyCheckInPointReward, friendReferralPointReward, mockDailyCheckInActivity, mockDailyCheckInPoint, mockSingleFriendReferralPoint, tenFriendsReferralPointReward, weeklyCheckInPointReward } from '@/constants'
import { DemoBonusComponentProp, DemoDailyRewardComponentProp, DemoEarnComponentProp, DemoFriendReferralComponentProp } from '@/type'


const DemoEarn = ({ appLink }: { appLink: string }) => {
    const { account } = useUserContext()
    const { point, setPoint, setIsWaitingPoint } = usePointContext()
    const { activity } = useActivityContext()
    const { setFriend, friendTrigger, setFriendTrigger, setIsWaitingFriend } = useFriendContext()
    const [timeLeft, setTimeLeft] = useState("")
    const [totalPointAmount, setTotalPointAmount] = useState(0)
    const [sgTime, setSgTime] = useState(sgTimeNowByDayJs());
    const [isClaimedReferral, setIsClaimedReferral] = useState(false)
    const [isClicked, setIsClicked] = useState(false)

    useEffect(() => {
        const timer = setInterval(() => {
            setSgTime(sgTimeNowByDayJs());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const todayDay = new Date()
        const todayYY = todayDay.getFullYear()
        const todayMM = todayDay.getUTCMonth() + 1
        const preTodayMM = todayMM < 10 ? `0${todayMM}` : todayMM
        const todayDD = todayDay.getDate() + 1 < 10 ? `0${todayDay.getDate() + 1}` : todayDay.getDate() + 1
        const todayYYMMDD = `${todayYY}-${preTodayMM}-${todayDD}T00:00:00`
        setTimeLeft(todayYYMMDD)
    }, [])


    useEffect(() => {
        if (point) {
            setTotalPointAmount(totalPointAmount + point.login_amount + point.referral_amount)
        }
    }, [point])

    useEffect(() => {
        const handleReferralReward = async () => {
            if (friendTrigger && friendTrigger % 10 === 0 && friendTrigger > 0 && !isClaimedReferral) {// Early exit if not a multiple of 10 or already claimed
                setIsWaitingPoint(true);
                setIsWaitingFriend(true);
                setIsClaimedReferral(true);
                try {
                    if (import.meta.env.VITE_MINI_APP_ENV == 'test') {
                        if (point) {
                            setPoint(mockSingleFriendReferralPoint)
                        }
                    } else {
                        if (point) {
                            const updatedPoint = await updatePoint({
                                id: point.id,
                                type: 'add',
                                access_token: '',
                                point_payload: {
                                    referral_amount: tenFriendsReferralPointReward,
                                },
                            });

                            if (updatedPoint && updatedPoint?.point_base.user_id) {
                                if (account) {
                                    await batchUpdateRewardClaimedBySenderId(account.id)
                                    const dbFriends = await getFriend({
                                        user_id: account.id,
                                        access_token: ''
                                    })
                                    setFriend(dbFriends)
                                    setPoint(updatedPoint.point_base.point)
                                }
                            }
                        }
                    }
                } catch (error) {
                    console.error('Error handling referral reward:', error);
                } finally {
                    setIsWaitingPoint(false);
                    setIsWaitingFriend(false);
                    setFriendTrigger(0)
                }
            };
        };

        handleReferralReward();
    }, [friendTrigger, isClaimedReferral, point, account])

    return (
        <div className='w-[100%] h-[690px]'>
            {/* <div>sg: {sgTime}</div> */}
            <DemoEarnComponent
                timeLeft={timeLeft}
                totalPointAmount={totalPointAmount}
                sgTime={sgTime}
                isClicked={isClicked}
                setIsClicked={setIsClicked}
                appLink={appLink}
            />
            <DemoBonusComponent
                weeklyCount={activity?.login_streak} // using cont 7 day count
                referralCount={friendTrigger} />
        </div>
    )
}

const DemoEarnComponent = ({ timeLeft, totalPointAmount, sgTime, isClicked, setIsClicked, appLink }: DemoEarnComponentProp) => {
    return (
        <>
            <div className="w-[343px] h-[85px] sm:h-[95px] md:h-[105px] bg-[#ffffff33] rounded-lg flex justify-center content-center items-center mx-auto my-[12px]">
                <img className="" alt="Layer" src={CoinIcon} width={53} height={54} />
                <div className="w-[200px] font-semibold [font-family:'Rubik-Medium',Helvetica]text-[#ffef2b] text-[28px] tracking-[0.38px] text-[#FFEF2B]">
                    {totalPointAmount ? totalPointAmount.toLocaleString() : 0}
                    {/* {typeof (point) !== 'number' ? (point.login_amount + point.referral_amount).toLocaleString() : 0} */}
                </div>
            </div>
            <div className='flex justify-center justify-items-center mx-5 sm:mx-5 md:mx-6 pt-1 sm:pt-1  space-x-5'>
                <DemoDailyRewardComponent
                    timeLeft={timeLeft}
                    sgTime={sgTime}
                    isClicked={isClicked}
                    setIsClicked={setIsClicked}
                />
                <DemoReferralComponent appLink={appLink} />
            </div>
        </>
    )
}


const DemoDailyRewardComponent = ({ timeLeft, sgTime, isClicked, setIsClicked }: DemoDailyRewardComponentProp) => {
    const { setPoint, setIsWaitingPoint } = usePointContext()
    const { account } = useUserContext()
    const { setActivity, activity, setIsWaitingActivity } = useActivityContext()
    const [allowed, setAllowed] = useState(true)

    useEffect(() => {
        if (import.meta.env.VITE_MINI_APP_ENV == 'test' && activity?.last_login_time) {
            const activityCheck = activity?.last_login_time.split('T')[0] == sgTime.split('T')[0]
            if (activityCheck == true || isClicked == true) {
                setAllowed(false)
            }
        } else {
            if (activity?.last_login_time !== null && activity?.last_login_time !== undefined) {
                setIsClicked(true)
                const activityCheck = activity?.last_login_time.split('T')[0] === sgTime.split('T')[0]

                if (activityCheck == true || isClicked == true) {
                    setAllowed(false)
                }
            }
        }
    }, [activity?.last_action_time])


    const handleCheckInDailyReward = async () => {
        setIsWaitingActivity(true)
        setIsWaitingPoint(true)
        try {
            if (account?.id) {
                const dailyCheckIn = await dailyCheckInActivity({
                    user_id: account?.id,
                    access_token: ''
                })
                if (dailyCheckIn?.activity) {
                    setActivity(dailyCheckIn.activity)
                }
                if (dailyCheckIn?.point) {
                    setPoint(dailyCheckIn.point)
                }
            }
        } catch (error) {
            console.error('Error processing daily check-in:', error);
        } finally {
            setIsWaitingActivity(false)
            setIsWaitingPoint(false)
        }
    }

    return (
        <div className={`h-[100px] cursor-pointer ${allowed != true && 'pointer-events-none'}`}
            aria-disabled={allowed != true}
            onClick={() => { // FIXME: add daily check in boolean field on each day on backend table 
                if (import.meta.env.VITE_MINI_APP_ENV == 'test') {
                    setIsClicked(true)
                    setIsWaitingActivity(true)
                    setActivity(mockDailyCheckInActivity)
                    setIsWaitingPoint(true)
                    setPoint(mockDailyCheckInPoint)
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
                        <div className="absolute w-[123px] top-[7px] left-[19px] [font-family:'Roboto-Medium',Helvetica] font-medium text-[#ffffff] text-xl text-center tracking-[0] leading-[22px]">
                            Daily Reward
                            <br />
                            <Countdown targetDate={timeLeft} />
                        </div>
                    }
                </div>

                <div className='bg-white text-black-400 border-white h-[50%] content-center text-center items-center w-[160px] rounded-[0px_0px_6px_6px]'>
                    + {`${dailyCheckInPointReward}`}
                </div>
            </div>

        </div >

    )

}

const DemoReferralComponent = ({ appLink }: { appLink: string }) => {
    return (
        <div className={`h-[100px] cursor-pointer`} onClick={() => { WebApp.openTelegramLink(`https://t.me/share/url?url=${appLink}`) }}>
            <div className='text-center w-[100%] h-[80px]'>
                <div className="relative w-[160px] h-14 rounded-[6px_6px_0px_0px] [background:linear-gradient(180deg,rgb(169,231,29)_0%,rgb(94.04,196.56,89.27)_100%)]">
                    <div className="absolute w-[77px] top-[7px] left-[46px] [font-family:'Roboto-Medium',Helvetica] font-medium text-[#ffffff] text-xl text-center tracking-[0] leading-[22px]">
                        Invite
                        <br />
                        a Friend
                    </div>
                </div>
                <div className='bg-white text-black-400 border-white h-[50%] content-center text-center items-center w-[160px] rounded-[0px_0px_6px_6px]'>
                    + {`${friendReferralPointReward}`}
                </div>
            </div>

        </div>

    )
}


const DemoBonusComponent = ({ weeklyCount, referralCount }: DemoBonusComponentProp) => {
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
                pb-1
                text-xl">Bonus</div>
                <div className="w-[342px] h-14 bg-[rgba(255,255,255,1.0)] rounded-[6px_6px_6px_6px]  overflow-hidden [background:radial-gradient(170.72%_76.05%_at_87.88%_12.5%,rgb(112.62,108.57,77.9)_0%,rgb(119,102.27,78.84)_100%)] relative mb-3">
                    <Progress className="[&>*]:[background:radial-gradient(170.72%_76.05%_at_87.88%_12.5%,rgb(255,225.25,0)_0%,rgb(255,148.75,0)_100%)]
                    h-14
                    rounded-[6px_0px_0px_0px]"
                        value={weeklyCount && weeklyCount / 7 * 100}
                        max={7} />
                    <div className="relative w-[342px] h-14">
                        <div className="absolute h-14 top-0 left-0 rounded-[6px_6px_6px_6px] [background:radial-gradient(170.72%_76.05%_at_87.88%_12.5%,rgb(255,225.25,0)_0%,rgb(255,148.75,0)_100%)]" />
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

const DemoFriendReferralComponent = ({ referralCount }: DemoFriendReferralComponentProp) => {
    return (
        <div className="w-[342px] h-14 bg-[rgba(255,255,255,1.0)] rounded-[6px_6px_6px_6px]  overflow-hidden [background:radial-gradient(170.72%_76.05%_at_87.88%_12.5%,rgb(112.62,108.57,77.9)_0%,rgb(119,102.27,78.84)_100%)] relative">
            <Progress className="[&>*]:[background:radial-gradient(170.72%_76.05%_at_87.88%_12.5%,rgb(255,225.25,0)_0%,rgb(255,148.75,0)_100%)] h-14 rounded-[6px_0px_0px_0px]"
                value={referralCount && referralCount / 10 * 100}
                max={10} />
            <div className="relative w-[342px] h-14">
                <div className="absolute h-14 top-0 left-0 rounded-[6px_6px_6px_6px] [background:radial-gradient(170.72%_76.05%_at_87.88%_12.5%,rgb(255,225.25,0)_0%,rgb(255,148.75,0)_100%)]" />
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
export default memo(DemoEarn)