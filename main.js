

// Finding Best Top Left corner to Right Bottom corner...
// Coding train inspired me to this.
var rows = 50;
var cols = 50;

var grid = new Array(cols)

var openSet = [];
var closedSet = [];

var startPoint;
var endPoint;
var w, h;
var path = [];

const total = document.getElementById("total")

function removeFromArray(arr, element) {
    for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i] == element) {
            arr.splice(i, 1)
        }
    }
}
function heuristic(x, y) {
    // var distance = dist(x.i, x.j, y.i, y.j)
    var distance = abs(x.i - y.i) + abs(x.j - y.j)
    return distance
}

// f,g and h values , f(n) = g(n) + h(n)
function Node(i, j) {

    this.i = i; // coordinate x
    this.j = j; // coordinate y
    this.f = 0;     // heuristic function
    this.g = 0;    // cost of the path from startPoint to n point which n is current my code
    this.h = 0;   //  heuristic function that estimates the cost of the cheapest path from n(current) to the goal(endPoint)
    this.neighbors = []
    this.pre = null;
    this.obs = false     // obstacle

    if (random(1) < 0.3) {
        this.obs = true;
    }

    this.show = function (color) {
        fill(color);
        if (this.obs) {
            fill(0)
            noStroke();
            ellipse(this.i * w + w / 2, this.j * h + h / 2, w / 2, h / 2)
        }
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
        // Diagonal neighbors
        if (i > 0 && j > 0) {
            this.neighbors.push(grid[i - 1][j - 1])
        }
        if (i < cols - 1 && j > 0) {
            this.neighbors.push(grid[i + 1][j - 1])
        }
        if (i > 0 && j < rows - 1) {
            this.neighbors.push(grid[i - 1][j + 1])
        }
        if (i < cols - 1 && j < rows - 1) {
            this.neighbors.push(grid[i + 1][j + 1])
        }
    }
}

function setup() {
    width = 400;
    height = 400;
    createCanvas(width, height);
    console.log("A* Algorithm")
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
    startPoint.obs = false;
    endPoint.obs = false;

    openSet.push(startPoint);

    //console.log(grid)
    // console.log(openSet)

}
function draw() {
    if (openSet.length > 0) {

        var winner = 0;
        for (var i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[winner].f) {
                winner = i;
            }
        }

        var current = openSet[winner];

        if (current == endPoint) {
            noLoop()
            console.log(winner + " Done!")
            console.log(path)
            console.log(path.length)
            total.innerHTML += path.length

        }

        removeFromArray(openSet, current)  // remove from openSet 
        closedSet.push(current) // and add to closedSet 

        var neighbors = current.neighbors;
        for (var i = 0; i < neighbors.length; i++) {
            var neighbor = neighbors[i];
            if (!closedSet.includes(neighbor) && !neighbor.obs) {
                var tempG = current.g + 1;
                if (openSet.includes(neighbor)) {
                    if (tempG < neighbor.g) {
                        neighbor.g = tempG;
                    }
                }
                // it is not in openSet, then add to openSet
                else {
                    neighbor.g = tempG;
                    openSet.push(neighbor)
                }
                neighbor.h = heuristic(neighbor, endPoint)
                neighbor.f = neighbor.g + neighbor.h  // f(n) = g(n) + h(n)
                // console.log(neighbor.h)
                neighbor.pre = current
            }
        }
        // keep going
    }
    else {
        console.log("No EndPoint, No Response")
        total.innerHTML = "No Response"
        noLoop()
        return;
        // done
    }
    background(255);

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
    path = [];
    var temp = current;
    path.push(temp)
    while (temp.pre) {
        path.push(temp.pre)
        temp = temp.pre;
    }
    noFill()
    stroke(0, 175, 0)
    strokeWeight(w / 2)
    beginShape()
    for (var i = 0; i < path.length; i++) {
        vertex(path[i].i * w + w / 2, path[i].j * h + h / 2)
    }
    endShape()


}