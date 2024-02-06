import { http } from 'msw';

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
