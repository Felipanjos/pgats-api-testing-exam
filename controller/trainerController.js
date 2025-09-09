const express = require('express');
const { registerTrainer, loginTrainer } = require('../service/trainerService');
const { generateToken } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Trainer:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         username:
 *           type: string
 *         teams:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Team'
 *     TrainerRegister:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: Nome de usuário do treinador
 *         password:
 *           type: string
 *           description: Senha do treinador
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registra um novo treinador
 *     description: Cria uma nova conta de treinador. Não é possível registrar treinadores com o mesmo nome de usuário.
 *     tags: [Treinadores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TrainerRegister'
 *           examples:
 *             exemplo1:
 *               value:
 *                 username: "ash_ketchum"
 *                 password: "pikachu123"
 *     responses:
 *       201:
 *         description: Treinador registrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trainer'
 *       400:
 *         description: Erro de validação ou usuário já existe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/register', (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username e password são obrigatórios' });
    }

    const trainer = registerTrainer(username, password);
    res.status(201).json(trainer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza login do treinador
 *     description: Autentica um treinador com username e password e retorna um token JWT
 *     tags: [Treinadores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TrainerRegister'
 *           examples:
 *             exemplo1:
 *               value:
 *                 username: "ash_ketchum"
 *                 password: "pikachu123"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 username:
 *                   type: string
 *                 teams:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Team'
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticação
 *                 tokenType:
 *                   type: string
 *                   example: "Bearer"
 *       401:
 *         description: Credenciais inválidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       400:
 *         description: Dados incompletos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username e password são obrigatórios' });
    }

    const trainer = loginTrainer(username, password);
    const token = generateToken(trainer);

    res.status(200).json({
      ...trainer,
      token: token,
      tokenType: 'Bearer',
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

module.exports = router;
