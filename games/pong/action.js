const GAMEWINDOW = document.getElementById("window");
const CONTEXT = GAMEWINDOW.getContext("2d");

const MS = 1000
const FPS = 120;
const FS = MS/FPS;

class PVector {
    constructor (radian, speed){
        this.radian = radian;
        this.speed = speed;
    }

    addPolar(radian, speed){
        var C1 = toCartesian(this.radian, this.speed);
        var C2 = toCartesian(radian, speed);

        this.radian = Math.atan2(C1.y + C2.y, C1.x + C2.x);
        this.speed = Math.hypot(C1.y + C2.y, C1.x + C2.x);
    }

    addCartesian(x, y){
        this.addPolar(Math.atan2(x, y), Math.hypot(x, y))
    }
}

class CVector {
    constructor (x, y){
        this.x = x;
        this.y = y;
    }

    addPolar(radian, speed){
        this.x += Math.cos(radian) * speed;
        this.y += Math.sin(radian) * speed;
    }

    addCartesian(x, y){
        this.x += x;
        this.y += y;
    }
}

class Ball{
    constructor(px, py, r, m){
        this.radius = r;
        this.mass = m
        this.position = new CVector(px, py);
        this.velocity = new PVector(Math.PI/4, 200);
        this.acceleration = new PVector(0, 0);

        this.saved = {position: new CVector(px, py), acceleration: new PVector(0, 0), velocity: new PVector(Math.PI/4, 120)}
    }

    action(){
        this.saved.position.x = this.position.x; this.saved.position.y = this.position.y;
        this.saved.acceleration.radian = this.acceleration.radian; this.saved.acceleration.speed = this.acceleration.speed;
        this.saved.velocity.radian = this.velocity.radian; this.saved.velocity.speed = this.velocity.speed;

        this.position.addPolar(this.velocity.radian, this.velocity.speed/FPS);
        this.velocity.addPolar(this.acceleration.radian, this.acceleration.speed/FPS);
    }

    draw(){
        CONTEXT.fillStyle = "rgb(255, 255, 255)"

        CONTEXT.beginPath();
        CONTEXT.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);

        CONTEXT.fill();
    }

    collision(){

        // var point = {x: ,y: }

        if (this.position.y > 490){
            this.fallback();
            this.velocity.radian = bounce(this.velocity.radian, Math.PI/2 + Math.PI);
            this.velocity.addPolar(Math.PI/2 + Math.PI, this.velocity.speed)
        }

        if (this.position.y < 10){
            this.fallback();
            this.velocity.radian = bounce(this.velocity.radian, Math.PI/2);
        }

        if (this.position.x > 740){
            this.fallback();
            this.velocity.radian = bounce(this.velocity.radian,  Math.PI);
        }

        if (this.position.x < 10){
            this.fallback();
            this.velocity.radian = bounce(this.velocity.radian, 0);
        }
    }

    fallback(){
        this.position.x = this.saved.position.x; this.position.y = this.saved.position.y;
        this.acceleration.radian = this.saved.acceleration.radian; this.acceleration.speed = this.saved.acceleration.speed;
        this.velocity.radian = this.saved.velocity.radian; this.velocity.speed = this.saved.velocity.speed;
    }
}

var ball = new Ball(50, 50, 10, 3);

function loop(){
    GAMEWINDOW.style.marginTop = window.innerHeight/2 - GAMEWINDOW.offsetHeight/2 + "px";
    GAMEWINDOW.style.marginLeft = window.innerWidth/2 - GAMEWINDOW.offsetWidth/2 + "px";

    clear();

    ball.action();
    ball.collision();
    ball.draw();
}

function clear(){
    CONTEXT.globalAlpha = 1.0;
    CONTEXT.fillStyle = "rgb(0, 0, 0)"
    CONTEXT.fillRect(0, 0, GAMEWINDOW.width, GAMEWINDOW.height);
    CONTEXT.globalAlpha = 1.0;
}

function toPolar(x, y){
    return {radian: Math.atan2(y, x), speed: Math.hypot(x, y)};
}
function toCartesian(radian, speed){
    return {x: Math.cos(radian) * speed, y: Math.sin(radian) * speed};
}

function bounce(angle, normal){
    return angle + ((Math.PI/2 + normal)-(angle)) * 2;
}

setInterval(loop, FS);