import http from 'k6/http';
import { sleep, group } from 'k6';
import { SharedArray } from 'k6/data';
import { expect } from 'https://jslib.k6.io/k6-testing/0.5.0/index.js';
import { Trend } from 'k6/metrics';
import { login } from './helpers/login.js';
import { getBaseUrl } from './helpers/getBaseUrl.js';
import { randomTeamName } from './helpers/randomTeamName.js';

const users = new SharedArray('users', function () {
  return JSON.parse(open('./data/login.test.data.json'));
});

export const options = {
  thresholds: {
    http_req_duration: ['p(95)<2000'], 
  },
  stages: [
    { duration: '3s', target: 10 }, // Ramp up
    { duration: '15s', target: 10 }, // Average
    { duration: '2s', target: 100 }, // Spike
    { duration: '3s', target: 100 }, // Spike
    { duration: '5s', target: 10 }, // Average
    { duration: '5s', target: 0 }, // Ramp down
  ],
};

export const createTeamTrend = new Trend('create_team_duration');

export default function () {
  const user = users[(__VU - 1) % users.length];
  let token, teamName;

  group('Fazendo login', () => {
    token = login(user.username, user.password);
  });

  group('Criando um novo time', () => {
    teamName = randomTeamName();
    let payload = JSON.stringify({
      username: user.username,
      teamName: teamName,
    });
    let url = `${getBaseUrl()}/teams`;
    let params = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const start = Date.now();
    const res = http.post(url, payload, params);
    const duration = Date.now() - start;
    createTeamTrend.add(duration);
    expect.soft(res.status).toBe(201);
  });

  group('Simulando o pensamento do usuário', () => {
    sleep(1);
  });
}
