const TEAM_MESSAGES = {
  TEAM_FIELDS_REQUIRED: 'Username e teamName são obrigatórios',
  POKEMON_FIELDS_REQUIRED: 'Username, teamName e pokemonName são obrigatórios',
  TEAM_FULL: 'Um time não pode ter mais de 6 Pokémon',
};

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,

  BAD_REQUEST: 400,
};

module.exports = {
  TEAM_MESSAGES,
  HTTP_STATUS,
};
