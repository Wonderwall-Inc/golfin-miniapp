import React, { useEffect, useState } from 'react'
import WebApp from '@twa-dev/sdk';

import { mockUserAccount } from '../constants';
import { UserContext } from '../contexts/UserContext';
import { AccountType, UserCreateRequestType, UserType } from '../type';
import { createUser } from '@/apis/UserSevices';
import axios from 'axios';



export const UserProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [account, setAccount] = useState<UserType | undefined>();
    const webappUser = WebApp.initDataUnsafe.user
    console.log(webappUser);

    const webappStartParam = WebApp.initDataUnsafe.start_param
    console.log(webappStartParam);

    const userCreation = async (userCreatePayload: UserCreateRequestType) => {
        const res = await axios.get('https://golfin-miniapp-server-dev.vercel.app/')
        console.log('response on server for provider', res.status)
        try {
            const newUser = await createUser(userCreatePayload)
            if (newUser !== undefined) {
                const { user_details, access_token } = newUser
                const { user_base, game_characters, point, activity, social_media, sender, receiver } = user_details

                setAccount(user_base)
                // setUser(userPayload)
            }
        } catch (error) {
            console.log(error);
            return error
        }
    }
    useEffect(() => {
        if (import.meta.env.VITE_MINI_APP_ENV == 'test') {
            const mockAccount = {
                id: 1,
                app_info: {
                    is_active: true,
                    is_admin: false,
                    skin: []
                },
                personal_info: {
                    location: "Japan", // FIXME: change it by form later, with ENUM
                    nationality: "Japanese" // FIXME: change it by form later, with ENUM
                    // age?: number
                    // gender?: string
                    // email?: string
                },
                telegram_info: {
                    username: 'dev'!,
                    telegram_id: '11111111',
                    token_balance: 0,
                    is_premium: true!,
                    chat_id: '123' // FIXME: change it by getting the chat id from tg bot later on
                    // wallet_address?: string
                    // chat_id: string
                },
                created_at: '20240917',
                updated_at: '20240917',
            }
            setAccount(mockAccount)
        }


        if (webappUser && `${webappUser?.id}` == webappStartParam) {
            window.alert('Same ID')
            WebApp.close()
        }
        console.log(webappUser);
        console.log(webappStartParam);

        if (webappUser?.id !== undefined && webappStartParam !== undefined) {
            console.log('userInfoPayload');
            const { id, username, first_name, last_name, is_premium, is_bot, language_code } = webappUser

            if (is_bot) {
                WebApp.close()
            }

            console.log('userInfoPayload if');
            userCreation({
                app_info: {
                    is_active: true,
                    is_admin: false,
                    skin: []
                },
                personal_info: {
                    location: "Japan", // FIXME: change it by form later, with ENUM
                    nationality: "Japanese" // FIXME: change it by form later, with ENUM
                    // age?: number
                    // gender?: string
                    // email?: string
                },
                telegram_info: {
                    username: username!,
                    telegram_id: id.toString(),
                    token_balance: 0,
                    is_premium: is_premium!,
                    chat_id: '123' // FIXME: change it by getting the chat id from tg bot later on
                    // wallet_address?: string
                    // chat_id: string
                }

            })
        }
    }, [webappUser, webappStartParam])
    return (
        <UserContext.Provider value={{
            account,
            setAccount
        }}>
            {children}
        </UserContext.Provider>
    );
}

