export default function Visping() {
    document.getElementById("title").prepend("Visping");

    return (
        <div>
            <h1>Visping</h1>
            <p>Welcome, this is Visping's page, here is the <a href="https://github.com/CubeToPlay/Visping">link</a> to the github site <br></br> Here is latest release page <a href="https://github.com/CubeToPlay/Visping/releases/latest">link</a> </p>
            <p><a href="https://github.com/CubeToPlay/Visping/releases/download/v1.2.0/Visping_Setup_x64.msi" download>Download 64 bit (x64)</a></p>
            <p><a href="https://github.com/CubeToPlay/Visping/releases/download/v1.2.0/Visping_Setup_x86.msi" download>Download 32 bit (x86)</a></p>
            <img src={require("../imgs/visping_capture_with_ping.png")} alt="Visping Example" width="484px"></img>
        </div>
    )
}