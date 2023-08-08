// ** 진행 전,중,후 상태로 변환하기 위한 함수 */

export function formatStatus(status: string): string {
  if (status === 'PROGRESS_BEFORE') {
    return '진행 전';
  } else if (status === 'PROGRESS_IN') {
    return '진행 중';
  }

  return '진행 후';
}
