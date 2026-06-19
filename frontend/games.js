// SNAKE GAME
class SnakeGame {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.tileSize = 20;
    this.reset();
  }

  reset() {
    this.snake = [{x: 10, y: 10}];
    this.food = {x: 15, y: 15};
    this.direction = {x: 1, y: 0};
    this.nextDirection = {x: 1, y: 0};
    this.score = 0;
    this.gameRunning = true;
  }

  update() {
    if (!this.gameRunning) return;

    this.direction = this.nextDirection;
    const head = {...this.snake[0]};
    head.x += this.direction.x;
    head.y += this.direction.y;

    const gridSize = this.canvas.width / this.tileSize;
    if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
      this.gameRunning = false;
      alert(`Game Over! Score: ${this.score}`);
      return;
    }

    if (this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
      this.gameRunning = false;
      alert(`Game Over! Score: ${this.score}`);
      return;
    }

    this.snake.unshift(head);

    if (head.x === this.food.x && head.y === this.food.y) {
      this.score += 10;
      this.food = {
        x: Math.floor(Math.random() * (this.canvas.width / this.tileSize)),
        y: Math.floor(Math.random() * (this.canvas.height / this.tileSize))
      };
    } else {
      this.snake.pop();
    }
  }

  draw() {
    this.ctx.fillStyle = '#15151e';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = '#DAA520';
    this.snake.forEach(segment => {
      this.ctx.fillRect(segment.x * this.tileSize, segment.y * this.tileSize, this.tileSize - 2, this.tileSize - 2);
    });

    this.ctx.fillStyle = '#FF6347';
    this.ctx.fillRect(this.food.x * this.tileSize, this.food.y * this.tileSize, this.tileSize - 2, this.tileSize - 2);

    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = '16px Arial';
    this.ctx.fillText(`Score: ${this.score}`, 10, 20);
  }

  start() {
    this.reset();
    if (this._keyHandler) document.removeEventListener('keydown', this._keyHandler);
    this._keyHandler = (e) => {
      if (e.key === 'ArrowUp' && this.direction.y === 0) this.nextDirection = {x: 0, y: -1};
      if (e.key === 'ArrowDown' && this.direction.y === 0) this.nextDirection = {x: 0, y: 1};
      if (e.key === 'ArrowLeft' && this.direction.x === 0) this.nextDirection = {x: -1, y: 0};
      if (e.key === 'ArrowRight' && this.direction.x === 0) this.nextDirection = {x: 1, y: 0};
    };
    document.addEventListener('keydown', this._keyHandler);

    const gameLoop = setInterval(() => {
      this.update();
      this.draw();
      if (!this.gameRunning) {
        clearInterval(gameLoop);
        document.removeEventListener('keydown', this._keyHandler);
      }
    }, 100);
  }
}

// TETRIS GAME
class TetrisGame {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.blockSize = 30;
    this.rows = 20;
    this.cols = 10;
    this.board = Array(this.rows).fill(null).map(() => Array(this.cols).fill(0));
    this.currentPiece = this.randomPiece();
    this.score = 0;
    this.gameRunning = true;
  }

  randomPiece() {
    const pieces = [
      {shape: [[1,1,1,1]], color: '#00FFFF'},
      {shape: [[1,1],[1,1]], color: '#FFFF00'},
      {shape: [[0,1,1],[1,1,0]], color: '#FF0000'},
      {shape: [[1,1,0],[0,1,1]], color: '#00FF00'},
      {shape: [[1,0,0],[1,1,1]], color: '#0000FF'},
      {shape: [[0,0,1],[1,1,1]], color: '#FF6600'},
      {shape: [[0,1,0],[1,1,1]], color: '#FF00FF'}
    ];
    return {...pieces[Math.floor(Math.random() * pieces.length)], x: 3, y: 0};
  }

  draw() {
    this.ctx.fillStyle = '#15151e';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.strokeStyle = '#444';
    for (let i = 0; i <= this.rows; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, i * this.blockSize);
      this.ctx.lineTo(this.cols * this.blockSize, i * this.blockSize);
      this.ctx.stroke();
    }

    this.board.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell) {
          this.ctx.fillStyle = cell;
          this.ctx.fillRect(x * this.blockSize, y * this.blockSize, this.blockSize - 1, this.blockSize - 1);
        }
      });
    });

    this.ctx.fillStyle = this.currentPiece.color;
    this.currentPiece.shape.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell) {
          this.ctx.fillRect((this.currentPiece.x + x) * this.blockSize, (this.currentPiece.y + y) * this.blockSize, this.blockSize - 1, this.blockSize - 1);
        }
      });
    });

    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = '16px Arial';
    this.ctx.fillText(`Score: ${this.score}`, 10, this.canvas.height + 20);
  }

  start() {
    if (this._keyHandler) document.removeEventListener('keydown', this._keyHandler);
    this._keyHandler = (e) => {
      if (e.key === 'ArrowLeft') {
        this.currentPiece.x--;
        if (!this.isValidPosition()) this.currentPiece.x++;
      }
      if (e.key === 'ArrowRight') {
        this.currentPiece.x++;
        if (!this.isValidPosition()) this.currentPiece.x--;
      }
    };
    document.addEventListener('keydown', this._keyHandler);

    const gameLoop = setInterval(() => {
      this.currentPiece.y++;
      if (!this.isValidPosition()) {
        this.currentPiece.y--;
        this.lockPiece();
        this.clearRows();
        this.currentPiece = this.randomPiece();
        if (!this.isValidPosition()) {
          this.gameRunning = false;
          alert(`Game Over! Score: ${this.score}`);
          clearInterval(gameLoop);
          document.removeEventListener('keydown', this._keyHandler);
        }
      }
      this.draw();
    }, 500);
  }

  isValidPosition() {
    return this.currentPiece.shape.every((row, y) => {
      return row.every((cell, x) => {
        if (!cell) return true;
        const newX = this.currentPiece.x + x;
        const newY = this.currentPiece.y + y;
        return newX >= 0 && newX < this.cols && newY < this.rows && !this.board[newY]?.[newX];
      });
    });
  }

  lockPiece() {
    this.currentPiece.shape.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell) {
          this.board[this.currentPiece.y + y][this.currentPiece.x + x] = this.currentPiece.color;
        }
      });
    });
  }

  clearRows() {
    for (let i = this.board.length - 1; i >= 0; i--) {
      if (this.board[i].every(cell => cell)) {
        this.board.splice(i, 1);
        this.board.unshift(Array(this.cols).fill(0));
        this.score += 100;
      }
    }
  }
}
