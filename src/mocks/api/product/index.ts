import { delay, http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker';
import { createProduct } from '@/mocks/api/data/product';
import { SaveUserInfo } from '@/typings/member.ts';

const userInfo: SaveUserInfo = sessionStorage.getItem('userInfo')!;

export const product = [
  http.get('/products', () => {
    const products = faker.helpers.multiple(createProduct, {
      count: faker.number.int({ min: 0, max: 5 }),
    });

    for (let i = 0; i < products.length; i++) {
      products[i].indexNum = i + 1;
    }

    return HttpResponse.json(products);
  }),
];
