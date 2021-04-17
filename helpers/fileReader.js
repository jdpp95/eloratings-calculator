const fs = require('fs');
const Team = require('../models/team')

const inputPath = 'data/input.txt';

const loadData = () => {
    const listOfTeams = [];

    const rawData = fs.readFileSync(inputPath, {encoding: 'utf-8'}).split('\n')
    rawData.forEach((rawTeam) => {
        [name = '', score = 0] = rawTeam.split('\t')
        score = score * 1.0;

        const team = new Team(name, score);

        if(name.length > 0){
            listOfTeams.push(team);
        }
    });

    return listOfTeams;
}

module.exports = loadData;
