interface Cell {
  x: number;
  y: number;
  val: number | "bomb";
  revealed: boolean;
}

type Board = Cell[][];

export const createEmptyBoard = (size: number): Board => {
  const cells: Board = new Array(size);
  for (let x = 0; x < size; x++) {
    cells[x] = new Array(size);
    for (let y = 0; y < size; y++) {
      cells[x][y] = { x, y, revealed: false, val: 0 };
    }
  }
  return cells;
};

/*
export const forEachCell = (board: Board, fn: (cell: Cell) => void) => {};

export const getNeighbors = (board: Board, cell: Cell): Cell[] => {};

export const populateWithBombs = (board: Board, bombRatio = 0.2) => {};

export const populateWithNeighborsCount = (board: Board) => {};

export const getGameStatus = (
  board: Board
): "won" | "lost" | "inProgress" => {};
*/

export const createBoard = (size = 5, bombRatio = 0.2) => {
  const b = createEmptyBoard(size);

  return b;
};
