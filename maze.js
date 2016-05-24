
function builtMaze() {
    for (var y = 0; y < SIZE["height"]; y++) {
        MAZE["maze"][y] = [];
        for (var x = 0; x < SIZE["width"]; MAZE["maze"][y][x++] = 'wall') {
            var el = document.getElementsByClassName('maze')[0].appendChild(document.createElement("div"));
            el.className = "block wall";
            el.setAttribute('id', y + '-' + x);
        }
    }
}




