// User field

let items = [
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

let selectedSize = 'default';
let selectedCount = 0;
let count = 0;
let userShipPosition = [];

function createfieldUser() {
    for (let i = 0; i < items.length; i++) {
        for (let j = 0; j < items.length; j++) {
            createElementUser(i, j);
        };
    }
}

function createElementUser(i, j) {
    let containerUserShips = document.querySelector('#containerUserShips');
    let div = document.createElement('div');
    div.position = {
        x: j,
        y: i,
    }
    div.style.cssText = `border: 1px solid #5a5a66; position: absolute; left: ${j * 50}px; top: ${i * 50}px; width: 50px; height: 50px; background-color: #8d99ae;`;

    div.setAttribute('id', `idUser${i}-${j}`)
    div.onclick = function(e) {
        createShip(e);
    };

    containerUserShips.appendChild(div);
}

let placedShips = {
    "single-ship" : false,
    "double-ship": false,
    "three-ship": false,
    "four-ship": false
}

function chooseValue() {
    let selectList = document.querySelector('#select_list');
    let value = selectList.options[selectList.selectedIndex].value;

    if (placedShips[value]) {
        alert('You have already placed ships of this size.');
        return;
    }

    switch (value) {
        case "single-ship":
            selectedSize = 1;
            selectedCount = 4;
            break;
        case "double-ship":
            selectedSize = 2;
            selectedCount = 3;
            break;
        case "three-ship":
            selectedSize = 3;
            selectedCount = 2;
            break;
        case "four-ship":
            selectedSize = 4;
            selectedCount = 1;
            break;
    }
    count = 0;
}

function createShip(e) {
    let x = e.target.position.x;
    let y = e.target.position.y;

    if (selectedSize === 'default') {
        alert("Please choose ship size.");
        return;
    }

    if (count >= selectedCount) {
        alert("Maximum number of ships reached.");
        return;
    }

    if (!isFreeForShip(selectedSize, y, x)) {
        alert("Cannot add ship here");
        return;
    }
    let userShip = {
        parts: [],
        status: 'alive'
    }

    for (let i = 0; i < selectedSize; i++) {
        if (x + i < 10) {
            items[y][x + i] = 1;
            userShip.parts.push({x: x, y: y});

        } else {
            console.log("Cannot add ship here");
            return;
        }
    }
    userShipPosition.push(userShip);
    console.log('userShipPosition - ', userShipPosition);
    count++;

    if (count >= selectedCount) {
        placedShips[getShipSizeName(selectedSize)] = true;
    }
    refresh();
}

function getShipSizeName(size) {
    switch (size) {
        case 1:
            return "single-ship";
        case 2:
            return "double-ship";
        case 3:
            return "three-ship";
        case 4:
            return "four-ship";
        default:
            return "";
    }
}

function refresh() {
    for (let y = 0; y < items.length; y++) {
        for (let x = 0; x < items.length; x++) {
            const cell = items[y][x];
            let div = document.getElementById(`idUser${y}-${x}`);
            if (cell == 1)
                div.style.backgroundColor = "#edf2f4";
        }
    }
}

function isFreeForShip(size, y, x) {
    for (let i = 0; i < size; i++) {
        if (!isFreeCell(y, x + i)) {
            return false;
        }
    }
    return true;
}

function isFreeCell(y, x) {
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const ny = y + i;
            const nx = x + j;

            if (ny >= 0 && ny < items.length && nx >= 0 && nx < items.length) {
                if (items[ny][nx] !== 0) {
                    return false;
                }
            }
        }
    }
    return true;
}

function start() {
    createfieldUser();
}
start();