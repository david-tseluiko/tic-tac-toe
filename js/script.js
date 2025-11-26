function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push("");
        }
    }

    const getBoard = () => board;

    const changeBoard = (number, value) => {
        number -= 1;

        const numberRow = parseInt(number / rows);
        const numberColumn = parseInt(number % columns);

        board[numberRow][numberColumn] = value;
    };

    const checkValue = (number) => {
        number -= 1;

        const numberRow = parseInt(number / rows);
        const numberColumn = parseInt(number % columns);

        return board[numberRow][numberColumn] === "";
    };

    const checkAvailable = () => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                if (board[i][j] === "") {
                    return true;
                }
            }
        }

        return false;
    };

    return { getBoard, changeBoard, checkValue, checkAvailable };
}

function Player(typeOfPlayer, side) {
    return {
        type: typeOfPlayer.toLowerCase(),
        side: side.toLowerCase(),
    };
}

function choosePlayerSide() {
    let playerSide;
    do {
        playerSide = prompt(
            "Choose which side do you want to play, x or o?"
        ).toLowerCase();
    } while (playerSide !== "x" && playerSide !== "o");
    return playerSide;
}

function chooseComputerSide(playerSide) {
    if (playerSide === "x") return "o";
    else if (playerSide === "o") return "x";
}

function askForANumber(player) {
    const board = Gameboard();
    let pick;
    do {
        if (player.type.toLowerCase() === "user") {
            pick = +prompt("Pick a number between 1 and 9");
        } else {
            pick = Math.floor(Math.random() * 9) + 1;
        }
    } while (1 <= pick <= 9 && !board.checkValue(pick));

    board.changeBoard(pick, player.side);
    console.log(board.getBoard());
    return board.checkAvailable();
}

function playGame(user, computer) {
    let running = true;

    while (running) {
        if (user.side === "x") {
            running = askForANumber(user);
        } else {
            running = askForANumber(computer);
        }

        if (user.side === "o") {
            running = askForANumber(user);
        } else {
            running = askForANumber(computer);
        }
    }
}

(function Game() {
    const user = Player("user", choosePlayerSide());
    const computer = Player("computer", chooseComputerSide(user.side));

    const board = Gameboard();

    playGame(user, computer);
})();
