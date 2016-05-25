;$(document).ready(function () {
    builtMaze();
    $(window).resize(function () {
        builtMaze();
    })
});

function builtMaze() {
    check();
    formMaze();
    amaze(MAZE["currentPosition"][0], MAZE["currentPosition"][1], true);
    fillMaze();
}

function formMaze() {
    $(".block").remove();

    for (var y = 0; y < SIZE["height"]; y++) {
        MAZE["maze"][y] = [];

        for (var x = 0; x < SIZE["width"]; MAZE["maze"][y][x++] = 'wall') {
            $(".maze").append("<div class=\"block wall\" id=" + y + "-" + x + "></div>");
        }
    }
}

function fillMaze() {
    while (MAZE["walls"].length != 0) {
        var randomWall = MAZE["walls"][Math.floor(Math.random() *  MAZE["walls"].length)],
            host = randomWall[2],
            opposite = [(host[0] + (randomWall[0] - host[0]) * 2),
                (host[1] + (randomWall[1] - host[1]) * 2)];

        if (valid(opposite[0], opposite[1])) {
            if (MAZE["maze"][opposite[0]][opposite[1]] == 'maze') MAZE["walls"].splice( MAZE["walls"].indexOf(randomWall), 1);

            else amaze(randomWall[0], randomWall[1], false), amaze(opposite[0], opposite[1], true);

        }
        else MAZE["walls"].splice(MAZE["walls"].indexOf(randomWall), 1);
    }

    $("#0-0").removeClass().addClass("block start").attr("title", "start");
    $("#" + (SIZE["height"]-2) + "-" + (SIZE["width"]-2) ).removeClass().addClass("block finish").attr("title", "finish");
}

function amaze(y, x, addBlockWalls) {
    MAZE["maze"][y][x] = 'maze';
    $("#" + y + "-" + x).removeClass().addClass("block");

    if (addBlockWalls && valid(y + 1, x) && (MAZE["maze"][y + 1][x] == 'wall')) MAZE["walls"].push([y + 1, x, [y, x]]);
    if (addBlockWalls && valid(y - 1, x) && (MAZE["maze"][y - 1][x] == 'wall')) MAZE["walls"].push([y - 1, x, [y, x]]);
    if (addBlockWalls && valid(y, x + 1) && (MAZE["maze"][y][x + 1] == 'wall')) MAZE["walls"].push([y, x + 1, [y, x]]);
    if (addBlockWalls && valid(y, x - 1) && (MAZE["maze"][y][x - 1] == 'wall')) MAZE["walls"].push([y, x - 1, [y, x]]);
}

function valid(a, b) {
    return !!(a < SIZE["height"] && a >= 0 && b < SIZE["width"] && b >= 0);
}

function check(){
    var size = $("body");
    var width = size.width();
    var height = size.height();

    width =width/10 - width%10*0.1;
    if(width % 2 != 0) width=width-1;

    height = height/10 - height%10*0.1;
    if(height % 2 != 0) height=height-1;

    SIZE["width"] = width;
    SIZE["height"] = height;
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