import { UserCreateRequestType, UserCreateResponseType, UserFriendRankingListType, UserRetrievalRequestType, UserRetrievalResponseType, UserUpdateRequestType, UserUpdateResponseType } from '@/type';
import api from './api';

// USER CREATION
export async function createUser(userCreate: UserCreateRequestType): Promise<UserCreateResponseType | undefined> {
    try {
        api.defaults.headers.put['Content-Type'] = 'application/json'
        const dbUser = await api.post('/user/create', userCreate);
        if (dbUser.status == 500 || dbUser.status == 400) { // force user to the main page relogin again         
            return undefined
        }
        else {
            const dbUserData = await dbUser.data
            return dbUserData
        }
    } catch (error) {
        console.log(error)
        return undefined
    }

}


// USER RETRIEVAL
export async function getUser(userRetrieval: UserRetrievalRequestType): Promise<UserRetrievalResponseType | undefined> {
    try {
        const qs = []
        for (const [key, val] of Object.entries(userRetrieval)) {
            if (val !== undefined && val !== null) {
                qs.push(`${key}=${encodeURIComponent(val)}`)
            }
        }
        const queryString = qs.length > 0 ? `?${qs.join('&')}` : '';

        const dbUser = await api.get(`/user/detail/${queryString}`)
        const dbUserData = await dbUser.data
        return dbUserData
    } catch (error) {
        console.log(error)
        return undefined
    }
}

// USER EXTRA DETAILS RETRIEVAL, INCLUDING INFO FROM OTHER TABLES
export async function getUserExtraDetails(userRetrieval: UserRetrievalRequestType): Promise<UserRetrievalResponseType | undefined> {
    try {
        const qs = []
        for (const [key, val] of Object.entries(userRetrieval)) {
            if (val !== undefined && val !== null) {
                qs.push(`${key}=${encodeURIComponent(val)}`)
            }
        }
        const queryString = qs.length > 0 ? `?${qs.join('&')}` : '';

        const dbUser = await api.get(`/user/extra-detail/${queryString}`)
        const dbUserData = await dbUser.data
        return dbUserData
    } catch (error) {
        console.log(error)
        return undefined
    }
}

// FRIENDS RETRIEVAL
export const getUsers = async (skip: number = 0, limit: number = 15): Promise<[UserRetrievalResponseType] | undefined> => {
    try {
        const response = await api.get(`/user/details?skip=${skip}&limit=${limit}`);
        const dbUsersDate = await response.data
        return dbUsersDate
    } catch (error) {
        console.error('Error retrieving friends:', error);
        throw error; // Re-throw for error handling
    }
};

export const updateUser = async (userUpdate: UserUpdateRequestType): Promise<UserUpdateResponseType | undefined> => {
    try {
        const response = await api.put('/user/update', userUpdate);
        const dbUpdateUserData = await response.data
        return dbUpdateUserData
    } catch (error) {
        console.error('Error updating user:', error);
        throw error; // Re-throw for error handling
    }
};

export const getUserFriendRanking = async (sender_id: number): Promise<UserFriendRankingListType | undefined> => {
    try {
        const response = await api.get(`/user/referral-ranking?sender_id=${sender_id}`);
        const dbUserFriendRankingData = await response.data
        return dbUserFriendRankingData
    } catch (error) {
        console.error('Error retrieving user friend ranking:', error);
        throw error; // Re-throw for error handling
    }
};
