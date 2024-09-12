import React, { useEffect, useState } from 'react'
import CoinIcon from '../../assets/images/02_earn_coin.png'
import GolfinTitle from '../../assets/images/02_earn_logo.png'
import Countdown from '../../components/Countdown'
import { useUserContext } from '../../contexts/UserContext'
import WebApp from '@twa-dev/sdk'
import { Progress } from "@/components/ui/progress"
import UpperFlag from '../../assets/icons/UpperFlag.svg'
import LowerFlag from '../../assets/icons/LowerFlag.svg'
import DemoTitle from '@/components/DemoTitleComponent/DemoTitle'

const MINI_APP_BOT_NAME = import.meta.env.VITE_MINI_APP_BOT_NAME
const MINI_APP_NAME = import.meta.env.VITE_MINI_APP_NAME
const MINI_APP_APP = `https://t.me/${MINI_APP_BOT_NAME}/${MINI_APP_NAME}/start?startapp=test`

const DemoLinks = () => {
    const { account, setAccount } = useUserContext()
    const [dailyReward, setDailyReward] = useState(true)
    const [timeLeft, setTimeLeft] = useState("")
    let [isHomeLoading, setIsHomeLoading] = useState(false)
    let [loading, setLoading] = useState(true);
    const [weeklyCount, setWeeklyCount] = useState(0)
    const [referralCount, setReferralCount] = useState(0)


    useEffect(() => {
        if (timeLeft == '') {
            setIsHomeLoading(true)
        } else {
            setIsHomeLoading(false)
        }
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
        setWeeklyCount(new Date().getDay())
        setReferralCount(new Date().getDay())
    }, [new Date().getDay()])

    console.log(weeklyCount);

    return (
        <div className='w-[100%] h-[690px]'>
            <img src={GolfinTitle}
                width={150}
                height={150}
                className='mx-auto py-10 sm:py-10 md:py-15' />
            <DemoEarnComponent timeLeft={timeLeft} dailyReward={dailyReward} setDailyReward={setDailyReward} MINI_APP_APP={MINI_APP_APP} />
            <DemoBonusComponent weeklyCount={weeklyCount} referralCount={referralCount} />
        </div>
    )
}

const DemoTitleComponent = ({ title }) => {
    return (
        <div className="[font-family:'Rubik-Regular',Helvetica]
        font-normal
        text-white
        text-start 
        text-[28px]
        tracking-[-0.38px]
        leading-[34px]
        whitespace-nowrap
        pb-2 
        pl-6
        text-xl">{title}</div>
    )
}

