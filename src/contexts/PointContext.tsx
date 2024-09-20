import { createContext, useContext } from "react";
import { PointContextType, PointType } from "../type";
import { boolean } from "@telegram-apps/sdk";

export const PointContext = createContext<PointContextType>({
    point: {} as PointType,
    setPoint: () => { },
    isWaitingPoint: false,
    setIsWaitingPoint: () => { },
    canClaim: {} as boolean,
    setCanClaim: () => { }
})

export const usePointContext = () => useContext(PointContext)
