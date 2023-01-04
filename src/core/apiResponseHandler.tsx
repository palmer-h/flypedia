import { EnhancedStore } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { logout, setAuthTokens } from '~redux/slices/authSlice';

interface ApiErrorResponseData {
  error: boolean;
  message: string;
}

type ApiErrorResponse =
  | AxiosResponse<ApiErrorResponseData>
  | { data: ApiErrorResponseData };

const baseUrl: string = 'http://localhost:3000/api/v1';
let store: any;
let isRefreshingToken: boolean = false;
let requestQueue: Array<(accessToken: string) => any> = [];

const instance = axios.create({
  headers: {
    Pragma: 'no-cache',
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const injectStore = (_store: EnhancedStore) => {
  store = _store;
};

const onTokenRefresh = (accessToken: string) => {
  requestQueue = requestQueue.filter(callback => callback(accessToken));
};

const addToQueue = (callback: (accessToken: string) => any) => {
  requestQueue.push(callback);
};

const clearQueue = () => {
  requestQueue = [];
};

const onLogout = () => {
  store.dispatch(logout());
  clearQueue();
};

const refreshToken = async () => {
  const state = store.getState();
  await axios
    .post(baseUrl + '/Auth/Refresh', {
      refreshToken: state.auth.refreshToken,
    })
    .then((res: AxiosResponse) => {
      store.dispatch(
        setAuthTokens({
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken,
        }),
      );
    })
    .catch(() => {
      onLogout();
    });
};

const onSuccessInterceptor = (
  res: AxiosResponse<any>,
): AxiosResponse<any> | ApiErrorResponse => {
  return res ? res : buildErrorResponse();
};

const onErrorInterceptor = async (
  error: AxiosError,
): Promise<AxiosResponse<any> | ApiErrorResponse> => {
  if (!error.response?.config) {
    return buildErrorResponse();
  }
  const {
    config,
    response: { status },
  } = error;
  const tokenHasExpired =
    error.response.headers && error.response.headers['token-expired'];
  const originalRequest = config;
  if (status === 401 && tokenHasExpired) {
    if (!isRefreshingToken) {
      isRefreshingToken = true;
      refreshToken().then(() => {
        isRefreshingToken = false;
        const state = store.getState();
        onTokenRefresh(state.auth.accessToken);
      });
    }
    const retryOriginalRequest: Promise<AxiosResponse> = new Promise(
      resolve => {
        addToQueue(accessToken => {
          originalRequest.headers!.Authorization = `Bearer ${accessToken}`;
          resolve(axios(originalRequest));
        });
      },
    );
    try {
      const res = await retryOriginalRequest;
      return res;
    } catch (e: any) {
      return buildErrorResponse(e);
    }
  } else {
    return buildErrorResponse(error);
  }
};

const buildErrorResponse = (error?: AxiosError<any>): ApiErrorResponse => {
  const data: ApiErrorResponseData = {
    error: true,
    message: 'Something went wrong',
  };
  let response = { data };
  if (!error?.response) {
    return response;
  }
  if (error.response.status >= 500) {
    response.data.message = `Network error ${error.response.status} - please contact support`;
    return response;
  }
  if (Array.isArray(error.response.data)) {
    if (error.response.data[0]) {
      response.data.message = error.response.data[0].message;
    }
  } else if (typeof error.response.data === 'object') {
    if (error.response.data.errors) {
      response.data.message = error.response.data;
    }
  } else if (typeof error.response.data === 'string') {
    response.data.message = error.response.data;
  }
  return response;
};

instance.interceptors.request.use(config => {
  const state = store.getState();
  config.baseURL = baseUrl;
  if (config.headers?.Authorization !== null && state.auth.accessToken) {
    config.headers!.Authorization = `Bearer ${state.auth.accessToken}`;
  }
  return config;
});

instance.interceptors.response.use(onSuccessInterceptor, onErrorInterceptor);

export const httpHandler = instance;
