import { rest } from 'msw';
// eslint-disable-next-line import/prefer-default-export
export const authHandlers = [
  rest.post(`https://bravo-bfn-be.herokuapp.com/api/v1/user/login`, (req, res, ctx) => {
    const { email } = req.body;
    if (email.includes('wrong')) {
      return res(
        ctx.status(400),
        ctx.json({ Error: 'wrong email or password', status: 400 }),
        ctx.delay(100)
      );
    }
 
    return res(
      ctx.status(200),
      ctx.json({
        accessToken: 'some-access-token',
        refreshToken: 'some-refresh-token',
        message: 'User logged in successfully',
        status: 200,
      }),
      ctx.delay(100)
    );
  }),
];