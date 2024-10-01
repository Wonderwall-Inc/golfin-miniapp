import { useUserContext } from '@/contexts/UserContext'
import { usePointContext } from '@/contexts/PointContext'
import { useActivityContext } from '@/contexts/ActivityContext'
import { useFriendContext } from '@/contexts/FriendContext'
import { sgTimeNowByDayJs } from '@/utils'
import { useState } from 'react'
import { updateUser } from '@/apis/UserSevices'
import { Button } from "@/components/ui/button"
import { ToastAction, ToastProvider } from "@/components/ui/toast"
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

const DemoProfile = () => {
    const { account, setAccount } = useUserContext()
    const { point, setPoint } = usePointContext()
    const { activity, setActivity } = useActivityContext()
    const { friend, setFriend, friendTrigger, friendNumber } = useFriendContext()
    const [sgTime, setSgTime] = useState(sgTimeNowByDayJs());
    const [username, setUsername] = useState(account?.telegram_info.username || "");
    const { toast } = useToast()

    console.log('account');
    console.log(account);

    console.log('point');
    console.log(point);

    console.log('activity');
    console.log(activity);

    console.log('friend');
    console.log(friend);

    console.log(username);

    return (
        <ToastProvider swipeDirection='up'>
            <div>
                <div className='text-white grid grid-cols-1'>
                    <input
                        placeholder='username'
                        defaultValue={account?.telegram_info.username}
                        type="text"
                        className='mx-auto 
                    rounded-[8px] 
                    py-[19px] 
                    px-[25px] 
                    w-[343px] 
                    h-[56px] 
                    items-center 
                    justify-center 
                    text-start 
                    content-center 
                    text-[20px]
                    tracking-[0.38px]
                    font-[500]
                    gap-10
                    bg-[rgba(255,255,255,0.20)]
                    m-3'
                        onChange={(e) => setUsername(e.target.value)} />
                    <Button
                        variant='default'
                        className='mx-auto text-white 
                    font-bold
                    [background:linear-gradient(158deg,rgba(169,231,29,1)_-7.35%,rgba(94,197,89,1)_84.4%)]'
                        type='submit'
                        onClick={() => {
                            if (import.meta.env.VITE_MINI_APP_ENV == 'test') {
                                toast(username == account?.telegram_info.username ? {
                                    className: cn(
                                        'fixed left-1/2 transform -translate-x-1/2 max-w-[300px] animate-toast-slide-up'
                                    ),
                                    title: 'no change',
                                    description: 'Username is not changed',
                                    action: <ToastAction altText="Try again">Try again</ToastAction>,

                                } : {
                                    className: cn(
                                        'fixed left-1/2 transform -translate-x-1/2 max-w-[220px] animate-toast-slide-up'
                                    ),
                                    description:
                                        <div className=''>
                                            Username is changed to { }
                                            <span className='font-semibold'>{username}</span>
                                        </div>,
                                })

                            } else {
                                updateUser({
                                    access_token: '',
                                    id: account?.id || 0,
                                    user_payload: {
                                        username: username,
                                    }
                                })
                            }
                        }}
                    >Save</Button>
                </div >
            </div >
        </ToastProvider>
    )
}

export default DemoProfile