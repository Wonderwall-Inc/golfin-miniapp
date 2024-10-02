import { useUserContext } from '@/contexts/UserContext'
import { useState } from 'react'
import { getUser, updateUser } from '@/apis/UserSevices'
import { Button } from "@/components/ui/button"
import { ToastAction, ToastProvider } from "@/components/ui/toast"
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import Loader from '@/components/LoaderComponent/Loader'

const DemoProfile = () => {
    const { account, setAccount } = useUserContext()
    const [username, setUsername] = useState(account?.telegram_info.username || "");
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast()

    console.log(username);

    const handleUsernameChange = async (username: string) => {
        if (account?.telegram_info.telegram_id) {

            const dbUser = await getUser({
                access_token: '',
                telegram_id: account.id.toString()
            })
            if (dbUser?.user_details.user_base.telegram_info.username !== username) {
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
            } else {
                return toast({
                    className: cn('bg-[#FFFAE6] rounded-[10px]'),
                    title: 'no change',
                    description: 'Username Duplication',
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                })
            }
        }
    }

    return (
        <ToastProvider swipeDirection='up'>
            <div>
                {/*  {isLoading == true && <Loader isLoading={isLoading} wrapperHeight='690px' spinnerTopPosition='12%' />} */}
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
                                setIsLoading(true)
                                if (username == account?.telegram_info.username) {
                                    setIsLoading(false)
                                    return toast({
                                        className: cn('bg-[#FFFAE6] rounded-[10px]'),
                                        title: 'no change',
                                        description: 'Username is not changed',
                                        action: <ToastAction altText="Try again">Try again</ToastAction>,

                                    })
                                }

                                else {
                                    setIsLoading(false)
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
                                setIsLoading(true)
                                if (username == account?.telegram_info.username) {
                                    setIsLoading(false)
                                    return toast({
                                        className: cn('bg-[#FFFAE6] rounded-[10px]'),
                                        title: 'no change',
                                        description: 'Username is not changed',
                                        action: <ToastAction altText="Try again">Try again</ToastAction>,
                                    })
                                }
                                else {
                                    await handleUsernameChange(username)
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
                        }}>
                        <span className='text-white text-[20px] font-bold text-center'>SAVE</span>
                    </Button>
                </div >
            </div >
        </ToastProvider >
    )
}

export default DemoProfile