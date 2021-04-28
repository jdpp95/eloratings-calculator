const fs = require('fs');
const Team = require('../models/team')
const Match = require('../models/match')

const inputPath = 'data/input.txt';
const matchesPath = 'data/matches.txt';
const outputPath = 'data/output.txt';

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
    const keys = Object.keys(listOfTeams);
    output = "";

    keys.forEach((key, index) => {
        const {name, rating, hasPlayed} = listOfTeams[key];

        if(hasPlayed)
        {
            if(index%2 == 0){
                console.log(`${name.yellow}\t${rating.toFixed(2).yellow}`)
            }
            else{
                console.log(`${name}\t${rating.toFixed(2)}`)
            }
            
            output += `${name}\t${rating.toFixed(4).replace('.',',')}\n`;
        }
    });

    fs.writeFile(outputPath, output, () => {
        console.log("File saved successfully!".green)
    });
}

module.exports = {
    loadTeams,
    loadMatches,
    saveScores
}
