import React, { useEffect, useState } from 'react'
import WebApp from '@twa-dev/sdk';
import { UserContext } from '../contexts/UserContext';
import { UserCreateRequestType, UserType } from '../type';
import { createUser, getUser } from '@/apis/UserSevices';
import { getPoint, updatePoint } from '@/apis/PointServices';

export const UserProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [account, setAccount] = useState<UserType | undefined>();
    const [isWaitingUser, setIsWaitingUser] = useState(false)

    const webappUser = WebApp.initDataUnsafe.user
    const webappStartParam = WebApp.initDataUnsafe.start_param

    useEffect(() => {
        const userCreation = async (userCreatePayload: UserCreateRequestType) => {
            try {
                const newUser = await createUser(userCreatePayload)
                if (newUser !== undefined) {
                    const sender = await getUser({
                        access_token: '',
                        telegram_id: `${userCreatePayload.telegram_info.start_param}`
                    })
                    if (sender) {
                        const senderPoint = await getPoint({
                            access_token: '',
                            user_id: sender.user_details.user_base.id
                        })
                        if (senderPoint) {
                            const dbPoint = await updatePoint({
                                access_token: '',
                                id: senderPoint.point_base.point.id,
                                type: 'add', // REVIEW: add / drop point
                                point_payload: {
                                    login_amount: senderPoint.point_base.point.login_amount,
                                    referral_amount: senderPoint.point_base.point.referral_amount += 100
                                }
                            })
                            console.log('update point for sender');
                            console.log(dbPoint);
                        }
                    }


                    setAccount(newUser.user_details.user_base)
                    setIsWaitingUser(false)
                    return newUser
                } else {
                    const existingUser = await getUser({
                        access_token: '',
                        telegram_id: `${userCreatePayload.telegram_info.telegram_id}`
                    })
                    if (existingUser) {
                        setAccount(existingUser.user_details.user_base)
                        setIsWaitingUser(false)
                        return existingUser
                    }
                }
            } catch (error) {
                console.log(error);
                return error
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
                    location: "Japan", // FIXME: change it by form later, with ENUM
                    nationality: "Japanese" // FIXME: change it by form later, with ENUM
                },
                telegram_info: {
                    username: 'dev',
                    telegram_id: '11111111',
                    token_balance: 0,
                    premium: true,
                    chat_id: '123' // FIXME: change it by getting the chat id from tg bot later on
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
                if (`${webappUser?.id}` == webappStartParam) {
                    window.alert('Same ID')
                    WebApp.close()
                }

                const { id, username, first_name, last_name, language_code, is_bot, is_premium } = webappUser

                // CHECK IF THE ACC IS BOT >>> BAN
                if (is_bot) {
                    WebApp.close()
                }
                if (username !== undefined) {
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
                        username: username,
                        telegram_id: id.toString(),
                        token_balance: 0,
                        premium: true,
                        chat_id: '123',
                        start_param: webappStartParam,
                    } : {
                        username: username,
                        telegram_id: id.toString(),
                        token_balance: 0,
                        premium: false,
                        chat_id: '123',
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

