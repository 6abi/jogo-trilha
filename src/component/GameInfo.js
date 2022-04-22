import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";

function GameInfo(props) {
    return(
        <div className="game-statics">
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th></th>
                    <th>jogador 1-Azul</th>
                    <th>Jogador 2-Vermelho</th>
                </tr>
                </thead>
                <tbody key="table-body">
                <tr>
                    <td>Quantidade de peças no tabuleiro </td>
                    <td>{props.pieceQuantity.player1}</td>
                    <td>{props.pieceQuantity.player2}</td>
                </tr>
                <tr>
                    <td>Quantidade de peças inicialmente</td>
                    <td>{props.initialPieceQuantity.player1}</td>
                    <td>{props.initialPieceQuantity.player2}</td>
                </tr>
                </tbody>
            </Table>
        </div>
    )
}
export default GameInfo
