document.addEventListener("DOMContentLoaded", () => {
    const boxes = document.querySelectorAll('.box');
    const printElement = document.getElementById('print');
    const resetButton = document.getElementById('reset');
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    boxes.forEach((box, index) => {
        box.addEventListener('click', () => handleBoxClick(box, index));
    });

    resetButton.addEventListener('click', restartGame);

    window.addEventListener('keydown', (event) => {
        if (event.key === 'r') {
            restartGame();
        }
    });

    function handleBoxClick(box, index) {
        if (gameBoard[index] !== '' || !gameActive) return;

        gameBoard[index] = currentPlayer;
        box.value = currentPlayer;
        box.disabled = true;

        if (checkWin()) {
            endGame(`Player ${currentPlayer} won`);
        } else if (gameBoard.every(cell => cell !== '')) {
            endGame("Match Tie");
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateMessage(`Player ${currentPlayer} Turn`);
        }
    }

    function checkWin() {
        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                highlightWinningBoxes([boxes[a], boxes[b], boxes[c]]);
                return true;
            }
            return false;
        });
    }

    function highlightWinningBoxes(winningBoxes) {
        winningBoxes.forEach(box => {
            box.style.color = 'cadetBlue';
        });
    }

    function endGame(message) {
        gameActive = false;
        updateMessage(message);
        boxes.forEach(box => box.disabled = true);
    }

    function updateMessage(msg) {
        printElement.textContent = msg;
    }

    function restartGame() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';
        boxes.forEach(box => {
            box.value = '';
            box.disabled = false;
            box.style.color = '';
        });
        updateMessage("Player X Turn");
    }

    updateMessage("Player X Turn");
});
