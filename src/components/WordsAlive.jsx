import React, { useState } from 'react'
import { MessageCircle } from 'lucide-react'

export default function WordsAlive(){
 const [alive,setAlive]=useState(false)
 return <section className="section words-section"><div className="content-shell"><div className="words-card">
   <span className="kicker dark"><MessageCircle size={16}/> Donde las palabras cobran vida</span>
   <p className="sentence">Papá llegó a casa y dijo que se estaba <button className={alive?'alive':''} onClick={()=>setAlive(!alive)}>muriendo de hambre</button>.</p>
   <div className={`literal-reveal ${alive?'show':''}`}><span className="alarm">¡ALARMA!</span><strong>Nico escuchó cada palabra.</strong><p>Los adultos escuchan una frase. Nico escucha una misión.</p></div>
   <p className="tap-hint">Toca las palabras subrayadas ↑</p>
 </div></div></section>
}
