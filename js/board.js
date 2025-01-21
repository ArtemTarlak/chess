let divBoard = document.querySelector('.board')
addSquare()
showFiguresAt()


// Добавление ячеек
function addSquare() {
    for (let divSquare_x = 0; divSquare_x < 8; divSquare_x++){
        for(let divSquare_y = 0; divSquare_y < 8; divSquare_y++){
            if ((divSquare_x + divSquare_y) % 2 === 0){
                divBoard.insertAdjacentHTML('beforeend', `<div id = "divSquare${divSquare_x}_${divSquare_y}" class="square white_square"></div>`)
            }
            else{
                divBoard.insertAdjacentHTML('beforeend', `<div id = "divSquare${divSquare_x}_${divSquare_y}" class="square black_square"></div>`)
            }
        }
    }
}

// добавление фигуры 
function showFigureAt(divSquare_x, divSquare_y, figure) {
    let divSquare = document.querySelector(`#divSquare${divSquare_x}_${divSquare_y}`)
    divSquare.insertAdjacentHTML('beforeend', 
    `<button id='${divSquare_x}${divSquare_y}'  type="button" class=${figure} onclick="move_${figure}(${divSquare_x},${divSquare_y})">
        <img src="img/${getChessSumbole(figure)}.png" class="figure" alt="">
    </button>`)
}

// сокращенное название фигуры
function getChessSumbole(figure) {
    switch (figure) {
        case 'K' : return "white_king";
        case 'Q' : return "white_queen";
        case 'R' : return "white_rook";
        case 'B' : return "white_bishop";
        case 'H' : return "white_horse";
        case 'P' : return "white_pawn";
        case 'k' : return "black_king";
        case 'q' : return "black_queen";
        case 'r' : return "black_rook";
        case 'b' : return "black_bishop";
        case 'h' : return "black_horse";
        case 'p' : return "black_pawn";

        default : return "";
    }
}

// Первоначальная расстановка фигур 
function showFiguresAt() {
    showFigureAt(0,0,'r');
    showFigureAt(0,1,'h');
    showFigureAt(0,2,'b');
    showFigureAt(0,3,'q');
    showFigureAt(0,4,'k');
    showFigureAt(0,5,'b');
    showFigureAt(0,6,'h');
    showFigureAt(0,7,'r');

    showFigureAt(7,0,'R');
    showFigureAt(7,1,'H');
    showFigureAt(7,2,'B');
    showFigureAt(7,3,'Q');
    showFigureAt(7,4,'K');
    showFigureAt(7,5,'B');
    showFigureAt(7,6,'H');
    showFigureAt(7,7,'R');

    for (let y = 0; y<8; y++){
        showFigureAt(1,y,'p');
        showFigureAt(6,y,'P');
    }
}

// Проверка на союзника или врага
function checkAlly(x, y, divSquare_x, divSquare_y){
    let startPlaceFigure = document.getElementById(`${divSquare_x}${divSquare_y}`).className
    let finalPlaceFigure = document.getElementById(`${x}${y}`).className
    if (checkColorFigure(startPlaceFigure) != checkColorFigure(finalPlaceFigure)){
        addButtonMove(x,y,divSquare_x,divSquare_y)
    }
}

// проверка на цвет фигуры
function checkColorFigure(figure) {
    if (figure === figure.toUpperCase()) {
        return 1;
    } else if (figure === figure.toLowerCase()) {
        return 0;
    } else {
        return null;
    }
}

// Проврка на возможность перемещения выбронной фигуры на определенную клетку
function checkHasChild(x, y, divSquare_x, divSquare_y) {
    let divSquare = document.querySelector(`#divSquare${x}_${y}`)
    // return divSquare.hasChildNodes()
    if (divSquare.hasChildNodes()) {
        // Проверка на цвет
        checkAlly(x, y, divSquare_x, divSquare_y)
        return true
    }
    else {
        return false
    }
}

