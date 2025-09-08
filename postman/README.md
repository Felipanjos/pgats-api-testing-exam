# Postman Collection - Pokémon Teams API

Esta pasta contém os arquivos necessários para testar a API Pokémon Teams no Postman.

## 📁 Arquivos Inclusos

### 1. `Pokemon_Teams_API.postman_collection.json`

Collection completa com todos os endpoints da API e testes automatizados.

### 2. `Pokemon_Teams_API.postman_environment.json`

Arquivo de ambiente com variáveis pré-configuradas.

## 🚀 Como Importar no Postman

### Importar a Collection:

1. Abra o Postman
2. Clique em **Import** (canto superior esquerdo)
3. Selecione **Upload Files**
4. Escolha o arquivo `Pokemon_Teams_API.postman_collection.json`
5. Clique em **Import**

### Importar o Environment:

1. No Postman, clique no ícone de engrenagem ⚙️ (canto superior direito)
2. Selecione **Import**
3. Escolha o arquivo `Pokemon_Teams_API.postman_environment.json`
4. Clique em **Import**
5. Selecione o environment "Pokémon Teams API - Environment" no dropdown

## 📋 Estrutura da Collection

### 🔍 **Health Check**

- Verifica se a API está funcionando

### 👤 **Treinadores**

- **Registrar Treinador - Ash**: Cria um novo treinador para testes
- **Registrar Treinador - Duplicado**: Testa a regra de username único
- **Login Treinador - Sucesso**: Login com credenciais válidas
- **Login Treinador - Credenciais Inválidas**: Testa login com dados incorretos

### 🏆 **Times**

- **Criar Time - Sucesso**: Cria um novo time
- **Adicionar Pokémon ao Time**: Adiciona o primeiro Pokémon
- **Adicionar Múltiplos Pokémon**: Pasta com requests para adicionar 2º ao 6º Pokémon
- **Adicionar 7º Pokémon (Erro)**: Testa o limite de 6 Pokémon por time
- **Listar Times de um Treinador**: Lista times específicos de um treinador
- **Listar Todos os Times**: Lista todos os times de todos os treinadores

### 🎯 **Treinadores Pré-cadastrados**

- **Login - Gary Oak**: Login com treinador pré-cadastrado
- **Login - Misty**: Login com treinador pré-cadastrado
- **Listar Times - Gary Oak**: Ver times do Gary
- **Listar Times - Misty**: Ver times da Misty

## ✅ Testes Automatizados

Cada request inclui testes automatizados que verificam:

- **Status codes** corretos (200, 201, 400, 401, 500)
- **Estrutura de resposta** esperada
- **Propriedades obrigatórias** nos objetos de resposta
- **Regras de negócio** específicas (limite de Pokémon, username único, etc.)

## 🎮 Dados de Exemplo Pré-cadastrados

A API já contém 3 treinadores para testes:

| Username            | Password     | Time          | Pokémon                                         |
| ------------------- | ------------ | ------------- | ----------------------------------------------- |
| `ash_ketchum`       | `pikachu123` | Team Kanto    | Pikachu, Charizard, Blastoise (3)               |
| `gary_oak`          | `eevee456`   | Team Elite    | Umbreon, Arcanine, Exeggutor, Machamp (4)       |
| `misty_waterflower` | `staryu789`  | Team Cerulean | Starmie, Psyduck, Goldeen, Horsea, Gyarados (5) |

## 🔄 Fluxo de Testes Sugerido

1. **Iniciar com Health Check** - Verificar se a API está funcionando
2. **Testar registros** - Criar novos treinadores e testar validações
3. **Testar logins** - Autenticação com credenciais válidas e inválidas
4. **Testar criação de times** - Criar times para os treinadores
5. **Testar adição de Pokémon** - Adicionar até 6 Pokémon e testar o limite
6. **Testar listagens** - Ver times individuais e geral
7. **Testar com dados pré-cadastrados** - Usar treinadores de exemplo

## 🚀 Execução dos Testes

### Executar Collection Completa:

1. Clique na collection "Pokémon Teams API"
2. Clique em **Run** (botão azul)
3. Selecione todas as requests ou apenas as desejadas
4. Clique em **Run Pokémon Teams API**

### Executar Request Individual:

1. Selecione a request desejada
2. Clique em **Send**
3. Veja os resultados na aba **Test Results**

## 📊 Variáveis de Ambiente

As seguintes variáveis estão configuradas:

- `baseUrl`: http://localhost:3000
- `testUsername`: ash_test (para testes de registro)
- `existingTrainer1`: ash_ketchum (treinador pré-cadastrado)
- `existingTrainer2`: gary_oak (treinador pré-cadastrado)
- `existingTrainer3`: misty_waterflower (treinador pré-cadastrado)
- E suas respectivas senhas

## 🎯 Cenários de Teste Cobertos

### ✅ **Casos de Sucesso:**

- Registro de novo treinador
- Login com credenciais válidas
- Criação de time
- Adição de Pokémon (1 a 6)
- Listagem de times

### ❌ **Casos de Erro:**

- Registro com username duplicado
- Login com credenciais inválidas
- Tentativa de adicionar 7º Pokémon
- Busca por treinador inexistente

### 🔍 **Validações:**

- Campos obrigatórios
- Limites de negócio
- Estrutura de dados de resposta
- Status codes apropriados

---

**Nota:** Certifique-se de que o servidor da API está rodando em `http://localhost:3000` antes de executar os testes!
