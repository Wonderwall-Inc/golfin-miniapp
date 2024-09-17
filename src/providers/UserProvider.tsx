import React, { useEffect, useState } from 'react'
import WebApp from '@twa-dev/sdk';
import { UserContext } from '../contexts/UserContext';
import { UserCreateRequestType, UserCreateResponseType, UserRetrievalRequestType, UserRetrievalResponseType, UserType } from '../type';
import { createUser, getUser } from '@/apis/UserSevices';

export const UserProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [account, setAccount] = useState<UserType | undefined>();
    const [isWaitingUser, setIsWaitingUser] = useState(false)
    const webappUser = WebApp.initDataUnsafe.user
    const webappStartParam = WebApp.initDataUnsafe.start_param

    useEffect(() => {
        const userRetrieval = async (userRetirevalPayload: UserRetrievalRequestType): Promise<UserRetrievalResponseType | undefined> => {
            try {
                const existingUser = await getUser(userRetirevalPayload)
                if (existingUser !== undefined) {
                    // const { user_details } = existingUser
                    // const { user_base, game_characters, point, activity, social_media, sender, receiver } = user_details
                    return existingUser
                }
                /* else {
                        try {
                            if (userCreatePayload)
                                const newUser = await createUser(userCreatePayload)
                            if (newUser !== undefined) {
                                const { user_details, access_token } = newUser
                                const { user_base, game_characters, point, activity, social_media, sender, receiver } = user_details

                                setAccount(user_base)
                            }
                        } catch (error) {
                            console.log(error);
                            return error
                        }
                    } */
            } catch (error) {
                console.log(error);
                return undefined
            }
        }
        const userCreation = async (userCreatePayload: UserCreateRequestType): Promise<UserCreateResponseType | undefined> => {
            try {
                const newUser = await createUser(userCreatePayload)
                if (newUser !== undefined) {
                    return newUser
                    // const { user_details, access_token } = newUser
                    // const { user_base, game_characters, point, activity, social_media, sender, receiver } = user_details

                    // setAccount(user_base)
                }
            } catch (error) {
                console.error(error);
                return undefined
            }
        }
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

        console.log('provider');
        console.log(webappUser);
        console.log(webappStartParam);

        // CHECK IF HAVING ID
        if (webappUser?.id !== undefined) {
            setIsWaitingUser(true)
            // CHECK IF ID == START PARAM >>> BAN
            if (`${webappUser?.id}` == webappStartParam) {
                window.alert('Same ID')
                WebApp.close()
            }

            const { id, username, first_name, last_name, is_premium, is_bot, language_code } = webappUser

            // CHECK IF THE ACC IS BOT >>> BAN
            if (is_bot) {
                WebApp.close()
            }

            userRetrieval({
                access_token: '111', // FIXME: read from cookie
                telegram_id: `${id}`
            }).then((existingUser) => {
                if (existingUser !== undefined) {
                    setAccount(existingUser.user_details.user_base)
                    setIsWaitingUser(false)
                    return
                } else {
                    // CREATE NEW USER
                    if (username) {

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
                                username: username,
                                telegram_id: id.toString(),
                                token_balance: 0,
                                is_premium: is_premium == true ? true : false,
                                chat_id: '123', // FIXME: change it by getting the chat id from tg bot later on
                                start_param: webappStartParam,
                            }
                            // wallet_address?: string // FIXME: integrate the TON wallet later on
                        }).then((newUser) => {
                            if (newUser !== undefined) {
                                setAccount(newUser.user_details.user_base)
                                setIsWaitingUser(false)
                                return
                            }
                        })
                    }
                }
            })
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