// ход ладьи
function move_R(divSquare_x,divSquare_y){
    move_r(divSquare_x,divSquare_y)
}
function move_r(divSquare_x,divSquare_y) {
    deleteGreenCircle()
    movement_r(divSquare_x,divSquare_y)
}
function movement_r(divSquare_x,divSquare_y){
    x = divSquare_x
    y = divSquare_y + 1
    while (y <= 7){
        if (checkHasChild(x, y, divSquare_x, divSquare_y)){
            break
        }
        addButtonMove(x,y,divSquare_x,divSquare_y)
        y = y + 1
        
    }
    x = divSquare_x
    y = divSquare_y -1
    while (y >= 0){
        if (checkHasChild(x, y, divSquare_x, divSquare_y)){
            break
        }
        addButtonMove(x,y,divSquare_x,divSquare_y)
        y = y-1
        
    }
    x = divSquare_x - 1
    y = divSquare_y
    while (x >= 0){
        if (checkHasChild(x, y, divSquare_x, divSquare_y)){
            break
        }
        addButtonMove(x,y,divSquare_x,divSquare_y)
        x = x-1
        
    }
    x = divSquare_x + 1
    y = divSquare_y
    while (x <= 7){
        if (checkHasChild(x, y, divSquare_x, divSquare_y)){
            break
        }
        addButtonMove(x,y,divSquare_x,divSquare_y)
        x = x + 1
    }
}

