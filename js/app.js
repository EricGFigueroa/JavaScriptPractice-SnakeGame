$(document).ready(function() {

    // Define Variables
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var w = canvas.width;
    var h = canvas.height;
    // Cell Width
    var cw = 15;
    // Direction
    var d = "right";
    // Food
    var food;
    // Score
    var score;
    // Speed
    var speed = 130;
    // Color
    var color = "red";
    // Snake Array
    var snakeArray;

    // Initializer
    function init() {

        d = "right";
        createSnake();
        createFood();
        score = 0;

        if (typeof gameLoop != "undefined") clearInterval(gameLoop);
        gameLoop = setInterval(paint, speed);

    };

    // Run Initializer
    init();

    // Create Snake
    function createSnake() {

        var length = 5;
        snakeArray = [];

        for (var i = length - 1; i >= 0; i--) {

            snakeArray.push({
                x: i,
                y: 0
            });

        };

    };

    // Create Food
    function createFood() {

        food = {

            x: Math.round(Math.random() * (w - cw) / cw),
            y: Math.round(Math.random() * (h - cw) / cw)

        };

    };

    // Paint Snake
    function paint() {

        // Paint The Canvas
        ctx.fillStyle = "#111";
        ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = "#fff";
        ctx.strokeRect(0, 0, w, h);

        var nx = snakeArray[0].x;
        var ny = snakeArray[0].y;

        // Snake Direction Logic
        if (d == "right") {
            nx++;
        } else if (d == "left") {
            nx--;
        } else if (d == "up") {
            ny--;
        } else if (d == "down") {
            ny++;
        }

        // Collision Code
        if (nx == -1 || nx == w / cw || ny == -1 || ny == h / cw || checkCollision(nx, ny, snakeArray)) {

            // init();

            // Insert Final score
            $("#final-score").html(score);

            // Show Overlay
            $("#overlay").fadeIn(300);

            return;

        };

        // If Snake Replaces The Foods Position
        if (nx == food.x && ny == food.y) {

            var tail = {
                x: nx,
                y: ny
            };
            score++;

            // Create Food
            createFood();

        } else {

            var tail = snakeArray.pop();
            tail.x = nx;
            tail.y = ny;

        };

        snakeArray.unshift(tail);

        for (var i = 0; i < snakeArray.length; i++) {

            var c = snakeArray[i];
            paintCell(c.x, c.y);

        };

        // Paint Cell
        paintCell(food.x, food.y);

        // Check Score
        checkScore(score);

        // Display Current Score
        $("#score").html("Your Score: " + score);

    };

    function paintCell(x, y) {

        ctx.fillStyle = color;
        ctx.fillRect(x * cw, y * cw, cw, cw);
        ctx.strokeStyle = "#fff";
        ctx.strokeRect(x * cw, y * cw, cw, cw);

    };

    function checkCollision(x, y, array) {

        for (var i = 0; i < array.length; i++) {

            if (array[i.x == x && array[i].y == y]) {

                return true;

            }

            return false;

        };

    };

    function checkScore(score) {

        if (localStorage.getItem("high-score") === null) {

            //If There Is No High Score
            localStorage.setItem("high-score", score);

        } else {

            //If There Is A High Score
            if (score > localStorage.getItem("high-score")) {

                localStorage.setItem("highScore", score);

            }
        };

        $("#high-score").html("High Score: " + localStorage.highScore)

    };

    // Keyboard Controller
    $(document).keydown(function(e) {

        var key = e.which;

        if (key == "37" && d != "right") d = "left";
        else if (key == "38" && d != "down") d = "up";
        else if (key == "39" && d != "left") d = "right";
        else if (key == "40" && d != "up") d = "down";

    });

});

function resetScore() {

    localStorage.highScore = 0;

    // Display High Score
    var highScoreDiv = document.getElementById("high-score");
    highScoreDiv.innerHTML = "High Score: 0";

}