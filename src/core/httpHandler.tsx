import axios, { AxiosError, AxiosResponse } from 'axios';

interface ApiErrorResponse {
  error: boolean;
  message: string;
}

const baseUrl: string = 'http://10.0.2.2:3000/api/v1';

const instance = axios.create({
  headers: {
    Pragma: 'no-cache',
    accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: false,
  },
});

const onSuccessInterceptor = (res: AxiosResponse<any>): AxiosResponse<any> =>
  res;

const onErrorInterceptor = (error: AxiosError): ApiErrorResponse => {
  const response: ApiErrorResponse = {
    error: true,
    message: 'Something went wrong',
  };
  if (!error.response) {
    return response;
  }
  if (error.response.status >= 500) {
    response.message = `Network error ${error.response.status} - please contact support`;
    return response;
  }
  if (Array.isArray(error.response.data)) {
    if (error.response.data[0]) {
      response.message = error.response.data[0].message;
    }
  } else if (typeof error.response.data === 'string') {
    response.message = error.response.data;
  }
  return response;
};

instance.interceptors.request.use(config => {
  config.baseURL = baseUrl;
  return config;
});

instance.interceptors.response.use(onSuccessInterceptor, onErrorInterceptor);

export const httpHandler = instance;
