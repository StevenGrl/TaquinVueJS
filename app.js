document.addEventListener('DOMContentLoaded', () => {
    const grid = new Vue({
        el: '#game',
        data: () => ({
            title: 'Taquin V1.1',
            game: [],
            size: 4,
            win: "Vous avez gagné !"
        }),
        created: function () {
            this.createGame();
        },
        methods: {
            createGame() {
                this.game = new GameGrid(this.size)
            },
            moveLeft(row, col) {
              for(let i = this.game.empty[0].j; i < col; i++) {
                this.game.grid[row][i] = this.game.grid[row][i + 1]
                this.game.cpt++;
              }
              this.game.grid[row][col] = null
              this.game.empty[0].i = row
              this.game.empty[0].j = col
            },
            moveRight(row, col) {
              for(let i = this.game.empty[0].j; i > col; i--) {
                this.game.grid[row][i] = this.game.grid[row][i - 1]
                this.game.cpt++;
              }
              this.game.grid[row][col] = null
              this.game.empty[0].i = row
              this.game.empty[0].j = col
            },
            moveUp(row, col) {
              for(let i = this.game.empty[0].i; i < row; i++) {
                this.game.grid[i][col] = this.game.grid[i + 1][col]
                this.game.cpt++;
              }
              this.game.grid[row][col] = null
              this.game.empty[0].i = row
              this.game.empty[0].j = col
            },
            moveDown(row, col) {
              for(let i = this.game.empty[0].i; i > row; i--) {
                this.game.grid[i][col] = this.game.grid[i - 1][col]
                this.game.cpt++;
              }
              this.game.grid[row][col] = null
              this.game.empty[0].i = row
              this.game.empty[0].j = col
            },
            move(row, col) {
              // Si la case cliqué n'est pas vide
              if (this.game.grid[row][col]) {
                // Si la case cliquée est sur la ligne ou la colonne de la case vide
                if (row == this.game.empty[0].i || col == this.game.empty[0].j) {
                  // Si la case est sur la ligne
                  if (row == this.game.empty[0].i) {
                    if (col > this.game.empty[0].j) {
                      this.moveLeft(row, col)
                    } else {
                      this.moveRight(row, col)
                    }
                  } else {
                    if (row < this.game.empty[0].i) {
                      this.moveDown(row, col)
                    } else {
                      this.moveUp(row, col)
                    }
                  }
                }
              }
              for(let i = 0; i < this.game.size; i++) {
                for(let j = 0; j < this.game.size; j++) {
                  if (this.game.grid[i][j] != this.game.winGrid[i][j]) {
                    this.game.win = false;
                    break;
                  } else if (i == this.game.size - 1 && j == this.game.size - 1) {
                    this.game.win = true;
                  }
                }
              }
              this.$forceUpdate();
            },
            shuffle() {
              this.game.cpt = 0;
              for(let i = this.game.grid.length - 1; i >= 0; i--) {
                for(let j = this.game.grid.length - 1; j >= 0; j--) {
                  let rand = Math.floor(Math.random() * Math.floor(i))
                  let currentPawn = this.game.grid[i][j]
                  this.game.grid[i][j] = this.game.grid[rand][j]
                  this.game.grid[rand][j] = currentPawn
                  if (this.game.grid[i][j] == null) {
                    this.game.empty[0].i = i
                    this.game.empty[0].j = j
                  } else if (this.game.grid[rand][j] == null) {
                    this.game.empty[0].i = rand
                    this.game.empty[0].j = j
                  }
                }
              }
              this.$forceUpdate();
            }
        }
    })
})

class GameGrid {
    constructor(size) {
        this.win = false;
        this.cpt = 0;
        this.empty = [];
        this.grid = [];
        this.winGrid = [];
        this.size = size;
        let row = [];
        let winRow = [];
        let cpt = 1;
        for (let i = 0; i < size; i++) {
          row = [];
          winRow = [];
          for (let j = 0; j < size; j++) {
            if (i == size - 1 && j == size - 1) {
                this.empty.push({i,j})
                row.push(null);
                winRow.push(null);
            } else {
                row.push(cpt);
                winRow.push(cpt);
                cpt++;
            }
          }
          this.grid.push(row);
          this.winGrid.push(winRow);
        }
    }
}
