function NavLink({path, text}) {
    return ( <a className="link-underline link-underline-opacity-0" href={path}>{text}</a> )
}

export default function Footer() {
    return (
        <footer>
            <div className="container">
                &copy; 2023 - CubeToPlay - <NavLink path="/privacy" text="Privacy"/> - <NavLink path="/about" text="About"/>
            </div>
        </footer>
    )
}