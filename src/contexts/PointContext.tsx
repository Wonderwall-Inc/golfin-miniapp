import { createContext, useContext } from "react";
import { PointContextType, PointType } from "../type";

export const PointContext = createContext<PointContextType>({
    point: {} as PointType,
    setPoint: () => { },
    isWaitingPoint: false,
    setIsWaitingPoint: () => { },
})

export const usePointContext = () => useContext(PointContext)
