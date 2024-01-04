import React from 'react';
import Navbar from './component/NavBar';
import Footer from './component/Footer';
import { Routes, Route, HashRouter } from "react-router-dom";

import Home from './pages/Home';
import About from './pages/About';
import Visping from './pages/Visping';
import Modpacks from './pages/Modpacks';
import Pong from './pages/Pong';
import Privacy from './pages/Privacy';
import Datapacks from './pages/Datapacks';
import Roblox from './pages/Roblox';
import Error from './pages/Error';
 
export default function App() {
    return (
        <HashRouter>
            <Navbar/>
                <div className="container">
                    <main role="main" className="pb-3">
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
                    </Routes>
                    </main>
                </div>
            <Footer/>
        </HashRouter>
    );
}