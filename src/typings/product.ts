import { numberInputTheme } from '@chakra-ui/theme/dist/components/number-input';

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
  productImage: null | string;
}

export interface ProductInfo extends Omit<GetProductList, 'memberName'> {
  draggableId: string;
  image?: string;
}

export interface ProductBody {
  name: string;
  masterEmail: string;
  clientEmail: string | null;
  link: string;
  image: null | string;
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
  image: null | string;
  newName: string | null;
  memberEmailList: string[] | null;
  powerType: 'MASTER' | 'LEADER' | 'DEFAULT' | 'CLIENT' | null;
}

export interface updateResultDTO {
  duplicatedCnt: number;
  duplicatedMemberList: string[];
  failCnt: number;
  failMemberList: string[];
}
export interface ProductEditData {
  updateResultDTO: updateResultDTO | null;
}

// ReleaseNote.tsx에서 사용
export type changeType = 'NEW' | 'FEATURE' | 'CHANGED' | 'FIXED' | 'DEPRECATED';

export interface ProductMember {
  powerType: 'MASTER' | 'LEADER' | 'DEFAULT' | 'CLIENT';
  memberId: number;
  memberNickName: string;
  memberName: string;
  memberEmail: string;
  image?: string;
  // TODO: 이미지 연결 후 수정
  profile?: string | null;
  // 케밥 버튼을 위한 변수이며 프론트에서 추가해줘야됨
  isOpen?: boolean;
}
export type issueStatus = 'NEW' | 'FEATURE' | 'CHANGED' | 'FIXED' | 'DEPRECATED';

export interface ChangeLogBody {
  title: string;
  content: string;
  issueStatus: issueStatus;
}

export interface ChangeLogData {
  id: number;
  content: string;
  issueStatus: issueStatus;
  createdTime: string;
  modifiedTime: string;
  title: string;
}

export interface SaveProductInfo {
  draggableId: string;
  image: string;
  indexNum: number;
  powerType: string;
  productId: number;
  productName: string;
}
