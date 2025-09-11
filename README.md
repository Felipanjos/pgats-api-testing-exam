# Pokémon Teams API

**API Rest e GraphQL** para gerenciar times de Pokémon, desenvolvida com Node.js e Express. Esta API foi criada **especificamente para fins de aprendizado e prática de testes de automação em nível de API**.

## 🎯 Funcionalidades

- **API Rest e GraphQL**: Duas interfaces para a mesma funcionalidade
- **Registro de Treinadores**: Criação de contas de treinador
- **Login de Treinadores**: Autenticação com username e password (JWT)
- **Criação de Times**: Treinadores podem criar times de Pokémon
- **Adição de Pokémon**: Adicionar Pokémon aos times (máximo 6 por time)
- **Listagem de Times**: Visualizar times por treinador ou todos os times
- **Documentação Swagger**: Interface interativa para testar a API REST
- **GraphQL Playground**: Interface interativa para testar a API GraphQL
- **Collection Postman**: Testes automatizados completos inclusos
- **Dados de Exemplo**: 3 treinadores pré-cadastrados para testes rápidos

## 📋 Regras de Negócio

1. **Login e senha** devem ser informados para o acesso
2. **Não é possível** registrar treinadores com o mesmo nome de usuário
3. **Um time não pode ter mais de 6 Pokémon**

## 🗂️ Estrutura do Projeto

```
pgats-api-testing-exam/
├── controller/          # Controladores das rotas REST
│   ├── trainerController.js
│   └── teamController.js
├── service/             # Lógica de negócio
│   ├── trainerService.js
│   └── teamService.js
├── model/               # Modelo de dados
│   └── db.js           # Banco de dados em memória
├── middleware/          # Middlewares (autenticação JWT)
│   └── auth.js
├── graphql/             # API GraphQL
│   ├── schema/
│   │   └── typeDefs.js # Schema GraphQL
│   ├── resolvers/
│   │   └── index.js    # Resolvers GraphQL
│   ├── app.js          # App GraphQL (sem listen)
│   └── server.js       # Servidor GraphQL
├── app.js              # App REST (sem listen)
├── server.js           # Servidor REST
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

3. **Inicie o servidor REST**:

   ```bash
   npm run start-rest
   ```

   **Ou inicie o servidor GraphQL**:

   ```bash
   npm run start-graphql
   ```

   Para desenvolvimento com auto-reload:

   ```bash
   npm run dev          # Para API REST
   npm run dev-graphql  # Para API GraphQL
   ```

## 📡 API REST - Endpoints

A API REST estará disponível em `http://localhost:3000`

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

## � API GraphQL

A API GraphQL estará disponível em `http://localhost:4000/graphql`

### GraphQL Playground

Acesse `http://localhost:4000/graphql` para usar o GraphQL Playground - uma interface interativa para testar queries e mutations.

### Schema GraphQL

#### Types

```graphql
type Trainer {
  id: ID!
  username: String!
  teams: [Team!]!
}

type Team {
  id: ID!
  name: String!
  pokemons: [String!]!
  size: String!
}

type AuthPayload {
  id: ID!
  username: String!
  teams: [Team!]!
  token: String!
  tokenType: String!
}
```

#### Queries (algumas requerem autenticação)

```graphql
type Query {
  # Trainer queries
  allTrainers: [Trainer!]!
  trainer(username: String!): Trainer

  # Team queries (require authentication)
  allTeams: [Team!]!
  trainerTeams(username: String!): [Team!]!
}
```

#### Mutations

```graphql
type Mutation {
  # Authentication mutations
  register(input: RegisterInput!): Trainer!
  login(input: LoginInput!): AuthPayload!

  # Team mutations (require authentication)
  createTeam(input: CreateTeamInput!): Team!
  addPokemonToTeam(input: AddPokemonInput!): Team!
}
```

### Exemplos GraphQL

#### 1. Login e obtenção do token

```graphql
mutation Login {
  login(input: { username: "ash_ketchum", password: "pikachu123" }) {
    id
    username
    token
    tokenType
    teams {
      id
      name
      pokemons
      size
    }
  }
}
```

#### 2. Criar um time (requer autenticação)

```graphql
# Headers: { "Authorization": "Bearer SEU_TOKEN_AQUI" }
mutation CreateTeam {
  createTeam(input: { username: "ash_ketchum", teamName: "Team Elite Four" }) {
    id
    name
    pokemons
    size
  }
}
```

#### 3. Adicionar Pokémon ao time (requer autenticação)

```graphql
# Headers: { "Authorization": "Bearer SEU_TOKEN_AQUI" }
mutation AddPokemon {
  addPokemonToTeam(input: { username: "ash_ketchum", teamName: "Team Kanto", pokemonName: "Snorlax" }) {
    id
    name
    pokemons
    size
  }
}
```

#### 4. Listar todos os times (requer autenticação)

```graphql
# Headers: { "Authorization": "Bearer SEU_TOKEN_AQUI" }
query AllTeams {
  allTeams {
    id
    name
    pokemons
    size
  }
}
```

## �🔧 Exemplos de Uso - API REST

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
| Brock       | `brock_rockhead`    | `geodude123` | Time Cheio    | Onix, Geodude, Kabutops, Golem, Rhydon, Steelix |
 
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

## 🛠️ Arquitetura

A API segue o padrão **MVC** (Model-View-Controller) adaptado:

- **Model** (`model/db.js`): Banco de dados em memória
- **Service** (`service/`): Lógica de negócio e regras
- **Controller** (`controller/`): Rotas e validação de entrada
- **App** (`app.js`): Configuração do Express e middleware
- **Server** (`server.js`): Inicialização do servidor

## ⚠️ Limitações Conhecidas

- **Banco de dados volátil**: Dados são perdidos ao reiniciar
- **Sem persistência**: Ideal para testes, não para produção
- **Sem validação de esquema**: Validação manual nos controllers

---
