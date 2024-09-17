import { ActivityBaseType, ActivityContextType, ActivityType } from "@/type";
import { createContext, useContext } from "react";

export const ActivityContext = createContext<ActivityContextType>({
    activity: {} as ActivityBaseType,
    setActivity: () => { },
    isWaitingActivity: false,
    setIsWaitingActivity: () => { },
    isTodayCheckIn: false,
    setIsTodayCheckIn: () => { },
})

export const useActivityContext = () => useContext(ActivityContext)