import React, { useState } from 'react'
import { BookOpen, Utensils, Sparkles, ArrowUpRight } from 'lucide-react'
import { stories } from '../data/site.js'

function HungryDadScene(){
  const [fed,setFed]=useState(false)
  return <div className={`hungry-scene ${fed?'is-fed':''}`}>
    <div className="kitchen-window"><span/><span/></div>
    <div className="plate"><i className="crumb c1"/><i className="crumb c2"/><i className="crumb c3"/></div>
    <div className="fork">⌁</div>
    <div className="dad-bubble">{fed ? '¡Ahhh… mucho mejor!' : 'Me estoy muriendo de hambre…'}</div>
    <div className="nico-alert"><b>¿¡QUÉ!?</b><small>— Nico, probablemente</small></div>
    <button type="button" className="feed-button" onClick={()=>setFed(!fed)}><Utensils size={18}/>{fed?'Otra vez':'Salvar a papá'}</button>
    <div className="emergency-tape">EMERGENCIA • SEGÚN NICO • EMERGENCIA</div>
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
    <div className="story-visual">
      {isHungry ? <HungryDadScene/> : <div className="story-photo"><img src={story.art} alt="Escena de El Suspiro"/><span className="photo-note">algo se escapó…</span></div>}
    </div>
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
