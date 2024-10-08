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


    const convertUTCToLocal = (utcTime: string | undefined) => {
        if (!utcTime) return undefined;
        const date = new Date(utcTime + 'Z'); // Append 'Z' to treat it as UTC
        console.log('Input UTC time:', utcTime);
        console.log('Date object created:', date.toISOString());

        const localDate = new Date(date.getTime() + 8 * 60 * 60 * 1000);
        console.log('Adjusted local date:', localDate.toISOString());

        const result = localDate.toISOString().slice(0, 19);
        console.log('Final result:', result);

        return result;
    }

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