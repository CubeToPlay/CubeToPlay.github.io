const UPDATE_INTERVAL_MILLISECONDS = 1000.00;

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var date, hour, minute, second, time_display;


function evaluate(value) { return value < 10 ? "0" : "" }

function time_loop() {
    date = new Date;
    hour = date.getHours();
    minute = date.getMinutes();
    second = date.getSeconds();

    hour = (hour % 12)
    hour = hour == 0 ? 12 : hour

    time_display = months[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + "<br>"


    document.getElementById("time").innerHTML = time_display + hour + ":" + evaluate(Number(minute)) + minute + ":" + evaluate(Number(second)) + second;
}

setInterval(time_loop, UPDATE_INTERVAL_MILLISECONDS);