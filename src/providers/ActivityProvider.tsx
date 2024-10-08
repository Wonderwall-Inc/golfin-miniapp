import { useEffect, useState } from "react";

import { useUserContext } from "@/contexts/UserContext";
import { ActivityContext } from "@/contexts/ActivityContext";

import { createActivity, getActivity } from "@/apis/ActivityServices";

import { ActivityBaseType } from "@/type";
import { mockProviderActivity } from "@/constants";

export const ActivityProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [activity, setActivity] = useState<ActivityBaseType | undefined>();
    const [isWaitingActivity, setIsWaitingActivity] = useState(false)
    const { account } = useUserContext()

    useEffect(() => {
        const fetchDbActivityData = async (accountId: number) => {
            const existingActivity = await getActivity({ access_token: '', user_id: accountId })
            if (existingActivity) {
                setActivity({
                    ...existingActivity?.activity,
                    last_login_time: convertUTCToLocal(existingActivity.activity.last_login_time),
                    last_action_time: convertUTCToLocal(existingActivity.activity.last_action_time),
                })
                setIsWaitingActivity(false)
            } else {
                const newActivity = await createActivity({
                    user_id: accountId,
                    access_token: '',
                    activity: {}
                })
                if (newActivity) {
                    setActivity(newActivity.activity)
                    setIsWaitingActivity(false)
                }
            }
        }
        if (import.meta.env.VITE_MINI_APP_ENV == 'test') {
            setIsWaitingActivity(true)
            setActivity(mockProviderActivity)
            setIsWaitingActivity(false)
        }
        else {
            setIsWaitingActivity(true)
            if (account?.id !== undefined) {
                fetchDbActivityData(account.id)
            }
        }
    }, [account])

    console.log(activity);
    const convertUTCToLocal = (utcTime: string | undefined) => {
        if (!utcTime) return undefined;
        const date = new Date(utcTime);
        return date.toLocaleString(undefined, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        });
    }
    return (
        <ActivityContext.Provider value={{
            activity,
            setActivity,
            isWaitingActivity,
            setIsWaitingActivity
        }}>{children}
        </ActivityContext.Provider>
    )
}