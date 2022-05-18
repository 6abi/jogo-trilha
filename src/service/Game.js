class Game {
    actions = Object.freeze({
        place: "place",
        select: "select",
        move: "move",
        remove: "remove",
    });
    phase = "Status: Adicione uma peça";
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

    setEnableDisable(currentGameInfo) {
        const isAllMill = this.checkForAllMill(currentGameInfo);
        const action = currentGameInfo.activePlayer.currentMove;
        currentGameInfo.activePlayer.player1 ? currentGameInfo.label = 'B' : currentGameInfo.label = 'Y';
        for (let i = 0; i < currentGameInfo.playerLocations.length; i++) {
            const element = document.getElementById("point" + i);
            const point = currentGameInfo.playerLocations[i];
            //if there is a winner disable all pieces or points
            if (this.calculateWinner(currentGameInfo.activePlayer, currentGameInfo.playerLocations) != null) {
                element.setAttribute("disabled", "disabled");
                continue;
            }
            // if action is place and there is a piece, disable the piece
            if (action === this.actions.place && point !== null) {
                element.setAttribute("disabled", "disabled");
                continue;
            }
            // if action is select and piece own to player, disable the piece or point
            if (action === this.actions.select && point !== currentGameInfo.label) {
                element.setAttribute("disabled", "true");
                continue;
            }
            //if action is move and piece own to opponent player or point is not allowed to move, disable the piece or point
            if (action === this.actions.move && ((point != null && point !== currentGameInfo.label) || (point == null && (this.calculatedMoves.indexOf(i) === -1)))) {
                element.setAttribute("disabled", "true");
                continue;
            }
            //if action is remove and piece own to player or opponent mill and all opponent pieces are not mill, the piece or point
            if (action === this.actions.remove && ((point === currentGameInfo.label || point === null) || (point != null && !isAllMill && point === this.checkMill(currentGameInfo, i)))) {
                element.setAttribute("disabled", "true");
                continue;
            }
            element.removeAttribute("disabled");
        }
    }

    placePieces(currentGameInfo, i) {
        //"Selected point is not null
        if (!(currentGameInfo.playerLocations[i] == null)) {
            return currentGameInfo;
        }
        currentGameInfo.playerLocations[i] = currentGameInfo.label;
        // increase the piece quantity on the board and decrease the initial piece quantity
        if (currentGameInfo.activePlayer.player1) {
            currentGameInfo.activePlayer.pieceQuantity.player1++;
            this.initialPieceQty.player1--;
        } else {
            currentGameInfo.activePlayer.pieceQuantity.player2++;
            this.initialPieceQty.player2--;
        }
        // if it is a mill change the current action to remove
        if (this.checkMill(currentGameInfo, i) !== null) {
            //"it is mill, you can remove one of opponent's piece"
            this.warning = " - Remova uma peça do oponente!";
            currentGameInfo.activePlayer.currentMove = this.actions.remove;
            return currentGameInfo;
        }

        // the turn of the move is on the opponent player
        currentGameInfo.activePlayer.player1 = !currentGameInfo.activePlayer.player1;
        //if all pieces are placed than change current action to select
        if (this.initialPieceQty.player1 === 0 && this.initialPieceQty.player2 === 0) {
            currentGameInfo.activePlayer.currentMove = this.actions.select
            this.phase = "Status: Mova as peças";
        }
        return currentGameInfo;
    }

    selectPieces(currentGameInfo, i) {
        //"it is opponent's piece!"
        if (!(currentGameInfo.playerLocations[i] === currentGameInfo.label)) {
            return currentGameInfo;
        }
        let piecePossibleMoves = this.moves[i];
        // if there is three pieces left, pieces can move to all empty points
        if ((currentGameInfo.activePlayer.player1 && currentGameInfo.activePlayer.pieceQuantity.player1 < 4) || (!currentGameInfo.activePlayer.player1 && currentGameInfo.activePlayer.pieceQuantity.player2 < 4)) {
            this.phase = "Status: Movimento Livre"
            piecePossibleMoves = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
        }
        this.resetBoard(currentGameInfo.playerLocations);
        this.calculatedMoves = [];
        // place of the selected piece it is used when the action is move
        this.selectedLocation = i;
        for (let m = 0; m < piecePossibleMoves.length; m++) {
            // change color to yellow of the possible moves points
            if (currentGameInfo.playerLocations[piecePossibleMoves[m]] === null) {
                document.getElementById("point" + piecePossibleMoves[m]).className = 'rounded-circle btn btn-warning';
                this.calculatedMoves.push(piecePossibleMoves[m]);
            }
        }
        currentGameInfo.activePlayer.currentMove = this.actions.move;
        return currentGameInfo;
    }

    movePieces(currentGameInfo, i) {
        //"The selected point is not allowed, you can only move to the yellow points"
        if (currentGameInfo.playerLocations[i] === null) {
            if (this.calculatedMoves.indexOf(i) === -1) {
                return currentGameInfo;
            }
            // after piece moved to new a point, empty the old point
            currentGameInfo.playerLocations[this.selectedLocation] = null;
            //move the piece to new point
            currentGameInfo.playerLocations[i] = currentGameInfo.label
            this.resetBoard(currentGameInfo.playerLocations);
            if (this.checkMill(currentGameInfo, i) === null) {
                currentGameInfo.activePlayer.currentMove = this.actions.select;
                //the turn of the move is on the opponent player
                currentGameInfo.activePlayer.player1 = !currentGameInfo.activePlayer.player1;
            } else {
                //it is mill, you can remove one of opponent's piece
                this.warning = " - Remova uma peça do oponente!";
                currentGameInfo.activePlayer.currentMove = this.actions.remove;
            }
        }
        return currentGameInfo;
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

    checkMill(currentGameInfo, point) {
        let millPlayer = null;
        for (let i = 0; i < this.millLines.length; i++) {
            const [a, b, c] = this.millLines[i];
            if (!(a === point || b === point || c === point)) {
                continue;
            }
            if (currentGameInfo.playerLocations[a] && currentGameInfo.playerLocations[a] === currentGameInfo.playerLocations[b] && currentGameInfo.playerLocations[a] === currentGameInfo.playerLocations[c]) {
                millPlayer = currentGameInfo.playerLocations[a];
            }
        }
        return millPlayer;
    }

    checkForAllMill(currentGameInfo) {
        // if all pieces of the player are mill than return true
        const playerLabel = currentGameInfo.activePlayer.player1 ? 'Y' : 'B';
        for (let i = 0; i < currentGameInfo.playerLocations.length; i++) {
            if (currentGameInfo.playerLocations[i] === playerLabel && this.checkMill(currentGameInfo, i) === null) {
                return false;
            }
        }
        return true;
    }

    checkPossibleMoves(playerInfo, piecesLocations) {
        // check if the player has a possible point to move
        const label = playerInfo.player1 ? 'B' : 'Y';
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
        return playerInfo.player1 ? ' Player Azul' : ' Player Amarelo';
    }

    calculateWinner(playerInfo, piecesLocations) {
        // if it is phase1
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
            return " Player Amarelo";
        }
        if (playerInfo.pieceQuantity.player2 === 2) {
            return " Player Azul";
        }
        // if player's piece can not move to any point, opponent player wins

        return null
    }
}

export default Game;