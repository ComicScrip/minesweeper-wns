export interface Cell {
  x: number;
  y: number;
  val: number | "bomb";
  revealed: boolean;
  backgroundColor: string;
}

export type Board = Cell[][];

export const createEmptyBoard = (size: number): Board => {
  const cells: Board = new Array(size);
  for (let x = 0; x < size; x++) {
    cells[x] = new Array(size);
    for (let y = 0; y < size; y++) {
      cells[x][y] = {
        x,
        y,
        revealed: false,
        val: 0,
        backgroundColor: "transparent",
      };
    }
  }
  return cells;
};

export const forEachCell = (board: Board, fn: (cell: Cell) => void) => {
  board.forEach((row) => {
    row.forEach((cell) => {
      fn(cell);
    });
  });
};

export const populateWithBombs = (board: Board, bombRatio = 0.2) => {
  forEachCell(board, (cell) => {
    cell.val = Math.random() < bombRatio ? "bomb" : 0;
  });
};

export const getNeighbors = (board: Board, cell: Cell): Cell[] => {
  const neighbors = [];
  if (cell.y !== 0) {
    neighbors.push(board[cell.x][cell.y - 1]);
  }
  if (cell.y !== 0 && cell.x !== board.length - 1) {
    neighbors.push(board[cell.x + 1][cell.y - 1]);
  }
  if (cell.x !== board.length - 1) {
    neighbors.push(board[cell.x + 1][cell.y]);
  }
  if (cell.x !== board.length - 1 && cell.y !== board.length - 1) {
    neighbors.push(board[cell.x + 1][cell.y + 1]);
  }
  if (cell.y !== board.length - 1) {
    neighbors.push(board[cell.x][cell.y + 1]);
  }
  if (cell.y !== board.length - 1 && cell.x !== 0) {
    neighbors.push(board[cell.x - 1][cell.y + 1]);
  }
  if (cell.x !== 0) {
    neighbors.push(board[cell.x - 1][cell.y]);
  }
  if (cell.x !== 0 && cell.y !== 0) {
    neighbors.push(board[cell.x - 1][cell.y - 1]);
  }
  return neighbors;
};

export const populateWithNeighborsCount = (board: Board) => {
  forEachCell(board, (cell) => {
    if (cell.val !== "bomb") {
      cell.val = getNeighbors(board, cell).filter(
        (cell) => cell.val === "bomb"
      ).length;
    }
  });
};

export const createBoard = (size = 5, bombRatio = 0.2) => {
  const b = createEmptyBoard(size);
  populateWithBombs(b, bombRatio);
  populateWithNeighborsCount(b);
  return b;
};

export const getGameStatus = (board: Board): "won" | "lost" | "inProgress" => {
  const allCells = board.flat();
  const notBombs = allCells.filter((cell) => cell.val !== "bomb");
  const lost = allCells.some((cell) => cell.revealed && cell.val === "bomb");
  if (lost) return "lost";
  const won = notBombs.every((cell) => cell.revealed);
  return won ? "won" : "inProgress";
};
