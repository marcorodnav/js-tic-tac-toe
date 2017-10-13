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

const grid = document.querySelectorAll('.cell')

const checkTie = () => {
  let cellsAvailables = originalGrid
                              .filter((element) => !isNaN(element))
                              .reduce((total, element) => total+element, 0)
  if (cellsAvailables === 0) console.info("TIE!")
}

const playerTurn = (cell) => {
  turn(cell.target.id, humanSymbol)
}
const startGame = () => {
  grid.forEach((cell) => {
    cell.innerText = ""
    originalGrid = Array.from(Array(9).keys())
    cell.addEventListener('click', playerTurn, false)
  })
}
startGame()

const resetButton = document.querySelector('#startButton')
resetButton.addEventListener('click',startGame,false)

const checkWin = (board, symbol) => {
  let cellsPlayed = board.reduce((acc, elem, index) => (elem === symbol) ? acc.concat(index) : acc, [])
  let gameWon;
  for(let [index, winComb] in winingCombinations.entries()) {
    if (winComb.every((element) => cellsPlayed.indexOf(element) > -1)) {
      gameWon = {
        index: index,
        winner: symbol
      }
      break
    }
  }
  return gameWon
}

const turn = (cellId, symbol) => {
  originalGrid[cellId] = symbol
  document.getElementById(cellId).innerText = symbol
  // let gameWon = checkWin(originalGrid, symbol)
  console.info(originalGrid)
}