class Game {
    actions = Object.freeze({
        place: "place",
        select: "select",
        move: "move",
        remove: "remove",
    });
    phase = "Fase 1: Adicionando as peças no tabuleiro";
    warning = "";
    calculatedMoves = [];
    selectedLocation;
    initialPieceQty = {player1: 9, player2: 9};
    millLines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10, 11], [12, 13, 14], [15, 16, 17], [18, 19, 20], [21, 22, 23], [0, 9, 21], [3, 10, 18], [6, 11, 15], [1, 4, 7], [16, 19, 22], [8, 12, 17], [5, 13, 20], [2, 14, 23],];
    moves = [[1, 9], [0, 2, 4], [1, 14], [4, 10], [1, 3, 5, 7], [4, 13], [7, 11], [4, 6, 8], [7, 12], [0, 10, 21], [3, 9, 11, 18], [10, 6, 15], [8, 13, 17], [5, 12, 14, 20], [2, 13, 23], [11, 16], [15, 17, 19], [12, 16], [10, 19], [16, 18, 20, 22], [13, 19], [9, 22], [19, 21, 23], [14, 22],]

    handleAction(currentGameInfo, i) {
        if (currentGameInfo.activePlayer.currentMove === this.actions.place) {
            currentGameInfo = this.placePieces(currentGameInfo, i);
            return currentGameInfo;
        }
        if ((currentGameInfo.activePlayer.currentMove === this.actions.select) || (currentGameInfo.activePlayer.currentMove === this.actions.move && currentGameInfo.playerLocations[i] === currentGameInfo.label)) {
            currentGameInfo = this.selectPieces(currentGameInfo, i);
            return currentGameInfo;
        }
        if (currentGameInfo.activePlayer.currentMove === this.actions.move) {
            currentGameInfo = this.movePieces(currentGameInfo, i);
            return currentGameInfo;
        }
        if (currentGameInfo.activePlayer.currentMove === this.actions.remove) {
            currentGameInfo = this.removePieces(currentGameInfo, i);
            return currentGameInfo;
        }
    }
    checkPossibleMoves(playerInfo, piecesLocations) {
        // check if the player has a possible point to move
        const label = playerInfo.player1 ? 'B' : 'R';
        for (let i = 0; i < piecesLocations.length; i++) {

            if (this.initialPieceQty.player1 > 7 && this.initialPieceQty.player2 > 7) {
                return null;
            }
            if (piecesLocations[i] === null || piecesLocations[i] !== label) {
                continue;
            }
            const pieces = this.moves[i].map((possibleMove) => piecesLocations[possibleMove]);
            if (pieces.indexOf(null) !== -1) {
                return null;
            }
        }
        return playerInfo.player1 ? 'Player -2' : 'Player-1';
    }

    calculateWinner(playerInfo, piecesLocations) {
        const winner = this.checkPossibleMoves(playerInfo, piecesLocations);
        if (playerInfo.currentMove !== this.actions.remove && winner != null) {
            return winner
        }
        if (this.initialPieceQty.player1 > 0 && this.initialPieceQty.player2 >= 0) {
            return null;
        }
        // if the player's pieces quantity more than 2
        if (playerInfo.pieceQuantity.player1 > 2 && playerInfo.pieceQuantity.player2 > 2) {
            return null;
        }
        if (playerInfo.pieceQuantity.player1 === 2) {
            return "Player 2";
        }
        if (playerInfo.pieceQuantity.player2 === 2) {
            return "Player 1";
        }

        return null
    }

    resetBoard(playerLocations) {
        // set the color of the all empty points
        for (let i = 0; i < playerLocations.length; i++) {
            if (playerLocations[i] === null) {
                document.getElementById("point" + i).className = 'rounded-circle btn btn-light';
            }
        }
    }

    removePieces(currentGameInfo, i) {
        //"You should select one of opponent's piece to remove it"
        if (currentGameInfo.label === currentGameInfo.playerLocations[i] || currentGameInfo.playerLocations[i] === null) {
            return currentGameInfo;
        }
        //"A piece in an opponent's mill can only be removed if no other pieces are available."
        if ((currentGameInfo.playerLocations[i] === this.checkMill(currentGameInfo, i)) && (this.checkForAllMill(currentGameInfo) === false)) {
            return currentGameInfo;
        }
        currentGameInfo.playerLocations[i] = null;
        // if the player removes the piece in phase 1, set next action as place
        // if the player removes the piece in phase 2, set next action as select
        if (this.initialPieceQty.player1 !== 0 || this.initialPieceQty.player2 !== 0) {
            currentGameInfo.activePlayer.currentMove = this.actions.place;
        } else {
            currentGameInfo.activePlayer.currentMove = this.actions.select;
        }
        //after the remove action decrease the pieces quantity
        if (currentGameInfo.activePlayer.player1) {
            currentGameInfo.activePlayer.pieceQuantity.player2--;
        } else {
            currentGameInfo.activePlayer.pieceQuantity.player1--;
        }
        // the turn of the move is on the opponent player
        currentGameInfo.activePlayer.player1 = !currentGameInfo.activePlayer.player1;
        //delete "you can remove the opponent player piece" warning
        this.warning = "";
        return currentGameInfo;
    }
}

export default Game;