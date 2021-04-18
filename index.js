require('colors');

const {loadTeams, loadMatches, saveScores} = require('./helpers/fileReader');
const computeScores = require('./helpers/calculator');

console.log('----------------------------------'.blue);
console.log('|     ELO Ratings calculator     |'.blue);
console.log('----------------------------------'.blue);

const listOfTeams = loadTeams();
const listOfMatches = loadMatches();

computeScores(listOfTeams, listOfMatches);

saveScores(listOfTeams);