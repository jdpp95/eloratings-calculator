const fs = require('fs');
const Team = require('../models/team')
const Match = require('../models/match')

const inputPath = 'data/input.txt';
const matchesPath = 'data/matches.txt'

const loadTeams = () => {
    const listOfTeams = {};

    const rawData = fs.readFileSync(inputPath, { encoding: 'utf-8' }).split('\n')
    rawData.forEach((rawTeam) => {
        [name = '', rating = 0] = rawTeam.split('\t')
        rating = rating * 1.0;

        const team = new Team(name, rating);

        if (name.length > 0) {
            listOfTeams[team.name] = team;
        }
    });

    return listOfTeams;
}

const loadMatches = () => {

    const listOfMatches = [];

    const rawData = fs.readFileSync(matchesPath, { encoding: 'utf-8' }).split('\n')
    rawData.filter(line => line.length > 0)
        .forEach((rawMatch) => {
            [team1, result, team2 = ''] = rawMatch.split('\t');
            team2 = team2.trim();

            [goalsTeam1, goalsTeam2] = result.split('-');

            const match = new Match(team1, team2, goalsTeam1, goalsTeam2);
            listOfMatches.push(match)
        });

    return listOfMatches;
}

const saveScores = (listOfTeams = {}) => {
    const keys = listOfTeams.keys;
    console.log(keys)

    /*
    keys.forEach((team) => {
        console.log(team)
    });*/
}

module.exports = {
    loadTeams,
    loadMatches,
    saveScores
}
