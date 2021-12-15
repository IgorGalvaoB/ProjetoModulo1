let grid = 
    [
        [1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,0,1,1,1],
        [1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1],
    ];
let soma = 0;
function addScore(){
    const rowFilled = row => {
        for (let value of row) {
            if (value === 0) {
                return false
            };
        };
        return true
    };

    for (let i = 0; i < grid.length -1; i++) {
        
        if (rowFilled(grid[i])) {
            grid.splice(i, 1);
            grid.splice(1,0,[0,0,0,0,0,0,0,0,0]);
        }
    }

   
};
addScore();
for(let x =0 ;x<grid.length; x++){
    console.log(grid[x]);
}