class Team {
    name = '';
    rating = 0;
    hasPlayed = false;
    totalMatches = 0;

    constructor(name, score, totalMatches){
        this.name = name;
        this.rating = score;
        this.totalMatches = totalMatches * 1;
    }
}

module.exports = Team;