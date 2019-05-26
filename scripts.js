//Declarando variables
let cells, remainingCells, player;

//Inicializando variables
const board = document.getElementById("board");
player=1;
cells = new Map();
remainingCells = new Array();

//Creamos el mapa de las celdas
for (var i = 1; i <= 3; i++) {
  for (var j = 1; j <= 3; j++) {
    cells.set(getCell(i,j), false);
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
  let c = new Array();
  for(let k = 1; k <= 3; k++){
    c.push(cells.get(getCell(k,column)));
  }

  //Si el mismo jugador marcó todas las celdas de la columna, devuelve true
  return c[0]==c[1] && c[1]==c[2]
}

// Checar si un mismo jugador marcó todas las celdas de una misma fila
function checkRow(row){
  //Esto es sólo para hacerme la vida más fácil en vez de escribir cells.get(getCell(row, [1,2,3])) cuatro veces
  let c = new Array();
  for(let k = 1; k <= 3; k++){
    c.push(cells.get(getCell(row,k)));
  }
  //Si el mismo jugador marcó todas las celdas de la fila, devuelve true
  return c[0]==c[1] && c[1]==c[2]
}

//Checar si un mismo jugador marcó todas las celdas de una diagonal
function checkDiagonal(row, column){
  //Si la fila y la columna son iguales, significa que la celda está en la diagonal principal
  if(row==column){
    //Checamos si un jugador marcó todas las celdas de esa diagonal
    if((cells.get(11)==cells.get(22)) && (cells.get(22)==cells.get(33))){
      return true;
    }
  }
  //Si el valor absoluto de la resta de la fila y la columna da 2, o se trata de la celda 22, la celda es parte de la diagonal secundaria
  else if((Math.abs(row-column)==2) || (getCell(row, column)==22)){
    //Checamos si un jugador marcó todas las celdas de esa diagonal
    if((cells.get(31)==cells.get(22)) && (cells.get(22)==cells.get(13))){
      return true
    }
  }
  //Devolvemos falso en cualquier otro caso
  return false;

}

//Checamos si un jugador ganó
function checkWin(cell){
  let row=getRow(cell);
  let column=getColumn(cell);

  //Se cumplen alguna de las condiciones para ganar?
  if(checkDiagonal(row, column) || checkRow(row) || checkColumn(column)){
    return true;
  }
  else{
    return false;
  }
}

function play(cell){
  //La celda aún no ha sido seleccionada?
  if(!cells.get(cell)){
    //Le asignamos la celda al jugador
    cells.set(cell, player);
    //Ponemos una X o una O, según sea el caso
    document.getElementById(`${cell}`).classList.add(player==1 ? 'x' : 'o');
    //Alguien ganó?
    if(checkWin(cell)){
      //Mostramos quién ganó
      document.getElementById('body').innerHTML += `Player ${player} wins`;
      //Eliminamos el listener
      board.removeEventListener("click", humanPlay);
      return false;
    }
    //Removemos la celda de las celdas disponibles
    remainingCells.splice(remainingCells.indexOf(cell), 1);
    //Cambiamos de jugador
    player = player==1 ? 2 : 1;
  }
  
}

function computerPlay(){
  //Elige una celda al azar entre las disponibles
  play(remainingCells[Math.round(Math.random() * (remainingCells.length-1))]);
}

function humanPlay(ev){
  //Si es su turno, juega
  if(player==1){

    play(Number(ev.target.attributes.id.value));
  }
  //Si hizo una jugada correcta, ahora juega la máquina
  if(player==2){
    computerPlay();
  }
}

board.addEventListener("click", humanPlay);