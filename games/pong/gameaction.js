const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d")

var fps = 120;
var millisec = 1000;
var frameSpacing = millisec/fps;

var startSpeed = 150;
var speedIncrement = 20;
var maxSpeed = 600;

class paddle {
    constructor(px, py, sx, sy){
        this.size = {x: sx, y: sy};
        this.position = {x: px, y: py};
        this.velocity = {x: 0, y: 0};

        this.fallback = {x: 0, y: 0};
    }

    draw(){
        canvasContext.fillStyle = 'rgb(255, 255, 255)';
        canvasContext.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    }

    movment(){
        this.position.y += this.velocity.y/fps;
        this.position.x += this.velocity.x/fps;

        this.fallback = {x: this.position.x - this.velocity.x/fps, y: this.position.y - this.velocity.y/fps};

        verticalMovment = [Math.max(-maxSpeed, verticalMovment[0]), Math.min(maxSpeed, verticalMovment[1])];
    }

    limit(){
        this.position.y = Math.min(Math.max(this.position.y, 0), canvas.height - this.size.y);
    }
}

class ball {
    constructor (px, py, r){
        this.radius = r;
        this.origin = {x: px, y: py};
        this.position = {x: px, y: py};

        this.fallback = {x: 0, y: 0, degree: 0};

        this.velocity =  {x: 0, y: 0};

        this.degree = Math.PI/4;
        this.speed = startSpeed;

        this.bounces = 0;
    }

    draw(){
        canvasContext.fillStyle = "rbg(255, 255, 255)";
        
        canvasContext.beginPath();
        canvasContext.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        canvasContext.stroke();

        canvasContext.fill();
    }

    movment(){
        this.velocity = {x: Math.cos(this.degree)*(this.speed/fps), y: Math.sin(this.degree)*(this.speed/fps)};
        
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        this.fallback = {x: this.position.x-this.velocity.x, y: this.position.y-this.velocity.y, degree: this.degree, speed: this.speed};

        this.speed = Math.min(maxSpeed, this.speed);
    }

    collision(p1, p2){
        var players = [p1, p2];
        for (var i = 0; i < 2; i++) {
            var p = players[i];

            var closest = {x: Math.min(Math.max(this.position.x, p.position.x), p.position.x + p.size.x), y: Math.min(Math.max(this.position.y, p.position.y), p.position.y + p.size.y)};

            var normalAngle = Math.atan((closest.y-this.position.y)/(closest.x-this.position.x))
            if (closest.x-this.position.x < 0) {
                normalAngle += Math.PI;
            }

            var ricochetAngle = this.degree + ((Math.PI/2 + normalAngle)-(this.degree)) * 2;

            // canvasContext.fillStyle = 'rgb(255, 0, 0)';
            // canvasContext.fillRect(closest.x-6, closest.y-6, 12, 12);

            // canvasContext.fillStyle = 'rgb(0, 255, 0)';
            // canvasContext.fillRect(this.position.x - 6 + Math.cos(normalAngle)*10, this.position.y - 6 + Math.sin(normalAngle)*10, 12, 12);

            // canvasContext.fillStyle = 'rgb(0, 0, 255)';
            // canvasContext.fillRect(this.position.x - 6 + Math.cos(ricochetAngle)*20, this.position.y - 6 + Math.sin(ricochetAngle)*20, 12, 12);

            // canvasContext.fillStyle = 'rgb(0, 255, 255)';
            // canvasContext.fillRect(this.position.x - 6 + Math.cos(this.degree)*30, this.position.y - 6 + Math.sin(this.degree)*30, 12, 12);

            if (this.position.x < p.position.x + p.size.x + this.radius && this.position.x > p.position.x - this.radius && this.position.y < p.position.y + p.size.y + this.radius && this.position.y > p.position.y - this.radius) {
                p.position = p.fallback
                this.position = {x: this.fallback.x, y: this.fallback.y + p.velocity.y/fps};

                this.degree = ricochetAngle;

                this.bounces++;
                this.speed += speedIncrement;
                verticalMovment = [verticalMovment[0]-speedIncrement, verticalMovment[1]+speedIncrement];
            }

            if (this.position.y >= canvas.height - this.radius || this.position.y <= this.radius) {
                this.goback();
                this.degree *= -1;
            }
            if (this.position.x >= canvas.width + this.radius*2) {
                score[0] += 1;
                this.reset();
            } else if (this.position.x <= -this.radius*2) {
                score[1] += 1;
                this.reset();
            }
        }
    }

