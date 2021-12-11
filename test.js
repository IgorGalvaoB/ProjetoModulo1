/*function makeStartGrid(){
    let arr = [];
    for(i = 0;i<ROWS;i++){
        arr.push([]);
        for(j = 0 ; j<COLLUMS;j++){  
            if(j===0 || i===0 || i === ROWS - 1 || j === COLLUMS -1 ){
                arr[i][j] = "2";
            }else{                           
                arr[i][j] = '1';
            };
        };
    };
    return arr;
};
//Forma das peças
const WALL = 2;
const ROWS = 5 + WALL;
const COLLUMS = 5 + WALL;
const b = makeStartGrid();
console.log(b[0]);
console.log(b[1]);
console.log(b[2]);
console.log(b[3]);
console.log(b[4]);
console.log(b[5]);

console.log(b[6]);*/

const piece =
[
    [
        [0,0,1],
        [0,0,1],
        [0,1,1],
    ],
    [
        [0,0,0],
        [0,1,1],
        [1,1,0],
    ],
];

let shape = piece[0];
function collision(test){
    return test === 1?true:false;
};
function rotate(collision,ppc){
    if(ppc !== undefined){
        let pc = [...ppc];
        let a = Math.round(Math.random()*2);
        const lenght = pc.length;
        for (i = 0; i < lenght / 2; i++) {
            for (j = i; j < lenght - i - 1; j++) {
                keeper = pc[i][j];
                pc[i][j] = pc[lenght - 1 - j][i];
                pc[lenght - 1 - j][i] = pc[lenght - 1 - i][lenght - 1 - j];
                pc[lenght - 1 - i][lenght - 1 - j] = pc[j][lenght - 1 - i];
                pc[j][lenght - 1 - i] = keeper;
            };
        };
        if(collision(a)){
            console.log('aaa');
            console.log(pc[0]);
            console.log(pc[1]);
            console.log(pc[2]);
        }else{
            console.log(ppc[0]);
            console.log(ppc[1]);
            console.log(ppc[2]);
        };
    }else{
        console.log('nao deu tempo');
    }
};
rotate(collision,shape);

