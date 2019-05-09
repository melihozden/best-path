

// Finding Best Top Left corner to Right Bottom corner...
// Coding train inspired me to this. 
var rows = 5;
var cols = 5;
var grid = new Array(cols);

var openSet = [];
var closedSet = [];

var startPoint;
var endPoint;
var w, h;

// f,g and h values , f(n) = g(n) + h(n)
function Node(i, j) {

    this.x = i;
    this.y = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;

    this.show = function (color) {
        fill(color);
        noStroke();
        rect(this.x * w, this.y * h, w - 1, h - 1)
    }

}

function setup() {
    width = 400;
    height = 400;
    createCanvas(width, height);
    console.log("A*")
    w = width / cols;
    h = height / rows;


    for (var i = 0; i < cols; i++) {
        grid[i] = new Array(rows)
    }

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j] = new Node(i, j);
        }
    }
    startPoint = grid[0][0] // top-left corner
    endPoint = grid[cols - 1][rows - 1] // bottom-right corner

    openSet.push(startPoint);

    console.log(grid)


}
function draw() {
    if (openSet.length > 0) {
        // keep going
    }
    else {
        // done   
    }
    background(0);

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].show(color(255));
        }
    }
    for (var i = 0; i < closedSet.length; i++) {
        closedSet[i].show(color(255, 0, 0))
    }

    for (var i = 0; i < openSet.length; i++) {
        openSet[i].show(color(0, 255, 0))

    }



}