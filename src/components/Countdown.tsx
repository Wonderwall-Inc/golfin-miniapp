import { useActivityContext } from '@/contexts/ActivityContext';
import { useUserContext } from '@/contexts/UserContext';
import { sgTimeNow } from '@/utils';
import { useState, useEffect } from 'react';


// FIXME: interface
// interface CountdownProps {
//     targetDate: string
//     dailyReward: boolean
//     setDailyReward: SetStateAction<boolean>
// }
const Countdown = ({ targetDate }) => {
    const { activity, setActivity } = useActivityContext()
    console.log('targetDate: ', targetDate);
    const { account } = useUserContext()
    const calculateTimeLeft = () => {

        //const difference = +new Date(targetDate) - +new Date();
        const difference = +new Date(targetDate) - sgTimeNow();
        let timeLeft = {};
        if (difference > 0) {
            // const day = Math.floor(difference / (1000 * 60 * 60 * 24))
            const h = Math.floor((difference / (1000 * 60 * 60)) % 24)
            const m = Math.floor((difference / 1000 / 60) % 60)
            const s = Math.floor((difference / 1000) % 60)

            timeLeft = {
                // d: d,
                // h: h+1,
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

    useEffect(() => {
        if (!timerComponents.length) {
            if (activity && account) {
                setActivity({
                    id: activity.id,
                    logged_in: true,
                    login_streak: activity.login_streak,
                    total_logins: activity.total_logins,
                    last_action_time: activity.last_action_time,
                    last_login_time: activity.last_login_time,
                    created_at: activity.created_at,
                    updated_at: activity.updated_at,
                })
            }
        }
    }, [timerComponents])



    /*  Object.keys(timeLeft).forEach((interval: any) => {
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
     }); */
    Object.keys(timeLeft).forEach((interval: any) => {
        if (!timeLeft[interval]) {
            timerComponents.push(
                <span key={`${interval}-zero`}>{interval === 's' ? '00' : '00:'}</span>
            );
        } else {
            timerComponents.push(
                <span key={interval}>
                    {timeLeft[interval] < 10 ? `0${timeLeft[interval]}` : timeLeft[interval]}
                    {interval !== 's' ? ':' : ''}
                </span>
            );
        }
    });

    return (
        <div>
            {timerComponents.length && timerComponents}
        </div>
    );
};

export default Countdown