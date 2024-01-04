export default function Pong() {
    document.getElementById("title").prepend("Pong");

    return (
        <>
            <canvas id="pong_canvas" width="750" height="500"></canvas>
        </>
    )
}