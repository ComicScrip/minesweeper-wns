interface Cell {
  x: number;
  y: number;
  val: number | "bomb";
  revealed: boolean;
}

type Board = Cell[][];

export const createEmptyBoard = (size: number): Board => {};

export const forEachCell = (board: Board, fn: (cell: Cell) => void) => {};

export const getNeighbors = (board: Board, cell: Cell): Cell[] => {};

export const populateWithBombs = (board: Board, bombRatio = 0.2) => {};

export const populateWithNeighborsCount = (board: Board) => {};

export const getGameStatus = (
  board: Board
): "won" | "lost" | "inProgress" => {};

export const createBoard = (size, bombRatio) => {};
