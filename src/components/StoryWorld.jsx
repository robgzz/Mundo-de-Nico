import React, { useRef, useState } from 'react'
import { BookOpen, Utensils, ArrowUpRight, Hand } from 'lucide-react'
import { stories } from '../data/site.js'

function playReliefSound(){
  try{
    const Ctx=window.AudioContext||window.webkitAudioContext
    if(!Ctx) return
    const ctx=new Ctx()
    const notes=[523.25,659.25,783.99,1046.5]
    const start=ctx.currentTime+.02
    notes.forEach((f,i)=>{
      const osc=ctx.createOscillator(); const gain=ctx.createGain()
      osc.type=i===3?'sine':'triangle'; osc.frequency.value=f
      gain.gain.setValueAtTime(.0001,start+i*.12)
      gain.gain.exponentialRampToValueAtTime(.08,start+i*.12+.02)
      gain.gain.exponentialRampToValueAtTime(.0001,start+i*.12+.34)
      osc.connect(gain); gain.connect(ctx.destination)
      osc.start(start+i*.12); osc.stop(start+i*.12+.38)
    })
    window.setTimeout(()=>ctx.close().catch(()=>{}),1000)
  }catch{}
}

function PancakeStack(){
  return <svg className="pancake-stack" viewBox="0 0 240 150" role="img" aria-label="Un plato de pancakes con fruta y mantequilla">
    <defs>
      <linearGradient id="pancake" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f6c873"/><stop offset="1" stopColor="#d88a37"/></linearGradient>
      <linearGradient id="syrup" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#b85a25"/><stop offset="1" stopColor="#7f371d"/></linearGradient>
    </defs>
    <ellipse cx="120" cy="125" rx="97" ry="18" fill="#c9e6ef" opacity=".55"/>
    <ellipse cx="120" cy="111" rx="78" ry="25" fill="url(#pancake)" stroke="#b87332" strokeWidth="4"/>
    <ellipse cx="120" cy="91" rx="75" ry="24" fill="url(#pancake)" stroke="#b87332" strokeWidth="4"/>
    <ellipse cx="120" cy="71" rx="71" ry="23" fill="url(#pancake)" stroke="#b87332" strokeWidth="4"/>
    <path d="M78 63c17-13 67-17 90-1-6 8-7 18-13 26-6 7-12 6-16 1-4-5-1-13-8-15-10-3-15 18-28 13-8-3-5-13-13-17-5-3-10-4-12-7Z" fill="url(#syrup)" opacity=".92"/>
    <rect x="105" y="51" width="30" height="20" rx="5" fill="#ffe46a" stroke="#e1b844" strokeWidth="3" transform="rotate(-5 120 61)"/>
    <g fill="#4767b2"><circle cx="66" cy="94" r="8"/><circle cx="171" cy="91" r="7"/><circle cx="178" cy="107" r="8"/></g>
    <path d="M56 105c10-11 23-8 29 4-12 8-23 7-29-4Z" fill="#ef5b50"/><path d="M60 101l7-7 5 8" fill="#4a9b54"/>
    <path className="steam s1" d="M92 43c-9-8 7-11 0-21"/><path className="steam s2" d="M124 39c-8-8 8-12 1-23"/><path className="steam s3" d="M153 45c-8-7 8-11 2-20"/>
  </svg>
}

function HungryDadScene(){
  const [fed,setFed]=useState(false)
  const feed=()=>{
    setFed(true)
    playReliefSound()
    window.setTimeout(()=>setFed(false),7000)
  }
  return <div className={`hungry-scene ${fed?'is-fed':''}`}>
    <div className="kitchen-sun"/>
    <div className="kitchen-window"><span/><span/></div>
    <div className="counter-dots"/>
    <div className="plate">{fed ? <PancakeStack/> : <><i className="crumb c1"/><i className="crumb c2"/><i className="crumb c3"/><span className="empty-plate-note">vacío 😳</span></>}</div>
    <div className="fork">⌁</div>
    <div className="dad-bubble">{fed ? '¡Ahhh… mucho mejor!' : 'Me estoy muriendo de hambre…'}</div>
    <div className="nico-alert"><b>{fed?'¡UF!':'¿¡QUÉ!?'}</b><small>{fed?'Papá sobrevivió.':'— Nico, probablemente'}</small></div>
    <button type="button" className="feed-button" onClick={feed} disabled={fed}><Utensils size={18}/>{fed?'Papá está a salvo':'Servir pancakes'}</button>
    {fed && <div className="relief-burst"><span>¡SALVADO!</span><i>★</i><i>✦</i><i>★</i></div>}
    <div className="emergency-tape">EMERGENCIA • SEGÚN NICO • EMERGENCIA</div>
  </div>
}

