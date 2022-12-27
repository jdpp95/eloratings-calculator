require('colors');
require('dotenv').config();

const {
    loadTeams, 
    loadMatches, 
    saveScores, 
    getListOfTournaments,
    getListOfSeasons
} = require('./helpers/fileReader');

const computeScores = require('./helpers/calculator');

const { 
    askForTournamentName, 
    askForNewTournamentName,
    askForSeason,
    askForNewSeasonName
} = require('./helpers/inquirer');

const {
    getSeasonFromChallonge
} = require('./helpers/challonge')

const main = async() => {

    console.log('----------------------------------'.blue);
    console.log('|     ELO Ratings calculator     |'.blue);
    console.log('----------------------------------'.blue);

    // Choose tournament

    const listOfTournaments = getListOfTournaments();
    let tournamentName = 0;

    if(listOfTournaments.length > 0){
        tournamentName = await askForTournamentName(listOfTournaments);
    } 
    
    if (tournamentName === 0){
        tournamentName = await askForNewTournamentName('Please enter the name of the new tournament:');
    }

    //Choose season

    const listOfSeasons = getListOfSeasons(tournamentName);
    let season = 0;

    if(listOfSeasons.length > 0){
        season = await askForSeason(listOfSeasons);
    }

    if(season === 0){
        season = await askForNewSeasonName('Please enter the name of the new season:');
    } else if (season === 1){
        season = await getSeasonFromChallonge();
    }

    const listOfTeams = loadTeams(tournamentName, season);
    const listOfMatches = loadMatches(tournamentName, season);

    computeScores(listOfTeams, listOfMatches);
    saveScores(listOfTeams, tournamentName, season);
}

main();