const { expect, use } = require('chai');
const request = require('supertest');

require('dotenv').config();
const chaiExclude = require('chai-exclude');
use(chaiExclude);

// Import centralized API messages
const { TEAM_MESSAGES, HTTP_STATUS } = require('../../../constants/apiMessages');

describe('Teste de Teams REST no External', () => {
  before(async () => {
    const resposta = await request(process.env.BASE_URL_REST).post('/login').send({
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
    });

    token = `${resposta.body.tokenType} ${resposta.body.token}`;
  });

  it('Quando informo valores válidos ao adicionar um Pokémon ao time, recebo 200', async () => {
    const postTeamsPokemon = require('../fixture/requisicoes/postTeamsPokemon.json');
    const respostaEsperada = require('../fixture/respostas/quandoAdicionoPokemonComValoresValidosRecebo200.json');

    const resposta = await request(process.env.BASE_URL_REST)
      .post('/teams/pokemon')
      .set('Authorization', token)
      .send(postTeamsPokemon);

    expect(resposta.status).to.equal(HTTP_STATUS.OK);
    expect(resposta.body).excluding('size').to.deep.equal(respostaEsperada);
  });

  it('Quando adiciono um Pokémon sem informar o nome, recebo 400', async () => {
    const postTeamsPokemon = require('../fixture/requisicoes/postTeamsPokemon.json');
    delete postTeamsPokemon.pokemonName;

    const resposta = await request(process.env.BASE_URL_REST)
      .post('/teams/pokemon')
      .set('Authorization', token)
      .send(postTeamsPokemon);

    expect(resposta.status).to.equal(HTTP_STATUS.BAD_REQUEST);
    expect(resposta.body).to.have.property('error', TEAM_MESSAGES.POKEMON_FIELDS_REQUIRED);
  });
});
