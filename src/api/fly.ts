import { httpHandler } from '~core/httpHandler';
import { FlyType } from '~api/flyType';
import { Imitatee } from '~api/imitatee';

export interface Fly {
  id: number;
  name: string;
  acronym: string;
  description: string;
  types: Array<FlyType>;
  imitatees: Array<Imitatee>;
}

export const index = (pageNumber: number, pageSize: number) => {
  return httpHandler.get(
    `/Flies?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    { headers: { Authorization: false } },
  );
};

export const get = (id: number) => {
  return httpHandler.get(`/Flies/${id}`, { headers: { Authorization: false } });
};
