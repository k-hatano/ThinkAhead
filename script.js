

const NUMS = [-9,-7,-6,-6,-5,-5,-4,-4,-4,-3,-3,-3,-2,-2,-2,-2,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,1,1,1,1,1,2,2,2,2,2,2,3,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,7,7,7,8,8,9,9,10,15];
let gameBoard = [];
let row = 0;
let column = 0;
let highlighted = 0; // 0=row, 1=column

function pieceClicked(target) {
    let targetId = parseInt(target.id.match(/piece_([0-9]+)/)[1]);
    if (targetId == undefined) {
        return;
    }
    gameBoard[targetId] = ' ';
    if (highlighted == 0) {
        column = Math.floor(targetId / 8);
        highlighted = 1;
    } else if (highlighted == 1) {
        row = targetId % 8;
        highlighted = 0;
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
        document.getElementById('piece_' + i).value = gameBoard[i];
    }

    for (let i = 0; i < 64; i++) {
        if (i % 8 == row && highlighted == 0) {
            document.getElementById('piece_' + i).setAttribute('class', 'piece hightlighted_row');
        } else if (Math.floor(i / 8) == column && highlighted == 1) {
            document.getElementById('piece_' + i).setAttribute('class', 'piece hightlighted_column');
        } else {
            document.getElementById('piece_' + i).setAttribute('class', 'piece');
        }
    }
}

init();
updateGameBoard();

