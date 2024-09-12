import { UserCreateRequestType, UserCreateResponseType, UserRetrievalRequestType, UserRetrievalResponseType } from '@/type';
import api from './api';

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