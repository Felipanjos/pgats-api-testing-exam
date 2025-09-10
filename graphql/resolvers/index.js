const trainerService = require('../../service/trainerService');
const teamService = require('../../service/teamService');
const { generateToken } = require('../../middleware/auth');
const { AuthenticationError, ForbiddenError } = require('apollo-server-express');

const resolvers = {
  Query: {
    // Trainer queries
    allTrainers: () => {
      return trainerService.getAllTrainers();
    },

    trainer: (_, { username }) => {
      try {
        return trainerService.getTrainerByUsername(username);
      } catch (error) {
        return null;
      }
    },

    // Team queries (require authentication)
    allTeams: (_, __, { user }) => {
      if (!user) {
        throw new AuthenticationError('Token de acesso é obrigatório');
      }
      return teamService.getAllTeams();
    },

    trainerTeams: (_, { username }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Token de acesso é obrigatório');
      }
      return teamService.getTrainerTeams(username);
    },
  },

  Mutation: {
    // Authentication mutations
    register: (_, { input }) => {
      const { username, password } = input;
      return trainerService.registerTrainer(username, password);
    },

    login: (_, { input }) => {
      const { username, password } = input;
      const trainer = trainerService.loginTrainer(username, password);
      const token = generateToken(trainer);

      return {
        ...trainer,
        token: token,
        tokenType: 'Bearer',
      };
    },

    // Team mutations (require authentication)
    createTeam: (_, { input }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Token de acesso é obrigatório');
      }

      const { username, teamName } = input;
      return teamService.createTeam(username, teamName);
    },

    addPokemonToTeam: (_, { input }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Token de acesso é obrigatório');
      }

      const { username, teamName, pokemonName } = input;
      return teamService.addPokemonToTeam(username, teamName, pokemonName);
    },
  },

  // Custom scalar resolvers
  Team: {
    size: (team) => {
      return team.pokemons ? team.pokemons.length.toString() : '0';
    },
  },
};

module.exports = resolvers;
