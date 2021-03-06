/*
 * These formulas were extracted from this page:
 * http://eloratings.net/about
 */

const initialK = 40; //K is a weight constant

const computeScores = (listOfTeams, listOfMatches = []) => {
    listOfMatches.forEach((match) => {
        const team1 = extractTeam(listOfTeams, match.team1);
        const team2 = extractTeam(listOfTeams, match.team2);

        /*
         * K is then adjusted for the goal difference in the game. It is 
         * increased by half if a game is won by two goals, by 3/4 if a game is 
         * won by three goals, and by 3/4 + (N-3)/8 if the game is won by four 
         * or more goals, where N is the goal difference.
        */
        let k = initialK;
        const goalDiff = Math.abs(match.score1 - match.score2);
        if(goalDiff == 2){
            k *= 1.5;
        } else if (goalDiff > 2){
            k *= 3/4 + (goalDiff - 3)/8;
        }

        let ratingDiff = team1.rating - team2.rating;

        let k1 = adjustK(k, team1.totalMatches);
        let k2 = adjustK(k, team2.totalMatches);

        newScore1 = computeElo(team1.rating, k1, match.score1, match.score2, ratingDiff);
        newScore2 = computeElo(team2.rating, k2, match.score2, match.score1, -ratingDiff);

        team1.rating = newScore1;
        team2.rating = newScore2;

        team1.hasPlayed = team2.hasPlayed = true;

        team1.totalMatches += 1;
        team2.totalMatches += 1;
    });
}

const computeElo = (oldRating = 0, k = 0, goalsFor = 0, goalsAgainst = 0, ratingDiff = 0) => {

    //console.log({oldRating, k, goalsFor, goalsAgainst, ratingDiff})
    //W is the result of the game (1 for a win, 0.5 for a draw, and 0 for a loss).
    let w = 0.5;
    if(goalsFor > goalsAgainst) {
        w = 1;
    } else if (goalsFor < goalsAgainst) {
        w = 0;
    }

    //We is the winning expectancy
    let we = 1/(Math.pow(10, -ratingDiff/400) + 1);

    const newScore = oldRating + k*(w - we);
    return newScore;
}

const extractTeam = (listOfTeams, teamName) => {
    const team = listOfTeams[teamName];

    if(!team){
        throw `${teamName} not found!`.red
    }

    return team;
}

const adjustK = (k, totalMatches) => {
    if(totalMatches >= 30){
        return k;
    } else if(totalMatches >= 10){
        return k * 1.5;
    } else {
        return k * 2;
    }
}

module.exports = computeScores;