// Goal: Make Tic Tac Toe game playable in browser
// Create a function Gameboard
function Gameboard() {
    // create rows and columns constants for creating the gameboard list
    const rows = 3;
    const cols = 3;

    const elements = Array.from(document.querySelectorAll(".list__item"));
    let board = [];
    // Store the gameboard in 3d array using the for loop (in order to make the checking for win a bit easier)
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < cols; j++) {
            board[i].push(elements[translateToArrayStyle(i, j)]);
        }
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
        // Call function translateToBoardStyle and store in the in variables rows and cols
        let [numberRow, numberColumn] = translateToBoardStyle(number);

        // Loop through left and right diagonals
        // Create leftDiagonal object that would store the column (start from 0 and each for loop += 4) and isWinning = true (false if at least one of the values is not playerSide)
        const leftDiagonal = {
            column: 0,
            isWinning: true,
        };

        // Create rightDiagonal object that would store the column (start from 8 and each for loop -= 4) and isWinning = true (false if at least one of the values is not playerSide)
        const rightDiagonal = {
            column: 0,
            isWinning: true,
        };

        // Create a for loop
        // Loop (i) through each global row
        for (let i = 0; i < rows; i++) {
            try {
                if (board[i][leftDiagonal.column].textContent !== playerSide) {
                    leftDiagonal.isWinning = false;
                }
            } catch (TypeError) {
                leftDiagonal.isWinning = false;
            }

            try {
                if (board[i][rightDiagonal.column].textContent !== playerSide) {
                    rightDiagonal.isWinning = false;
                }
            } catch (TypeError) {
                rightDiagonal.isWinning = false;
            }

            leftDiagonal.column += 4;
            rightDiagonal.column -= 4;
        }

        return rightDiagonal.isWinning || leftDiagonal.isWinning;
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

    // Ask player1 which side they want to play: X or O
    let firstPlayerSide;

    do {
        firstPlayerSide = prompt(
            "First player, do you want to play X or O?"
        ).toLowerCase();
    } while (firstPlayerSide !== "x" && firstPlayerSide !== "o");

    let priorityPlayer;
    let secondaryPlayer;

    // If player1 chooses X: store them as priorityPlayer objects. Player2 as the secondaryPlayer objects.
    if (firstPlayerSide === "x") {
        priorityPlayer = Player("First Player", "x");
        secondaryPlayer = Player("Second Player", "o");
    } else {
        // If player1 chooses O: store them as secondaryPlayer objects. Player2 as the priorityPlayer objects.
        priorityPlayer = Player("Second Player", "x");
        secondaryPlayer = Player("First Player", "o");
    }

    // start a loop that would be working until someone wins or the game ended because no more space left in gameboard list (while true)
    while (true) {
        if (
            !makeMove(priorityPlayer, board) ||
            !makeMove(secondaryPlayer, board)
        ) {
            break;
        }
    }

    // Create a function makeMove(player)
    function makeMove(player, board) {
        // ask player.name where they want to place the player.side:
        let playerNumber = +prompt(
            `${player.name.toUpperCase()} where do you want to place your ${player.side.toUpperCase()}?`
        );

        // If they give number that is other than between 1 or 9 included ask them again
        // If they want to place their side which is occupied already, ask them again
        const boundaries = [1, 9];

        while (
            playerNumber < boundaries[0] ||
            playerNumber > boundaries[1] ||
            board.isOccupied(playerNumber) ||
            isNaN(playerNumber)
        ) {
            if (
                playerNumber < boundaries[0] ||
                playerNumber > boundaries[1] ||
                isNaN(playerNumber)
            ) {
                playerNumber = +prompt(
                    `${player.name.toUpperCase()} please enter the number between ${
                        boundaries[0]
                    } and ${boundaries[1]}`
                );
            } else {
                playerNumber = +prompt(
                    `${player.name.toUpperCase()}, ${playerNumber} is already OCCUPIED, try a different number`
                );
            }
        }

        // Place it by calling function in the Gameboard object (changeBoard with a number between 1 and 9) which would handle everything
        board.changeBoard(playerNumber, player.side);

        // All of the indented check in one if statement
        // Check if won vertically by calling function isWonVertically from Gameboard object pass (number and playerSide)
        // Check if won horizontally by calling function isWonHorizontally from Gameboard object pass (number and playerSide)
        // Check if won diagonally by calling function isWonDiagonally from Gameboard object pass (number and playerSide)
        if (
            board.isWonVertically(playerNumber, player.side) ||
            board.isWonHorizontally(playerNumber, player.side) ||
            board.isWonDiagonally(playerNumber, player.side)
        ) {
            alert(`${player.name.toUpperCase()} won!!`);
            return false;
        }

        // Check if there is still space in the list by calling function isTie in the Gameboard object
        if (board.isTie()) {
            alert("This is a draw");
            return false;
        }

        return true;
    }
})();
