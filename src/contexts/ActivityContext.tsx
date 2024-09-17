import { ActivityContextType, ActivityType } from "@/type";
import { createContext, useContext } from "react";

export const ActivityContext = createContext<ActivityContextType>({
    activity: {} as ActivityType,
    setActivity: () => { },
    isWaitingActivity: false,
    setIsWaitingActivity: () => { },
})

export const useActivity = () => useContext(ActivityContext)