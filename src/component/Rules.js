import {Accordion, Alert} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";


function Rules() {
    return (
        <div className="game-rules">
            <Alert variant="warning mb0">Regras do Jogo</Alert>
            <Accordion>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Sobre o jogo</Accordion.Header>
                    <Accordion.Body>
                        O Trilha é um jogo de estratégia para dois jogadores onde se tem um tabuleiro de 24 prontos 
                        distribuidos em uma grade.
                        Cada Player possui 9 peças. O objetivo é alinhar 3 de suas peças vertical ou horizontalmente, 
                        o que permite que mova uma peça de seu oponente. 
                        O primeiro Player a deixar o oponente com duas peças ou sem movimentos, ganha! 
                        <p></p>
                        <p>Podemos dividir em 3 fases:</p>
                        <p>Fase 1: Colocar as peças em pontos vazios</p>
                        <p>Fase 2: Mover as peças para pontos adjacentes</p>
                        <p>Fase 3: Mover as peças para qualquer ponto vazio</p>
                    </Accordion.Body> 
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Fase 1: Colocando as peças</Accordion.Header>
                    <Accordion.Body>
                    O jogo começa com um tabuleiro vazio.
                    Os jogadores se revezam colocando sua peça uma por jogada em pontos vazios.
                    Se um jogador é capaz de colocar três de suas peças em pontos contíguos em uma linha reta,
                    verticalmente ou horizontalmente, formando um moinho e pode remover uma peça do seu oponente
                    do tabuleiro e do jogo, com a ressalva de que uma peça do moinho do adversário só pode ser retirada se não houver outras peças disponíveis.
                    Depois que todas as peças foram colocadas, a fase dois começa.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header>Fase 2: Movendo as peças</Accordion.Header>
                    <Accordion.Body>
                    Esta fase se inicia quando ambos os jogadores colocarem suas nove peças em jogo. Consiste em mover suas peças 
                    ao longo de uma das linhas do tabuleiro para uma outra casa adjacente. Caso um dos jogadores tenha somente 3 
                    peças em jogo, ele pode mover livremente com suas peças, caso não esteja ocupada por uma peça do adversário.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                    <Accordion.Header>Fase 3: Livre</Accordion.Header>
                    <Accordion.Body>
                        Quando um jogador é reduzido a três peças, não há mais limitação para aquele jogador de
                        movendo para apenas pontos adjacentes:
                        A peça do jogador pode "voar" de qualquer ponto para qualquer ponto vago.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}

export default Rules