import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import trainerController from './controller/trainerController.js';
import teamController from './controller/teamController.js';

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
        - Registro e login de treinadores
        - Criação de times para treinadores
        - Adição de Pokémon aos times (máximo 6 por time)
        
        **Regras de negócio:**
        - Login e senha são obrigatórios para acesso
        - Não é possível registrar treinadores com o mesmo nome de usuário
        - Um time não pode ter mais de 6 Pokémon
        
        **Banco de dados:** Em memória (dados são perdidos ao reiniciar o servidor)
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

export default app;
