
let num, turn, player1, player2, btnstart, btn00, btn01, btn02, btn10, btn11, btn12, btn20, btn21, btn22;

class Board{
    constructor(){
        this.board = this.createBoard()
    }


    createBoard(){
        let board = []
        for(let i = 0; i < 3; i++){
            board[i] = [];
            for(let j = 0; j < 3; j++){
                board[i][j] = `0`;
            }
        }   
        return board;
    }

    displayBoard(){
        let output = ``
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                output += this.board[i][j];
            }
            output += `\n`
        }   
        console.log(output)
    }

    changeSpot(i,j,str){
        if(this.board[i][j] == `0`){
            this.board[i][j] = str;
            this.displayBoard();
            return true
        }else{
            console.log("Position Filled, Retry")
            return false
        }
    }

    checkWin(){
    // Check rows for X or O
    if( (this.board[0][0] === 'X' && this.board[0][1] === 'X' && this.board[0][2] === 'X') ||
        (this.board[1][0] === 'X' && this.board[1][1] === 'X' && this.board[1][2] === 'X') ||
        (this.board[2][0] === 'X' && this.board[2][1] === 'X' && this.board[2][2] === 'X') ){
        console.log("X wins!");
        messageBoard.textContent = `X wins !`;
        return true;
    }
    if( (this.board[0][0] === 'O' && this.board[0][1] === 'O' && this.board[0][2] === 'O') ||
        (this.board[1][0] === 'O' && this.board[1][1] === 'O' && this.board[1][2] === 'O') ||
        (this.board[2][0] === 'O' && this.board[2][1] === 'O' && this.board[2][2] === 'O') ){
        console.log("O wins!");
        messageBoard.textContent = `O wins !`;
        return true;
    }
    
    // Check columns for X or O
    if( (this.board[0][0] === 'X' && this.board[1][0] === 'X' && this.board[2][0] === 'X') ||
        (this.board[0][1] === 'X' && this.board[1][1] === 'X' && this.board[2][1] === 'X') ||
        (this.board[0][2] === 'X' && this.board[1][2] === 'X' && this.board[2][2] === 'X') ){
        console.log("X wins!");
        messageBoard.textContent = `X wins !`;
        return true;
    }
    if( (this.board[0][0] === 'O' && this.board[1][0] === 'O' && this.board[2][0] === 'O') ||
        (this.board[0][1] === 'O' && this.board[1][1] === 'O' && this.board[2][1] === 'O') ||
        (this.board[0][2] === 'O' && this.board[1][2] === 'O' && this.board[2][2] === 'O') ){
        console.log("O wins!");
        messageBoard.textContent = `O wins !`;
        return true;
    }
    
    // Check diagonals for X or O
    if( (this.board[0][0] === 'X' && this.board[1][1] === 'X' && this.board[2][2] === 'X') ||
        (this.board[0][2] === 'X' && this.board[1][1] === 'X' && this.board[2][0] === 'X') ){
        console.log("X wins!");
        messageBoard.textContent = `X wins !`;
        return true;
    }
    if( (this.board[0][0] === 'O' && this.board[1][1] === 'O' && this.board[2][2] === 'O') ||
        (this.board[0][2] === 'O' && this.board[1][1] === 'O' && this.board[2][0] === 'O') ){
        console.log("O wins!");
        messageBoard.textContent = `O wins !`;
        return true;
    }
    
    // No winner yet
    return false;
}
}

function reset(){
    if(p1 == `X`){
        player1.textContent = '';
        player1.classList.remove(`X`)

        player2.textContent = '';
        player2.classList.remove(`O`)
    }else{
        player1.textContent = '';
        player1.classList.remove(`O`)

        player2.textContent = '';
        player2.classList.remove(`X`)
    }
    btn00.textContent = ``;
    btn01.textContent = ``;
    btn02.textContent = ``;
    btn10.textContent = ``;
    btn11.textContent = ``;
    btn12.textContent = ``;
    btn20.textContent = ``;
    btn21.textContent = ``;
    btn22.textContent = ``;
    num = null;
}


async function game(){
    let board = new Board();
    num = Math.random();
    let check;
    let moves = 0;

    if(num > 0.5){
        p1 = 'X';
        p2 = 'O';

        player1.textContent = 'X';
        player1.classList.add(`X`)
        messageBoard.textContent = `Player 1 Goes First`;

        player2.textContent = 'O';
        player2.classList.add(`O`)
        turn = true;
    } else {
        p1 = 'O';
        p2 = 'X';
        player1.textContent = 'O';
        player1.classList.add(`O`)

        player2.textContent = `X`;
        player2.classList.add(`X`)
        messageBoard.textContent = `Player 2 Goes First`;
        turn = false;
    }

    while(!board.checkWin() && moves < 9){
        let position = await input(); 
        if(turn == true){
            check = board.changeSpot(position[0], position[1], p1);
        } else {
            check = board.changeSpot(position[0], position[1], p2);
        }
        if (check == true){
            turn = !turn;
            moves++;
            if(moves == 9){
                console.log("Draw!")
                messageBoard.textContent = `Draw!`;
            }
        }
    }
    reset();
}


async function input() {
    return new Promise(resolve => {
        const boardElement = document.querySelector(".board");
        boardElement.addEventListener("click", function handler(event) {
            if (event.target.tagName.toLowerCase() === "button") {
                const id = event.target.id;  
                const button = event.target;
                if(turn == true){
                     button.textContent = p1
                     messageBoard.textContent = `Player 2's Turn`
                }else{
                     button.textContent = p2
                     messageBoard.textContent = `Player 1's Turn`
                }
                const row = parseInt(id.charAt(3));  
                const col = parseInt(id.charAt(4));  

                resolve([row, col]);
            }
        }, { once: true });
    });
}



btnstart = document.querySelector("#start")
btn00 = document.querySelector("#btn00")
btn01 = document.querySelector("#btn01")
btn02 = document.querySelector("#btn02")
btn10 = document.querySelector("#btn10")
btn11 = document.querySelector("#btn11")
btn12 = document.querySelector("#btn12")
btn20 = document.querySelector("#btn20")
btn21 = document.querySelector("#btn21")
btn22 = document.querySelector("#btn22")
player1 = document.querySelector(".player1")
player2 = document.querySelector(".player2")
messageBoard = document.querySelector(".messageBoard")

btnstart.addEventListener("click", game);

