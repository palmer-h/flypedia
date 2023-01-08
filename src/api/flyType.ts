import { httpHandler } from '~core/httpHandler';

export interface FlyType {
  id: number;
  name: string;
}

export const index = () => {
  return httpHandler.get('/FlyTypes', { headers: { Authorization: false } });
};
