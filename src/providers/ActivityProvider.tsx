import { ActivityBaseType, ActivityCreateRequestType } from "@/type";
import { useEffect, useState } from "react";
import { ActivityContext } from "@/contexts/ActivityContext";
import { useUserContext } from "@/contexts/UserContext";
import { createActivity, getActivity, updateActivity } from "@/apis/ActivityServices";

export const ActivityProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [activity, setActivity] = useState<ActivityBaseType | undefined>();
    const [isWaitingActivity, setIsWaitingActivity] = useState(false)
    // const [rewardNotYetClaimed, setRewardNotYetClaimed] = useState(true) //logged_in = True
    const { account } = useUserContext()

    useEffect(() => {
        const activityCreation = async (activityCreatePayload: ActivityCreateRequestType) => {
            try {
                const newActivity = await createActivity(activityCreatePayload)
                if (newActivity) {
                    setActivity(newActivity.activity)
                    setIsWaitingActivity(false)
                    return newActivity
                } else {
                    const existingActivity = await getActivity({
                        access_token: '',
                        user_id: account?.id
                    })
                    if (existingActivity) {
                        setActivity(existingActivity.activity)
                        setIsWaitingActivity(false)
                        return existingActivity
                    }
                }
            } catch (error) {
                console.log(error)
                return error
            }
        }
        if (import.meta.env.VITE_MINI_APP_ENV == 'test') {
            setIsWaitingActivity(true)
            setActivity({
                id: 1,
                logged_in: true,
                login_streak: 1,
                total_logins: 1,
                last_action_time: '2024-09-17T00:00:00',
                last_login_time: '2024-09-17T00:00:00',
                created_at: '2024-09-17T00:00:00',
                updated_at:'2024-09-17T00:00:00',
            })
            setIsWaitingActivity(false)
        }
        else {
            setIsWaitingActivity(true)
            if (account?.id !== undefined) {
                const payload = {
                    user_id: account.id,
                    access_token: '',
                    activity: {}
                }
                activityCreation(payload)
            }

        }
    }, [account])

    return (
        <ActivityContext.Provider value={{
            activity,
            setActivity,
            isWaitingActivity,
            setIsWaitingActivity,
            // isTodayCheckedIn,
            // setIsTodayCheckedIn
        }}>
            {children}
        </ActivityContext.Provider>
    )
}