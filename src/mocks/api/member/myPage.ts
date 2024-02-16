import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker';
import { decrypt } from '@/utils/crypto.ts';
import { EditPassword, NewUserInfo, UserInfo } from '@/typings/member.ts';
import { checkAuthorization } from '@/mocks/api/common.ts';

const getUserInfo = decrypt(sessionStorage.getItem('userInfo'));
const userInfo: UserInfo = getUserInfo ? JSON.parse(getUserInfo) : {};

export const myPage = [
  http.post('/storages/upload', ({ cookies, request }) => {
    // 함수 호출
    const authCheckResult = checkAuthorization({ cookies, request });

    // 만약 인증에 실패한 경우
    if (authCheckResult !== null) {
      return authCheckResult;
    }

    return HttpResponse.json({ url: faker.image.url() });
  }),
  http.patch('/members/information', async ({ cookies, request }) => {
    // 함수 호출
    const authCheckResult = checkAuthorization({ cookies, request });

    // 만약 인증에 실패한 경우
    if (authCheckResult !== null) {
      return authCheckResult;
    }

    const info = (await request.json()) as unknown as NewUserInfo;

    return HttpResponse.json({
      id: userInfo.id,
      image: info.image === 'delete' ? null : info.image ? info.image : userInfo.image,
      name: info.newName ? info.newName : userInfo.name,
      nickname: info.newNickname ? info.newNickname : userInfo.nickname,
    });
  }),
  http.patch('/members/password', async ({ cookies, request }) => {
    // 함수 호출
    const authCheckResult = checkAuthorization({ cookies, request });

    // 만약 인증에 실패한 경우
    if (authCheckResult !== null) {
      return authCheckResult;
    }

    const info = (await request.json()) as unknown as EditPassword;

    if (info.password === '1234') {
      return HttpResponse.json({
        httpStatus: 'CONFLICT',
        message: '비밀번호가 일치하지 않습니다.',
      });
    }

    return HttpResponse.json({
      id: userInfo.id,
      name: userInfo.name,
      nickname: userInfo.nickname,
    });
  }),
  http.delete('/members', async ({ cookies, request }) => {
    // 함수 호출
    const authCheckResult = checkAuthorization({ cookies, request });

    // 만약 인증에 실패한 경우
    if (authCheckResult !== null) {
      return authCheckResult;
    }

    const info = (await request.json()) as unknown as { password: string };

    if (info.password === '1234') {
      return HttpResponse.json({
        httpStatus: 'CONFLICT',
        message: '비밀번호가 일치하지 않습니다.',
      });
    }

    return HttpResponse.json({
      message: '계정이 삭제되었습니다.',
    });
  }),
];
