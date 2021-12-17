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
            [0,1,0,0],  
            [0,1,0,0],
            [0,1,0,0],
            [0,1,0,0],
        ],
    ];
const COLORS = ["./images/blue.png","./images/yellow.png","./images/orange.png","./images/purple.png","./images/green.png","./images/red.png","#66d9ff","./images/grey.png", 0];
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
    constructor(ctx,ctx2){
        this.ctxNextPiece = ctx2;
        this.ctx = ctx;
        this.shape = PIECES[Math.round(Math.random()*6)];
        this.color = COLORS[Math.round(Math.random()*5)];
        this.posX = this.initialPosX();
        this.posY = this.initialPosY();
        this.posNP = this.initialPosNextPiece();
    };
    initialPosNextPiece(){
        if(this.shape.length === 3){
            return [80,60];
        }else if(this.shape.length === 2){
            return [80,80];
        }else{
            return [60,40];
        };
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
    drawNextPiece(){
        let imgNextPiece = new Image();
        imgNextPiece.src = this.color;
        for(let i=1;i<11;i++){
            for(let j=1;j<11;j++){
                this.ctxNextPiece.fillRect(j*SIDE/2,i*SIDE/2,SIDE/2,SIDE/2);
            };
        };
        for(let y = 0;y<this.shape.length;y++){
            for(let x = 0;x<this.shape.length;x++){
                if(this.shape[y][x]===1){                  
                    this.ctxNextPiece.drawImage(imgNextPiece,this.posNP[0]+x*SIDE,this.posNP[1] + y*SIDE,SIDE,SIDE);
                };
            };
        };
    };
};

//------------------------------------------------------------Classes->Game:
class Game{
    constructor(ctx,ctx2){
        this.ctx = ctx;
        this.ctx2 = ctx2;
        this.fPiece = new Piece(ctx,ctx2);
        this.sPiece = new Piece(ctx,ctx2);
        this.grid = [...GRID.map(row => [...row])];//faça isso como 1 funçao, limpe o grid e xablau pra dar restart nao faça "new Game()" pq ai os botoes param de responder
        this.score = '00000000000';
        this.timeCount = 0;
        this.arr = [];    
        this.speed = 8;
        this.sound = true;
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
                    if(yPos<=0){
                        tSound.pause();
                        tSound.currentTime = 0;
                        buttonPause.innerText = 'Pause';
                        buttonStart.innerText = 'Start';
                        return true;
                    };
                };
            };
        };
        return false;
    };
    addScore(){
        let counter = 0;
        const rowFilled = row => {
            for (let value of row) {
                if (value === 0) {
                    return false
                };
            };
            counter ++;
            return true;
        };
        for (let i = 1; i < this.grid.length -1; i++) {
            
            if (rowFilled(this.grid[i])){
                this.arr.push(i);
            };
        };
        if(this.arr.length>0){
            this.effectScore();
        };
        if(counter>1){
            counter = counter + counter/10
        };
        counter *= 100;
        counter += Number(this.score);//deu errado 4 fileiras;
        this.score = ('00000000000' + counter).slice(-11);
        score.innerText = game.score;
       
    };
    pauseGame(){
        clearInterval(this.interval);
    };
    startGame(){
        this.interval = setInterval(()=>{
            this.sPiece.drawNextPiece();
            this.updateGameArea();
        },375);
    };
    updateGameArea(){
        //this.sPiece.drawNextPiece();
        if(this.fPiece){
            this.fPiece.drawPiece(this.drawGrid());
            this.sPiece.drawNextPiece();
        };
        if(this.timeCount === 1){
            
            if(!this.fPiece.moveDown(game.grid)){
                if(this.testGameOver()){
                    clearInterval(this.interval);
                    this.fPiece = null;
                    this.sPiece = null;
                };
                this.addGrid();
                this.addScore();
                this.fPiece = this.sPiece;
                this.sPiece = new Piece(this.ctx,this.ctx2);
                
                
            };
           this.timeCount=0;
        };
        
        this.timeCount++;
    };
    effectScore(){
        for(let i = 0; i < this.arr.length;i++){
            this.grid.splice(this.arr[i], 1);
            this.grid.splice(1,0,['./images/grey.png',0,0,0,0,0,0,0,0,0,0,'./images/grey.png']);
        };
        for(let i = 0;i< this.arr.length;i++){
                this.ctx.fillStyle = COLORS[6];
                this.ctx.fillRect(SIDE,this.arr[i]*SIDE,(COLLUMS-WALL)*SIDE,SIDE);
                this.ctx.fillStyle = 'black';
        };
        this.arr=[];
        cSound.play();
    };

};

//------------------------------------------------------------Script-HTML:
const canvasGame = document.getElementById('tetris');
const canvasNextPiece = document.getElementById('next-piece');
const contextGame = canvasGame.getContext('2d');
const contextNextPiece = canvasNextPiece.getContext('2d');
const score = document.getElementById('score');
const buttonStart = document.getElementById('start');
const buttonPause = document.getElementById('pause');
const buttonChangeControls = document.getElementById('change-controls');
const buttonSoundMute = document.getElementById('sound-mute');


