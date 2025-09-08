# Pokémon Teams API

API Rest para gerenciar times de Pokémon, desenvolvida com Node.js e Express. Esta API foi criada **especificamente para fins de aprendizado e prática de testes de automação em nível de API**.

## 🎯 Funcionalidades

- **Registro de Treinadores**: Criação de contas de treinador
- **Login de Treinadores**: Autenticação com username e password
- **Criação de Times**: Treinadores podem criar times de Pokémon
- **Adição de Pokémon**: Adicionar Pokémon aos times (máximo 6 por time)
- **Listagem de Times**: Visualizar times por treinador ou todos os times
- **Documentação Swagger**: Interface interativa para testar a API
- **Collection Postman**: Testes automatizados completos inclusos
- **Dados de Exemplo**: 3 treinadores pré-cadastrados para testes rápidos

## 📋 Regras de Negócio

1. **Login e senha** devem ser informados para o acesso
2. **Não é possível** registrar treinadores com o mesmo nome de usuário
3. **Um time não pode ter mais de 6 Pokémon**

## 🗂️ Estrutura do Projeto

```
pgats-api-testing-exam/
├── controller/          # Controladores das rotas
│   ├── trainerController.js
│   └── teamController.js
├── service/             # Lógica de negócio
│   ├── trainerService.js
│   └── teamService.js
├── model/               # Modelo de dados
│   └── db.js           # Banco de dados em memória
├── app.js              # Configuração do Express (sem listen)
├── server.js           # Inicialização do servidor
├── package.json
└── README.md
```

## 🚀 Instalação e Configuração

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

### Instalação

1. **Clone o repositório** (se aplicável):

   ```bash
   git clone <url-do-repositorio>
   cd pgats-api-testing-exam
   ```

2. **Instale as dependências**:

   ```bash
   npm install
   ```

3. **Inicie o servidor**:

   ```bash
   npm start
   ```

   Ou para desenvolvimento com auto-reload:

   ```bash
   npm run dev
   ```

## 📡 Endpoints da API

### Treinadores

| Método | Endpoint  | Descrição                  |
| ------ | --------- | -------------------------- |
| POST   | /register | Registra um novo treinador |
| POST   | /login    | Realiza login do treinador |

### Times

| Método | Endpoint         | Descrição                                    |
| ------ | ---------------- | -------------------------------------------- |
| POST   | /teams           | Cria um novo time                            |
| GET    | /teams/all       | Lista todos os times de todos os treinadores |
| GET    | /teams/:username | Lista todos os times de um treinador         |
| POST   | /teams/pokemon   | Adiciona um Pokémon a um time                |

### Documentação

| Método | Endpoint  | Descrição                 |
| ------ | --------- | ------------------------- |
| GET    | /api-docs | Interface Swagger da API  |
| GET    | /health   | Health check da aplicação |

## 🔧 Exemplos de Uso

### 1. Registrar um Treinador

```bash
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "ash_ketchum",
    "password": "pikachu123"
  }'
```

### 2. Fazer Login

```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "ash_ketchum",
    "password": "pikachu123"
  }'
```

### 3. Criar um Time

```bash
curl -X POST http://localhost:3000/teams \
  -H "Content-Type: application/json" \
  -d '{
    "username": "ash_ketchum",
    "teamName": "Team Kanto"
  }'
```

### 4. Adicionar um Pokémon ao Time

```bash
curl -X POST http://localhost:3000/teams/pokemon \
  -H "Content-Type: application/json" \
  -d '{
    "username": "ash_ketchum",
    "teamName": "Team Kanto",
    "pokemonName": "Pikachu"
  }'
```

### 5. Listar Times de um Treinador

```bash
curl http://localhost:3000/teams/ash_ketchum
```

### 6. Listar Todos os Times (Geral)

```bash
curl http://localhost:3000/teams/all
```

## 🎮 Dados de Exemplo Pré-cadastrados

A API já contém 3 treinadores com seus times para facilitar os testes:

| Treinador   | Username            | Password     | Time          | Pokémon                                         |
| ----------- | ------------------- | ------------ | ------------- | ----------------------------------------------- |
| Ash Ketchum | `ash_ketchum`       | `pikachu123` | Team Kanto    | Pikachu, Charizard, Blastoise (3)               |
| Gary Oak    | `gary_oak`          | `eevee456`   | Team Elite    | Umbreon, Arcanine, Exeggutor, Machamp (4)       |
| Misty       | `misty_waterflower` | `staryu789`  | Team Cerulean | Starmie, Psyduck, Goldeen, Horsea, Gyarados (5) |

## 📚 Documentação Swagger

