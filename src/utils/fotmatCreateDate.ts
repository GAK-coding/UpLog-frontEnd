export function formatCreateDate(date: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'Asia/Seoul',
  };

  const formattedDate = new Date(date).toLocaleString('ko-KR', options);

  return formattedDate;
}
