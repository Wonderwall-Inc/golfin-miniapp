import { useActivityContext } from '@/contexts/ActivityContext';
import { useState, useEffect, SetStateAction } from 'react';


// FIXME: interface
// interface CountdownProps {
//     targetDate: string
//     dailyReward: boolean
//     setDailyReward: SetStateAction<boolean>
// }
const Countdown = ({ targetDate, /* dailyReward, setDailyReward */ }) => {
    const { activity } = useActivityContext()
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};
        if (difference > 0) {
            // const day = Math.floor(difference / (1000 * 60 * 60 * 24))
            const h = Math.floor((difference / (1000 * 60 * 60)) % 24)
            const m = Math.floor((difference / 1000 / 60) % 60)
            const s = Math.floor((difference / 1000) % 60)

            timeLeft = {
                // d: d,
                h: h,
                m: m,
                s: s
            };
        }
        return timeLeft;
    };
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const timerComponents = [] as any;

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    // useEffect(() => {
    //     if (!timerComponents.length) {
    //         setIsTodayCheckedIn(false)
    //     }
    // }, [timerComponents])



    Object.keys(timeLeft).forEach((interval: any) => {
        if (!timeLeft[interval]) {
            if (interval == 'd') {
                return
            } else {
                timerComponents.push(interval == 's' ?
                    <span key={`${interval}-zero`}>00</span> :
                    <span key={`${interval}-zero`}>00:</span>)
            }
        } else {
            interval == 's' ?
                timerComponents.push(timeLeft[interval] < 10 ?
                    <span key={interval}>0{timeLeft[interval]}</span> :
                    <span key={interval}>{timeLeft[interval]}</span>) :
                timerComponents.push(timeLeft[interval] < 10 ?
                    <span key={interval}>0{timeLeft[interval]}:</span> :
                    <span key={interval}>{timeLeft[interval]}:</span>)
        }
    });
    return (
        <div>
            {timerComponents.length && timerComponents}
        </div>
    );
};

export default Countdown