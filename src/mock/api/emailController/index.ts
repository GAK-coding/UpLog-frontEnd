import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker';

export const emailController = [
  http.post('/members/email-request', () => {
    return HttpResponse.json(
      {
        message: faker.string.alpha(6),
      },
      { status: 201 }
    );
  }),
];
