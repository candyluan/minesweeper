
export class Board {
  constructor(numberOfRows,numberOfColumns,numberOfBombs){
    this._numberOfBombs=numberOfBombs;
    this._numberOfEmptySpaces=numberOfRows * numberOfColumns;
    this._playerBoard=Board.generatePlayerBoard(numberOfRows,numberOfColumns);
    this._bombBoard=Board.generateBombBoard(numberOfRows,numberOfColumns,numberOfBombs);

  }
  get playerBoard() {
    return this._playerBoard;
  }

  flipTitle(rowIndex,columnIndex) {
    if (this._playerBoard[rowIndex][columnIndex]!==' '){

      return
    }
    this._numberOfEmptySpaces--
    if (this._bombBoard[rowIndex][columnIndex]==='B'){
      this._playerBoard[rowIndex][columnIndex]='B'
    } else {
      this._playerBoard[rowIndex][columnIndex]=this.getNumberOfNeighborBombs(rowIndex,columnIndex)
    }

  }
  getNumberOfNeighborBombs(rowIndex,columnIndex) {
    const neighborOffsets=[
      [-1,-1],
      [-1,0],
      [-1,1],
      [0,-1],
      [0,1],
      [1,-1],
      [1,0],
      [1,1]
    ];
    const numberOfRows=this._bombBoard.length;
    const numberOfColumns=this._bombBoard[0].length;
    let numberOfBombs=0;
    neighborOffsets.forEach(offset=>{
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
      if (neighborRowIndex>=0  &&  neighborRowIndex<numberOfRows  &&  neighborColumnIndex>=0
        &&  neighborColumnIndex<numberOfColumns){
      if(this._bombBoard[neighborRowIndex][neighborColumnIndex]==='B'){
        numberOfBombs++;}
      }
      }

     );
    return numberOfBombs
  }
  hasnonBombEmptySpaces() {
    return this._numberOfEmptySpaces !== this._numberOfBombs
  }
  print() {
    console.log(this._playerBoard.map(row=>row.join(' | ')).join('\n'));
  }
  static generatePlayerBoard(numberOfRows,numberOfColumns){
    let board=[]
    for (let i=0;i<numberOfRows;i++){
      let row=[]
      for (let j=0;j<numberOfColumns;j++){
        row.push(' ')
      }
      board.push(row)
    }
  return board
  }
  static generateBombBoard(numberOfRows,numberOfColumns,numberOfBombs){
    let board=[];
    for (let i=0;i<numberOfRows;i++){
      const row=[];
      for (let j=0;j<numberOfColumns;j++){
        row.push(null);
      }
      board.push(row);
        }

  let numberOfBombsPlaced=0;
  while (numberOfBombsPlaced < numberOfBombs){
    const randomRowIndex = Math.floor(Math.random() * numberOfRows);
    const randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
    if (board[randomRowIndex][randomColumnIndex]!=='B'){
        board[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
    }


  }
  return board;
  }
}
