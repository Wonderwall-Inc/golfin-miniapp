export function isYesterday(date: Date): boolean {
    if (!(date instanceof Date)) {
        throw new Error('Invalid argument: you must provide a "date" instance');
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    return date.getDate() === yesterday.getDate() &&
        date.getMonth()
        === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear();

}