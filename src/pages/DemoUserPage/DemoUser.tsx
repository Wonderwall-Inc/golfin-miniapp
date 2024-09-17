import { useUserContext } from '@/contexts/UserContext'
import React from 'react'

const DemoUser = () => {
    const { account, setAccount } = useUserContext()
    return (
        <div>
            <div className='text-white flex flex-col'>
                <div>id: {account?.id}</div>
                <div>tg_id: {account?.telegram_info.telegram_id}</div>
            </div>
        </div>
    )
}

export default DemoUser