import { http, HttpResponse } from 'msw';

export const emailController = [
  http.post('/members/email-request', async ({ request }) => {
    const { email, type } = (await request.json()) as { email: string; type: number };

    if (type === 0) {
      return HttpResponse.json({
        message: 'abcdef',
      });
    } else if (type === 1) {
      if (email === 'abc@gmail.com') {
        return HttpResponse.json({
          message: '해당 이메일은 존재하지 않습니다.',
        });
      }
      return HttpResponse.json({
        message: '이메일에 임시 비밀번호가 전송되었습니다.',
      });
    }
  }),
];
