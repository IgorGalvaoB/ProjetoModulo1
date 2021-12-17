/*let shape2=
[
    [1,0,0],
    [1,0,0],
    [1,1,0],
];
let shape = [...shape2.map(row=> [...row])];

console.log(shape);
/*
for (let i = 0; i < shape.lenght / 2; i++) {
    for (let j = i; j < shape.lenght - i - 1; j++) {
        keeper = shape[i][j];
        shape[i][j] = shape[lenght - 1 - j][i];
        shape[lenght - 1 - j][i] = shape[lenght - 1 - i][lenght - 1 - j];
        shape[lenght - 1 - i][lenght - 1 - j] = shape[j][lenght - 1 - i];
        shape[j][lenght - 1 - i] = keeper;
    };
};
if(!false){
    console.log(shape);
    shape2 = [...shape.map(row => [...row])];
};

const setGameRender = ()=>{
    game = new Game(contextGame);
    firstPiece = new Piece(contextGame);
    secondPiece = new Piece(contextNextPiece);
    game.fPiece = firstPiece;
    drawNextPiece(secondPiece);
    let img = new Image();
    img.src = COLORS[7];
    let interval = setInterval(()=>{
        if(firstPiece === null){
            drawNextPiece(secondPiece);
            firstPiece = secondPiece;
            secondPiece = new Piece(contextGame);
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
};
const request =()=>{
    game.drawGrid();
    firstPiece.drawPiece();
    window.requestAnimationFrame(request);

};

*/

let c = '00000000000';
let b = 1000;
 c = ('00000000000' + b).slice(-11);
console.log(c);