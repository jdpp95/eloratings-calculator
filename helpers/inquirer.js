const inquirer = require('inquirer');

const askForTournamentName = async (listOfTournaments = []) => {
    let choices = listOfTournaments.map((tournamentName, i) => {
        const idx = `${i + 1}.`.blue;

        return {
            value: tournamentName,
            name: `${idx} ${tournamentName}`
        }
    });

    choices.push({
        value: 0,
        name: "0. ".blue + "Create a new tournament".green
    })

    const question = [
        {
            type: 'list',
            name: 'tournament',
            message: 'Select a tournament',
            choices
        }
    ];

    const {tournament} = await inquirer.prompt(question);
    return tournament;
}

const askForSeason = async (listOfSeasons = []) => {
    let choices = listOfSeasons.map(season => {
        return {
            value: season,
            name: season
        }
    });

    choices.push({
        value: 0,
        name: "Start new season".green
    })

    const question = [
        {
            type: 'list',
            name: 'season',
            message: 'Select a season',
            choices
        }
    ];

    const {season} = await inquirer.prompt(question);
    return season;
}

const askForNewTournamentName = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'tournamentName',
            message,
            validate(value){
                if (value.length === 0){
                    return 'Please enter a value'
                }
                return true;
            }
        }
    ];

    const {tournamentName} = await inquirer.prompt(question);
    return tournamentName;
}

const askForNewSeasonName = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'seasonName',
            message,
            validate(value){
                if (value.length === 0){
                    return 'Please enter a value'
                }
                return true;
            }
        }
    ];

    const {seasonName} = await inquirer.prompt(question);
    return seasonName;
}

module.exports = {
    askForNewTournamentName,
    askForTournamentName,
    askForSeason,
    askForNewSeasonName
}