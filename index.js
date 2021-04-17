require('colors')

const loadData = require('./helpers/fileReader')

console.log('----------------------------------'.blue)
console.log('|     ELO Ratings calculator     |'.blue)
console.log('----------------------------------'.blue)

const listOfTeams = loadData();

console.log(listOfTeams);