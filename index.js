require('colors');

const {loadTeams, loadMatches, saveScores} = require('./helpers/fileReader');
const computeScores = require('./helpers/calculator');
const { askForTournamentName } = require('./helpers/inquirer');

const main = async() => {

    console.log('----------------------------------'.blue);
    console.log('|     ELO Ratings calculator     |'.blue);
    console.log('----------------------------------'.blue);

    const tournamentName = await askForTournamentName('Please enter a name for the tournament:');

    const listOfTeams = loadTeams(tournamentName);
    const listOfMatches = loadMatches(tournamentName);

    computeScores(listOfTeams, listOfMatches);
    saveScores(listOfTeams, tournamentName);
}

main();