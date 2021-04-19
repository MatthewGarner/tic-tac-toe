//Global variables

const teamButtons = document.querySelectorAll('.team-select');
const noughts = 'O';
const crosses = 'X';

//Create players

const playerFactory = (name, team) => {
    let teamIcon;
    const getName = () => name;
    const setName = (nameInput) => {
        name = nameInput;
    }
    const getTeamName = () => team;
    const setTeam = (selectedTeam) => {
        team = selectedTeam;
        _setTeamIcon(team);
    };

    const _setTeamIcon = (team) => {
        switch(team) {
            case 'noughts':
                teamIcon = noughts;
                break;
            case 'crosses':
                teamIcon = crosses;
                break;
            default: 
                console.log('Error: invalid team selected');
        }
    }
    const getTeamIcon = () => teamIcon


    return {
        getName,
        setName,
        getTeamName, 
        setTeam,
        getTeamIcon
    };
};

//Gameboard module - store information and functions related to the game board

const Gameboard = (() => {
    let gameBoard = new Array(9);

    const initialiseGameBoard = () => {
        const boardSquares = document.querySelectorAll('.board-square');
        boardSquares.forEach((square, i) => {
            square.setAttribute('data-square-number', i + 1);
            //access with square.dataset.squareNumber

            square.addEventListener('click', e => {
                const pressedSquare = e.target.dataset.squareNumber;
                
                _setSquare(pressedSquare, game.player1.getTeamIcon());
            });
        });
    };

    const _setSquare = (squareNumber, team) => {
        const locationInArray = squareNumber - 1;
        gameBoard[locationInArray] = team;
        


        displayController.renderBoard();
    };

    const getBoardSquare = (number) => gameBoard[number];

    const getUnoccupiedSquares = () => {
        let availableSquares = [];

        console.table(gameBoard);

        gameBoard.forEach((square, i) => {
            if ((square == 'X' || square == 'O')) {
                availableSquares.push(i);
            }
            
            

        })
        return availableSquares;
    }
    
    return {
        getBoardSquare, 
        initialiseGameBoard, 
        getUnoccupiedSquares
    };
})();

//Display controller module - manage what gets displayed on the page

const displayController = (() => {

    const renderBoard = () => {
        const boardSquares = document.querySelectorAll('.board-square');
        boardSquares.forEach((square, i) => {  
            const latestSquareValue = Gameboard.getBoardSquare(i);
            square.querySelector('p').textContent = latestSquareValue;
    });
}

    const showPlayerNames = () => {
        const playerArea = document.getElementById('match-title');
        playerArea.textContent = `${game.player1.getName()} vs ${game.computer.getName()}`;
    }


    return {
        renderBoard, 
        showPlayerNames
    };
})();

//Game module to control flow

const game = (() => {

    const computer = playerFactory("Computer");
    const player1 = playerFactory();

    const getPlayerNameFromUser = (message) => {
        let playerName;
    
        while(true) {
            playerName = prompt(message);
            if(playerName !== undefined && playerName != "") {
                break;
            }
        }
        return playerName;
    };

    const _setNameAndTeams = (event) => {
        const name = getPlayerNameFromUser("Who is playing?");
        if(name === null) {
            return;
        }
        const teamChosen = event.target.dataset.team
        player1.setName(name);
        player1.setTeam(teamChosen);
        
        switch(teamChosen) {
            case "noughts":
                computer.setTeam('crosses');
                break;
            case "crosses":
                computer.setTeam('noughts');
                break;
            default: 
                console.log('ERROR - invalid team chosen');
        };
        teamButtons.forEach(button => button.removeEventListener('click', _setNameAndTeams));
        displayController.showPlayerNames();
        
        };

    teamButtons.forEach(button => button.addEventListener('click', _setNameAndTeams));
    
    const computerMove = () => {

    }; 

    //

    return {
        getPlayerNameFromUser, 
        player1,
        computer
    };
})();




//Add event listener for window
window.addEventListener('load', Gameboard.initialiseGameBoard);

displayController.renderBoard();
window.addEventListener('keydown', () => console.table(Gameboard.getUnoccupiedSquares()));
