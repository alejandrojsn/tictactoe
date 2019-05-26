//Declarando variables
let cells, remainingCells, player;

//Inicializando variables
const board = document.getElementById("board");
player=1;
cells = [[], [], []];
remainingCells = [];

//Creamos el mapa de las celdas
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    cells[i][j] = 0;
    remainingCells.push(getCell(i,j));
  }
}

// Conseguir la celda sabiendo la fila y columna
function getCell(row, column){
  return row*10+column;
}

// Conseguir la fila sabiendo la celda
function getRow(cell){
  return ~~(cell/10);
}

// Conseguir la columna sabiendo la celda
function getColumn(cell){
  return cell % 10;
}

// Checar si un mismo jugador marcó todas las celdas de una misma columna
function checkColumn(column){
  //Esto es sólo para hacerme la vida más fácil en vez de escribir cells.get(getCell([1,2,3],column)) cuatro veces
  let result = true;

  for(let i = 0; i < 2; i++) {
    if (cells[i][column] !== cells[i+1][column]) {
      result = false;
      break;
    }
  }

  //Si el mismo jugador marcó todas las celdas de la columna, devuelve true
  return result
}

// Checar si un mismo jugador marcó todas las celdas de una misma fila
function checkRow(row){
  //Esto es sólo para hacerme la vida más fácil en vez de escribir cells.get(getCell(row, [1,2,3])) cuatro veces
  let result = true;

  for(let i = 0; i < 2; i++){
    if (cells[row][i] !== cells[row][i+1]) {
      result = false;
      break;
    }
  }
  
  //Si el mismo jugador marcó todas las celdas de la fila, devuelve true
  return result;
}

//Checar si un mismo jugador marcó todas las celdas de una diagonal
function checkDiagonal(row, column){
  //Si la fila y la columna son iguales, significa que la celda está en la diagonal principal
  if(row === column){
    //Checamos si un jugador marcó todas las celdas de esa diagonal
    if(cells[0][0] === cells[1][1] && cells[1][1] === cells[2][2]){
      return true;
    }
  }
  //Si el valor absoluto de la resta de la fila y la columna da 2, o se trata de la celda 22, la celda es parte de la diagonal secundaria
  else if(row + column === 2){
    //Checamos si un jugador marcó todas las celdas de esa diagonal
    if(cells[0][2] == cells[1][1] && cells[1][1] == cells[2][0]){
      return true;
    }
  }
  //Devolvemos falso en cualquier otro caso
  return false;

}

//Checamos si un jugador ganó
function checkWin(row, column){

  //Se cumplen alguna de las condiciones para ganar?
  return checkDiagonal(row, column) || checkRow(row) || checkColumn(column);
}

function play(row, column){
  //La celda aún no ha sido seleccionada?
  if(cells[row][column] === 0){
    //Le asignamos la celda al jugador
    cells[row][column] = player;
    //Ponemos una X o una O, según sea el caso
    document.querySelector(`[data-row="${row}"][data-column="${column}"]`).classList.add(player==1 ? 'x' : 'o');
    //Alguien ganó?
    if(checkWin(row, column)){
      //Mostramos quién ganó
      document.getElementById('body').innerHTML += `Player ${player} wins`;
      //Eliminamos el listener
      board.removeEventListener("click", humanPlay);
      return false;
    }
    //Removemos la celda de las celdas disponibles
    remainingCells.splice(remainingCells.indexOf(getCell(row, column)), 1);
    //Cambiamos de jugador
    player = player==1 ? 2 : 1;
  }
  
}

function computerPlay(){
  //Elige una celda al azar entre las disponibles
  //let cell = remainingCells[Math.round(Math.random() * (remainingCells.length-1))];
  //let row = getRow(cell);
  //let column = getColumn(cell);

  for(let i = 0; i < 3; i++){

    let searching = -1, empty = -1, count = 0;

    for(let j = 0; j < 3; j++){
      if(cells[i][j] === 0){
        empty = j;
      } else {

        if(searching === -1){
          searching = cells[i][j];
          count++;
        } else if(searching === cells[i][j]) {
          count++;
        }
      }
    }

    if(count === 2 && empty > -1){
      play(i, empty);
      return 0;
    }
  }

  for(let i = 0; i < 3; i++){

    let searching = -1, empty = -1, count = 0;

    for(let j = 0; j < 3; j++){
      if(cells[j][i] === 0){
        empty = j;
      } else {
        
        if(searching === -1){
          searching = cells[j][i];
          count++;
        } else if(searching === cells[j][i]) {
          count++;
        }
      }
    }

    if(count === 2 && empty > -1){
      play(empty, i);
      return 0;
    }
  }

  {
    let searching = -1, empty = -1, count = 0;

    for(let i = 0; i < 3; i++){
      if(cells[i][i] === 0){
        empty = i;
      } else {
        if(searching === -1){
          searching = cells[i][i];
          count++;
        } else if(searching === cells[i][i]) {
          count++;
        }
      }
    }

    if(count === 2 && empty > -1){
      play(empty, empty);
      return 0;
    }
  }

  {
    let searching = -1, empty = -1, count = 0;

    for(let i = 0; i < 3; i++){
      if(cells[i][2-i] === 0){
        empty = i;
      } else {
        if(searching === -1){
          searching = cells[i][2-i];
          count++;
        } else if(searching === cells[i][2-i]) {
          count++;
        }
      }
    }

    if(count === 2 && empty > -1){
      play(empty, 2-empty);
      return 0
    }
  }

  if (cells[1][1] === 0) {
    play(1, 1);
    return 0;
  }

  if(cells[0][0] === 0){
    play(0, 0);
    return 0;
  }

  if(cells[0][2] === 0){
    play(0, 2);
    return 0;
  }

  if(cells[2][0] === 0){
    play(2, 0);
    return 0;
  }

  if(cells[2][2] === 0){
    play(2, 2);
    return 0;
  }

  for(let i = 0; i < 3; i++){
    for(let j = 0; j < 3; j++){
      if (cells[i][j] === 0) {
        play(i, j);
        return 0;
      }
    }
  }
}

function humanPlay(ev){
  //Si es su turno, juega
  if(player==1){

    let row = Number(ev.target.attributes["data-row"].value);
    let column = Number(ev.target.attributes["data-column"].value);

    play(row, column);
  }
  //Si hizo una jugada correcta, ahora juega la máquina
  if(player==2){
    computerPlay();
  }
}

board.addEventListener("click", humanPlay);