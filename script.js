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
    //let gameBoard = new Array(9);
    let gameBoard = Array.apply(null, Array(9));

    const initialiseGameBoard = () => {
        const boardSquares = document.querySelectorAll('.board-square');
        boardSquares.forEach((square, i) => {
            square.setAttribute('data-square-number', i + 1);
            //access with square.dataset.squareNumber

            square.addEventListener('click', e => {
                //Should this be in the game module?
                const pressedSquare = e.target.dataset.squareNumber;
                
                setSquare(pressedSquare, game.player1.getTeamIcon());
                game.computerMove();
            });
        });
    };

    const setSquare = (squareNumber, team) => {
        const locationInArray = squareNumber - 1;
        gameBoard[locationInArray] = team;

        displayController.renderBoard();
    };

    const getBoardSquare = (number) => gameBoard[number];

    const getUnoccupiedSquares = () => {
        let availableSquares = [];

        gameBoard.forEach((square, i) => {
            if (square !== 'X' && square !== 'O') {
                availableSquares.push(i);
            }
        })
        
        return availableSquares;
    }
    
    return {
        getBoardSquare, 
        initialiseGameBoard, 
        getUnoccupiedSquares,
        setSquare
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
        
        if (_checkHorizontalVictory()) {
            alert('Player Wins!');
            return;
        }


        //dumb logic - grab first available space

        const availableMoves = Gameboard.getUnoccupiedSquares();
        console.log(availableMoves);
        const chosenMove = availableMoves[0] + 1; //setSquare needs square number
        console.log(chosenMove);
        Gameboard.setSquare(chosenMove, computer.getTeamIcon());
        
    }; 

    const _checkForAvailableMoves = () => {
        const movesAreAvailable = (Gameboard.getUnoccupiedSquares().length !== 0) ?
            true :
            false;
            return movesAreAvailable;
    }

    const _checkHorizontalVictory = () => {
        //Horizontals - 1,2,3 + 4,5,6 + 7,8,9

        let isVictory;

        if ((Gameboard.getBoardSquare(1) == 'X' || Gameboard.getBoardSquare(1) == 'O') &&
                Gameboard.getBoardSquare(1)  == Gameboard.getBoardSquare(2) &&
                Gameboard.getBoardSquare(3)  == Gameboard.getBoardSquare(2)) {
                    isVictory = true;
                    return isVictory;
                } else if ((Gameboard.getBoardSquare(4) == 'X' || Gameboard.getBoardSquare(4) == 'O') &&
                Gameboard.getBoardSquare(4)  == Gameboard.getBoardSquare(5) &&
                Gameboard.getBoardSquare(5)  == Gameboard.getBoardSquare(6)) {
                    isVictory = true;
                    return isVictory;
                }
                else return false;
    }

    //

    return {
        getPlayerNameFromUser, 
        player1,
        computer,
        computerMove
    };
})();




//Add event listener for window
window.addEventListener('load', Gameboard.initialiseGameBoard);

displayController.renderBoard();
window.addEventListener('keydown', () => console.table(Gameboard.getUnoccupiedSquares()));
