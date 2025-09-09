const bcrypt = require('bcryptjs');

// Banco de dados em memória para armazenar treinadores e seus times
const db = {
  trainers: [
    // Estrutura: { id, username, password, teams: [{ id, name, pokemons: [] }] }
    {
      id: 1,
      username: 'ash_ketchum',
      password: bcrypt.hashSync('pikachu123', 8),
      teams: [
        {
          id: 1,
          name: 'Team Kanto',
          pokemons: ['Pikachu', 'Charizard', 'Blastoise'],
        },
      ],
    },
    {
      id: 2,
      username: 'gary_oak',
      password: bcrypt.hashSync('eevee456', 8),
      teams: [
        {
          id: 2,
          name: 'Team Elite',
          pokemons: ['Umbreon', 'Arcanine', 'Exeggutor', 'Machamp'],
        },
      ],
    },
    {
      id: 3,
      username: 'misty_waterflower',
      password: bcrypt.hashSync('staryu789', 8),
      teams: [
        {
          id: 3,
          name: 'Team Cerulean',
          pokemons: ['Starmie', 'Psyduck', 'Goldeen', 'Horsea', 'Gyarados'],
        },
      ],
    },
  ],
  nextTrainerId: 4,
  nextTeamId: 4,
};

module.exports = db;
