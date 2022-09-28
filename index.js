const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const playerX = 'cross'
const playerO = 'circle'
const winCondition = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
]

let player1 = 0
let  player2 = 0

const board = $('.board')
const cells = $$('.cell')
const showResult = $('.show-result')
const restartButton = $('.restart')
const showStatus =  $('.show')
const showScorePlayer1 = $('#player1')
const showScorePlayer2 = $('#player2')
let isPlayer_O_turn = false

startGame()
displayPlayerTurn()
restartButton.addEventListener('click', startGame)

function displayPlayerTurn() {
    showStatus.innerText = `It's player ${isPlayer_O_turn? 'O' : 'X'} turn!`
}

function startGame() {
    isPlayer_O_turn = false
    displayPlayerTurn()

    cells.forEach(cell => {
        cell.classList.remove(playerO)
        cell.classList.remove(playerX)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    })   
}

function handleClick(e) {
    let cell = e.target
    let currentPlayer = isPlayer_O_turn? playerO : playerX
    placeMark(cell, currentPlayer)
    if(checkWin(currentPlayer)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurn()
        displayPlayerTurn()
    }
}

function placeMark(cell, currentPlayer) {
    cell.classList.add(currentPlayer)
}

function swapTurn() {
    isPlayer_O_turn = !isPlayer_O_turn
}

function checkWin(currentPlayer) {
    return winCondition.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentPlayer)
        })
    })
}

function endGame(draw) {
    if(draw) {
        showStatus.innerText = "It's a draw!"
    } else {
        showStatus.innerText = `Player ${isPlayer_O_turn? 'O' : 'X'} wins!`
        isPlayer_O_turn? player2++ : player1++
        showScorePlayer1.innerText = 'Player 1: ' + player1
        showScorePlayer2.innerText = 'Player 2: ' + player2
    }
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(playerX) || cell.classList.contains(playerO)
    })
}
