const { expect, use } = require('chai');
const request = require('supertest');

require('dotenv').config();
const chaiExclude = require('chai-exclude');
use(chaiExclude);

describe('Teams', () => {
  describe('POST /teams', () => {
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

      console.log(resposta.body)
      expect(resposta.status).to.equal(200);
      expect(resposta.body.pokemons).to.contain('Venusaur');
      expect(resposta.body).excluding('size').to.deep.equal(respostaEsperada);
    });

    it('Quando adiciono um Pokémon sem informar o nome, recebo 400', async () => {
      const postTeamsPokemon = require('../fixture/requisicoes/postTeamsPokemon.json');
      delete postTeamsPokemon.pokemonName;

      const resposta = await request(process.env.BASE_URL_REST)
        .post('/teams/pokemon')
        .set('Authorization', token)
        .send(postTeamsPokemon);

      console.log(resposta.body)
      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property('error', 'Username, teamName e pokemonName são obrigatórios');
    });
  });
});
