const fs = require('fs');
const Team = require('../models/team')
const Match = require('../models/match')

const inputPath = 'input.txt';
const matchesPath = 'matches.txt';
const outputPath = 'output.txt';
const dbPath = 'db.json'

const loadTeams = (tournamentName, season) => {

    const path = `data/${tournamentName}/${season}/${inputPath}`;

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
            createFileIfDoesntExist(tournamentName, season, inputPath);
        } else {
            throw exception
        }
    }
}

const loadMatches = (tournamentName, season) => {

    const path = `data/${tournamentName}/${season}/${matchesPath}`;

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
            createFileIfDoesntExist(tournamentName, season, matchesPath);
        } else {
            throw exception
        }
    }
}

const createFileIfDoesntExist = (tournamentName, season, filename) => {
    const tournamentPath = `data/${tournamentName}`;
    const seasonPath = `${tournamentPath}/${season}`
    const fullPath = `${seasonPath}/${filename}`

    try{
        fs.accessSync(tournamentPath, fs.constants.F_OK);
    } catch(err) {
        if(err?.code === 'ENOENT'){
            fs.mkdirSync(tournamentPath);
        }
    }

    try{
        fs.accessSync(seasonPath, fs.constants.F_OK);
    } catch(err)
    {
        if(err?.code === 'ENOENT'){
            fs.mkdirSync(seasonPath);
        }
    }

    console.log("A new will be created in", fullPath.green)
    fs.writeFileSync(fullPath, "");
    console.log("A new file has been created in", fullPath.green)
}

const saveScores = (listOfTeams = {}, tournamentName, season) => {
    const keys = Object.keys(listOfTeams);
    const path = `data/${tournamentName}/${season}/${outputPath}`;
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

    fs.writeFile(path, output, () => {
        console.log(`File saved successfully at ${path.blue}`)
    });

    saveDB(listOfTeams, tournamentName);
}

const saveDB = (listOfTeams, tournamentName) => {

    const path = `data/${tournamentName}/${dbPath}`;

    fs.writeFileSync(path, JSON.stringify(listOfTeams))
}

const getListOfTournaments = () => {
    return getListOfFolders('data/');
}

const getListOfSeasons = (tournamentName) => {
    try{
        return getListOfFolders(`data/${tournamentName}/`)
    } catch (exception) {
        if(exception.code === 'ENOENT'){
            return [];
        }
    }
}

const getListOfFolders = (path) => {
    const dirContent = fs.readdirSync(path, {withFileTypes: true})
        .filter(item => item.isDirectory())
        .map(item => item.name);

    return dirContent;
}

module.exports = {
    loadTeams,
    loadMatches,
    saveScores,
    getListOfTournaments,
    getListOfSeasons
}
