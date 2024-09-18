import { UserCreateRequestType, UserCreateResponseType, UserRetrievalRequestType, UserRetrievalResponseType } from '@/type';
import api from './api';

// USER CREATION
export async function createUser(userCreate: UserCreateRequestType): Promise<UserCreateResponseType | undefined> {
    try {
        api.defaults.headers.put['Content-Type'] = 'application/json'
        console.log('userCreate');
        console.log(userCreate);

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

// FRIENDS RETRIEVAL
export const getUsers = async (skip: number = 0, limit: number = 15): Promise<[UserRetrievalResponseType] | undefined> => {
    try {
        const response = await api.get(
            `/user/details?skip=${skip}&limit=${limit}`
        );
        return response.data;
    } catch (error) {
        console.error('Error retrieving friends:', error);
        throw error; // Re-throw for error handling
    }
};
