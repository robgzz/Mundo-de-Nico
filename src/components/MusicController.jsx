import React, { useEffect, useRef, useState } from 'react'
import { Music2, Volume2, VolumeX } from 'lucide-react'

const melody = [
  523.25, 659.25, 783.99, 659.25,
  587.33, 698.46, 783.99, 880.00,
  659.25, 783.99, 987.77, 783.99,
  587.33, 659.25, 523.25, 659.25,
]

export default function MusicController(){
  const [enabled,setEnabled] = useState(() => {
    try { return localStorage.getItem('nico-music-muted') !== '1' } catch { return true }
  })
  const [playing,setPlaying] = useState(false)
  const [waiting,setWaiting] = useState(false)
  const audioRef = useRef(null)
  const timerRef = useRef(null)
  const startedRef = useRef(false)

  useEffect(() => {
    if(!enabled){
      stopMusic()
      try { localStorage.setItem('nico-music-muted','1') } catch {}
      return
    }
    try { localStorage.removeItem('nico-music-muted') } catch {}

    let cancelled = false
    const unlock = async () => {
      if(cancelled || startedRef.current) return
      try{
        const Ctx = window.AudioContext || window.webkitAudioContext
        if(!Ctx) return
        const ctx = audioRef.current || new Ctx()
        audioRef.current = ctx
        if(ctx.state !== 'running') await ctx.resume()
        if(ctx.state === 'running'){
          startedRef.current = true
          setWaiting(false)
          setPlaying(true)
          scheduleLoop(ctx)
        } else setWaiting(true)
      }catch{
        setWaiting(true)
      }
    }

    unlock()
    const onFirstGesture = () => unlock()
    window.addEventListener('pointerdown',onFirstGesture,{passive:true})
    window.addEventListener('keydown',onFirstGesture)
    return () => {
      cancelled = true
      window.removeEventListener('pointerdown',onFirstGesture)
      window.removeEventListener('keydown',onFirstGesture)
    }
  },[enabled])

  function playTone(ctx, freq, when, duration=.42, gainValue=.012){
    const osc = ctx.createOscillator()
    const overtone = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    overtone.type = 'triangle'
    osc.frequency.setValueAtTime(freq,when)
    overtone.frequency.setValueAtTime(freq*2,when)
    gain.gain.setValueAtTime(.0001,when)
    gain.gain.exponentialRampToValueAtTime(gainValue,when+.025)
    gain.gain.exponentialRampToValueAtTime(.0001,when+duration)
    osc.connect(gain); overtone.connect(gain); gain.connect(ctx.destination)
    osc.start(when); overtone.start(when)
    osc.stop(when+duration+.04); overtone.stop(when+duration+.04)
  }

  function schedulePhrase(ctx){
    const start = ctx.currentTime + .08
    melody.forEach((f,i) => {
      const when = start + i*.68
      playTone(ctx,f,when,.34,i%4===0?.014:.009)
      if(i%4===0) playTone(ctx,f/2,when,.72,.0045)
    })
    return 11.8
  }

  function scheduleLoop(ctx){
    if(!enabled || ctx.state === 'closed') return
    const delay = schedulePhrase(ctx)
    timerRef.current = window.setTimeout(() => scheduleLoop(ctx), delay*1000)
  }

  function stopMusic(){
    if(timerRef.current) window.clearTimeout(timerRef.current)
    timerRef.current = null
    startedRef.current = false
    setPlaying(false)
    setWaiting(false)
    const ctx = audioRef.current
    audioRef.current = null
    if(ctx && ctx.state !== 'closed') ctx.close().catch(()=>{})
  }

  function toggle(){
    setEnabled(v=>!v)
  }

  return <button type="button" className={`music-pill ${playing?'is-playing':''}`} onClick={toggle} aria-pressed={enabled} aria-label={enabled?'Silenciar música':'Activar música'} title={waiting?'La música empezará con tu primer toque':'Música de El Mundo de Nico'}>
    <span className="music-note"><Music2 size={16}/></span>
    <span className="music-label">{enabled ? (playing?'Música':'Música lista') : 'Música apagada'}</span>
    {enabled ? <Volume2 size={16}/> : <VolumeX size={16}/>} 
  </button>
}
