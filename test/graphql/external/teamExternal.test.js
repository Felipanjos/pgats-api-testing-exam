const request = require('supertest');
const { expect, use } = require('chai');

const chaiExclude = require('chai-exclude');
use(chaiExclude);

require('dotenv').config();

const postCriarTime = require('../fixture/requisicoes/postCriarTime.json');

describe('Testes de Teams', () => {
    before(async () => {
        const loginUser = require('../fixture/requisicoes/loginUser.json');
        const resposta = await request(process.env.BASE_URL_GRAPHQL)
            .post('')
            .send(loginUser);

        token = `Bearer ${resposta.body.data.login.token}`;
    });

    it('Quando crio um time com sucesso, a resposta retorna o time vazio', async() => {
        const createTeamRespostaEsperada = require('../fixture/respostas/quandoCrioTimeComValoresValidosRecebo200.json');

        const resposta = await request(process.env.BASE_URL_GRAPHQL)
            .post('')
            .set('Authorization', token)
            .send(postCriarTime);
        
        expect(resposta.status).to.equal(200);
        expect(resposta.body.data).to.deep.equal(createTeamRespostaEsperada);
    });

    it('Quando adiciono um Pokémon à um time vazio (alguma coisa)', async () =>{
        const postAdicionarPokemonAoTime = require('../fixture/requisicoes/postAdicionarPokemonAoTime.json');
        const postAdicionarPokemonAoTimeRespostaEsperada = require('../fixture/respostas/quandoAdicionoPokemonAoTimeRecebo200.json');

        await request(process.env.BASE_URL_GRAPHQL)
            .post('')
            .set('Authorization', token)
            .send(postCriarTime);

        const resposta = await request(process.env.BASE_URL_GRAPHQL)
            .post('')
            .set('Authorization', token)
            .send(postAdicionarPokemonAoTime)

        expect(resposta.status).to.equal(200);
        expect(resposta.body.data).to.deep.equal(postAdicionarPokemonAoTimeRespostaEsperada);
    });
});