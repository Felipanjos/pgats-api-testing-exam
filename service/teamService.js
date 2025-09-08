import db from '../model/db.js';
import { findTrainerByUsername } from './trainerService.js';

/**
 * Cria um novo time para um treinador
 * @param {string} username - Nome de usuário do treinador
 * @param {string} teamName - Nome do time
 * @returns {object} - Dados do time criado
 * @throws {Error} - Se treinador não encontrado ou time já existir
 */
export function createTeam(username, teamName) {
  const trainer = findTrainerByUsername(username);

  if (!trainer) {
    throw new Error('Treinador não encontrado');
  }

  // Verifica se já existe um time com esse nome para o treinador
  const existingTeam = trainer.teams.find((team) => team.name === teamName);
  if (existingTeam) {
    throw new Error('Já existe um time com este nome');
  }

  // Cria novo time
  const newTeam = {
    id: db.nextTeamId++,
    name: teamName,
    pokemons: [],
  };

  trainer.teams.push(newTeam);
  return newTeam;
}

/**
 * Adiciona um Pokémon a um time
 * @param {string} username - Nome de usuário do treinador
 * @param {string} teamName - Nome do time
 * @param {string} pokemonName - Nome do Pokémon
 * @returns {object} - Dados do time atualizado
 * @throws {Error} - Se treinador, time não encontrado ou time já tiver 6 Pokémon
 */
export function addPokemonToTeam(username, teamName, pokemonName) {
  const trainer = findTrainerByUsername(username);

  if (!trainer) {
    throw new Error('Treinador não encontrado');
  }

  const team = trainer.teams.find((team) => team.name === teamName);
  if (!team) {
    throw new Error('Time não encontrado');
  }

  // Verifica se o time já tem 6 Pokémon
  if (team.pokemons.length >= 6) {
    throw new Error('Um time não pode ter mais de 6 Pokémon');
  }

  team.pokemons.push(pokemonName);
  return team;
}

/**
 * Lista todos os times de um treinador
 * @param {string} username - Nome de usuário do treinador
 * @returns {array} - Lista de times do treinador
 * @throws {Error} - Se treinador não encontrado
 */
export function getTrainerTeams(username) {
  const trainer = findTrainerByUsername(username);

  if (!trainer) {
    throw new Error('Treinador não encontrado');
  }

  return trainer.teams;
}

/**
 * Retorna todos os times de todos os treinadores
 * @returns {array} - Lista de todos os times com informações do treinador
 */
export function getAllTeams() {
  const allTeams = [];

  db.trainers.forEach((trainer) => {
    trainer.teams.forEach((team) => {
      allTeams.push({
        teamId: team.id,
        teamName: team.name,
        pokemons: team.pokemons,
        pokemonCount: team.pokemons.length,
        trainer: {
          id: trainer.id,
          username: trainer.username,
        },
      });
    });
  });

  return allTeams;
}