//Adicionar 
//------------------------------------------------------------Inicializaçao:
let game = new Game(contextGame,contextNextPiece);
//let firstPiece = new Piece(contextGame,contextNextPiece);
//let secondPiece = new Piece(contextGame,contextNextPiece);
//game.fPiece = firstPiece;
//game.sPiece = secondPiece;
const cSound = new Audio('./sounds/clearSound.wav');
const tSound = new Audio('./sounds/themeSound.wav');
score.innerText = game.score;
tSound.volume = 0.7;
cSound.volume = 1;
const img = new Image();
img.src = COLORS[7];


let md = 's';
let mr = 'd';
let ml = 'a';
let r = 'w';

//-------------------------------------------------------------funcoes da pagina

//----------------------------------------------------------chamada do jogo:
function start (){
    tSound.play();
    game.startGame();
};

function pause(){
    tSound.pause();
    clearInterval(game.interval);
};
function pauseSound(){
    tSound.volume = 0;
    cSound.volume = 0;
};
function startSound(){
    tSound.volume = 0.7;
    cSound.volume = 1
}
function restart(){
    pause();
    tSound.currentTime = 0;
    game.grid = [...GRID.map(row => [...row])];
    game.fPiece = new Piece(game.ctx,game.ctx2);
    game.sPiece = new Piece(game.ctx,game.ctx2);
    start();
};


//------------------------------------------------------------butoes/pre-desenho
window.addEventListener('load',()=>{
    window.addEventListener('keydown',(button)=>{
        button.preventDefault();
        switch(button.key){
            case `${md}`:
                if(game.sPiece!==null && game.fPiece !== null){
                    game.fPiece.moveDown(game.grid);
                    game.fPiece.drawPiece(game.drawGrid());
                    game.sPiece.drawNextPiece();
                
                };
                break;
            case `${ml}`:
                if(game.sPiece!==null && game.fPiece !== null){
                    game.fPiece.moveLeft(game.grid);
                    game.fPiece.drawPiece(game.drawGrid());
                };
                break;
            case `${mr}`:
                if(game.sPiece!==null && game.fPiece !== null){
                    game.fPiece.moveRight(game.grid);
                    game.fPiece.drawPiece(game.drawGrid());
                };
                break;
            case `${r}`:
                if(game.sPiece!==null && game.fPiece !== null){
                    game.fPiece.rotate(game.grid);
                    game.fPiece.drawPiece(game.drawGrid());
                };
                break;

        };
    });
    for(let i = 0;i<COLORS.length - 1;i++){
        let img = new Image();
        img.src = COLORS[i];
    };
    for(let i=0;i<12;i++){
        for(let j=0;j<12;j++){
            if(i === 0 || i === 11 ||j ===0 || j === 11){
                contextNextPiece.drawImage(img,j*SIDE/2,i*SIDE/2,SIDE/2,SIDE/2);
            }else{
                contextNextPiece.fillRect(j*SIDE/2,i*SIDE/2,SIDE/2,SIDE/2);
            };
        };
    };
    for(let i=0;i<ROWS;i++){
        for(let j=0;j<COLLUMS;j++){
            if(j===0 || j === COLLUMS -1 || i===0|| i===ROWS-1){
                contextGame.drawImage(img,j*SIDE,i*SIDE,SIDE,SIDE);
            }else{
                contextGame.fillRect(j*SIDE,i*SIDE,SIDE,SIDE);
            };
        };
    };  
    buttonStart.onclick = ()=>{
        
        if(buttonStart.innerText === 'Start'){
            restart();
            buttonStart.innerText = "Restart"
        }else{
            restart();
            if(buttonPause.innerText === 'Continue'){
                buttonPause.innerText = 'Pause';
            };
        };
    };
    buttonPause.onclick = ()=>{
        if(buttonStart.innerText === 'Start'){
            return;
        };
        if(buttonPause.innerText === 'Pause'){
            pause();
            buttonPause.innerText = "Continue"
        }else{
            start();
            buttonPause.innerText = "Pause";
        };
    }
    buttonChangeControls.onclick=()=>{
        if(buttonChangeControls.innerText === 'Change controls Arrows'){
            r = "ArrowUp";
            mr = "ArrowRight";
            ml = "ArrowLeft";
            md = "ArrowDown";
            buttonChangeControls.innerText = 'Change controls (W,A,S,D)';
        }else{
            r = 'w';
            mr = 'd';
            ml = 'a';
            md = 's';
            buttonChangeControls.innerText = 'Change controls Arrows';
        };
    };
    buttonSoundMute.onclick = ()=>{
        if(buttonSoundMute.innerText === 'Sound Off'){
            
            pauseSound();
            buttonSoundMute.innerText = 'Sound On'
        }else{
            startSound();

            buttonSoundMute.innerText = 'Sound Off'
        };
    };

});