Após iniciar o servidor, acesse a documentação interativa em:
**http://localhost:3000/api-docs**

A interface Swagger permite:

- Visualizar todos os endpoints disponíveis
- Testar as requisições diretamente no navegador
- Ver exemplos de request/response
- Entender a estrutura dos dados

## 🧪 Testes

Esta API foi desenvolvida especificamente para ser testada com ferramentas como:

- **Supertest**: Para testes de integração
- **Postman**: Para testes manuais e automatizados

### 📦 Collection Postman Completa

O projeto inclui uma **collection completa do Postman** na pasta `postman/`:

- **`Pokemon_Teams_API.postman_collection.json`** - Collection com todos os endpoints
- **`Pokemon_Teams_API.postman_environment.json`** - Environment com variáveis
- **`README.md`** - Documentação detalhada da collection

#### 🚀 Como usar a Collection Postman:

1. **Importar no Postman:**

   - Importe o arquivo `Pokemon_Teams_API.postman_collection.json`
   - Importe o arquivo `Pokemon_Teams_API.postman_environment.json`

2. **Selecionar Environment:**

   - Escolha "Pokémon Teams API - Environment" no dropdown

3. **Executar testes:**
   - **Individual**: Selecione uma request e clique "Send"
   - **Collection completa**: Clique "Run" na collection

#### ✅ O que está incluído na Collection:

- **Validação de regras de negócio**
- **Dados pré-cadastrados** para testes rápidos
- **Variáveis de ambiente** configuradas

### 🔬 Testes com Supertest

Para usar em testes com Supertest, importe o `app.js` (que não contém o método `listen()`):

```javascript
const request = require('supertest');
const app = require('../app');

describe('API Tests', () => {
  test('should register a trainer', async () => {
    const response = await request(app).post('/register').send({
      username: 'testuser',
      password: 'testpass',
    });

    expect(response.status).toBe(201);
  });
  });
});
```

## 💾 Banco de Dados

A API utiliza **banco de dados em memória** através de variáveis JavaScript. Isso significa que:

- ✅ **Vantagens**: Simples, rápido, ideal para testes
- ⚠️ **Limitações**: Dados são perdidos ao reiniciar o servidor
- 🎯 **Propósito**: Focado em aprendizado de testes de API

## 🎛️ Configuração

### Variáveis de Ambiente

| Variável | Descrição         | Padrão |
| -------- | ----------------- | ------ |
| PORT     | Porta do servidor | 3000   |

### Scripts Disponíveis

```bash
npm start      # Inicia o servidor
npm run dev    # Inicia com nodemon (auto-reload para desenvolvimento)
npm test       # Execute os testes (a configurar)
```

## 🎯 Cenários de Teste Sugeridos

### ✅ **Casos de Sucesso:**

- Registro de novo treinador
- Login com credenciais válidas
- Criação de time
- Adição de Pokémon (1 a 6)
- Listagem de times por treinador
- Listagem geral de todos os times

### ❌ **Casos de Erro:**

- Registro com username duplicado
- Login com credenciais inválidas
- Tentativa de adicionar 7º Pokémon
- Busca por treinador inexistente
- Campos obrigatórios em branco

### 🔍 **Validações:**

- Campos obrigatórios
- Limites de negócio (6 Pokémon máximo)
- Estrutura de dados de resposta
- Status codes apropriados (200, 201, 400, 401, 500)

## 🛠️ Arquitetura

A API segue o padrão **MVC** (Model-View-Controller) adaptado:

- **Model** (`model/db.js`): Banco de dados em memória
- **Service** (`service/`): Lógica de negócio e regras
- **Controller** (`controller/`): Rotas e validação de entrada
- **App** (`app.js`): Configuração do Express e middleware
- **Server** (`server.js`): Inicialização do servidor

## ⚠️ Limitações Conhecidas

- **Banco de dados volátil**: Dados são perdidos ao reiniciar
- **Sem autenticação JWT**: Login básico apenas
- **Sem persistência**: Ideal para testes, não para produção
- **Sem validação de esquema**: Validação manual nos controllers

## 🤝 Contribuindo

Este projeto é voltado para aprendizado de testes de API. Contribuições são bem-vindas:

1. **Fork** o projeto
2. **Crie testes automatizados** (Supertest, Chai, Mocha etc.)
3. **Adicione novas funcionalidades** (autenticação JWT, validação de esquema)
4. **Melhore a documentação**
5. **Reporte bugs** ou sugira melhorias

---

**🎯 Desenvolvido especificamente para aprendizado de testes e automação de APIs**  
**🚀 Ideal para praticar com Postman, Supertest e outras ferramentas de teste**
