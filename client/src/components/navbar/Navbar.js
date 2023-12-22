import React from 'react'
import './navbar.css'
import { useNavigate, useParams } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate();
  const params = useParams();
  const city = params.city;
  return (
    <div className='navbar'>
        <div className='navbarWrapper'>
            <span className='navName' onClick={()=>navigate(`/`)}>Home</span>
            <span className='navName'>/</span>
            <span className='navName' onClick={()=>navigate(`/list/${city}`)}>{city}</span>
        </div>
    </div>
  )
}

export default Navbar