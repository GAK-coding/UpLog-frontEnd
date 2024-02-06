import { http, HttpResponse } from 'msw';
import { SignUpInfo } from '@/typings/member.ts';
import { faker } from '@faker-js/faker';

export const auth = [
  http.post('/members', async (info) => {
    const infos: SignUpInfo = await info.request.json();

    if (infos.email === 'abc@gmail.com') {
      return HttpResponse.json(
        { httpStatus: 'CONFLICT', message: '이미 존재하는 회원입니다.' },
        { status: 200 }
      );
    }

    return HttpResponse.json({ ...infos, image: null, id: faker.number.int() }, { status: 201 });
  }),
];
