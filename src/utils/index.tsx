import { format } from 'date-fns';

export function isYesterday(date: Date): boolean {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return format(date, 'yyyy-MM-dd') === format(yesterday, 'yyyy-MM-dd');
}