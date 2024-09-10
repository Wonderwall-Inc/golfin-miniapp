import React, { useEffect, useState } from 'react'
import CoinIcon from '../../assets/images/02_earn_coin.png'
import GolfinTitle from '../../assets/images/02_earn_logo.png'
import Countdown from '../../components/Countdown'
import { useUserContext } from '../../contexts/UserContext'
import WebApp from '@twa-dev/sdk'
import { Progress } from "@/components/ui/progress"


const DemoRanking = () => {
    const MINI_APP_BOT_NAME = import.meta.env.VITE_MINI_APP_BOT_NAME
    const MINI_APP_NAME = import.meta.env.VITE_MINI_APP_NAME

    const MINI_APP_APP = `https://t.me/${MINI_APP_BOT_NAME}/${MINI_APP_NAME}/start?startapp=test`

    const { account, setAccount } = useUserContext()
    const [dailyReward, setDailyReward] = useState(false)
    const [timeLeft, setTimeLeft] = useState("")
    let [isHomeLoading, setIsHomeLoading] = useState(false)
    let [loading, setLoading] = useState(true);

    const mockCheckedInDayCounter = 5

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


    return (
        <div className='bg-[#004253] w-[390px] h-[690px] '>
            <img src={GolfinTitle}
                width={150}
                height={150}
                className='mx-auto py-15' />
            <DemoEarnComponent timeLeft={timeLeft} dailyReward={dailyReward} setDailyReward={setDailyReward} MINI_APP_APP={MINI_APP_APP} />
            <DemoBonusComponent />

        </div>
    )
}

const DemoTitleComponent = ({ title }) => {
    return (
        <div className='font-bold text-[#8cc73e] text-start pb-2 text-xl'>{title}</div>
    )
}

const DemoEarnComponent = ({ timeLeft, dailyReward, setDailyReward, MINI_APP_APP }) => {
    return (
        <>
            <div className='px-5 py-1'>
                <DemoTitleComponent title='Earn' />
                <div className='grid grid-cols-12 space-x-5  border-2 rounded-md border-[#0b3c48] bg-[#0b3c48] p-2'>
                    <img src={CoinIcon} width='41.829px' height='40px' />
                    <div className='w-[250px] 
                    text-xl 
                    font-semibold
                    items-center 
                    text-center 
                    justify-center 
                    content-center
                    text-yellow-300'>{(599200999).toLocaleString()}</div>
                </div>
            </div>
            <div className='grid grid-cols-2 mx-auto my-3 justify-center w-[300px]'>
                <DemoDailyRewardComponent timeLeft={timeLeft} dailyReward={dailyReward} setDailyReward={setDailyReward} />
                <DemoReferralComponent MINI_APP_APP={MINI_APP_APP} />
            </div>
        </>
    )
}


const DemoDailyRewardComponent = ({ timeLeft, dailyReward, setDailyReward }) => {
    return (
        <button className={`h-[100px]
            px-1
         bg-transparent 
         ${dailyReward == true && 'cursor-not-allowed'}`}
            onClick={() => setDailyReward(true)}>
            <div className='box-border inline-block text-center w-[100%] h-[80px]'>
                <div className={`bg-gray-400 rounded-t-sm border-[#8cc73e] h-[50%] items-center content-center text-clip text-white`}>Daily Reward</div>
                <div className='bg-white text-gray-400 flex flex-row justify-center rounded-b-sm border-white h-[50%] content-center text-center items-center space-x-2'>
                    <Countdown targetDate={timeLeft} />
                </div>
            </div>

        </button>

    )

}

const DemoReferralComponent = ({ MINI_APP_APP }) => {
    return (
        <button className='h-[100px]
        px-1
        bg-transparent'
            onClick={() => {
                WebApp.openTelegramLink(`https://t.me/share/url?url=${MINI_APP_APP}`)
            }}>
            <div className='box-border inline-block text-center w-[100%] h-[80px]'>
                <div className='bg-[#8cc73e] rounded-t-sm border-[#8cc73e] h-[50%] items-center content-center text-white'>Invite a Friend</div>
                <div className='bg-white text-[#8cc73e] flex flex-row justify-center rounded-b-sm border-white h-[50%] content-center text-center items-center space-x-2'>
                    <div className='text-[18px]'>+ 100</div>
                    {/* <img src={CoinImage} width='30px' height='30px' /> */}
                </div>
            </div>
        </button>

    )
}


const DemoBonusComponent = () => {
    return (
        <>
            <div className='px-5'>
                <DemoTitleComponent title='Bonus' />
                <div className='border-2 
                rounded-md 
                border-[#0b3c48]
                bg-[#0b3c48] 
                p-1 
                text-white 
                h-[60px] 
                content-center'>

                    <div className='flex'>

                        <div className='absolute z-1000 text-white px-2'>
                            Login every day for a week and get 15 points
                        </div>
                    </div>
                </div>
                <DemoFriendReferralComponent />
            </div >
        </>
    )
}

// .currentProgress {
//     display: flex;
//     flex-direction: row;
//     height: 60px;
//     border-radius: 24px;
//     background-color: skyblue;
//     align-items: center;
//     width: 90%;
//     /* progressWidth */
//     justify-content: flex-end;
//   }

//   .content {
//     padding: 0 20px;
//   }

const DemoFriendReferralComponent = () => {
    return (
        <div className='border-2 
        border-[#8cc73e]
        rounded-md 
        text-white 
        items-center 
        content-center 
        my-2 

        text-start 
        px-3 
        h-[50px] 
        font-semibold 
        tracking-tighter
        bg-[#8cc73e]'>
            3000 points for every 10 people
        </div>
    )
}
export default DemoRanking