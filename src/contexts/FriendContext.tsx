import { FriendBaseType, FriendContextType } from "@/type";
import { createContext, useContext } from "react";

export const FriendContext = createContext<FriendContextType>({
    friend: {} as FriendBaseType,
    setFriend: () => { },
    isWaitingFriend: false,
    setIsWaitingFriend: () => { }
})

export const useFriendContext = () => useContext(FriendContext)