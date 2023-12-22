import React from 'react'
import './propertyList.css'
import Topbar from '../../components/topbar/Topbar'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import Properties from '../../components/properties/Properties'

function PropertyList() {
  return (
    <>
      <Topbar />
      <Navbar />
      <Properties />
      <Footer />
    </>
  )
}

export default PropertyList