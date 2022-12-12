import { Timestamp } from 'firebase/firestore';

export function convertSecondsToTimeStamp(date?: Timestamp): string {
  if (date) {
    const formattedDate = new Date(date.seconds * 1000);

    return `${formattedDate.toLocaleDateString()} ${formattedDate.toLocaleTimeString()}`;
  }

  return '';
}
