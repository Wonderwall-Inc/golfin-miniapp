import React, { createContext, useContext } from "react";
import { AccountType, UserContextType, UserType } from "../type";


export const UserContext = createContext<UserContextType>({
    account: {} as UserType | AccountType,
    setAccount: () => { }
})

export const useUserContext = () => useContext(UserContext)

