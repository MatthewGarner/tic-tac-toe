const Gameboard = (() => {
    const gameBoard = [];

    const initialiseGameBoard = () => {
        const boardSquares = document.querySelectorAll('.board-square');
        console.log(boardSquares);
        boardSquares.forEach((square, i) => {
            square.setAttribute('data-square-number', i + 1);
            //access with square.dataset.squareNumber
            (i % 2 == 0) ? 
            square.querySelector('p').textContent = 'X' :
            square.querySelector('p').textContent = 'O';  
            
        })
    }

    const getBoardSquare = (number) => gameBoard[number];
    const add = (a, b) => a + b;
    return {
        add,
        getBoardSquare, 
        initialiseGameBoard
    };
})();

const displayController = (() => {
    const add = (a, b) => a + b;
    return {
        add
    };
})();

const playerFactory = (name) => {
    const getName = () => name;
    return {
        getName
    };
};


//Add event listener for window
window.addEventListener('load', Gameboard.initialiseGameBoard())
