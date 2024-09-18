import { useUserContext } from '@/contexts/UserContext'
import { usePointContext } from '@/contexts/PointContext'
import { useActivityContext } from '@/contexts/ActivityContext'
import { useFriendContext } from '@/contexts/FriendContext'


const DemoUser = () => {
    const { account, setAccount } = useUserContext()
    const { point, setPoint } = usePointContext()
    const { activity, setActivity } = useActivityContext()
    const { friend, setFriend } = useFriendContext()
    console.log('account');
    console.log(account);

    console.log('point');
    console.log(point);

    console.log('activity');
    console.log(activity);

    console.log('friend');
    console.log(friend);

    return (
        <div>
            <div className='text-white grid grid-cols-2 w-[100%]'>
                <div>
                    <div className='font-extrabold'>user</div>
                    <div>id: {account?.id}</div>
                    <div>tg_id: {account?.telegram_info.telegram_id}</div>
                </div>
                <div>
                    <div className='font-extrabold'>point</div>
                    <div>id: {point?.id}</div>
                    <div>amount: {point?.amount}</div>
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
                <div>
                    <div className='font-extrabold'>friend</div>
                    {friend?.sender?.map((s) => {
                        return (
                            <>
                                <div>id: {s?.id}</div>
                                <div>sender_id: {s?.sender_id}</div>
                                <div>receiver_id: {s?.receiver_id}</div>
                                <div>status: {s?.status}</div>
                            </>
                        )
                    })}
                    {friend?.receiver?.map((r) => {
                        return (
                            <>
                                <div>id: {r?.id}</div>
                                <div>sender_id: {r?.sender_id}</div>
                                <div>receiver_id: {r?.receiver_id}</div>
                                <div>status: {r?.status}</div>
                            </>
                        )
                    })}

                </div>
            </div>
        </div>
    )
}

export default DemoUser