//  ход коня
function move_H(divSquare_x,divSquare_y){
    move_h(divSquare_x,divSquare_y)
}
function move_h(divSquare_x,divSquare_y) {
    deleteGreenCircle()
    x = divSquare_x + 1
    if (x <= 7) {
        y = divSquare_y + 2
        if (y <= 7) {
            if (!checkHasChild(x, y, divSquare_x, divSquare_y)){
                addButtonMove(x,y,divSquare_x,divSquare_y)
            }
        }
        y = divSquare_y - 2
        if (y >= 0) {
            if (!checkHasChild(x, y, divSquare_x, divSquare_y)){
                addButtonMove(x,y,divSquare_x,divSquare_y)
            }
        }
    }
    x = divSquare_x + 2
    if (x <= 7) {
        y = divSquare_y + 1
        if (y <= 7) {
            if (!checkHasChild(x, y, divSquare_x, divSquare_y)){
                addButtonMove(x,y,divSquare_x,divSquare_y)
            }
        }
        y = divSquare_y - 1
        if (y >= 0) {
            if (!checkHasChild(x, y, divSquare_x, divSquare_y)){
                addButtonMove(x,y,divSquare_x,divSquare_y)
            }
        }
    }
    x = divSquare_x - 2
    if (x >= 0) {
        y = divSquare_y + 1
        if (y <= 7) {
            if (!checkHasChild(x, y, divSquare_x, divSquare_y)){
                addButtonMove(x,y,divSquare_x,divSquare_y)
            }
        }
        y = divSquare_y - 1
        if (y >= 0) {
            if (!checkHasChild(x, y, divSquare_x, divSquare_y)){
                addButtonMove(x,y,divSquare_x,divSquare_y)
            }
        }
    }
    x = divSquare_x - 1
    if (x >= 0) {
        y = divSquare_y + 2
        if (y <= 7) {
            if (!checkHasChild(x, y, divSquare_x, divSquare_y)){
                addButtonMove(x,y,divSquare_x,divSquare_y)
            }
        }
        y = divSquare_y - 2
        if (y >= 0) {
            if (!checkHasChild(x, y, divSquare_x, divSquare_y)){
                addButtonMove(x,y,divSquare_x,divSquare_y)
            }
        }
    }
}
// ход слона
function move_B(divSquare_x, divSquare_y) {
    move_b(divSquare_x, divSquare_y)
}
function move_b(divSquare_x, divSquare_y) {
    deleteGreenCircle()
    x = divSquare_x + 1
    y = divSquare_y + 1
    while (y <= 7 && x <= 7){
        if (checkHasChild(x, y, divSquare_x, divSquare_y)){
            break
        }
        addButtonMove(x,y,divSquare_x, divSquare_y)
        x = x + 1
        y = y + 1
    }
    x = divSquare_x - 1
    y = divSquare_y + 1
    while (y <= 7 && x >= 0){
        if (checkHasChild(x, y, divSquare_x, divSquare_y)){
            break
        }
        addButtonMove(x,y,divSquare_x, divSquare_y)
        x = x - 1
        y = y + 1
    }
    x = divSquare_x - 1
    y = divSquare_y - 1
    while (y >= 0 && x >= 0){
        if (checkHasChild(x, y, divSquare_x, divSquare_y)){
            break
        }
        addButtonMove(x,y,divSquare_x, divSquare_y)
        x = x - 1
        y = y - 1
    }
    x = divSquare_x + 1
    y = divSquare_y - 1
    while (y >= 0 && x <= 7){
        if (checkHasChild(x, y, divSquare_x, divSquare_y)){
            break
        }
        addButtonMove(x,y,divSquare_x, divSquare_y)
        x = x + 1
        y = y - 1
    }
}
// Ход ферзя
function move_Q(divSquare_x, divSquare_y){
    move_q(divSquare_x, divSquare_y)
}
function move_q(divSquare_x, divSquare_y){
    move_b(divSquare_x, divSquare_y)
    movement_r(divSquare_x, divSquare_y)
}
// Ход короля
function move_K(divSquare_x, divSquare_y){
    move_k(divSquare_x, divSquare_y)
}
function move_k(divSquare_x, divSquare_y){
    deleteGreenCircle()
    x = divSquare_x - 1
    y = divSquare_y
    if (x >= 0){
        if (!checkHasChild(x, y, divSquare_x, divSquare_y)){
            addButtonMove(x,y,divSquare_x, divSquare_y)
        }
        y = divSquare_y + 1
        if (y <= 7) {
            if (!checkHasChild(x, y, divSquare_x, divSquare_y)){
                addButtonMove(x,y,divSquare_x, divSquare_y)
            }
        }
    }
    x = divSquare_x
    y = divSquare_y + 1
    if (y <= 7){
        if (!checkHasChild(x, y, divSquare_x, divSquare_y)){
            addButtonMove(x,y,divSquare_x, divSquare_y)
        }
        x = divSquare_x + 1
        if (x <= 7) {
            if (!checkHasChild(x, y, divSquare_x, divSquare_y)){
                addButtonMove(x,y,divSquare_x, divSquare_y)
            }
        }
    }
    x = divSquare_x + 1
    y = divSquare_y
    if (x <= 7){
        if (!checkHasChild(x, y, divSquare_x, divSquare_y)){
            addButtonMove(x,y,divSquare_x, divSquare_y)
        }
        y = divSquare_y - 1
        if (y >= 0) {
            if (!checkHasChild(x, y, divSquare_x, divSquare_y)){
                addButtonMove(x,y,divSquare_x, divSquare_y)
            }
        }
    }
    x = divSquare_x
    y = divSquare_y - 1
    if (y >= 0){
        if (!checkHasChild(x, y, divSquare_x, divSquare_y)){
            addButtonMove(x,y,divSquare_x, divSquare_y)
        }
        x = divSquare_x - 1
        if (x >= 0) {
            if (!checkHasChild(x, y, divSquare_x, divSquare_y)){
                addButtonMove(x,y,divSquare_x, divSquare_y)
            }
        }
    }
}
// ход пешки
function move_p(divSquare_x, divSquare_y){
    deleteGreenCircle()
    x = divSquare_x
    y = divSquare_y
    if (divSquare_x === 1) {
        x = divSquare_x + 1
        while (x <= 3) {
            if (checkHasChildPawn(x, y, divSquare_x, divSquare_y)){
                break
            }
            addButtonMove(x,y,divSquare_x, divSquare_y)
            x = x + 1
        }
    }
    else{
        x = divSquare_x + 1
        if (!checkHasChildPawn(x, y, divSquare_x, divSquare_y)){
            addButtonMove(x,y,divSquare_x, divSquare_y)
        }
    }
    if (divSquare_y != 7 && divSquare_y != 0){
        x = divSquare_x + 1
        y = divSquare_y + 1
        checkHasChild(x, y, divSquare_x, divSquare_y)
        y = divSquare_y - 1
        checkHasChild(x, y, divSquare_x, divSquare_y)
    }
    else if (divSquare_y === 7) {
        x = divSquare_x + 1
        y = divSquare_y - 1
        checkHasChild(x, y, divSquare_x, divSquare_y)
    }
    else if (divSquare_y === 0) {
        x = divSquare_x + 1
        y = divSquare_y + 1
        checkHasChild(x, y, divSquare_x, divSquare_y)
    }
}
function move_P(divSquare_x, divSquare_y){
    deleteGreenCircle()
    x = divSquare_x
    y = divSquare_y
    if (divSquare_x === 6) {
        x = divSquare_x - 1
        while (x >= 4) {
            if (checkHasChildPawn(x, y, divSquare_x, divSquare_y)){
                break
            }
            addButtonMove(x,y,divSquare_x, divSquare_y)
            x = x - 1
        }
    }
    else{
        x = divSquare_x - 1
        if (!checkHasChildPawn(x, y, divSquare_x, divSquare_y)){
            addButtonMove(x,y,divSquare_x, divSquare_y)
        }
    }
    if (divSquare_y != 7 && divSquare_y != 0){
        x = divSquare_x - 1
        y = divSquare_y + 1
        checkHasChild(x, y, divSquare_x, divSquare_y)
        y = divSquare_y - 1
        checkHasChild(x, y, divSquare_x, divSquare_y)
    }
    else if (divSquare_y === 7) {
        x = divSquare_x - 1
        y = divSquare_y - 1
        checkHasChild(x, y, divSquare_x, divSquare_y)
    }
    else if (divSquare_y === 0) {
        x = divSquare_x - 1
        y = divSquare_y + 1
        checkHasChild(x, y, divSquare_x, divSquare_y)
    }
}
// Проврка ка возможность перемещения выбронной фигуры на определенную клетку для Пешки
function checkHasChildPawn(x, y, divSquare_x, divSquare_y) {
    let divSquare = document.querySelector(`#divSquare${x}_${y}`)
    if (divSquare.hasChildNodes()) {
        return true
    }
    else {
        return false
    }
}

