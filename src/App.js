import React from 'react';
import logo from './images/logo@4x.png';
import Header from './components/header';

function Game({start, close}) {
  const [X, O, EMPTY] = ["X", "O", null];
  const [turn, setTurn] = React.useState(X);
  const [user, setUser] = React.useState(start);
  const EMPTY_BOARD = new Array(3).fill(new Array(3).fill(EMPTY))
  const [board, setBoard] = React.useState([...EMPTY_BOARD].map(e => [...e]));
  const [terminal, setTerminal] = React.useState(null);

  function reset() {
    setBoard(new Array(3).fill(new Array(3).fill(EMPTY)))
  }

  function player(board) {
    /**
     * Returns player who has the next turn on a board.
     */
    let X_count = 0;
    let O_count = 0;
    for (let row of board) {
        X_count += row.filter(e => e === X).length;
        O_count += row.filter(e => e === O).length;
    }
    return X_count === O_count ? 'X' : 'O';
  }

  function actions(board) {
    var actions = new Set();
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j] === EMPTY) {
                actions.add([i, j]);
            }
        }
    }
    return actions;
  }

  function result(board, action) {
    /*
    Returns the board that results from making move (i, j) on the board.
    */
    let board_cp = [...board].map(e => [...e]);
    board_cp[action[0]][action[1]] = player(board_cp)
    return board_cp
  }

  function winner(board) {
    // check 3 in a row
    for (let row of board) {
        if (row.every(x => x == row[0]) && row[0] !== EMPTY) {
            return row[0];
        }
    }

    // check 3 in a column
    for (let row of board[0].map((_, colIndex) => board.map(row => row[colIndex]))) {
        if (row.every(x => x == row[0]) && row[0] !== EMPTY) {
            return row[0];
        }
    }

    // diagonals
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] !== EMPTY) {
        return board[0][0];
    }
    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] !== EMPTY) {
        return board[0][2];
    }

    return null;
  }

  function checkTerminal(board) {
    return winner(board) || board.flat().every(x => x !== EMPTY)
  }

  function utility(board) {
      return (winner(board) == X)? 1 : ((winner(board) == O)? -1 : 0)
  }

  function minimax(board) {
      let taken_action;
      let acs = Array.from(actions(board)).sort((a, b) => Math.random() > 0.5 ? 1 : -1);
      if (turn == 'X') {
          let v = Number.NEGATIVE_INFINITY;
          let scores = []
          for (let action of acs) {
              let max_v = min_value(result(board, action));
              taken_action = (max_v > v)? action : taken_action;
              v = Math.max(v, max_v);
          }
      }

      if (turn == 'O') {
          let v = Number.POSITIVE_INFINITY;
          for (let action of acs) {
              let min_v = max_value(result(board, action));
              taken_action = (min_v < v)? action : taken_action;
              v = Math.min(v, min_v);
          }
      }

      return taken_action
  }

  function max_value(board) {
      if (checkTerminal(board)) {
          return utility(board);
      }
      let v = Number.NEGATIVE_INFINITY;
      for (let action of actions(board)) {
          v = Math.max(v, min_value(result(board, action)));
      }
      return v
  }

  function min_value(board) {
      if (checkTerminal(board)) {
          return utility(board);
      }
      let v = Number.POSITIVE_INFINITY;
      for (let action of actions(board)) {
          v = Math.min(v, max_value(result(board, action)));
      }
      return v
  }

  function boardReducer(el, i, j) {
    if (el !== player(board)) return;
    if (board[i][j] !== EMPTY) return;
    let newBoard = [...board].map(e => [...e]);
    newBoard[i][j] = el;
    setBoard([...newBoard].map(e => [...e]))
  }

  function handleClick(e, i, j) {
    if (user !== turn || terminal) return;
    boardReducer(user, i, j, "handleClick");
  }

  React.useEffect(() => {
    // check for terminal
    if (checkTerminal(board)) {
      setTerminal(utility(board) === 1 ? X : (utility(board) === -1 ? O : "TIE"));
    }
    else {
      setTerminal(null);
    }

    // change turns
    setTurn(player(board));
  }, [board]);

  React.useEffect(() => {
    if (turn !== user) {
      let move = minimax(board);
      if (move) {
        setTimeout(() => {
          boardReducer(turn, move[0], move[1], "useeffect");
        }, 2000 * Math.random());
      }
    }
  }, [turn])

  return (
    <><div className={"game " + (((turn !== user) && (!terminal)) ? "game-loading" : "game-ready")}>
      <div className="hud">
      </div>
      {board.map((row, i) => <div className="row">{row.map((block, j) => <div className={"block block-"+block+" block-"+(turn !== user ? "disabled" : "enabled")} onClick={e => handleClick(e, i, j)}>{block ? block : ""}</div>)}</div>)}
    </div>
      {!terminal && <h2 align="center">{user === turn ? "Your Turn" : (turn + " is thinking...")}</h2>}
      {terminal && <h2 align="center">Game Over!</h2>}
   {terminal && (<div className="status">
      {terminal !== 'TIE' ? <span>{terminal} wins this game</span> : <span>Tie</span>}
      <div className="terminal-buttons">
        <div role="button" className="button-styled" onClick={reset}>Keep playing</div>
        <div role="button" className="button-styled" onClick={close}>Go back</div>
      </div>
    </div>)}
    </>
  )
}

function PickPlayer({setStart}) {
  return (<div className="pick-player">
      <h1 className="title">Pick a Player</h1>
      <div className="player-options">
        <div role="button" className="player-x" onClick={() => setStart('X')}>X</div>
        <div role="button" className="player-o" onClick={() => setStart('O')}>O</div>
      </div>
      <div role="button" className="player-random" onClick={() => setStart('watch')}>or CPU v. CPU</div>
  </div>);
}

function App() {
  const [start, setStart] = React.useState(null);
  function close() {
    setStart(null);
  }
  return (
    <>
      <Header reset={() => setStart(null)}/>
      <main>
        <img src={logo} width="400" style={{marginBottom: "3rem", marginTop: "3rem"}}/>
        {start ? <Game start={start} close={close} /> : <PickPlayer setStart={(e) => setTimeout(() => setStart(e), 0)} />}
      </main>
    </>

  )
}

export default App;
