import { Timestamp } from 'firebase/firestore';

export function convertToDate(date: number) {
  const formattedDate = new Date(date);

  return formattedDate;
}

export function convertSecondsToTimeStamp(date?: Timestamp): string {
  if (date) {
    const formattedDate = convertToDate(date.seconds * 1000);

    const newDate = `${formattedDate.toLocaleDateString()} ${formattedDate.toLocaleTimeString()}`;

    return newDate;
  }

  return '';
}

export function convertTimeStampToForm(date?: Timestamp): string {
  if (date) {
    const formattedDate = convertToDate(date.seconds * 1000);

    const newDate = `${formattedDate.toLocaleDateString()} ${formattedDate.toLocaleTimeString()}`;

    return new Date(newDate).toISOString().slice(0, 10);
  }

  return '';
}

export function convertTimeStampToDate(date?: Timestamp): string {
  if (date) {
    const formattedDate = convertToDate(date.seconds * 1000);

    return formattedDate.toLocaleDateString();
  }

  return '';
}

export function getTodayFormValue() {
  const formattedDate = new Date().toISOString().slice(0, 10);

  return formattedDate;
}
