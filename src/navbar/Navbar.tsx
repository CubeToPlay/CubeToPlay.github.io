import React from "react";

import Github from "../img/github-img.svg"

import './Navbar.css'


function Navbar() {
    return (
        <div className="Navbar">
            <div className="title">
                <p className="text">Hwvxyeej Adam Yaj</p>
            </div>

            <div className="menu">
                <button className="text interact">Home</button>
                <button className="text interact">About</button>
                <button className="text interact">Projects</button>
            </div>
            
            <div className="socials">
                <ul>
                    <a className="text interact" href="https://github.com/CubeToPlay" target="_blank" rel="noreferrer">Github</a>
                    <a className="text interact" href="https://linkedin.com/in/adam-yaj" target="_blank" rel="noreferrer">LinkedIn</a>
                    <a className="text interact" href="https://instagram.com/cube_person" target="_blank" rel="noreferrer">Instagram</a>
                    <a className="text interact" href="mailto:hwvxyeej@gmail.com">Email</a>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;