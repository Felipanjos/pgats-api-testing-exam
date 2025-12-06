import http from 'k6/http';
import { expect } from 'https://jslib.k6.io/k6-testing/0.5.0/index.js';
import { getBaseUrl } from './getBaseUrl.js';

export function login(username, password) {
  let responseTrainerLogin = '';

  responseTrainerLogin = http.post(
    `${getBaseUrl()}/login`,
    JSON.stringify({
      username: username,
      password: password,
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  expect.soft(responseTrainerLogin.status).toBe(200);

  return responseTrainerLogin.json('token');
}
