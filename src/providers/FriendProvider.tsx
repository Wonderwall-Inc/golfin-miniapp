import { createFriend, getFriend, } from "@/apis/FriendServices"
import { getPoint, updatePoint } from "@/apis/PointServices"
import { getUser } from "@/apis/UserSevices"
import { FriendContext } from "@/contexts/FriendContext"
import { usePointContext } from "@/contexts/PointContext"
import { useUserContext } from "@/contexts/UserContext"
import { FriendCreateRequestType, FriendRetrievalRequestType, FriendStatusType, FriendWithIdsRetrievalResponseType, getFriendRequestType } from "@/type"
import WebApp from "@twa-dev/sdk"
import { useEffect, useState } from "react"

export const FriendProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [friend, setFriend] = useState<FriendWithIdsRetrievalResponseType | undefined>()
    const [isWaitingFriend, setIsWaitingFriend] = useState(false)
    const [friendNumber, setFriendNumber] = useState(0)
    let [friendTrigger, setFriendTrigger] = useState(0)

    const webappUser = WebApp.initDataUnsafe.user
    const webappStartParam = WebApp.initDataUnsafe.start_param

    const { account } = useUserContext()

    useEffect(() => {
        const friendRetrieval = async (friendRetrievalPayload: FriendRetrievalRequestType) => {
            const existingFriend = await getFriend(friendRetrievalPayload)
            if (existingFriend && existingFriend.sender && existingFriend.receiver) {
                setFriend({ sender: existingFriend.sender, receiver: existingFriend.receiver })
                setFriendNumber(existingFriend.sender?.length + existingFriend.receiver?.length) // total friend with me
                setFriend({
                    sender: existingFriend.sender,
                    receiver: existingFriend.receiver
                })
                setFriendNumber(existingFriend.sender?.length + existingFriend.receiver?.length)
                if (existingFriend?.sender?.length % 10 == 0) {
                    // friend?.sender?.forEach(f => {
                    //     f.has_claimed == false && setFriendTrigger(friendTrigger += 1)
                    // })
                    console.log(friend?.sender);

                    const unclaimedFriends = existingFriend?.sender?.filter(f => f.has_claimed == false)
                    console.log(unclaimedFriends);

                    if (unclaimedFriends?.length) {
                        console.log(unclaimedFriends);
                        console.log('trigger get friend on provider');
                        console.log(friendTrigger);

                        setFriendTrigger(unclaimedFriends?.length)
                        setIsWaitingFriend(false)
                        return existingFriend
                    }


                    // setFriendTrigger(existingFriend.sender?.length)
                    // setIsWaitingFriend(false)
                    // return existingFriend
                }
                // if (existingFriend.sender.length % 10 == 0) {
                //     existingFriend.sender.forEach(f => {

                //     })
                // } else {
                //     setFriendTrigger(existingFriend.sender.length % 10) // total number of sender which made the friend request
                // }

                setIsWaitingFriend(false)
                return existingFriend
            }
        }

        const friendCreation = async (senderId: string, receiverId: number) => {
            // user has to be created before checking the friend
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
                if (newFriend) {
                    // update the point for the sender, +100 == who made the invitation
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
                                    created_at: newFriend.friend_details.friend_base.created_at,
                                }]
                            })
                            setFriendNumber(1)
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
                    created_at: new Date().toISOString(),
                })
            }
            setFriend({
                sender: mockFriends,
                receiver: []
            })
            console.log(friend);

            if (friend?.sender && friend.receiver) {
                setFriendNumber(friend?.sender?.length + friend.receiver?.length)
                if (friend.sender.length % 10 == 0) {
                    let count = 0
                    friend.sender.forEach(f => {
                        f.has_claimed == false && count++
                    })
                    if (count == 10) {
                        // do the point update the point context update
                        // if (point?.referral_amount) {
                        //     setPoint({
                        //         id: 1,
                        //         login_amount: 0,
                        //         referral_amount: point?.referral_amount + 3000,
                        //         extra_profit_per_hour: 1,
                        //         created_at: '2024-09-17T00:00:00',
                        //         updated_at: '2024-09-17T00:00:00',
                        //     })
                        //     friend.sender.forEach(f => {
                        //         f.has_claimed == true
                        //     })
                        //     window.alert('update friend sender')
                        //     console.log(friend.sender);
                        //     setFriendTrigger(0)
                        // }
                        setFriendTrigger(10)
                    }
                } else {
                    window.alert(friend.sender.length % 10)
                    setFriendTrigger(friend.sender.length % 10)
                }
                setIsWaitingFriend(false)
            }
        } else {
            setIsWaitingFriend(true)
            if (account?.id !== undefined && webappStartParam !== undefined) {
                // console.log('provider friend');
                const friendPayload = {
                    access_token: '',
                    sender_id: 0,
                    receiver_id: account?.id,
                    status: FriendStatusType.active
                }
                /*  the one who make the friend request == sender */
                // friendCreation(webappStartParam, friendPayload)
                friendCreation(webappStartParam, account?.id)
            } else {
                // console.log('calling friend Retrieval');

                friendRetrieval({ access_token: '', user_id: account?.id })
            }
        }
    }, [account, webappStartParam])

    return <FriendContext.Provider value={{
        friend,
        setFriend,
        isWaitingFriend,
        setIsWaitingFriend,
        friendNumber, setFriendNumber,
        friendTrigger, setFriendTrigger,
        // notYetClaimRewardReferral, setNotYetClaimRewardReferral
    }}>
        {children}
    </FriendContext.Provider>
}