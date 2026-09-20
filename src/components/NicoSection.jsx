import React from 'react'
import { Gamepad2, Heart, Search, Star } from 'lucide-react'
import { curiosities } from '../data/site.js'
import { BeetleDoodle, StoneDoodle, PuddleDoodle } from './Doodles.jsx'

const Icon = ({kind}) => kind==='beetle'?<BeetleDoodle/>:kind==='stone'?<StoneDoodle/>:kind==='puddle'?<PuddleDoodle/>:<span className="cap-icon">★</span>

export default function NicoSection(){
 return <section id="nico" className="section nico-section">
  <div className="content-shell">
    <div className="nico-layout">
      <div className="nico-photo-card">
        <img src="/art/picture-day.webp" alt="Nico en el día de fotos escolares"/>
        <span className="tape tape-c"/>
        <div className="photo-caption">Nicolás Alejandro III<br/><b>“Nico” para casi todos.</b></div>
      </div>
      <div className="nico-copy">
        <span className="kicker dark"><Star size={16}/> Archivo ultra secreto de personaje</span>
        <h2>Este es <em>Nico.</em></h2>
        <p className="big-copy">Tiene 7–8 años, está en segundo grado y posee una habilidad especial: escuchar lo que dicen los adultos… <b>demasiado literalmente.</b></p>
        <div className="trait-row">
          <span><Search/> Curioso</span><span><Heart/> Tierno</span><span><Gamepad2/> Gamer</span><span><SparkIcon/> Travieso</span>
        </div>
        <div className="nico-quote">“Yo sí entiendo las palabras. Lo que pasa es que los adultos a veces las dicen raro.”<small>— una explicación perfectamente razonable de Nico</small></div>
      </div>
    </div>
    <div className="curiosity-grid">
      {curiosities.map(c=><article className="curiosity" key={c.title}><div className={`curio-icon ${c.icon}`}><Icon kind={c.icon}/></div><h3>{c.title}</h3><p>{c.text}</p></article>)}
    </div>
  </div>
 </section>
}
function SparkIcon(){return <span className="mini-spark">✦</span>}
