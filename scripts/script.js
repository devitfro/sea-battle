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

let singleDeckShip = {
    sizeShip: 1,
    count: 4
}
let doubleDeckShip = {
    sizeShip: 2,
    count: 3
}
let threeDeckShip = {
    sizeShip: 3,
    count: 2
}
let fourDeckShip = {
    sizeShip: 4,
    count: 1
}

let section = document.querySelector('#wrapper');
section.className = "wrapper";

for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        createElement(i, j);
    };
}

function createElement(i, j) {
    let div = document.createElement('div');
    div.position = {
            x: j,
            y: i,
        }
    div.style.cssText = `border: 1px solid #5a5a66; position: absolute; left: ${j * 50}px; top: ${i * 50}px; width: 50px; height: 50px; background-color: #D3EBF1;`;

    div.setAttribute('id', `id${i}-${j}`)
    div.onclick = createShip;
    
    section.appendChild(div);
}

let result = 'default';

function chooseValue() {
    let selectList = document.querySelector('#select_list');
    let value = selectList.options[selectList.selectedIndex].value;
    switch (value) {
        case "single ship":
            result = 1;
            break;
        case "double-ship":
            result = 2;
            break;
        case "three-ship":
            result = 3;
            break;
        case "four-ship":
            result = 4;
            break;
    }
}

function createShip(e) {
    console.log(e.target.position);
    console.log("Add ship");
    for (let i = 0; i < result; i++) {
        let x = e.target.position.x;
        let y = e.target.position.y;
        let elem = items[y][x];

        
        const isFree = isFreeForShip(result, y, x);
        console.log("elem " + elem + " " + isFree);
        if (elem == 0 && isFree) {
            items[y][x + i] = 1;
            console.log("Ship added");
        } 
    }
    refresh();        
}

function refresh() {
    for (let y = 0; y < items.length; y++) {
        for (let x = 0; x < items.length; x++) {
            const cell = items[y][x];
            let div = document.getElementById(`id${y}-${x}`);
            if (cell == 0)
                div.style.backgroundColor = "#D3EBF1";
            else if (cell == 1)
                div.style.backgroundColor = "yellow";
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
    let centrPoint = items[y][x];
    if (centrPoint != 0) {
        return false;
    }

    let top = items[y - 1][x];
    if (top != 0) {
        return false;
    }

    let topRight = items[y - 1][x + 1];
    if (topRight != 0) {
        return false;
    }

    let right = items[y][x + 1];
    if (right != 0) {
        return false;
    }

    let bottomRight = items[y + 1][x + 1];
    if (bottomRight != 0) {
        return false;
    }

    let bottom = items[y + 1][x];
    if (bottom != 0) {
        return false;
    }

    let bottomLeft = items[y + 1][x - 1];
    if (bottomLeft != 0) {
        return false;
    }

    let left = items[y][x - 1];
    if (left != 0) {
        return false;
    }

    let topLeft = items[y - 1][x - 1];
    if (topLeft != 0) {
        return false;
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