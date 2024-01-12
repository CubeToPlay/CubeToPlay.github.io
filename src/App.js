import React from 'react';
import Navbar from './component/NavBar';
import Footer from './component/Footer';
import { Routes, Route, HashRouter } from "react-router-dom";
import { useLocation } from "react-router-dom/dist";

import Home from './pages/Home';
import About from './pages/About';
import Visping from './pages/Visping';
import Modpacks from './pages/Modpacks';
import Pong from './pages/Pong';
import Privacy from './pages/Privacy';
import Datapacks from './pages/Datapacks';
import Roblox from './pages/Roblox';
import Error from './pages/Error';
import Map from './pages/Map';

function DivContainer({render}) {
    const location = useLocation();
    if (location.pathname.includes("map")) { return <>{render()}</> }

    return (
        <div className="container">
            <main role="main" className="pb-3">
                {render()}
            </main>
        </div>
    )
}

export default function App() {
    return (
        <HashRouter>
            <Navbar/>
            <DivContainer render={()=>{
                return (
                    <Routes>
                        <Route exact path='/' element={<Home />} />
                        <Route path='/about' element={<About />} />
                        <Route path='/visping' element={<Visping />} />
                        <Route path='/pong' element={<Pong />} />
                        <Route path='/modpacks' element={<Modpacks />} />
                        <Route path='/datapacks' element={<Datapacks />} />
                        <Route path='/privacy' element={<Privacy />} />
                        <Route path='/roblox' element={<Roblox />} />
                        <Route path='/error' element={<Error />} />
                        <Route path='/map' element={<Map />} />
                    </Routes>
                )
            }}/>
            <Footer/>
        </HashRouter>
    );
}