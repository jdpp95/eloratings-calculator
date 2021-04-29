const inquirer = require('inquirer');

const askForTournamentName = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'tournamentName',
            message,
            validate(value){
                if (value.length === 0){
                    return 'Please enter a value'
                }
                return true;
            }
        }
    ];

    const {tournamentName} = await inquirer.prompt(question);
    return tournamentName;
}

module.exports = {
    askForTournamentName
}