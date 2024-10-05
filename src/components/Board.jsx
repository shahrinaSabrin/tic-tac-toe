/* eslint-disable react/prop-types */
function Square({ value, onSquareClick }) {
    return (
        <button
            className={`bg-white border shadow-sm border-gray-400 h-12 w-12 m-1 leading-9 text-lg ${value === 'X' ? 'text-blue-500' : value === '0' ? 'text-red-500' : ''
                }`}
            onClick={onSquareClick}
        >
            {value}
        </button>
    );
}

export default function Board({ xIsNext, squares, onPlay }) {
    const winner = CalCulateWinner(squares);
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    }
    else {
        status = 'Next player: ' + (xIsNext ? 'X' : '0');
    }

    function handleClick(i) {

        if (squares[i] || winner) return;
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = 'X';
        }
        else {
            nextSquares[i] = '0';

        }
        onPlay(nextSquares);
    }
    return (
        <>
            <div className="status text-2xl font-bold">{status}</div>
            <div className="flex">
                <Square value={squares[0]} onSquareClick={() => { handleClick(0) }} />
                <Square value={squares[1]} onSquareClick={() => { handleClick(1) }} />
                <Square value={squares[2]} onSquareClick={() => { handleClick(2) }} />

            </div>
            <div className="flex">
                <Square value={squares[3]} onSquareClick={() => { handleClick(3) }} />
                <Square value={squares[4]} onSquareClick={() => { handleClick(4) }} />
                <Square value={squares[5]} onSquareClick={() => { handleClick(5) }} />
            </div>
            <div className="flex">
                <Square value={squares[6]} onSquareClick={() => { handleClick(6) }} />
                <Square value={squares[7]} onSquareClick={() => { handleClick(7) }} />
                <Square value={squares[8]} onSquareClick={() => { handleClick(8) }} />
            </div>
        </>
    );
}


function CalCulateWinner(squares) {
    if (!squares) return;
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }

    return null;
}