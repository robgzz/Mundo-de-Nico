import React, { useEffect, useState } from 'react'
import { BeetleDoodle } from './Doodles.jsx'

export default function BeetleParade(){
  const [p,setP] = useState(0)
  useEffect(()=>{
    let raf=0
    const update=()=>{
      cancelAnimationFrame(raf)
      raf=requestAnimationFrame(()=>{
        const max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight)
        setP(Math.min(1,window.scrollY/max))
      })
    }
    update(); window.addEventListener('scroll',update,{passive:true}); window.addEventListener('resize',update)
    return()=>{cancelAnimationFrame(raf);window.removeEventListener('scroll',update);window.removeEventListener('resize',update)}
  },[])

  const beetles=[
    {x:2+Math.sin(p*18)*2,y:15+p*66,r:22+Math.sin(p*30)*12,s:1},
    {x:93+Math.cos(p*15)*2,y:80-p*54,r:-24+Math.cos(p*27)*14,s:.82},
    {x:10+((p*165)%82),y:92-Math.sin(p*12)*5,r:78+Math.sin(p*19)*10,s:.7},
    {x:78-((p*120)%64),y:7+Math.sin(p*8)*5,r:160+Math.cos(p*24)*10,s:.56},
  ]
  return <div className="beetle-parade" aria-hidden="true">
    {beetles.map((b,i)=><div className={`runner-beetle beetle-${i+1}`} key={i} style={{left:`${b.x}%`,top:`${b.y}%`,transform:`translate(-50%,-50%) rotate(${b.r}deg) scale(${b.s})`}}><BeetleDoodle/><i/><i/></div>)}
  </div>
}
