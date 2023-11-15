import { Nav, NavLink, NavMenu } from "./NavBarElements";
import "../styles/nav.css"

export default function NavBar() {
    return(
        <>
            <Nav>
                <NavMenu>
                    <NavLink path="/" text="Home"/>
                    <NavLink path="/about" text="About"/>
                </NavMenu>
            </Nav>
        </>
    )
}