const request = require('supertest');
const { expect } = require('chai');
const sinon = require('sinon');
require('dotenv').config();

// Aplicação
const app = require('../../../app');

// Mock
const teamService = require('../../../service/teamService');

// Auth
let token;

// Fixtures
const postTeams = require('../fixture/requisicoes/postTeams.json');

describe('Team Controller', () => {
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

      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property('error', 'Username e teamName são obrigatórios');
    });

    it('Quando informo usuário e nome do time válidos, recebo 201', async () => {
      const resposta = await request(app).post('/teams').set('Authorization', token).send(postTeams);

      expect(resposta.status).to.equal(201);
    });

    it('Mock: Quando não informo usuário e nome do time, recebo 400', async () => {
      const teamServiceMock = sinon.stub(teamService, 'createTeam');
      teamServiceMock.throws(new Error('Username e teamName são obrigatórios'));

      const resposta = await request(app).post('/teams').set('Authorization', token).send(postTeams);

      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property('error', 'Username e teamName são obrigatórios');
    });

    it('Mock: Quando informo usuário e nome do time válidos, recebo 201', async () => {
      const postTeamsUsuarioInexistente = require('../fixture/requisicoes/postTeamsUsuarioInexistente.json');
      const teamServiceMock = sinon.stub(teamService, 'createTeam');
      
      teamServiceMock.returns(postTeams);

      const resposta = await request(app).post('/teams').set('Authorization', token).send(postTeamsUsuarioInexistente);

      expect(resposta.status).to.equal(201);
      expect(resposta.body.username).to.equal(process.env.USERNAME);
    });

    afterEach(() => {
      sinon.restore();
    });
  });
});
