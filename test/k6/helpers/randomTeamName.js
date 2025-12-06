import faker from 'k6/x/faker';

export function randomTeamName() {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 100000);
  return `Team ${faker.word.adjective()}${timestamp}${random}`;
}
