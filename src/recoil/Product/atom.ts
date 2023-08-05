import { atom } from 'recoil';
import { ProductInfo } from '@/typings/product.ts';

export const productOpen = atom({ key: 'productOpen', default: false });

export const productListData = atom<ProductInfo[]>({
  key: 'productList',
  default: [
    {
      id: 1,
      draggableId: '1',
      name: 'Product1',
      image: '/images/test_userprofile.png',
      master: 'master',
      client: 'client',
    },
    {
      id: 2,
      draggableId: '2',
      name: 'Product2',
      image: '/images/test_userprofile.png',
      master: 'master',
      client: 'client',
    },
    {
      id: 3,
      draggableId: '3',
      name: 'Product3',
      image: '/images/test_userprofile.png',
      master: 'master',
      client: 'client',
    },
    {
      id: 4,
      draggableId: '4',
      name: 'Product4',
      image: '/images/test_userprofile.png',
      master: 'master',
      client: 'client',
    },
    {
      id: 5,
      draggableId: '5',
      name: 'Product5',
      image: '/images/test_userprofile.png',
      master: 'master',
      client: 'client',
    },
    {
      id: 6,
      draggableId: '6',
      name: 'Product6',
      image: '/images/test_userprofile.png',
      master: 'master',
      client: 'client',
    },
  ],
});
