const fs = require('fs');
const Team = require('../models/team')
const Match = require('../models/match')

const inputPath = 'input.txt';
const matchesPath = 'matches.txt';
const outputPath = 'output.txt';
const dbPath = 'db.json'

const loadTeams = (tournamentName) => {

    const path = `data/${tournamentName}/${inputPath}`;

    try{
        const listOfTeams = {};

        const rawData = fs.readFileSync(path, { encoding: 'utf-8' }).split('\n')
        rawData.forEach((rawTeam) => {
            const rawTeamArr = rawTeam.split('\t');
            [name = '', rating = 0] = rawTeamArr;

            if(isNaN(rating)){
                rating = rating.replace(',','.');
            }
            rating = rating * 1.0;

            const team = new Team(name, rating);

            if (name.length > 0) {
                listOfTeams[team.name] = team;
            }
        });

        return listOfTeams;
    } catch (exception) {
        if(exception.code === 'ENOENT')
        {
            createFileIfDoesntExist(tournamentName, path);
        } else {
            throw exception
        }
    }
}

const loadMatches = (tournamentName) => {

    const path = `data/${tournamentName}/${matchesPath}`;

    try{
        const listOfMatches = [];

        const rawData = fs.readFileSync(path, { encoding: 'utf-8' }).split('\n')
        rawData.filter(line => line.length > 0)
            .forEach((rawMatch) => {
                [team1, result, team2 = ''] = rawMatch.split('\t');
                team2 = team2.trim();

                [goalsTeam1, goalsTeam2] = result.split('-');

                const match = new Match(team1, team2, goalsTeam1, goalsTeam2);
                listOfMatches.push(match)
            });

        return listOfMatches;
    } catch (exception){
        if(exception.code === 'ENOENT')
        {
            createFileIfDoesntExist(tournamentName, path);
        } else {
            throw exception
        }
    }
}

const createFileIfDoesntExist = (tournamentName, path) => {
    const folderPath = `data/${tournamentName}`;

    if(!fs.existsSync(folderPath))
    {
        fs.mkdirSync(folderPath);
    }

    fs.writeFileSync(path, "");
    console.log("A new file has been created in", path.blue)
}

const saveScores = (listOfTeams = {}, tournamentName) => {
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

    const path = `data/${tournamentName}/${outputPath}`;

    fs.writeFile(path, output, () => {
        console.log(`File saved successfully at ${path.green}`)
    });

    saveDB(listOfTeams, tournamentName);
}

const saveDB = (listOfTeams, tournamentName) => {

    const path = `data/${tournamentName}/${dbPath}`;

    fs.writeFileSync(path, JSON.stringify(listOfTeams))
}

module.exports = {
    loadTeams,
    loadMatches,
    saveScores
}
