// ** 타이머 분:초 구하는 함수 */
export function convertMinutes(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

  if (minutes === 0) {
    return `00:${formattedSeconds}`;
  }

  return `${minutes}:${formattedSeconds}`;
}
