import React, { createContext, useContext } from "react";
import { AccountType, UserContextType } from "../type";


export const UserContext = createContext<UserContextType>({
    account: {} as AccountType,
    setAccount: () => { }
})

export const useUserContext = () => useContext(UserContext)

