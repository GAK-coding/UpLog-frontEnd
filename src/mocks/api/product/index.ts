import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker';
import { createProduct } from '@/mocks/api/data/product';
import { checkAuthorization } from '@/mocks/api/common.ts';

export const product = [
  http.get('/products', async ({ cookies, request }) => {
    // 함수 호출
    const authCheckResult = checkAuthorization({ cookies, request });

    // 만약 인증에 실패한 경우
    if (authCheckResult !== null) {
      return authCheckResult;
    }

    const products = faker.helpers.multiple(createProduct, {
      count: faker.number.int({ min: 0, max: 5 }),
    });

    for (let i = 0; i < products.length; i++) {
      products[i].indexNum = i + 1;
    }

    return HttpResponse.json(products);
  }),
];
