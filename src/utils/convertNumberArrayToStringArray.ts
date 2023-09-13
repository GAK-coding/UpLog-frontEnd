export function convertNumberArrayToStringArray(numbers: number[]): string[] {
  // 배열의 각 요소를 문자열로 변환하여 새로운 배열을 생성합니다.
  const strings: string[] = numbers.map((number) => number.toString());
  return strings;
}
