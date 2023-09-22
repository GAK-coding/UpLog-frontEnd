export interface MenuInfo {
  id: number;
  menuName: string;
  noticePostId: number;
}

export interface FailMenu {
  httpStatus: string;
  message: string;
}
export interface SelectMenu {
  value: string;
  label: string;
}
