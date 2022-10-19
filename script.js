

const NUMS = [-9,-7,-6,-6,-5,-5,-4,-4,-4,-3,-3,-3,-2,-2,-2,-2,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,1,1,1,1,1,2,2,2,2,2,2,3,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,7,7,7,8,8,9,9,10,15];
let gameBoard = [];
let highlightedRow = 0;
let highlightedColumn = 0;
let playing = 0; // 0=row, 1=column

let scoreFirst = 0;
let scoreSecond = 0;

function pieceClicked(target) {
    let targetId = parseInt(target.id.match(/piece_([0-9]+)/)[1]);
    if (targetId == undefined) {
        return;
    }
    if (playing == 0 && (targetId % 8 != highlightedRow || targetId % 8 != highlightedRow)) {
        return;
    }
    if (playing == 1 && (Math.floor(targetId / 8) != highlightedColumn)) {
        return;
    }
    if (gameBoard[targetId] == undefined) {
        return;
    }
    if (playing == 0) {
        scoreFirst += parseInt(gameBoard[targetId]);
    } else if (playing == 1) {
        scoreSecond += parseInt(gameBoard[targetId]);
    }
    gameBoard[targetId] = undefined;
    if (playing == 0) {
        highlightedColumn = Math.floor(targetId / 8);
        highlightedRow = targetId % 8;
        playing = 1;
    } else if (playing == 1) {
        highlightedColumn = Math.floor(targetId / 8);
        highlightedRow = targetId % 8;
        playing = 0;
    }
    updateGameBoard();
}

function init() {
    gameBoard = new Array(64);
    let tempNums = NUMS;
    for (let i = 0; i < 64; i++) {
        let index;
        do {
            index = Math.floor(Math.random() * 64);
        } while (tempNums[index] == undefined);
        gameBoard[i] = tempNums[index];
    }
}

function updateGameBoard() {
    for (let i = 0; i < 64; i++) {
        let value = gameBoard[i];
        if (value == undefined) {
            value = ' ';
        }
        document.getElementById('piece_' + i).value = value;
    }

    for (let i = 0; i < 64; i++) {
        if (playing == 0 && i % 8 == highlightedRow) {
            document.getElementById('piece_' + i).setAttribute('class', 'piece hightlighted_row');
        } else if (playing == 1 && Math.floor(i / 8) == highlightedColumn) {
            document.getElementById('piece_' + i).setAttribute('class', 'piece hightlighted_column');
        } else {
            document.getElementById('piece_' + i).setAttribute('class', 'piece');
        }
    }
    document.getElementById('score_first').innerText = '' + scoreFirst;
    document.getElementById('score_second').innerText = '' + scoreSecond;
}

init();
updateGameBoard();

