
let currentPlayer = 'X';
let gameBoard = Array(9).fill('');
let gameActive = true;

// 2D array of win combinations
const winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

const cells = document.querySelectorAll('.item');
const gameStatus = document.querySelector('.container p');

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleMove(index));
});

function handleMove(index) {
    if (!gameActive || gameBoard[index]) return;
    gameStatus.textContent = `Player ${currentPlayer}'s turn`;

    

    gameBoard[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    
    if (checkWin()) {
        gameStatus.textContent = `${currentPlayer} wins!`;
        setTimeout(()=> {
            gameStatus.textContent = `Click Reset to Start Again`;
        },2000);
        gameActive = false;
        return;
    }

    if (gameBoard.every(cell => cell)) {
        gameStatus.textContent = "It's a draw!";
        gameActive = false;
        setTimeout(()=> {
            gameStatus.textContent = `Click Reset to Start Again`;
        },2000);
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    gameStatus.textContent = `${currentPlayer}'s turn`;
}

function checkWin() {
    return winCombos.some(combo => {
        if (combo.every(i => gameBoard[i] === currentPlayer)) {
            combo.forEach(i => cells[i].style.backgroundColor = '#4CAF50');
            return true;
        }
    });
}

// Add reset button
const resetBtn = document.querySelector('body button');
resetBtn.textContent = 'Reset';
resetBtn.onclick = () => {
    gameBoard = Array(9).fill('');
    gameActive = true;
    currentPlayer = 'X';
    gameStatus.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = '#40058f';
    });
    clearTimeout();
};

