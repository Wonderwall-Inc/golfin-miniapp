import {
    FriendCreateRequestType,
    FriendCreateResponseType,
    FriendDetailsResponseType,
    FriendDetailsType,
    FriendRetrievalRequestType,
    FriendUpdateByIdRequestType,
    FriendUpdateDetailsType,
    FriendWithIdsRetrievalResponseType,
    getFriendRequestType,
} from '@/type';
import api from './api';


// FRIEND CREATION
export async function createFriend(friendCreate: FriendCreateRequestType): Promise<FriendCreateResponseType | undefined> {
    try {
        api.defaults.headers.put['Content-Type'] = 'application/json'
        // console.log('friendCreate');
        // console.log(friendCreate);

        const dbFriend = await api.post('/friend/create', friendCreate);
        if (dbFriend.status == 500 || dbFriend.status == 400) { // force user to the main page relogin again         
            return undefined
        }
        else {
            const dbUserData = await dbFriend.data
            return dbUserData
        }
    } catch (error) {
        console.log(error)
        return undefined
    }

}

// FRIEND RETRIEVAL
export async function getFriend(friendRetrieval: FriendRetrievalRequestType): Promise<FriendWithIdsRetrievalResponseType | undefined> {
    try {
        const qs = []
        for (const [key, val] of Object.entries(friendRetrieval)) {
            if (val !== undefined && val !== null) {
                qs.push(`${key}=${encodeURIComponent(val)}`)
            }
        }
        const queryString = qs.length > 0 ? `?${qs.join('&')}` : '';

        const dbFriend = await api.get(`/friend/detail/${queryString}`)
        const dbFriendData = await dbFriend.data
        return dbFriendData
    } catch (error) {
        console.log(error)
        return undefined
    }
}


// FRIENDS RETRIEVAL
export const getFriends = async (user_ids: number[], skip: number = 0, limit: number = 15) => {
    try {
        const response = await api.get(
            `/friends/details?user_ids=${user_ids.join(',')}&skip=${skip}&limit=${limit}`
        );
        return response.data;
    } catch (error) {
        console.error('Error retrieving friends:', error);
        throw error; // Re-throw for error handling
    }
};


// FRIEND UPDATING
export async function updateFriend(friendUpdate: FriendUpdateByIdRequestType): Promise<FriendUpdateDetailsType | undefined> {
    try {
        const dbFriend = await api.put('/friend/update', friendUpdate);
        const dbFriendData = await dbFriend.data;
        return dbFriendData
    } catch (error) {
        console.error('Error updating friend:', error);
        return undefined
    }
}


export async function batchUpdateRewardClaimedBySenderIds(senderIds: number[]): Promise<FriendDetailsResponseType[] | undefined> {
    try {
        const dbFriends = await api.put(`/friend/reward-update?sender_ids=${senderIds.join(',')}`);
        const dbFriendsData = await dbFriends.data;
        return dbFriendsData
    } catch (error) {
        console.error('Error updating friend:', error);
        return undefined
    }
}

