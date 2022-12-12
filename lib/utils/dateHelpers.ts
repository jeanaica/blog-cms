export function isToday(date: string) {
  const today = new Date();
  const compareDate = new Date(date);

  if (today.toDateString() === compareDate.toDateString()) {
    return true;
  }

  return false;
}
