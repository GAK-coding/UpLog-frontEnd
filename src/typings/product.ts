export interface Product {
  id: number;
  name: string;
  company: string;
}

export interface GetProductList {
  productId: number;
  productName: string;
  memberName: string;
  powerType: 'MASTER' | 'LEADER' | 'DEFAULT' | 'CLIENT';
  indexNum: number;
}

export interface ProductInfo extends Omit<GetProductList, 'memberName'> {
  draggableId: string;
  image?: string;
  // TODO : master, client type user info로 변경하기
  // masterEmail: string;
  // client: string;
}

export interface ProductBody {
  name: string;
  masterEmail: string;
  link: string;
}
export interface FailProduct {
  httpStatus: 'NOT_FOUND' | 'FORBIDDEN';
  message: '해당 이메일로 존재하는 객체를 찾을 수 없습니다.' | '제품 생성 권한이 없습니다.';
}

export interface ProductsData extends Product {
  teamId: number;
  projectListId: number[];
}

// export interface MemberProductData extends Pick<ProductData, 'id' | 'name' >

export interface ProductEditBody {
  link: string | null;
  newName: string | null;
  memberEmailList: string[] | null;
  powerType: 'MASTER' | 'LEADER' | 'DEFAULT' | 'CLIENT' | null;
}

export interface ProductEditData {
  memberPowerListDTO: { poductId: number; productName: 'newProductName1' };
}

// ReleaseNote.tsx에서 사용
export type changeType = 'Feature' | 'Changed' | 'Deprecated' | 'New' | 'Fixed';

export interface changeLog {
  type: changeType;
  content: string;
}

export interface Release {
  status: string;
  version: string;
  date: string;
  contents: changeLog[];
}

export interface ProductMember {
  position: 'master' | 'leader' | 'member';
  profile: string | null;
  nickName: string;
  name: string;
  email: string;
  id: number;
  // 케밥 버튼을 위한 변수이며 프론트에서 추가해줘야됨
  isOpen: boolean;
}
