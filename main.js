const cells = Array.from(document.getElementsByClassName('cell'));
const playerDisplay = document.querySelector('.display-player');
const restartButton = document.getElementById('restart');
const announcer = document.querySelector('.announcer');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

let turnCount = 0;

const PLAYERX_WON = 'PLAYERX_WON';
const PLAYERO_WON = 'PLAYERO_WON';
const TIE = 'TIE';

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//will be true if unoccupied
const isValidAction = (cell) => {
    if (cell.innerHTML === 'X' || cell.innerHTML === 'O'){
        return false;
    }

    return true;
};

//board array is updated
const updateBoard =  (index) => {
    board[index] = currentPlayer;
}

//h2 changes name of player
const changePlayer = () => {
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerDisplay.innerHTML = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);
}

//function when clicking the cell
const userAction = (cell, index) => {
    if(isValidAction(cell) && isGameActive) {
        turnCount++;
        cell.innerHTML = currentPlayer;
        cell.classList.add(`player${currentPlayer}`);
        updateBoard(index);

        if (turnCount >= 5)
        {
            checkIfWon();
        }

        changePlayer();
    }
}

//restarts the game
const resetBoard = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    turnCount = 0;
    announcer.classList.add('hide');

    if (currentPlayer === 'O') {
        changePlayer();
    }

    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('playerX');
        cell.classList.remove('playerO');
    });
}

//will check when player has won based on turns(5)
//player will win
function checkIfWon() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

if (roundWon) {
        announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
        isGameActive = false;
        return;
    }

if (!board.includes(''))
    announce(TIE);
}

//announcement and alert will pop up to showcase winner 
//result in a tie
const announce = (type) => {
    switch(type){
        case PLAYERO_WON:
            announcer.innerHTML = 'Player O Won!';

            if (announcer.classList.contains('alert-secondary'))
            {
                announcer.classList.remove('alert.secondary');
                announcer.classList.add('alert-success');
            }
            break;
        case PLAYERX_WON:
            announcer.innerHTML = 'Player X Won!';

            if (announcer.classList.contains('alert-secondary'))
            {
                announcer.classList.remove('alert.secondary');
                announcer.classList.add('alert-success');
            }
            break;
        case TIE:
            announcer.innerText = 'Tie';
            
            if (announcer.classList.contains('alert-success'))
            {
                announcer.classList.remove('alert-success');
                announcer.classList.add('alert-secondary');
            }
    }

    announcer.classList.remove('hide');
};

//each cell will have a click event 
cells.forEach( (cell, index) => {
    cell.addEventListener('click', () => userAction(cell, index));
});

//when clicked will resetboard to play again
restartButton.addEventListener('click', resetBoard);
