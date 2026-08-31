import { HttpHeaders } from '@angular/common/http';

export const serviceConstants = {
  apiURL: 'http://localhost:4074/',
  baseUrl: 'http://localhost:4074/'
};

export const getStoredToken = (): string => {
  return (
    localStorage.getItem('token') ||
    sessionStorage.getItem('token') ||
    localStorage.getItem('_auth_') ||
    sessionStorage.getItem('_auth_') ||
    localStorage.getItem('jwt_token') ||
    sessionStorage.getItem('jwt_token') ||
    ''
  );
};

export const httpOptions: {
  headers?: HttpHeaders;
  observe?: 'body';
  withCredentials?: boolean;
} = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  observe: 'body',
  withCredentials: true
};

export const formOptions: {
  headers?: HttpHeaders;
  observe?: 'body';
  withCredentials?: boolean;
} = {
  withCredentials: true
};

export const getAuthHeaders = (token?: string) => {
  const activeToken = token || getStoredToken();
  return {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      ...(activeToken ? { Authorization: `Bearer ${activeToken}`, token: activeToken } : {})
    }),
    withCredentials: true
  };
};