    reset(){
        this.position = {x: this.origin.x, y: this.origin.y};
        this.speed = startSpeed;
        verticalMovment = [-startSpeed /2, startSpeed /2];
        this.bounces = 0
        this.degree = Math.PI/4;
        checkScore();
    }

    goback(){
        this.position = {x: this.fallback.x, y: this.fallback.y};
        this.degree = this.fallback.degree;
        this.speed = this.fallback.speed;
    }
}



var firstPlayer = new paddle(30, 200, 10, 100);
var secondPlayer = new paddle(710, 200, 10, 100);

var pongball = new ball(canvas.width/2, 250, 10);

var keysDown = [];
var characters = [firstPlayer, secondPlayer];
var detectedKeys = [["w", "s"], ["i", "k"]];
var verticalMovment = [-startSpeed /2, startSpeed /2];

var score = [0, 0]

var winner = "";

function loop(){
    canvas.style.marginLeft = (window.screen.width/2 - canvas.width/2).toString() + "px";
    canvas.style.marginTop = "100px";
    
    // console.log(window.screen.width, canvas.width)
    clear();

    pongball.movment();
    firstPlayer.movment();
    secondPlayer.movment();

    firstPlayer.limit();
    secondPlayer.limit();
    pongball.collision(firstPlayer, secondPlayer);

    firstPlayer.draw();
    secondPlayer.draw();
    pongball.draw();

    displayInformation();
};

function clear(){
    canvasContext.fillStyle = "rgb(0, 0, 0)";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
}

function updateInput(){
    for (var p = 0; p < 2; p++) {
        characters[p].velocity.y = 0;
        for (var i = 0; i < 2; i++) {
            if (keysDown[detectedKeys[p][i]]) {
                characters[p].velocity.y += verticalMovment[i];
            }
        }
    }

    if (keysDown["e"] && keysDown["o"]) {
        resetGame();
    }
}

function displayInformation(){
    canvasContext.textAlign = "center";
    canvasContext.font = "20px Arial";
    canvasContext.fillText(score[0] + " : " + score[1], canvas.width/2, 50);

    canvasContext.textAlign = "left";
    canvasContext.font = "10px Arial";
    canvasContext.fillText(pongball.speed + "px/sec", 10, canvas.height-10);

    canvasContext.textAlign = "right";
    canvasContext.font = "10px Arial";

    var add = "s";
    if (pongball.bounces == 1) {
        add = ""
    }
    canvasContext.fillText(pongball.bounces + " bounce" + add, canvas.width - 10, canvas.height-10);

    if (winner != ""){
        canvasContext.fillStyle = "rgb(0, 0, 0)";
        canvasContext.fillRect(canvas.width/4, canvas.height/4, canvas.width/2, canvas.height/2);

        canvasContext.fillStyle = "rgb(255, 255, 255)";
        canvasContext.textAlign = "center";
        canvasContext.font = "60px Arial";
        canvasContext.fillText(winner + " Player Won!", canvas.width/2, canvas.height/2+20);
        canvasContext.textAlign = "center";
        canvasContext.font = "20px Arial";
        canvasContext.fillText("press \"e\" and \"o\" to reset", canvas.width/2, canvas.height/2+60);
    }
}

function resetGame(){
    firstPlayer = new paddle(30, 200, 10, 100);
    secondPlayer = new paddle(710, 200, 10, 100);

    pongball = new ball(canvas.width/2, 250, 10);
    score = [0, 0]
    winner = "";
    
    keysDown = [];
    characters = [firstPlayer, secondPlayer];
    detectedKeys = [["w", "s"], ["i", "k"]];
    verticalMovment = [-startSpeed /2, startSpeed /2];
}

function checkScore(){
    for (var s = 0; s < 2; s++) {
        if (score[s] >= 11) {
            var p = "Right"
            if (s == 0) {
                p = "Left"
            }
            // console.log(p + " Player Won!")
            winner = p;
            pongball.speed = 0;
        }
    }
}

window.addEventListener("keydown", function (event) {
    keysDown[event.key.toLowerCase()] = true;

    updateInput();
});

window.addEventListener("keyup", function (event) {
    keysDown[event.key.toLowerCase()] = false;

    updateInput();
});

setInterval(loop, frameSpacing);