function FriendlySuspiro(){
  const sceneRef=useRef(null)
  const puffRef=useRef(null)
  const dragRef=useRef(null)
  const [pos,setPos]=useState(null)
  const [dragging,setDragging]=useState(false)

  const down=e=>{
    const scene=sceneRef.current; const puff=puffRef.current
    if(!scene||!puff) return
    const sr=scene.getBoundingClientRect(); const pr=puff.getBoundingClientRect()
    dragRef.current={dx:e.clientX-pr.left,dy:e.clientY-pr.top,w:pr.width,h:pr.height}
    setPos({x:pr.left-sr.left,y:pr.top-sr.top})
    setDragging(true); puff.setPointerCapture?.(e.pointerId)
  }
  const move=e=>{
    if(!dragRef.current||!sceneRef.current) return
    const sr=sceneRef.current.getBoundingClientRect(); const d=dragRef.current
    const x=Math.max(5,Math.min(sr.width-d.w-5,e.clientX-sr.left-d.dx))
    const y=Math.max(5,Math.min(sr.height-d.h-5,e.clientY-sr.top-d.dy))
    setPos({x,y})
  }
  const up=e=>{
    dragRef.current=null; setDragging(false); puffRef.current?.releasePointerCapture?.(e.pointerId)
  }

  return <div className="suspiro-scene" ref={sceneRef}>
    <div className="school-sun"/><div className="school-cloud c-a"/><div className="school-cloud c-b"/>
    <div className="school-window"><span/><span/></div>
    <div className="photo-backdrop"><b>PICTURE DAY</b><i>★</i><i>★</i><i>★</i></div>
    <div className="party-flags"><i/><i/><i/><i/><i/><i/></div>
    <div className="school-floor"/>
    <div className="suspiro-hint"><Hand size={15}/> Muévelo con tu dedo o mouse</div>
    <div ref={puffRef} className={`friendly-suspiro ${dragging?'dragging':''}`} style={pos?{left:pos.x,top:pos.y,right:'auto',transform:'none'}:undefined} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} role="button" tabIndex="0" aria-label="Suspiro amistoso. Arrástralo por la escena.">
      <svg viewBox="0 0 220 170" aria-hidden="true">
        <defs><linearGradient id="puff" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffffff"/><stop offset="1" stopColor="#d8f5ff"/></linearGradient></defs>
        <path className="suspiro-swish" d="M31 125c-20 10-23 28-4 34 16 5 31-4 44-15"/>
        <path d="M56 128c-25-5-37-27-26-47 8-15 24-21 39-18 5-25 26-42 51-38 16 2 29 13 36 27 24-5 46 10 48 34 2 24-17 43-42 44-23 1-84 3-106-2Z" fill="url(#puff)" stroke="#4fb7df" strokeWidth="5"/>
        <ellipse cx="91" cy="88" rx="7" ry="9" fill="#24495f"/><ellipse cx="145" cy="88" rx="7" ry="9" fill="#24495f"/>
        <circle cx="76" cy="103" r="10" fill="#ff9fb5" opacity=".55"/><circle cx="159" cy="103" r="10" fill="#ff9fb5" opacity=".55"/>
        <path d="M101 105c10 11 24 11 34 0" fill="none" stroke="#24495f" strokeWidth="5" strokeLinecap="round"/>
        <path d="M45 70c-13-4-22-1-29 8M178 61c15-8 27-6 36 4" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" opacity=".85"/>
      </svg>
      <span>Suspiro</span>
    </div>
    <div className="suspiro-sparkles"><i>✦</i><i>★</i><i>✦</i></div>
  </div>
}

function StoryCard({story,index}){
  const isHungry=story.slug==='papa-hambre'
  const [open,setOpen]=useState(false)
  return <article className={`story-card ${story.tone} ${isHungry?'flagship':''}`}>
    <div className="story-copy">
      <span className="story-number">0{index+1}</span>
      <span className="story-badge">{story.badge}</span>
      <p className="story-eyebrow">{story.eyebrow}</p>
      <h3>{story.title}</h3>
      <p className="story-short">{story.short}</p>
      <p className="story-details">{story.details}</p>
      <button className="text-link" type="button" aria-expanded={open} onClick={()=>setOpen(!open)}>{open ? 'Cerrar la nota de Nico' : 'Descubrir esta aventura'} <ArrowUpRight size={17}/></button>{open && <div className="story-secret"><b>NOTA DE NICO:</b>{isHungry ? 'Cuando alguien dice que se está muriendo, uno no se queda sentado. Eso es sentido común.' : 'Yo sabía lo que era un suspiro. Lo que no sabía era que uno podía meterte en tantos problemas.'}</div>}
    </div>
    <div className="story-visual">{isHungry ? <HungryDadScene/> : <FriendlySuspiro/>}</div>
  </article>
}

export default function StoryWorld(){
  return <section id="aventuras" className="section adventures-section">
    <div className="content-shell">
      <div className="section-intro split-heading">
        <div><span className="kicker dark"><BookOpen size={16}/> Las historias</span><h2>Pequeñas frases.<br/><em>Grandísimas</em> aventuras.</h2></div>
        <p>En el mundo de Nico, las palabras no siempre significan lo que los adultos creen. Y ahí empieza el problema… o la diversión.</p>
      </div>
      <div className="stories-stack">{stories.map((s,i)=><StoryCard key={s.slug} story={s} index={i}/>)}</div>
    </div>
  </section>
}
