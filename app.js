const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const trainerController = require('./controller/trainerController');
const teamController = require('./controller/teamController');

const app = express();

// Middleware para parsing JSON
app.use(express.json());

// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pokémon Teams API',
      version: '1.0.0',
      description: `
        API Rest para gerenciar times de Pokémon.
        
        **Funcionalidades:**
        - Registro e login de treinadores (com JWT)
        - Criação de times para treinadores (autenticado)
        - Adição de Pokémon aos times (autenticado, máximo de 6 por time)
        
        **Regras de negócio:**
        - Login e senha são obrigatórios para acesso
        - Não é possível registrar treinadores com o mesmo nome de usuário
        - Um time não pode ter mais de 6 Pokémon
        - Rotas de teams requerem autenticação JWT
        
        **Banco de dados:** Em memória (dados são perdidos ao reiniciar o servidor)
        
        **Autenticação:** Faça login para obter o token JWT, depois use o botão "Authorize" para autenticar.
      `,
      contact: {
        name: 'Felipe Anjos',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desenvolvimento',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Token JWT obtido através do login',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./controller/*.js'], // Caminho para os arquivos com anotações Swagger
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Endpoint para documentação Swagger
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Pokémon Teams API Documentation',
  })
);

// Rota de healthcheck
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Pokémon Teams API está funcionando!',
    timestamp: new Date().toISOString(),
  });
});

// Rotas dos controllers
app.use('/', trainerController);
app.use('/', teamController);

// Rota 404 para endpoints não encontrados
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint não encontrado',
    message: 'Consulte a documentação em /api-docs',
  });
});

// Middleware de tratamento de erros
app.use((error, req, res, next) => {
  console.error('Erro interno:', error);
  res.status(500).json({
    error: 'Erro interno do servidor',
    message: 'Algo deu errado. Tente novamente mais tarde.',
  });
});

module.exports = app;
