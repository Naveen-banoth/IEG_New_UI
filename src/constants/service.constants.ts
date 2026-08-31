import { HttpHeaders } from '@angular/common/http';

export const serviceConstants = {
  apiURL: 'http://localhost:4074/',
  baseUrl: 'http://localhost:4074/'
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

export const getAuthHeaders = (token?: string) => {
  const activeToken = token || sessionStorage.getItem('token') || localStorage.getItem('token') || '';
  return {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      ...(activeToken ? { Authorization: `Bearer ${activeToken}`, token: activeToken } : {})
    }),
    withCredentials: true
  };
};
