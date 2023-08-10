import { atom } from 'recoil';
import { ProductInfo, ProductMember } from '@/typings/product.ts';

export const productOpen = atom({ key: 'productOpen', default: false });

export const productListData = atom<ProductInfo[]>({
  key: 'productList',
  default: [
    {
      id: 1,
      draggableId: '1',
      name: 'Product1',
      image: '/images/test_userprofile.png',
      masterEmail: 'master',
      client: 'client',
    },
    {
      id: 2,
      draggableId: '2',
      name: 'Product2',
      image: '/images/test_userprofile.png',
      masterEmail: 'master',
      client: 'client',
    },
    {
      id: 3,
      draggableId: '3',
      name: 'Product3',
      image: '/images/test_userprofile.png',
      masterEmail: 'master',
      client: 'client',
    },
    {
      id: 4,
      draggableId: '4',
      name: 'Product4',
      image: '/images/test_userprofile.png',
      masterEmail: 'master',
      client: 'client',
    },
    {
      id: 5,
      draggableId: '5',
      name: 'Product5',
      image: '/images/test_userprofile.png',
      masterEmail: 'master',
      client: 'client',
    },
    {
      id: 6,
      draggableId: '6',
      name: 'Product6',
      image: '/images/test_userprofile.png',
      masterEmail: 'master',
      client: 'client',
    },
  ],
});

export const productMemberList = atom<ProductMember[]>({
  key: 'productMemberList',
  default: [
    {
      position: 'master',
      profile: null,
      nickName: 'Crong',
      name: '권오현',
      email: 'qhslsl@gmail.com',
      id: 1,
      isOpen: false,
    },
    {
      position: 'leader',
      profile: 'https://tech.cloudmt.co.kr/2023/02/27/juunini-why-argo/images/argo.webp',
      nickName: 'OCI',
      name: '오채영',
      email: '1234@gmail.com',
      id: 2,
      isOpen: false,
    },
    {
      position: 'leader',
      profile: 'https://tech.cloudmt.co.kr/2023/02/27/juunini-why-argo/images/argo.webp',
      nickName: 'Argo',
      name: '박은령',
      email: 'q123124@gmail.com',
      id: 3,

      isOpen: false,
    },
    {
      position: 'member',
      profile:
        'https://w7.pngwing.com/pngs/276/1019/png-transparent-sid-sloth-scrat-ice-age-the-sloth-buckle-free-thumbnail.png',
      nickName: '젠킨스',
      name: '장준',
      email: '123124@gmail.com',
      id: 4,

      isOpen: false,
    },
    {
      position: 'member',
      profile:
        'https://w7.pngwing.com/pngs/276/1019/png-transparent-sid-sloth-scrat-ice-age-the-sloth-buckle-free-thumbnail.png',
      nickName: '나무늘보',
      name: '김윤정',
      email: 'fasfs@gmail.com',
      id: 5,
      isOpen: false,
    },
    // {
    //   position: 'member',
    //   profile:
    //     'https://w7.pngwing.com/pngs/276/1019/png-transparent-sid-sloth-scrat-ice-age-the-sloth-buckle-free-thumbnail.png',
    //   nickName: '젠킨스',
    //   name: '장준',
    //   email: '1231124@gmail.com',
    //   isOpen: false,
    // },
    // {
    //   position: 'member',
    //   profile:
    //     'https://w7.pngwing.com/pngs/276/1019/png-transparent-sid-sloth-scrat-ice-age-the-sloth-buckle-free-thumbnail.png',
    //   nickName: '나무늘보',
    //   name: '김윤정',
    //   email: 'faskas@gmail.com',
    //   isOpen: false,
    // },
    // {
    //   position: 'member',
    //   profile:
    //     'https://w7.pngwing.com/pngs/276/1019/png-transparent-sid-sloth-scrat-ice-age-the-sloth-buckle-free-thumbnail.png',
    //   nickName: '젠킨스',
    //   name: '장준',
    //   email: '23123124@gmail.com',
    //   isOpen: false,
    // },
    // {
    //   position: 'member',
    //   profile:
    //     'https://w7.pngwing.com/pngs/276/1019/png-transparent-sid-sloth-scrat-ice-age-the-sloth-buckle-free-thumbnail.png',
    //   nickName: '나무늘보',
    //   name: '김윤정',
    //   email: 'faslkas@gmail.com',
    //   isOpen: false,
    // },
    // {
    //   position: 'member',
    //   profile:
    //     'https://w7.pngwing.com/pngs/276/1019/png-transparent-sid-sloth-scrat-ice-age-the-sloth-buckle-free-thumbnail.png',
    //   nickName: '젠킨스',
    //   name: '장준',
    //   email: '12123124@gmail.com',
    //   isOpen: false,
    // },
    // {
    //   position: 'member',
    //   profile:
    //     'https://w7.pngwing.com/pngs/276/1019/png-transparent-sid-sloth-scrat-ice-age-the-sloth-buckle-free-thumbnail.png',
    //   nickName: '나무늘보',
    //   name: '김윤정',
    //   email: 'fasflks@gmail.com',
    //   isOpen: false,
    // },
  ],
});