// добавление кнопки хода
function addButtonMove(divSquare_x,divSquare_y,x,y) {
    let divSquare = document.querySelector(`#divSquare${divSquare_x}_${divSquare_y}`)
    divSquare.insertAdjacentHTML('beforeend', 
    `<button type="button" class="green_circle" onclick="changePositionFigure(${divSquare_x},${divSquare_y},${x},${y})"></button>`)
}

// divSquare_x,divSquare_y координаты новой позиции
// x,y координаты старой позиции
function changePositionFigure(divSquare_x,divSquare_y,x,y){
    let oldDivSquare = document.querySelector(`#divSquare${x}_${y}`)
    let newDivSquare = document.querySelector(`#divSquare${divSquare_x}_${divSquare_y}`)
    let figure = oldDivSquare.firstChild.className
    checkKing(newDivSquare)
    Array.from(newDivSquare.children).forEach(child => child.remove());
    Array.from(oldDivSquare.children).forEach(child => child.remove());
    showFigureAt(divSquare_x,divSquare_y,checkPawnEnd(figure,divSquare_x))
    deleteGreenCircle()
}


// Удаление зеленых кнопок
function deleteGreenCircle(){
    const elementsToRemove = document.querySelectorAll('.green_circle');
    elementsToRemove.forEach(element => element.remove());
}

function checkKing(newDivSquare) {
    let figure = newDivSquare.firstChild.className
    if (figure === 'k'){
        divBoard.insertAdjacentHTML('beforeend',
            `<div class="win">Белые победили</div>`
        )
        disableAllButtons()
    }
    else if (figure === 'K'){
        divBoard.insertAdjacentHTML('beforeend',
            `<div class="win">Чёрные победили</div>`
        )
        disableAllButtons()
    }
}

function disableAllButtons() {
    let allButtons = document.querySelectorAll('button');
    allButtons.forEach(button => {
        button.disabled = true;
    });
}

function checkPawnEnd(figure,divSquare_x){
    if (figure === 'p' && divSquare_x === 7){
        figure = 'q'
    }
    if (figure === 'P' && divSquare_x === 0){
        figure = 'Q'
    }
    return figure
    
}