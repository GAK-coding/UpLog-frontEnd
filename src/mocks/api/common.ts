import { DefaultBodyType, http, HttpResponse, StrictRequest } from 'msw';

export const checkAuthorization = ({
  cookies,
  request,
}: {
  cookies: Record<string, string>;
  request: StrictRequest<DefaultBodyType>;
}) => {
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

  // 인증이 성공하면 null을 반환
  return null;
};

export const common = [
  http.get('/*', () => {
    return;
  }),
  http.get('/src/*', () => {
    return;
  }),
  http.get('/node_modules/*', () => {
    return;
  }),
];
