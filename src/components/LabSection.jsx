import React, { useMemo, useState } from 'react'
import { FlaskConical, RotateCcw } from 'lucide-react'

const ingredients=[
 {id:'stone',label:'Piedra lisa',emoji:'◉'},
 {id:'cap',label:'Tapa dorada',emoji:'✦'},
 {id:'beetle',label:'Escarabajo',emoji:'♟'},
 {id:'jelly',label:'Gelatina roja',emoji:'◆'},
]

export default function LabSection(){
 const [mix,setMix]=useState([])
 const result=useMemo(()=>{
   if(mix.length<2)return null
   if(mix.includes('stone')&&mix.includes('cap')&&mix.includes('beetle')) return 'portal'
   if(mix.includes('jelly')&&mix.includes('cap')) return 'boom'
   return 'hmm'
 },[mix])
 const toggle=id=>setMix(m=>m.includes(id)?m.filter(x=>x!==id):[...m,id])
 return <section id="laboratorio" className="section lab-section"><div className="content-shell">
   <div className="lab-board">
     <div className="lab-copy"><span className="kicker light"><FlaskConical size={16}/> Laboratorio de Nico</span><h2>La ciencia es hacer preguntas.<br/>Y luego <em>tocar cosas.</em></h2><p>Este laboratorio digital no explota de verdad. Creemos.</p><div className="lab-warning">⚠ REGLA #1 DE NICO: si brilla, primero hay que investigar.</div></div>
     <div className={`lab-machine ${result?`result-${result}`:''}`}>
       <div className="machine-top"><span>EXPERIMENTO</span><b>#001</b></div>
       <div className="ingredient-tray">{ingredients.map(x=><button key={x.id} className={mix.includes(x.id)?'selected':''} onClick={()=>toggle(x.id)}><span>{x.emoji}</span>{x.label}</button>)}</div>
       <div className="mix-chamber"><div className="mix-items">{mix.map((id,i)=><span key={id} style={{'--i':i}}>{ingredients.find(x=>x.id===id).emoji}</span>)}</div>{!result&&<p>Elige 2 o más cosas.</p>}{result==='portal'&&<p><b>RESULTADO:</b> ¡Posible portal detectado!</p>}{result==='boom'&&<p><b>RESULTADO:</b> PLOOOF. Nico dice que estaba planeado.</p>}{result==='hmm'&&<p><b>RESULTADO:</b> Interesante. Muy, muy interesante.</p>}</div>
       <button className="reset" onClick={()=>setMix([])}><RotateCcw size={15}/> Reiniciar</button>
     </div>
   </div>
 </div></section>
}
