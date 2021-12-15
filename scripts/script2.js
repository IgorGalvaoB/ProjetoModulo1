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
const GRID = [
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
const SIDE = 40;
const ROWS = 20 + WALL;
const COLLUMS = 10 + WALL;  

//------------------------------------------------------------Classes->Piece:
class Piece{
    constructor(ctx){
        this.ctx = ctx;
        this.shape = PIECES[Math.floor(Math.random()/100*700)];
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
        };
    };
    initialPosX(){
        if(this.shape.length === 3 || this.shape.length === 2){
            return 5;
        }else{
            return 4;
        };
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
    moveDown(grid){
        if(this.collision(this.shape,this.posX,this.posY+1,grid)){
            return false;
        }else{
            this.posY += 1;
            return true;
        };
    };
    collision(shape,x,y,grid) {
        const length = shape.length;
        for(let i = 0;i < length;i++){
            for(let j = 0;j < length;j++){
                if(shape[i][j] === 1){
                    let yPos = y + i;
                    let xPos = x + j;
                    if(yPos > 0 && yPos < ROWS && xPos < COLLUMS){
                        if(typeof grid[yPos][xPos]=== 'string'){
                            return true;
                        };                
                    };
                };
            };
        };
        return false;
    };
    moveLeft(grid){
        if(this.collision(this.shape,this.posX-1,this.posY,grid)){
            return;
        }else{
            this.posX -= 1;
            return;
        };
    };
    moveRight(grid){
        if(this.collision(this.shape,this.posX+1,this.posY,grid)){
            return;
        }else{
            this.posX += 1;
            return;
        };
    };
    rotate(grid){
        let x = this.posX;
        let y = this.posY;
        let shape = [...this.shape.map(row=> [...row])];
        let l = this.shape.length;
        if(x < 1){
            x = 1; 
        };
        if(x + shape.length > COLLUMS - WALL){
            x = COLLUMS - shape.length - 1;
        };
        
        for (let i = 0; i < l / 2; i++) {
            for (let j = i; j < l - i - 1; j++) {
                let holder = shape[i][j];
                shape[i][j] = shape[l - 1 - j][i];
                shape[l - 1 - j][i] = shape[l - 1 - i][l - 1 - j];
                shape[l - 1 - i][l - 1 - j] = shape[j][l - 1 - i];
                shape[j][l - 1 - i] = holder;
            };
        };
    
        if(!this.collision(shape,x,y,grid)){
            this.posX = x;
            this.shape = shape;
        };
    };
};

//------------------------------------------------------------Classes->Game:
class Game{
    constructor(ctx){
        this.ctx = ctx;
        this.fPiece = null;
        this.fPieceTwo = null;
        this.grid = [...GRID.map(row => [...row])];
        this.score = 0;
    };
    drawGrid(){
        for(let i = 1;i< COLLUMS-1;i++){
            for(let j = 1;j<ROWS-1;j++){
                if(typeof this.grid[j][i] !== 'string'){  
                    this.ctx.fillRect(i*SIDE,j*SIDE,SIDE,SIDE);
                }else{
                    let img = new Image();
                    img.src = this.grid[j][i];
                    this.ctx.drawImage(img,i*SIDE,j*SIDE,SIDE,SIDE);
                };
            };
        };
    };
    render(){
        if(this.fPiece){
            this.fPiece.drawPiece(this.drawGrid());
        };
    };
    addGrid(){
        for(let i = 0;i<this.fPiece.shape.length;i++){
            for(let j = 0;j<this.fPiece.shape.length;j++){
                if(this.fPiece.shape[i][j] === 1){
                    let yPos = this.fPiece.posY + i;
                    let xPos = this.fPiece.posX + j;
                    this.grid[yPos][xPos] = this.fPiece.color;
                };
            };
        };
    };
    
    testGameOver(){
        for(let i = 0;i<this.fPiece.shape.length;i++){
            for(let j = 0;j<this.fPiece.shape.length;j++){
                if(this.fPiece.shape[i][j] === 1){
                    let yPos = this.fPiece.posY + i;
                    if(yPos<=1){
                        return true;
                    };
                };
            };
        };
        return false;
    };
    addScore(){
        const counter = [];
        const rowFilled = row => {
            for (let value of row) {
                if (value === 0) {
                    return false
                };
            };
            return true
        };
        for (let i = 1; i < this.grid.length -1; i++) {
            
            if (rowFilled(this.grid[i])){
                //counter.push(i);
                this.grid.splice(i, 1);
                this.grid.splice(1,0,['./images/grey.png',0,0,0,0,0,0,0,0,0,0,'./images/grey.png']);
            };
        };/*
        for(let i = 0;i<counter.length;i++){
            let x = 0;
            let b = ()=>{
                this.ctx.clearRect(SIDE,counter[i]*SIDE,(COLLUMS - WALL)*SIDE,SIDE);
                this.fPiece.drawPiece(this.drawGrid());
                
            };
            let c = setInterval(()=>{
                b();
                x++;
                console.log('aki');
                if(x === 2){
                    clearInterval(c);
                };
            },100);
        };
        for(let i = 0;i<counter.length;i++){
            console.log('tem q vir abaixo');
            this.grid.splice(counter[i], 1);
            this.grid.splice(1,0,['./images/grey.png',0,0,0,0,0,0,0,0,0,0,'./images/grey.png']);
        };*/
    };
               
};

//------------------------------------------------------------Script-HTML:
const canvasGame = document.getElementById('tetris');
const canvasNextPiece = document.getElementById('next-piece');
const contextGame = canvasGame.getContext('2d');
const contextNextPiece = canvasNextPiece.getContext('2d');
//Adicionar 
//-------------------------------------------------------------------------
const img = new Image();
img.src = COLORS[7];
let timeCount = 0;
let game = new Game(contextGame);
let firstPiece = new Piece(contextGame);
let secondPiece = new Piece(contextNextPiece);
//----------------------------------------------------------chamada do jogo:
const setGameRender = ()=>{
    game = new Game(contextGame);
    firstPiece = new Piece(contextGame);
    secondPiece = new Piece(contextNextPiece);
    game.fPiece = firstPiece;
    
    let img = new Image();
    img.src = COLORS[7];
    let interval = setInterval(()=>{
        if(firstPiece === null){
            firstPiece = new Piece(contextGame);
            game.fPiece = firstPiece;
        };
        firstPiece.drawPiece(game.drawGrid());
        if(timeCount === 25){
            if(!firstPiece.moveDown(game.grid)){
                if(game.testGameOver()){
                    clearInterval(interval);
                    return;
                };
                game.addGrid();
                game.addScore();
                firstPiece = null;
            };
            timeCount=0;
        };
        
        timeCount++;
    },20);
};/*
const request =()=>{
    game.drawGrid();
    firstPiece.drawPiece();
    window.requestAnimationFrame(request);

};
*/
//------------------------------------------------------------butoes/pre-desenho
window.addEventListener('load',()=>{
    window.addEventListener('keypress',(button)=>{
        button.preventDefault();
        switch(button.key){
            case 'a':
                firstPiece.moveLeft(game.grid);
                firstPiece.drawPiece(game.drawGrid());
                break;
            case 'd':
                firstPiece.moveRight(game.grid);
                firstPiece.drawPiece(game.drawGrid());
                break;
            case 's':
                if(firstPiece!==null){
                    firstPiece.moveDown(game.grid);
                    firstPiece.drawPiece(game.drawGrid());
                };
                break;
            case 'w':
                if(firstPiece!==null){
                    firstPiece.rotate(game.grid);
                    //firstPiece.drawPiece(game.drawGrid());
                };
                break;

            };
    });
    for(let i=0;i<ROWS;i++){
        for(let j=0;j<COLLUMS;j++){
            if(j===0 || j === COLLUMS -1 || i===0|| i===ROWS-1){
                contextGame.drawImage(img,j*SIDE,i*SIDE,SIDE,SIDE);
            }else{
                contextGame.fillRect(j*SIDE,i*SIDE,SIDE,SIDE);
            };
        };
    };
});
