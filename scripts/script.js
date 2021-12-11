//------------------------------------------------------------Constantes:
//Forma das peças
const PIECES = 
    [
        //Peças L:
        [
            [1,0,0],
            [1,0,0],
            [1,1,0],
        ],
        [
            [0,0,1],
            [0,0,1],
            [0,1,1],
        ],
        //Peça S:
        [
            [0,0,0],
            [0,1,1],
            [1,1,0],
        ],
        //Peça Z:
        [
            [0,0,0],
            [1,1,0],
            [0,1,1],
        ],
        //Peça T:
        [
            [0,1,0],
            [0,1,1],
            [0,1,0],
        ],
        [
            //Peça O:
            [1,1],
            [1,1],
        ],
        //Peça I:
        [
            [1,0,0,0],  
            [1,0,0,0],
            [1,0,0,0],
            [1,0,0,0],
        ],
    ];

const WALL = 2;
//const HIDER = 4;//nao alterar
const SIDE = 20;
const TIME = 1000;
const ROWS = 20+WALL;
const COLLUMS = 10 + WALL;
const COLORS = ["./images/blue.png","./images/yellow.png","./images/orange.png","./images/purple.png","./images/green.png","./images/red.png","./images/grey.png","./images/effectBlue.png","#000000"];

//------------------------------------------------------------Classes->Piece:
class Piece{
    constructor(ctx){
        this.ctx = ctx;
        this.posX = COLLUMS/2 - 1;
        this.posY = this.initialPosY();
        this.randomShape = Math.round(Math.random()*6);
        this.shape = PIECES[this.randomShape];
        this.randomColor = Math.round(Math.random()*5);
        this.color = COLORS[this.randomColor];
    };
    rotate(collision){
        let newShape = [...this.shape];

        if(!collision(newShape)){

        }else{
            return;
        }
    };
    initialPosY(){
        if(this.shape === PIECES[6]){
            return -3;
        }else if(this.shape === PIECES[5]){
            return -1;
        }else{
            return -2;
        };
    };
    drawPiece(){
        for(let r = 0;r<this.shape.length;r++){
            for(let c = 0;c<this.shape.length;c++){
                if(this.posY+r !== 0){
                    this.ctx.drawImage('.images/yellow.png',50,50);
                    this.ctx.fillRect(this.posX,this.posY,SIDE,SIDE);
                };
            };
        };
    };
    moveDown(collision){
        if(!collision){
            this.posY += SIDE;
        }else{
            return;
        };
    };
};
//------------------------------------------------------------Classes->Game:
class Game{
    constructor(ctx){
        this.ctx = ctx;
        this.grid = this.makeStartGrid();
        this.fPiece = null;
        this.fPieceTwo = null; 
    };
    drawGrid(){
        for(let i=1;i<=ROWS;){
            for(let j = 1;j<=COLLUMS;j++){
                if(this.grid[i][j] === '#000000'){
                    this.ctx.fillRect(j*SIDE,i*SIDE,20,20);
                }else{
                    this.ctx.drawImage(j*SIDE,i*SIDE)
                }
            };
        };
    };
    makeStartGrid(){
        let arr = [];
        for(i = 0;i<=ROWS;i++){
            arr.push([]);
            for(j = 0 ; j<=COLLUMS;j++){  
                if(j===0 || i===0 || i === ROWS - 1 || j === COLLUMS -1 ){}                          
                arr[i][j].push('ENDEREÇO DA IMAGEM DE PAREDE');
                
            };
        };
    };
    addGrid(){
        
    };
    collision(grid){
        if(true){
            this.addGrid();
            if(this.testGameOver()){
                return true;
            };
        };
    };
    testGameOver(){
        return this.fPiece.posY === 0?true:false;
    };
};
//------------------------------------------------------------Script-HTML:
 const canvasGame = document.getElementById('tetris');
 //const canvasNextPiece = document.getElementById('next-piece');
 const contextGame = canvasGame.getContext('2d');
 //const contextNextPiece = canvasNextPiece.getContext('2d');

let a = new Piece(contextGame);
a.posX = 200;
a.posY = 600;
a.drawPiece();
