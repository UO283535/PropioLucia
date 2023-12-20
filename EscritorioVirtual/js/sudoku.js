class Sudoku {
  constructor() {
    this.boardString = "3.4.69.5....27...49.2..4....2..85.198.9...2.551.39..6....8..5.32...46....4.75.9.6";
    this.rows = 9;
    this.columns = 9;
    this.boardArray = this.initializeBoard();
  }

  initializeBoard() {
    const board = [];
    for (let i = 0; i < this.rows; i++) {
      const row = [];
      for (let j = 0; j < this.columns; j++) {
        row.push(0);
      }
      board.push(row);
    }
    return board;
  }

  start() {
    let index = 0;
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        const char = this.boardString[index++];
        const value = char === '.' ? 0 : parseInt(char);
        this.boardArray[i][j] = value;
      }
    }
  }

  createStructure() {
    const mainElement = document.querySelector('main');
    document.addEventListener("keydown", (event) => this.introduceNumber(event));
    //document.addEventListener("keydown", (event) => this.keyDown(event));
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        const paragraph = document.createElement('p');
        paragraph.dataset.row = i;
        paragraph.dataset.col = j;
        
        paragraph.addEventListener('click', (event) => this.cellClicked(event));
        
        mainElement.append(paragraph);
      }
    }
  }

  paintSudoku() {
   // this.createStructure(); // Llamada al método createStructure

    const paragraphs = document.querySelectorAll('main p');
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        const value = this.boardArray[i][j];
        const index = i * this.columns + j;
        paragraphs[index].textContent = value !== 0 ? value : '';
        paragraphs[index].dataset.state = value === 0 ? 'clicked' : 'clicked';
      }
    }
  }

  cellClicked(event) {
    const cell = event.target;
    const rowIndex = cell.dataset.row;
    const colIndex = cell.dataset.col;
    
    // Modificar el valor del atributo data-state al valor clicked
    cell.dataset.state = 'clicked';
    console.log(`Clicked cell at row ${rowIndex}, column ${colIndex}`);
    this.currentCell = event.target;
    console.log(this.currentCell);
    //this.introduceNumber(number);
  }


introduceNumber(ev){
  this.currentCell.innerText = ev.key;
  if(isNaN(ev.key)) alert("Solo son validos numeros");
  this.number = parseInt(ev.key);  
  console.log(this.number);
  const selectedCell = document.querySelector('main p[data-state="clicked"]');
  console.log(selectedCell);
    
    if (selectedCell) {
      const rowIndex = parseInt(this.currentCell.dataset.row);
      const colIndex = parseInt(this.currentCell.dataset.col);

      if (this.isValidMove(rowIndex, colIndex, this.number)) {
        // Deshabilitar la opción de hacer click en la casilla seleccionada
        this.currentCell.removeEventListener('click', this.cellClickHandler);
        // Modificar el valor del atributo data-state a 'correct'
        this.currentCell.dataset.state = 'correct';
        // Modificar el contenido del párrafo con el número introducido
        this.currentCell.textContent = this.number;

        // Comprobar si ya están rellenas todas las cuadrículas del sudoku
        if (this.isSudokuComplete()) {
          alert('¡Sudoku completado!');
        }
      } else {
        alert('Movimiento no válido. Por favor, selecciona otra celda o introduce un número diferente.');
        this.currentCell.removeEventListener('click', this.cellClickHandler);
        // Modificar el valor del atributo data-state a 'correct'
        this.currentCell.dataset.state = 'incorrect';
        this.currentCell.textContent =' ';
      }
    } else {
      alert('Por favor, selecciona una celda antes de introducir un número.');
    }
  }

  isValidMove(rowIndex, colIndex, number) {
    return (
      this.validateRow(rowIndex, number) &&
      this.validateColumn(colIndex, number) &&
      this.validateSection(rowIndex, colIndex, number)
    );
  }
  validateRow(rowIndex, number) {
    for (let i = 0; i < 9; i++) {
      if (this.boardArray[rowIndex][i] === number) {
        return false;
      }
    }
    return true;
  }

  validateColumn(colIndex, number) {
    for (let i = 0; i < 9; i++) {
      if (this.boardArray[i][colIndex] === number) {
        return false;
      }
    }
    return true;
  }

  validateSection(rowIndex, colIndex, number) {
    const startRow = Math.floor(rowIndex / 3) * 3;
    const startCol = Math.floor(colIndex / 3) * 3;

    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (this.boardArray[i][j] === number) {
          return false;
        }
      }
    }

    return true;
  }

  isSudokuComplete() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        if (this.boardArray[i][j] === 0 || document.querySelector(`main p[data-state="clicked"]`)) {
          return false;
        }
      }
    }
    return true;
  }
}
// Crear una instancia de Sudoku
const sudoku = new Sudoku();
sudoku.start();
sudoku.createStructure();
sudoku.paintSudoku();
