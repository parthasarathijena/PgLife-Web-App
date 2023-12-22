import React from 'react'
import './home.css'
import Topbar from '../../components/topbar/Topbar'
import Footer from '../../components/footer/Footer'
import Homebody from '../../components/homebody/Homebody'

function Home() {
  return (
    <>
      <Topbar />
      <Homebody />
      <Footer />
    </>
  )
}

export default Home