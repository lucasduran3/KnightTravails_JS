export default class Graph {
  chessBoard;

  constructor() {
    this.chessBoard = new Map();
    this.createVertices();
    this.createEdges();
  }

  createVertices() {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        this.chessBoard.set(`${[i, j]}`, []);
      }
    }
  }

  createEdges() {
    for (let [pos] of this.chessBoard) {
      const posArr = pos.split(",");
      const x = parseInt(posArr[0]);
      const y = parseInt(posArr[1]);
      const direction = {
        1: [x + 1, y + 2],
        2: [x + 2, y + 1],
        4: [x + 2, y - 1],
        5: [x + 1, y - 2],
        7: [x - 1, y - 2],
        8: [x - 2, y - 1],
        10: [x - 2, y + 1],
        11: [x - 1, y + 2],
      };

      for(let clock in direction){
        const move = direction[clock].toString();
        if(this.chessBoard.has(move) && !this.chessBoard.get(pos).includes(move)){
          this.chessBoard.get(pos).push(move);
        }
      }
    }
  }
  
  knightMoves(start, end){
    const paths = [];
    const visited = new Set();
    const queue = [];
    queue.push([start, [start]]);
    while(queue.length > 0){
      let [current, path] = queue.shift();
      visited.add(current);
      if(current === end){
        paths.push(path);
      }
      const neighbors = this.chessBoard.get(current);
      for(let pos of neighbors){
        if(!visited.has(pos)){
          queue.push([pos, [...path, pos]]);
        }
      }
    }
    console.log(`Route to ${start} to ${end}: `);
    paths.forEach(e => console.log(e));
  }
}
