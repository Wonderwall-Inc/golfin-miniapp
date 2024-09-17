import { createContext, useContext } from "react";
import { UserContextType, UserType } from "../type";


export const UserContext = createContext<UserContextType>({
    account: {} as UserType,
    setAccount: () => { },
    isWaitingUser: false,
    setIsWaitingUser: () => { },
})

export const useUserContext = () => useContext(UserContext)

