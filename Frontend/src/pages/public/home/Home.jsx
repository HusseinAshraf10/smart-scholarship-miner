import React from 'react'
import HeroHome from './components/HeroHome.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import KeyFeatures from './components/KeyFeatures.jsx'
import Faq from './components/Faq.jsx'
import CTA from './components/CTA.jsx'

function Home() {
  return (
    <section>
      <HeroHome />
      <HowItWorks />
      <KeyFeatures />
      <Faq />
      <CTA />
    </section>
  )
}

export default Home