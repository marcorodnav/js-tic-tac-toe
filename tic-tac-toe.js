const humanSymbol = "X"
const computerSymbol = "O"
const originalGrid = Array.from(Array(10).keys())
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

const startGame = () => {
  grid.forEach((cell) => {
    cell.addEventListener('click', playerTurn, false)
  })
}

const resetButton = document.querySelector('#startButton');
resetButton.addEventListener('click',startGame,false)
const playerTurn = (cell) => {
  cell.target.innerText = humanSymbol
}

startGame()

