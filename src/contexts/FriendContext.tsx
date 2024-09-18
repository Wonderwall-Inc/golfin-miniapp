import { FriendBaseType, FriendContextType, FriendWithIdsRetrievalResponseType } from "@/type";
import { createContext, useContext } from "react";

export const FriendContext = createContext<FriendContextType>({
    friend: {} as FriendWithIdsRetrievalResponseType,
    setFriend: () => { },
    isWaitingFriend: {} as boolean,
    setIsWaitingFriend: () => { },
    friendNumber: {} as number,
    setFriendNumber: () => { },
    friendTrigger: {} as number,
    setFriendTrigger: () => { },
    notYetClaimRewardReferral: {} as number,
    setNotYetClaimRewardReferral: () => { },
})

export const useFriendContext = () => useContext(FriendContext)