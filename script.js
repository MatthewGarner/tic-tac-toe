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
                _setSquare(pressedSquare);
            });

            (i % 2 == 0) ? 
            square.querySelector('p').textContent = 'X' :
            square.querySelector('p').textContent = 'O';  
            
        })
    }

    const _setSquare = (squareNumber, team) => {
        const locationInArray = squareNumber - 1;
        
        const newValue = team || 'X';

        gameBoard[locationInArray] = newValue;

        displayController.renderBoard();
    }

    const getBoardSquare = (number) => gameBoard[number];
    
    return {
        getBoardSquare, 
        initialiseGameBoard
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

    return {
        renderBoard
    };
})();

//Create players

const playerFactory = (name, team) => {

    const getName = () => name;
    const getTeam = () => team;
    const setTeam = (selectedTeam) => {
        team = selectedTeam;
    }


    return {
        getName, 
        getTeam, 
        setTeam
    };
};


//Add event listener for window
window.addEventListener('load', Gameboard.initialiseGameBoard())

window.setTimeout(displayController.renderBoard, 2000)