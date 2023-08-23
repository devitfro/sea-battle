// Computer field

let itemsComp = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
]
let shipPosition = [];

function createfieldComp() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            createElementComp(i, j);
        };
    }
}

function createElementComp(i, j) {
    let containerCompShips = document.querySelector('#containerComputerShips');
    let div = document.createElement('div');
    div.position = {
        x: j,
        y: i,
    }
    div.style.cssText = `border: 1px solid #5a5a66; position: absolute; left: ${j * 50}px; top: ${i * 50}px; width: 50px; height: 50px; background-color: #a3b18a;`;

    div.setAttribute('id', `idComp${i}-${j}`);
    div.addEventListener('click', hitShip, {once: true});

    containerCompShips.appendChild(div);
}

function hitShip() {
    let elem = itemsComp[this.position.y][this.position.x];
    let div = document.getElementById(`idComp${this.position.y}-${this.position.x}`);
    if (elem !== 1) {
        itemsComp[this.position.y][this.position.x] = 3;
        div.style.backgroundColor = "#E8E8E8";

    }
    if (elem === 1) {
        itemsComp[this.position.y][this.position.x] = 2;
        div.style.background = "url(img/Vector.png) no-repeat center";
        div.style.backgroundColor = "orange";
        div.style.border = "1px solid black";

    }
    refreshShipStatus();
    checkShipStatus();


    let count = 0;
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let elem = itemsComp[i][j];
            if (elem == 1) {
                count++;
            }
        }
    }

    if (count == 0) {
        setTimeout("alert('win')", 150);
    }
    console.log(count);
}

function randomPlaceShip(sizeShip) {
    let randomX;
    let randomY;
    do {
        randomX = Math.floor(Math.random() * 10);
        randomY = Math.floor(Math.random() * 10);
        // console.log(randomY, randomX);
    }
    while (!isFreeForShipComp(sizeShip, randomY, randomX));

    createShipComp(sizeShip, randomY, randomX);
}

function createShipComp(size, y, x) {
    let ship = {
        parts: [],
        status: 'alive'
    }
    for (let i = 0; i < size; i++) {
        itemsComp[y][x + i] = 1;
        ship.parts.push({y: y, x: x + i});
    }
    shipPosition.push(ship);
}
console.log('shipPosition - ', shipPosition);


function dedlockComp(size) {
    for (let i = 0; i < itemsComp.length; i++) {
        for (let j = 0; j < itemsComp.length; j++) {
            if (isFreeForShipComp(size, i, j)) {
                return false;
            }
        }
    }
    return true;
}

function resetComp() {
    itemsComp = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    ]
}

function isOutOfFieldComp(randomY, randomX) {
    let result = randomX < 0 || randomX > itemsComp.length - 1 ||
        randomY < 0 || randomY > itemsComp.length - 1;
    return result;
}

function isFreeCellComp(y, x) {
    if (isOutOfFieldComp(y, x))
        return false;

    let centrPoint = itemsComp[y][x];
    if (centrPoint != 0) {
        return false;
    }

    let top = 0;
    if (!isOutOfFieldComp(y - 1, x)) {
        top = itemsComp[y - 1][x];
    }

    let topRight = 0;
    if (!isOutOfFieldComp(y - 1, x + 1)) {
        topRight = itemsComp[y - 1][x + 1];
    }

    let right = 0;
    if (!isOutOfFieldComp(y, x + 1)) {
        right = itemsComp[y][x + 1];
    }

    let bottomRight = 0;
    if (!isOutOfFieldComp(y + 1, x + 1)) {
        bottomRight = itemsComp[y + 1][x + 1];
    }

    let bottom = 0;
    if (!isOutOfFieldComp(y + 1, x)) {
        bottom = itemsComp[y + 1][x];
    }

    let bottomLeft = 0;
    if (!isOutOfFieldComp(y + 1, x - 1)) {
        bottomLeft = itemsComp[y + 1][x - 1];
    }

    let left = 0;
    if (!isOutOfFieldComp(y, x - 1)) {
        left = itemsComp[y][x - 1];
    }

    let topLeft = 0;
    if (!isOutOfFieldComp(y - 1, x - 1)) {
        topLeft = itemsComp[y - 1][x - 1];
    }

    return top == 0
        && topRight == 0
        && right == 0
        && bottomRight == 0
        && bottom == 0
        && bottomLeft == 0
        && left == 0
        && topLeft == 0;
}

function isFreeForShipComp(size, y, x) {
    for (let i = 0; i < size; i++) {
        if (!isFreeCellComp(y, x + i)) {
            return false;
        }
    }
    return true;
}

function placeShipsComp() {
    const ships = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4];

    for (let i = 0; i < ships.length; i++) {
        let size = ships[i];
        if (dedlockComp(size)) {
            resetComp();
            placeShipsComp();
            return;
        }
        randomPlaceShip(size);
    }
}

function play() {
    const btnPlay = document.querySelector('#btnPlay');
    btnPlay.style.cssText = "display: none";
    createfieldComp();
    placeShipsComp();
    randomValueForComputerHit();

    console.log(itemsComp);
}

function refreshShipStatus() {
    shipPosition.forEach(ship => {
        if (ship.status === 'dead') {
            return;
        }
        let count = 0;
        for (let part of ship.parts) {
            if (itemsComp[part.y][part.x] === 2) {
                count++;
            }
        }
        if (count === ship.parts.length) {
            ship.status = 'dead';
            console.log('ship is dead, size - ', ship.parts.length);
        } else {
            console.log(`ship is damaged ${count} of size ${ship.parts.length}`);
        }
    })
}

function checkShipStatus() {
    shipPosition.forEach(ship => {
        if (ship.status === 'dead') {
            ship.parts.forEach(part => {
                let x = part.x;
                let y = part.y;
                changePosition(y, x);
            })
        }
    })
}

function changePosition(y, x) {
    markCell(y - 1, x);
    markCell(y - 1, x + 1);
    markCell(y, x + 1);
    markCell(y + 1, x + 1);
    markCell(y + 1, x);
    markCell(y + 1, x - 1);
    markCell(y, x - 1);
    markCell(y - 1, x - 1);
}

function markCell(y, x) {
    if (y >= 0 && y < itemsComp.length && x >= 0 && x < itemsComp.length) {
        let div = document.getElementById(`idComp${y}-${x}`);
        div.style.backgroundColor = "orange";
    }
}

function randomValueForComputerHit() {
    let randomX;
    let randomY;

    randomX = Math.floor(Math.random() * 10);
    randomY = Math.floor(Math.random() * 10);
    console.log(randomY, randomX);
  
}