import { rest } from 'msw';

const loginHandler = rest.post(
  `${process.env.REACT_APP_API_URL}/auth/login`,
  async (_req, res, ctx) =>
    res(
      ctx.json({
        access_token: 'accesstokenfortests'
      })
    )
);

const profileHandler = rest.get(
  `${process.env.REACT_APP_API_URL}/users/me`,
  async (_req, res, ctx) => res(ctx.json({}))
);
export const handlers = [loginHandler, profileHandler];
