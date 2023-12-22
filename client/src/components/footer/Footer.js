import React from 'react'
import './footer.css'
import { useNavigate } from 'react-router-dom'

function Footer() {
  const navigate = useNavigate();
  return (
    <div className='footer'>
      <div className='footerWrapper'>
        <div className='footerTop'>
          <span className='footerNav' onClick={() => navigate(`/list/delhi`)}>PG in Delhi</span>
          <span className='footerNav' onClick={() => navigate(`/list/mumbai`)}>PG in Mumbai</span>
          <span className='footerNav' onClick={() => navigate(`/list/bangalore`)}>PG in Bangalore</span>
          <span className='footerNav' onClick={() => navigate(`/list/chennai`)}>PG in Hyderabad</span>
        </div>
        <div className='footerBottom'>
          <span>Â© 2020 Copyright PG Life</span>
        </div>
      </div>
    </div>
  )
}

export default Footer