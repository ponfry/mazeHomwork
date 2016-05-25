;$(document).ready(function () {
    builtMaze();
});

function builtMaze() {
    for (var y = 0; y < SIZE["height"]; y++) {
        MAZE["maze"][y] = [];
        for (var x = 0; x < SIZE["width"]; MAZE["maze"][y][x++] = 'wall') {
            $(".maze").append("<div class=\"block wall\" id=" + y + "-" + x + "></div>");
        }
    }
    amaze(MAZE["currentPosition"][0], MAZE["currentPosition"][1], true);


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

var SIZE = {
    width: 136,
    height: 66
};

var MAZE = {
    maze:[],
    walls:[],
    currentPosition:[32,67]
};