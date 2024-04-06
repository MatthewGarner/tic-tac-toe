//Create and Operate on the gameboard
const gameBoard = (function() {
    const rows = 3;
    const columns = 3;

    const board = new Array(rows);
    for (let i = 0; i < rows; i++) {
        board[i] = new Array(columns);
    }

    //return the full game board
    const getBoard = function() {
        return board;
    }
    
    //place token on board
    const placeToken = function (row, col, token) {
        board[row][col] = token;
    }

    return {getBoard, placeToken};
})();

//Game Controller - handle game state and flow
const gameController = (function() {
    const player1Name = 'Player 1';
    const player2Name = 'Player 2';


})();

//play a round



//displayController - manage UI changes
const displayController = (function() {
    console.log('hello');

    //update screen

    // handle clicks on the board
})();


//