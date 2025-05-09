import React from 'react'
import CursoleImg from '../components/CursoleImg'
import Popular from '../components/Popular'
import Featured from '../components/Featured'
import Discover from '../components/Discover'
import Arrivals from '../components/Arrivals'
import Craft from '../components/Craft'
import AnimatedCard from '../components/AnimatedCard'
import AnimatedCard1 from '../components/AnimatedCard1'

const Home = () => {
  return (
    <div>
      <CursoleImg />
      <Popular />
      <AnimatedCard />
      <Featured />
      <Discover />
      <AnimatedCard1 />
      <Arrivals />
      <Craft />
    </div>
  )
}

export default Home