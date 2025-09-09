const jwt = require('jsonwebtoken');

// Chave secreta para assinar os tokens JWT
const JWT_SECRET = process.env.JWT_SECRET || 'pokemon_secret_key_2024';

/**
 * Middleware de autenticação JWT
 * Verifica se o token Bearer está presente e válido
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      error: 'Token de acesso requerido',
      message: 'Faça login para acessar este recurso',
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        error: 'Token inválido ou expirado',
        message: 'Faça login novamente para obter um novo token',
      });
    }

    // Adiciona as informações do usuário ao request
    req.user = user;
    next();
  });
}

/**
 * Gera um token JWT para o usuário
 * @param {object} user - Dados do usuário (sem senha)
 * @returns {string} - Token JWT
 */
function generateToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
  };

  // Token expira em 24 horas
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}

module.exports = {
  authenticateToken,
  generateToken,
  JWT_SECRET,
};
