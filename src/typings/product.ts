export interface ProductInfo {
  id: number;
  draggableId: string;
  name: string;
  image?: string;
  // TODO : master, client type user info로 변경하기
  master: string;
  client: string;
}
