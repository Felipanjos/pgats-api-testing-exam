import http from 'k6/http';
import { sleep, group } from 'k6';
import { expect } from 'https://jslib.k6.io/k6-testing/0.5.0/index.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  vus: 10,
  duration: '20s',
  thresholds: {
    http_req_duration: ['p(90)<=100', 'p(95)<=200'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  let responseTrainerLogin = '';

  group('Fazendo login', () => {
    responseTrainerLogin = http.post(
      `http://localhost:3000/login`,
      JSON.stringify({
        username: 'ash_ketchum',
        password: 'pikachu123',
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  });
  
  expect.soft(responseTrainerLogin.status).toBe(200);

  group('Criando um novo time', () => {
    let responseTeam = http.post(
      `http://localhost:3000/teams`,
      JSON.stringify({
        username: 'ash_ketchum',
        teamName: `Team ${Date.now()}`,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${responseTrainerLogin.json('token')}`,
        },
      }
    );

    expect.soft(responseTeam.status).toBe(201);
  });

  group('Simulando o pensamento do usuário', () => {
    sleep(1);
  });
}

export function handleSummary(data) {
  return {
    "relatorio.html": htmlReport(data),
  };
}
