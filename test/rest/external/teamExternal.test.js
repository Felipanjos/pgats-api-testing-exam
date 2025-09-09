const { expect, use } = require('chai');
const request = require('supertest');

const chaiExclude = require('chai-exclude');
use(chaiExclude);

describe('Teams', () => {
  describe('POST /teams', () => {
    it('Quando informo valores válidos ao adicionar um Pokémon ao time, recebo 200', async () => {
        const postTeamsPokemon = require('../fixture/requisicoes/postTeamsPokemon.json');
        const respostaEsperada = require('../fixture/respostas/quandoAdicionoPokemonComValoresValidosRecebo200.json');

        const resposta = await request('http://localhost:3000').post('/teams/pokemon').send(postTeamsPokemon);

        expect(resposta.status).to.equal(200);
        expect(resposta.body.pokemons).to.contain('Venusaur');
        expect(resposta.body)
            .excluding('size')
            .to.deep.equal(respostaEsperada);
    });

    it('Quando adiciono um Pokémon sem informar o nome, recebo 400', async () => {
        const postTeamsPokemon = require('../fixture/requisicoes/postTeamsPokemon.json');
        delete postTeamsPokemon.pokemonName;
        
        const resposta = await request('http://localhost:3000').post('/teams/pokemon').send(postTeamsPokemon);

        expect(resposta.status).to.equal(400);
        expect(resposta.body).to.have.property('error', 'Username, teamName e pokemonName são obrigatórios');
    });
  });
});
