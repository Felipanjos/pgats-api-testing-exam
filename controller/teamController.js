const express = require('express');
const { createTeam, addPokemonToTeam, getTrainerTeams, getAllTeams } = require('../service/teamService');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Team:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         pokemons:
 *           type: array
 *           items:
 *             type: string
 *     TeamCreate:
 *       type: object
 *       required:
 *         - username
 *         - teamName
 *       properties:
 *         username:
 *           type: string
 *           description: Nome de usuário do treinador
 *         teamName:
 *           type: string
 *           description: Nome do time a ser criado
 *     PokemonAdd:
 *       type: object
 *       required:
 *         - username
 *         - teamName
 *         - pokemonName
 *       properties:
 *         username:
 *           type: string
 *           description: Nome de usuário do treinador
 *         teamName:
 *           type: string
 *           description: Nome do time
 *         pokemonName:
 *           type: string
 *           description: Nome do Pokémon a ser adicionado
 */

/**
 * @swagger
 * /teams:
 *   post:
 *     summary: Cria um novo time para um treinador
 *     description: Cria um novo time para o treinador especificado
 *     tags: [Times]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TeamCreate'
 *           examples:
 *             exemplo1:
 *               value:
 *                 username: "ash_ketchum"
 *                 teamName: "Team Kanto"
 *     responses:
 *       201:
 *         description: Time criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       400:
 *         description: Erro de validação ou treinador não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/teams', (req, res) => {
  try {
    const { username, teamName } = req.body;

    if (!username || !teamName) {
      return res.status(400).json({ error: 'Username e teamName são obrigatórios' });
    }

    const team = createTeam(username, teamName);
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /teams/all:
 *   get:
 *     summary: Lista todos os times de todos os treinadores
 *     description: Retorna uma lista completa de todos os times existentes no sistema, incluindo informações do treinador proprietário
 *     tags: [Times]
 *     responses:
 *       200:
 *         description: Lista de todos os times retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   teamId:
 *                     type: integer
 *                     description: ID do time
 *                   teamName:
 *                     type: string
 *                     description: Nome do time
 *                   pokemons:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: Lista de Pokémon no time
 *                   pokemonCount:
 *                     type: integer
 *                     description: Quantidade de Pokémon no time
 *                   trainer:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID do treinador
 *                       username:
 *                         type: string
 *                         description: Nome de usuário do treinador
 *             examples:
 *               exemplo1:
 *                 value:
 *                   - teamId: 1
 *                     teamName: "Team Kanto"
 *                     pokemons: ["Pikachu", "Charizard", "Blastoise"]
 *                     pokemonCount: 3
 *                     trainer:
 *                       id: 1
 *                       username: "ash_ketchum"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/teams/all', (req, res) => {
  try {
    const allTeams = getAllTeams();
    res.status(200).json(allTeams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /teams/{username}:
 *   get:
 *     summary: Lista todos os times de um treinador
 *     description: Retorna todos os times criados por um treinador específico
 *     tags: [Times]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome de usuário do treinador
 *     responses:
 *       200:
 *         description: Lista de times retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Team'
 *       400:
 *         description: Treinador não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/teams/:username', (req, res) => {
  try {
    const { username } = req.params;
    const teams = getTrainerTeams(username);
    res.status(200).json(teams);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /teams/pokemon:
 *   post:
 *     summary: Adiciona um Pokémon a um time
 *     description: Adiciona um Pokémon ao time especificado. Um time não pode ter mais de 6 Pokémon.
 *     tags: [Times]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PokemonAdd'
 *           examples:
 *             exemplo1:
 *               value:
 *                 username: "ash_ketchum"
 *                 teamName: "Team Kanto"
 *                 pokemonName: "Pikachu"
 *     responses:
 *       200:
 *         description: Pokémon adicionado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       400:
 *         description: Erro de validação, treinador/time não encontrado ou time já tem 6 Pokémon
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/teams/pokemon', (req, res) => {
  try {
    const { username, teamName, pokemonName } = req.body;

    if (!username || !teamName || !pokemonName) {
      return res.status(400).json({ error: 'Username, teamName e pokemonName são obrigatórios' });
    }

    const team = addPokemonToTeam(username, teamName, pokemonName);
    res.status(200).json(team);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
