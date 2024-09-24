import {
    PointCreateRequestType,
    PointCreateResponseType,
    PointRetrievalRequestType,
    PointRetrievalResponseType,
    PointUpdateByIdRequestType,
    PointUpdateResponseType,
} from '@/type';
import api from './api';


// POINT CREATION
export async function createPoint(pointCreate: PointCreateRequestType): Promise<PointCreateResponseType | undefined> {
    try {
        api.defaults.headers.put['Content-Type'] = 'application/json'
        const dbPoint = await api.post('/point/create', pointCreate);
        if (dbPoint.status == 500 || dbPoint.status == 400) { // force user to the main page relogin again         
            return undefined
        }
        else {
            const dbUserData = await dbPoint.data
            return dbUserData
        }
    } catch (error) {
        console.log(error)
        return undefined
    }

}

// POINT RETRIEVAL
export async function getPoint(pointRetrieval: PointRetrievalRequestType): Promise<PointRetrievalResponseType | undefined> {
    try {
        const qs = []
        for (const [key, val] of Object.entries(pointRetrieval)) {
            if (val !== undefined && val !== null) {
                qs.push(`${key}=${encodeURIComponent(val)}`)
            }
        }
        const queryString = qs.length > 0 ? `?${qs.join('&')}` : '';

        const dbPoint = await api.get(`/point/detail/${queryString}`)
        const dbPointData = await dbPoint.data
        return dbPointData
    } catch (error) {
        console.log(error)
        return undefined
    }
}


// POINT UPDATING
export async function updatePoint(pointUpdate: PointUpdateByIdRequestType): Promise<PointUpdateResponseType | undefined> {
    try { 
        const dbPoint = await api.put('/point/update', pointUpdate);
        const dbPointData = await dbPoint.data;
        return dbPointData
    } catch (error) {
        console.error('Error updating point:', error);
        return undefined
    }
}

