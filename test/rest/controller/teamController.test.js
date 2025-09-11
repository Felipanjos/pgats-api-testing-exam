const request = require('supertest');
const { expect } = require('chai');
const sinon = require('sinon');
require('dotenv').config();

// Import centralized API messages
const { TEAM_MESSAGES, HTTP_STATUS } = require('../../../constants/apiMessages');

// Aplicação
const app = require('../../../app');

// Mock
const teamService = require('../../../service/teamService');

// Auth
let token;

// Fixtures
const postTeams = require('../fixture/requisicoes/postTeams.json');

describe('Testes de Teams no Controller', () => {
  before(async () => {
    const resposta = await request(app).post('/login').send({
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
    });

    token = `${resposta.body.tokenType} ${resposta.body.token}`;
  });

  describe('POST /teams', async () => {
    it('Quando não informo usuário e nome do time, recebo 400', async () => {
      const resposta = await request(app).post('/teams').set('Authorization', token).send({});

      expect(resposta.status).to.equal(HTTP_STATUS.BAD_REQUEST);
      expect(resposta.body).to.have.property('error', TEAM_MESSAGES.TEAM_FIELDS_REQUIRED);
    });

    it('Quando informo usuário e nome do time válidos, recebo 201', async () => {
      const resposta = await request(app).post('/teams').set('Authorization', token).send(postTeams);

      expect(resposta.status).to.equal(HTTP_STATUS.CREATED);
    });

    it('Mock: Quando não informo usuário e nome do time, recebo 400', async () => {
      const teamServiceMock = sinon.stub(teamService, 'createTeam');
      teamServiceMock.throws(new Error(TEAM_MESSAGES.TEAM_FIELDS_REQUIRED));

      const resposta = await request(app).post('/teams').set('Authorization', token).send(postTeams);

      expect(resposta.status).to.equal(HTTP_STATUS.BAD_REQUEST);
      expect(resposta.body).to.have.property('error', TEAM_MESSAGES.TEAM_FIELDS_REQUIRED);
    });

    it('Mock: Quando informo usuário e nome do time válidos, recebo 201', async () => {
      const postTeamsUsuarioInexistente = require('../fixture/requisicoes/postTeamsUsuarioInexistente.json');
      const teamServiceMock = sinon.stub(teamService, 'createTeam');

      teamServiceMock.returns(postTeams);

      const resposta = await request(app).post('/teams').set('Authorization', token).send(postTeamsUsuarioInexistente);

      expect(resposta.status).to.equal(HTTP_STATUS.CREATED);
      expect(resposta.body.username).to.equal(process.env.USERNAME);
    });

    afterEach(() => {
      sinon.restore();
    });
  });
});
