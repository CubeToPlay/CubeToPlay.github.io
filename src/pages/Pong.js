import React, { useRef, useEffect } from 'react';
import Game from '../ping-pong/src/game/Game.ts';

export default function Pong() {
    document.title = "Pong";

    const canvasRef = useRef(null)

    useEffect(() => {
      const game = new Game(canvasRef.current, 60, 50, 15);
  
      setInterval(() => game.updatePhysics(), game.MILLISECONDS_PER_PHYS);
      setInterval(() => game.updateGraphics(), game.MILLISECONDS_PER_FRAME);
    })

    return (
      <>
        <canvas ref={canvasRef} width={750} height={500}/>
      </>
    );
}