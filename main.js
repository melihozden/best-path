

// Finding Best Top Left corner to Right Bottom corner...
// Coding train inspired me to this. 
var rows = 5;
var cols = 5;
var grid = new Array(cols);

var openSet = []
var closedSet = []

var startPoint;
var endPoint

// f,g and h values , f(n) = g(n) + h(n)
function Node() {
    this.f = 0
    this.g = 0
    this.h = 0
}

function setup() {
    createCanvas(400, 400);
    console.log("A*")

    for (var i = 0; i < cols; i++) {
        grid[i] = new Array(rows)
    }

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j] = new Node();
        }
    }
    startPoint = grid[0][0] // top-left corner
    endPoint = grid[cols - 1][rows - 1] // bottom-right corner

    openSet.push(startPoint);


    console.log(grid)

}
function draw() {
    background(0);
}