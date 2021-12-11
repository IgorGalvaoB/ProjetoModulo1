//------------------------------------------------------------Constantes:
//Forma das peças
const PIECES = 
    [
        //Peças L:
        [
            [1,0,0],
            [1,1,1],
            [0,0,0],
        ],
        [
            [0,0,1],
            [1,1,1],
            [0,0,0],
        ],
        //Peça S:
        [
            [0,1,1],
            [1,1,0],
            [0,0,0],
        ],
        //Peça Z:
        [
            [1,1,0],
            [0,1,1],
            [0,0,0],
        ],
        //Peça T:
        [
            [0,1,0],
            [1,1,1],
            [0,0,0],
        ],
        [
            //Peça O:
            [1,1],
            [1,1],
        ],
        //Peça I:
        [
            [0,0,0,0],  
            [1,1,1,1],
            [0,0,0,0],
            [0,0,0,0],
        ],
    ];
const COLORS = ["./images/blue.png","./images/yellow.png","./images/orange.png","./images/purple.png","./images/green.png","./images/red.png","./images/effectBlue.png","./images/grey.png", 0];
let GRID = ()=>{
    let arr = [];
    for(let i = 0;i<20;i++){
        arr.push([]);
        for(let j = 0;j<10;j++){
            arr[i].push(0);
        }
    }
    return arr;
}

const WALL = 2;
//const HIDER = 4;//nao alterar
const SIDE = 40;
const TIME = 1000;
const ROWS = 20+WALL;
const COLLUMS = 10 + WALL;  

//------------------------------------------------------------Classes->Piece:
class Piece{
    constructor(ctx){
        this.ctx = ctx;
        this.posX = 5;
        this.posY= -2;
        this.shape = PIECES[Math.round(Math.random()*6)];
        this.color = COLORS[Math.round(Math.random()*5)];
    };
    rotate(collision){
        let newShape = this.shape; //ajeitar isso pq se nao altera tudo;
        //questiona o X se e negativo ou com o length > 20,se sim:
        newShapePosX = this.posX;

        //rotaciona um NewShape que e igual a shape, porem com o x e y ajeitados;
        if(!collision(newShape)){
            this.shape = newShape;
            this.posX = newShapePosX;

        };
    };
    drawPiece(){
        let img = new Image();
        img.src = this.color;
        for(let y = 0;y<this.shape.length;y++){
            for(let x = 0;x<this.shape.length;x++){
                if(this.shape[y][x]===1){
                    let positionX = this.posX + x;
                    let positionY = this.posY + y;
                    if(positionY !== 0){
                        this.ctx.drawImage(img,positionX*SIDE,positionY*SIDE,SIDE,SIDE);
                    };
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
        this.fPiece = null;
        this.fPieceTwo = null;
        this.grid = GRID(); 
    };
    drawGrid(){
        for(let i = 1;i< COLLUMS-1;i++){
            for(let j = 1;j<ROWS-1;j++){
                if(typeof this.grid[i][j] !== 'string'){  
                    this.ctx.fillRect(i*SIDE,j*SIDE,SIDE,SIDE);
                }else{
                    let img = new Image();
                    img.src = this.grid[i][j];
                    this.ctx.drawImage(img,i*SIDE,j*SIDE,SIDE,SIDE);
                };
            };
        };
    };
    drawAll(){
        if(this.fPiece){
            this.drawGrid();
            this.fPiece.drawPiece();
        }
    }
    addGrid(){
        
    };
    collision(shape,posX,posY){
        for(let x = 0;x<this.shape.length;x++){
            for(let y = 0;y<this.shape.length;y++){
            }
        }
       //testa primeiro se o shape bate na parede, se sim retorna true;
       //testa se o shape bate no grid, se sim retorna true;
       //retorna false;
    };
    testGameOver(){
        return this.fPiece.posY === 0?true:false;
    };
};
//------------------------------------------------------------Script-HTML:
const canvasGame = document.getElementById('tetris');
const canvasNextPiece = document.getElementById('next-piece');
const contextGame = canvasGame.getContext('2d');
const contextNextPiece = canvasNextPiece.getContext('2d');


let novo = new Game(contextGame);
let pa = new Piece(contextGame);
novo.fPiece = pa;
function draw2(){
    novo.drawGrid();
    console.log('AAAAAAAAAAA'); 
};
if(novo.fpiece === null){
    
}

