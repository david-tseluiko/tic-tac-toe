// Goal: Make Tic Tac Toe game playable in browser
// Create a function Gameboard
    // create rows and columns constants for creating the gameboard list
    // Store the gameboard in 3d array using the for loop (in order to make the checking for win a bit easier)

    // Create a function translateToBoardStyle that would translate a number between 1, 9 to 3d ():
        // number--;
        // Translate the number into the row and column
        // Return values as an array

    // Create function changeBoard which would receive a number between 1, 9 and a player side
        // Call function translateToBoardStyle and store in the in variables rows and cols
        // Place the player side into the gameboard object using rows and cols variables

    // isWonVertically which would take number and playerSide
        // Call function translateToBoardStyle and store in the in variables rows and cols
        // Create a for loop
            // Loop through each global row
                // Check if each board[globalRow][localCols] equal to playerSide
                    // If so return true
                // Else
                    // Return false
    
    // isWonHorizontally which would take number and playerSide
    // Call function translateToBoardStyle and store in the in variables rows and cols
    // Create a for loop
        // Loop through each global column
            // Check if each board[localRow][globalColumn] equal to playerSide
                // If so return true
            // Else
                // Return false

    // isWonDiagonally which would take number (1, 9) and playerSide
    // if number == 2, 4, 6, 8
        // Return false
    // Call function translateToBoardStyle and store in the in variables rows and cols

    // Loop through left diagonal
        // Create leftDiagonal object that would store the column (start from 0 and each for loop += 4) and isWinning = true (false if at least one of the values is not playerSide)

        // Create rightDiagonal object that would store the column (start from 0 and each for loop += 4) and isWinning = true (false if at least one of the values is not playerSide)

        // Create a for loop
            // Loop (i) through each global row
                // if board[i][leftDiagonal.column] !== playerSide
                    // leftDiagonal.isWinning = false

                // if board[i][rightDiagonal.column] !== playerSide
                    // rightDiagonal.isWinning = false

        // return rightDiagonal.isWinning || leftDiagonal.isWinning;

    // Create function isTie with no parameters
        // Check each gameboard value and if you find empty value
            // return false
        // Else
            // return true

// Player function which would assemble players for the Game IIFE {type, side}

// Create a Game IIFE where all of the game stuff would be executed (need IIFE because otherwise someone can access the variables from the console)
    // Ask player1 which side they want to play: X or O
        // If player1 chooses X: store them as priorityPlayer objects. Player2 as the secondaryPlayer objects.
        // If player1 chooses O: store them as secondaryPlayer objects. Player2 as the priorityPlayer objects.
    
    // running variable (for the while loop)

    // start a loop that would be working until someone wins or the game ended because no more space left in gameboard list (while running)
        // running = makeMove(priorityPlayer)
        // running = makeMove(secondaryPlayer)


    // Create a function makeMove(player)
    // ask player.type where they want to place the player.side:
            // If they give number that is other than between 1 or 9 included ask them again
            // If they want to place their side which is occupied already, ask them again
                // Place it by calling function in the Gameboard object (changeBoard with a number between 1 and 9) which would handle everything
                // All of the indented check in one if statement
                    // Check if won vertically by calling function isWonVertically from Gameboard object pass (number and playerSide)
                    // Check if won horizontally by calling function isWonHorizontally from Gameboard object pass (number and playerSide)
                    // Check if won diagonally by calling function isWonDiagonally from Gameboard object pass (number and playerSide)
                        // PriorityPlayer won (console log)
                        // return false;
                    
                // Check if there is still space in the list by calling function isTie in the Gameboard object
                    // Draw (console log)
                    // return false;

                // return true;
            


