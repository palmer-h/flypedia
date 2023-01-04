import { httpHandler } from '~core/apiResponseHandler';

export const authenticate = (email: string, password: string) => {
  return httpHandler.post(
    '/Auth/Login',
    { email, password },
    { headers: { Authorization: false } },
  );
};
