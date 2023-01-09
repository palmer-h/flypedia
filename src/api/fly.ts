import { httpHandler } from '~core/httpHandler';

export const index = (pageNumber: number, pageSize: number) => {
  return httpHandler.get(
    `/Flies?pageNumber=${pageNumber}&pageSize=${pageSize}`,
  );
};

export const get = (id: number) => {
  return httpHandler.get(`/Flies/${id}`);
};
