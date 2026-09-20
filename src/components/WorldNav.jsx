import React, { useState } from 'react'
import { Menu, X, Sparkles } from 'lucide-react'

const links = [
  ['#aventuras', 'Aventuras'],
  ['#nico', 'Conoce a Nico'],
  ['#laboratorio', 'Laboratorio'],
  ['#familia', 'Familia'],
]

export default function WorldNav() {
  const [open, setOpen] = useState(false)
  return <header className="site-nav-wrap">
    <nav className="site-nav" aria-label="Navegación principal">
      <a className="brand" href="#inicio" aria-label="El Mundo de Nico, inicio">
        <span className="brand-star"><Sparkles size={18} /></span>
        <span className="brand-text"><b>EL MUNDO</b><em>de Nico</em></span>
      </a>
      <div className="nav-links">
        {links.map(([href,label]) => <a key={href} href={href}>{label}</a>)}
      </div>
      <a className="nav-cta" href="#aventuras">Ver libros <span>→</span></a>
      <button className="mobile-menu" aria-label="Abrir menú" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
    </nav>
    {open && <div className="mobile-panel">{links.map(([href,label]) => <a key={href} href={href} onClick={()=>setOpen(false)}>{label}</a>)}<a href="#aventuras" onClick={()=>setOpen(false)}>Ver libros →</a></div>}
  </header>
}
