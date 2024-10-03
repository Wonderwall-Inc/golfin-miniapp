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

/*     const [lat, setLat] = useState('')
    const [long, setLong] = useState('')
    const [currentLocation, setCurrentLocation] = useState('') */

/*     console.log('lat: ', lat);
    console.log('long: ', long);

    const OPEN_WEATHER_API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY
    const OPEN_WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/onecall?`
    window.alert(OPEN_WEATHER_API_KEY)

    useEffect(() => {

        const getCurrentLatLong = async () => {
            navigator.geolocation.getCurrentPosition((position) => {
                setLat(position.coords.latitude.toString());
                setLong(position.coords.longitude.toString());
            });
        }

        getCurrentLatLong()
    }, [])

    useEffect(() => {
        const getCurrentLocation = async () => {
            const res = await api.get(`${OPEN_WEATHER_API_URL}lat=${lat}&lon=${long}&exclude=hourly,daily&appid=${OPEN_WEATHER_API_KEY}`)
            console.log('res: ', res);
            setCurrentLocation(res.data.name)
        }
        getCurrentLocation()
    }, [lat, long]) */

    useEffect(() => {


        const userCreation = async (userCreatePayload: UserCreateRequestType) => {
            try {
                const newUser = await createUser(userCreatePayload)
                if (newUser !== undefined) {
                    // const sender = await getUser({
                    //     access_token: '',
                    //     telegram_id: `${userCreatePayload.telegram_info.start_param}`
                    // })
                    // if (sender) {
                    //     const senderPoint = await getPoint({
                    //         access_token: '',
                    //         user_id: sender.user_details.user_base.id
                    //     })
                    //     if (senderPoint) {
                    //         const dbPoint = await updatePoint({
                    //             access_token: '',
                    //             id: senderPoint.point_base.point.id,
                    //             type: 'add', // REVIEW: add / drop point
                    //             point_payload: {
                    //                 login_amount: senderPoint.point_base.point.login_amount,
                    //                 referral_amount: senderPoint.point_base.point.referral_amount += 100
                    //             }
                    //         })
                    //         console.log('update point for sender');
                    //         console.log(dbPoint);
                    //     }
                    // }


                    setAccount(newUser.user_details.user_base)
                    setIsWaitingUser(false)
                    /* return newUser */
                } else {
                    const existingUser = await getUser({
                        access_token: '',
                        telegram_id: `${userCreatePayload.telegram_info.telegram_id}`
                    })
                    if (existingUser) {
                        setAccount(existingUser.user_details.user_base)
                        setIsWaitingUser(false)
                       /*  return existingUser */
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

    console.log('chat_id from db: ', account?.telegram_info.chat_id);
    console.log('chat from tg: ', WebApp.initDataUnsafe.chat);
    console.log('chat_id from tg: ', WebApp.initDataUnsafe.chat?.id);
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

