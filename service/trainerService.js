const db = require('../model/db');
const bcrypt = require('bcryptjs');

/**
 * Registra um novo treinador
 * @param {string} username - Nome de usuário do treinador
 * @param {string} password - Senha do treinador
 * @returns {object} - Dados do treinador criado (sem senha)
 * @throws {Error} - Se o usuário já existir
 */
function registerTrainer(username, password) {
  // Verifica se já existe um treinador com esse username
  const existingTrainer = db.trainers.find((trainer) => trainer.username === username);
  if (existingTrainer) {
    throw new Error('Não é possível registrar treinador com este nome de usuário, pois já existe');
  }

  // Cria novo treinador
  const newTrainer = {
    id: db.nextTrainerId++,
    username,
    password,
    teams: [],
  };

  db.trainers.push(newTrainer);

  // Retorna dados sem a senha
  const { password: _, ...trainerWithoutPassword } = newTrainer;
  return trainerWithoutPassword;
}

/**
 * Realiza login do treinador
 * @param {string} username - Nome de usuário
 * @param {string} password - Senha
 * @returns {object} - Dados do treinador (sem senha)
 * @throws {Error} - Se credenciais inválidas
 */
function loginTrainer(username, password) {
  const trainer = db.trainers.find((t) => t.username === username);

  if (!trainer || !bcrypt.compareSync(password, trainer.password)) {
    throw new Error('Credenciais inválidas');
  }

  // Retorna dados sem a senha
  const { password: _, ...trainerWithoutPassword } = trainer;
  return trainerWithoutPassword;
}

/**
 * Busca treinador por username
 * @param {string} username - Nome de usuário
 * @returns {object|null} - Dados do treinador ou null
 */
function findTrainerByUsername(username) {
  return db.trainers.find((trainer) => trainer.username === username);
}

/**
 * Retorna todos os treinadores (sem senhas)
 * @returns {array} - Lista de todos os treinadores
 */
function getAllTrainers() {
  return db.trainers.map(trainer => {
    const { password, ...trainerWithoutPassword } = trainer;
    return trainerWithoutPassword;
  });
}

/**
 * Busca treinador por username (sem senha)
 * @param {string} username - Nome de usuário
 * @returns {object} - Dados do treinador (sem senha)
 * @throws {Error} - Se treinador não encontrado
 */
function getTrainerByUsername(username) {
  const trainer = db.trainers.find((t) => t.username === username);
  
  if (!trainer) {
    throw new Error('Treinador não encontrado');
  }
  
  const { password, ...trainerWithoutPassword } = trainer;
  return trainerWithoutPassword;
}

module.exports = {
  registerTrainer,
  loginTrainer,
  findTrainerByUsername,
  getAllTrainers,
  getTrainerByUsername,
};
