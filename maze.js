;$(document).ready(function () {
    builtMaze();

    $(window).resize(function () {
        builtMaze();
    });

    $("body").keydown(move);
});

function builtMaze() {
    check();
    formMaze();
    amaze(MAZE.currentPosition[0], MAZE.currentPosition[1], true);
    fillMaze();    
}

function formMaze() {
    $(".block").remove();

    for (var y = 0; y < SIZE.height; y++) {
        MAZE.maze[y] = [];

        for (var x = 0; x < SIZE.width; MAZE.maze[y][x++] = "wall") {
            $(".maze").append("<div class=\"block wall\" id=" + y + "-" + x + "></div>");
        }
    }
}

function fillMaze() {
    while (MAZE.walls.length != 0) {
        var randomWall = MAZE.walls[Math.floor(Math.random() *  MAZE.walls.length)],
            host = randomWall[2],
            opposite = [(host[0] + (randomWall[0] - host[0]) * 2),
                (host[1] + (randomWall[1] - host[1]) * 2)];

        if (valid(opposite[0], opposite[1])) {
            if (MAZE.maze[opposite[0]][opposite[1]] == "maze") MAZE.walls.splice( MAZE.walls.indexOf(randomWall), 1);

            else {
                amaze(randomWall[0], randomWall[1], false);
                amaze(opposite[0], opposite[1], true);
            }

        }
        else MAZE.walls.splice(MAZE.walls.indexOf(randomWall), 1);
    }

    MAZE.maze[0][0] = "maze";
    MAZE.maze[SIZE.height-2][SIZE.width-2] = "maze";

    $("#0-0").removeClass().addClass("block player").attr("title", "start");
    $("#" + (SIZE.height-2) + "-" + (SIZE.width-2) ).removeClass().addClass("block finish").attr("title", "finish");
}

function move(symbol) {
    var shift = getShift(symbol);
    var newPosition = [MAZE.currentPosition[0]+shift[1], MAZE.currentPosition[1]+shift[0]];
    var newPos = $("#" + newPosition[0] + "-" + newPosition[1]);
    var pos = $("#" + MAZE.currentPosition[0] + "-" + MAZE.currentPosition[1]);
    if(checking){
        startDate = new Date();
        checking = false;
    }
    if(newPos.hasClass("finish")) {
        finishDate = new Date();
        $(".block").remove();

        $("body").append("<div class=\"result\" id=\"results\"> Ваш результат: " + (finishDate-startDate) / 1000 + "сек. </div>");

        setTimeout(reload, 15000);
        return;
    }
    if (valid(newPosition[0],newPosition[1]) && MAZE.maze[newPosition[0]][newPosition[1]] != 'wall') {
        pos.removeClass().addClass("block");
        MAZE.currentPosition = newPosition;
        newPos.removeClass().addClass("block player");
    }
}

function reload() {
    location.reload();
}
function getShift(symbol) {
    var sCode = symbol.keyCode;
    if(CODE.indexOf(sCode) < 0) return [0,0];
    if(sCode == 65 || sCode == 37 || sCode == 100) return SHIFT.left;
    if(sCode == 87 || sCode == 38 || sCode == 104) return SHIFT.top;
    if(sCode == 68 || sCode == 39 || sCode == 102) return SHIFT.right;
    if(sCode == 83 || sCode == 40 || sCode == 98) return SHIFT.down;
}

function amaze(y, x, addBlockWalls) {
    MAZE.maze[y][x] = "maze";
    $("#" + y + "-" + x).removeClass().addClass("block");

    if (addBlockWalls && valid(y + 1, x) && (MAZE.maze[y + 1][x] == 'wall')) MAZE.walls.push([y + 1, x, [y, x]]);
    if (addBlockWalls && valid(y - 1, x) && (MAZE.maze[y - 1][x] == 'wall')) MAZE.walls.push([y - 1, x, [y, x]]);
    if (addBlockWalls && valid(y, x + 1) && (MAZE.maze[y][x + 1] == 'wall')) MAZE.walls.push([y, x + 1, [y, x]]);
    if (addBlockWalls && valid(y, x - 1) && (MAZE.maze[y][x - 1] == 'wall')) MAZE.walls.push([y, x - 1, [y, x]]);
}

function valid(a, b) {
    return !!(a < SIZE.height && a >= 0 && b < SIZE.width && b >= 0);
}

function check(){
    var size = $("body");
    var width = size.width();
    var height = size.height();

    width =width/10 - width%10*0.1;
    if(width % 2 != 0) width=width-1;

    height = height/10 - height%10*0.1;
    if(height % 2 != 0) height=height-1;

    SIZE.width = width;
    SIZE.height = height;
}

var SIZE = {
    width: 0,
    height: 0
};

var MAZE = {
    maze:[],
    walls:[],
    currentPosition:[0,0]
};

var CODE = [65, 87, 68, 83, 37, 38, 39, 40, 100, 104, 102, 98];

var SHIFT = {
    left: [-1,0],
    top: [0,-1],
    right: [1,0],
    down: [0,1]
};
var startDate = 0;
var finishDate = 0;
var checking = true;
