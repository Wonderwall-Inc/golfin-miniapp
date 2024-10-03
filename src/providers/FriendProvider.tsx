import WebApp from "@twa-dev/sdk"
import { useEffect, useState } from "react"

import { getUser } from "@/apis/UserSevices"
import { getPoint, updatePoint } from "@/apis/PointServices"
import { createFriend, getFriend } from "@/apis/FriendServices"

import { FriendContext } from "@/contexts/FriendContext"
import { useUserContext } from "@/contexts/UserContext"

import { FriendRetrievalRequestType, FriendStatusType, FriendWithIdsRetrievalResponseType } from "@/type"

export const FriendProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [friend, setFriend] = useState<FriendWithIdsRetrievalResponseType | undefined>()
    const [isWaitingFriend, setIsWaitingFriend] = useState(false)
    const [friendNumber, setFriendNumber] = useState(0)
    let [friendTrigger, setFriendTrigger] = useState(0)

    const webappStartParam = WebApp.initDataUnsafe.start_param

    const { account } = useUserContext()

    useEffect(() => {
        const friendRetrieval = async (friendRetrievalPayload: FriendRetrievalRequestType) => {
            const existingFriend = await getFriend(friendRetrievalPayload)
            if (existingFriend && existingFriend.sender && existingFriend.receiver) {
                setFriend({ sender: existingFriend.sender, receiver: existingFriend.receiver })
                setFriendNumber(existingFriend.sender?.length + existingFriend.receiver?.length) // total friend with me
                if (existingFriend?.sender?.length % 10 == 0) {
                    const unclaimedFriends = existingFriend?.sender?.filter(f => !f.has_claimed)

                    if (unclaimedFriends?.length) {
                        setFriendTrigger(unclaimedFriends?.length)
                        setIsWaitingFriend(false)
                        return existingFriend
                    }
                }

                setIsWaitingFriend(false)
                return existingFriend
            }
        }

        const friendCreation = async (senderId: string, receiverId: number) => {// user has to be created before checking the friend
            const sender = await getUser({
                access_token: '',
                telegram_id: senderId
            })

            if (sender) {
                const newFriend = await createFriend({
                    access_token: '',
                    sender_id: sender?.user_details.user_base.id,
                    receiver_id: receiverId,
                    status: FriendStatusType.active,
                    has_claimed: false
                })
                if (newFriend) {// update the point for the sender, +100 == who made the invitation
                    const existingSenderPoint = await getPoint({
                        access_token: '',
                        user_id: sender?.user_details.user_base.id
                    })
                    if (existingSenderPoint) {
                        const updatedPoint = await updatePoint({
                            id: existingSenderPoint?.point_base.point.id,
                            type: 'add',
                            access_token: '',
                            point_payload: {
                                referral_amount: 100
                            },
                        });
                        if (updatedPoint && updatedPoint?.point_base.user_id) {
                            console.log("updatedPoint.point_base.point");
                            console.log(updatedPoint.point_base.point);
                            setFriend({
                                sender: [],
                                receiver: [{
                                    sender_id: newFriend.friend_details.sender_id,
                                    receiver_id: newFriend.friend_details.receiver_id,
                                    status: newFriend.friend_details.friend_base.status,
                                    has_claimed: newFriend.friend_details.friend_base.has_claimed,
                                    id: newFriend.friend_details.friend_base.id,
                                    updated_at: newFriend.friend_details.friend_base.updated_at,
                                    created_at: newFriend.friend_details.friend_base.created_at
                                }]
                            })
                            setFriendNumber(1) // friend number = sender + receiver, not only from receiver
                            setIsWaitingFriend(false)
                            return newFriend
                        }
                    }
                } else {// friendship already existed, check the friend from the current user
                    const existingFriend = await getFriend({ access_token: '', user_id: account?.id })
                    if (existingFriend && existingFriend.sender && existingFriend.receiver) {
                        setFriend({
                            sender: existingFriend.sender,
                            receiver: existingFriend.receiver
                        })
                        setFriendNumber(existingFriend.sender?.length + existingFriend.receiver?.length)
                        if (existingFriend?.sender?.length % 10 == 0) {
                            const unclaimedFriends = friend?.sender?.filter(f => !f.has_claimed)
                            if (unclaimedFriends?.length) {
                                setFriendTrigger(unclaimedFriends?.length)
                                setIsWaitingFriend(false)
                                return existingFriend
                            }
                        }
                    }
                }
            }
        }

        if (import.meta.env.VITE_MINI_APP_ENV == 'test') {
            setIsWaitingFriend(true)
            const mockFriends = []
            for (let i = 30001; i < 30011; i++) {
                mockFriends.push({
                    id: 1,
                    status: FriendStatusType.active,
                    has_claimed: false,
                    sender_id: 60001,
                    receiver_id: i,
                    updated_at: new Date().toISOString(),
                    created_at: new Date().toISOString()
                })
            }
            setFriend({
                sender: mockFriends,
                receiver: []
            })
            if (friend) {
                if (friend.sender && friend.receiver) {
                    setFriendNumber(friend?.sender?.length + friend.receiver?.length)
                    if (friend.sender.length % 10 == 0) {
                        let count = 0
                        friend.sender.forEach(f => {
                            f.has_claimed == false && count++
                        })
                        if (count == 10) {
                            setFriendTrigger(10)
                        }
                    } else {
                        window.alert(friend.sender.length % 10)
                        setFriendTrigger(friend.sender.length % 10)
                    }
                    setIsWaitingFriend(false)
                }
            }
        } else {
            setIsWaitingFriend(true)
            if (account !== undefined && account.id !== undefined) {
                if (webappStartParam !== undefined) {

                    /*  the one who make the friend request == sender */
                    friendCreation(webappStartParam, account.id)
                }
                else {
                    friendRetrieval({ access_token: '', user_id: account.id })
                }
            }
        }
    }, [account, /* webappStartParam */])

    return <FriendContext.Provider value={{
        friend,
        setFriend,
        isWaitingFriend,
        setIsWaitingFriend,
        friendNumber,
        setFriendNumber,
        friendTrigger,
        setFriendTrigger,
    }}>
        {children}
    </FriendContext.Provider>
}