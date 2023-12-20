class Crucigrama {
  constructor() {
this.boardString= "12,*,.,=,36,#,#,#,15,#,#,*,#,/,#,#,#,*,.,-,.,=,.,#,55,#,.,*,#,=,#,=,#,/,#,=,.,#,15,#,9,*,.,=,45,=,#,#,#,#,#,=,#,#,72,#,20,-,.,=,11,#,.,#,#,-,#,+,#,#,#,*,56,/,.,=,.,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,12,#,16,*,.,=,32"    
this.rows = 11;
    this.columns = 9;
    this.boardArray = this.initializeBoard();
    this.init_time;
    this.end_time;
    this.level = 2;
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
    this.boardString= this.boardString.split(',');
    return board;
  }

  start() {
    let index = 0;
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        const char = this.boardString[index++];
        
        if(char === '.'){
          this.boardArray[i][j] = 0;
        }else if(char === '#'){
          this.boardArray[i][j] = -1;
        }else if( char === ','){
          
        }
        else if( isNaN(char)){
          this.boardArray[i][j] = char;
        }
        else{
          this.boardArray[i][j] = parseInt(char);
        }
      }
    }
  }

  createStructure() {
    const mainElement = document.querySelector('main');
    document.addEventListener("keydown", (event) => this.introduceElement(event));
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

  paintMathword() {
   // this.createStructure(); // Llamada al método createStructure
   this.init_time= new Date();
    const paragraphs = document.querySelectorAll('main p');
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        const value = this.boardArray[i][j];
        const index = i * this.columns + j;
        if(value ==0){
          paragraphs[index].textContent = '';
          paragraphs[index].dataset.state = 'clicked';
     
        }
        else if(value == -1){
          paragraphs[index].textContent = '';
          paragraphs[index].dataset.state = 'empty';
     
        }
        else{
          paragraphs[index].textContent = value;
          paragraphs[index].dataset.state = 'correct';
     
        }
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

  check_win_condition() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        if (this.boardArray[i][j] === 0) {
          return false;
        }
      }
    }
    
    return true;
  }
  isValid(rowIndex, colIndex, number){
    return this.isValidVertical(rowIndex, colIndex, number) && this.isValidHorizontal(rowIndex, colIndex, number);
  }
  
 calculate_date_difference() {
  this.end_time= new Date();
  var difference = this.end_time - this.init_time;
  var total_seconds = Math.floor(difference / 1000);

    // Calcula las horas, minutos y segundos
    var hours = Math.floor(total_seconds / 3600);
    var minutes = Math.floor((total_seconds % 3600) / 60);
    var seconds = total_seconds % 60;

    // Formatea la cadena de texto con ceros a la izquierda si es necesario
    var formatted_time =
        this.padZero(hours) + ':' + this.padZero(minutes) + ':' + this.padZero(seconds);

    console.log(formatted_time);
    return formatted_time;
   }
   padZero(num) {
    return num < 10 ? '0' + num : num;
}
  isValidVertical(rowIndex, colIndex, number){
    var first_number;
    var second_number;
    var expression;
    var result;
    if(rowIndex<10){
    if(this.boardArray[rowIndex+1][colIndex]!=-1){
      if(this.boardArray[rowIndex+1][colIndex]==='='){
        first_number =this.boardArray[rowIndex-2][colIndex] 
        second_number = this.boardArray[rowIndex][colIndex]
        expression = this.boardArray[rowIndex-1][colIndex]
        result = this.boardArray[rowIndex+2][colIndex]
        if(first_number != 0 && second_number != 0 && expression!= 0 && result != 0){
          return this.checkExpression(first_number, second_number, expression, result);
        }else {
          return true;
        }
      }else{
        var row = rowIndex+1;
        while(this.boardArray[row][colIndex]!='='){
          row+=1;
        }
        first_number =this.boardArray[row-3][colIndex] 
        second_number = this.boardArray[row-1][colIndex]
        expression = this.boardArray[row-2][colIndex]
        result = this.boardArray[row+1][colIndex]
        if(first_number != 0 && second_number != 0 && expression!= 0 && result != 0){
          return this.checkExpression(first_number, second_number, expression, result);
        }

      }
    }}
    return true;
  }

  isValidHorizontal(rowIndex, colIndex, number){
    var first_number;
    var second_number;
    var expression;
    var result;
    if(colIndex<8){
    if(this.boardArray[rowIndex][colIndex+1]!=-1){
      if(this.boardArray[rowIndex][colIndex+1]==='='){
        first_number =this.boardArray[rowIndex][colIndex-2] 
        second_number = this.boardArray[rowIndex][colIndex]
        expression = this.boardArray[rowIndex][colIndex-1]
        result = this.boardArray[rowIndex][colIndex+2]
        if(first_number != 0 && second_number != 0 && expression!= 0 && result != 0){
          return this.checkExpression(first_number, second_number, expression, result);
        }else{
          return true;
        }
     
    }else{
      var col = colIndex+1;
    while(this.boardArray[rowIndex][col]!='='){
      col+=1;
    }
    first_number =this.boardArray[rowIndex][col-3] 
        second_number = this.boardArray[rowIndex][col-1]
        expression = this.boardArray[rowIndex][col-2]
        result = this.boardArray[rowIndex][col+1]
        if(first_number != 0 && second_number != 0 && expression!= 0 && result != 0){
          return this.checkExpression(first_number, second_number, expression, result);
        }}
      }return true;
    }
    return true;
  }

  checkExpression(first_number, second_number, expression, result){
    var mathematicalExpression = [first_number, expression, second_number].join(' ');
    var evaluationResult = eval(mathematicalExpression);

// Comprobar si el resultado de la evaluación es igual al valor de la variable result
if (evaluationResult === result) {
  console.log('La expresión fue evaluada correctamente y el resultado es igual a', result);
  return true;
} else {
  console.log('Hubo un error en la evaluación o el resultado no es igual a', result);
  return false;
}
  }
  checkValue(value){
    if(value != '*' || value != '/' || value != '-' || value != '+'){
      return false;
    }
    return true;
  }
  introduceElement(ev){
    var expression_row =true;
    var expression_col = true;
    this.currentCell.innerText = ev.key;
    if(this.end_time==null){
    if(isNaN(ev.key)&& this.checkValue(ev.key)) alert("Solo son validos numeros");
    else{
      if(isNaN(ev.key)){
        this.number = ev.key;
      } 
      else{this.number =parseInt(ev.key);}  
    console.log(this.number);
    const selectedCell = document.querySelector('main p[data-state="clicked"]');
     
      if (selectedCell) {
        const rowIndex = parseInt(this.currentCell.dataset.row);
        const colIndex = parseInt(this.currentCell.dataset.col);
       this.boardArray[rowIndex][colIndex] = this.number;
        if (this.isValid(rowIndex, colIndex, this.number)) {
          // Deshabilitar la opción de hacer click en la casilla seleccionada
          this.currentCell.removeEventListener('click', this.cellClickHandler);
          // Modificar el valor del atributo data-state a 'correct'
          this.currentCell.dataset.state = 'correct';
          // Modificar el contenido del párrafo con el número introducido
          
          this.currentCell.textContent = this.number;
  
          // Comprobar si ya están rellenas todas las cuadrículas del sudoku
          //AÑADIR this.check_win_condition()
          if (this.check_win_condition()) {
            var time = this.calculate_date_difference();
            alert('¡Sudoku completado! time : '+ time);
            this.createRecordForm();
          }
        } else {
          alert('Movimiento no válido. Por favor, selecciona otra celda o introduce un número diferente.');
          this.currentCell.removeEventListener('click', this.cellClickHandler);
          // Modificar el valor del atributo data-state a 'correct'
          
          this.currentCell.textContent =' ';
        }
      } else {
        alert('Por favor, selecciona una celda antes de introducir un número.');
      }
    }}
    
    }

    createRecordForm() {
      // Obtener el elemento principal
      
  
      // Crear el formulario
      var areaVisualizacion = document.querySelector("article");
      var time = this.end_time-this.init_time;
      // var errorArchivo = document.getElementById("errorLectura");
      areaVisualizacion.innerHTML+= "<h3>Formulario registro</h3>";// el for va siempre con el id
      areaVisualizacion.innerHTML+= "<form action='crucigrama.php' method='post'><p> <label for='nombre'>Nombre:</label>"+
      '<input type="text" id ="nombre" name="nombre" required>'+
      "<label for='Apellido'>Apellido:</label>"+
      '<input type="text" id="Apellido" name="apellido" required>'+
      " <label for ='nivel'>Nivel: </label>"+
      '<input type="number" id= "nivel" name="nivel" value = '+this.level+' readonly>'+
      "<label for = 'tiempo'>Tiempo empleado(ms):</label>"+
      '<input type="number" id="tiempo" name="tiempo" value = '+time+' readonly>'+ 
      "</p>"+
      "<button type='submit'>Registrar</button></form>";
      
  }
 
}
// Crear una instancia de crucigrama
const crucigrama = new Crucigrama();
crucigrama.start();
crucigrama.createStructure();
crucigrama.paintMathword();
