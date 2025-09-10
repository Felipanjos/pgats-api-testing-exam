const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # Types
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

  # Input Types
  input RegisterInput {
    username: String!
    password: String!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  input CreateTeamInput {
    username: String!
    teamName: String!
  }

  input AddPokemonInput {
    username: String!
    teamName: String!
    pokemonName: String!
  }

  # Queries
  type Query {
    # Trainer queries
    allTrainers: [Trainer!]!
    trainer(username: String!): Trainer

    # Team queries
    allTeams: [Team!]!
    trainerTeams(username: String!): [Team!]!
  }

  # Mutations
  type Mutation {
    # Authentication mutations
    register(input: RegisterInput!): Trainer!
    login(input: LoginInput!): AuthPayload!

    # Team mutations (require authentication)
    createTeam(input: CreateTeamInput!): Team!
    addPokemonToTeam(input: AddPokemonInput!): Team!
  }
`;

module.exports = typeDefs;
