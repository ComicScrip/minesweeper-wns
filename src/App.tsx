import { useState } from "react";
import "./App.css";
import { Board, Cell, createBoard, forEachCell, getGameStatus } from "./Board";
import produce from "immer";

const BOARD_SIZE = 5;

function App() {
  const [board, setBoard] = useState(createBoard(BOARD_SIZE));
  const [boardIsRevealed, setBoardIsRevealed] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const reload = () => {
    setBoard(createBoard(BOARD_SIZE));
    setIsFinished(false);
  };

  const handleCellClick = (
    cell: Cell,
    board: Board,
    setBoard: any,
    setIsFinished: any
  ) => {
    const newBoard = produce(board, (draft: any) => {
      if (cell.val === "bomb") {
        draft[cell.x][cell.y].backgroundColor = "red";
        forEachCell(draft, (cell) => {
          cell.revealed = true;
        });
      } else {
        draft[cell.x][cell.y].backgroundColor = "green";
      }
      draft[cell.x][cell.y].revealed = true;
    });

    setBoard(newBoard);

    const status = getGameStatus(newBoard);
    if (status === "lost") {
      setIsFinished(true);

      setTimeout(() => alert("YOU LOOSE :("), 200);
    } else if (status === "won") {
      setTimeout(() => alert("CONGRATS :D"), 200);
      setIsFinished(true);
    }
  };

  console.log(board);

  return (
    <div className="App">
      <div>
        <button
          disabled={isFinished}
          onClick={() => setBoardIsRevealed(!boardIsRevealed)}
        >
          {boardIsRevealed ? "Stop cheating" : "Cheat"}
        </button>
        <button
          style={{ backgroundColor: isFinished ? "orange" : "" }}
          onClick={reload}
        >
          Reload
        </button>
        <table style={{ opacity: isFinished ? 0.7 : 1 }}>
          <tbody>
            {board.map((row, rowIndex) => {
              return (
                <tr key={rowIndex}>
                  {row.map((cell) => (
                    <td
                      style={{
                        backgroundColor: cell.backgroundColor,
                      }}
                      key={cell.y}
                      onClick={() =>
                        handleCellClick(cell, board, setBoard, setIsFinished)
                      }
                    >
                      {(cell.revealed || boardIsRevealed) &&
                        (cell.val === "bomb" ? "💣" : cell.val)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
