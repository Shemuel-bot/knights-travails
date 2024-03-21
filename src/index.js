/* eslint-disable max-classes-per-file */

function possibleMoves(position) {
  const moves = [];

  moves.push([position[0] + 2, position[1] + 1]);
  moves.push([position[0] + 2, position[1] - 1]);
  moves.push([position[0] - 2, position[1] - 1]);
  moves.push([position[0] - 2, position[1] + 1]);
  moves.push([position[0] - 1, position[1] + 2]);
  moves.push([position[0] + 1, position[1] + 2]);
  moves.push([position[0] + 1, position[1] - 2]);
  moves.push([position[0] - 1, position[1] - 2]);

  return moves.filter((x) => x[0] >= 0 && x[0] <= 7 && x[1] >= 0 && x[1] <= 7);
}

function positions(starting, ending, length, deep = 0) {
  if (starting[0] === ending[0] && starting[1] === ending[1]) {
    return [`[${starting}], `];
  }
  if (length === deep) return [];

  const moves = possibleMoves(starting);
  let array = `[${starting}], `;

  for (let i = 0; i < moves.length; i += 1) {
    if (array === `[${starting}], `)
      array += positions(moves[i], ending, length, deep + 1);
  }
  if (array === `[${starting}], `) return [];
  return array;
}
function knightMoves(starting, ending) {
  const board = {};
  board[JSON.stringify(starting)] = 0;
  const q = [starting];
  while (!(q[0][0] === ending[0] && q[0][1] === ending[1])) {
    const loc = q.shift();
    const moves = possibleMoves(loc);
    moves.forEach((x) => {
      q.push(x);
      board[JSON.stringify(x)] = board[JSON.stringify(loc)] + 1;
    });
  }
  console.log(positions(starting, ending, board[JSON.stringify(ending)]));
  return board[JSON.stringify(ending)];
}
