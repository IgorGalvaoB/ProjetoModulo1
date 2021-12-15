let shape2=
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
*/