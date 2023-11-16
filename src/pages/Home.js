export default function Home() {
    document.getElementById("title").prepend("Home Page");
    return (
        <div className="text-center">
            <h1 className="display-4">Welcome!</h1>
            <div id="map"></div>
            
            
            <iframe title="Discord" className="discord_widget" id="discord_widget" src="https://discord.com/widget?id=781646384175644722&theme=dark" width="350" height="500" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
        </div>
    )
}