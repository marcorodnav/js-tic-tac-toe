const humanSymbol = "X"
const computerSymbol = "O"
let originalGrid = Array.from(Array(9).keys())
const winingCombinations = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,4,8],
  [2,4,6],
  [0,3,6],
  [1,4,7],
  [2,5,8]
]
const playerTurn = (cell) => {
  if (typeof originalGrid[cell.target.id] == 'number') {
    turn(cell.target.id, humanSymbol)
    if (!checkTie()) {
      turn(findEmptySquare(originalGrid), computerSymbol)
    }
  }
}

const grid = document.querySelectorAll('.cell')


const checkTie = () => {
  let cellsAvailables = originalGrid
                            .filter((element) => !isNaN(element))
                            .reduce((total, element) => total+element, 0)
  if(cellsAvailables === 0) {
    showWinner("Tie...")
    return true
  }
  return false
}



const checkWin = (board, symbol) => {
  let cellsPlayed = board.reduce((acc, elem, index) => (elem === symbol) ? acc.concat(index) : acc, [])
  let gameWon = null
  for (let winComb of winingCombinations.entries()) {
    if(winComb[1].every((elem) => cellsPlayed.indexOf(elem) > -1)) {
      gameWon = {
        index: winComb[0],
        symbol: symbol
      }
      break
    }
  }
  return gameWon
}

const turn = (cellId, symbol) => {
  originalGrid[cellId] = symbol
  document.getElementById(cellId).innerText = symbol
  let gameWon = checkWin(originalGrid, symbol)
  if (gameWon) gameOver(gameWon)
}

const randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// temp control for computer
const findEmptySquare = (board) => {
  let emptySquares = board.filter((cell) => !isNaN(cell))
  let id = randomNum(0, emptySquares.length-1)
  return emptySquares[id]
}

const gameOver = (gameWon) => {
  let winingComb = winingCombinations[gameWon.index]
  winingComb.forEach((cellId) => {
    document.getElementById(cellId).classList.add('wincombo')
  })
  grid.forEach((cell) => {
    cell.removeEventListener('click', playerTurn, false)
  })
  showWinner(gameWon.symbol === 'X' ? "You win!" : "You lose")
}

const showWinner = (winner) => {
  document.getElementById('gameFinished').style.display = "block"
  document.getElementById('text').innerText = winner
}

const startGame = () => {
  document.getElementById('gameFinished').style.display = "none"
  grid.forEach((cell) => {
    cell.innerText = ""
    originalGrid = Array.from(Array(9).keys())
    cell.addEventListener('click', playerTurn, false)
    cell.classList.remove('wincombo')
  })
}
const resetButton = document.querySelector('#startButton')
resetButton.addEventListener('click',startGame,false)

startGame()