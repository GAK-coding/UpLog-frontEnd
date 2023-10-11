import { rest } from 'msw';

export const auth = [
  rest.get('test', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json('하이'));
  }),
];
