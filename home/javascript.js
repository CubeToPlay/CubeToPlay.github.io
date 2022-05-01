const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function timeUpdate(){
    var date = new Date;

    var displayhour = date.getHours();
    if (displayhour > 12) {
        displayhour -= 12;
    } else if (displayhour == 0) {
        displayhour = 12;
    }

    var displaydate = months[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + "<br>"

    var beforeMin = ""
    if (date.getMinutes() < 10) {
        beforeMin = "0"
    }

    var beforeHour = ""
    if (displayhour < 10) {
        beforeHour = "0"
    }

    var beforeSec = ""
    if (date.getSeconds() < 10){
        beforeSec = "0"
    }

    var displaytime = beforeHour + displayhour + ":" + beforeMin + date.getMinutes() + ":" + beforeSec + date.getSeconds()
    document.getElementById("time").innerHTML = displaydate + displaytime; 

    document.getElementById("left_sidebar").style.height = (window.innerHeight - 90).toString() + "px";
}

timeUpdate();

setInterval(timeUpdate, 1000);