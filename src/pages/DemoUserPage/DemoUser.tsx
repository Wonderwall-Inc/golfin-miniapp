import { useUserContext } from '@/contexts/UserContext'
import { usePointContext } from '@/contexts/PointContext'
import { useActivityContext } from '@/contexts/ActivityContext'


const DemoUser = () => {
    const { account, setAccount } = useUserContext()
    const { point, setPoint } = usePointContext()
    const { activity, setActivity } = useActivityContext()
    return (
        <div>
            <div className='text-white flex flex-col'>
                <div>
                    <div>user</div>
                    <div>id: {account?.id}</div>
                    <div>tg_id: {account?.telegram_info.telegram_id}</div>
                </div>
                <div>
                    <div>point</div>
                    <div>id: {point?.id}</div>
                    <div>amount: {point?.amount}</div>
                    <div>extra_profit_per_hour: {point?.extra_profit_per_hour}</div>
                </div>
                <div>
                    <div>activity</div>
                    <div>id: {activity?.id}</div>
                    <div>is logged in: {activity?.logged_in}</div>
                    <div>login_streak: {activity?.login_streak}</div>
                    <div>total_logins: {activity?.total_logins}</div>
                    <div>last_action_time: {activity?.last_action_time}</div>
                    <div>last_login_time: {activity?.last_login_time}</div>
                </div>
            </div>
        </div>
    )
}

export default DemoUser