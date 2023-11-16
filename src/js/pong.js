export function run() {
const GAMEWINDOW = document.getElementById("pong_canvas")

console.log(GAMEWINDOW)

const CONTEXT = GAMEWINDOW.getContext("2d");

const MILLISECOND_PER_SECOND = 1000.00;
const FRAMES_PER_SECOND = 60.00;
const TIME_PER_FRAME = MILLISECOND_PER_SECOND / FRAMES_PER_SECOND;

// Class Declaration
class Vector2D {
    constructor(t_x, t_y) {
        this.x = t_x;
        this.y = t_y;
    }

    add(vector) { return new Vector2D(this.x + vector.x, this.y + vector.y) }

    sub(vector) { return new Vector2D(this.x - vector.x, this.y - vector.y) }

    div(number) { return new Vector2D(this.x / number, this.y / number); }

    mult(number) { return new Vector2D(this.x * number, this.y * number); }

    product(vector) { return new Vector2D(this.x * vector.x, this.y * vector.y); }

    dot(vector) { return vector.x * this.x + vector.y * this.y }

    tangent() { return new Vector2D(-this.y, this.x) }

    magnitude() { return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)); }

    distance(vector) { return this.sub(vector).magnitude(); }

    angle() {
        var angle = Math.atan(this.y / this.x);

        if (this.x < 0) { angle += Math.PI; }

        return angle;
    }

    slope() { return this.y / this.x }

    unit() {
        return new Vector2D(this.x, this.y).div(this.magnitude());
    }

    set(vector) {
        this.x = vector.x;
        this.y = vector.y;
    }

    draw(origin, scale, color) {
        CONTEXT.strokeStyle = color;
        CONTEXT.lineWidth = 5;

        CONTEXT.beginPath();
        CONTEXT.moveTo(origin.x, origin.y);
        CONTEXT.lineTo(origin.x + this.x * scale, origin.y + this.y * scale);
        CONTEXT.stroke();
    }

    get() { return new Vector2D(this.x, this.y); }
}

class Ball {
    constructor(t_x, t_y, t_radius) {
        this.bounce = 0;
        this.radius = t_radius;
        this.winner = "";
        this.player = "";

        this.position = new Vector2D(t_x, t_y);
        this.velocity = new Vector2D(100, 100);
        this.acceleration = new Vector2D(0, 0);

        this.cached = [];
        this.cached.position = this.position.get();
        this.cached.velocity = this.velocity.get();
        this.cached.acceleration = this.acceleration.get();

        this.inital = [];
        this.inital.position = this.position.get();
        this.inital.velocity = this.velocity.get();
        this.inital.acceleration = this.acceleration.get();

        this.inital.speed = this.velocity.magnitude();
    }

    display() {

        CONTEXT.fillStyle = "white";

        CONTEXT.beginPath();
        CONTEXT.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);

        CONTEXT.fill();
    }

    calculate() {
        this.cached.position.set(this.position.get());
        this.cached.velocity.set(this.velocity.get());
        this.cached.acceleration.set(this.acceleration.get());

        this.velocity.set(this.velocity.add(this.acceleration.div(MILLISECOND_PER_SECOND / TIME_PER_FRAME)));
        this.position.set(this.position.add(this.velocity.div(MILLISECOND_PER_SECOND / TIME_PER_FRAME)));
    }

    collision(left_player, right_player) {
        if (this.position.y <= this.radius || this.position.y >= GAMEWINDOW.height - this.radius) {
            this.position.set(this.cached.position.get());
            this.acceleration.set(this.cached.acceleration.get());

            this.velocity.set(this.cached.velocity.get().product(new Vector2D(1, -1)));
        }

        if (this.position.x <= -this.radius) {
            right_player.score = right_player.score + 1;
            this.reset();
            this.velocity.set(this.velocity.product(new Vector2D(-1, 1)));
        }

        if (this.position.x >= GAMEWINDOW.width + this.radius) {
            left_player.score = left_player.score + 1;
            this.reset();
        }


    }

    reset() {
        this.position.set(this.inital.position.get());
        this.velocity.set(this.inital.velocity.get());
        this.acceleration.set(this.inital.acceleration.get());

        this.cached.position.set(this.inital.position.get());
        this.cached.velocity.set(this.inital.velocity.get());
        this.cached.acceleration.set(this.inital.acceleration.get());

        this.bounce = 0
        this.player = ""
        this.winner = ""
    }
}

class Paddle {
    constructor(t_x, t_y, t_w, t_h, t_name) {
        this.name = t_name

        this.score = 0;

        this.speed = 150;

        this.position = new Vector2D(t_x, t_y);
        this.velocity = new Vector2D(0, 0);

        this.size = new Vector2D(t_w, t_h);

        this.cached = []
        this.cached.position = this.position.get();
        this.cached.velocity = this.velocity.get();

        this.inital = [];
        this.inital.position = this.position.get();
        this.inital.velocity = this.velocity.get();
    }

    draw() {
        CONTEXT.fillStyle = "white";
        CONTEXT.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    }

    calculate() {
        this.cached.position.set(this.position);

        this.position.set(this.position.add(this.velocity.div(MILLISECOND_PER_SECOND / TIME_PER_FRAME)));
    }

