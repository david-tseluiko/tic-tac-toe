// Goal: Make Tic Tac Toe game playable in browser
// Create a function Gameboard
function Gameboard() {
    // create rows and columns constants for creating the gameboard list
    const rows = 3;
    const cols = 3;

    const elements = Array.from(document.querySelectorAll(".list__item"));
    board = createBoard();

    function createBoard() {
        let board = [];
        // Store the gameboard in 3d array using the for loop (in order to make the checking for win a bit easier)
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < cols; j++) {
                board[i].push(elements[translateToArrayStyle(i, j)]);
            }
        }

        return board;
    }

    function clearBoard() {
        elements.forEach((item) => {
            item.textContent = "";
        });
    }

    function getBoard() {
        return board;
    }

    function translateToArrayStyle(numberRow, numberColumn) {
        return numberRow * 3 + numberColumn;
    }

    // Create a function translateToBoardStyle that would translate a number between 1, 9 to 3d ():
    function translateToBoardStyle(number) {
        number--;

        // Translate the number into the row and column
        const row = parseInt(number / 3);
        const column = parseInt(number % 3);

        // Return values as an array
        return [row, column];
    }

    // Create function changeBoard which would receive a number between 1, 9 and a player side
    function changeBoard(number, playerSide) {
        // Call function translateToBoardStyle and store in the the numberRow and numberColumn variables
        let [numberRow, numberColumn] = translateToBoardStyle(number);

        // Place the player side into the gameboard object using rows and cols variables
        board[numberRow][numberColumn].textContent = playerSide;
    }

    function isOccupied(number) {
        let [numberRow, numberColumn] = translateToBoardStyle(number);
        return board[numberRow][numberColumn].textContent !== "";
    }

    // isWonVertically which would take number and playerSide
    function isWonVertically(number, playerSide) {
        // Call function translateToBoardStyle and store in the in variables rows and cols
        let [numberRow, numberColumn] = translateToBoardStyle(number);
        // Create a for loop
        // Loop through each global row
        for (let i = 0; i < rows; i++) {
            // Check if each board[globalRow][localCols] equal to playerSide
            if (board[i][numberColumn].textContent !== playerSide) {
                return false;
            }
        }
        return true;
    }

    // isWonHorizontally which would take number and playerSide
    function isWonHorizontally(number, playerSide) {
        // Call function translateToBoardStyle and store in the in variables rows and cols
        let [numberRow, numberColumn] = translateToBoardStyle(number);
        // Create a for loop
        // Loop through each global column
        for (let i = 0; i < cols; i++) {
            // Check if each board[localRow][globalColumn] equal to playerSide
            if (board[numberRow][i].textContent !== playerSide) return false;
        }
        return true;
    }

    // isWonDiagonally which would take number (1, 9) and playerSide
    function isWonDiagonally(number, playerSide) {
        if ([2, 4, 6, 8].includes(number)) {
            return false;
        }

        let itLeftDiagonalWinning = true;
        let itRightDiagonalWinning = true;

        let rightDiagonalColumnIndex = 2;

        for (let i = 0; i < rows; i++) {
            if (board[i][i].textContent !== playerSide) {
                itLeftDiagonalWinning = false;
            }
            if (
                board[i][rightDiagonalColumnIndex--].textContent !== playerSide
            ) {
                itRightDiagonalWinning = false;
            }
        }

        return itLeftDiagonalWinning || itRightDiagonalWinning;
    }

    // Create function isTie with no parameters
    function isTie() {
        // Check each gameboard value and if you find empty value
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (board[i][j].textContent === "") {
                    return false;
                }
            }
        }
        return true;
    }

    return {
        getBoard,
        changeBoard,
        isOccupied,
        isWonVertically,
        isWonHorizontally,
        isWonDiagonally,
        isTie,
        clearBoard,
    };
}

// Player function which would assemble players for the Game IIFE {name, side}
function Player(name, side) {
    return {
        name: name,
        side: side.toLowerCase(),
    };
}

// Create a Game IIFE where all of the game stuff would be executed (need IIFE because otherwise someone can access the variables from the console)
(function Game() {
    const board = Gameboard();
    const boardItems = document.querySelectorAll(".list__item");
    const sideButtons = document.querySelectorAll(".main__button");

    let user;
    let computer;

    assignSides(sideButtons);

    let isPriorityPlayer = true;

    computerFirstToMove(board);

    boardItems.forEach((item) => {
        item.addEventListener("click", (event) => {
            const elementIndex =
                Array.from(boardItems).indexOf(event.target) + 1;

            if (isPriorityPlayer && user.side === "x") {
                if (makeMove(user, elementIndex, board)) {
                    makeComputerMove(computer, board);
                }
            } else if (!isPriorityPlayer && user.side === "o") {
                if (makeMove(user, elementIndex, board)) {
                    makeComputerMove(computer, board);
                }
            }
        });
    });

    sideButtons.forEach((item) => {
        item.addEventListener("click", (event) => {
            console.log(event.target.classList);

            if (!event.target.classList.contains("main__button--active")) {
                // event.target.classList.remove("main__button--active")
                event.target.classList.add("main__button--active");

                if (event.target.textContent === "o") {
                    sideButtons[0].classList.remove("main__button--active");
                } else {
                    sideButtons[1].classList.remove("main__button--active");
                }

                assignSides(sideButtons);
                resetTheGame(board, false);
            }
        });
    });

    function assignSides(sideButtons) {
        if (sideButtons[0].classList.contains("main__button--active")) {
            user = Player("Player", "x");
            computer = Player("Computer", "o");
        } else {
            computer = Player("Computer", "x");
            user = Player("Player", "o");
        }
    }

    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    function computerFirstToMove(board) {
        // check if computer is actually first to move
        if (isPriorityPlayer && computer.side === "x") {
            makeComputerMove(computer, board);
            isPriorityPlayer = false;
        }
    }

    async function makeComputerMove(computer, board) {
        let randomNumber;

        do {
            randomNumber = Math.floor(Math.random() * 9) + 1;
        } while (board.isOccupied(randomNumber));

        await sleep(300);
        makeMove(computer, randomNumber, board);
    }

    async function resetTheGame(board, isSleepNeed=true) {
        if (isSleepNeed) {
            await sleep(500);
        }
        board.clearBoard();
        isPriorityPlayer = true;
        computerFirstToMove(board);
    }

    // Create a function makeMove(player)
    function makeMove(player, number, board) {
        if (board.isOccupied(number)) {
            return false;
        }

        // Place it by calling function in the Gameboard object (changeBoard with a number between 1 and 9) which would handle everything
        board.changeBoard(number, player.side);

        if (
            board.isWonVertically(number, player.side) ||
            board.isWonHorizontally(number, player.side) ||
            board.isWonDiagonally(number, player.side)
        ) {
            alert(`${player.name.toUpperCase()} won!!`);
            resetTheGame(board);
            return false;
        } else if (board.isTie()) {
            alert(`It's a tie!`);
            resetTheGame(board);
            return false;
        }

        return true;
    }
})();
