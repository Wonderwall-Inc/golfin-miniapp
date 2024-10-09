import { format } from 'date-fns';
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc);
dayjs.extend(timezone);

export function isYesterday(date: Date): boolean {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    return format(date, 'yyyy-MM-dd') === format(yesterday, 'yyyy-MM-dd');
}


export function sgTimeNow() {
    const d = new Date();
    const localTime = d.getTime();
    const localOffset = d.getTimezoneOffset() * 60000;
    const utc = localTime + localOffset;
    const offset = +8; // Singapore time
    const singaporeTimeoffset = utc + (3600000 * offset);
    const sgTimeNow = new Date(singaporeTimeoffset)
    const sgTimeNowString = `${sgTimeNow.getFullYear()}-${sgTimeNow.getUTCMonth() + 1 < 10 ? `0${sgTimeNow.getMonth() + 1}` : sgTimeNow.getMonth() + 1}-${sgTimeNow.getDate()}T${sgTimeNow.getHours() < 10 ? `0${sgTimeNow.getHours()}` : sgTimeNow.getHours()}:${sgTimeNow.getMinutes() < 10 ? `0${sgTimeNow.getMinutes()}` : sgTimeNow.getMinutes()}:${sgTimeNow.getSeconds() < 10 ? `0${sgTimeNow.getSeconds()}` : sgTimeNow.getSeconds()}`    
    return sgTimeNowString

}

export const sgTimeNowByDayJs = () => {
    return dayjs().tz("Asia/Singapore").format('YYYY-MM-DDTHH:mm:ss');
}

export const convertUTCToLocal = (utcTime: string | undefined) => {
    if (!utcTime) return undefined;
    const date = new Date(utcTime + 'Z'); // Append 'Z' to treat it as UTC
    const localDate = new Date(date.getTime() + 8 * 60 * 60 * 1000);
    const result = localDate.toISOString().slice(0, 19);
    return result;
}
