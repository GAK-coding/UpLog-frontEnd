import { delay, http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker';
import { createProduct } from '@/mocks/api/data/product';

export const product = [
  http.get('/products', async ({ cookies, request }) => {
    const { refreshToken } = cookies;

    if (refreshToken !== 'MSW-refreshToken') {
      return new HttpResponse(null, {
        status: 410,
      });
    }

    const accessToken = request.headers.get('authorization')?.slice(7) ?? '';

    if (accessToken !== 'MSW-new-accessToken') {
      return new HttpResponse(null, {
        status: 409,
      });
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