    collision(ball) {
        if (this.position.y < 0 || this.position.y + this.size.y > GAMEWINDOW.height) { this.position.set(this.cached.position.get()); }

        var nearest = new Vector2D
            (Math.max(Math.min(ball.position.x, this.position.x + this.size.x), this.position.x),
                Math.max(Math.min(ball.position.y, this.position.y + this.size.y), this.position.y))

        var distance = ball.position.distance(nearest.get());

        if (distance <= ball.radius) {
            if (ball.player !== this.name) {
                ball.player = this.name
                ball.bounce += 1
            }

            this.position.set(this.cached.position.get());

            var normal_line = new Vector2D(nearest.x - ball.position.x, nearest.y - ball.position.y);

            do {
                ball.position.set(ball.position.add(new Vector2D(Math.cos(normal_line.angle()), Math.sin(normal_line.angle())).mult(-0.001)))

                distance = ball.position.distance(nearest.get())
            } while (distance <= ball.radius);

            var normal_y = normal_line.mult(ball.velocity.dot(normal_line.get()) / normal_line.dot(normal_line.get()))
            var normal_x = ball.velocity.sub(normal_y.get())

            var normal_c = normal_y.mult(-1).add(normal_x.get())

            // normal_c.draw(ball.position.get(), 1, "pink");

            ball.velocity.set(new Vector2D(Math.cos(normal_c.angle()), Math.sin(normal_c.angle())).mult(ball.velocity.magnitude() * speed_multiplier));
            //ball.velocity.set(ball.velocity.add(new Vector2D(0, this.velocity.y)))
        }
    }

    reset() {
        this.cached.position.set(this.inital.position.get());
        this.cached.velocity.set(this.inital.velocity.get());

        this.position.set(this.inital.position.get());
        this.velocity.set(this.inital.velocity.get());

        this.score = 0
    }
}




// Main Game
var player_1 = new Paddle(30, 200, 10, 100, "Player 1");
var player_2 = new Paddle(710, 200, 10, 100, "Player 2");

var ball = new Ball(GAMEWINDOW.width / 2, GAMEWINDOW.height / 2, 10, 3);

var pressed_keys = [];
var input_list = [["w", "s"], ["i", "k"]];
var player_list = [player_1, player_2];

var speed_multiplier = 1.05

function pong_loop() {
    //GAMEWINDOW.style.marginTop = (window.innerHeight - GAMEWINDOW.offsetHeight) / 2 + "px";
    //GAMEWINDOW.style.marginLeft = (window.innerWidth - GAMEWINDOW.offsetWidth) / 2 + "px";

    clear();

    ball.calculate();
    ball.collision(player_list[0], player_list[1]);
    ball.display();

    for (const player of player_list) {
        player.calculate();
        player.collision(ball);
        player.draw();

        if (player.score >= 7) {
            ball.velocity.set(new Vector2D(0, 0));
            ball.acceleration.set(new Vector2D(0, 0));
            ball.winner = player.name;
        }
    }

    display()
}

function clear() {
    CONTEXT.globalAlpha = 1.0;
    CONTEXT.fillStyle = "rgb(0, 0, 0)"
    CONTEXT.fillRect(0, 0, GAMEWINDOW.width, GAMEWINDOW.height);
}

function display() {
    // Player Scores
    CONTEXT.textAlign = "center";
    CONTEXT.font = "20px Arial";
    CONTEXT.fillText(player_list[0].score + " : " + player_list[1].score, GAMEWINDOW.width / 2, 50);

    // Ball Speed
    CONTEXT.textAlign = "left";
    CONTEXT.font = "12px Arial";
    CONTEXT.fillText(Math.round(ball.velocity.magnitude()) + "px/sec", 10, GAMEWINDOW.height - 10);

    // Bounce Count
    CONTEXT.textAlign = "right";
    CONTEXT.font = "12px Arial";
    CONTEXT.fillText(ball.bounce + " bounce" + ((ball.bounce === 1) ? "" : "s"), GAMEWINDOW.width - 10, GAMEWINDOW.height - 10);

    if (ball.winner !== "") {
        CONTEXT.fillStyle = "rgb(0, 0, 0)";
        CONTEXT.fillRect(GAMEWINDOW.width / 4, GAMEWINDOW.height / 4, GAMEWINDOW.width / 2, GAMEWINDOW.height / 2);

        // Win Statment
        CONTEXT.fillStyle = "rgb(255, 255, 255)";
        CONTEXT.textAlign = "center";
        CONTEXT.font = "60px Arial";
        CONTEXT.fillText(ball.winner + " Won!", GAMEWINDOW.width / 2, GAMEWINDOW.height / 2 + 20);

        // Reset Instructions
        CONTEXT.textAlign = "center";
        CONTEXT.font = "20px Arial";
        CONTEXT.fillText("Press [Q] and [O] to reset.", GAMEWINDOW.width / 2, GAMEWINDOW.height / 2 + 60);
    }
}

function reset() {
    for (const player of player_list) {
        player.reset();
    }

    ball.reset();
}

function input_updated() {
    for (var player_index = 0; player_index < 2; player_index++) {
        var player = player_list[player_index];

        player.velocity.set(new Vector2D(0, 0));
        for (var key_index = 0; key_index < 2; key_index++) {
            var key = input_list[player_index][key_index];

            if (pressed_keys[key]) {
                var direction = key_index * 2 - 1

                player.velocity.set(new Vector2D(0, player.speed * direction));
            }
        }
    }

    if (pressed_keys["q"] && pressed_keys["o"]) {
        reset();
    }
}


// User Input Detection
window.addEventListener("keydown", function (event) {
    pressed_keys[event.key.toLowerCase()] = true;

    input_updated();
}, false);

window.addEventListener("keyup", function (event) {
    pressed_keys[event.key.toLowerCase()] = false;

    input_updated();
}, false);



    setInterval(pong_loop, TIME_PER_FRAME)
}