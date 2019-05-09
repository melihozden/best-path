

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

function removeFromArray(arr, element) {
    // for (var i = arr.length - 1; i >= 0; i++) {
    //     if (arr[i] == element) {
    //         arr.splice(i, 1)
    //     }
    // }
}

// f,g and h values , f(n) = g(n) + h(n)
function Node(i, j) {

    this.i = i; // coordinate x
    this.j = j; // coordinate y
    this.f = 0;     // heuristic function
    this.g = 0;    // cost of the path from startPoint to n point which n is current my code
    this.h = 0;   //  heuristic function that estimates the cost of the cheapest path from n(current) to the goal(endPoint)
    this.neighbors = []
    this.show = function (color) {
        fill(color);
        noStroke();
        rect(this.i * w, this.j * h, w - 1, h - 1)
    }
    this.addNeighbors = function (grid) {
        var i = this.i;
        var j = this.j;
        // 4 neighbors of current position
        if (i < cols - 1) {
            this.neighbors.push(grid[i + 1][j])
        }
        if (i > 0) {
            this.neighbors.push(grid[i - 1][j])
        }
        if (j < rows - 1) {
            this.neighbors.push(grid[i][j + 1])
        }
        if (j > 0) {
            this.neighbors.push(grid[i][j - 1])
        }
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

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].addNeighbors(grid);
        }
    }

    startPoint = grid[0][0] // top-left corner
    endPoint = grid[cols - 1][rows - 1] // bottom-right corner

    openSet.push(startPoint);

    console.log(grid)
    console.log(openSet)

}
function draw() {
    if (openSet.length > 0) {

        var winner = 0;
        for (var i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[winner]) {
                winner = i;
            }
        }

        var current = openSet[winner];

        if (current == endPoint) {
            console.log(winner)
        }

        removeFromArray(openSet, current)  // remove from openSet 
        closedSet.push(current) // and add to closedSet 

        var neighbors = current.neighbors;
        for (var i = 0; i < neighbors.length; i++) {
            var neighbor = neighbors[i];
            if (!closedSet.includes(neighbor)) {
                var tempG = current.g + 1;
                if (openSet.includes(neighbor)) {
                    if (tempG < neighbor.g) {
                        neighbor.g = tempG;
                    }
                    // it is not in openSet, then add to openSet
                    else {
                        neighbor.g = tempG;
                        openSet.push(neighbor)
                    }
                }
            }
        }
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
        openSet[i].show(color(0, 0, 255))
    }



}