const DemoEarnComponent = ({ timeLeft, dailyReward, setDailyReward, MINI_APP_APP }) => {
    return (
        <>
            {/* <div className='px-5 mb-3'>
                <div className="w-[393px] h-[49px]">
                    <div className="relative h-[49px] w-[393px]">
                        <div className="h-[3px] top-[46px] [background:linear-gradient(180deg,rgb(47,220,202)_0%,rgb(127.27,231.4,127.42)_47.5%,rgb(216,244,45)_100%)] absolute w-[393px] left-[-20px]" />
                        <div className="h-[46px] top-0 [background:linear-gradient(180deg,rgba(47,220,202,0)_0%,rgb(130,201,31)_100%)] absolute w-[393px] left-0" />
                        <div className="absolute w-4 h-11 top-1 left-[29px]">
                            <div className="relative h-[42px]">
                                <div className="absolute w-4 h-[42px] top-0 left-0">
                                    <div className="!absolute !w-0.5 !h-[42px] !top-[-6px] !left-[-0.5px] scale-50"><UpperFlag /></div>
                                    <div className="!absolute !w-[15px] !h-[11px] !top-[15px] !left-[-14px]"><LowerFlag /></div>
                                </div>
                                <div className="absolute w-[3px] h-[3px] top-[39px] left-[11px] bg-[#ffffff] rounded-[1.5px]" />
                            </div>
                        </div>
                        <div className="absolute top-1 left-[130px] [font-family:'Rubik-Medium',Helvetica] font-medium text-white text-[34px] text-center tracking-[0.40px] leading-[41px] whitespace-nowrap">
                            LINKS
                        </div>
                    </div>
                </div>
            </div> */}
            <DemoTitle titlename='LINKS' />
            <div className="w-[343px] h-[85px] sm:h-[95px] md:h-[105px] bg-[#ffffff33] rounded-lg flex justify-center content-center items-center mx-auto">
                <img className="w-[53px] h-[54px]" alt="Layer" src={CoinIcon} />
                <div className="w-[200px]
                font-semibold
                [font-family:'Rubik-Medium',Helvetica]
                text-[#ffef2b] 
                text-[28px] 
                tracking-[0.38px]">{(599200999).toLocaleString()}
                </div>

            </div>

            <div>

                <div className='grid grid-cols-2 justify-items-center mx-5 sm:mx-5 md:mx-6  pt-3'>
                    <DemoDailyRewardComponent timeLeft={timeLeft} dailyReward={dailyReward} setDailyReward={setDailyReward} />
                    <DemoReferralComponent MINI_APP_APP={MINI_APP_APP} />
                </div>
            </div>
        </>
    )
}


const DemoDailyRewardComponent = ({ timeLeft, dailyReward, setDailyReward }) => {
    return (
        <div className={`h-[100px] ${dailyReward == true && 'cursor-not-allowed'}`}
            onClick={() => setDailyReward(false)}>
            <div className='text-center w-[100%] h-[80px]'>
                <div className={`relative 
                w-[165px] 
                h-14 
                rounded-[6px_6px_0px_0px] 
                ${dailyReward == true ? "[background:linear-gradient(180deg,rgb(169,231,29)_0%,rgb(94.04,196.56,89.27)_100%)]" :
                        "[background:radial-gradient(50%_50%_at_50%_50%,rgb(112.62,108.57,77.9)_0%,rgb(119,102.27,78.84)_100%)]"}`}>
                    {dailyReward == true ? <div className="absolute w-[77px] top-[7px] left-[40px] [font-family:'Roboto-Medium',Helvetica] font-medium text-[#ffffff] text-xl text-center tracking-[0] leading-[22px]">
                        Daily
                        <br />
                        Reward
                    </div> :
                        <div className="absolute w-[123px] top-[7px] left-[19px] [font-family:'Roboto-Medium',Helvetica] font-medium text-[#ffffff] text-xl text-center tracking-[0] leading-[22px]">
                            Daily Reward
                            <br />
                            <Countdown targetDate={timeLeft} dailyReward={dailyReward} setDailyReward={setDailyReward} />
                        </div>
                    }

                </div>

                <div className='bg-white text-black-400 rounded-b-sm border-white h-[50%] content-center text-center items-center w-[165px]'>
                    +2
                </div>
            </div>

        </div >

    )

}

const DemoReferralComponent = ({ MINI_APP_APP }) => {
    return (

        <div className={`h-[100px]`}
            onClick={() => {
                WebApp.openTelegramLink(`https://t.me/share/url?url=${MINI_APP_APP}`)
            }}>
            <div className='text-center w-[100%] h-[80px]'>
                <div className="relative 
                w-[165px] 
                h-14 
                rounded-[6px_6px_0px_0px] 
                [background:linear-gradient(180deg,rgb(169,231,29)_0%,rgb(94.04,196.56,89.27)_100%)]">
                    <div className="absolute 
                    w-[77px] 
                    top-[7px] 
                    left-[46px] [font-family:'Roboto-Medium',Helvetica] font-medium text-[#ffffff] text-xl text-center tracking-[0] leading-[22px]">
                        Invite
                        <br />
                        a Friend
                    </div>
                </div>
                <div className='bg-white text-black-400 rounded-b-sm border-white h-[50%] content-center text-center items-center w-[165px]'>
                    +100
                </div>
            </div>

        </div>

    )
}


const DemoBonusComponent = ({ weeklyCount, referralCount }) => {

    return (

        <div>
            <DemoTitleComponent title='Bonus' />
            <div className='grid grid-rows-1 justify-items-center'>

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
                        <span className="font-black">+15 </span>
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
                <span className="font-black">+ 3000 </span>
                <span className="[font-family:'Roboto-Medium',Helvetica] font-medium">
                    points for every 10 people
                </span>
            </p>

        </div >
    )

}
export default DemoLinks