import { Timestamp } from 'firebase/firestore';

export function convertSecondsToTimeStamp(date?: Timestamp) {
  if (date) {
    const formattedDate = new Date(date.toDate());

    return `${formattedDate.toLocaleDateString()} ${formattedDate.toLocaleTimeString()}`;
  }

  return '';
}
