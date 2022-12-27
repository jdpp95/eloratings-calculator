const axios = require("axios");
const { default: inquirer } = require("inquirer");

const getSeasonFromChallonge = async () => {
    try {
        const instance = axios.create({
            baseURL: 'https://api.challonge.com/v1/'
        });

        const response = await instance.get(`tournaments.json?api_key=${process.env.CHALLONGE_API_KEY}`, {
            headers: { "Accept-Encoding": "gzip,deflate,compress" }
        });

        const listOfTournaments = [];

        response.data.map(tournament => {
            const tournamentData = tournament.tournament;

            tournamentId = tournamentData.id;
            tournamentName = tournamentData.name;
            tournamentUrl = tournamentData.url;

            listOfTournaments.push({ tournamentId, tournamentName, tournamentUrl });
        });
    } catch (error) {
        console.log(error);
    }

    // const tournamentUrl = "kxr6qvtb"; //Hardcoded string

    // axios({
    //     method: 'get',
    //     url: `https://api.challonge.com/v1/tournaments/${tournamentUrl}.json`
    // })

    const mockSeason = "Test";
    return mockSeason;
}

module.exports = {
    getSeasonFromChallonge
}