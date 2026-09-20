import React from 'react'
import { Heart, Home } from 'lucide-react'
import { MiloDoodle } from './Doodles.jsx'

const people=[
 {name:'Alex',role:'Papá',mark:'A',text:'Papá de Nico. A veces dice cosas completamente normales que Nico convierte en asuntos de vida o muerte.'},
 {name:'Elena',role:'Mamá',mark:'E',text:'Mamá de Nico. Cariñosa, expresiva y con mucha experiencia sobreviviendo a las ideas de su pequeño científico.'},
]
export default function FamilySection(){
 return <section id="familia" className="section family-section"><div className="content-shell">
  <div className="family-heading"><span className="kicker dark"><Home size={16}/> La familia</span><h2>El centro de todas sus <em>aventuras.</em></h2><p>Porque el mundo de Nico puede ser enorme, pero siempre empieza cerca de casa.</p></div>
  <div className="family-grid">
    {people.map((p,i)=><article className="family-card" key={p.name}><span className="family-mark">{p.mark}</span><span className="role">{p.role}</span><h3>{p.name}</h3><p>{p.text}</p><span className="heart-line"><Heart size={15} fill="currentColor"/> parte del corazón de Nico</span></article>)}
    <article className="family-card milo-card"><MiloDoodle className="milo-big"/><span className="role">Compañero oficial</span><h3>Milo</h3><p>El gato de Nico. Silencioso cuando quiere, importantísimo siempre y probablemente testigo de más experimentos de los que quisiera admitir.</p><span className="heart-line"><Heart size={15} fill="currentColor"/> familia con bigotes</span></article>
  </div>
 </div></section>
}
