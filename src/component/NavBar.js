import { useLocation } from "react-router-dom/dist";

const UPDATE_INTERVAL_MILLISECONDS = 1000.00;
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


function NavLink({path, text}) {
    return ( <a className="nav-link text-dark"  href={path}>{text}</a> )
}

function evaluate(value) { return value < 10 ? "0" : "" }

function time_loop() {
    let date, hour, minute, second, time_display;

    date = new Date();
    hour = date.getHours();
    minute = date.getMinutes();
    second = date.getSeconds();

    hour = (hour % 12)
    hour = hour === 0 ? 12 : hour

    time_display = MONTHS[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + "<br>"

    document.getElementById("time").innerHTML = time_display + hour + ":" + evaluate(Number(minute)) + minute + ":" + evaluate(Number(second)) + second;
}

export default function NavBar() {
    const location = useLocation();
    if (location.pathname.includes("map")) { return <></> }

    setInterval(time_loop, UPDATE_INTERVAL_MILLISECONDS);

    return(
        <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
            <div className="container">
                <a className="navbar-brand" href="./">CubeToPlay</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                    <ul className="navbar-nav flex-grow-1">
                        <NavLink path="/" text="Home"/>
                        <NavLink path="/#/pong" text="Pong"/>
                        <NavLink path="/#/visping" text="Visping"/>
                        <NavLink path="/#/datapacks" text="Datapacks"/>
                        <NavLink path="/#/modpacks" text="Modpacks"/>
                        <NavLink path="/#/roblox" text="Roblox"/>
                    </ul>
                </div>
                <div className="time text-dark" id="time"></div>
            </div>
        </nav>
    )
}