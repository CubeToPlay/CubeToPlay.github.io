import React from "react"

export function Nav() {
  return (<div id="nav"></div>)
}
 
export function NavLink({path, text}) {
  return ( <a className="nav-link" href={path}>{text}</a> )
}

export function NavMenu() {
  return ( <div className="nav-menu"></div>)
}