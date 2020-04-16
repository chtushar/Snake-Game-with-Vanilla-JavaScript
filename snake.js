scoreViewer = document.querySelector('.score');
score = 0

function updateScore(){
   score++;
   scoreViewer.innerHTML = `Score: ${score}`;
}


function init() {
    canvas = document.getElementById('canvas');
    W = H = canvas.width = canvas.height = 500
    ctx = canvas.getContext('2d');
    game_over = false;
    cs = 25;

    food = getRandomFood();

    snake = {
        init_len: 5,
        color: 'blue',
        cells: [],
        direction: 'right',

        createSnake: function() {
            for(let i = this.init_len; i > 0; i--){
                this.cells.push({x: i, y: 0});
            }
        },

        drawSnake: function () {

            for (let i = 0; i < this.cells.length; i++) {
                ctx.fillStyle = this.color;
                ctx.fillRect(this.cells[i].x*cs, this.cells[i].y*cs, cs - 1, cs - 1);
            }  
        },

        updateSnake: function() {
            
            

            
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;

            if (headX==food.x && headY==food.y){
                console.log('Food Eaten');
                food = getRandomFood();
                updateScore();
            }
            else{
                this.cells.pop();
            }


            var nextX, nextY;
            if (this.direction == "right") {
                nextX = headX + 1;
                nextY = headY;
            }
            else if(this.direction == "left"){
                nextX = headX - 1;
                nextY = headY;
            }
            else if (this.direction == "down") {
                nextX = headX;
                nextY = headY + 1;
            }
            else if(this.direction == "up"){
                nextX = headX;
                nextY = headY - 1;
            }

            var X = headX + 1;
            var Y = headY;
            this.cells.unshift({x: nextX, y: nextY});


            var last_x = Math.round(W/cs);
            var last_y = Math.round(H/cs);


            if (this.cells[0].y < 0 || this.cells[0].y < 0 || this.cells[0].x > last_x || this.cells[0].y > last_y){
                game_over = true;
            }
            
        }
    }

    snake.createSnake();

    function keyPressed(e){
        if (e.key === "ArrowRight") {
            snake.direction = "right";
        }
        else if(e.key === "ArrowLeft"){
            snake.direction = "left";
        }
        else if(e.key === "ArrowDown"){
            snake.direction = "down";
        }
        else if(e.key === "ArrowUp"){
            snake.direction = "up";
        }   
    }


    document.addEventListener('keydown', keyPressed); 
}
function getRandomFood(){
    var foodX = Math.round(Math.random()*(W-cs)/cs);
    var foodY = Math.round(Math.random()*(H-cs)/cs);

    var food = {
        x: foodX,
        y: foodY,
        color: 'red'
    }
    return food;

}
function draw() {

    ctx.clearRect(0,0,W,H);
    
    snake.drawSnake();
    ctx.fillStyle = food.color;
    ctx.fillRect(food.x*cs,food.y*cs,cs -1,cs -1);
}

function update() {
    snake.updateSnake();
}

function gameLoop() {
    if(game_over == true){
        clearInterval(f);
        alert("game over");
        game_over = false;
        init();
    }
    draw();
    update();
}

init();

var f = setInterval(gameLoop, 200)

