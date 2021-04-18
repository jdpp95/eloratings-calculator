class Match {
    team1 = '';
    team2 = '';
    score1 = 0;
    score2 = 0;

    constructor(team1, team2, score1, score2){
        this.team1 = team1;
        this.team2 = team2;
        this.score1 = score1;
        this.score2 = score2;
    }
}

module.exports = Match;