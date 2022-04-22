import React from "react";
import Piece from "./Piece";

const buttonVariants = Object.freeze({
    varNull: "light",
    varPlayer1: "primary",
    varPlayer2: "danger",
    varPossibleMoves: "warning",
});

class Board extends React.Component {

    renderPoint(i) {
        return (
            <Piece
                variant={this.getVariant(i)}
                onClick={() => this.props.onClick(i)}
                point={i}
                key = {"point" + i}
            />
        );
    }

    getVariant(i) {
        if (this.props.gameInfo[i] === null) {
            return buttonVariants.varNull;
        }
        if (this.props.gameInfo[i] === 'B') {
            return buttonVariants.varPlayer1;
        }
        if (this.props.gameInfo[i] === 'R') {
            return buttonVariants.varPlayer2;
        }
    }

    render() {
        const boardPoints = [];
        for (let i = 0; i < 24; i++) {
            boardPoints.push(this.renderPoint(i));
        }
        return (
            <div className="grid-container">
                {boardPoints}
            </div>
        )
    }
}

export default Board;