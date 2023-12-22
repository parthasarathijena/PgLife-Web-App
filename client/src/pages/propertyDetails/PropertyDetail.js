import React from 'react'
import './propertyDetail.css'
import Topbar from '../../components/topbar/Topbar'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import DetailBody from '../../components/detailbody/DetailBody'

function PropertyDetail() {
  return (
    <>
        <Topbar />
        <Navbar />
        <DetailBody />
        <Footer />
    </>
  )
}

export default PropertyDetail