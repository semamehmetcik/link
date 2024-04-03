import React from 'react'
import Slider from '../components/home page/slider'
import Welcome from '../components/about-page/welcome'
import Spacer from '../components/common/spacer'
import FeaturedCourses from '../components/home page/featured-courses'
import UpcomingEvents from '../components/events-page/upcoming-events'
import MobileApp from '../components/home page/mobile-app'

const HomePage = () => {
  return (
    <>
        <Slider/>
        <Spacer/>
        <Welcome/> 
   
        <FeaturedCourses/>
       
        <UpcomingEvents/>
        
        <MobileApp/>
    </>
  )
}

export default HomePage