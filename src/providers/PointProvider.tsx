import React, { useEffect, useState } from 'react'
/* import WebApp from '@twa-dev/sdk'; */
import { /* PointCreateRequestType, */ PointType, } from '../type';
import { createPoint, getPoint } from '@/apis/PointServices';
import { useUserContext } from '@/contexts/UserContext';
import { PointContext } from '@/contexts/PointContext';

export const PointProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [point, setPoint] = useState<PointType | undefined>();
    const [isWaitingPoint, setIsWaitingPoint] = useState(false)
    const { account } = useUserContext()
    
    useEffect(() => {
        const fetchDbPointData = async (accountId: number) => {
            const existingPoint = await getPoint({ access_token: '', user_id: accountId })
            if (existingPoint) {
                setPoint(existingPoint.point_base.point)
                setIsWaitingPoint(false)
            } else {
                const newpoint = await createPoint({
                    user_id: accountId,
                    access_token: '',
                    point_details: {
                        login_amount: 0,
                        referral_amount: 0,
                        extra_profit_per_hour: 1,
                    }
                })
                if (newpoint) {
                    setPoint(newpoint.point_base.point)
                    setIsWaitingPoint(false)
                }
            }

        }
        if (import.meta.env.VITE_MINI_APP_ENV == 'test') {
            setIsWaitingPoint(true)
            setPoint({
                id: 1,
                login_amount: 0,
                referral_amount: 0,
                extra_profit_per_hour: 1,
                created_at: '2024-09-17T00:00:00',
                updated_at: '2024-09-17T00:00:00',
            })
            setIsWaitingPoint(false)
        }
        else {
            setIsWaitingPoint(true)
            if (account?.id !== undefined) {
                fetchDbPointData(account.id)
            }
        }
    }, [account])

    return (
        <PointContext.Provider value={{
            point,
            setPoint,
            isWaitingPoint,
            setIsWaitingPoint
        }}>{children}
        </PointContext.Provider>
    );
}

