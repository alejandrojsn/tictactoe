var cells, player, aion;

const board = document.getElementById("board");
player = 1;
cells = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

function checkColumn(column){
  let result = true;

  for(let i = 0; i < 2; i++) {
    if (cells[i][column] !== cells[i+1][column]) {
      result = false;
      break;
    }
  }

  return result
}

function checkRow(row){
  
  let result = true;

  for(let i = 0; i < 2; i++){
    if (cells[row][i] !== cells[row][i+1]) {
      result = false;
      break;
    }
  }
  
  return result;
}

function checkDiagonal(row, column){
  
  if(row === column){
    
    if(cells[0][0] === cells[1][1] && cells[1][1] === cells[2][2]){
      return true;
    }
  }
  
  else if(row + column === 2){
    
    if(cells[0][2] === cells[1][1] && cells[1][1] === cells[2][0]){
      return true;
    }
  }
  
  return false;

}


function checkWin(row, column){

  return checkDiagonal(row, column) || checkRow(row) || checkColumn(column);
}

function play(row, column){
  
  if(cells[row][column] === 0){
    
    cells[row][column] = player;
    
    document.querySelector(`[data-row="${row}"][data-column="${column}"]`).classList.add(player === 1 ? 'x' : 'o');
    
    if(checkWin(row, column)){
      
      document.querySelector('body').innerHTML += `Player ${player} wins`;
      
      board.removeEventListener("click", humanPlay);
      return false;
    }
    
    player = player === 1 ? 2 : 1;
  }
  
}

function computerPlay(){
  
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
  
  if ( (aion && player === 1) || !aion ) {

    let row = Number(ev.target.attributes["data-row"].value);
    let column = Number(ev.target.attributes["data-column"].value);

    play(row, column);
  }

  if (aion && player === 2) {

    computerPlay();

  }
}


function init (ev) {

  aion = Number(ev.target.attributes["data-aion"].value);

  document.getElementById("intro").remove();

  console.log(board);

  board.style.display = "grid";

  board.addEventListener("click", humanPlay);

}

window.addEventListener('load', () => {

  buttons = document.querySelectorAll("[data-aion]");

  buttons.forEach(button => button.addEventListener('click', init));

});