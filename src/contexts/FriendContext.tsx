import { FriendBaseType, FriendContextType, FriendWithIdsRetrievalResponseType } from "@/type";
import { createContext, useContext } from "react";

export const FriendContext = createContext<FriendContextType>({
    friend: {} as FriendWithIdsRetrievalResponseType,
    setFriend: () => { },
    isWaitingFriend: false,
    setIsWaitingFriend: () => { }
})

export const useFriendContext = () => useContext(FriendContext)