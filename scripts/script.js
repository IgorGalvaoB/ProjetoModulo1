//------------------------------------------------------------Constantes:
//Forma das peças
const PIECES = 
    [
        //Peças L:
        [
            [0,1,0],
            [0,1,0],
            [1,1,0],
        ],
        [
            [1,0,0],
            [1,0,0],
            [1,1,0],
        ],
        //Peça S:
        [
            [1,0,0],
            [1,1,0],
            [0,1,0],
        ],
        //Peça Z:
        [
            [0,1,0],
            [1,1,0],
            [1,0,0],
        ],
        //Peça T:
        [
            [0,1,0],
            [1,1,0],
            [0,1,0],
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
 GRID = [
    ['./images/grey.png','./images/grey.png','./images/grey.png','./images/grey.png','./images/grey.png','./images/grey.png','./images/grey.png','./images/grey.png','./images/grey.png','./images/grey.png','./images/grey.png','./images/grey.png','./images/grey.png'],
    ['./images/grey.png',0,0,0,0,0,0,0,0,0,0,'./images/grey.png'],
    ['./images/grey.png',0,0,0,0,0,0,0,0,0,0,'./images/grey.png'],
    ['./images/grey.png',0,0,0,0,0,0,0,0,0,0,'./images/grey.png'],
    ['./images/grey.png',0,0,0,0,0,0,0,0,0,0,'./images/grey.png'],
    ['./images/grey.png',0,0,0,0,0,0,0,0,0,0,'./images/grey.png'],
    ['./images/grey.png',0,0,0,0,0,0,0,0,0,0,'./images/grey.png'],
    ['./images/grey.png',0,0,0,0,0,0,0,0,0,0,'./images/grey.png'],
    ['./images/grey.png',0,0,0,0,0,0,0,0,0,0,'./images/grey.png'],
    ['./images/grey.png',0,0,0,0,0,0,0,0,0,0,'./images/grey.png'],
    ['./images/grey.png',0,0,0,0,0,0,0,0,0,0,'./images/grey.png'],
    ['./images/grey.png',0,0,0,0,0,0,0,0,0,0,'./images/grey.png'],
    ['./images/grey.png',0,0,0,0,0,0,0,0,0,0,'./images/grey.png'],
    ['./images/grey.png',0,0,0,0,0,0,0,0,0,0,'./images/grey.png'],
    ['./images/grey.png',0,0,0,0,0,0,0,0,0,0,'./images/grey.png'],
    ['./images/grey.png',0,0,0,0,0,0,0,0,0,0,'./images/grey.png'],
    ['./images/grey.png',0,0,0,0,0,0,0,0,0,0,'./images/grey.png'],
    ['./images/grey.png',0,0,0,0,0,0,0,0,0,0,'./images/grey.png'],
    ['./images/grey.png',0,0,0,0,0,0,0,0,0,0,'./images/grey.png'],
    ['./images/grey.png',0,0,0,0,0,0,0,0,0,0,'./images/grey.png'],
    ['./images/grey.png',0,0,0,0,0,0,0,0,0,0,'./images/grey.png'],
    ['./images/grey.png','./images/grey.png','./images/grey.png','./images/grey.png','./images/grey.png','./images/grey.png','./images/grey.png','./images/grey.png','./images/grey.png','./images/grey.png','./images/grey.png','./images/grey.png','./images/grey.png'],
];



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
        this.shape = PIECES[Math.round(Math.random()*6)];
        this.color = COLORS[Math.round(Math.random()*5)];
        this.posX = this.initialPosX();
        this.posY = this.initialPosY();
    };
    initialPosY(){
        if(this.shape.length === 3){
            return -2;
        }else if(this.shape.length === 2){
            return -1;
        }else{
            return -3;
        }
    };
    initialPosX(){
        if(this.shape.length === 3 || this.shape.length === 2){
            return 5;
        }else{
            return 4;
        }
    }
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
        if(!collision(shape,this.posX,this.posY+1)){
            this.posY += 1;
        }else{

        }
    };
    

};
//------------------------------------------------------------Classes->Game:
class Game{
    constructor(ctx){
        this.ctx = ctx;
        this.fPiece = null;
        this.fPieceTwo = null;
        this.grid = [...GRID.map((row) => [...row])] 
    };
    drawGrid(){
        for(let i = 1;i< COLLUMS-1;i++){
            for(let j = 1;j<ROWS-1;j++){
                if(typeof this.grid[i][j] !== 'string'){  
                    this.ctx.fillRect(i*SIDE,j*SIDE,SIDE,SIDE);
                }else{
                    let img = new Image();
                    img.src = this.grid[i][j];
                    this.ctx.drawImage(img,j*SIDE,i*SIDE,SIDE,SIDE);
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
    collision(candidate,x, y) {
        const shape = candidate;
        const n = shape.length 
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (shape[i][j] > 0) {
                    let p = x + j 
                    let q = y + i  
                    //console.log(this.grid[q][p]);
                    if (q >= 1 && p < COLLUMS && q < ROWS) {
                        console.log(this.grid[q][p]);
                        // in bounds
                    
                        if (this.grid[q][p] > 0) {
                            return true
                        }
                    } else {
                        return true
                    }
                }
            }
        }
        return false
    };
    
       // return true;
       //testa primeiro se o shape bate na parede, se sim retorna true;
       //testa se o shape bate no grid, se sim retorna true;
       //retorna false;
   
    testGameOver(){
        return this.fPiece.posY === -2?true:false;
    };
};
//------------------------------------------------------------Script-HTML:
const canvasGame = document.getElementById('tetris');
const canvasNextPiece = document.getElementById('next-piece');
const contextGame = canvasGame.getContext('2d');
const contextNextPiece = canvasNextPiece.getContext('2d');

let x = 0;
let novo = new Game(contextGame);
let pa = new Piece(contextGame);
novo.fPiece = pa;
let img = new Image();







/*
function redoit(){
    pa.drawPiece(novo.drawGrid());
    if(!novo.collision(pa.shape,pa.posX,pa.posY+1)){
        if(x===50){
            pa.posY+=1;
            x=0;
            console.log('a');
        }
    
        x+=1;
        //console.log(!novo.collision(pa.shape,pa.posX,pa.posY+1));
        //if(!novo.collision(pa.shape,pa.posX,pa.posY+1)){
    };
};

window.addEventListener('load',()=>{
    for(let i=0;i<ROWS;i++){
        for(let j=0;j<COLLUMS;j++){
            if(j===0 || j === COLLUMS -1 || i===0|| i===ROWS-1){
                contextGame.drawImage(img,j*SIDE,i*SIDE,40,40);
            }else{
                contextGame.fillRect(j*SIDE,i*SIDE,40,40);
            };
        };
    };
    
});
img.src = COLORS[7];
function b (){
    
    setInterval(()=>{
        
        redoit();
    },50);
};
function a(){
    let b = GRID();
    console.log(b[3]);
}*/