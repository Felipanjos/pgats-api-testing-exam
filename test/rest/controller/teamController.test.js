const request = require('supertest');
const { expect } = require('chai');
const sinon = require('sinon');

// Aplicação
const app = require('../../../app');

// Mock
const teamService = require('../../../service/teamService');

// Auth
let token;

describe('Team Controller', () => {
  before(async () => {
    const resposta = await request(app).post('/login').send({
      username: 'ash_ketchum',
      password: 'pikachu123',
    });

    token = `${resposta.body.tokenType} ${resposta.body.token}`;
  });

  describe('POST /teams', async () => {
    it('Quando não informo usuário e nome do time, recebo 400', async () => {
      const resposta = await request(app).post('/teams').set('Authorization', token).send({});
      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property('error', 'Username e teamName são obrigatórios');
    });

    it('Quando informo usuário e nome do time válidos, recebo 201', async () => {
      const resposta = await request(app).post('/teams').set('Authorization', token).send({
        username: 'ash_ketchum',
        teamName: 'Meu Novo Time',
      });
      expect(resposta.status).to.equal(201);
    });

    it('Mock: Quando não informo usuário e nome do time, recebo 400', async () => {
      const teamServiceMock = sinon.stub(teamService, 'createTeam');
      teamServiceMock.throws(new Error('Username e teamName são obrigatórios'));

      const resposta = await request(app)
        .post('/teams')
        .set('Authorization', token)

        .send({
          username: 'ash_ketchum',
          teamName: 'Meu Novo Time',
        });

      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property('error', 'Username e teamName são obrigatórios');
    });

    it('Mock: Quando informo usuário e nome do time válidos, recebo 201', async () => {
      const teamServiceMock = sinon.stub(teamService, 'createTeam');
      teamServiceMock.returns({
        username: 'ash_ketchum',
        teamName: 'Meu Novo Time',
      });

      const resposta = await request(app)
        .post('/teams')
        .set('Authorization', token)

        .send({
          username: 'eunaoexisto',
          teamName: 'Meu Novo Time',
        });

      expect(resposta.status).to.equal(201);
      expect(resposta.body.username).to.equal('ash_ketchum');
    });

    afterEach(() => {
      sinon.restore();
    });
  });
});
