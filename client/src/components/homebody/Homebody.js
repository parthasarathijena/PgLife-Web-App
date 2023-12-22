import React, { useState } from 'react'
import './homebody.css'
import { Search } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

function Homebody() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const navigate = useNavigate();
    const [searchbtn, setSearchbtn] = useState("");
    return (
        <div className='body'>
            <div className='bodyBackImg'>
                <img className='bodyCover' src={`${PF}/innerImg/bg.png`} alt='' />
            </div>
            <div className='bodyTop'>
                <div className='searchBox'>
                    <div className='searchDesc'>
                        <h2 className='searchDescText'>Happiness per Square Foot</h2>
                    </div>
                    <div className='searchTab'>
                        <input placeholder='Enter your city to search for PGs' className='searchInput' onChange={(e) => setSearchbtn(e.target.value)}></input>
                        <button className='searchButton' onClick={() => navigate(`/list/${searchbtn.toLowerCase()}`)}><Search /></button>
                    </div>
                </div>
            </div>
            <div className='bodyBottom'>
                <div className='bodyBottomDesc'>
                    <h2 className='bodyBottomHeading'>Major Cities</h2>
                </div>
                <div className='bodyBottomPlaces'>
                    <div className='bodyBottomPlace'>
                        <img className='placeImg' src={`${PF}/innerImg/delhi.png`} alt='' onClick={() => navigate(`/list/delhi`)}></img>
                    </div>
                    <div className='bodyBottomPlace'>
                        <img className='placeImg' src={`${PF}/innerImg/mumbai.png`} alt='' onClick={() => navigate(`/list/mumbai`)}></img>
                    </div>
                    <div className='bodyBottomPlace'>
                        <img className='placeImg' src={`${PF}/innerImg/bangalore.png`} alt='' onClick={() => navigate(`/list/bangalore`)}></img>
                    </div>
                    <div className='bodyBottomPlace'>
                        <img className='placeImg' src={`${PF}/innerImg/chennai.png`} alt='' onClick={() => navigate(`/list/chennai`)}></img>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homebody