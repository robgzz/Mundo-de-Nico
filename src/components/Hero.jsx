import React, { useEffect, useRef, useState } from 'react'
import { ArrowDown, Sparkles } from 'lucide-react'
import { BeetleDoodle, MiloDoodle, StoneDoodle, PuddleDoodle } from './Doodles.jsx'

export default function Hero() {
  const ref = useRef(null)
  const [spot, setSpot] = useState({x:50,y:45})
  useEffect(() => {
    const el=ref.current; if(!el) return
    const onMove = e => {
      const r=el.getBoundingClientRect()
      setSpot({x:((e.clientX-r.left)/r.width)*100,y:((e.clientY-r.top)/r.height)*100})
    }
    el.addEventListener('pointermove',onMove)
    return()=>el.removeEventListener('pointermove',onMove)
  },[])
  return <section id="inicio" className="hero" ref={ref} style={{'--spot-x':`${spot.x}%`,'--spot-y':`${spot.y}%`}}>
    <div className="paper-grain" />
    <div className="hero-sun" />
    <div className="hero-orbit orbit-one" />
    <div className="hero-orbit orbit-two" />
    <div className="floating-sticker sticker-1">¡NO TOCAR!<small>(Nico ya lo tocó)</small></div>
    <div className="floating-sticker sticker-2">EXPERIMENTO<br/><b>#?</b></div>
    <BeetleDoodle className="hero-beetle" />
    <StoneDoodle className="hero-stone" />
    <PuddleDoodle className="hero-puddle" />
    <MiloDoodle className="hero-milo" />

    <div className="hero-grid content-shell">
      <div className="hero-copy">
        <span className="kicker"><Sparkles size={16}/> Entre dichos y aventuras presenta</span>
        <h1><span>Bienvenidos al</span><strong>Mundo de <i>Nico</i></strong></h1>
        <p className="hero-lede">Un lugar donde una frase cualquiera puede convertirse en una aventura enorme, un charco puede ser un portal y una piedra perfectamente lisa merece atención científica.</p>
        <div className="hero-actions">
          <a className="btn primary" href="#aventuras">Entrar a las aventuras <span>→</span></a>
          <a className="btn ghost" href="#nico">Conoce a Nico</a>
        </div>
        <p className="hero-note">Donde las palabras cobran vida.</p>
      </div>
      <div className="hero-art-wrap" aria-label="Nico jugando, una ventana al mundo de Nico">
        <div className="hero-art-paper">
          <img src="/art/nico-gamer.webp" alt="Nico disfrutando de un videojuego" />
          <span className="tape tape-a" /><span className="tape tape-b" />
          <span className="scribble scribble-a">ese soy yo ↑</span>
        </div>
        <div className="floating-word word-vida">VIDA!</div>
        <div className="floating-word word-wow">¡WOW!</div>
      </div>
    </div>
    <a className="scroll-cue" href="#aventuras" aria-label="Bajar a las aventuras"><span>Explora</span><ArrowDown size={18}/></a>
  </section>
}
