import { useState } from 'react';
import Board from './components/Board';
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXIsNext] = useState(true);
  const currentSquares = history[history.length - 1];
  const [currentStep, setCurrentStep] = useState(0);
  function handlePlay(nextSquares) {
    setXIsNext(!xIsNext);
    const nextHistory = [...history.slice(0, currentStep + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentStep(nextHistory.length - 1);
  }

  const jumpTo = (step) => {
    setCurrentStep(step);
    setXIsNext((step % 2) === 0);
  }
  const moves = history.map((squares, index) => {
    let description;
    if (index > 0) {
      description = 'Go to move #' + index
    }
    else {
      description = 'Start Game'
    }
    return (
      <li key={index}
        className="bg-gray-300 text-orange-700 mb-1 px-2 py-1 rounded-md">
        <button onClick={() => jumpTo(index)}>{description}</button>
      </li>
    )
  })

  return (
    <>
      <h1 className="text-3xl font-bold text-orange-700 text-center">Tic Tac Toe</h1>
      {/* <div className="flex justify-center gap-8 m-4 p-6rounded-md"><div> */}
      <div className="flex flex-col sm:flex-row gap-10 justify-center border border-gray-200 bg-gray-600 text-white shadow-sm p-6 rounded-md mx-auto max-w-xl mt-4">
        <div className="mx-auto max-w-xl">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
          />

        </div>


        <div className="mx-auto max-w-xl">
          <ol>{moves}</ol>
        </div>
      </div >
    </>

  );
}