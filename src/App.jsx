import React from 'react'
import WorldNav from './components/WorldNav.jsx'
import Hero from './components/Hero.jsx'
import StoryWorld from './components/StoryWorld.jsx'
import NicoSection from './components/NicoSection.jsx'
import WordsAlive from './components/WordsAlive.jsx'
import FamilySection from './components/FamilySection.jsx'
import LabSection from './components/LabSection.jsx'
import Footer from './components/Footer.jsx'
import AppEffects from './components/AppEffects.jsx'

export default function App(){
  return <>
    <AppEffects/>
    <WorldNav/>
    <main>
      <Hero/>
      <StoryWorld/>
      <NicoSection/>
      <WordsAlive/>
      <FamilySection/>
      <LabSection/>
    </main>
    <Footer/>
  </>
}
