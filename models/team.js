class Team {
    name = '';
    rating = 0;
    hasPlayed = false;
    totalMatches = 0;

    constructor(name, score){
        this.name = name;
        this.rating = score;
    }
}

module.exports = Team;