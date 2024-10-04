import { useUserContext } from '@/contexts/UserContext'
import { usePointContext } from '@/contexts/PointContext'
import { useActivityContext } from '@/contexts/ActivityContext'
import { useFriendContext } from '@/contexts/FriendContext'
import { sgTimeNowByDayJs } from '@/utils'
import { useState } from 'react'

const DemoDev = () => {
    const { account } = useUserContext()
    const { point } = usePointContext()
    const { activity } = useActivityContext()
    const { friend, friendTrigger, friendNumber } = useFriendContext()
    const [sgTime] = useState(sgTimeNowByDayJs());

    return (
        <div>
            <div className='text-white grid grid-cols-2 w-[100%]'>
                <div>SG Time: {sgTime}</div>
                <div>
                    <div className='font-extrabold'>user</div>
                    <div>id: {account?.id}</div>
                    <div>tg_id: {account?.telegram_info.telegram_id}</div>
                </div>
                <div>
                    <div className='font-extrabold'>point</div>
                    <div>id: {point?.id}</div>
                    <div>login: {point?.login_amount}</div>
                    <div>referral: {point?.referral_amount}</div>
                    <div>extra_profit_per_hour: {point?.extra_profit_per_hour}</div>
                </div>
                <div>
                    <div className='font-extrabold'>activity</div>
                    <div>id: {activity?.id}</div>
                    <div>is logged in: {activity?.logged_in}</div>
                    <div>login_streak: {activity?.login_streak}</div>
                    <div>total_logins: {activity?.total_logins}</div>
                    <div>last_action: {activity?.last_action_time}</div>
                    <div>last_login: {activity?.last_login_time}</div>
                </div>
                <div className='h-[100px] overflow-y-scroll'>
                    <div className='font-extrabold'>friend</div>
                    {friend?.sender?.map((s) => {
                        return (
                            <div className=''>
                                <div>receiver_id: {s?.receiver_id}</div>
                            </div>
                        )
                    })}
                    {friend?.receiver?.map((r) => {
                        return (
                            <div className=''>
                                <div>sender_id: {r?.sender_id}</div>
                            </div>
                        )
                    })}
                    <div>friend number: {friendNumber}</div>
                    <div>friend trigger: {friendTrigger}</div>
                </div>
            </div>
        </div>
    )
}

export default DemoDev