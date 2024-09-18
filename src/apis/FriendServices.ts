import {
    FriendCreateRequestType,
    FriendCreateResponseType,
    FriendDetailsType,
    FriendUpdateByIdRequestType,
    getFriendRequestType,
} from '@/type';
import api from './api';


// FRIEND CREATION
export async function createFriend(friendCreate: FriendCreateRequestType): Promise<FriendCreateResponseType | undefined> {
    try {
        api.defaults.headers.put['Content-Type'] = 'application/json'
        console.log('friendCreate');
        console.log(friendCreate);

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
export async function getFriend(getFriendRequest: getFriendRequestType): Promise<FriendDetailsType | undefined> {
    try {
        const qs = []
        for (const [key, val] of Object.entries(getFriendRequest)) {
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


// FRIEND UPDATING
export async function updateFriend(friendUpdate: FriendUpdateByIdRequestType): Promise<FriendUpdateByIdRequestType | undefined> {
    try {
        const dbFriend = await api.put('/friend/update', friendUpdate);
        const dbFriendData = await dbFriend.data;
        return dbFriendData
    } catch (error) {
        console.error('Error updating friend:', error);
        return undefined
    }
}

