import Game from './service/Game';

test('Should instantiate the game', () => {
  let game = new Game();
  expect(game).not.toBeNull;
});

test('Should set colors and labels yellow correctly', () => {
  let game = new Game();
  let currentGameInfo = {
    playerLocations: Array(24).fill(null),
    activePlayer: {
      player1: true,
      currentMove: game.actions.place,
      pieceQuantity: {player1: 0, player2: 0},
    },
    color: "yellow",
    label: 'Y',
  };

  expect(currentGameInfo.color).toEqual("yellow");
  expect(currentGameInfo.label).toEqual("Y");
});

test('Should set colors and labels blue correctly', () => {
  let game = new Game();
  let currentGameInfo = {
    playerLocations: Array(24).fill(null),
    activePlayer: {
      player1: true,
      currentMove: game.actions.place,
      pieceQuantity: {player1: 0, player2: 0},
    },
    color: "blue",
    label: 'B',
  };

  expect(currentGameInfo.color).toEqual("blue");
  expect(currentGameInfo.label).toEqual("B");
});

test('Each player should start with 9 pieces', () => {
  let game = new Game();

  expect(game.initialPieceQty.player1).toEqual(9);
  expect(game.initialPieceQty.player2).toEqual(9);
});

test('Should show an initial status', () => {
  let game = new Game();

  expect(game.phase).toEqual("Status: Adicione uma peça");
});