import WebApp from '@twa-dev/sdk';
import React, { useEffect, useState } from 'react'

import { UserContext } from '../contexts/UserContext';

import { createUser, getUser } from '@/apis/UserSevices';

import { UserCreateRequestType, UserType } from '../type';

export const UserProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [account, setAccount] = useState<UserType | undefined>();
    const [isWaitingUser, setIsWaitingUser] = useState(false)

    const webappUser = WebApp.initDataUnsafe.user
    const webappStartParam = WebApp.initDataUnsafe.start_param

    useEffect(() => {
        const userCreation = async (userCreatePayload: UserCreateRequestType) => {
            const newUser = await createUser(userCreatePayload)
            if (newUser) {
                setAccount(newUser.user_details.user_base)
                setIsWaitingUser(false)
            } else {
                const existingUser = await getUser({
                    access_token: '',
                    telegram_id: `${userCreatePayload.telegram_info.telegram_id}`
                })
                if (existingUser) {
                    setAccount(existingUser.user_details.user_base)
                    setIsWaitingUser(false)
                }
            }
        }
        if (import.meta.env.VITE_MINI_APP_ENV == 'test') {
            setIsWaitingUser(true)
            setAccount({
                id: 1,
                app_info: {
                    active: true,
                    admin: false,
                    skin: []
                },
                personal_info: {
                    location: 'Japan', // FIXME: change it by form later, with ENUM
                    nationality: "Japanese" // FIXME: change it by form later, with ENUM
                },
                telegram_info: {
                    username: 'nextInnovationDev25',
                    telegram_id: '11111111',
                    token_balance: 0,
                    premium: true,
                    chat_id: WebApp.initDataUnsafe.chat?.id.toString() ?? '' // Using nullish coalescing to provide a default empty string
                },
                created_at: '20240917',
                updated_at: '20240917',
            })
            setIsWaitingUser(false)
        }
        else {
            setIsWaitingUser(true)
            if (webappUser?.id !== undefined) {// CHECK IF HAVING ID
                // CHECK IF ID == START PARAM >>> BAN
                if (`${webappUser.id}` == webappStartParam) {
                    window.alert('Same ID')
                    WebApp.close()
                }

                const { id, username, first_name, last_name, language_code, is_bot, is_premium, photo_url } = webappUser

                // CHECK IF THE ACC IS BOT >>> BAN
                if (is_bot) {
                    WebApp.close()
                }
                const app_info = {
                    active: true,
                    admin: false,
                    skin: ['']
                }
                const personal_info = {
                    location: "Japan",
                    nationality: "Japanese"
                }
                const telegram_info = is_premium !== undefined && is_premium ? {
                    username: username == undefined ? id.toString() : username,
                    telegram_id: id.toString(),
                    token_balance: 0,
                    premium: true,
                    chat_id: WebApp.initDataUnsafe.chat?.id.toString() ?? '',
                    start_param: webappStartParam,
                } : {
                    username: username == undefined ? id.toString() : username,
                    telegram_id: id.toString(),
                    token_balance: 0,
                    premium: false,
                    chat_id: WebApp.initDataUnsafe.chat?.id.toString() ?? '',
                    start_param: webappStartParam,
                }

                const payload = {
                    app_info: app_info,
                    personal_info: personal_info,
                    telegram_info: telegram_info
                }

                userCreation(payload)
            }
        }
    }, [webappUser, webappStartParam])

    return (
        <UserContext.Provider value={{
            account,
            setAccount,
            isWaitingUser,
            setIsWaitingUser
        }}>
            {children}
        </UserContext.Provider>
    );
}

