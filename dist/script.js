function Square(props) {
  return /*#__PURE__*/(
    React.createElement("button", { className: "square", onClick: props.onClick },
    props.value));


}

class Board extends React.Component {
  renderSquare(i) {
    return /*#__PURE__*/(
      React.createElement(Square, {
        value: this.props.squares[i],
        onClick: () => this.props.onClick(i) }));


  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/

      React.createElement("div", { className: "board-row" },
      this.renderSquare(0),
      this.renderSquare(1),
      this.renderSquare(2)), /*#__PURE__*/

      React.createElement("div", { className: "board-row" },
      this.renderSquare(3),
      this.renderSquare(4),
      this.renderSquare(5)), /*#__PURE__*/

      React.createElement("div", { className: "board-row" },
      this.renderSquare(6),
      this.renderSquare(7),
      this.renderSquare(8))));



  }}


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null) }],

      stepnumber: 0,
      xisNext: true };

  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepnumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares }]),

      stepnumber: history.length,
      xIsNext: !this.state.xIsNext });

  }
  jumpTo(step) {
    this.setState({
      stepnumber: step,
      xisNext: step % 2 === 0 });

  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepnumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move ?
      'Go to move  #' + move :
      'Go to game start';
      return /*#__PURE__*/(
        React.createElement("li", { key: move }, /*#__PURE__*/
        React.createElement("button", { onClick: () => this.jumpTo(move) }, desc)));


    });
    let status;
    if (winner) {
      status = 'winner: ' + winner;
    } else
    {
      status = 'next player: ' + (this.state.xisNext ? 'X' : 'O');
    }
    return /*#__PURE__*/(
      React.createElement("div", { className: "game" }, /*#__PURE__*/
      React.createElement("div", { className: "game-board" }, /*#__PURE__*/
      React.createElement(Board, {
        squares: current.squares,
        onClick: i => this.handleClick(i) })), /*#__PURE__*/


      React.createElement("div", { className: "game-info" }, /*#__PURE__*/
      React.createElement("div", null, status), /*#__PURE__*/
      React.createElement("ol", null))));



  }}


// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( /*#__PURE__*/React.createElement(Game, null));

function calculateWinner(squares) {
  const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}