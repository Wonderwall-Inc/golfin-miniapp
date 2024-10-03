import {
    FriendCreateRequestType,
    FriendCreateResponseType,
    FriendDetailsResponseType,
    FriendRetrievalRequestType,
    FriendUpdateByIdRequestType,
    FriendUpdateDetailsType,
    FriendWithIdsRetrievalResponseType,
    ReferralRankingType
} from '@/type';
import api from './api';


// FRIEND CREATION
export async function createFriend(friendCreate: FriendCreateRequestType): Promise<FriendCreateResponseType | undefined> {
    try {
        api.defaults.headers.put['Content-Type'] = 'application/json'
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


export async function batchUpdateRewardClaimedBySenderId(senderId: number): Promise<FriendDetailsResponseType[] | undefined> {
    try {
        const dbFriends = await api.patch(`/friend/reward-update?sender_id=${senderId}`);

        const dbFriendsData = await dbFriends.data;
        return dbFriendsData
    } catch (error) {
        console.error('Error updating friend:', error);
        return undefined
    }
}

// GET TOTAL REFERRAL RANKING
export async function getReferralRanking(referralRankingRetrival: FriendRetrievalRequestType): Promise<ReferralRankingType | undefined> {
    try {
        const qs = []
        for (const [key, val] of Object.entries(referralRankingRetrival)) {
            if (val !== undefined && val !== null) {
                qs.push(`${key}=${encodeURIComponent(val)}`)
            }
        }
        const queryString = qs.length > 0 ? `?${qs.join('&')}` : '';

        const dbPointRanking = await api.get(`/friend/ranking/${queryString}`)
        const dbPointRankingData = await dbPointRanking.data
        return dbPointRankingData
    } catch (error) {
        console.log(error)
        return undefined
    }
}