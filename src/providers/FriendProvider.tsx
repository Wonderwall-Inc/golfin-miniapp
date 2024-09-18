import { createFriend, getFriend, } from "@/apis/FriendServices"
import { getUser } from "@/apis/UserSevices"
import { FriendContext } from "@/contexts/FriendContext"
import { useUserContext } from "@/contexts/UserContext"
import { FriendCreateRequestType, FriendRetrievalRequestType, FriendStatusType, FriendWithIdsRetrievalResponseType, getFriendRequestType } from "@/type"
import WebApp from "@twa-dev/sdk"
import { useEffect, useState } from "react"

export const FriendProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [friend, setFriend] = useState<FriendWithIdsRetrievalResponseType | undefined>()
    const [isWaitingFriend, setIsWaitingFriend] = useState(false)
    const [friendNumber, setFriendNumber] = useState(0)
    const [friendTrigger, setFriendTrigger] = useState(0)
    let [notYetClaimRewardReferral, setNotYetClaimRewardReferral] = useState(0)

    const webappUser = WebApp.initDataUnsafe.user
    const webappStartParam = WebApp.initDataUnsafe.start_param

    const { account } = useUserContext()

    useEffect(() => {
        const friendRetrieval = async (friendRetrievalPayload: FriendRetrievalRequestType) => {
            const existingFriend = await getFriend(friendRetrievalPayload)
            console.log('existingFriend on retrieve friend');
            console.log(existingFriend);

            if (existingFriend && existingFriend.sender && existingFriend.receiver) {
                setFriend({ sender: existingFriend.sender, receiver: existingFriend.receiver })
                setFriendNumber(existingFriend.sender?.length + existingFriend.receiver?.length)
                setFriendTrigger(existingFriend.sender?.length)

                let count = 0
                // FIXME:
                existingFriend.sender.forEach(s => {
                    if (s.custom_logs !== undefined) {
                        count++
                    }
                })
                setNotYetClaimRewardReferral(count)
                setIsWaitingFriend(false)
                return existingFriend
            }
        }

        const friendCreation = async (senderId: string, friendCreatePayload: FriendCreateRequestType) => {
            const sender = await getUser({
                access_token: '',
                telegram_id: senderId
            })

            if (sender)
                friendCreatePayload.sender_id = sender.user_details.user_base.id

            const newFriend = await createFriend(friendCreatePayload)
            if (newFriend !== undefined) {
                setFriend({
                    sender: [],
                    receiver: [{
                        sender_id: newFriend.friend_details.sender_id,
                        receiver_id: newFriend.friend_details.receiver_id,
                        status: newFriend.friend_details.friend_base.status,
                        id: newFriend.friend_details.friend_base.id,
                        updated_at: newFriend.friend_details.friend_base.updated_at,
                        created_at: newFriend.friend_details.friend_base.created_at,
                    }]
                })
                setFriendNumber(1)
                setIsWaitingFriend(false)
                return newFriend
            } else {
                const existingFriend = await getFriend({ access_token: '', user_id: account?.id })
                console.log('existingFriend');
                console.log(existingFriend);

                if (existingFriend && existingFriend.sender && existingFriend.receiver) {
                    setFriend({
                        sender: existingFriend.sender,
                        receiver: existingFriend.receiver
                    })
                    setFriendNumber(existingFriend.sender?.length + existingFriend.receiver?.length)
                    setFriendTrigger(existingFriend.sender?.length)
                    setIsWaitingFriend(false)
                    return existingFriend
                }
            }
        }

        if (import.meta.env.VITE_MINI_APP_ENV == 'test') {
            setIsWaitingFriend(true)
            setFriend({
                sender: [{
                    id: 1,
                    status: FriendStatusType.active,
                    sender_id: 60001,
                    receiver_id: 30001,
                    updated_at: new Date().toISOString(),
                    created_at: new Date().toISOString(),
                }],
                receiver: []
            })
            setFriendNumber(1)
            setFriendTrigger(1)
            setIsWaitingFriend(false)
        } else {
            setIsWaitingFriend(true)
            if (account?.id !== undefined && webappStartParam !== undefined) {
                console.log('provider friend');
                const friendPayload = {
                    access_token: '',
                    sender_id: 0,
                    receiver_id: account?.id,
                    status: FriendStatusType.active
                }
                /*  the one who make the friend request == sender */
                friendCreation(webappStartParam, friendPayload)
            } else {
                console.log('calling friend Retrieval');

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
        notYetClaimRewardReferral, setNotYetClaimRewardReferral
    }}>
        {children}
    </FriendContext.Provider>
}