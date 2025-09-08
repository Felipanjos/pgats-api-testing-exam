import db from '../model/db.js';

/**
 * Registra um novo treinador
 * @param {string} username - Nome de usuário do treinador
 * @param {string} password - Senha do treinador
 * @returns {object} - Dados do treinador criado (sem senha)
 * @throws {Error} - Se o usuário já existir
 */
export function registerTrainer(username, password) {
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
export function loginTrainer(username, password) {
  const trainer = db.trainers.find((t) => t.username === username && t.password === password);

  if (!trainer) {
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
export function findTrainerByUsername(username) {
  return db.trainers.find((trainer) => trainer.username === username);
}
