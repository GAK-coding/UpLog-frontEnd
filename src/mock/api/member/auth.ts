import { http, HttpResponse } from 'msw';

export const auth = [
  http.post('/members/email-request', () => {
    console.log('여기');

    return new HttpResponse(null, {
      status: 201,
    });
  }),
  http.post('/members', async () => {
    return new HttpResponse(null, {
      status: 201,
    });
  }),
  http.get('/abc', () => {
    return new HttpResponse('hello', {
      status: 220,
    });
  }),
];
