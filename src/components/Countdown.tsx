import { useState, useEffect } from 'react';

interface CountdownProps {
    targetDate: string
}
const Countdown = ({ targetDate }: CountdownProps) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};
        if (difference > 0) {
            const d = Math.floor(difference / (1000 * 60 * 60 * 24))
            const h = Math.floor((difference / (1000 * 60 * 60)) % 24)
            const m = Math.floor((difference / 1000 / 60) % 60)
            const s = Math.floor((difference / 1000) % 60)

            timeLeft = {
                d: d,
                h: h,
                m: m,
                s: s
            };
        }
        return timeLeft;
    };
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });
    const timerComponents = [];
    Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval]) {
            return;
        }
        timerComponents.push(
            <span key={interval}>
                {timeLeft[interval]} {interval}{" "}
            </span>
        );
    });
    return (
        <div>
            {timerComponents.length ? timerComponents : <span>Time's up!</span>}
        </div>
    );
};

export default Countdown