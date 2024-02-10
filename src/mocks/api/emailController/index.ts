import { delay, http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker';

export const emailController = [
  http.post('/members/email-request', async () => {
    return HttpResponse.json(
      {
        message: 'abcdef',
      },
      { status: 201 }
    );
  }),
];
