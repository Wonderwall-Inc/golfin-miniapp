import React, { useEffect, useState } from 'react'
import WebApp from '@twa-dev/sdk';
import { PointCreateRequestType, PointType, } from '../type';
import { createPoint, getPoint, updatePoint } from '@/apis/PointServices';
import { useUserContext } from '@/contexts/UserContext';
import { PointContext } from '@/contexts/PointContext';

export const PointProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [point, setPoint] = useState<PointType | undefined>();
    const [isWaitingPoint, setIsWaitingPoint] = useState(false)

    const webappUser = WebApp.initDataUnsafe.user
    const webappStartParam = WebApp.initDataUnsafe.start_param

    const { account } = useUserContext()
    useEffect(() => {
        const pointCreation = async (pointCreatePayload: PointCreateRequestType) => {
            try {
                const newpoint = await createPoint(pointCreatePayload)
                if (newpoint !== undefined) {
                    setPoint(newpoint.point_base.point)
                    setIsWaitingPoint(false)
                    return newpoint
                } else {
                    const existingpoint = await getPoint({
                        access_token: '',
                        user_id: account?.id
                    })
                    if (existingpoint) {
                        setPoint(existingpoint.point_base.point)
                        setIsWaitingPoint(false)
                        return existingpoint
                    }
                }
            } catch (error) {
                console.log(error);
                return error
            }
        }
        if (import.meta.env.VITE_MINI_APP_ENV == 'test') {
            const mockPoint = {
                id: 1,
                amount: 1,
                extra_profit_per_hour: 1,
                created_at: '20240917',
                updated_at: '20240917',
                // app_info: {
                //     active: true,
                //     admin: false,
                //     skin: []
                // },
                // personal_info: {
                //     location: "Japan", // FIXME: change it by form later, with ENUM
                //     nationality: "Japanese" // FIXME: change it by form later, with ENUM
                // },
                // telegram_info: {
                //     pointname: 'dev',
                //     telegram_id: '11111111',
                //     token_balance: 0,
                //     premium: true,
                //     chat_id: '123' // FIXME: change it by getting the chat id from tg bot later on
                // },
                // created_at: '20240917',
                // updated_at: '20240917',
            }
            setPoint(mockPoint)
        }
        else {
            setIsWaitingPoint(true)
            if (account?.id !== undefined) {
                console.log('provider point');

                const payload = {
                    user_id: account.id,
                    access_token: '',
                    point_details: {
                        amount: 0,
                        extra_profit_per_hour: 1,
                    }
                }

                pointCreation(payload)
            }

        }
    }, [/* webappUser, webappStartParam */])

    return (
        <PointContext.Provider value={{
            point,
            setPoint,
            isWaitingPoint,
            setIsWaitingPoint
        }}>
            {children}
        </PointContext.Provider>
    );
}

