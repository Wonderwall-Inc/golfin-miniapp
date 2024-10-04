import { cn } from '@/lib/utils'
import { useState } from 'react'

import { useUserContext } from '@/contexts/UserContext'

import { getUser, updateUser } from '@/apis/UserSevices'

import { useToast } from '@/hooks/use-toast'
import { Button } from "@/components/ui/button"
import { ToastAction, ToastProvider } from "@/components/ui/toast"
import Loader from '@/components/LoaderComponent/Loader'

const DemoProfile = () => {
    const { account, setAccount, setIsWaitingUser, isWaitingUser } = useUserContext()
    const [username, setUsername] = useState(account?.telegram_info.username || "");
    /*     const [isLoading, setIsLoading] = useState(false); */
    const { toast } = useToast()

    const handleUsernameChange = async (username: string) => {
        const updatedUser = await updateUser({
            access_token: '',
            id: account?.id || 0,
            user_payload: {
                username: username,
            }
        })
        if (updatedUser !== undefined) {
            setAccount(updatedUser.user_details.user_base)
            /*   setIsLoading(false) */
        }


    }

    return (
        <ToastProvider swipeDirection='up'>
            <div>
                {isWaitingUser == true ?
                    <Loader isLoading={isWaitingUser} /> :
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
                            className='mx-auto text-white font-bold
                            [background:linear-gradient(158deg,rgba(169,231,29,1)_-7.35%,rgba(94,197,89,1)_84.4%)]
                            w-[343px]
                            h-[56px]
                            gap-[10px]
                            justify-center
                            items-center
                            rounded-[6px]'
                            type='submit'
                            onClick={async () => {
                                if (import.meta.env.VITE_MINI_APP_ENV == 'test') {
                                    setIsWaitingUser(true)
                                    if (username == account?.telegram_info.username) {
                                        setIsWaitingUser(false)
                                        return toast({
                                            className: cn('bg-[#FFFAE6] rounded-[10px]'),
                                            description: 'Username does not changed',
                                            action: <ToastAction altText="Try again">Try again</ToastAction>,
                                        })
                                    }

                                    else {
                                        setIsWaitingUser(false)
                                        return toast({
                                            className: cn('bg-[#FFFAE6] rounded-[10px]'),
                                            description:
                                                <div className=''>
                                                    Username is changed to { }
                                                    <span className='font-semibold'>{username}</span>
                                                </div>
                                        })

                                    }
                                } else {
                                    setIsWaitingUser(true)
                                    if (username == account?.telegram_info.username) {
                                        setIsWaitingUser(false)
                                        return toast({
                                            className: cn('bg-[#FFFAE6] rounded-[10px]'),
                                            description: 'Same username',
                                            action: <ToastAction altText="Try again">Try again</ToastAction>,
                                        })
                                    }
                                    else {
                                        const dbUser = await getUser({
                                            access_token: '',
                                            username: username
                                        })
                                        if (dbUser?.user_details.user_base.telegram_info.username == username) {
                                            setIsWaitingUser(false)
                                            return toast({
                                                className: cn('bg-[#FFFAE6] rounded-[10px]'),
                                                description: 'Username already exists',
                                                action: <ToastAction altText="Try again">Try again</ToastAction>,
                                            })
                                        } else {
                                            await handleUsernameChange(username)
                                            setIsWaitingUser(false)
                                            return toast({
                                                className: cn('bg-[#FFFAE6] rounded-[10px]'),
                                                description:
                                                    <div className=''>
                                                        Username is changed to { }
                                                        <span className='font-semibold'>{username}</span>
                                                    </div>
                                            })
                                        }
                                    }
                                }
                            }}>
                            <span className='text-white text-[20px] font-bold text-center'>SAVE</span>
                        </Button>
                        <a target='_blank' className='my-10' href='https://golfin.io/en/privacy-policy-en/'>Privacy Policy</a>
                    </div >
                }
            </div >
        </ToastProvider >
    )
}

export default DemoProfile